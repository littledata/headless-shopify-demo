import { $ } from 'meteor/jquery'

const navLinks = new ReactiveVar([
	{
		name: 'Go to Help Center',
		link:
			'https://blog.littledata.io/help/posts/working-with-a-headless-shopify-setup/',
		dropdown: false,
		isDisplayedOnMobile: true,
	},
])
const mobileNavLinks = new ReactiveVar([])

Template.navigation.onRendered(function() {
	$(window).on('scroll', function() {
		if ($(window).innerWidth() < 992) {
			if (window.scrollY !== 0) {
				if (!$('body').hasClass('scrolled')) {
					$('body').addClass('scrolled')
				}
			} else {
				$('body').removeClass('scrolled')
			}
		}
	})

	// Optimize needs to run after the navigation has rendered
	window.dataLayer.push({ event: 'optimize.activate' })
})

const sharedHelpers = {
	mobileNav() {
		return mobileNavLinks.get()
	},
	nav() {
		return navLinks.get()
	},
	class() {
		const name = this.name.replace(' ', '-').toLowerCase()
		return name == 'sign-up' // eslint-disable-line eqeqeq
			? `${name} button-outlined`
			: `${name} button-ghost`
	},
	getLink() {
		const name = this.name.replace(' ', '-').toLowerCase()

		return name === 'sign-up' || name === 'login'
			? AppRootURL + this.link
			: this.link
	},
}

Template.navigation.helpers(sharedHelpers)

Template.navigation.events({
	'click #trigger': function(e) {
		e.preventDefault()

		$('body').addClass('menu-visible')
		$('#trigger').addClass('open')
	},
	'click #trigger.open': function(e) {
		e.preventDefault()
		$('#trigger').removeClass('open')
		$('body').removeClass('menu-visible')
	},
})
