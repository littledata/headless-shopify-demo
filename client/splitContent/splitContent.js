Template.splitContent.onCreated(function() {
	this.sectionVisible = new ReactiveVar(false)
})

Template.splitContent.helpers({
	showImage() {
		return this.imageID && Template.instance().sectionVisible.get()
	},
	getButtonClass() {
		return this.action.buttonShape === 'filled' || !this.action.buttonShape
			? ''
			: `-${this.action.buttonShape}`
	},
})

Template.splitContent.onRendered(function() {
	const instance = this
	$(window).on('scroll', function(event) {
		const el = instance.$('.split-content')
		if (
			el &&
			el.offset().top < $(window).scrollTop() + window.innerHeight
		) {
			//pre load by viewport height
			instance.sectionVisible.set(true)
			$(this).off(event)
			Meteor.setTimeout(() => {
				window.dataLayer.push({ event: 'optimize.activate' })
			}, 20)
		}
	})
})

Template.splitContent.onDestroyed(function() {
	$(window).off('scroll')
})
