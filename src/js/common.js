document.addEventListener("DOMContentLoaded", function() {
	(function(){
		var mainHeader = document.querySelector('.cd-auto-hide-header'),
			headerHeight = mainHeader.offsetHeight;

		var scrolling = false,
			previousTop = 0,
			currentTop = 0,
			scrollDelta = 5,
			scrollOffset = 100;

		$(window).on('scroll', function(){
			if( !scrolling ) {
				scrolling = true;
				(!window.requestAnimationFrame)
					? setTimeout(autoHideHeader, 250)
					: requestAnimationFrame(autoHideHeader);
			}
		});


		function autoHideHeader() {
			var currentTop = $(document).scrollTop();
			checkSimpleNavigation(currentTop);
			previousTop = currentTop;
			scrolling = false;
		}

		function checkSimpleNavigation(currentTop) {
			if (currentTop <= 20) {
				mainHeader.classList.remove('is-hidden');
				ActivePos($('#slide-line'),'.header-bottom-menu-item.active');
			} else {
				mainHeader.classList.add('is-hidden');
				ActivePos($('#slide-line'),'.header-bottom-menu-item.active');
			}
		}
	})();
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
	}Menu();
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
				console.log(_res)
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

		$mainNav.append("<div id='slide-line'></div>");
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
			$Line.stop().animate({
			  left: $Line.data("origLeft"),
			  width: $Line.data("origWidth")
			});
		});
		$(window).on('resize', function(){
			setTimeout(function(){
				ActivePos($Line,'.header-bottom-menu-item.active');
			},300);
		});
	}SlideLine();
	function ActivePos(Line,active){
		if(Line.is(':visible')){
			Line.width($(active).find('span').width())
				.css("left", $(active).find('span').position().left)
				.data("origLeft", Line.position().left)
				.data("origWidth", Line.width());
		}
	 }

	$(".js-scroll-to").on('click', function (e) {
		e.preventDefault();
		e.stopPropagation();
		var elementClick = $(this).attr("href");
		$(".aside-stick").trigger("sticky_kit:recalc");
		if($(elementClick)){
			var destination = $(elementClick).offset().top,
				pad = window.matchMedia('(max-width: 991px)').matches ? 70 : 90;
			$("html, body:not(:animated), .out:not(:animated)").animate({scrollTop: destination - pad}, 500);
			setTimeout(function(){
				window.location.hash= elementClick;
			},400)
		}else{
			e.preventDefault();
		}
	});
	jQuery.fn.toggleText = function() {
		var altText = this.data("alt-text");

		if (altText) {
			this.data("alt-text", this.text());
			this.find('.link-black').text(altText);

		}
	};
	function Accordeon(){
		if($('.offerlist-section').length){
			// $(".aside-stick").trigger("sticky_kit:detach");
			$(".aside-stick").stick_in_parent({
				offset_top : 73,
				recalc_every: 1
			});
			var maintrigger = $('.js-accordion-trigger'),
				body = $('.js-accordion-body'),
				truetrigger = maintrigger.children('.table-item').not('.table-status').not('.table-btn');
			maintrigger.not('.active').find(body).hide();
			truetrigger.on('click',function(event){
				var parent = $(this).parent(),
					target = parent.find(body);

				if(parent.hasClass('active')){
					parent.siblings().removeClass('active').find(body).slideUp(200);
					parent.removeClass('active').find(body).slideUp(300);

				}else{
					parent.siblings().removeClass('active').find(body).slideUp(200);
					parent.addClass('active').find(body).slideDown(300, function(){
						var pos = parent.offset().top;
						jQuery("body:not(:animated)").animate({scrollTop: pos -80}, 500);
					});
				}
				setTimeout(function(){
					$('body').trigger('scroll')
				},801)
			});
		}
	}Accordeon();


	aside();
	popUpsInit();
	validateForms();
	masktel();
	initCustomSelectList();
	comenthide();
	promoSlider();
	datepick();
