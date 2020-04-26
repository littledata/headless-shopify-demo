const buildLink = (text, link) =>
	`<a href="${link}" target="_blank">${text}</a>`

const appLink = () =>
	`https://apps.shopofy.com/${
		Session.get('platform') === 'Google'
			? 'littledata'
			: 'segment-com-by-littledata'
	}`

export const idCalled = () =>
	Session.get('platform') === 'Google' ? 'client ID' : 'anonymous ID'

export const faqs = () => [
	{
		heading: "1. Install Littledata's app",
		description: `${buildLink(
			'Add our app',
			appLink()
		)} to your store, and choose the ${buildLink(
			'manual install route',
			'https://blog.littledata.io/help/posts/littledata-shopify-install-guide/'
		)} to skip adding the storefront tracking script`,
	},
	{
		heading: `2. Add the ${Session.get('platform')} tracking script`,
		description: `${buildLink(
			'Load the tracking script',
			'https://github.com/littledata/headless-shopify-demo/blob/master/client/head.html'
		)} and add any event tracking you need before the checkout.`,
	},
	{
		heading: `3. Grab the ${idCalled()}`,
		description: `${buildLink(
			'See how we',
			'https://github.com/littledata/headless-shopify-demo/blob/master/client/buyNow/getClientId.js'
		)} get the ${idCalled()} before the user clicks buy, or inspect the demo button above.`,
	},
	{
		heading: `4. Send that ${idCalled()} as a checkout attribute`,
		description: `Shopify allows you to ${buildLink(
			'add custom attributes',
			'https://shopify.github.io/js-buy-sdk/#updating-checkout-attributes'
		)} to the cart, like <code>${Session.get(
			'platform'
		).toLowerCase()}-clientID</code>. See how we do that ${buildLink(
			'here',
			'https://github.com/littledata/headless-shopify-demo/blob/master/server/checkout/methods.js'
		)}.`,
	},
	{
		heading: '5. Checkout events are linked to users',
		description: `Our servers pick up the ${buildLink(
			'checkout',
			'https://blog.littledata.io/help/posts/shopify-checkout-funnel-updates/'
		)} and order events via webhooks - you don't need any scripts on the checkout or thank you pages.`,
	},
]
