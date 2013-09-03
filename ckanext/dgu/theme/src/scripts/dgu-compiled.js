/*! DGU+CKAN Application JS minified by Grunt */
function assert(a,b){if(!a)throw console.error(b,arguments),"AssertionError"}function feedback_publish(a){return $.ajax({url:"/data/feedback/moderate/"+a,data:{action:"publish"},dataType:"json",method:"POST",success:function(){return $("#"+a).slideUp("slow"),!1}}),!1}function feedback_delete(a,b){var c={action:"delete"};return b&&(c.action="delete_and_ban"),$.ajax({url:"/data/feedback/moderate/"+a,data:c,dataType:"json",method:"POST",success:function(){return $("#"+a).slideUp("slow"),!1}}),!1}!function(a){for(var b,c=function(){},d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(",");b=d.pop();)a[b]=a[b]||c}(window.console=window.console||{}),jQuery(function(){$(document).ready(function(){$(".js-tooltip").tooltip(),$(".js-tooltip-instruction-needed").attr("title","Tooltip text required?"),$(".js-tooltip-instruction-needed").tooltip({extraClass:"instruction-needed"}),$(".instruction-needed").tooltip({extraClass:"instruction-needed"}),$(".to-be-completed").addClass("js-tooltip-to-be-completed"),$(".js-tooltip-to-be-completed").tooltip({extraClass:"to-be-completed"}),$(".star-rating").each(function(a,b){b=$(b),b.tooltip({title:b.find(".tooltip").html(),placement:"right",template:'<div class="tooltip star-rating-tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',delay:0,animation:!1})}),$(".facet-expand-collapse").click(function(a){a.preventDefault();var b=$(a.delegateTarget),c=b.attr("id");b.toggleClass("expanded"),$("#"+c+"-items").toggle("fast")}),$(".read-more-parent .link-read-more, .read-more-parent .link-read-less").click(function(a){a.preventDefault();var b=$(a.delegateTarget),c=b.hasClass("link-read-more"),d=b.parents(".read-more-parent");c?(d.find(".expanded").show("fast"),d.find(".collapsed").hide()):(d.find(".collapsed").show("fast"),d.find(".expanded").hide())}),$('select[name="dataset-results-sort"]').change(function(a){a.preventDefault(),window.location=$(this).val()+"#search-sort-by"}),$('input[name="publisher-results-include-subpub"]').change(function(a){a.preventDefault(),window.location=$(this).val()}),$("input.href-action").click(function(a){a.preventDefault(),window.location=$(a.target).attr("action")})}),$("input#search-theme-mode").change(CKAN.Dgu.toggleSearchThemeMode)});var CKAN=CKAN||{};CKAN.Dgu=function(a,b){return b.toggleSearchThemeMode=function(b){var c=!!a(b.delegateTarget).attr("checked");console.log(c),a(".facets-theme-primary").addClass(c?"enabled":"disabled").removeClass(c?"disabled":"enabled"),a(".facets-theme-all").addClass(c?"disabled":"enabled").removeClass(c?"enabled":"disabled")},b.setupEditorDialogs=function(){a(".dgu-editor-save").click(function(b){var c=a(b.target).parents(".dgu-editor").find("input");a.each(c,function(b,c){c=a(c);var d=c.attr("data-label"),e=c.attr("data-input");d&&a(d).text(c.val()),e&&a(e).val(c.val())})}),a(".dgu-editor").on("shown",function(b){var c=a(b.target),d=c.find("input");a.each(d,function(b,c){c=a(c);var d=c.attr("data-input");d&&c.val(a(d).val())});var e=a(b.target).find("input")[0];a(e).focus()}),a('.dgu-editor input[type="text"]').bind("keydown",function(b){13==b.keyCode&&(b.preventDefault(),a(b.target).parents(".dgu-editor").find(".dgu-editor-save").click())})},b.setupResourcesToggle=function(){function b(b){var c=b.target.value;"individual"==c?a("#package_type_modal").modal("toggle"):d(c)}function c(b){b.preventDefault(),a("input:radio[name=package_type]:not(:checked)").click()}function d(b){var c;if("individual"==b)c="timeseries";else{if("timeseries"!=b)throw"Cannot toggle to mode="+b;c="individual"}var d=a("#"+c+"_resources-table"),e=a("#"+b+"_resources-table");CKAN.Dgu.copyResourceTable(d,e);var f=CKAN.Dgu.addTableRow(d);d.find("tbody tr").not(f).remove(),CKAN.Dgu.showHideResourceFieldsets()}a("#package_type_modal .cancel").click(c),a("#package_type_modal .ok").click(function(){d("individual")}),a("input:radio[name=package_type]").change(b)},b.showHideResourceFieldsets=function(){var b=a("input#package_type-timeseries-radio").is(":checked");a("input#package_type-individual-radio").is(":checked");var c=a("fieldset#package_type-timeseries"),d=a("fieldset#package_type-individual");b?(c.show(),d.hide()):(c.hide(),d.show())},b.copyResourceTable=function(b,c){for(var d=b.find("tbody tr"),e=c.find("tbody tr");e.length<d.length;)e.push(CKAN.Dgu.addTableRow(c));if(e.length!=d.length)throw"DOM insanely broken.";for(var f=0;f<e.length;f++){var g={};a.each(a(e[f]).find("input"),function(b,c){c=a(c);var d=c.prop("name").split("__")[2];g[d]=c}),a.each(a(d[f]).find("input"),function(b,c){c=a(c);var d=c.prop("name").split("__")[2];d in g&&g[d].val(c.val())})}},b.addTableRow=function(b){var c=b.find("tbody tr:last"),d=c.prop("class"),e=d.split("__"),f=e[0],g=parseInt(e[1],10)+1,h=c.clone();h.removeClass(d),h.addClass(f+"__"+g),h.addClass("resource"),h.insertAfter(c),h.find("*").each(function(b,c){var d=new RegExp(f+"__\\d+"),e=f+"__"+g;a(c).prop("for")&&a(c).prop("for",a(c).prop("for").replace(d,e)),a(c).prop("name")&&a(c).prop("name",a(c).prop("name").replace(d,e)),a(c).prop("id")&&a(c).prop("id",a(c).prop("id").replace(d,e)),a(c).val(""),a(c).removeClass("error")}),h.find("a.add-button").remove(),c.find("a.add-button").appendTo(h.find("td").last());var i=h.find('button[id$="__validate-resource-button"]');if(0==i.length)throw"Bad CSS selector. Could not attach event handler.";return i.attr("value","Check").removeAttr("disabled").each(function(b,c){CKAN.Dgu.validateResource(c,function(){return a(a(c).parents("tr")[0])})}),a.each(h.find(".resource-move"),function(b,c){CKAN.Dgu.bindResourceMoveButtons(a(c))}),CKAN.Dgu.setVisibleResourceMoveButtons(b),h},b.copyTableRowOnClick=function(a,b){a.attr("onclick","").click(function(){CKAN.Dgu.addTableRow(b)})},b.bindInputChanges=function(a,b){a.keyup(b),a.keydown(b),a.keypress(b),a.change(b)},b.setupTagAutocomplete=function(b){b.bind("keydown",function(b){b.keyCode===a.ui.keyCode.TAB&&a(this).data("autocomplete").menu.active&&b.preventDefault()}).autocomplete({minLength:1,source:function(b,c){var d=a.trim(b.term.split(",").pop()),e=CKAN.SITE_URL+"/api/2/util/tag/autocomplete?incomplete="+d;a.getJSON(e,function(b){var e=a.map(b.ResultSet.Result,function(a){return a.Name});c(a.ui.autocomplete.filter(e,d))})},focus:function(){return!1},select:function(a,b){var c=this.value.split(",");return c.pop(),c.push(" "+b.item.value),c.push(" "),this.value=c.join(","),!1}})},b.bindResourceMoveButtons=function(b){b.bind("click",function(b){function c(b,c){assert(b.length);var d=b.find('input[type="text"]'),e=c.find('input[type="text"]');assert(d.length>0,"Found no inputs to swap",b);for(var f=0;f<d.length;f++){var g=a(d[f]),h=a(e[f]),i=g.val();g.val(h.val()),h.val(i)}var j=b.find(".hidden-resource-fields");console.log(j);var k=j.find('input[type="hidden"]').get(0);console.log(k),k=a(k).attr("name").match(/__\d+__/gi)[0],console.log(k);var l=c.find(".hidden-resource-fields");console.log(j);var m=l.find('input[type="hidden"]').get(0);console.log(m),m=a(m).attr("name").match(/__\d+__/gi)[0],console.log(m);var i=l.html();l.html(j.html()),j.html(i);var n=new RegExp(m,"g"),o=new RegExp(k,"g");j.find('input[type="hidden"]').each(function(){var b=a(this).attr("name").replace(n,k);a(this).attr("id",b),a(this).attr("name",b)}),l.find('input[type="hidden"]').each(function(){var b=a(this).attr("name").replace(o,m);a(this).attr("id",b),a(this).attr("name",b)})}b.preventDefault();var d=a(b.delegateTarget),e=d.closest("table"),f=e.find("tr"),g=e.find("tr").index(d.closest("tr")),h=d.hasClass("resource-move-up"),i=d.hasClass("resource-move-down");return assert(h&&!i||!h&&i,"up XOR down should be true: "+h+","+i),h&&(assert(g>1,"First up button should be disabled"),assert(g<f.length-1,"Last up button should be disabled"),c(a(f[g]),a(f[g-1]))),i&&(assert(g<f.length-2,"Last down button should be disabled"),c(a(f[g]),a(f[g+1]))),CKAN.Dgu.setVisibleResourceMoveButtons(e),!1})},b.setVisibleResourceMoveButtons=function(b){var c=b.find(".resource-move");a.each(c,function(b,d){d=a(d),disabled=0==b||b>=c.length-3,d.attr("disabled",disabled),visible=b>=c.length-2?"none":"inline-block",d.css("display",visible)})},b.validateResource=function(b,c){a(b).click(function(){a(this).attr({disabled:"disabled"}),a(this).siblings("span.checking-links-label").show();for(var d=c(),e=a(d).map(function(){return a(this).find('input[name$="__url"]').val()}),f=[],g=0;g<e.length;g++)f.push(e[g]);a.ajax({url:CKAN.SITE_URL+"/qa/link_checker",traditional:!0,context:d,data:{url:f},dataType:"json",success:function(b){for(var c=0;c<b.length;c++){var d=a(this[c]).find('input[id$="__format"]'),e=b[c].format;if(""!=a.trim(d.val())||e.match(/^html?$/)||d.val(b[c].format),b[c].url_errors.length){for(var f=["url","description","format","date"],g=!1,h=0;h<f.length;h++){var i=a(this[c]).find('input[id$="__'+f[h]+'"]');if(g=i.length>0&&""!==a.trim(i.val()))break}g?a(this[c]).find('input[id$="__url"]').parent().addClass("error").attr({title:b[c].url_errors[0]}):a(this[c]).find('input[id$="__url"]').parent().removeClass("error").removeAttr("title")}else a(this[c]).find('input[id$="__url"]').parent().removeClass("error").removeAttr("title")}},complete:function(){a(b).removeAttr("disabled"),a(b).siblings("span.checking-links-label").hide()},timeout:1e4})})},b.setupAdditionalResourcesScrapers=function(){var b=function(b){b=a(b);var c=b.closest("tr"),d=c.find(".input_additional_resources_scraper");assert(1==d.length),"HTML"==a.trim(b.val().toUpperCase())?(d.removeAttr("disabled"),d.css("text-decoration","none")):(d.attr("disabled","disabled"),d.css("text-decoration","line-through"))},c=a(".input_additional_resources_format");c.each(function(a,c){b(c)});var d=function(a){b(a.delegateTarget)};c.bind("keyup",d),c.bind("keypress",d),c.bind("change",d)},b}(jQuery,CKAN.Dgu||{}),CKAN.Dgu.UrlEditor=Backbone.View.extend({initialize:function(){function a(){b.disableTitleChanged=!0}_.bindAll(this,"titleToSlug","titleChanged","urlChanged","checkSlugIsValid","apiCallback");var b=this;this.updateTimer=null,this.titleInput=$(".js-title"),this.urlInput=$(".js-url-input"),this.validMsg=$(".js-url-is-valid"),this.lengthMsg=$(".url-is-long"),this.lastTitle="",this.disableTitleChanged=!1,this.regexToHyphen=[new RegExp("[ .:/_]","g"),new RegExp("[^a-zA-Z0-9-_]","g"),new RegExp("-+","g")],this.regexToDelete=[new RegExp("^-*","g"),new RegExp("-*$","g")],this.options.apiUrl||(this.options.apiUrl=CKAN.SITE_URL+"/api/2/util/is_slug_valid"),this.options.MAX_SLUG_LENGTH||(this.options.MAX_SLUG_LENGTH=90),this.originalUrl=this.urlInput.val(),CKAN.Dgu.bindInputChanges(this.titleInput,this.titleChanged),CKAN.Dgu.bindInputChanges(this.urlInput,this.urlChanged),this.urlInput.keyup(a),this.urlInput.keydown(a),this.urlInput.keypress(a),this.urlChanged()},titleToSlug:function(a){var b=a;return $.each(this.regexToHyphen,function(a,c){b=b.replace(c,"-")}),$.each(this.regexToDelete,function(a,c){b=b.replace(c,"")}),b=b.toLowerCase(),b.length<this.options.MAX_SLUG_LENGTH&&(b=b.substring(0,this.options.MAX_SLUG_LENGTH)),b},titleChanged:function(){if(!this.disableTitleChanged){var a=this.titleInput.val();a!=this.lastTitle&&(this.lastTitle=a,slug=this.titleToSlug(a),this.urlInput.val(slug),this.urlInput.change())}},urlChanged:function(){var a=this.urlInput.val();if(this.updateTimer&&clearTimeout(this.updateTimer),a.length<2)this.validMsg.html('<span style="font-weight: bold; color: #444;">URL is too short.</span>');else if(a==this.originalUrl)this.validMsg.html('<span style="font-weight: bold; color: #000;">This is the current URL.</span>');else{this.validMsg.html('<span style="color: #777;">Checking...</span>');var b=this;this.updateTimer=setTimeout(function(){b.checkSlugIsValid(a)},200)}a.length>20?this.lengthMsg.show():this.lengthMsg.hide()},checkSlugIsValid:function(a){$.ajax({url:this.options.apiUrl,data:"type="+this.options.slugType+"&slug="+a,dataType:"jsonp",type:"get",jsonpCallback:"callback",success:this.apiCallback})},apiCallback:function(a){a.valid?this.validMsg.html('<span style="font-weight: bold; color: #0c0">This URL is available!</span>'):this.validMsg.html('<span style="font-weight: bold; color: #c00">This URL is not available.</span>')}}),$(function(){var a={lines:9,length:3,width:2,radius:4,rotate:3,color:"#FFF",speed:2.1,trail:43,shadow:!0,hwaccel:!1,className:"spinner",zIndex:2e9,top:"auto",left:"auto"},b=$("#shopping-basket-container");if(0!=b.length){var c=$("#shopping-basket"),d=$("#shopping-basket-reset"),e=$("#shopping-basket-submit"),f=[],g=[],h=function(){$.each($(".btn-basket"),function(b,c){g.push(new Spinner(a).spin(c)),$(c).find("span").css("opacity","0.1"),$(c).attr({disabled:"disabled"})}),c.empty(),g.push(new Spinner(a).spin(c[0]))},i=function(a){$.each(g,function(a,b){b.stop()}),g=[],$(".btn-basket").removeAttr("disabled"),$(".btn-basket span").css("opacity",""),c.empty(),$(".preview-add").show(),$(".preview-remove").hide(),$.each(a,function(a,b){var d=$("<li/>").html('<a href="/dataset/'+b.name+'">'+b.name+"</a>").attr("id",b.id),e=$("<button/>").addClass("btn").addClass("btn-small").addClass("x-button").html("x");e.prependTo(d),d.appendTo(c),$(".js-dataset-"+b.id+"-add").hide(),$(".js-dataset-"+b.id+"-remove").show()}),0==a.length&&b.is(":visible")&&b.hide("slow"),a.length>0&&!b.is(":visible")&&b.show("slow"),f=a},j=function(){var a="/api/2/util/preview_list";$.ajax({url:a,success:i,cache:!1})},k=function(a){var b=$(a.target).parents(".map-buttons"),c=b.find(".js-data-id").html(),d="/api/2/util/preview_list/add/"+c;$.ajax({url:d,success:i,error:j}),h()},l=function(a){var b=$(a.target).parents(".map-buttons"),c=b.find(".js-data-id").html(),d="/api/2/util/preview_list/remove/"+c;$.ajax({url:d,success:i,error:j}),h()},m=function(a){a.preventDefault();var b="/api/2/util/preview_list/reset";$.ajax({url:b,success:i,error:j})},n=function(a){var b=$(a.target).parents("li").attr("id"),c="/api/2/util/preview_list/remove/"+b;$.ajax({url:c,success:i,error:j}),h()},o=function(a){a.preventDefault();var b="/data/map-preview?",c={};f.length&&($.each(f,function(a,d){b+=d.querystring+"&";var e=d.extent;$.each("nwes",function(a,b){c[b]=c[b]?"n"==b||"e"==b?Math.max(c[b],e[a]):Math.min(c[b],e[a]):e[a]})}),c.n&&c.w&&c.e&&c.s&&$.each("nwes",function(a,d){c[d]&&(b+="&"+d+"="+c[d])}),window.location=b)};$(".preview-add button").bind("click",k),$(".preview-remove button").bind("click",l),e.bind("click",o),d.bind("click",m),$("#shopping-basket .x-button").live("click",n),j()}}),$(function(){var a={el:$(".search-spinner")[0],config:{lines:9,length:4,width:2,radius:3,rotate:0,color:"#000",speed:2,trail:60,shadow:!1,hwaccel:!1,className:"spinner",zIndex:2e9,top:"auto",left:"auto"},active:null,start:function(){this.active||(this.active=new Spinner(this.config).spin(this.el))},stop:function(){this.active&&(this.active.stop(),this.active=null)}},b="/api/2/search/dataset",c=function(c,d){$.ajax({url:b,data:{fl:"title",q:c.term},success:function(b){for(var c=b.results,e=[],f=0;f!=c.length;)e.push(c[f++].title);d(e),a.stop()}})},d=null,e=function(b,e){d&&(clearTimeout(d),d=null),b||(a.stop(),e([])),a.start(),d=setTimeout(function(){c(b,e)},200)},f=function(a){var b=$(a.target);b.is("a")&&$("#dataset-search #q").val(b.html()),$("form#dataset-search").submit()};$("#dataset-search #q").autocomplete({source:e,minLength:2,select:f})});