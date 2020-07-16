import './body.html'

const platform = document.location.href.includes('segment')
	? 'Segment'
	: 'Google'
Session.set('platform', platform)
Session.set('checkout', 'Shopify')
