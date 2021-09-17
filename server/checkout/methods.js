import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { createShopifyCheckout } from './createShopifyCheckout'

Meteor.methods({
	async createShopifyCheckout(params) {
		const { variantId, clientId, platform } = params
		check(variantId, String) //Storefront variant ID
		check(clientId, Match.Maybe(String))
		check(platform, String)

		return createShopifyCheckout(params)
	},
})
