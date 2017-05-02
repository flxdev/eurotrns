
$(window).on('load',function(){
	openOnLoad();
});
document.addEventListener("DOMContentLoaded", function() {

	(function(){
		var mainHeader = document.querySelector('.cd-auto-hide-header');

		$(window).on('scroll', function(){
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
			ActivePos($('#slide-line'),'.header-bottom-menu-item.active');
		}
	})();

	function AsideScroll(){
		if($('.js-activescroll-list').length){
		var	scrolling = false;
		var verticalNavigation = $('.js-activescroll-list'),
			navigationItems = verticalNavigation.find('.js-scroll-to'),
			contentSections = $('.js-activescroll-block');
			
			$(window).on('scroll', checkScroll);

			function checkScroll() {
				if( !scrolling ) {
					scrolling = true;
					(!window.requestAnimationFrame) ? setTimeout(updateSections, 300) : window.requestAnimationFrame(updateSections);
				}
			}

			function updateSections() {
				var halfWindowHeight = $(window).height()/3,
					scrollTop = $(window).scrollTop();
				contentSections.each(function(){
					var section = $(this),
						sectionId = section.data('id');
						navigationItem = navigationItems.filter("[data-href='" + sectionId + "']");
					( (section.offset().top - halfWindowHeight < scrollTop ) && ( section.offset().top + section.outerHeight() - halfWindowHeight > scrollTop) )
						? navigationItem.addClass('active')
						: navigationItem.removeClass('active');
				});
				scrolling = false;
			}
		}
	}AsideScroll();
	
	function Menu() {
		var trigger = $('.js-menu'),
			target = $('.header-mobile-menu'),
			header = $('.page__header'),
			body = $('body'),
			OpenClass = 'active',
			OpenClass2 = 'menu-open';
		trigger.add(target).on('click', function(){

			if(!trigger.hasClass('anim')){
				trigger.addClass('anim');
				scrollbody(OpenClass2);
				trigger.add(target).toggleClass(OpenClass);
				body.add(header).toggleClass(OpenClass2);
				setTimeout(function(){
					trigger.removeClass('anim')
				},500);
			}

		})
		$('.header-mobile-menu-outer').click(function(e){
		  e.stopPropagation();
		});
	}
	Menu();

	function MobileDropdown(trigger,parent,target){
		var trg = $(trigger),
			prnt = trg.closest(parent),
			trgt = prnt.find(target);
		trg.each(function(){
			$(this).on('click', function(){

				var item = prnt.find(trgt);
				if(item.hasClass('active')){

					item.add($(this)).removeClass('active');
				}else{
					prnt.siblings().find(trgt).removeClass('active');
					item.add($(this)).addClass('active');
				}
			});
		});
	}
	MobileDropdown('.js-dropdown','.js-dropdown-parent','.js-dropdown-target')

	function scrollbody(classcheck){
		var body = $('body');
		if(!body.hasClass(classcheck)){
			var _h = body.scrollTop();
			if(_h === 0){
				_h = $('html').scrollTop();
			}
			body.css('top',-_h)
		}else{
			var _h = parseInt(body.css('top')),
				_res = Math.abs(_h);
			body.css('top','')
			setTimeout(function(){
				$(window).add(body).scrollTop(_res);
			},10)
		}
	}
	function SlideLine() {

		var $el, leftPos, newWidth,
			$mainNav = $(".header-bottom-menu"),
			trigger = $mainNav.find('li a'),
			active = $mainNav.find('.active');

		$mainNav.parent().append("<div id='slide-line'></div>");
		var $Line = $("#slide-line");

		ActivePos($Line,'.header-bottom-menu-item.active');

		trigger.hover(function() {
			var $el = $(this).find('span');
			var leftPos = $el.position().left;
			var newWidth = $el.width();
			$Line.stop().animate({
				left: leftPos,
				width: newWidth
			});
		}, function() {
			if(active.length != 0){
				$Line.stop().animate({
					left: $Line.data("origLeft"),
					width: $Line.data("origWidth")
				});
			}else{
				$Line.stop().animate({
					width: 0
				});	
			}
		});
		$(window).on('resize', function(){
			setTimeout(function(){
				ActivePos($Line,'.header-bottom-menu-item.active');
			},300);
		});
	}SlideLine();

	function ActivePos(Line,active){
		if(Line.is(':visible') && $(active).length != 0){
			Line.width($(active).find('span').width())
				.css("left", $(active).find('span').position().left)
				.data("origLeft", Line.position().left)
				.data("origWidth", Line.width());
		}
	 }

	$(".js-scroll-to").on('click', function (e) {
		e.preventDefault();
		var elementClick = $(this).data("href");
		var target = $('body').find('[data-id="' + elementClick + '"]');
		$(".aside-stick").trigger("sticky_kit:recalc");
		if(target.length){
			var destination = $(target).offset().top,
				pad = window.matchMedia('(max-width: 991px)').matches ? 70 : 90;
			$("html, body:not(:animated), .out:not(:animated)").animate({scrollTop: destination - pad}, 500);
			setTimeout(function(){
				window.location.hash = elementClick;
			},400)
		}
	});

	// отключаем инпуты, если поездка в одну сторону
	//используется на главной

	function ToggleDisabled(){
		var trigger = $('.js-condition');
		trigger.each(function(){
			var _ = $(this),
				form = _.closest('form'),
				target = form.find('.js-condition-target'),
				targetVal = target.find('input').val(),
				inp = _.find('input');

			_.off('click').on('click',function(){

				inp.prop('checked') == true ? 
					target.removeClass('disabled')
					: target.addClass('disabled');
				targetVal = '';
				//очищаем датапикер если он есть
				$.datepicker._clearDate(target.find('.datepicker'));
			});
		});
	}
	ToggleDisabled();

	aside();
	popUpsInit();
	validateForms();
	initCustomSelectList();
	
	datepick();
	Tabs();
	sortItem();
	listhide();
	CompareHeight();
	questionSlider();
	servicesSlider();
	promoSlider();
	routefeaturesSlider();

	jQuery.fn.toggleText = function() {
		var altText = this.data("alt-text");
		if (altText) {
			this.data("alt-text", this.text());
			this.find('span').text(altText);

		}
	};
	( function( factory ) {
		if ( typeof define === "function" && define.amd ) {

			// AMD. Register as an anonymous module.
			define( [ "../widgets/datepicker" ], factory );
		} else {

			// Browser globals
			factory( jQuery.datepicker );
		}
	}( function( datepicker ) {

	datepicker.regional.ru = {
		closeText: "Закрыть",
		prevText: "&#x3C;Пред",
		nextText: "След&#x3E;",
		currentText: "Сегодня",
		monthNames: [ "Январь","Февраль","Март","Апрель","Май","Июнь",
		"Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь" ],
		monthNamesShort: [ "Янв","Фев","Мар","Апр","Май","Июн",
		"Июл","Авг","Сен","Окт","Ноя","Дек" ],
		dayNames: [ "воскресенье","понедельник","вторник","среда","четверг","пятница","суббота" ],
		dayNamesShort: [ "вск","пнд","втр","срд","чтв","птн","сбт" ],
		dayNamesMin: [ "Вс","Пн","Вт","Ср","Чт","Пт","Сб" ],
		weekHeader: "Нед",
		dateFormat: "dd.mm.yy",
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: "" };
	datepicker.setDefaults( datepicker.regional.ru );

	return datepicker.regional.ru;

	} ) );
//end of document.ready
});
//end of document.ready
var slideArrr = '<button type="button" class="carousel-next"><svg class="icon icon-drop"><use xlink:href="#slider-arrow" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></button>';
var slideArrl = '<button type="button" class="carousel-prev"><svg class="icon icon-drop"><use xlink:href="#slider-arrow" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></button>';

function slidesCount(elem){
	var container = elem.parent().find('.slider-counter'),
		curSlideCont = container.find('.slider-curr'),
		totatSlideCont= container.find('.slider-total'),
		pages;

	elem.on('init reInit breakpoint beforeChange', function (event, slick, currentSlide, nextSlide) {
		var slidesShown = parseInt(slick.slickGetOption('slidesToShow')),
			slidesScroll = parseInt(slick.slickGetOption('slidesToScroll')),
			slidesNext = parseInt(nextSlide),
			totalSlides = parseInt(slick.slideCount),
			totalPages = Math.ceil(totalSlides / slidesShown),
			curPage = event.type == 'init' || event.type == 'reInit' || event.type == 'breakpoint'? 0 : parseInt(slidesNext/slidesScroll);
			totatSlideCont.text(slidesShown == 1 ? totalSlides : totalPages)
			curSlideCont.text(curPage + 1)
	});
}

function listhide(){
	var target = $('.js-slidelist');
	target.each(function(){
		var _ = $(this),
			len = _.data('items'),
			items = _.closest('.tabs-cont').find('.js-slidelist-target').find('li'),
			itemsl = items.length,
			text = 'Свернуть',
			trigger = _;

			items.slice(len).slideUp();
			initclick();

		function initclick(){
			trigger.off('click').on('click', function(e){
				e.preventDefault();
				items.slice(len).fadeToggle(300);
				$(this).toggleText();
			});
		}
	})
}
function CompareHeight(){
	$('.question-item').matchHeight({
		property: 'min-height'
	});
}


var sortItem = function(){
	var trigger = $('.js-select-item');
	trigger.on('click', function(){
		var _ = $(this);
		var textCont = _.find('span');
		var target = _.parent().find('.dropdown-target');
		var item = target.find('.sort-select-item a');

		_.toggleClass('active');

		item.on('click',function(e){

			var _ = $(this),
				altLext = _.data('text');

			textCont.text(altLext);

			_.parent().addClass('active').siblings().removeClass('active');
			e.preventDefault();
			setTimeout(function(){

				target.removeClass('active');
				trigger.removeClass('active');

			},300);
		});

	$(document).on('mouseup', function (e){
		if (!trigger.is(e.target)
			&& trigger.has(e.target).length === 0) {
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
	$.each(_items, function () {
		var _select = $(this),
			_button = _select.find('button'),
			placeholder = _button.data('placeholder'),
			_list = _select.find('.select-list');
		_select.on('reinit', function() {
			var _active = _list.find('input:checked');
			if($(this).hasClass('depends-on')){
				var item = $(this).closest('.input-item');
				if(_active.length){
					var next = item.nextAll('.input-item').find('.depends-on');
					next.removeClass('disabled').find('input').prop('checked', false);
					next.trigger('reinit');
				}else{
					var next = item.nextAll('.input-item').find('.depends-on');
					next.addClass('disabled').find('input').prop('checked', false);
					next.trigger('reinit');
				}
			}
			if(_active.length) {
				if($(this).hasClass('price-total')){
					console.log(4,_active.siblings('.elem-price').html())
					_button.children('.btn-text').addClass('active').html(_active.siblings('.elem-price').html()).parent().addClass('is-checked')
				}else{
					_button.children('.btn-text').addClass('active').text(''+_active.siblings('span').text() +'').parent().addClass('is-checked')
				}
			}
			else {
				_button.children('.btn-text').removeClass('active').text(_button.data('placeholder')).parent().removeClass('is-checked');
			}
			CheckForSelect($(this).parents('form'));
		});
		_button.on('click', function() {
		   _button.parent().toggleClass('active').siblings().removeClass('active');
			return(false);
		});
		_select.on('click', 'label', function() {
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
function aside(){
	function stickinit(){
		setTimeout(function(){
			$(".aside-stick").stick_in_parent({
				parent: ".aside-menu",
				offset_top : 73,
				// recalc_every: 1
			});
		},1)
	}stickinit();

	$(window).on('resize', function(){
		if(window.matchMedia("(max-width: 735px)").matches){
			$(".aside-stick").trigger("sticky_kit:detach");
		}else{
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

function datepick(){

	var item = $( ".datepicker" );
	item.each(function(){
		var _ = $(this),
			dateToday = new Date(); 
		$.datepicker.setDefaults( $.datepicker.regional[ "ru" ] );
		_.datepicker({
			changeMonth: false,
			changeYear: false,
			dayNamesMin: ["Вс" , "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
			monthNamesShort: [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ],
			dateFormat: 'dd.mm.yy',
			firstDay: 1,
			yearRange: '-0:+1',
			minDate: dateToday,
			showOn: "focus",
		});
		_.datepicker('refresh');
	});
}
function promoSlider(){
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

function questionSlider(){
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
			responsive: [
				{
					breakpoint: 950,
					settings: {
						slidesToShow: 4,
						autoplay: true,
						autoplaySpeed: 5000,
						slidesToScroll: 2,
					}
				},
				{
					breakpoint: 700,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
					}
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						centerMode: true,
					}
				},
			]
		});
	});
}
function routefeaturesSlider(){
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
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 5,
						autoplay: true,
						autoplaySpeed: 5000,
						slidesToScroll: 2,
					}
				},
				{
					breakpoint: 870,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
					}
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
					}
				},
			]
		});
	});
}

function servicesSlider(){
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
			responsive: [
				{
					breakpoint: 950,
					settings: {
						slidesToShow: 2,
						autoplay: true,
						autoplaySpeed: 5000,
					}
				},
				{
					breakpoint: 700,
					settings: {
						slidesToShow: 1,
					}
				},
			]
		});
	});
}
function mapMarkerinit(elem){
	var cords = $("#"+elem).closest('.tabs-cont').find('li').first().data('cords');
	var imgsrc = $("#"+elem).data('imagesrc');
	var myMap;
	ymaps.ready(init);



	function init () {

		myMap = new ymaps.Map(elem, {
			center: cords,
			zoom: 14,
			controls: ['zoomControl', 'fullscreenControl']
		}, {

		}),
			gCollection = new ymaps.GeoObjectCollection(null, {
			}),
			myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
			}, {
				iconLayout: 'default#image',
				iconImageHref: imgsrc,
			// Размеры метки.
				iconImageSize:[40, 50],
				iconImageOffset: [-20, -50]
			});
		myMap.geoObjects.add(myPlacemark);
		myMap.behaviors.disable(['rightMouseButtonMagnifier','ruler','scrollZoom']);
		myMap.controls.remove('typeSelector');
		myMap.controls.remove('searchControl');
		myMap.controls.remove('GeolocationControl');
		myMap.container.fitToViewport();
		$("#"+elem).on('resize',function(){
			setTimeout(function(){
				myMap.container.fitToViewport();
			},300)
		})

		//создаем геообьект из полученных координат
		
		var pos = getCoords(elem);
		var arrl = pos.length;
		for(var i = 0; i < arrl; i++){
			 gCollection.add(new ymaps.Placemark(pos[i]));
		}
		gCollection.options.set({
			iconLayout: 'default#image',
			iconImageHref: imgsrc,
			// Размеры метки.
			iconImageSize:[24, 35],
			iconImageOffset: [-12, -35]
		});
		Inintclick(elem);

	}

	function Inintclick(elem){
		var trigger = $("#"+elem).closest('.tabs-cont').find('.js-marker-add');
		trigger.on('click', function(){
			if(!$(this).hasClass('active')){
				$(this).addClass('active');
				 myMap.geoObjects.add(gCollection);
				 // myMap.setZoom(12)
				 myMap.setBounds(myMap.geoObjects.getBounds());
			}else{
				$(this).removeClass('active');
				myMap.geoObjects.remove(gCollection);
				myMap.setBounds(myMap.geoObjects.getBounds());
				myMap.setZoom(14)
			}
		});	
	}
	//собираем координаты и помещаем и в массив, первый элемент вырезаем, т.к. он уже будет на карте
	function getCoords(elem){
		
		var pos =[];
		var items = $("#"+elem).closest('.tabs-cont').find('li');
		var cords = items.each(function(){
			var elpos= $(this).data('cords');
			pos.push(elpos)
		});
		pos.splice(0,1);
		return pos
	}
}


