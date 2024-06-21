import { checkoutDict, platformDict } from '../../lib/constants'

Template.header.helpers({
	type() {
		return this.type || 'simple'
	},

	color() {
		return this.background || this.type !== 'simple' ? 'inverted' : null
	},

	action() {
		return typeof this.action === 'string'
			? JSON.parse(this.action)
			: this.action
	},
	isAnchor() {
		return this.link && this.link[0] === '#' && this.link !== '#intercom'
	},
	text() {
		return this.text || 'Get Started'
	},
	isStaticImage() {
		return (
			this.background.includes('.png') || this.background.includes('.jpg')
		)
	},
	segment() {
		return Session.get('platform') === platformDict.SEGMENT
	},
	google() {
		return Session.get('platform') === platformDict.UA
	},
	ga4() {
		return Session.get('platform') === platformDict.GA4
	},
	facebook() {
		return Session.get('platform') === platformDict.FACEBOOK
	},
})

Template.header.events({
	'click #goNext': function(e) {
		window.scrollTo({
			top:
				$(e.target)
					.closest('.row')
					.innerHeight() - 80,
			behavior: 'smooth',
		})
	},
	'click .is-anchor': function(e) {
		e.preventDefault()
		window.scrollTo({
			top: $(e.target.hash).offset().top - 80,
			behavior: 'smooth',
		})
	},
	'click .platform': function(e) {
		Session.set('platform', e.target.getAttribute('data-platform'))
	},
	'click .checkout': function(e) {
		Session.set('checkout', e.target.getAttribute('data-platform'))
	},
})

Template.header.onRendered(function() {
	// Optimize needs to run after the header has rendered
	window.dataLayer.push({ event: 'optimize.activate' })
})
