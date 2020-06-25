export const getSegmentAnonymousId = () => {
	return new Promise(resolve => {
		const fallback = window.setTimeout(function() {
			//after 4 seconds, assume the script is blocked
			resolve('')
		}, 4000)
		window.analytics.ready(function() {
			window.clearTimeout(fallback)
			resolve(window.analytics.user().anonymousId())
		})
	})
}
