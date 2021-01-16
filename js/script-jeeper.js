var topSwiper = new Swiper('.image-slider', {
	// Navigation arrows
	loop:true,
	autoplay: true,
	speed: 900,
	navigation: {
		nextEl: '.image-slider__next',
		prevEl: '.image-slider__prev',
	},
	lazy:{
		loadPrevNext: true,
	},
})

var newsSwiper = new Swiper('.news__slider', {
	// Navigation arrows
	loop:true,
	autoplay: false,
	speed: 900,
	navigation: {
		nextEl: '.news__control-next',
		prevEl: '.news__control-prev',
	},
	lazy:{
		loadPrevNext: true,
		loadPrevNextAmount:1,
	},
	slidesPerView: 4,
	spaceBetween: 30,
})

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


ymaps.ready(init);
	function init() {
	// Создание карты.
	// https://tech.yandex.ru/maps/doc/jsapi/2.1/dg/concepts/map-docpage/
	var myMap = new ymaps.Map("map", {
	// Координаты центра карты.
	// Порядок по умолчнию: «широта, долгота».
	center: [55.723, 37.603],
	// Уровень масштабирования. Допустимые значения:
	// от 0 (весь мир) до 19.
	zoom: 16,
	// Элементы управления
	// https://tech.yandex.ru/maps/doc/jsapi/2.1/dg/concepts/controls/standard-docpage/
	controls: [
	'zoomControl', // Ползунок масштаба
	'fullscreenControl', // Полноэкранный режим
	]
	});
	myMap.behaviors.disable('scrollZoom');
	// Добавление метки
	// https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Placemark-docpage/
	var myPlacemark = new ymaps.Placemark([55.723207, 37.603945], {
	},{
		iconImageHref: 'img/jeeper/mark.png',
		iconImageSize: [30, 42],
		iconImageOffset: [-5, -38]
	});
	// После того как метка была создана, добавляем её на карту.
	myMap.geoObjects.add(myPlacemark);
	}


$(document).ready(function () {
		$('.search').click(function () {
				$('.search__bar').addClass('active');
				$('.searchbox').fadeIn();
				$('#search-img').hide();
				$('.address').addClass('hidden');
				
		});
})