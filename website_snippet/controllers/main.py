from odoo import http, models, fields, _
from odoo.http import request
from odoo.addons.website_sale.controllers.main import WebsiteSale


class WebsiteSale(WebsiteSale):

    @http.route('/products/get_all', type='json', auth='user', website=True)
    def get_all_products(self):
        products = request.env['product.template'].sudo().search_read([('website_published','=',True)],['id', 'name'])
        return products
