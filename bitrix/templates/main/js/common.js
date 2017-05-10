$(window).on('load', function() {
	openOnLoad();
});
document.addEventListener("DOMContentLoaded", function() {

	(function() {
		var mainHeader = document.querySelector('.cd-auto-hide-header');

		$(window).on('scroll', function() {
			requestAnimationFrame(autoHideHeader);
		});

		function autoHideHeader() {
			var currentTop = $(document).scrollTop();
			checkSimpleNavigation(currentTop);
		}

		function checkSimpleNavigation(currentTop) {
			if (currentTop <= 20) {
				mainHeader.classList.remove('is-hidden');
			} else {
				mainHeader.classList.add('is-hidden');
			}
			ActivePos($('#slide-line'), '.header-bottom-menu-item.active');
		}
	})();

	function AsideScroll() {
		if ($('.js-activescroll-list').length) {
			var scrolling = false;
			var verticalNavigation = $('.js-activescroll-list'),
				navigationItems = verticalNavigation.find('.js-scroll-to'),
				contentSections = $('.js-activescroll-block');

			$(window).on('scroll', checkScroll);

			function checkScroll() {
				if (!scrolling) {
					scrolling = true;
					(!window.requestAnimationFrame) ? setTimeout(updateSections, 300): window.requestAnimationFrame(updateSections);
				}
			}

			function updateSections() {
				var halfWindowHeight = $(window).height() / 3,
					scrollTop = $(window).scrollTop();
				contentSections.each(function() {
					var section = $(this),
						sectionId = section.data('id');
					navigationItem = navigationItems.filter("[data-href='" + sectionId + "']");
					((section.offset().top - halfWindowHeight < scrollTop) && (section.offset().top + section.outerHeight() - halfWindowHeight > scrollTop)) ? navigationItem.addClass('active'): navigationItem.removeClass('active');
				});
				scrolling = false;
			}
		}
	}
	AsideScroll();

	function Menu() {
		var trigger = $('.js-menu'),
			target = $('.header-mobile-menu'),
			header = $('.page__header'),
			body = $('body'),
			OpenClass = 'active',
			OpenClass2 = 'menu-open';
		trigger.add(target).on('click', function() {

			if (!trigger.hasClass('anim')) {
				trigger.addClass('anim');
				scrollbody(OpenClass2);
				trigger.add(target).toggleClass(OpenClass);
				body.add(header).toggleClass(OpenClass2);
				setTimeout(function() {
					trigger.removeClass('anim')
				}, 500);
			}

		})
		$('.header-mobile-menu-outer').click(function(e) {
			e.stopPropagation();
		});
	}
	Menu();

	function MobileDropdown(trigger, parent, target) {
		var trg = $(trigger),
			prnt = trg.closest(parent),
			trgt = prnt.find(target);
		trg.each(function() {
			$(this).on('click', function() {

				var item = prnt.find(trgt);
				if (item.hasClass('active')) {

					item.add($(this)).removeClass('active');
				} else {
					prnt.siblings().find(trgt).removeClass('active');
					item.add($(this)).addClass('active');
				}
			});
		});
	}
	MobileDropdown('.js-dropdown', '.js-dropdown-parent', '.js-dropdown-target')

	function scrollbody(classcheck) {
		var body = $('body');
		if (!body.hasClass(classcheck)) {
			var _h = body.scrollTop();
			if (_h === 0) {
				_h = $('html').scrollTop();
			}
			body.css('top', -_h)
		} else {
			var _h = parseInt(body.css('top')),
				_res = Math.abs(_h);
			body.css('top', '')
			setTimeout(function() {
				$(window).add(body).scrollTop(_res);
			}, 10)
		}
	}

	function SlideLine() {

		var el, leftPos, newWidth,
			mainNav = $(".header-bottom-menu"),
			trigger = mainNav.find('li .header-bottom-menu-navlink'),
			active = mainNav.find('.active');

		mainNav.parent().append("<div id='slide-line'></div>");
		var Line = $("#slide-line");

		ActivePos(Line, '.header-bottom-menu-item.active');

		trigger.hover(function() {
			var el = $(this).find('span');
			var leftPos = el.position().left;
			var newWidth = el.width();
			Line.stop().animate({
				left: leftPos,
				width: newWidth
			});
		}, function() {
			if (active.length != 0) {
				Line.stop().animate({
					left: Line.data("origLeft"),
					width: Line.data("origWidth")
				});
			} else {
				Line.stop().animate({
					width: 0
				});
			}
		});
		$(window).on('resize', function() {
			setTimeout(function() {
				ActivePos(Line, '.header-bottom-menu-item.active');
			}, 300);
		});
	}
	SlideLine();

	function ActivePos(Line, active) {
		if (Line.is(':visible') && $(active).length != 0) {
			Line.width($(active).find('span:not(.header-bottom-menu-navlink)').width())
				.css("left", $(active).find('span:not(.header-bottom-menu-navlink)').position().left)
				.data("origLeft", Line.position().left)
				.data("origWidth", Line.width());
		}
	}

	$(".js-scroll-to").on('click', function(e) {
		e.preventDefault();
		var elementClick = $(this).data("href");
		var target = $('body').find('[data-id="' + elementClick + '"]');
		$(".aside-stick").trigger("sticky_kit:recalc");
		if (target.length) {
			var destination = $(target).offset().top,
				pad = window.matchMedia('(max-width: 991px)').matches ? 70 : 90;
			$("html, body:not(:animated), .out:not(:animated)").animate({
				scrollTop: destination - pad
			}, 500);
			setTimeout(function() {
				window.location.hash = elementClick;
			}, 400)
		}
	});

	// отключаем инпуты, если поездка в одну сторону
	//используется на главной

	function ToggleDisabled() {
		var trigger = $('.js-condition');
		trigger.each(function() {
			var _ = $(this),
				form = _.closest('form'),
				target = form.find('.js-condition-target'),
				targetVal = target.find('input').val(),
				inp = _.find('input');

			_.off('click').on('click', function() {

				inp.prop('checked') == true ?
					target.removeClass('disabled') : target.addClass('disabled');
				targetVal = '';
				//очищаем датапикер если он есть
				$.datepicker._clearDate(target.find('.datepicker'));
			});
		});
	}
	jQuery.fn.toggleText = function() {
		var altText = this.data("alt-text");
		if (altText) {
			this.data("alt-text", this.text());
			this.find('span').text(altText);

		}
	};
	(function(factory) {
		if (typeof define === "function" && define.amd) {

			// AMD. Register as an anonymous module.
			define(["../widgets/datepicker"], factory);
		} else {

			// Browser globals
			factory(jQuery.datepicker);
		}
	}(function(datepicker) {

		datepicker.regional.ru = {
			closeText: "Закрыть",
			prevText: "&#x3C;Пред",
			nextText: "След&#x3E;",
			currentText: "Сегодня",
			monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
				"Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
			],
			monthNamesShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн",
				"Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"
			],
			dayNames: ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
			dayNamesShort: ["вск", "пнд", "втр", "срд", "чтв", "птн", "сбт"],
			dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
			weekHeader: "Нед",
			dateFormat: "dd.mm.yy",
			firstDay: 1,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: ""
		};
		datepicker.setDefaults(datepicker.regional.ru);

		return datepicker.regional.ru;

	}));

	ToggleDisabled();
	CountryReplace();
	aside();
	popUpsInit();
	validateForms();
	initCustomSelectList();
	GrabReports();

	datepick();
	multiPicker();

	Tabs();
	sortItem();
	listhide();
	CompareHeight();
	questionSlider();
	servicesSlider();
	promoSlider();
	routefeaturesSlider();

