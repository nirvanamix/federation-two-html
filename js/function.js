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
});