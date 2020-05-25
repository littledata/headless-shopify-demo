import { getGoogleClientId } from './getGoogleClientId'

export const buildLink = (text, link) =>
	`<a href="${link}" target="_blank">${text}</a>`

export const startingReCharge = () =>
	Session.get('checkout') === 'ReCharge'
		? ` You then need to ${buildLink(
				'add the ReCharge connection',
				'https://blog.littledata.io/help/posts/recharge-integration-setup-guide/'
		  )} in Littledata.`
		: ''

export const appLink = () =>
	`https://apps.shopify.com/${
		Session.get('platform') === 'Google'
			? 'littledata'
			: 'segment-com-by-littledata'
	}`

export const attributeName = () => {
	const platform = Session.get('platform')
	if (platform) {
		return `${platform.toLowerCase()}-clientID`
	}
	return ''
}

export const attributesObject = () => {
	const always = `{ ${attributeName()} : '${Session.get('clientId')}' }`
	let sometimes = ''
	if (Session.get('platform') === 'Segment') {
		sometimes = `, { google-clientID: '${ga.getAll()[0].get('clientId')}'}`
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

export const attributesArray = () =>
	Session.get('checkout') === 'ReCharge'
		? 'note_attributes'
		: 'customAttributes'

export const segmentWriteKey = () =>
	Session.get('platform') === 'Segment'
		? ` You can either share the same Segment source as your front end or create a ${buildLink(
				'new source',
				'https://blog.littledata.io/help/posts/segment-installation-guide/'
		  )}.`
		: 'for Littledata'
