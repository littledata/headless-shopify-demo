import { storefrontAPI } from './storefrontAPI'

/**
 * @param {string} variantId Shopify variant ID
 * @param {string} clientId browser identifier, picked up from cookie
 * @param {string} platform the analytics platform generating the clientId - 'google' or 'segment'
 * @returns {string} returns the checkout URL
 */
export const createShopifyCheckout = async ({
	variantId,
	clientId,
	platform, // 'google' or 'segment'
}) => {
	// first create checkout with the chosen line items
	const checkout = await storefrontAPI.checkout.create()
	const checkoutId = checkout.id
	await storefrontAPI.checkout.addLineItems(
		checkoutId,
		lineItemsToAdd(variantId)
	)

	if (clientId) {
		const updateAttributes = {}

		updateAttributes.customAttributes = [
			//this is the attribute Littledata's webhook will pick up
			// e.g. { key: 'google-clientID', value: '1234567.1234567'}
			{ key: `${platform}-clientID`, value: clientId },
		]

		// then add custom attributes to checkout
		// https://shopify.github.io/js-buy-sdk/#updating-checkout-attributes
		await storefrontAPI.checkout.updateAttributes(
			checkoutId,
			updateAttributes
		)
	}

	// finally direct user back to the checkout page
	return checkout.webUrl
}

function lineItemsToAdd(variantId) {
	return [
		{
			variantId,
			quantity: 1,
		},
	]
}
