import { $ } from 'meteor/jquery'
import { getClientId } from './getClientId'
import { faqs, idCalled, attributeName } from './faqs'
import { domain } from '/lib/constants'
import './buyNow.html'

Template.buyNow.onCreated(function() {
	this.checkingOut = new ReactiveVar(false)
	this.message = new ReactiveVar('')
	this.clientId = new ReactiveVar('')
	const instance = this
	instance.autorun(() => {
		Session.get('checkout')
		getClientId(Session.get('platform'))
			.then(clientId => instance.clientId.set(clientId))
			.catch(err => {
				instance.message.set(err.message)
			})
	})
})

Template.buyNow.helpers({
	message: () => Template.instance().message.get(),
	idCalled,
	clientId: () => Template.instance().clientId.get(),
	checkingOut: () => Template.instance().checkingOut.get(),
	heading: () => 'Do this on your headless store',
	faqs,
	recharge: () => Session.get('checkout') === 'ReCharge',
})

Template.buyNow.events({
	'click .buy-now': function(event, template) {
		const variantId = $(event.target).data('variant')
		template.checkingOut.set(true)
		const platform = Session.get('platform').toLowerCase()
		const clientId = $(event.target).data('clientid')

		if (Session.get('checkout') === 'ReCharge') {
			//ReCharge checkout needs to come from Shopify storefront
			const cartURL = `https://${domain}/cart?attribute[${attributeName()}]=${template.clientId.get()}`
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
				template.message.set(
					`<span class="red">We set '${platform}-clientID' as ${clientId} on the checkout attributes,
							and will redirect you to the checkout in 8 seconds</span>`
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
