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



















});