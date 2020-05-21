jQuery(document).ready(function($) {
	var checkbox = {
		fun: function(){
			function check(th) {
				var checked = th.find('input').prop('checked');
				if(checked == true) th.addClass('active');
				else th.removeClass('active');
			}
			$('label.checkbox').each(function(index, el) {
				check($(this))
			});
			$('label.checkbox').click(function(event) {
				$('label.checkbox').each(function(index, el) {
					check($(this))
				});
			});
		}
	}
	checkbox.fun();
	var moda_window = {
		fun: function () {
			/*modal windows*/
			$('body').on('click', 'a[data-modal]', function(event){
				event.preventDefault();
				$('.modal-window').fadeOut(400).removeClass('active');
				var data_modal = $(this).attr('data-modal');
				$('.modal-window[data-modal="' + data_modal +'"]').fadeIn(400).addClass('active');
			});
			$('body').on('click', '.close', function(event){
				$('.modal-window').fadeOut(400);
				$('.modal-window').removeClass('active');
			});
			jQuery(".modal-window").click( function(event){
				if(jQuery(event.target).closest(".window").length ) 
				return;
					$('.modal-window').fadeOut(400).removeClass('active');
				event.stopPropagation();
			});
			/*modal windows*/
		}
	}
	moda_window.fun();
	var mobile_menu = {
		fun: function(){
			$('.mobile-menu').click(function(event) {
				$('html, body').toggleClass('body-overflow');
				$(window).scrollTop(0);
				$(this).toggleClass('active');
				$('nav').toggleClass('active');
			});
		}
	}
	mobile_menu.fun();
	var reiting_star = {
		fun: function(){
			$('.reiting-star label').hover(function() {
				$(this).addClass('hover').prevAll('label').addClass('hover');
				$(this).next('label').removeClass('hover');
			});
			$('.reiting-star').hover(function() {}, function() {
				$(this).find('label').removeClass('hover')
			});

			$('.reiting-star label').click(function(event) {
				$('.reiting-star label').removeClass('active');
				$(this).addClass('active').prevAll('label').addClass('active');
			});

			$('.reiting-star').each(function(index, el) {
				$(this).find('input').each(function(index, el) {
					var checked = $(this).prop('checked');
					if(checked == true){
						$(this).parents('label').addClass('active').prevAll('label').addClass('active');
					}
				});
			});
		}
	}
	reiting_star.fun();

	var reviews_items = {
		fun: function(){
			if($('.reviews-items .item:last()').index() <= 2) $('.reviews-items').next('.show-more-reviws').remove();
			$('.show-more-reviws a').click(function(event) {
				event.preventDefault();
				$(this).parents('.show-more-reviws').prev('.reviews-items').addClass('active');
				$(this).parents('.show-more-reviws').remove();
			});
		}
	}
	reviews_items.fun();

	var acardion = {
		fun: function(){
			$('.acardion .top').click(function(event) {
				$('.acardion .top').not($(this)).removeClass('active').parents('.item').find('.bottom').slideUp(400);
				$(this).toggleClass('active').parents('.item').find('.bottom').slideToggle(400);
			});
		}
	}
	acardion.fun();

	var audio = {
		fun: function(){
			var audio = document.getElementById("myAudio");
			$('.listent a').click(function(event) {
				event.preventDefault();
				$('.modal-audio').addClass('active');
				audio.play();
				if($(this).hasClass('active')){
					audio.pause();
					$('.modal-audio').removeClass('active');
				}
				else{
					audio.play();
				}
				$(this).toggleClass('active');
			});
			$('.modal-audio .close').click(function(event) {
				$('.modal-audio').removeClass('active');
				audio.pause();
				$('.listent a').removeClass('active')
			});
		}
	}
	audio.fun();












});