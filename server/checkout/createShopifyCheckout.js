import { storefrontAPI } from './storefrontAPI'

/**
 * @param {string} variantId Shopify variant ID
 * @param {array} shopifyNoteAttributes Shopify notes array received from the frontend
 * @returns {string} passes the checkout URL and checkout ID back to frontend
 */
export const createShopifyCheckout = async ({
	variantId,
	shopifyNoteAttributes,
}) => {
	// first create checkout with the chosen line items
	const checkout = await storefrontAPI.checkout.create()
	const checkoutId = checkout.id
	await storefrontAPI.checkout.addLineItems(
		checkoutId,
		lineItemsToAdd(variantId)
	)

	if (shopifyNoteAttributes) {
		const updateAttributes = { customAttributes: shopifyNoteAttributes }

		// adding custom attributes to Shopify checkout
		// https://shopify.github.io/js-buy-sdk/#updating-checkout-attributes
		await storefrontAPI.checkout.updateAttributes(
			checkoutId,
			updateAttributes
		)
	}

	// finally direct user back to the checkout page
	return { url: checkout.webUrl, id: checkout.id }
}

function lineItemsToAdd(variantId) {
	return [
		{
			variantId,
			quantity: 1,
		},
	]
}
