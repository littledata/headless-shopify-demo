import { $ } from 'meteor/jquery'
import { getGoogleClientId } from './getGoogleClientId'
import { getSegmentAnonymousId } from './getSegmentAnonymousId'
import { idCalled, attributeName } from './helpers'
import { faqs } from './faqs'
import { domain } from '/lib/constants'
import './buyNow.html'

Template.buyNow.onCreated(function() {
	this.checkingOut = new ReactiveVar(false)
	this.message = new ReactiveVar('')

	const instance = this
	instance.autorun(() => {
		Session.get('tryAgain')
		const callFunction =
			Session.get('platform') === 'Google'
				? getGoogleClientId
				: getSegmentAnonymousId
		callFunction()
			.then(clientId => {
				if (clientId) {
					Session.set('clientId', clientId)
				} else {
					//trigger autorun again
					Session.set('tryAgain', true)
				}
			})
			.catch(err => {
				instance.message.set(err.message)
			})
	})
})

Template.buyNow.helpers({
	message: () => Template.instance().message.get(),
	idCalled,
	clientId: () => Session.get('clientId'),
	checkingOut: () => Template.instance().checkingOut.get(),
	heading: () => 'Do this on your headless store',
	faqs,
	recharge: () => Session.get('checkout') === 'ReCharge',
	sendClientId: () => Session.get('sendClientId'),
})

Template.buyNow.events({
	'click .buy-now': function(event, template) {
		const variantId = $(event.target).data('variant')
		template.checkingOut.set(true)
		const platform = Session.get('platform').toLowerCase()
		let clientId
		if (Session.get('sendClientId') !== false) {
			clientId = $(event.target).data('clientid')
		}

		if (Session.get('checkout') === 'ReCharge') {
			//ReCharge checkout needs to come from Shopify storefront
			const cartURL = `https://${domain}/cart?attribute[${attributeName()}]=${clientId}`
			document.location.href = cartURL
		}

		Meteor.call(
			'createShopifyCheckout',
			{ variantId, clientId, platform },
			(error, result) => {
				if (error) {
					template.checkingOut.set(false)
					return template.message.set(error.message)
				}
				const addedClientId = clientId
					? `We set '${platform}-clientID' as ${clientId} on the checkout attributes. `
					: 'sendClientId set to FALSE. '
				template.message.set(
					`<span class="red">${addedClientId}Redirecting you to the checkout in 8 seconds</span>`
				)
				setTimeout(() => {
					//wait 10 seconds to show the message
					template.checkingOut.set(false)
					document.location.href = result
				}, 8000)
			}
		)
	},
})