//end of document.ready
});
//end of document.ready
var slideArrr = '<button type="button" class="carousel-next"><svg class="icon icon-drop"><use xlink:href="#slider-arrow" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></button>';
var slideArrl = '<button type="button" class="carousel-prev"><svg class="icon icon-drop"><use xlink:href="#slider-arrow" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></button>';

function slidesCount(elem) {
	var container = elem.parent().find('.slider-counter'),
		curSlideCont = container.find('.slider-curr'),
		totatSlideCont = container.find('.slider-total'),
		pages;

	elem.on('init reInit breakpoint beforeChange', function(event, slick, currentSlide, nextSlide) {
		var slidesShown = parseInt(slick.slickGetOption('slidesToShow')),
			slidesScroll = parseInt(slick.slickGetOption('slidesToScroll')),
			slidesNext = parseInt(nextSlide),
			totalSlides = parseInt(slick.slideCount),
			totalPages = Math.ceil(totalSlides / slidesShown),
			curPage = event.type == 'init' || event.type == 'reInit' || event.type == 'breakpoint' ? 0 : parseInt(slidesNext / slidesScroll);
		totatSlideCont.text(slidesShown == 1 ? totalSlides : totalPages)
		curSlideCont.text(curPage + 1)
	});
}

function listhide() {
	var target = $('.js-slidelist');
	target.each(function() {
		var _ = $(this),
			len = _.data('items'),
			items = _.closest('.tabs-cont').find('.js-slidelist-target').find('li'),
			itemsl = items.length,
			text = 'Свернуть',
			trigger = _;

		items.slice(len).slideUp();
		initclick();

		function initclick() {
			trigger.off('click').on('click', function(e) {
				e.preventDefault();
				items.slice(len).fadeToggle(300);
				$(this).toggleText();
			});
		}
	})
}

