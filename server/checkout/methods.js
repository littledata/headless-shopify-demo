import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { createShopifyCheckout } from './createShopifyCheckout'

Meteor.methods({
	async createShopifyCheckout(params) {
		const { variantId, shopifyNoteAttributes } = params
		check(variantId, String) //Storefront variant ID
		check(shopifyNoteAttributes, [Object]) //Shopify notes

		return createShopifyCheckout(params)
	},
})
