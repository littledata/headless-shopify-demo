import { storefrontAPI } from './storefrontAPI'

export const createShopifyCheckout = async ({
	variantId,
	clientId,
	platform,
}) => {
	//first create checkout with the chosen line items
	const checkout = await storefrontAPI.checkout.create()
	const checkoutId = checkout.id
	await storefrontAPI.checkout.addLineItems(
		checkoutId,
		lineItemsToAdd(variantId)
	)

	if (clientId) {
		const updateAttributes = {}

		updateAttributes.customAttributes = [
			//this is the field Littledata's webhook will pick up
			{ key: `${platform}-clientID`, value: clientId },
		]

		//then add clientID as custom attribute
		//https://shopify.github.io/js-buy-sdk/#updating-checkout-attributes
		await storefrontAPI.checkout.updateAttributes(
			checkoutId,
			updateAttributes
		)
	}

	//finally direct user back to the checkout page
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