function mapinit(elem){
	var cords = $("#"+elem).data('cords');
	var myMap;
	ymaps.ready(init);

	function init () {

		myMap = new ymaps.Map(elem, {
			center: cords,
			zoom: 14,
			controls: ['zoomControl', 'fullscreenControl']
		}, {

		}),
			myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
			}, {
				iconLayout: 'default#image',
				iconImageHref: 'images/myIcon.gif',
				iconImageHref: '/local/templates/main/img/map.svg',
			// Размеры метки.
				iconImageSize:[30, 44],
				iconImageOffset: [-15, -44]
			});
		myMap.geoObjects.add(myPlacemark);
		myMap.behaviors.disable(['rightMouseButtonMagnifier','ruler','scrollZoom']);
		myMap.controls.remove('typeSelector');
		myMap.controls.remove('searchControl');
		myMap.controls.remove('GeolocationControl');
	}
}
function validateForms(){
	var form_form = $('.js-validate');
	if (form_form.length) {
		form_form.each(function () {
			var form_this = $(this);
			var parent = form_this.parent();
			$.validate({
				form : form_this,
				modules : 'logic',
				borderColorOnError : true,
				scrollToTopOnError : false,
				onSuccess : function($form) {
					formResponse(form_this);
				},
				onValidate : function($form) {
					CheckForSelect(form_this);
				}
			});
		});
	}
}
function CheckForSelect(form){
	if(form.find('.select-check').length){
		var wrap = form.find('.select-check');

		wrap.each(function(){
			var _ = $(this),
				btn = _.find('.selects'),
				option = _.find('.option.has-error');
			if(option.length){
				_.addClass('error');

			}else{
				_.removeClass('error');
			}
		});
		wrap.hasClass('error') ? false : true
	}
}


