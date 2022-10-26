/**	Utility function that fetches client IDs (GA3, GA4, Segment, Facebook) from the browser
 * and sends them asyncrhonously to the Littledata server.
 * You should run this function when all the tracking libraries have been loaded and when you have
 * the Shopfy cartToken or checkoutToken created by the Shopify API.
 *
 * @param {*} shopifyToken Shopify Cart token or Shopify Checkout token
 * @param {*} ga3PropertyId GA3 Property ID (ex. UA-XXXX-X)
 * @param {*} ga4MeasurementId GA4 Measurement ID (ex. G-XXXX)
 */

const fetchClientId = async ({
	shopifyToken,
	ga3PropertyId = undefined,
	ga4MeasurementId = undefined,
}) => {
	const ldPayload = {}

	const getGaIds = async (id, type) => {
		const getCliendId = new Promise(resolve => {
			gtag('get', id, type, resolve)
		})
		return getCliendId.then(clientId => {
			switch (type) {
				case 'client_id':
					ldPayload['google-clientID'] = clientId
					break
				case 'session_id':
					ldPayload['ga4session-clientID'] = clientId
					break
				default:
					break
			}
		})
	}

	const getSegmentId = async () => {
		const isSegmentReady = new Promise(resolve => {
			window.analytics.ready(() => {
				resolve(window.analytics.user().anonymousId())
			})
		})
		return isSegmentReady.then(id => {
			ldPayload['segment-clientID'] = id
		})
	}

	const getFbId = () => {
		const getCookie = type =>
			document.cookie
				.split('; ')
				.find(row => row.startsWith(`_${type}=`))
				?.split('=')[1]

		ldPayload['fbp-clientID'] = getCookie('fbp')
		ldPayload['fbc-clientID'] = getCookie('fbc')
	}

	const sendToLittledata = async payload => {
		const xhr = new XMLHttpRequest()
		xhr.open(
			'POST',
			'https://transactions.littledata.io/v2/clientID/store',
			true
		)
		xhr.setRequestHeader('Content-Type', 'application/json')
		xhr.send(JSON.stringify(payload))
	}

	if (shopifyToken) ldPayload.cartID = shopifyToken
	if (window.fbq?.loaded) getFbId()
	if (ga3PropertyId || ga4MeasurementId) {
		await getGaIds(ga3PropertyId || ga4MeasurementId, 'client_id')
	}
	if (ga4MeasurementId) await getGaIds(ga4MeasurementId, 'session_id')
	if (window.analytics) await getSegmentId()

	await sendToLittledata(ldPayload)
}

/** Examples of how to run this function depending on the trackers configuration.
 * Please replace the GA IDs with your own and fill in the Shopify Token dynamically.
 *
 * GA3
 * fetchClientId({shopifyToken:'a421a9768b6c9664dcff685cdfc6a38a', ga3PropertyId: 'UA-92368602-105')
 *
 * GA3+GA4
 * fetchClientId({shopifyToken:'a421a9768b6c9664dcff685cdfc6a38a', ga3PropertyId: 'UA-92368602-105', ga4MeasurementId: 'G-W526SMPNGT'})
 *
 * Segment 		// note that you don't need to add any additional arguments besides the Token
 * fetchClientId({shopifyToken:'a421a9768b6c9664dcff685cdfc6a38a'})
 *
 * GA3+FB		// note that you don't need to add any additional arguments besides the Token and the GA ID
 * fetchClientId('a421a9768b6c9664dcff685cdfc6a38a', 'UA-92368602-105')
 *
 * GA3+GA4+FB	// note that you don't need to add any additional arguments besides the Token and the GA IDs
 * fetchClientId({shopifyToken:'a421a9768b6c9664dcff685cdfc6a38a', ga3PropertyId: 'UA-92368602-105', ga4MeasurementId: 'G-W526SMPNGT'})
 *
 * Segment+FB	// note that you don't need to add any additional arguments besides the Token
 * fetchClientId({shopifyToken:'a421a9768b6c9664dcff685cdfc6a38a'})
 */
