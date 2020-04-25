const navLinks = new ReactiveVar([
	{
		name: 'Go to Help Centre',
		link: 'https://blog.littledata.io/help',
		dropdown: false,
		isDisplayedOnMobile: true,
	},
])
const mobileNavLinks = new ReactiveVar([])

Template.navigation.onRendered(function() {
	$(window).on('resize', function() {
		if ($(window).innerWidth() > 991) {
			$('#trigger').removeClass('open')
			$('body')
				.removeClass('menu-visible')
				.removeClass('scrolled')
		}
	})
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
	isActive() {
		const { route } = Router.current()
		const name = this.name.toLowerCase()
		return route && route.getName().indexOf(name) > -1 ? 'active' : ''
	},
	hasDropdown() {
		return this.dropdown && this.submenu && this.submenu.length
	},
	orderedSubmenu() {
		const { submenu } = this

		if (!submenu) return []
		return submenu.sort((a, b) => {
			return a.displayOrder - b.displayOrder
		})
	},
	getMobileSubMenu() {
		const { submenu } = this
		if (!submenu) return []
		return submenu
			.filter(item => item.isDisplayedOnMobile)
			.sort((a, b) => {
				return a.displayOrder - b.displayOrder
			})
	},
}

Template.navigation.helpers(sharedHelpers)
Template.mobileNav.helpers(sharedHelpers)

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

Template.mobileNav.events({
	'click #mobile-nav a': function() {
		$('#trigger').removeClass('open')
		$('body').removeClass('menu-visible')
	},
})
