import { checkoutDict } from '../../lib/constants'

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
		Session.get('platform') === 'Google'
			? 'littledata'
			: 'segment-com-by-littledata'
	}`

export const appName = () =>
	Session.get('platform') === 'Google' ? 'Google Analytics' : 'Segment'

export const attributeName = () => {
	const platform = Session.get('platform')
	if (platform) {
		return `${platform.toLowerCase()}-clientID`
	}
	return ''
}

const keyName = () =>
	Session.get('checkout') === checkoutDict.SHOPIFY ? 'key' : 'name'

export const attributesObject = () => {
	const always = `{ ${keyName()}: "${attributeName()}", value: "${Session.get(
		'clientId'
	)}" }`
	let sometimes = ''
	if (Session.get('platform') === 'Segment') {
		const tracker = ga && typeof ga.getAll === 'function' && ga.getAll()[0]
		const gaClientId = tracker && tracker.get('clientId')
		sometimes = `, { ${keyName()}: "google-clientID", value: "${gaClientId}"}`
	}
	return `[ ${always}${sometimes} ]`
}

export const idCalled = () =>
	Session.get('platform') === 'Google' ? 'client ID' : 'anonymous ID'

export const ecommerceDocLink = () =>
	Session.get('platform') === 'Google'
		? 'https://developers.google.com/analytics/devguides/collection/gtagjs/enhanced-ecommerce'
		: 'https://segment.com/docs/connections/spec/ecommerce/v2/#core-ordering'

export const trackingScriptCode = () =>
	'https://github.com/littledata/headless-shopify-demo/blob/master/client/head.html'

export const linkToFunction = () => {
	const getClientFunctionName =
		Session.get('platform') === 'Google'
			? 'getGoogleClientId'
			: 'getSegmentAnonymousId'

	return `https://github.com/littledata/headless-shopify-demo/blob/master/client/buyNow/${getClientFunctionName}.js`
}

export const attributesArray = () => {
	const checkout = Session.get('checkout')
	console.log(checkout)
	if (checkout === checkoutDict.SHOPIFY) return 'customAttributes'
	if (checkout === checkoutDict.RECHARGE_OLD) return 'note_attributes'
	if (checkout === checkoutDict.RECHARGE) return 'order_attributes'
}

export const segmentWriteKey = () =>
	Session.get('platform') === 'Segment'
		? ` You can either share the same Segment source as your front end or create a ${buildLink(
				'new source',
				'https://help.littledata.io/posts/segment-installation-guide/'
		  )}.`
		: ''
