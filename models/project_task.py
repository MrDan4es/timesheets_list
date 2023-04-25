from odoo import api, models


class Task(models.Model):
    _inherit = 'project.task'

    @api.model
    def search_with_date_order(self, name, args, limit):
        user_id = self.env.context.get('uid')

        result = self.env['account.analytic.line'].read_group(
            [
                '&', ('user_id', '=', user_id), ('task_id.name', 'ilike', name)
            ] + args,
            fields=['task_id.name', 'date:max'],
            groupby=['task_id'],
            orderby='date desc',
            limit=limit
        )

        return list(map(
            lambda data: (data['task_id'][0], data['task_id'][1]), result
        ))