//end of document.ready
});
//end of document.ready
function comenthide(){
	var target = $('.js-coment');
	target.each(function(){
		var _ = $(this),
			len = _.height(),
			item = _.find('.feedback-item-content-inner').height(),
			trigger = _.parent().find('.js-list-more');
		$(window).on('resize', function(){
			setTimeout(function(){
				item = _.find('.feedback-item-content-inner').height();
				Checkh();
			},600)
		});
		function Checkh(){
			if(len >= item){
				trigger.css('display', 'none');
			}else{
				trigger.removeAttr('style');
				initclick();
			}
		}Checkh();
		function initclick(){
			trigger.off('click').on('click', function(e){
				console.log(item);
				if(_.attr('style')){
					// len.removeAtttr('style');
					_.css('max-height', '');
					$(this).toggleText();
				}else{
					_.css('max-height', item);
					$(this).toggleText();
				}

				// $(".aside-stick").trigger("sticky_kit:recalc");
			});
		}
	})
}
function listhide(){
	var target = $('.js-slidelist');
	target.each(function(){
		var _ = $(this),
			len = _.data('items'),
			items = _.find('li'),
			itemsl = items.length,
			text = 'Свернуть'
		trigger = _.parent().find('.js-list-more');

		if(len >= itemsl){
			trigger.css('display', 'none');
		}else{
			items.slice(len).slideUp();
			initclick();
		}
		function initclick(){
			trigger.off('click').on('click', function(e){
				e.preventDefault();
				items.slice(len).fadeToggle(300);
				$(this).toggleText();
				$(".aside-stick").trigger("sticky_kit:recalc");
			});
		}
	})
}
function masktel(){
	var nodes = document.querySelectorAll("input[type=tel]");
	var im = new Inputmask("+7 (999) 999 99 99",{ showMaskOnHover: false});
	im.mask(nodes);
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
				_button.children('.btn-text').addClass('active').text(''+_active.siblings('span').text()+'').parent().addClass('is-checked')
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
				recalc_every: 1
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
		_.datepicker({
			changeMonth: true,
			changeYear: false,
			dayNamesMin: ["Вс" , "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
			monthNamesShort: [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ],
			dateFormat: 'dd.mm.yy',
			firstDay: 1,
			yearRange: '-0:+1',
			minDate: dateToday,
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
	})
	$(window).resize(function() {
	  item.datepicker('hide');
	  $('.datepicker').blur();
	});
}
function promoSlider(){
	$(".js-promoslider").each(function() {
		var _this = $(this);
		var parent = _this.closest('.promo-slider');
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

function rombSlider(){
	$(".romb-slider-main").each(function() {
		var _this = $(this);
		var parent = _this.closest('.romb-slider-wrap');
		_this.slick({
			accessibility: true,
			arrows: true,
			draggable: false,
			autoplay: true,
			dots: false,
			touchMove: false,
			infinite: false,
			appendArrows: parent.find('.nav-arrows'),
			slidesToShow: 3,
			slidesToScroll: 1,
			autoplaySpeed: 8000,
			nextArrow:'<button type="button" class="carousel-next"><svg class="icon icon-drop"><use xlink:href="#arr-circle" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></button>',
			prevArrow:'<button type="button" class="carousel-prev"><svg class="icon icon-drop"><use xlink:href="#arr-circle" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></button>',
			responsive: [
				{
					breakpoint: 906,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2
					}
				},
				{
					breakpoint: 630,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				},
			]
		});
	});
}
function diplomSlider(){
	$(".diplom-slider-inner").each(function() {
		var _this = $(this);
		_this.slick({
			accessibility: true,
			arrows: true,
			draggable: false,
			autoplay: false,
			dots: false,
			fade: false,
			touchMove: false,
			infinite: false,
			slidesToShow: 1,
			slidesToScroll: 1,
		});
	});
}
function contentSlider(){
	$(".content-slider-slider").each(function() {
		var _this = $(this);
		var parent = _this.closest('.content-slider-wrap');
		_this.on('init reinit afterChange', function(event, slick, currentSlide, nextSlide){

		  	var active = _this.find('.slick-current');
		  	var compareEl = active.find(".comparator-frame");
		  	if(compareEl.length){
		  		
		  	}
		});
		_this.slick({
			accessibility: true,
			arrows: true,
			draggable: false,
			autoplay: false,
			dots: true,
			fade: false,
			touchMove: false,
			infinite: false,
			appendArrows: parent.find('.nav-arrows'),
			appendDots: parent.find('.nav-dots'),
			slidesToShow: 1,
			slidesToScroll: 1,
			nextArrow:'<button type="button" class="carousel-next"><svg class="icon icon-drop"><use xlink:href="#arr-circle" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></button>',
			prevArrow:'<button type="button" class="carousel-prev"><svg class="icon icon-drop"><use xlink:href="#arr-circle" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></button>',
		});
		if(_this.find('.compare-item_container').length){
			_this.slick('slickSetOption', 'swipe', false,false);
		}
	});

}
CompareImages.prototype = {
	init: function(){
		var self = this;

		this.timer;

		this.itemFrame = this.el.find(".comparator-frame");
		
		this.setSizeImage();
		this.setEventListener();
		this.setDivide();

		$(this.itemFrame).addClass("initialize");


		$(this.itemFrame).each(function(){

			$(this).on("mouseenter touchstart", function(e){
				clearTimeout(self.timer);
				console.log("touch")
			});

			$(this).on("mousemove touchmove", function(e){
				self.moveDivede(e, $(this));
			});

			$(this).on("mouseleave touchend touchcancel", function(e){
				self.resetDevide();
			});
		})
	},
	setEventListener: function() {
		var self = this;

		$(window).on("resize", function(){
			self.setSizeImage();
			self.setDivide();
		});

	},
	setSizeImage: function() {
		$(this.itemFrame).each(function(){
			var wEl = $(this).width();

			$(this).find(".to img").css("width", wEl);
		});
	},
	setDivide: function() {
		$(this.itemFrame).each(function(){
			var wEl = $(this).width();

			$(this).find(".to").css("width", (wEl / 2));
			$(this).find(".compare-runner").css("left", (wEl / 2));
		});
	},
	moveDivede: function(e, element){
		var self = this;
		var wEl = element.width();
		var mouseX = Math.round(this.getRalativeMouseX(e, element));
		var divider = element.parents(".comparator").find(".comparator-frame");
		if(mouseX <= 20) {
			divider.find(".to").css("width", 20);
			divider.find(".compare-runner").css("left", 20);
		} else if(mouseX >= (wEl -20)){
			divider.find(".to").css("width",wEl -20);
			divider.find(".compare-runner").css("left",wEl -20);
		}
		else {
			divider.find(".to").css("width", mouseX);
			divider.find(".compare-runner").css("left", mouseX);
		}

	},
	getRalativeMouseX: function(e, element) {
		if(e.type == "touchmove") {
			var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];

			var pos = (touch.clientX - $(e.target).offset().left);
		} else {
			var pos = e.offsetX
		}

		var summury = Math.min(pos, element.width());

		return summury;

		// var touch;
		// // if(e.type == "touchmove") {
		//     touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
		// // }

		// console.log(touch.clientX)

		// return Math.min(e.offsetX, element.width());
	},
	resetDevide: function(){
		var self = this;

		this.timer = setTimeout(function(){
			var that = self;
			self.el.find(".to").animate({
				"width": ($(that.itemFrame).width() / 2)
			}, 350)
			self.el.find(".compare-runner").animate({
				"left": ($(that.itemFrame).width() / 2)
			}, 350)
		}, this.props.reset_delay);        
	}
}
function CompareImages(el){
	this.el = el;

	this.props = {
		frame: ".comparator-frame",
		reset_delay: 1500,
		isAnimate: false
	}

	this.init();
}


function partnerSlider(){
	$(".partner-slider-inner").each(function() {
		var _this = $(this);
		_this.slick({
			accessibility: true,
			arrows: true,
			draggable: false,
			dots: false,
			touchMove: true,
			autoplay: true,
			autoplaySpeed: 5000,
			infinite: false,
			appendArrows: _this.parent().find('.nav-arrows'),
			slidesToShow: 6,
			slidesToScroll: 1,
			nextArrow:'<button type="button" class="carousel-next"><svg class="icon icon-drop"><use xlink:href="#arr-circle" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></button>',
			prevArrow:'<button type="button" class="carousel-prev"><svg class="icon icon-drop"><use xlink:href="#arr-circle" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></button>',
			responsive: [
				{
					breakpoint: 1210,
					settings: {
						slidesToShow: 5,
					}
				},
				{
					breakpoint: 991,
					settings: {
						slidesToShow: 4,
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 3,
					}
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 2,
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
					}
				},
			]
		});
	});
}
function moreSlider(){
	$(".more-content-slider").each(function() {
		var _this = $(this),
			parent = _this.parents('.more-content-wrapper'),
			arrs = parent.find('.nav-arrows'),
			count = parent.hasClass('gray') ? 2 : 3;
		_this.slick({
			accessibility: true,
			arrows: true,
			draggable: false,
			dots: false,
			touchMove: true,
			infinite: false,
			autoplay: true,
			autoplaySpeed: 4500,
			appendArrows: arrs,
			slidesToShow: count,
			slidesToScroll: 1,
			nextArrow:'<button type="button" class="carousel-next"><svg class="icon icon-drop"><use xlink:href="#arr-circle" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></button>',
			prevArrow:'<button type="button" class="carousel-prev"><svg class="icon icon-drop"><use xlink:href="#arr-circle" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></button>',
			responsive: [
				{
					breakpoint: 991,
					settings: {
						slidesToShow: 2,
					}
				},
				{
					breakpoint: 735,
					settings: {
						slidesToShow: 1,
					}
				},
			]
		});
	});
}
function roadSlider(){
	$(".road-slider-slider").each(function() {
		var _this = $(this),
			parent = _this.closest('.road-slider-wrap');
		_this.slick({
			accessibility: true,
			arrows: true,
			draggable: true,
			dots: false,
			touchMove: true,
			infinite: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			focusOnSelect: true,
			appendArrows: parent.find('.nav-arrows'),
			nextArrow:'<button type="button" class="carousel-next"><svg class="icon icon-drop"><use xlink:href="#arr-circle" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></button>',
			prevArrow:'<button type="button" class="carousel-prev"><svg class="icon icon-drop"><use xlink:href="#arr-circle" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></button>',
			asNavFor: parent.find(".content-slider-add")
		});
	});
	$(".content-slider-add").each(function() {
		var _this = $(this),
			parent = _this.closest('.road-slider-wrap');
		_this.slick({
			accessibility: true,
			arrows: false,
			draggable: true,
			dots: false,
			touchMove: true,
			infinite: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			focusOnSelect: true,
			asNavFor: parent.find(".road-slider-slider")
		});
	});
}
function productSlider(){
	$(".product-container-slider-main").each(function() {
		var _this = $(this),
			parent = _this.closest('.product-container-slider');
		_this.slick({
			accessibility: true,
			arrows: false,
			draggable: true,
			dots: false,
			touchMove: true,
			infinite: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			focusOnSelect: true,
			asNavFor: parent.find(".product-container-slider-add")
		});
	});
	$(".product-container-slider-add").each(function() {
		var _this = $(this),
			parent = _this.closest('.product-container-slider');
		_this.slick({
			accessibility: true,
			arrows: false,
			draggable: true,
			dots: false,
			touchMove: true,
			infinite: false,
			slidesToShow: 4,
			slidesToScroll: 1,
			focusOnSelect: true,
			asNavFor: parent.find(".product-container-slider-main")
		});
	});
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
				modules : 'security',
				borderColorOnError : true,
				scrollToTopOnError : false,
				onSuccess : function($form) {
					formResponse(form_this);
				},
				onValidate : function($form) {
					CheckForSelect(form_this);
					checkStars(form_this);

				},
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
function checkStars(form){
	if(form.find('.star-item').length){
		var stars = $('.js-stars');
		if(stars.hasClass('has-success')){
			return true
		}else{
			stars.addClass('has-error');
			return false
		}
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

function AjaxLoading(el){
	var _this = this;

	_this.ajaxLink = el;
	_this.appendMain = $("#modal-road");


	_this.initEvents = function(){

		$(".ajax-trigger").off("click.trigger").on("click.trigger", function(e){
			var link = $(this).attr("href");
			_this.action(link)
			e.preventDefault();
			return false;
		});
	};

	_this.action = function(link) {
		$.ajax({
			url: link,
			dataType: "html",
			success: function(content) {
				var mainContent = $(content).html();
				_this.appendMain.html(mainContent).promise().done(function(){
					_this.initEvents();
					roadSlider();
					popUpsInit();
				});
			}
		})
	};
	_this.initEvents();
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