function popUpsInit() {
	var _this = this;
	_this.b = {open: $('.js-popup-button')};
	_this.c = {
		popup: $('.js-popup-container'),
		body: $('body')
	};
	_this.f = {};
	_this.conf = {
		body_class: 'modal_open',
		active_class: 'active',
		close_selector: '.closePopup',
		initial_class: 'popup-initialed'
	};
	_this.f.initModalActions = function (_popup) {
		/**
		 * Close buttons.
		 */
		$(_popup).on('click','.modal-container-content,.modal-container-header',function(e) {
			if(!_this.conf.close_selector.is(e.target)){
				e.stopPropagation();
			}
		});
		_popup.find(_this.conf.close_selector).add(_popup).off('click.popup').on('click.popup', function () {
			_this.f.closePopup(_popup);
		});
	};
	_this.f.closePopup = function (_popup) {
		var _h = parseInt(_this.c.body.css('top')),
			_res = Math.abs(_h),
			_cont = _popup.find('.modal-container:not(.response)')
			_response = _popup.find('.response');


		_popup.removeClass(_this.conf.active_class);
		_this.c.body.removeClass(_this.conf.body_class).removeAttr('style');
		$(window).scrollTop(_res);
		setTimeout(function(){
			_cont.removeAttr('style');
			_response.css('display','none');
		},500)
	};
	_this.f.openPopup = function (_popup) {
		var _h = _this.c.body.scrollTop();
		if(_h === 0){
			_h = $('html').scrollTop();
		}
		setTimeout(function(){
			console.log(_h,'timeout')
			_popup.addClass(_this.conf.active_class);
			_this.c.body.addClass(_this.conf.body_class).css('top',-_h);			
		},10)

	};
	/**
	 * Initial.
	 */
	$.each(_this.c.popup.not('.' + _this.conf.initial_class), function () {
		var _popup = $(this);
		_this.f.initModalActions(_popup);
		_popup.off('reinit').on('reinit', function() {
			_this.f.initModalActions(_popup);
		});
		_popup.addClass(_this.conf.initial_class);
	});
	_this.b.open.off('click.popup').on('click.popup', function (e) {
		e.preventDefault();
		var _b = $(this),
			_popup = _this.c.popup.filter('[data-modal="' + _b.data('modal') + '"]');
		_this.f.openPopup(_popup);
		return false;
	});
}

