import { $ } from 'meteor/jquery'
import { redirectToShopifyCheckout } from '../utility/redirectToShopifyCheckout'
import { fetchClientIds } from '../utility/fetchClientIds'
import { idCalled, attributesInUrlParams, isSessionIdCalled } from './helpers'
import { faqs } from './faqs'
import { domain } from '/lib/constants'
import './buyNow.html'

Template.buyNow.onCreated(function() {
	this.checkingOut = new ReactiveVar(false)
	this.message = new ReactiveVar('')
	Session.set('clientId', 'loading..')

	const instance = this
	instance.autorun(() => {
		Session.get('tryAgain')

		const params = {}
		switch (Session.get('platform')) {
			case 'Segment':
				params.segmentWriteKey = '1MTr5E0mmf92XtjsOhAmPWHq6D8aHBGC'
				Session.set('notesKey', '_segment-clientID')
				break
			case 'GA4':
				params.ga4MeasurementId = 'G-KVCYFM7ZSM'
				Session.set('notesKey', '_google-clientID')
				break
			case 'Google':
				params.ga3PropertyId = 'UA-92368602-75'
				Session.set('notesKey', '_google-clientID')
				break
			case 'Facebook CAPI':
				params.fbPixelId = '123123'
				Session.set('notesKey', '_fbp-clientID')
				break
			default:
				break
		}

		localStorage.removeItem('littledataIDs')
		fetchClientIds(params)
	})
})

Template.buyNow.helpers({
	message: () => Template.instance().message.get(),
	idCalled,
	isSessionIdCalled,
	clientId: () => Session.get('clientId'),
	sessionId: () => Session.get('sessionId'),
	checkingOut: () => Template.instance().checkingOut.get(),
	heading: () => 'Do this on your headless store',
	faqs,
	sendClientId: () => Session.get('sendClientId'),
})

Template.buyNow.events({
	'click .buy-now': (event, template) => {
		const variantId = $(event.target).data('variant')
		template.checkingOut.set(true)

		redirectToShopifyCheckout(variantId, template)
	},
})
