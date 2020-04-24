import { getClientId } from './getClientId'
import './buyNow.html'

Template.buyNow.onCreated(function() {
	this.checkingOut = new ReactiveVar(false)
	this.message = new ReactiveVar('')
})

Template.buyNow.events({
	'click .buy-now': function(event, template) {
		console.log('click')
		const variantId = $(event.target).data('variant-id')
		template.checkingOut.set(true)
		const platform = 'google'
		getClientId(platform)
			.then(clientId => {
				Meteor.call(
					'createCheckout',
					variantId,
					clientId,
					false,
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
