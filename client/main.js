import './body.html'

const { href } = document.location
const platform = href.includes('segment') ? 'Segment' : 'Google'
const checkout = href.includes('recharge') ? 'Recharge' : 'Shopify'
const sendClientId = !href.includes('sendClientId=false')
Session.set('platform', platform)
Session.set('checkout', checkout)
Session.set('sendClientId', sendClientId)