function CompareHeight() {
	$('.question-item').matchHeight({
		property: 'min-height'
	});
}


var sortItem = function() {
	var trigger = $('.js-select-item');
	trigger.on('click', function() {
		var _ = $(this);
		var textCont = _.find('span');
		var target = _.parent().find('.dropdown-target');
		var item = target.find('.sort-select-item a');

		_.toggleClass('active');

		item.on('click', function(e) {

			var _ = $(this),
				altLext = _.data('text');

			textCont.text(altLext);

			_.parent().addClass('active').siblings().removeClass('active');
			e.preventDefault();
			setTimeout(function() {

				target.removeClass('active');
				trigger.removeClass('active');

			}, 300);
		});

		$(document).on('mouseup', function(e) {
			if (!trigger.is(e.target) && trigger.has(e.target).length === 0) {
				trigger.removeClass('active');
			}
		});

	});
}

function initCustomSelectList() {
	var _conf = {
			initClass: 'cs-active',
			f: {}
		},
		_items = $('.js-select-custom');
	$.each(_items, function() {
		var _select = $(this),
			_button = _select.find('button'),
			placeholder = _button.data('placeholder'),
			_list = _select.find('.select-list');
		_select.on('reinit', function() {
			var _active = _list.find('input:checked');
			if ($(this).hasClass('depends-on')) {
				var item = $(this).closest('.input-item');
				if (_active.length) {
					var next = item.nextAll('.input-item').find('.depends-on');
					next.removeClass('disabled').find('input').prop('checked', false);
					next.trigger('reinit');
				} else {
					var next = item.nextAll('.input-item').find('.depends-on');
					next.addClass('disabled').find('input').prop('checked', false);
					next.trigger('reinit');
				}
			}
			if (_active.length) {
				if ($(this).hasClass('price-total')) {
					_button.children('.btn-text').addClass('active').html(_active.siblings('.elem-price').html()).parent().addClass('is-checked')
				} else {
					_button.children('.btn-text').addClass('active').text('' + _active.siblings('span').text() + '').parent().addClass('is-checked')
				}
			} else {
				_button.children('.btn-text').removeClass('active').text(_button.data('placeholder')).parent().removeClass('is-checked');
			}
			CheckForSelect($(this).parents('form'));
		});
		_button.off('click').on('click', function() {
			_button.parent().toggleClass('active').siblings().removeClass('active');
			return (false);
		});
		_select.off('click').on('click', 'label', function() {
			var _label = $(this),
				_input = _label.find('input');
			_input.prop('checked', true);
			_select.trigger('reinit');
			_button.parent().removeClass('active');
		});
		_select.trigger('reinit');
		_select.addClass(_conf.initClass);
		 $(document).on('mouseup', function (e){
			if (!_select.is(e.target)
				&& _select.has(e.target).length === 0) {
				_select.removeClass('active');
			}
		});
	});
}

function aside() {
	function stickinit() {
		setTimeout(function() {
			$(".aside-stick").stick_in_parent({
				parent: ".aside-menu",
				offset_top: 73,
				// recalc_every: 1
			});
		}, 1)
	}
	stickinit();

	$(window).on('resize', function() {
		if (window.matchMedia("(max-width: 735px)").matches) {
			$(".aside-stick").trigger("sticky_kit:detach");
		} else {
			stickinit()
		}
	});
}

function updateToSelectMenu() {
	$('.ui-datepicker-title select').selectmenu({
		select: function(e) {
			$(this).trigger('change');
			updateToSelectMenu();
		}
	})
	$('.ui-datepicker-title').append($('.ui-selectmenu-menu'));
}


$.datepicker._defaults.onAfterUpdate = null;

var datepicker__updateDatepicker = $.datepicker._updateDatepicker;
$.datepicker._updateDatepicker = function( inst ) {
	 datepicker__updateDatepicker.call( this, inst );

	 var onAfterUpdate = this._get(inst, 'onAfterUpdate');
	 if (onAfterUpdate)
		onAfterUpdate.apply((inst.input ? inst.input[0] : null),
				 [(inst.input ? inst.input.val() : ''), inst]);
}


