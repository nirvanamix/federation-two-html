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
			var remover_id = new Array();
			for (const prop in result_fill) {
				for (var i = 0; i < name_json.length; i++) {
					if(name_json[i].filter[prop] != result_fill[prop]
						&& prop != "key-poblem"
						&& prop != "min_price"
						&& prop != "max_price"
						&& prop != "experience"
						&& prop != "equipment")
					{
						remover_id.push(name_json[i].id);
					}
					// key-poblem
					if(prop == "key-poblem"){
						if(name_json[i].filter[prop].search(result_fill[prop]) != -1 == false){
							remover_id.push(name_json[i].id);
						}
					}
					if(prop == "equipment"){
						if(name_json[i].filter[prop].search(result_fill[prop]) != -1 == false){
							remover_id.push(name_json[i].id);
						}
					}
					// min price / max price
					if(prop == "min_price" || prop == "max_price"){
						var min =+ result_fill.min_price;
						var max =+ result_fill.max_price;
						if(min == undefined) min = 0;
						if(max == undefined) max = Infinity;
						if(name_json[i].filter.price < min || name_json[i].filter.price > max) remover_id.push(name_json[i].id);
					}
					// experience
					if(prop == "experience"){
						var exp_user =+ name_json[i].filter.experience;
						var ext_select =+ result_fill[prop];
						if(exp_user < ext_select) remover_id.push(name_json[i].id);
					}
					// select online
					if(prop == "work_online"){
						var status = name_json[i].filter.work_online;
						if(status == false){
							remover_id.push(name_json[i].id);
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
				var result = remover_id.unique().indexOf(th_index + 1);
				if(result >= 0){
					$(this).wrap('<div class="hide"></div>');
				}
			});
			// show-show-more catalog
			show_catalog.fun();
		});
	}
}
$(function () {
	$.ajax({
		url: "catalog.json"
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
			$('.items-catalog').append(`<article class="item">
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
							<ul class="ul-reiting" data-reiting="${th[i].reiting}">
								<li></li><li></li><li></li><li></li><li class="disabled"></li>
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
	});
});



