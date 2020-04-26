import { $ } from 'meteor/jquery'
import { getClientId } from './getClientId'
import { faqs, idCalled } from './faqs'
import './buyNow.html'

Template.buyNow.onCreated(function() {
	this.checkingOut = new ReactiveVar(false)
	this.message = new ReactiveVar('')
	this.clientId = new ReactiveVar('')
	const instance = this
	instance.autorun(() => {
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
})

Template.buyNow.events({
	'click .buy-now': function(event, template) {
		const variantId = $(event.target).data('variant')
		template.checkingOut.set(true)
		const platform = Session.get('platform').toLowerCase()
		const clientId = $(event.target).data('clientid')
		Meteor.call(
			'createCheckout',
			variantId,
			clientId,
			platform,
			(error, result) => {
				if (error) {
					template.checkingOut.set(false)
					return template.message.set(error.message)
				}
				template.message.set(
					`We set '${platform}-clientID' as ${clientId} on the checkout attributes,
							and will redirect you to the checkout in 8 seconds`
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