function datepick() {

	var item = $(".datepicker"),
		yearClass = 'datepicker-chengeyear',
		pastClass = 'datepicker-past',
		multiClass = 'datepicker-rangedate',
		monthClass = 'datepicker-chengemonth';

	item.each(function() {
		var _ = $(this),
			dateToday = new Date();
		$.datepicker.setDefaults($.datepicker.regional["ru"]);
		_.datepicker({
			changeMonth: false,
			changeYear: false,
			dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
			monthNamesShort: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
			dateFormat: 'dd.mm.yy',
			firstDay: 1,
			yearRange: '-10:+1',
			minDate: dateToday,
			showOn: "focus",
			//еобновляем меню при смене месяца
			beforeShow: function() {
				setTimeout(function() {
					updateToSelectMenu()
				},0);
			},
			onChangeMonthYear: function() {
				setTimeout(function() {
					updateToSelectMenu()
				},0);
			}
		});
		_.datepicker('refresh');
		if(_.hasClass(yearClass)){
			_.datepicker( "option", "changeYear", true );
		}
		if(_.hasClass(pastClass)){
			_.datepicker( "option", "minDate", null );
		}
		if(_.hasClass(monthClass)){
			_.datepicker( "option", "changeMonth", true );
		}
	});
}
function multiPicker(){

	var cur = -1, prv = -1;
	var item = $('.multipicker');

	item.each(function(){
		var _ = $(this),
			dateToday = new Date();
		realPicker = _.parent().find('.multipicker-real');

		realPicker.datepicker({
			changeMonth: false,
			changeYear: false,
			maxDate: dateToday,
			showButtonPanel: true,
			beforeShowDay: function ( date ) {
				return [true, ( (date.getTime() >= Math.min(prv, cur) && date.getTime() <= Math.max(prv, cur)) ? 'date-range-selected' : '')];
			},
			onSelect: function ( dateText, inst ) {
				var d1, d2;
				prv = cur;
				cur = (new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay)).getTime();
				if ( prv == -1 || prv == cur ) {
					prv = cur;
					_.val( dateText );
				} else {
					d1 = $.datepicker.formatDate( 'dd.mm.yy', new Date(Math.min(prv,cur)), {} );
					d2 = $.datepicker.formatDate( 'dd.mm.yy', new Date(Math.max(prv,cur)), {} );
					_.val( d1+' - '+d2 );
				}
			},

			onChangeMonthYear: function ( year, month, inst ) {
							//prv = cur = -1;
			},

			onAfterUpdate: function ( inst ) {
				$('<button type="submit" class="btn btn-colored" data-handler="hide" data-event="click"><span>Сформировать отчет</span></button>')
							.appendTo(realPicker.find('.ui-datepicker-buttonpane'))
							.on('click', function () { realPicker.hide(); });
				validateForms();
					 }
		 }).hide();

	 _.on('focus', function (e) {

				 var v = this.value,
						 d;

				 try {
					if ( v.indexOf(' - ') > -1 ) {
						d = v.split(' - ');

						prv = $.datepicker.parseDate( 'dd.mm.yy', d[0] ).getTime();
						cur = $.datepicker.parseDate( 'dd.mm.yy', d[1] ).getTime();

					} else if ( v.length > 0 ) {
							 prv = cur = $.datepicker.parseDate( 'dd.mm.yy', v ).getTime();
					}
				} catch ( e ) {
					cur = prv = -1;
				}
		if ( cur > -1 )
			realPicker.datepicker('setDate', new Date(cur));

		realPicker.datepicker('refresh').show();

		$(document).on('mousedown', function(e) {
			if (!realPicker.is(e.target) && realPicker.has(e.target).length === 0) {
				realPicker.hide();
			}
		});
	});
	 });
}

function promoSlider() {
	$(".js-promoslider").each(function() {
		var _this = $(this);
		var parent = _this.parent();
		_this.slick({
			accessibility: true,
			arrows: false,
			draggable: false,
			autoplay: true,
			dots: true,
			appendDots: parent.find('.nav-dots'),
			touchMove: false,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplaySpeed: 8000
		});
	});
}

function questionSlider() {
	$(".js-questionslider").each(function() {
		var _this = $(this);
		slidesCount(_this);
		_this.slick({
			accessibility: true,
			arrows: true,
			draggable: false,
			dots: false,
			touchMove: true,
			autoplay: false,
			infinite: false,
			appendArrows: _this.parent().find('.nav-arrows'),
			slidesToShow: 6,
			slidesToScroll: 1,
			nextArrow: slideArrr,
			prevArrow: slideArrl,
			responsive: [{
				breakpoint: 950,
				settings: {
					slidesToShow: 4,
					autoplay: true,
					autoplaySpeed: 5000,
					slidesToScroll: 2,
				}
			}, {
				breakpoint: 700,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
				}
			}, {
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				}
			}, {
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					centerMode: true,
				}
			}, ]
		});
	});
}

