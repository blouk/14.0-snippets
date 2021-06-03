odoo.define( 'website_snippet.s_dynamic_snippet_products_selector_options', function ( require ) {
	'use strict';

	const options = require( 'web_editor.snippets.options' );


	options.registry.DynamicSnippetProductSelectorOptions = options.Class.extend( {
		init: function () {
			this._super.apply( this, arguments );
			this.products = {};
		},



		_renderCustomXML: async function ( uiFragment ) {
			await this._renderProductsSelector( uiFragment );
		},

		_getProducts: function () {
			return this._rpc( { route: '/products/get_all' } );
		},

		_renderSelectUserValueWidgetButtons: async function ( selectUserValueWidgetElement, data ) {
			for ( let id in data ) {
				const button = document.createElement( 'we-button' );
				button.dataset.selectDataAttribute = id;
				button.innerHTML = data[ id ].name;
				selectUserValueWidgetElement.appendChild( button );
			}
		},

		_renderProductsSelector: async function ( uiFragment ) {
			const products = await this._getProducts();
			for ( let index in products ) {
				this.products[ products[ index ].id ] = products[ index ];
			}
			const productsSelectorEl = uiFragment.querySelector( '[data-name="products_opt"]' );
			return this._renderSelectUserValueWidgetButtons( productsSelectorEl, this.products );
		},

	} );


} );
