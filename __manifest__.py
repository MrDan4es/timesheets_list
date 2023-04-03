# type: ignore
{
    'name': 'timesheets_list',
    'version': '16.0.0.1',
    'summary': 'Module for timesheet task order by last logged',
    'category': 'Generic Modules/Others',
    'author': 'RYDLAB',
    'maintainer': 'RYDLAB',
    'website': 'https://www.rydlab.ru',
    'license': 'GPL-3',
    'depends': [
        'hr_timesheet',
    ],
    'data': [
        'views/hr_timesheet_view.xml'
    ],
    'assets': {
        'web.assets_backend': [
            'timesheets_list/static/src/**/*',
        ],
        'project.webclient': [
            'timesheets_list/static/src/components/**/*'
        ],
    },
    'application': True,
    'installable': True,
    'auto_install': False,
}