function routefeaturesSlider() {
	$(".js-routefeatures-slider").each(function() {
		var _this = $(this);
		slidesCount(_this);
		_this.slick({
			accessibility: true,
			arrows: true,
			draggable: false,
			dots: false,
			touchMove: true,
			autoplay: false,
			infinite: false,
			appendArrows: _this.parent().find('.nav-arrows'),
			slidesToShow: 6,
			slidesToScroll: 1,
			nextArrow: slideArrr,
			prevArrow: slideArrl,
			responsive: [{
				breakpoint: 1024,
				settings: {
					slidesToShow: 5,
					autoplay: true,
					autoplaySpeed: 5000,
					slidesToScroll: 2,
				}
			}, {
				breakpoint: 870,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
				}
			}, {
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				}
			}, ]
		});
	});
}

function servicesSlider() {
	$(".js-serviceslider").each(function() {
		var _this = $(this);
		slidesCount(_this);
		_this.slick({
			accessibility: true,
			arrows: true,
			draggable: false,
			dots: false,
			touchMove: true,
			autoplay: false,
			infinite: false,
			appendArrows: _this.parent().find('.nav-arrows'),
			slidesToShow: 3,
			slidesToScroll: 1,
			nextArrow: slideArrr,
			prevArrow: slideArrl,
			responsive: [{
				breakpoint: 950,
				settings: {
					slidesToShow: 2,
					autoplay: true,
					autoplaySpeed: 5000,
				}
			}, {
				breakpoint: 700,
				settings: {
					slidesToShow: 1,
				}
			}, ]
		});
	});
}

function mapMarkerinit(elem) {
	var center =$("#" + elem).closest('.tabs-cont').find('li').first();
	var cords = center.data('cords');
	var imgsrc = $("#" + elem).data('imagesrc');
	var centerarr =[];
	var myMap, gCollection, myPlacemark,MyBalloonContentLayoutClass;
	ymaps.ready(init);
	makeArray(center,centerarr);

	function init() {
		var parent = $('.tabs-cont');
		myMap = new ymaps.Map(elem, {
			center: cords,
			zoom: 14,
			controls: ['zoomControl', 'fullscreenControl']
		}, {

		}),
			MyBalloonContentLayoutClass = ymaps.templateLayoutFactory.createClass(
				'<b>{{ properties.name }}</b>' +
				'<p>{{ properties.description }}</p>'
			),
			gCollection = new ymaps.GeoObjectCollection(null, {}),
			myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
				id: 0,
				name: centerarr[0][1][0],
				description: centerarr[0][1][1]
			}, {
				iconLayout: 'default#image',
				iconImageHref: imgsrc,
				// Размеры метки.
				iconImageSize: [40, 50],
				iconImageOffset: [-20, -50],
				balloonContentLayout: MyBalloonContentLayoutClass
			});

		myMap.geoObjects.add(myPlacemark);
		myMap.behaviors.disable(['rightMouseButtonMagnifier', 'ruler', 'scrollZoom']);
		myMap.controls.remove('typeSelector');
		myMap.controls.remove('searchControl');
		myMap.controls.remove('GeolocationControl');
		myMap.container.fitToViewport();

		//не даем карте пропасть при ресайзе и переключении табов
		$("#" + elem).on('resize', function() {
			setTimeout(function() {
				myMap.container.fitToViewport();
			}, 300)
		});

		//создаем геообьект из полученных координат
		function triggerLi(){
			var map = $('#'+ elem+''),
				listElem = map.closest(parent).find('li');
			getElem(listElem,gCollection);
			getElem(listElem,myPlacemark);

		}triggerLi();

		//ловим клик по принятому геообьекту и переключаем класс на соотв. лишке
		function getElem(target,trigger){
			trigger.events.add('click',function(e){
				var elemClicked = e.get('target'),
					elemId = elemClicked.properties.get('id');
				target.eq(elemId).addClass('active').siblings().removeClass('active');
			});
		}
		// убираем .active  с лишек на закрытии балуна
		myMap.events.add('balloonclose',function(){
			parent.find('li').removeClass('active');
		});

		// добавляем собранный массив данных в геоколлекцию
		var getpos = getCoords(elem);
		var arrl = getpos.length;
		for (var i = 0; i < arrl; i++) {
			gCollection.add(new ymaps.Placemark(getpos[i][0], {
				id: i + 1,
				name: getpos[i][1][0],
				description: getpos[i][1][1]
			}));
		}
		// опции геоколлекции
		gCollection.options.set({
			iconLayout: 'default#image',
			iconImageHref: imgsrc,
			// Размеры метки.
			iconImageSize: [24, 35],
			iconImageOffset: [-12, -35],
			balloonContentLayout: MyBalloonContentLayoutClass
		});


		Inintclick(elem);

		// открываем и закрываем балун при клике на элементы списка
		function ListClick(){

			parent.each(function(){
				var _ = $(this);
				var button = _.find('.js-marker-add');
				elem = _.find('.js-slidelist-target li');
				elem.each(function(){
					var that = $(this);
					that.on('click',function(){
						var index = that.index(),
							placemark;
						that.addClass('active').siblings().removeClass('active');
						index == 0 ? placemark = myPlacemark : placemark = gCollection.get(index - 1);
						index < 4 && !button.hasClass('active') ? button.trigger('click') : false;
						placemark.events.fire('click', {
							coordPosition: placemark.geometry.getCoordinates(),
							target: placemark
						});
					});
				});
			});


		}ListClick();
	}
	// добавляем и удаляем геоколлекцию на карту
	function Inintclick(elem) {
		var trigger = $("#" + elem).closest('.tabs-cont').find('.js-marker-add');
		trigger.on('click', function() {
			var _ = $(this);
			if (!_.hasClass('active')) {
				_.addClass('active');
				myMap.geoObjects.add(gCollection);
				// myMap.setZoom(12)
				myMap.setBounds(myMap.geoObjects.getBounds());
			} else {
				_.removeClass('active').closest('.tabs-cont').find('li').removeClass('active');
				myMap.geoObjects.remove(gCollection);
				myMap.setBounds(myMap.geoObjects.getBounds());
				myMap.setZoom(14);
			}
		});
	}

	//собираем координаты и помещаем и в массив, первый элемент вырезаем, т.к. он уже будет на карте
	function getCoords(elem) {
		var pos = [];
		var items = $("#" + elem).closest('.tabs-cont').find('li');
		items.each(function() {
			makeArray($(this),pos)
		});
		pos.splice(0, 1);
		return pos
	}
	function makeArray(item,array){
		var elpos = item.data('cords');
		var eldesc = item.data('descr');
		var arr = eldesc.split(",");
		var result = [elpos, arr];
		array.push(result)
	}
}


