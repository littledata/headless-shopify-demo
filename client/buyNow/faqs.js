const buildLink = (text, link) =>
	`<a href="${link}" target="_blank">${text}</a>`

const appLink = () =>
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

export const idCalled = () =>
	Session.get('platform') === 'Google' ? 'client ID' : 'anonymous ID'

const stepFour = () =>
	Session.get('checkout') === 'ReCharge'
		? {
				heading: `4. [RECHARGE] Send ${idCalled()} to Shopify storefront, to store in cart attributes`,
				description: `Attributes you pass to the Shopify storefront and then store as cart attributes ${buildLink(
					'via the Cart API',
					'https://shopify.dev/docs/themes/ajax-api/reference/cart'
				)} are passed to ReCharge, e.g. via the parameters ${buildLink(
					'on the cart page',
					'https://support.rechargepayments.com/hc/en-us/articles/360041127093-Using-cart-attributes-and-UTM-parameters-in-URLs'
				)}`,
		  }
		: {
				heading: `4. Send that ${idCalled()} as a checkout attribute`,
				description: `Shopify allows you to ${buildLink(
					'add custom attributes',
					'https://shopify.github.io/js-buy-sdk/#updating-checkout-attributes'
				)} to the cart, like <code>${attributeName()}</code>. See how we do that ${buildLink(
					'here',
					'https://github.com/littledata/headless-shopify-demo/blob/master/server/checkout/methods.js'
				)}.`,
		  }

const stepSix = () =>
	Session.get('platform') === 'Google'
		? {}
		: {
				heading: '6. [Optional] Repeat for Google Analytics',
				description:
					'If Segment sends data to the Google Analytics destination, you will need to <strong>repeat steps 3 & 4</strong> for the Google Analytics client ID (switch to GA above). i.e. Add both <code>google-clientID</code> and <code>segment-clientID</code> as attributes',
		  }

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
			'Add the tracking script',
			'https://github.com/littledata/headless-shopify-demo/blob/master/client/head.html'
		)} to the page <code>< head ></code> and add any event tracking you need before the checkout. e.g. Track clicks of the Buy button`,
	},
	{
		heading: `3. Grab the ${idCalled()}`,
		description: `${buildLink(
			'See how we',
			'https://github.com/littledata/headless-shopify-demo/blob/master/client/buyNow/getClientId.js'
		)} get the ${idCalled()} before the user clicks buy, or inspect the demo button above.`,
	},
	stepFour(),
	{
		heading: '5. Checkout steps and orders are linked to users',
		description: `Our servers pick up the ${buildLink(
			'checkout',
			'https://blog.littledata.io/help/posts/shopify-checkout-funnel-updates/'
		)} and order events via webhooks - you don't need any scripts on the checkout or thank you pages.`,
	},
	stepSix(),
]
