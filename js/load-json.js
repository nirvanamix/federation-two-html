/*-----------------------------scripts for catalog -----------------------------*/
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
var sharing = {
	fun: function(){
		$('.sharing span').click(function(event) {
			$('.modal-window').fadeIn(400).addClass('active');
		});
	}
}
var show_catalog = {
	fun: function(){
		// default
		var count = 0;
		$('.items-catalog > .item').removeClass('hide');
		$('.show-catalog').addClass('hide');

		// function
		$('.items-catalog > .item').each(function(index, el) {
			count = count + 1;
			if(count > 6) $(this).addClass('hide');
			$('.show-catalog').removeClass('hide')
		});
		if($('.items-catalog > .item').last().hasClass('hide') == false) $('.show-catalog').addClass('hide');
	},
	fun_2: function () {
		$('.show-catalog').click(function(event) {
			event.preventDefault();
			var count = 0;
			$('.items-catalog > .item.hide').each(function(index, el) {
				count = count + 1;
				if(count <= 6){
					$(this).removeClass('hide');
				}
			});
			if($('.items-catalog > .item').last().hasClass('hide') == false) $(this).addClass('hide');
		});
	}
}
var status_modal = {
	fun_er: function(th){
		$('.modal-success').removeClass('active');
		$('.modal-error[data-stasus="' + th + '"]').addClass('active');
		setTimeout(function(){
			$('.modal-error').removeClass('active');
		}, 2000);
	},
	fun_success: function(th){
		$('.modal-error').removeClass('active');
		$('.modal-success[data-stasus="' + th + '"]').addClass('active'); 
		setTimeout(function(){
			$('.modal-success').removeClass('active');
		}, 2000);
	}
}

// ajax in server 
var ajax_server = {
	fun: function(th){
		var user_id_value = th.parents('article').data('user-id');
		var rating_value = th.data('reiting');
		// console.log(user_id_value);
		// console.log(rating_value);
		var ajaxurl = IfaAjax.ajaxurl;
		var data = {
			'action': 'rating_callback',
			data : 'rating_value=' + rating_value + '&user_id=' + user_id_value
		};

		jQuery.post(ajaxurl, data,'json');
		jQuery(document).ajaxSuccess(function(){
			// console.log('sent ok');
		});
		jQuery(document).ajaxError(function(){
			// console.log('sent-failure');
		});
	}
}


var contacts = {
	fun: function(){
		$('.contacts .top').click(function(event) {
			$('.contacts .top').not($(this)).parent('.contacts').removeClass('active');
			$(this).parent('.contacts').toggleClass('active');
		});
		jQuery(document).click( function(event){
			if(jQuery(event.target).closest(".contacts").length ) 
			return;
				$('.contacts').removeClass('active');
			event.stopPropagation();
		});
	}
}


