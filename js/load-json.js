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
		url: "../catalog.json"
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
						<div class="img"><img src="${th[i].img_user}" alt=""></div>
						<div class="text-block">
							<h3>${th[i].name}</h3>
							<ul class="ul-contact">
								<li>
									<a href="tel:${th[i].phone}">
										<i class="phone"></i>
										${th[i].phone}
									</a>
								</li>
								<li>
									<a href="mailto:${th[i].mail}">
										<i class="mail"></i>
										${th[i].mail}
									</a>
								</li>
							</ul>
							<div class="reiting-wr">
								<div class="skype-block">
									<i class="skype"></i>
									${th[i].skype}
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
							<span>
								Поделиться в соц.сетях
							</span>
						</div>
					</div>
					<ul class="ul-list">
						${description.fun()}
					</ul>
					<div class="show-more">
						<span data-default="Подробнее про cпециалиста" data-active="Скрыть информацию"></span>
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
	});
});



