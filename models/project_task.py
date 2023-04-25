import logging

from odoo import api, models


_logger = logging.getLogger(__name__)


class Task(models.Model):
    _inherit = 'project.task'
    
    @api.model
    def test(self, name, args, limit):
        user_id = self.env.context.get('uid')
        _logger.info(self.env.context)
        _logger.info(args)
        # data = self.env['pro']
        ids = self._name_search(name, args, 'ilike', limit=limit)
        result = self.browse(ids).sudo().name_get()
        
        return result