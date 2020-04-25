import { $ } from 'meteor/jquery'
import { getClientId } from './getClientId'
import './buyNow.html'

const idCalled = () =>
	Session.get('platform') === 'google' ? 'client ID' : 'anonymous ID'

const buildLink = (text, link) =>
	`<a href="${link}" target="_blank">${text}</a>`

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
	heading: () => 'How to do this on your site',
	items() {
		return [
			{
				heading: 'Install our app',
				description: '',
			},
			{
				heading: `Grab the ${idCalled()}`,
				description:
					'See how we get the ${} before the user clicks buys',
			},
			{
				heading: 'Add that ID as a checkout attribute',
				description: `Shopify allows you to ${buildLink(
					'add custom attributes',
					''
				)} to the cart, like '${Session.get(
					'platform'
				)}-clientID'. See how we do that here.`,
			},
			{
				heading: 'Add that ID as a checkout attribute',
				description:
					'Shopify allows you to add custom attributes to the cart. See how we do that here.',
			},
		]
	},
})

Template.buyNow.events({
	'click .buy-now': function(event, template) {
		const variantId = $(event.target).data('variant')
		template.checkingOut.set(true)
		const platform = Session.get('platform')
		const clientId = template.clientId.get()
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
