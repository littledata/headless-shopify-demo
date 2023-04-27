import littledata from '@littledata/headless-shopify-sdk'
import { showUserMessageAfterBuyClicked } from '../buyNow/helpers'

/**
 * @param {string} variantId Shopify product variant ID
 * @param {object} template Meteor (headless framework) template object
 * @returns {string} returns the checkout URL
 */
export const redirectToShopifyCheckout = (variantId, template) => {
	// notes object returned from fetchClientIds method in Littledata Shopify SDK
	const shopifyNoteAttributes = Session.get('shopifyNotes')

	// We are passing the variantId and the Shopify notes object to the server to create the checkout on the server side.
	// Server returns checkoutCreated object from which we get the checkout ID and the URL to redirect to.
	Meteor.call(
		'createShopifyCheckout',
		{ variantId, shopifyNoteAttributes },
		(error, checkoutCreated) => {
			if (error) {
				template.checkingOut.set(false)
				return template.message.set(error.message)
			}
			showUserMessageAfterBuyClicked(template)

			// We are passing the Shopify checkout ID to Littledata servers to stitch the frontend session.
			// This enables correct attribution tracking
			littledata.sendCheckoutToLittledata(checkoutCreated.id)

			setTimeout(() => {
				//show the message and wait for 8s before redirecting
				template.checkingOut.set(false)
				document.location.href = checkoutCreated.url
			}, 8000)
		}
	)
}
