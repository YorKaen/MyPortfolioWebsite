var canShowIntro = true;
//var canScroll = true;
var canScroll = false;

var vh = $( window ).height() + 200;

window.onbeforeunload = function () {
	window.scrollTo(0, 0);
}

document.addEventListener('DOMContentLoaded', () => {
		allowedToScroll();
		function animateSgv (id, delay, delayIncrement){
				const logo = document.getElementById(id);
				const logoPaths = document.querySelectorAll(`#${id} path`);
				delay = delay;
				for(let i = 0; i < logoPaths.length;i++){
						//console.log(logoPaths[i].getTotalLength());
						logoPaths[i].style.strokeDasharray  = logoPaths[i].getTotalLength();
						logoPaths[i].style.strokeDashoffset = logoPaths[i].getTotalLength();
						logoPaths[i].style.animation = `line-anim 2s ease forwards ${delay}s`;
						delay+=delayIncrement;
						//console.log(delay)
				}
				
				logo.style.animation = `fill 2s ease forwards ${delay}s`;
				//logo.style.animation = `glow 4s ease forwards 8s`;
		}
		function animateSgvSlowly (id, delay, delayIncrement){
				const logo = document.getElementById(id);
				const logoPaths = document.querySelectorAll(`#${id} path`);
				delay = delay;
				for(let i = 0; i < logoPaths.length;i++){
						//console.log(logoPaths[i].getTotalLength());
						logoPaths[i].style.strokeDasharray  = logoPaths[i].getTotalLength();
						logoPaths[i].style.strokeDashoffset = logoPaths[i].getTotalLength();
						logoPaths[i].style.animation = `line-anim 4s ease forwards ${delay}s`;
						delay+=delayIncrement;
						//console.log(delay)
				}
				//logo.style.animation = `fade 4s ease forwards ${delay}s`;
				logo.style.animation = `glow 5s ease forwards ${delay}s`;
				
		}
		animateSgvSlowly('logo-shape', 0, 0.5)
		animateSgv('logo-purple', 1, 0.4)
		animateSgv('logo-sphynx', 3, 0.4)
		intro()
		//$('#logo-shape').delay(5000).fadeOut(2500);
		//$('#logo-purple').delay(8000).fadeOut(1500); 
		//$('#logo-sphynx').delay(8000).fadeOut(1500); 
		//$('#skipintro').delay(8000).fadeOut(2500);
}, false);

function showgrid(waitto, howlong){
	if (canShowIntro == true){
		canShowIntro = false;
		gsap.to(".intro_backscreen", {y: -vh, duration: howlong});
		gsap.from(".full-page", {y: vh, duration: howlong, ease: "power1.inOut"});
		//gsap.from(".full-page", {x: -100, delay: waitto, duration: howlong, ease: "power1.inOut"});
	}
	else{
		return;
	}
}

function intro(){
	//console.log(vh);
	//console.log("INTRO");
	gsap.to('#logo-shape', {
	duration: 3.5,
	delay: 3.8,
	opacity: 0
})
	gsap.to('#logo-purple', {
	duration: 3.5,
	delay: 6,
	opacity: 0,
	//onComplete:function(){}
})
	gsap.to('#logo-sphynx', {
	duration: 3.5,
	delay: 7,
	opacity: 0,
	onComplete:function()
	{
	$('.logo-container').delay(200).fadeOut(1000);
	$('.intro_backscreen').delay(1200).fadeOut(1000);
	allowScroll(3000);
	//showgrid(2,3);
	}
})
}
////////////////////////////////////////////////
function allowScroll(timeout){
	//console.log("allow scroll");
	setTimeout( function(){
		canScroll = true;
		//console.log("allow scroll complete");
			},timeout);
}

function allowedToScroll(){
	if (canScroll == true){
		$('body').css("overflow-y","visible");
	}
	else{
		setTimeout(allowedToScroll,1000);
	}
}
//////////////////////////////////////////////////
$("#skipintro").click(function() {
	//console.log("pRESSED");
	$('#logo-shape').delay(100).fadeOut(1100);
	$('#logo-purple').delay(100).fadeOut(1100); 
	$('#logo-sphynx').delay(100).fadeOut(1100); 
	$('.logo-container').delay(1400).fadeOut(500);
	$('.intro_backscreen').delay(1400).fadeOut(500);
	showgrid(1,2);
	//$('#logo-shape').hide();
	//$('#logo-purple').hide();
	//$('#logo-sphynx').hide();
	//$('#skipintro').delay(300).fadeOut(300);
});

///////////////////////////////////////////////////////////////////////////////////////////////
function redirectIt(obj){
	var goToLink = obj.getAttribute("href");
	window.open(goToLink);
}
///////////////////////////////////////////////////////////////////////////////////////////////
$(window).on('scroll',
	function fullscreenSkip(){
		if (canShowIntro == true){
			//console.log("test1");
		}
		else{
			//console.log("test2");
			$('body').css("overflow-y","visible");
		}
	}
)

$(window).on('scroll',
	{
		previousTop: 0
	}, 
	function () {
			var currentTop = $(window).scrollTop();
			//check if user is scrolling up
			if (currentTop < this.previousTop ) {
				//console.log(currentTop + "текущий < прошлый " + previousTop);
				//if scrolling up...
				//add class 'is-visible' to the main navigation
				//if currentTop == 0, remove 'is-fixed' and 'is-visible' classes 
			} else {
				//console.log("scroll down");
				//if scrolling down...
				//add the 'is-fixed' class to the main navigation as soon as it is no longer visible
				//add class 'is-visible' to the main navigation
			}
			//set previousTop for the next iteration
			this.previousTop = currentTop;
	}
);
///////////////////////////////////////////////////////////////////////////////////////////////
$(function(){
	// Remove svg.radial-progress .complete inline styling
	$('svg.radial-progress').each(function( index, value ) { 
			$(this).find($('circle.complete')).removeAttr( 'style' );
	});
	// Activate progress animation on scroll
	$(window).scroll(function(){
			$('svg.radial-progress').each(function( index, value ) { 
					// If svg.radial-progress is approximately 25% vertically into the window when scrolling from the top or the bottom
					if ( 
							$(window).scrollTop() > $(this).offset().top - ($(window).height() * 0.75) &&
							$(window).scrollTop() < $(this).offset().top + $(this).height() - ($(window).height() * 0.25)
					) {
							// Get percentage of progress
							percent = $(value).data('percentage');
							// Get radius of the svg's circle.complete
							radius = $(this).find($('circle.complete')).attr('r');
							// Get circumference (2πr)
							circumference = 2 * Math.PI * radius;
							// Get stroke-dashoffset value based on the percentage of the circumference
							strokeDashOffset = circumference - ((percent * circumference) / 100);
							// Transition progress for 1.25 seconds
							$(this).find($('circle.complete')).animate({'stroke-dashoffset': strokeDashOffset}, 1250);
					}
			});
	}).trigger('scroll');
});






$("#container").mousemove(function(e) {
	parallaxIt(e, "#txt", -50);
	parallaxIt(e, "img", -10);
	parallaxIt(e, "#txtslow", -20);
});

function parallaxIt(e, target, movement) {
	var $this = $("#container");
	var relX = e.pageX - $this.offset().left;
	var relY = e.pageY - $this.offset().top;

	TweenMax.to(target, 1, {
		x: (relX - $this.width() / 2) / $this.width() * movement,
		y: (relY - $this.height() / 2) / $this.height() * movement
	});
}
