jQuery(document).ready(function($) {
	$( ".select" ).selectmenu();













	/*
		<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
		<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
		// less
		body{
			.custom-combobox {
				position: relative;
				display: block;
				width: 100%;
			}
			.custom-combobox-toggle {
				display: none;
			}
			.custom-combobox-input {
				margin: 0;
				padding: 5px 10px;
			}
			.ui-widget.ui-widget-content{
				max-height: 300px;
				overflow-x: hidden;
				overflow-y: auto;
			}
		}
		<span class="ui-widget">
			<select id="combobox" class="combobox">
				<option>option 1</option>
				<option>option 2</option>
				<option>option 3</option>
				<option>option 4</option>
				<option>option 5</option>
				<option>option 6</option>
				<option>option 7</option>
				<option>option 8</option>
				<option>option 9</option>
				<option>Лохов Лох Лохович</option>
			</select>
		</span>
	*/
	jQuery(document).ready(function($) {
		$( function() {
			$.widget( "custom.combobox", {
				_create: function() {
					this.wrapper = $( "<span>" )
						.addClass( "custom-combobox" )
						.insertAfter( this.element );
	 
					this.element.hide();
					this._createAutocomplete();
					this._createShowAllButton();
				},
	 
				_createAutocomplete: function() {
					var selected = this.element.children( ":selected" ),
						value = selected.val() ? selected.text() : "";
	 
					this.input = $( "<input>" )
						.appendTo( this.wrapper )
						.val( value )
						.attr( "title", "" )
						.addClass( "custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left" )
						.autocomplete({
							delay: 0,
							minLength: 0,
							source: $.proxy( this, "_source" ),
							autoFocus: true,
							// Додавання і видалення активного класу
							open: function( event, ui ) {
								$(this).parents('.custom-combobox').addClass('open-select');
							},
							close: function( event, ui ) {
								$(this).parents('.custom-combobox').removeClass('open-select');
							}
	
						})
						.tooltip({
							classes: {
								"ui-tooltip": "ui-state-highlight"
							}
						});
	 
					this._on( this.input, {
						autocompleteselect: function( event, ui ) {
							ui.item.option.selected = true;
							this._trigger( "select", event, {
								item: ui.item.option
							});
	
						},
	 
						autocompletechange: "_removeIfInvalid"
					});
				},
	 
				_createShowAllButton: function() {
					var input = this.input,
						wasOpen = false;
	 
					$( "<a>" )
						.attr( "tabIndex", -1 )
					 
						.tooltip()
						.appendTo( this.wrapper )
						.button({
							icons: {
								primary: "ui-icon-triangle-1-s"
							},
							text: false
						})
						.removeClass( "ui-corner-all" )
						.addClass( "custom-combobox-toggle ui-corner-right" )
						.on( "mousedown", function() {
							wasOpen = input.autocomplete( "widget" ).is( ":visible" );
						})
						.on( "click", function() {
							input.trigger( "focus" );
							// Close if already visible
							if ( wasOpen ) {
								return;
							}
							// Pass empty string as value to search for, displaying all results
							input.autocomplete( "search", "" );
						});
				},
				_source: function( request, response ) {
					var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
					response( this.element.children( "option" ).map(function() {
						var text = $( this ).text();
						if ( this.value && ( !request.term || matcher.test(text) ) )
							return {
								label: text,
								value: text,
								option: this,
							};
					}) );
				},
				_removeIfInvalid: function( event, ui ) {
					// Selected an item, nothing to do
					if ( ui.item ) {
						return;
					}
					// Search for a match (case-insensitive)
					var value = this.input.val(),
						valueLowerCase = value.toLowerCase(),
						valid = false;
					this.element.children( "option" ).each(function() {
						if ( $( this ).text().toLowerCase() === valueLowerCase ) {
							this.selected = valid = true;
							return false;
						}
					});
					// Found a match, nothing to do
					if ( valid ) {
						return;
					}
					// Remove invalid value
					this.input
						.val( "" )
						
						.tooltip( "open" );
					this.element.val( "" );
					this._delay(function() {
						this.input.tooltip( "close" ).attr( "title", "" );
					}, 2500 );
					this.input.autocomplete( "instance" ).term = "";
				},
				_destroy: function() {
					this.wrapper.remove();
					this.element.show();
				}
			});
			$( ".combobox" ).combobox();
		} );
	
		$(window).load(function() {
			// Додавання placeholder для input
			$('.custom-combobox-input').each(function(index, el) {
				var th_th_val = $(this).parents('.ui-widget').find('select option').first().val();
				$(this).attr('placeholder', th_th_val);
				$(this).val('');
			});
			// записування значення в input уже вибраного option
			$('.ui-widget').each(function(index, el) {
				var th_val = $(this).find('select option:selected').val();
				$(this).find('input.custom-combobox-input').val(th_val);
			});
			// очищення input при його натисканні
			$('.custom-combobox-input').click(function(event) {
				$(this).parents('.ui-widget').find('.custom-combobox-toggle').trigger('click');
				$(this).val('')
			});
			// при покиданні input перевіряти брати значення з option:selected (Захист від дурня)
			$('.custom-combobox-input').focusout(function(event) {
				 var th_val =  $(this).parents('.ui-widget').find('select option:selected').val();
				$(this).val(th_val);
			});
		});
	});



















});