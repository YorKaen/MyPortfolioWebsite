var topSwiper = new Swiper('.about-swiper', {
	// Navigation arrows
	slidesPerView: 3,
	slidesPerColumn: 2,
	spaceBetween: 30,
	//loop: true,
	navigation: {
		nextEl: '.about-swiper__next',
		prevEl: '.about-swiper__prev',
		disabledClass: '.about-swiper__disabled',
		//lockClass: '.about-swiper__disabled',
	},
	lazy:{
		loadPrevNext: true,
	},
});

var dipSwiper = new Swiper('.diploma-slider', {
	// Navigation arrows
	slidesPerView: 4,
	spaceBetween: 45,
	loop: true,
	speed: 600,
	autoplay: true,
	navigation: {
		nextEl: '.diploma-slider__next',
		prevEl: '.diploma-slider__prev',
	},
	lazy:{
		loadPrevNext: true,
	},
});
//////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
const labels = document.querySelectorAll(".accordion-item__label");
const tabs = document.querySelectorAll(".accordion-tab");

function toggleShow() {
	const target = this;
	const item = target.classList.contains("accordion-tab")
		? target
		: target.parentElement;
	const group = item.dataset.actabGroup;
	const id = item.dataset.actabId;
	tabs.forEach(function(tab) {
		if (tab.dataset.actabGroup === group) {
			if (tab.dataset.actabId === id) {
				tab.classList.add("accordion-active");
			} else {
				tab.classList.remove("accordion-active");
			}
		}
	});
	labels.forEach(function(label) {
		const tabItem = label.parentElement;
		if (tabItem.dataset.actabGroup === group) {
			if (tabItem.dataset.actabId === id) {
				tabItem.classList.add("accordion-active");
			} else {
				tabItem.classList.remove("accordion-active");
			}
		}
	});
}
labels.forEach(function(label) {
	label.addEventListener("click", toggleShow);
});
tabs.forEach(function(tab) {
	tab.addEventListener("click", toggleShow);
});

//////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
	//----------Select the first tab and div by default
	$('#vertical_tab_nav > ul > li > a').eq(0).addClass("selected");
	$('#vertical_tab_nav > div > article').eq(0).css('display', 'block');
	//---------- This assigns an onclick event to each tab link("a" tag) and passes a parameter to the showHideTab() function

	$('#vertical_tab_nav > ul').click(function(e) {
		if ($(e.target).is("a")) {
			/*Handle Tab Nav*/
			$('#vertical_tab_nav > ul > li > a').removeClass("selected");
			$(e.target).addClass("selected");
			/*Handles Tab Content*/
			var clicked_index = $("a", this).index(e.target);
			$('#vertical_tab_nav > div > article').css('display', 'none');
			$('#vertical_tab_nav > div > article').eq(clicked_index).fadeIn();
		}
		$(this).blur();
		return false;
	});


}); //end ready
	
/* if in drawer mode */
$(".tab_drawer_heading").click(function() {

	$("article").hide();
	var d_activeTab = $(this).attr("rel"); 
	$("#"+d_activeTab).fadeIn();

	$(".tab_drawer_heading").removeClass("d_active");
	$(this).addClass("d_active");

	$("ul.tabs li a").removeClass("selected");
	$("ul.tabs li a[rel^='"+d_activeTab+"']").addClass("selected");
});

//////////////////////////////////////////////////////////////////////////
var accordions = document.querySelectorAll("button.accordion-1");

for (var i = 0; i < accordions.length; i++) {
	accordions[i].onclick = function() {
		this.classList.toggle("active");
		this.nextElementSibling.classList.toggle("show");
		hideAll(this);
	};
}

function hideAll(exceptThis) {
	for (var i = 0; i < accordions.length; i++) {
		if (accordions[i] !== exceptThis) {
			accordions[i].classList.remove("active");
			accordions[i].nextElementSibling.classList.remove("show");
		}
	}
}

$(function() {
	// call the tablesorter plugin
	$("table").tablesorter({
		theme: 'blue'
	});
	if ( $('.focus-highlight').length ) {
		$('.focus-highlight').find('td, th')
			.attr('tabindex', '1')
			.on('touchstart', function() {
				$(this).focus();
			});
	}
});

///////////////////////////////

ymaps.ready(init);
	function init() {
	// Создание карты.
	// https://tech.yandex.ru/maps/doc/jsapi/2.1/dg/concepts/map-docpage/
	var myMap = new ymaps.Map("map", {
	// Координаты центра карты.
	// Порядок по умолчнию: «широта, долгота».
	center: [55.765979, 37.623393],
	// Уровень масштабирования. Допустимые значения:
	// от 0 (весь мир) до 19.
	zoom: 15,
	// Элементы управления
	// https://tech.yandex.ru/maps/doc/jsapi/2.1/dg/concepts/controls/standard-docpage/
	controls: [
	//'zoomControl', // Ползунок масштаба
	//'rulerControl', // Линейка
	//'routeButtonControl', // Панель маршрутизации
	//'trafficControl', // Пробки
	//'typeSelector', // Переключатель слоев карты
	//'fullscreenControl', // Полноэкранный режим
	// Поисковая строка
	]
	});
	myMap.behaviors.disable('scrollZoom');
	// Добавление метки
	// https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Placemark-docpage/
	var myPlacemark = new ymaps.Placemark([55.765979, 37.623393], {
	// Хинт показывается при наведении мышкой на иконку метки.
	hintContent: 'Содержимое всплывающей подсказки',
	// Балун откроется при клике по метке.
	balloonContent: 'Содержимое балуна'
	});
	// После того как метка была создана, добавляем её на карту.
	myMap.geoObjects.add(myPlacemark);
	}