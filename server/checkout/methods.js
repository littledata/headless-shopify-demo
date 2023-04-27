import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { createShopifyCheckout } from './createShopifyCheckout'

Meteor.methods({
	async createShopifyCheckout(params) {
		const { variantId, shopifyNotes } = params
		check(variantId, String) //Storefront variant ID
		check(shopifyNotes, [Object]) //Shopify notes

		return createShopifyCheckout(params)
	},
})
