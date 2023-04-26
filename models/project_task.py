from odoo import api, models


class Task(models.Model):
    _inherit = 'project.task'

    @api.model
    def search_with_date_order(self, name, args, limit):
        user_id = self.env.context.get('uid')

        if name:
            args += ['|', ('task_uid', 'ilike', name)]
            ids = self._name_search(name, args, 'ilike', limit=limit)
            result = self.browse(ids).sudo().name_get()
        else:
            args = [
                '&', ('user_id', '=', user_id), ('task_id.name', 'ilike', name)
            ] + args
            recordset = self.env['account.analytic.line'].read_group(
                args,
                fields=['task_id.name', 'date:max'],
                groupby=['task_id'],
                orderby='date desc',
                limit=limit
            )
            result = list(map(
                lambda data: (data['task_id'][0], data['task_id'][1]),
                recordset
            ))

        return result