function validateForms() {
	var form_form = $('.js-validate');
	if (form_form.length) {
		form_form.each(function() {
			var form_this = $(this);
			var parent = form_this.parent();
			$.validate({
				form: form_this,
				modules: 'logic',
				borderColorOnError: true,
				scrollToTopOnError: false,
				onSuccess: function($form) {
					formResponse(form_this);
				},
				onValidate: function($form) {
					CheckForSelect(form_this);
				}
			});
		});
	}
}

function CheckForSelect(form) {
	if (form.find('.select-check').length) {
		var wrap = form.find('.select-check');

		wrap.each(function() {
			var _ = $(this),
				btn = _.find('.selects'),
				option = _.find('.option.has-error');
			if (option.length) {
				_.addClass('error');

			} else {
				_.removeClass('error');
			}
		});
		wrap.hasClass('error') ? false : true
	}
}


function popUpsInit() {
	var _this = this;
	_this.b = {
		open: $('.js-popup-button')
	};
	_this.c = {
		popup: $('.js-popup-container'),
		body: $('body'),
		header: $('.page__header'),
	};
	_this.f = {};
	_this.conf = {
		body_class: 'modal_open',
		active_class: 'active',
		close_selector: '.closePopup',
		initial_class: 'popup-initialed',
		header_class: 'is-hidden'
	};
	var _h;
	_this.f.initModalActions = function(_popup) {
		/**
		 * Close buttons.
		 */
		$(_popup).on('click', '.modal-container', function(e) {
			if (!$(_this.conf.close_selector).is(e.target)) {
				e.stopPropagation();
				console.log(1)
			}
		});
		_popup.find(_this.conf.close_selector).add(_popup).off('click.popup').on('click.popup', function() {
			_this.f.closePopup(_popup);
		});
	};
	_this.f.closePopup = function(_popup) {
		var _res = Math.abs(_h),
			_cont = _popup.find('.modal-container:not(.response)')
		_response = _popup.find('.response');

		_this.c.header.removeClass(_this.conf.header_class);
		_popup.removeClass(_this.conf.active_class);
		_this.c.body.removeClass(_this.conf.body_class).removeAttr('style');
		$(window).scrollTop(_res);
		setTimeout(function() {
			_cont.removeAttr('style');
			_response.css('display', 'none');
		}, 500);
	};
	_this.f.openPopup = function(_popup) {
		_h = _this.c.body.scrollTop();
		if (_h === 0) {
			_h = $('html').scrollTop();
		}

		setTimeout(function() {
			_popup.addClass(_this.conf.active_class);
			_this.c.body.addClass(_this.conf.body_class).css('top', -_h);
		}, 10);
		setTimeout(function() {
			_this.c.header.addClass(_this.conf.header_class);
		}, 50)

	};
	/**
	 * Initial.
	 */
	$.each(_this.c.popup.not('.' + _this.conf.initial_class), function() {
		var _popup = $(this);
		_this.f.initModalActions(_popup);
		_popup.off('reinit').on('reinit', function() {
			_this.f.initModalActions(_popup);
		});
		_popup.addClass(_this.conf.initial_class);
	});
	_this.b.open.off('click.popup').on('click.popup', function(e) {
		e.preventDefault();
		var _b = $(this),
			_popup = _this.c.popup.filter('[data-modal="' + _b.data('modal') + '"]');
		_this.f.openPopup(_popup);
		return false;
	});
}

