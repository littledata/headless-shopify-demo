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
	startingRecharge,
	attributesArray,
	segmentWriteKey,
	helpLink,
} from './helpers'

const asterisk = () =>
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
		  )} see how we set the checkout ${attributesArray()}<super>*</super> as <code>${attributesObject()}</code>.`
		: `Use the Recharge ${buildLink(
				'checkout API',
				'https://developer.rechargepayments.com/2021-11/checkouts/checkout_object'
		  )}<super>*</super> to set the <code>${attributesArray()}</code> as <code>${attributesObject()}</code>.`

const segmentToGA = () =>
	Session.get('platform') === 'Segment'
		? ` If Segment sends data to Google Analytics (GA), you will need also to enable the ${buildLink(
				'GA destination',
				'https://help.littledata.io/posts/send-data-from-segment-to-google-analytics/'
		  )} in "device mode" in Segment.`
		: ''

const preCheckoutTracking = () =>
	`As a further improvement you could add event tracking for pre-checkout browsing behavior (e.g. track clicks of the Add to Cart button, Collection or Product page views). Follow the ${buildLink(
		'Enhanced Ecommerce',
		ecommerceDocLink()
	)} specs for ${Session.get('platform')}.`

const sendToTM = () =>
	`For added precision and tracking reliability, you should also send the received checkout ID to the Littledata server. ${buildLink(
		'In this example',
		'https://github.com/littledata/headless-shopify-demo/blob/master/client/utility/redirectToShopifyCheckout.js'
	)} you can see how we are doing that by using <code>sendCheckoutToLittledata</code> method from the Littledata SDK.`

export const faqs = () => [
	{
		heading: "1. Install Littledata's app",
		description: `Add Littledata's ${buildLink(
			`Shopify app for ${appName()}`,
			appLink()
		)} to your store, and choose the ${buildLink(
			'manual install route',
			helpLink()
		)} and check the box for headless setup. That skips adding our storefront tracking script.${segmentWriteKey()}${startingRecharge()}`,
	},
	{
		heading: `2. Add the ${appName()} tag`,
		description: `Add the ${buildLink(
			`${appName()} tracking tag`,
			trackingScriptCode()
		)} to the <code>< head ></code> of your custom front-end. This library creates the ${idCalled()} on your storefront which Littledata can link with checkouts and orders from Shopify.${segmentToGA()}`,
	},
	{
		heading: `3. Get the ${idCalled()} from the browser`,
		description: `For Littledata to link server events with browser pageviews, you need to get the ${idCalled()} from the browser. To accomplish that easily, you can use ${buildLink(
			'Littledata Headless Shopify SDK',
			'https://www.npmjs.com/package/@littledata/headless-shopify-sdk'
		)}. You need to call the <code>fetchClientIds</code> method after you load the ${appName()} tracking tag. This method returns <code>customAttributes</code> array prepared for sending to Shopify Checkout. See how we ${buildLink(
			`get the ${idCalled()}`,
			'https://github.com/littledata/headless-shopify-demo/blob/master/client/utility/fetchClientIds.js'
		)} for ${appName()} before the user clicks 'Add to cart', or try the 'Buy Now' button above to see it in action. Also, please read the ${buildLink(
			'Littledata SDK documentation',
			'https://www.npmjs.com/package/@littledata/headless-shopify-sdk?activeTab=readme'
		)} for the additional instructions and details about the setup.`,
	},
	{
		heading: `4. Add these identifiers to checkout ${attributesArray()}`,
		description: `${Session.get(
			'checkout'
		)} allows you to update the checkout <code>${attributesArray()}</code> array only after a checkout ID is created. ${stepFourRecharge()} ${sendToTM()}`,
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
	{ heading: '', description: asterisk() },
]
