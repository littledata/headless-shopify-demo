export const getSegmentAnonymousId = () => {
	return new Promise(resolve => {
		window.analytics.ready(function() {
			resolve(window.analytics.user().anonymousId())
		})
	})
}