function openOnLoad() {
	var scrollItem = window.location.hash,
		target = $("[data-id='" + scrollItem + "']");
	window.scrollTo(0, 0);
	if (target.length) {
		setTimeout(function() {
			var destination = target.offset().top;
			target.hasClass('js-tab-trigger') ? target.trigger('click') : false;
			$("html,body:not(:animated)").animate({
				scrollTop: destination - 60
			}, 500);
		}, 100);
	}
}

function formResponse(form) {
	if (form.closest('.modal-container').length) {
		var cont = form.closest('.modal-container'),
			resp = cont.next('.response');
		if (resp.length) {
			cont.fadeOut("slow", function() {
				resp.fadeIn("slow");
			});
		}
	}
}

function Tabs() {
	if ($('.js-tabs-wrap').length) {

		var parent = $('.js-tabs-wrap');
		parent.each(function() {
			var _ = $(this),
				trigger = _.find('.js-tab-trigger'),
				tabbody = _.find('.tabs-body'),
				tabcont = tabbody.find('.tabs-cont'),
				triggerCur = _.find(trigger).filter('.active'),
				triggerIndex = triggerCur.index();

			if (!triggerCur.length) {
				tabcont.not(':first').hide();
				trigger.first().addClass('active');
			} else {
				tabcont.hide().eq(triggerIndex).show();
			}

			trigger.on('click', function(e) {
				var _ = $(this),
					id = _.data('id');
				e.preventDefault();
				if (!_.hasClass('active')) {
					_.addClass('active').siblings().removeClass('active');
					var triggerA = parent.find(trigger).filter('.active');
					window.location.hash = id;
					tabcont.hide().eq($(triggerA).index()).fadeIn().find('.map-elem').trigger('resize');
					tabcont.eq($(triggerA).index()).siblings().find('.js-marker-add.active').trigger('click');
				}
			});
		});
	}
}
function GrabReports(){
	var table = $('.js-report-table');
	table.each(function(){
		var _ = $(this),
			ActiveClass = 'active',
			checker = _.find('.js-report-input'),
			popup = _.find('.js-report-popup'),
			clear = _.find('.js-report-remove'),
			counter = _.find('.js-report-count');
		checker.on('click',function(){
			_.trigger('recalc.count');
		});
		_.on('recalc.count',function(){
			var checkTrue = _.find('input:checked').length;
			if(checkTrue > 0){
				popup.addClass(ActiveClass);
				counter.text(checkTrue)
			}else{
				popup.removeClass(ActiveClass);
				counter.text('0')
			}
		});
		clear.on('click',function(){
			checker.prop('checked',false);
			_.trigger('recalc.count');
		});
		_.trigger('recalc.count');
	});
}
function CountryReplace(){
	var _this = this;

	_this.options = {
		contSwitshCls: 'js-content-switch',
		activeCls: 'active'
	};

	_this.elem = $('.js-country-swap');
	_this.switchContelem = _this.elem.parent().parent().find('.js-content-switch-parent');
	_this.switchContItems = _this.switchContelem.find('.js-content-switch-item');
	var itemActive;
	_this.findElems = function(elem){
		var list = elem.parent().find('.js-country-swap-list'),
			items = list.find('.js-country-swap-item');
		itemActive = elem.find('.js-country-swap-item.active');
		_this.initClick(list,items,itemActive);
		_this.checkSwapContent();
	}

	_this.initClick = function(list,items,itemActive){
		$(items).each(function(){
			$(this).off('click').on('click',function(e){
				e.preventDefault();
				_this.changeBlock($(this),itemActive,list);
			});
		});
	}
	_this.changeBlock = function(item,itemActive,list){
		var _self = item;
		_self.detach().appendTo(_this.elem).addClass(_this.options.activeCls);
		itemActive.detach().appendTo(list).removeClass(_this.options.activeCls);
		_this.checkSwapContent();
		_this.findElems(_this.elem);
	}
	_this.swapContent = function(item,targetParent,targetItem){
		var id = item.data('block');
		targetParent.find('[data-block="'+id+'"]').addClass(_this.options.activeCls).siblings().removeClass(_this.options.activeCls);
	}
	_this.checkSwapContent = function(){
		if(_this.elem.hasClass(_this.options.contSwitshCls)){
			_this.swapContent(itemActive,_this.switchContelem,_this.switchContItems)
		}
	}
	_this.init = function(){
		_this.findElems(_this.elem);

	}
}