/*filter*/
var fillter_catalog = {
	fun: function(name_json){
		// no / off select city
		function check_city(th) {
			if(th.find('input[data-city]').prop('checked') == true){
				var th_attr = th.find('input').attr('data-city');
				if(th_attr == "off"){
					$("label[data-value='city']").addClass('default-label');
					$("label[data-value='city']").find('select option:first').prop('selected', true);
					var val_op = $("label[data-value='city']").find('select option:first').text();
					val_op = $.trim(val_op);
					$("label[data-value='city']").find('.ui-selectmenu-text').text(val_op);
				}
				else{
					$("label[data-value='city']").removeClass('default-label');
				}
			}
		}
		$('.labels-checkbox label').click(function(event) {
			$('.labels-checkbox label').each(function(index, el) {
				check_city($(this))
			});
		});
		$('.fill_submit input').click(function(event) {
			event.preventDefault();
			var result_fill = new Object();
			$(this).parents('form').find('label[data-value]').each(function(index, el) {
				var th_attr = $(this).attr('data-value');
				var th_val = $(this).find('input, select').val();
				if(th_val != "all" && th_val != "") result_fill[th_attr] = th_val
			});
			function fun_check(){
				var checked = $('input[data-city="off"]').prop('checked');
				if(checked == true) result_fill.work_online =  true
			}
			fun_check();
			var remove_id = new Array();
			for (const prop in result_fill) {
				for (var i = 0; i < name_json.length; i++) {
					if(name_json[i].filter[prop] != result_fill[prop]
						&& prop != "key-poblem"
						&& prop != "min_price"
						&& prop != "max_price"
						&& prop != "experience"
						&& prop != "equipment")
					{
						remove_id.push(name_json[i].id);
					}
					// key-poblem
					if(prop == "key-poblem"){
						if(name_json[i].filter[prop].search(result_fill[prop]) != -1 == false){
							remove_id.push(name_json[i].id);
						}
					}
					if(prop == "equipment"){
						if(name_json[i].filter[prop].search(result_fill[prop]) != -1 == false){
							remove_id.push(name_json[i].id);
						}
					}
					// min price / max price
					if(prop == "min_price" || prop == "max_price"){
						var min =+ result_fill.min_price;
						var max =+ result_fill.max_price;
						if(min == undefined) min = 0;
						if(max == undefined) max = Infinity;
						if(name_json[i].filter.price < min || name_json[i].filter.price > max) remove_id.push(name_json[i].id);
					}
					// experience
					if(prop == "experience"){
						var exp_user =+ name_json[i].filter.experience;
						var ext_select =+ result_fill[prop];
						if(exp_user < ext_select) remove_id.push(name_json[i].id);
					}
					// select online
					if(prop == "work_online"){
						var status = name_json[i].filter.work_online;
						if(status == false){
							remove_id.push(name_json[i].id);
						}
					}
				}
			}
			Array.prototype.unique = function() {
				return this.filter(function(value, index, _this) {
					return _this.indexOf(value) === index;
				});
			}
			$('.items-catalog > .hide > .item').unwrap('.hide');
			$('.items-catalog > .item').each(function(index, el) {
				var th_index = $(this).index();
				var result = remove_id.unique().indexOf(th_index + 1);
				if(result >= 0){
					$(this).wrap('<div class="hide"></div>');
				}
			});
			// check if no result
			if($('.items-catalog > .item').last().index() < 0) $('.items-catalog').append('<div class="error-div">'+ $('.items-catalog').attr('data-error-text') +'</div>');
				else $('.items-catalog .error-div').remove();
			// show-show-more catalog
			show_catalog.fun();
		});
	}
}
/*raiting*/
var reiting_fun = {
	fun: function(json){
		// output to data-reiting
		for (var i = 0; i < json.length; i++) {
			var formula = 0;
			var count_user = 0;
			for (var key in json[i].reiting){
				count_user = count_user + json[i].reiting[key];
				var reiting =+ key;
				formula = reiting * json[i].reiting[key] + formula;
			}
			var results = formula/count_user;
			results = results.toFixed(2)
			$('.items-catalog .item').eq(i).find('.ul-reiting').attr('data-reiting', results);
		}
		// display in the graph
		function each_reiting(th){
			th.find('li').removeClass('active-whole disabled h_25 h_5 h_75')
			th.each(function(index, el) {
				var reiting = $(this).attr('data-reiting');
				if(reiting != "NaN"){
					reiting =+ reiting;
					var whole_values = Math.floor(reiting);
					var small_value = reiting - whole_values;
					small_value =+ small_value.toFixed(2);
					$(this).find('li').eq(whole_values - 1).addClass('active-whole').nextAll('li').addClass('disabled');
					// 0.25
					if(small_value >= 0.1 && small_value <= 0.3){
						$(this).find('li.active-whole').next('li').addClass('h_25')
					}
					// 0.5
					if(small_value > 0.3 && small_value <= 0.55){
						$(this).find('li.active-whole').next('li').addClass('h_5')
					}
					// 0.75
					if(small_value > 0.55 && small_value < 1){
						$(this).find('li.active-whole').next('li').addClass('h_75')
					}
				}
				else{
					$(this).find('li').addClass('disabled');
				}
			});
		}
		each_reiting($('.items-catalog ul.ul-reiting'))
		// hover starts
		$('ul.ul-reiting').hover(function() {
			$(this).addClass('hover-reiting');
		}, function() {
			$(this).removeClass('hover-reiting');
		});
		$('ul.ul-reiting li').hover(function() {
			$(this).addClass('active').prevAll('li').addClass('active');
		}, function() {
			$(this).removeClass('active').prevAll('li').removeClass('active');
		});
		// check localStorage
		if(localStorage.getItem('user_id') != null){
			var get_arr = localStorage.getItem('user_id').split(',');
			for (var i = 0; i < get_arr.length; i++) {
				$('.items-catalog .item[data-user-id="' + get_arr[i] + '"]').find('.ul-reiting').addClass('active')
			}
		}
		// click reiting
		$('ul.ul-reiting button').click(function(event) {
			var has_active = $(this).parents('ul.ul-reiting').hasClass('active');
			if(has_active == false ){
				$(this).parents('ul.ul-reiting').addClass('active');
				var th_reiting =+ $(this).attr('data-reiting');
				console.log(th_reiting)
				var id = $(this).parents('.item').attr('data-user-id');
				if(localStorage.getItem('user_id') != null){
					var get_item = localStorage.getItem('user_id');
					localStorage.setItem('user_id', get_item + "," + id);
				}
				else{
					localStorage.setItem('user_id', id);
				}
				// refresh reiting
				for (var i = 0; i < json.length; i++) {
					if(json[i].user_id == id){
						var formula = 0;
						var count_user = 0;
						for (var key in json[i].reiting){
							count_user = count_user + json[i].reiting[key];
							var reiting =+ key;
							formula = reiting * json[i].reiting[key] + formula;
						}
						var results = (formula + th_reiting) / (count_user + 1);
						results = results.toFixed(2);
						console.log(results)
						$(this).parents('.ul-reiting').attr('data-reiting', results);
						// add reiting
						each_reiting($(this).parents('ul.ul-reiting'));

						status_modal.fun_success("reiting");
						// ajax server
						ajax_server.fun($(this))
						return false;
					}
				}
			}
			else{
				status_modal.fun_er("reiting");
			}
		});
	}
}

