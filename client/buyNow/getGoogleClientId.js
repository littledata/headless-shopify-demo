export const getGoogleClientId = () => {
	return new Promise(resolve => {
		// gtag only makes 'ga' function available after the library loads
		// so we have to stub it if undefined here
		window.ga =
			window.ga ||
			function() {
				;(window.ga.q = window.ga.q || []).push(arguments) //eslint-disable-line
			}
		window.ga.l = +new Date()

		const fallback = window.setTimeout(function() {
			//after 4 seconds, assume the script is blocked
			resolve('')
		}, 4000)
		window.ga(function() {
			// this function is called after GA library initializes
			window.clearTimeout(fallback)
			const tracker = window.ga.getAll()[0]
			const clientId = tracker && tracker.get('clientId')

			return resolve(clientId)
		})
	})
}

export const parseGA4Cookie = cookieName => {
	const cookie = getCookie(cookieName)
	if (!cookie) return 'GA4_SESSION_HERE'

	return getCookie(cookie)
		.split('.')
		.splice(2, 1)
		.join()
}

const getCookie = name => {
	if (document.cookie.length > 0) {
		const cookieStart = document.cookie.indexOf(`${name}=`)

		if (cookieStart !== -1) {
			const valueStart = cookieStart + name.length + 1
			let cookieEnd = document.cookie.indexOf(';', valueStart)

			if (cookieEnd === -1) {
				cookieEnd = document.cookie.length
			}
			const cookie = document.cookie.substring(valueStart, cookieEnd)

			return cookie
		}
	}

	return ''
}
