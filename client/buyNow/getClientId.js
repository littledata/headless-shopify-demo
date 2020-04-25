export const getClientId = platform => {
	return new Promise(resolve => {
		if (platform === 'google') {
			// unfortunately gtag only makes 'ga' function available after the library loads
			// so we have to stub it first
			window.ga =
				window.ga ||
				function() {
					;(window.ga.q = window.ga.q || []).push(arguments) //eslint-disable-line
				}
			window.ga.l = +new Date()
			window.ga(function() {
				// this function is called after GA library initializes
				const tracker = window.ga.getAll()[0]
				const clientId = tracker && tracker.get('clientId')
				return resolve(clientId)
			})
		}
		if (platform === 'segment') {
			window.analytics.ready(function() {
				resolve(window.analytics.user().anonymousId())
			})
		}
	})
}
