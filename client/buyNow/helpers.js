/* eslint-disable max-len */
import { checkoutDict, platformDict } from '../../lib/constants'

export const isRechargeCheckout = () => {
	return (
		Session.get('checkout') === checkoutDict.RECHARGE ||
		Session.get('checkout') === checkoutDict.RECHARGE_OLD
	)
}

export const buildLink = (text, link) =>
	`<a href="${link}" target="_blank">${text}</a>`

export const startingRecharge = () =>
	isRechargeCheckout()
		? ` You then need to add the ${buildLink(
				'Recharge connection',
				'https://help.littledata.io/posts/recharge-integration-setup-guide/'
		  )} in Littledata.`
		: ''

export const helpLink = () =>
	`https://help.littledata.io/posts/${
		Session.get('platform') === platformDict.SEGMENT
			? 'headless-shopify-tracking-for-segment'
			: 'install-guide-google-analytics-4-connection'
	}`

export const appLink = () =>
	`https://apps.shopify.com/${
		Session.get('platform') === platformDict.SEGMENT
			? 'segment-com-by-littledata'
			: 'littledata'
	}`

export const appName = () => {
	switch (Session.get('platform')) {
		case platformDict.SEGMENT:
			return 'Segment'
		case platformDict.GA4:
			return 'Google Analytics 4'
		case platformDict.FACEBOOK:
			return 'Facebook'
		case platformDict.UA:
			return 'Google Analytics'
		default:
			return ''
	}
}

export const attributesNeeded = () => {
	const platform = Session.get('platform')
	const attributes = {}
	if (platform === platformDict.SEGMENT) {
		attributes['_segment-clientID'] =
			Session.get('clientId') || 'SEGMENT_ANONYMOUSID'
	}
	if (platform === platformDict.GA4) {
		attributes['_ga4session-clientID'] =
			Session.get('sessionId') || 'GA4_SESSION_HERE'
		attributes['_google-clientID'] =
			Session.get('clientId') || 'GA_COOKIE_CLIENTID'
	}
	if (platform === platformDict.UA) {
		attributes['_google-clientID'] =
			Session.get('clientId') || 'GA_COOKIE_CLIENTID'
	}
	if (platform === platformDict.FACEBOOK) {
		attributes['_fbp-clientID'] =
			Session.get('clientId') || 'FBP_COOKIE_VALUE'
		attributes['_fbc-clientID'] = 'FBC_COOKIE_VALUE'
	}
	return attributes
}

const keyName = () =>
	Session.get('checkout') === checkoutDict.SHOPIFY ? 'key' : 'name'

export const attributesObject = () => {
	const attributes = attributesNeeded()
	const objects = Object.keys(attributes).map(key => {
		return `{ ${keyName()}: "${key}, value: "${attributes[key]}" }`
	})
	return `[ ${objects} ]`
}

export const attributesInUrlParams = () => {
	const attributes = attributesNeeded()
	const params = Object.keys(attributes).map(key => {
		return `attribute[${key}]=${attributes[key]}&`
	})
	return params.slice(0, params.length - 1) // remove trailing &
}

export const idCalled = () => {
	switch (Session.get('platform')) {
		case platformDict.SEGMENT:
			return 'anonymous ID'
		case platformDict.GA4:
			return 'client and session IDs'
		default:
			return 'client ID'
	}
}

export const isSessionIdCalled = () =>
	Session.get('platform') === platformDict.GA4 || null

export const ecommerceDocLink = () => {
	const platform = Session.get('platform')

	if (platform === platformDict.SEGMENT) {
		return 'https://segment.com/docs/connections/spec/ecommerce/v2/#core-ordering'
	}

	if (platform === platformDict.UA) {
		return 'https://developers.google.com/analytics/devguides/collection/gtagjs/enhanced-ecommerce'
	}

	return 'https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtag'
}

export const trackingScriptCode = () =>
	'https://github.com/littledata/headless-shopify-demo/blob/master/client/head.html'

export const attributesArray = () => {
	const checkout = Session.get('checkout')
	if (checkout === checkoutDict.SHOPIFY) return 'customAttributes'
	if (checkout === checkoutDict.RECHARGE_OLD) return 'note_attributes'
	if (checkout === checkoutDict.RECHARGE) return 'order_attributes'
}

export const segmentWriteKey = () =>
	Session.get('platform') === platformDict.SEGMENT
		? ` You can either share the same Segment source as your front end or create a ${buildLink(
				'new source',
				'https://help.littledata.io/posts/segment-installation-guide/'
		  )}.`
		: ''

export const showUserMessageAfterBuyClicked = template => {
	let clientId
	let sessionId
	if (Session.get('sendClientId') !== false) {
		clientId = Session.get('clientId')
		sessionId = Session.get('sessionId')
	}
	const platform = Session.get('platform').toLowerCase()
	const cidString = clientId
		? `We set '_${platform}-clientID' as ${clientId} on the checkout attributes. `
		: null
	const ga4String = sessionId
		? `We set '_ga4session-clientID' as ${sessionId} and '_google-clientID' as ${clientId} on the checkout attributes. `
		: null
	const addedClientId =
		ga4String || cidString || 'sendClientId set to FALSE. '
	template.message.set(
		`<span class="red">${addedClientId}Redirecting you to the checkout in 8 seconds</span>`
	)
}

export const saveClientIdToMeteorSession = shopifyNotes => {
	const notesKey = Session.get('notesKey')
	Session.set(
		'clientId',
		shopifyNotes.find(noteArr => noteArr.key === notesKey)?.value
	)
}

export const saveSessionIdToMeteorSession = shopifyNotes => {
	const sessionIdValue =
		Session.get('platform') === 'GA4'
			? shopifyNotes.find(
					noteArr => noteArr.key === '_ga4session-clientID'
			  )?.value
			: null

	Session.set('sessionId', sessionIdValue)
}

export const saveShopifyNotesToMeteorSession = shopifyNotes =>
	Session.set('shopifyNotes', shopifyNotes)
