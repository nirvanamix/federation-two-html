jQuery(document).ready(function($) {
	$('.owl-action').owlCarousel({
		loop:true,
		margin:10,
		nav:true,
		items:1
	});
	$('.owl-curses').owlCarousel({
		loop:true,
		margin:27,
		nav:true,
		responsive:{
			0:{
				items:1
			},
			739:{
				items:2
			},
			992:{
				items:3
			}
		}
	});
});