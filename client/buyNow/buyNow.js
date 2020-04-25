import { $ } from 'meteor/jquery'
import { getClientId } from './getClientId'
import './buyNow.html'

Template.buyNow.onCreated(function() {
	this.checkingOut = new ReactiveVar(false)
	this.message = new ReactiveVar('')
	this.platform = new ReactiveVar('google')
})

Template.buyNow.helpers({
	message: () => Template.instance().message.get(),
	idCalled: () =>
		Template.instance().platform.get() === 'google'
			? 'client ID'
			: 'anonymous ID',
	cliendId() {
		return getClientId(Template.instance().platform.get())
	},
})

Template.buyNow.events({
	'click .buy-now': function(event, template) {
		const variantId = $(event.target).data('variant')
		template.checkingOut.set(true)
		getClientId(template.platform.get())
			.then(clientId => {
				Meteor.call(
					'createCheckout',
					variantId,
					clientId,
					platform,
					(error, result) => {
						template.checkingOut.set(false)
						if (error) {
							return template.message.set(error.message)
						}
						template.message.set(
							`Set ${platform}-clientID as ${clientId} on the checkout attributes,
							and redirecting to ${result} in 10 seconds`
						)
						setTimeout(() => {
							//wait 10 seconds to show the message
							document.location.href = result
						}, 10000)
					}
				)
			})
			.catch(error => {
				template.message.set(error.message)
			})
	},
})
