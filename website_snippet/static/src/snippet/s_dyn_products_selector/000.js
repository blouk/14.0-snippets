odoo.define( 'website_snippet.s_dynamic_snippet_products_selector', function ( require ) {
	'use strict';
	const core = require( 'web.core' );
	const publicWidget = require( 'web.public.widget' );


	const SnippetSelector = publicWidget.Widget.extend( {
		selector: '.s_dynamic_snippet_products_selector',
		xmlDependencies: [ '/website_snippet/static/src/snippet/s_dyn_products_selector/000.xml' ],

		_get_product: function ( prd_id ) {
			return this._rpc( {
				model: 'product.template',
				method: 'read',
				args: [ [ prd_id ], [ 'id', 'name' ] ],
			} ).then( ( data ) => {
				this.product = data;
			} );
		},

		_has_product_id: function () {
			return this.$el.get( 0 ).dataset.product !== undefined
		},

		_render: function () {
			if ( this.product ) {
				this.$el.find( '.content' ).empty().html( core.qweb.render( 'website_snippet.s_dyn_products_selector', { 'product': this.product[ 0 ] } ) );
			}
		},

		_init: function () {
			this._super.apply( this, arguments );
			this.product = {};
		},

		start: function () {
			return this._super.apply( this, arguments )
				.then( () => {
					this.$el.find( '.message_no_product' ).toggleClass( 'd-none', !( this._has_product_id() || !this.editableMode ) );
					if ( this._has_product_id() ) {
						this._render();
					}
				} );

		},


		willStart: function () {
			const prd_id = this.$el.data( 'product' );
			return this._super.apply( this, arguments ).then(
				() => Promise.all( [
                this.product = this._get_product( prd_id )
            ] )
			);
		},
	} );

	publicWidget.registry.s_dynamic_snippet_products_selector = SnippetSelector;
	return SnippetSelector;
} );
