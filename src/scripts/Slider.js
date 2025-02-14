class Slider {
	constructor(containerSelector, listSelector, linkSelector) {
		this.container = document.querySelector(containerSelector);
		this.list = document.querySelector(listSelector);
		this.links = document.querySelectorAll(linkSelector);

		this.isDragging = false;
		this.startPageX = null;
		this.startScrollLeft = null;

		this.handleDragStart = this.handleDragStart.bind(this);
		this.handleDragging = this.handleDragging.bind(this);
		this.handleDragStop = this.handleDragStop.bind(this);

		this.initEventListeners();
	}

	initEventListeners() {
		this.list.addEventListener('mousedown', this.handleDragStart);
		this.list.addEventListener('mousemove', this.handleDragging);
		this.list.addEventListener('mouseup', this.handleDragStop);
	}

	handleDragStart(e) {

		e.preventDefault();
		this.isDragging = true;
		this.startPageX = e.pageX;
		this.startScrollLeft = this.list.scrollLeft;
	}

	handleDragging(e) {

		if (!this.isDragging) return;

		e.preventDefault();
		const positionDiff = e.pageX - this.startPageX;
		this.list.scrollLeft = this.startScrollLeft - positionDiff;
		this.links.forEach(link => {
			if (window.innerWidth < getComputedStyle(document.documentElement).getPropertyValue('--mobile-width'))
				link.style.pointerEvents = 'none';
		});
	}

	handleDragStop(e) {
		e.preventDefault();
		this.isDragging = false;
		this.links.forEach(link => {
			link.style.pointerEvents = 'auto';
		});
	}
}

export default Slider