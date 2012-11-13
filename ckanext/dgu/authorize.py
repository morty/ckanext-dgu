from pylons.i18n import _
from ckan.authz import Authorizer
from ckan.logic import check_access_old
from ckan.logic.auth import get_group_object, get_package_object
from ckan.logic.auth.publisher import _groups_intersect
from ckan.plugins import implements, SingletonPlugin, IAuthFunctions


def dgu_group_update(context, data_dict):
    """
    Group edit permission.  Checks that a valid user is supplied and that the user is
    a member of the group currently with any capacity.
    """
    model = context['model']
    user = context.get('user','')
    group = get_group_object(context, data_dict)

    if not user:
        return {'success': False, 'msg': _('Only members of this group are authorized to edit this group')}

    # Sys admins should be allowed to update groups
    if Authorizer().is_sysadmin(unicode(user)):
        return { 'success': True }

    # Only allow package update if the user and package groups intersect
    user_obj = model.User.get( user )
    if not user_obj:
        return { 'success' : False, 'msg': _('Could not find user %s') % str(user) }

    # Only admins of this group should be able to update this group
    if not _groups_intersect( user_obj.get_groups( 'publisher', 'admin' ), [group] ):
        return { 'success': False, 'msg': _('User %s not authorized to edit this group') % str(user) }

    return { 'success': True }


def dgu_group_create(context, data_dict=None):
    model = context['model']
    user = context['user']

    if Authorizer().is_sysadmin(unicode(user)):
        return {'success': True}

    return {'success': False, 'msg': _('User %s not authorized to create groups') % str(user)}


def dgu_package_create(context, data_dict):
    model = context['model']
    user = context.get('user')
    user_obj = model.User.get( user )

    if not user_obj:
        return {'success': False}

    if Authorizer().is_sysadmin(user_obj):
        return {'success': True}

    user_publishers = user_obj.get_groups('publisher')

    if not data_dict:
        # i.e. not asking in relation to a particular package. We only let
        # publishers do this
        return {'success': bool(user_publishers)}

    if not user_obj:
        return {'success': False,
                'msg': _('User %s not authorized to edit packages of this publisher') % str(user)}

    user_publisher_names = [pub.name for pub in user_publishers]
    if data_dict['groups'] and isinstance(data_dict['groups'][0], dict):
        package_group_names = [pub['name'] for pub in data_dict['groups']]
    else:
        # Just get the group name in the rest interface
        package_group_names = data_dict['groups']

    if not _groups_intersect(user_publisher_names, package_group_names):
        return {'success': False,
                'msg': _('User %s not authorized to edit packages of this publisher') % str(user)}

    return {'success': True}

def dgu_package_create_rest(context, data_dict):
    model = context['model']
    user = context['user']
    if user in (model.PSEUDO_USER__VISITOR, ''):
        return {'success': False, 'msg': _('Valid API key needed to create a package')}

    return dgu_package_create(context, data_dict)

def dgu_package_update(context, data_dict):
    model = context['model']
    user = context.get('user')
    user_obj = model.User.get( user )
    package = get_package_object(context, data_dict)

    if Authorizer().is_sysadmin(user_obj):
        return {'success': True}

    # Only sysadmins can edit UKLP packages.
    # Note: the harvest user *is* a sysadmin
    # Note: if changing this, check the code and comments in
    #       ckanext/forms/dataset_form.py:DatasetForm.form_to_db_schema_options()
    if package.extras.get('UKLP', '') == 'True':
        return {'success': False,
                'msg': _('User %s not authorized to edit packages in these groups') % str(user)}

    if not user_obj or \
       not _groups_intersect( user_obj.get_groups('publisher'), package.get_groups('publisher') ):
        return {'success': False,
                'msg': _('User %s not authorized to edit packages of this publisher') % str(user)}

    return {'success': True}

def dgu_package_update_rest(context, data_dict):
    model = context['model']
    user = context['user']

    if user in (model.PSEUDO_USER__VISITOR, ''):
        return {'success': False, 'msg': _('Valid API key needed to edit a package')}

    return dgu_package_update(context, data_dict)

def dgu_dataset_delete(context, data_dict):
    """
    Determines whether a dataset's state can be set to "deleted".

    Currently only sysadmin users can do this.
    """
    model = context['model']
    user = context.get('user')
    package = get_package_object(context, data_dict)

    if Authorizer().is_sysadmin(unicode(user)):
        return {'success': True}

    return {'success': False}

def dgu_extra_fields_editable(context, data_dict):
    """
    Determines whether a dataset's extra-fields are editable directly.

    Typically, this is only something we want sysadmins to be able to do.
    """
    user = context.get('user')
    if Authorizer().is_sysadmin(unicode(user)):
        return {'success': True}
    else:
        return {'success': False,
                'msg': _('User %s not authorized to edit a dataset\'s extra fields') % str(user)}

def dgu_user_show(context, data_dict):
    return dgu_user_list(context, data_dict)

def dgu_user_list(context, data_dict):
    model = context['model']
    user = context.get('user','')
    user_obj = model.User.get(user)

    if Authorizer().is_sysadmin(unicode(user)):
        return {'success': True}

    if not user or not user_obj:
        return {'success': False, 'msg': _('You must be logged in to view the user list')}

    if not len(user_obj.get_groups( 'publisher')):
        return { 'success': False, 'msg': _('Only publishers may view this page') }

    return {'success': True}
