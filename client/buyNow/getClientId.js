export const getClientId = platform => {
	return new Promise((resolve, reject) => {
		if (platform === 'google') {
			if (!window.ga) {
				reject(
					new Meteor.Error('No library', 'GA library not installed')
				)
			}
			// this function is called after GA library initializes
			window.ga(function() {
				const tracker = window.ga.getAll()[0]
				const clientId = tracker && tracker.get('clientId')
				return resolve(clientId)
			})
		}
		if (platform === 'segment') {
			if (!window.analytics) {
				reject(
					new Meteor.Error(
						'No library',
						'Segment AnalyticsJS not installed'
					)
				)
			}
			window.analytics.ready(function() {
				resolve(window.analytics.user().anonymousId())
			})
		}
	})
}
