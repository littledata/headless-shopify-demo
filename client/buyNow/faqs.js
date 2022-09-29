/* eslint-disable max-len */
import { checkoutDict } from '../../lib/constants'
import {
	buildLink,
	appLink,
	appName,
	attributesObject,
	idCalled,
	ecommerceDocLink,
	trackingScriptCode,
	linkToFunction,
	startingRecharge,
	attributesArray,
	segmentWriteKey,
} from './helpers'

const asterix = () =>
	Session.get('checkout') === checkoutDict.SHOPIFY
		? `<super>*</super> Alternatively you could set these <code>attributes</code> via the ${buildLink(
				'Cart API',
				'https://shopify.dev/docs/themes/ajax-api/reference/cart'
		  )}, which then gets passed into the checkout`
		: `<super>*</super> Alternatively you could pass ${buildLink(
				'parameters to the cart page',
				'https://support.rechargepayments.com/hc/en-us/articles/360041127093-Using-cart-attributes-and-UTM-parameters-in-URLs'
		  )} `

const stepFourRecharge = () =>
	Session.get('checkout') === checkoutDict.SHOPIFY
		? `In ${buildLink(
				'this NodeJS example',
				'https://github.com/littledata/headless-shopify-demo/blob/master/server/checkout/createShopifyCheckout.js'
		  )} see how we set the checkout ${attributesArray()} as <code>${attributesObject()}</code>. <super>*</super>`
		: `Use the Recharge ${buildLink(
				'checkout API',
				'https://developer.rechargepayments.com/2021-11/checkouts/checkout_object'
		  )} to set the <code>${attributesArray()}</code> as <code>${attributesObject()}</code>. <super>*</super>`

const segmentToGA = () =>
	Session.get('platform') === 'Segment'
		? ` If Segment sends data to Google Analytics (GA), you will need also to enable the ${buildLink(
				'GA destination',
				'https://help.littledata.io/posts/send-data-from-segment-to-google-analytics/'
		  )} in "device mode" in Segment.`
		: ''

const preCheckoutTracking = () =>
	`As a further improvement you could add event tracking for pre-checkout browsing behavior (e.g. Track clicks of the Buy button). Follow the ${buildLink(
		'Enhanced Ecommerce',
		ecommerceDocLink()
	)} specs in ${Session.get('platform')}.`

export const faqs = () => [
	{
		heading: "1. Install Littledata's app",
		description: `Add Littledata's ${buildLink(
			`Shopify app for ${appName()}`,
			appLink()
		)} to your store, and choose the ${buildLink(
			'manual install route',
			'https://help.littledata.io/posts/littledata-shopify-install-guide/#b-manual-install'
		)} and check the box for headless setup. That skips adding our storefront tracking script.${segmentWriteKey()}${startingRecharge()}`,
	},
	{
		heading: `2. Add the ${appName()} tag`,
		description: `Add the ${buildLink(
			`${appName()} tracking tag`,
			trackingScriptCode()
		)} to the <code>< head ></code> of your custom front-end. This library creates a ${idCalled()} on your storefront which Littledata can link with checkouts and orders from Shopify.${segmentToGA()}`,
	},
	{
		heading: `3. Get the ${idCalled()} from the browser`,
		description: `For Littledata to link server events with browser pageviews, you need to get the ${idCalled()} from the browser. See how we ${buildLink(
			`get the ${idCalled()}`,
			linkToFunction()
		)} for ${Session.get(
			'platform'
		)} before the user clicks 'Add to cart', or try the 'Buy Now' button above to see it in action.`,
	},
	{
		heading: `4. Add these idenfiers to checkout ${attributesArray()}`,
		description: `${Session.get(
			'checkout'
		)} allows you to update the checkout <code>${attributesArray()}</code> array after a checkout ID is created. ${stepFourRecharge()}`,
	},
	{
		heading: '5. Checkout steps and orders are linked to users',
		description: `Your headless setup is complete! Our servers pick up the ${buildLink(
			'checkout',
			'https://help.littledata.io/posts/shopify-checkout-funnel-updates/'
		)} and order events via webhooks - you don't need any scripts on the checkout or thank you pages.  ${preCheckoutTracking()}`,
	},
	{ heading: '', description: '' },
	{
		heading: '',
		description: `For additional help with headless tracking for Shopify Plus, Littledata’s ${buildLink(
			'Plus Plans',
			'https://www.littledata.io/app/enterprise'
		)} are a popular option. Plus Plans include ${appName()} setup, audits, training and more.`,
	},
	{ heading: '', description: asterix() },
]
