import './body.html'

const { href } = document.location
const platform = href.includes('segment') ? 'Segment' : 'Google'
const checkout = href.includes('recharge') ? 'ReCharge' : 'Shopify'
Session.set('platform', platform)
Session.set('checkout', checkout)
