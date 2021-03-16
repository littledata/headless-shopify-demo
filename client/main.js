import './body.html'

const { href } = document.location
const platform = href.includes('segment') ? 'Segment' : 'Google'
const checkout = href.includes('recharge') ? 'ReCharge' : 'Shopify'
const sendClientId = !href.includes('sendClientId=false')
Session.set('platform', platform)
Session.set('checkout', checkout)
Session.set('sendClientId', sendClientId)
