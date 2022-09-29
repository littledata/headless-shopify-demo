/* eslint-disable max-len */
import { checkoutDict, platformDict, measurementId } from '../../lib/constants'
import { parseGA4Cookie } from './getGoogleClientId'

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

export const appLink = () =>
	`https://apps.shopify.com/${
		Session.get('platform') === platformDict.SEGMENT
			? 'segment-com-by-littledata'
			: 'littledata'
	}`

export const appName = () =>
	Session.get('platform') === platformDict.SEGMENT
		? platformDict.SEGMENT
		: 'Google Analytics'

export const attributesNeeded = () => {
	const platform = Session.get('platform')
	const attributes = { 'google-clientID': 'GA_COOKIE_CLIENTID' }
	if (platform === platformDict.SEGMENT) {
		attributes['segment-clientID'] =
			window.analytics.user().anonymousId() || 'SEGMENT_ANONYMOUSID'
	}
	if (platform === platformDict.GA4) {
		attributes['ga4session-clientID'] = parseGA4Cookie(
			`_ga_${measurementId}`
		)
	}
	if (platform === platformDict.FACEBOOK) {
		attributes['fbp-clientID'] = 'FBP_COOKIE_VALUE'
		attributes['fbc-clientID'] = 'FBC_COOKIE_VALUE'
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

export const idCalled = () =>
	Session.get('platform') === platformDict.SEGMENT
		? 'anonymous ID'
		: 'client ID'

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

export const linkToFunction = () => {
	const getClientFunctionName =
		Session.get('platform') === platformDict.SEGMENT
			? 'getSegmentAnonymousId'
			: 'getGoogleClientId'

	return `https://github.com/littledata/headless-shopify-demo/blob/master/client/buyNow/${getClientFunctionName}.js`
}

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