var coutryRep = new CountryReplace();
coutryRep.init();

function AddBlocks(){
	var _this = this;
	_this.elem = $('.js-btn-add');
	_this.props = {
		single: 'single',
		multi: 'multiple',
		section: 'section',
		addedCls: 'added'
	};
	_this.elems = {
		inp: '.js-btn-add-input',
		block: '.js-btn-add-block',
		section: '.js-btn-add-section',
		close : '<i class=" js-btn-add-remove small-link"></i>'
	};
	_this.init = function(){
		_this.elem.each(function(){
			var _ = $(this),
				type = _.data('type');
			_this.findElems(_,type)
		});
	};
	_this.findElems = function(trigger,type){
		if(type == _this.props.single){
			var target = trigger.closest('.input-item').find($(_this.elems.inp)).last();
			_this.initClickSingle(trigger,target)
		}
		if(type == _this.props.multi){
			var target = trigger.closest('.input-form').find(_this.elems.block).slice(-2);
			_this.initClickMulti(trigger,target)
		}
		if(type == _this.props.section){
			var target = trigger.closest('.form-block-section').find(_this.elems.section).last();
			_this.initClickSection(trigger,target)
		}
		_this.refreshListeners();
	};
	_this.initClickSingle = function(trigger,target){
		var clone;
		trigger.off('click').on('click',function(){
			clone = target.clone();
			var input = clone.find('input');
			clone.insertBefore(trigger);
			if(!clone.hasClass(_this.props.addedCls)) clone.append(_this.elems.close).addClass(_this.props.addedCls);
			ChangeName(input);
			_this.findElems(trigger,_this.props.single);
		});
	};
	_this.initClickMulti = function(trigger,target){
		trigger.off('click').on('click',function(){
			var fragment = document.createDocumentFragment();
			target.each(function(){
				var _ = $(this),
					clone = _.clone(),
					input = clone.find('input');
				clone.find('.js-btn-add').remove();
				if(!clone.hasClass(_this.props.addedCls)) {
					clone.find('.double').after(_this.elems.close);
					clone.addClass(_this.props.addedCls);
				}
				clone.appendTo(fragment);
				ChangeName(input);
			});
			target.last().after(fragment);
			_this.findElems(trigger,_this.props.multi);
		});
	};
	_this.initClickSection = function(trigger,target){
		trigger.off('click').on('click',function(){
			var clone = target.clone();
			var input = clone.find('input');
			clone.find('.js-btn-add').remove();
			if(!clone.hasClass(_this.props.addedCls)) {
				clone.append(_this.elems.close).addClass(_this.props.addedCls);
			}
			input.each(function(){
				ChangeName($(this));
			});
			clone.insertAfter(target);
			_this.findElems(trigger,_this.props.section);
		});
	}
	_this.refreshListeners = function(){
		$(".hasDatepicker").removeClass("hasDatepicker");
		$(".datepicker").datepicker("destroy").removeAttr('id');
		setTimeout(function(){
			validateForms();
		}, 10);
		datepick();
		$('.datepicker').datepicker('refresh');
		initCustomSelectList();
	};

	function removeAddedElements(){
		$('.form-block-section').on('click','.js-btn-add-remove',function(){
			var _ = $(this);
			var target = _.parent();
			target.hasClass('js-btn-add-block') ? target.prev().addBack().remove() : target.remove();
			_this.init();
		})
	}removeAddedElements();
	//меняем имя инпута
	function ChangeName(inp){
		var name = inp.attr('name'),
			cutname = name.substring(0, name.indexOf("[")+ 1),
			number = parseInt(name.substring(name.indexOf("[") + 1)),
			newNumber = number++,
			newName= cutname + number + ']';
		inp.attr('name',newName)
	}
}
var AdditionalBlocks = new AddBlocks();
AdditionalBlocks.init();

