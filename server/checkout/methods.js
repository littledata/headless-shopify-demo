import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

import fetch from 'node-fetch'
import Client from 'shopify-buy'
import { domain } from '/lib/constants'

export const storefrontAccessToken = '662510a2eec4bf6b0ffb413754a86205'
const storefrontAPI = Client.buildClient(
	{
		domain,
		storefrontAccessToken,
	},
	fetch
)

Meteor.methods({
	async createShopifyCheckout({ variantId, clientId, platform }) {
		check(variantId, String) //Storefront variant ID
		check(clientId, Match.Maybe(String))
		check(platform, String)

		//this is our product to checkout
		const lineItemsToAdd = [
			{
				variantId,
				quantity: 1,
			},
		]
		const updateAttributes = {}
		//this is the field Littledata's webhook will pick up
		if (clientId) {
			updateAttributes.customAttributes = [
				{ key: `${platform}-clientID`, value: clientId },
			]
		}

		//first create checkout with the chosen line items
		const checkout = await storefrontAPI.checkout.create()
		const checkoutId = checkout.id
		await storefrontAPI.checkout.addLineItems(checkoutId, lineItemsToAdd)

		//then add clientID as custom attribute
		//https://shopify.github.io/js-buy-sdk/#updating-checkout-attributes
		await storefrontAPI.checkout.updateAttributes(
			checkoutId,
			updateAttributes
		)
		//finally direct user back to the checkout page
		return checkout.webUrl
	},
})
