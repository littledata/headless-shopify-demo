import {
	buildLink,
	appLink,
	attributesObject,
	idCalled,
	ecommerceDocLink,
	trackingScriptCode,
	linkToFunction,
	startingReCharge,
	attributesArray,
} from './helpers'

const stepFourReCharge = () =>
	Session.get('checkout') === 'ReCharge'
		? `See ReCharge docs for how to use the ${buildLink(
				'checkout API',
				'https://developer.rechargepayments.com/#create-a-checkout-beta'
		  )} or ${buildLink(
				'pass parameters',
				'https://support.rechargepayments.com/hc/en-us/articles/360041127093-Using-cart-attributes-and-UTM-parameters-in-URLs'
		  )} to the cart page. `
		: ''

const asterix = () =>
	Session.get('platform') === 'Segment'
		? `<super>*</super> If Segment sends data to Google Analytics (GA), you will need to enable the ${buildLink(
				'GA destination',
				'https://blog.littledata.io/help/posts/send-data-from-segment-to-google-analytics/'
		  )} in "device mode" in Segment, otherwise you can leave out the <code>google-clientID</code> from ${attributesArray()}`
		: ''

export const faqs = () => [
	{
		heading: "1. Install Littledata's app",
		description: `${buildLink(
			'Add our app',
			appLink()
		)} to your store, and choose the ${buildLink(
			'manual install route',
			'https://blog.littledata.io/help/posts/littledata-shopify-install-guide/'
		)} to skip adding the storefront tracking script. ${startingReCharge()}`,
	},
	{
		heading: `2. Add the ${Session.get('platform')} tracking script`,
		description: `${buildLink(
			'Add the tracking script',
			trackingScriptCode()
		)} to the <code>< head ></code> of your custom front-end and add any event tracking you need before the checkout, following the ${buildLink(
			'enhanced ecommerce',
			ecommerceDocLink()
		)} specification. e.g. Track clicks of the Buy button`,
	},
	{
		heading: `3. Get the ${idCalled()} from the browser`,
		description: `${buildLink(
			'See how we',
			linkToFunction()
		)} get the ${idCalled()} for ${Session.get(
			'platform'
		)} before the user clicks buy, or inspect the demo button above. For ${buildLink(
			'Enterprise customers',
			'https://www.littledata.io/app/enterprise'
		)} we can help you tie this in with other ${Session.get(
			'platform'
		)} tracking.`,
	},
	{
		heading: `4. Send that ${idCalled()} in checkout ${attributesArray()}`,
		description: `${Session.get(
			'checkout'
		)} allows you to add a <code>${attributesArray()}</code> array to the checkout (or <code>attributes</code> via the ${buildLink(
			'Cart API',
			'https://shopify.dev/docs/themes/ajax-api/reference/cart'
		)}). ${stepFourReCharge()}In ${buildLink(
			'this NodeJS example',
			'https://github.com/littledata/headless-shopify-demo/blob/master/server/checkout/methods.js'
		)} see how we set the ${attributesArray()}<super>*</super> as <br/><code>${attributesObject()}</code>`,
	},
	{
		heading: '5. Checkout steps and orders are linked to users',
		description: `Our servers pick up the ${buildLink(
			'checkout',
			'https://blog.littledata.io/help/posts/shopify-checkout-funnel-updates/'
		)} and order events via webhooks - you don't need any scripts on the checkout or thank you pages.`,
	},
	{
		heading: '',
		description: asterix(),
	},
]
