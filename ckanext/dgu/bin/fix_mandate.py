'''
Fix the mandate to be a JSON list

e.g.

http://example.com/ -> ['http://example.com']
'''

import sys
import common
import json
from optparse import OptionParser
from ckan import model

from running_stats import StatsList

stats = StatsList()

class FixMandate(object):
    @classmethod
    def command(cls, config_ini, write):
        common.load_config(config_ini)
        common.register_translator()

        rev = model.repo.new_revision()
        rev.author = 'script-fix_mandate.py'

        for package in model.Session.query(model.Package).filter(model.Package.state=='active'):
            if 'mandate' in package.extras:
                stats.add('Fixing', package.name)

                mandate = package.extras.get('mandate')

                if mandate:
                    package.extras['mandate'] = json.dumps([mandate])
                else:
                    package.extras['mandate'] = json.dumps([])
        if write:
            model.Session.commit()

        print stats.report()


def usage():
    print """
Fix the mandate to be a JSON list

Usage:

    python fix_mandate.py <CKAN config ini filepath>
    """

if __name__ == '__main__':
    parser = OptionParser(usage='')
    parser.add_option("-w", "--write",
                      action="store_true",
                      dest="write",
                      default=False,
                      help="write the changes to the datasets")
    (options, args) = parser.parse_args()
    if len(args) != 1:
        usage()
        sys.exit(1)
    config_ini = args[0]
    FixMandate.command(config_ini, options.write)
