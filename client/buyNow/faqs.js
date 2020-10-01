import {
	buildLink,
	appLink,
	appName,
	attributesObject,
	idCalled,
	ecommerceDocLink,
	trackingScriptCode,
	linkToFunction,
	startingReCharge,
	attributesArray,
	segmentWriteKey,
} from './helpers'

const stepFourReCharge = () =>
	Session.get('checkout') === 'ReCharge'
		? `See ReCharge docs for how to use the ${buildLink(
				'checkout API',
				'https://developer.rechargepayments.com/#create-a-checkout-beta'
		  )} to set the <code>${attributesArray()}</code> as <code>${attributesObject()}</code>, or you can pass ${buildLink(
				'parameters to the cart page',
				'https://support.rechargepayments.com/hc/en-us/articles/360041127093-Using-cart-attributes-and-UTM-parameters-in-URLs'
		  )} `
		: `In ${buildLink(
				'this NodeJS example',
				'https://github.com/littledata/headless-shopify-demo/blob/master/server/checkout/methods.js'
		  )} see how we set the checkout ${attributesArray()} as <code>${attributesObject()}</code>, or set these <code>attributes</code> via the ${buildLink(
				'Cart API',
				'https://shopify.dev/docs/themes/ajax-api/reference/cart'
		  )}.`

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
		description: `Add Littledata's ${buildLink(
			`Shopify app for ${appName()}`,
			appLink()
		)} to your store, and choose the ${buildLink(
			'manual install route',
			'https://blog.littledata.io/help/posts/littledata-shopify-install-guide/'
		)} and check the box for headless setup. That skips adding our storefront tracking script.${segmentWriteKey()}${startingReCharge()}`,
	},
	{
		heading: `2. Add the ${appName()} tag`,
		description: `Add the ${buildLink(
			`${appName()} tracking tag`,
			trackingScriptCode()
		)} to the <code>< head ></code> of your custom front-end. This is needed in step 4, to allow Littledata to track checkouts and orders for your headless setup.`,
	},
	{
		heading: '3. Add pre-checkout event tracking',
		description: `You will need to manually add event tracking for pre-checkout browsing behavior. Follow the ${buildLink(
			'Enhanced Ecommerce',
			ecommerceDocLink()
		)} specs in ${Session.get(
			'platform'
		)} (e.g. Track clicks of the Buy button).`,
	},
	{
		heading: `4. Get the ${idCalled()} from the browser`,
		description: `For Littledata to stitch sessions together, you need to get the ${idCalled()} from the browser. See how we ${buildLink(
			`get the ${idCalled()}`,
			linkToFunction()
		)} for ${Session.get(
			'platform'
		)} before the user clicks 'Add to cart', or try the 'Buy Now' button above to see it in action.`,
	},
	{
		heading: `5. Send that ${idCalled()} in checkout ${attributesArray()}`,
		description: `${Session.get(
			'checkout'
		)} allows you to add a <code>${attributesArray()}</code> array to the checkout. ${stepFourReCharge()}`,
	},
	{
		heading: '6. Checkout steps and orders are linked to users',
		description: `Your headless setup is complete! Our servers pick up the ${buildLink(
			'checkout',
			'https://blog.littledata.io/help/posts/shopify-checkout-funnel-updates/'
		)} and order events via webhooks - you don't need any scripts on the checkout or thank you pages.`,
	},
	{
		heading: '',
		description: `For additional help with headless tracking for Shopify Plus, Littledata’s ${buildLink(
			'enterprise plans',
			'https://www.littledata.io/app/enterprise'
		)} are a popular option. Enterprise plans include ${appName()} setup, audits, training and more.`,
	},
	{
		heading: '',
		description: asterix(),
	},
]
