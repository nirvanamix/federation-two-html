jQuery(document).ready(function($) {
/******* info for widnow *******/
var info_windows = {
	fun: function(){
		$('body').append('<div class="info_block"><div class="sh_w"></div><div class="sh_h">h</div></div>');
		let wight_window = $(window).outerWidth();
		let height_window = $(window).outerHeight();
		$('.sh_w').text('w: ' + wight_window);
		$('.sh_h').text('h: ' + height_window);
		$(window).resize( function(){
			var zm = $(this).width();
			var zm_2 = $(this).height();
			$('.sh_w').text('w: ' + zm)
			$('.sh_h').text('h: ' + zm_2)
		});
		// style
		$('.info_block').css({
			position: 'fixed',
			right: 0,
			top: '150px',
			color: '#fff',
			textShadow: '0px 0px 1px #000',
			background: 'rgba(101,101,101, 0.5)',
			zIndex: '999999',
			padding: '2px',
			fontSize: '12px',
			lineHeight: '12px',
			textAlign: 'right'
		});
	}
}
info_windows.fun();
/******* info for widnow *******/
var items_catalog = {
	fun: function(){
		$('.items-catalog .show-more span').click(function(event) {
			$('.items-catalog .show-more span').not($(this)).parents('.item').removeClass('active');
			$('.items-catalog .show-more span').not($(this)).parent('.show-more').removeClass('active');

			var h = $(this).parents('.item').outerHeight();
			$(this).parent('.show-more').toggleClass('active');
			if($(this).parents('.show-more').hasClass('active') == true) $(this).parents('.item').css('height', h + 'px');
			else $(this).parents('.show-more').parents('.item').css('height', 'auto');
			$(this).parents('.item').toggleClass('active');
		});
		jQuery(document).click( function(event){
			if(jQuery(event.target).closest(".items-catalog > .item").length ) 
			return;
				$('.items-catalog .item').removeClass('active');
				$('.items-catalog .show-more').removeClass('active');
			event.stopPropagation();
		});


		$(window).resize(function(event) {
			$('.items-catalog .item').removeClass('active');
			$('.items-catalog .show-more').removeClass('active');
		});
	}
}
items_catalog.fun();
/*--------------------------*/
var sharing = {
	fun: function(){
		$('.sharing > span').click(function(event) {
			$('.sharing > span').not($(this)).parents('.sharing').find('.drob-sharing').slideUp(200);
			$(this).parents('.sharing').find('.drob-sharing').slideToggle(200);
		});
		jQuery(document).click( function(event){
			if(jQuery(event.target).closest(".sharing").length ) 
			return;
				$('.sharing').find('.drob-sharing').slideUp(200);
			event.stopPropagation();
		});
	}
}
sharing.fun();
/*---------show-catalog---------*/
var show_catalog = {
	fun: function(){
		$('.show-catalog').click(function(event) {
			event.preventDefault();
			$('.items-catalog').addClass('active');
			$(this).parents('.link-page').remove();
		});
	}
}
show_catalog.fun();
























});