function openOnLoad(){
	var scrollItem = window.location.hash,
		target = $("[data-id='" + scrollItem + "']");
	window.scrollTo(0, 0);
	if(target.length){
		setTimeout(function() {
			var destination = target.offset().top;
			console.log(destination)
			$("html,body:not(:animated)").animate({scrollTop: destination - 60}, 500);
		}, 100);
	}
}

function formResponse(form){
	if(form.closest('.modal-container').length){
		var cont = form.closest('.modal-container'),
			resp = cont.next('.response');
		if(resp.length){
			cont.fadeOut("slow",function(){
				resp.fadeIn("slow");
			});
		}
	}
}
function Tabs(){
	if($('.js-tabs-wrap').length){
		
		var parent = $('.js-tabs-wrap');
			parent.each(function(){
				var _ = $(this),
					trigger = _.find('.js-tab-trigger'),
					tabbody = _.find('.tabs-body'),
					tabcont = tabbody.find('.tabs-cont'),
					triggerCur = _.find(trigger).filter('.active'),
					triggerIndex = triggerCur.index();

			if(!triggerCur.length){
				tabcont.not(':first').hide();
				trigger.first().addClass('active');
			}else{
				tabcont.hide().eq(triggerIndex).show();
			}

			trigger.on('click',function(e){
				var _ = $(this);
				e.preventDefault();
				if(!_.hasClass('active')){
					_.addClass('active').siblings().removeClass('active');
					var triggerA = parent.find(trigger).filter('.active');
					tabcont.hide().eq($(triggerA).index()).fadeIn().find('.map-elem').trigger('resize');				
				}
			});
		});
	}
}