$(function () {
	$.ajax({
		url: "http://ifa-t.com/wp-json/ifa/v1/therapists"
	}).done(function (data) {
		var th =  data.events;
		for (var i = 0; i < th.length; i++) {
			/*description for ul-list*/
			var description = {
				refult: "",
				fun: function(){
					for (var j = 0; j < th[i].description.length; j++) {
						description.refult = description.refult + `<li>${th[i].description[j][0]} <mark>${th[i].description[j][1]}</mark></li>`;
					}
					return description.refult;
				}
			}
			/*append in ul-list*/
			var reiting_li = {
				fun: function(){
					var result;
					for (var i = 0; i < 5; i++) {
						if(result == undefined) result = "";
						result = result + `<li><button data-reiting="${i + 1}"></button></li>`;
					}
					return result;
				}
			}
			$('.items-catalog').append(`<article class="item" data-user-id="${th[i].user_id}">
				<div class="wr-content">
					<div class="title-block">
						<div class="img">
							<a href="${th[i].user_link}">
								<img src="${th[i].img_user}" alt="">
							</a>
						</div>
						<div class="text-block">
							<h3>
								<a href="${th[i].user_link}">
									${th[i].name}
								</a>
							</h3>
							<div class="contacts">
								<div class="top">
									Связаться
								</div>
								<div class="bottom">
									<a href="${th[i].social.viber}" target="_blank">
										<svg id="Bold" enable-background="new 0 0 24 24" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m23.155 13.893c.716-6.027-.344-9.832-2.256-11.553l.001-.001c-3.086-2.939-13.508-3.374-17.2.132-1.658 1.715-2.242 4.232-2.306 7.348-.064 3.117-.14 8.956 5.301 10.54h.005l-.005 2.419s-.037.98.589 1.177c.716.232 1.04-.223 3.267-2.883 3.724.323 6.584-.417 6.909-.525.752-.252 5.007-.815 5.695-6.654zm-12.237 5.477s-2.357 2.939-3.09 3.702c-.24.248-.503.225-.499-.267 0-.323.018-4.016.018-4.016-4.613-1.322-4.341-6.294-4.291-8.895.05-2.602.526-4.733 1.93-6.168 3.239-3.037 12.376-2.358 14.704-.17 2.846 2.523 1.833 9.651 1.839 9.894-.585 4.874-4.033 5.183-4.667 5.394-.271.09-2.786.737-5.944.526z"/><path d="m12.222 4.297c-.385 0-.385.6 0 .605 2.987.023 5.447 2.105 5.474 5.924 0 .403.59.398.585-.005h-.001c-.032-4.115-2.718-6.501-6.058-6.524z"/><path d="m16.151 10.193c-.009.398.58.417.585.014.049-2.269-1.35-4.138-3.979-4.335-.385-.028-.425.577-.041.605 2.28.173 3.481 1.729 3.435 3.716z"/><path d="m15.521 12.774c-.494-.286-.997-.108-1.205.173l-.435.563c-.221.286-.634.248-.634.248-3.014-.797-3.82-3.951-3.82-3.951s-.037-.427.239-.656l.544-.45c.272-.216.444-.736.167-1.247-.74-1.337-1.237-1.798-1.49-2.152-.266-.333-.666-.408-1.082-.183h-.009c-.865.506-1.812 1.453-1.509 2.428.517 1.028 1.467 4.305 4.495 6.781 1.423 1.171 3.675 2.371 4.631 2.648l.009.014c.942.314 1.858-.67 2.347-1.561v-.007c.217-.431.145-.839-.172-1.106-.562-.548-1.41-1.153-2.076-1.542z"/><path d="m13.169 8.104c.961.056 1.427.558 1.477 1.589.018.403.603.375.585-.028-.064-1.346-.766-2.096-2.03-2.166-.385-.023-.421.582-.032.605z"/></svg>
									</a>
									<a href="${th[i].social.watsap}" target="_blank">
										<svg height="682pt" viewBox="-23 -21 682 682.66669" width="682pt" xmlns="http://www.w3.org/2000/svg"><path d="m544.386719 93.007812c-59.875-59.945312-139.503907-92.9726558-224.335938-93.007812-174.804687 0-317.070312 142.261719-317.140625 317.113281-.023437 55.894531 14.578125 110.457031 42.332032 158.550781l-44.992188 164.335938 168.121094-44.101562c46.324218 25.269531 98.476562 38.585937 151.550781 38.601562h.132813c174.785156 0 317.066406-142.273438 317.132812-317.132812.035156-84.742188-32.921875-164.417969-92.800781-224.359376zm-224.335938 487.933594h-.109375c-47.296875-.019531-93.683594-12.730468-134.160156-36.742187l-9.621094-5.714844-99.765625 26.171875 26.628907-97.269531-6.269532-9.972657c-26.386718-41.96875-40.320312-90.476562-40.296875-140.28125.054688-145.332031 118.304688-263.570312 263.699219-263.570312 70.40625.023438 136.589844 27.476562 186.355469 77.300781s77.15625 116.050781 77.132812 186.484375c-.0625 145.34375-118.304687 263.59375-263.59375 263.59375zm144.585938-197.417968c-7.921875-3.96875-46.882813-23.132813-54.148438-25.78125-7.257812-2.644532-12.546875-3.960938-17.824219 3.96875-5.285156 7.929687-20.46875 25.78125-25.09375 31.066406-4.625 5.289062-9.242187 5.953125-17.167968 1.984375-7.925782-3.964844-33.457032-12.335938-63.726563-39.332031-23.554687-21.011719-39.457031-46.960938-44.082031-54.890626-4.617188-7.9375-.039062-11.8125 3.476562-16.171874 8.578126-10.652344 17.167969-21.820313 19.808594-27.105469 2.644532-5.289063 1.320313-9.917969-.664062-13.882813-1.976563-3.964844-17.824219-42.96875-24.425782-58.839844-6.4375-15.445312-12.964843-13.359374-17.832031-13.601562-4.617187-.230469-9.902343-.277344-15.1875-.277344-5.28125 0-13.867187 1.980469-21.132812 9.917969-7.261719 7.933594-27.730469 27.101563-27.730469 66.105469s28.394531 76.683594 32.355469 81.972656c3.960937 5.289062 55.878906 85.328125 135.367187 119.648438 18.90625 8.171874 33.664063 13.042968 45.175782 16.695312 18.984374 6.03125 36.253906 5.179688 49.910156 3.140625 15.226562-2.277344 46.878906-19.171875 53.488281-37.679687 6.601563-18.511719 6.601563-34.375 4.617187-37.683594-1.976562-3.304688-7.261718-5.285156-15.183593-9.253906zm0 0" fill-rule="evenodd"/></svg>
									</a>
									<a href="${th[i].social.telegr}" target="_blank">
										<svg id="Bold" enable-background="new 0 0 24 24" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m9.417 15.181-.397 5.584c.568 0 .814-.244 1.109-.537l2.663-2.545 5.518 4.041c1.012.564 1.725.267 1.998-.931l3.622-16.972.001-.001c.321-1.496-.541-2.081-1.527-1.714l-21.29 8.151c-1.453.564-1.431 1.374-.247 1.741l5.443 1.693 12.643-7.911c.595-.394 1.136-.176.691.218z"/></svg>
									</a>
									<a href="${th[i].social.fb}" target="_blank">
										<svg id="Bold" enable-background="new 0 0 24 24" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m15.997 3.985h2.191v-3.816c-.378-.052-1.678-.169-3.192-.169-3.159 0-5.323 1.987-5.323 5.639v3.361h-3.486v4.266h3.486v10.734h4.274v-10.733h3.345l.531-4.266h-3.877v-2.939c.001-1.233.333-2.077 2.051-2.077z"/></svg>
									</a>
								</div>
							</div>
						</div>
						<div class="reiting-block">
							Средняя оценка:
							<ul class="ul-reiting">
								${reiting_li.fun()}
							</ul>
						</div>
						<div class="sharing">
							<a href="${th[i].user_link}#reviews">
								Читать отзывы
							</a>
						</div>
					</div>
					<ul class="ul-list">
						${description.fun()}
					</ul>
					<div class="show-more">
						<a href="${th[i].user_link}">
							Подробнее про cпециалиста
						</a>
					</div>
				</div>
			</article>`);
		}
		/*----------------call functions----------------*/
		// show-show-more description
		items_catalog.fun();
		// saring
		sharing.fun();
		// show-show-more catalog
		show_catalog.fun();
		// filter
		fillter_catalog.fun(th);
		// show-show-more catalog
		show_catalog.fun_2();
		// reiting
		reiting_fun.fun(th);
		// contacts
		contacts.fun();
	});
});



