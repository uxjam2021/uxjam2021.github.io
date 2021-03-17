window.onscroll = function() {
  var el = document.getElementsByClassName('header')[0];
  var className = 'small';
  if (el.classList) {
    if (window.scrollY > 10)
      el.classList.add(className);
    else
      el.classList.remove(className);
  }
};


console.clear();

const image = $('.image');
// const zoomImage = $('.image-zoom');

let imageOpen = false;

let mobileCenter = 0;

const openImage = (el, e) => {
	$('<div class="cursor"></div>').appendTo('body');
	TweenMax.set('.cursor', {
		x: e.clientX,
		y: e.clientY
	});
	// $('body').append('<div class="cursor"></div>');

	imageOpen = true;
	$('html').addClass('overflow');
	$(el).addClass('open');

	// reset the transform if window is resized
	let zoomImage = $(el).find('.image-zoom');

	TweenMax.set(zoomImage, {
		y: 0
	});

// 	let imgWidth = $(el).outerWidth(),
// 			imgHeight = $(el).outerHeight(),
// 			imgX = $(el).offset().left,
// 			imgY = $(el).offset().top - $(window).scrollTop();

// 	TweenMax.set(zoomImage, {
// 		x: 0,
// 		y: 0,
// 		width: 'auto',
// 		height: 'auto'
// 	});

// 	TweenMax.from(zoomImage, .5, {
// 		x: imgX,
// 		y: imgY,
// 		width: imgWidth,
// 		height: imgHeight,
// 	});
}


const closeImage = (el) => {
	$('.cursor').remove();
	imageOpen = false;
	$('html').removeClass('overflow');
	$(el).removeClass('open');
}


image.on('click', function(e) {
	imageOpen ? closeImage($(this)) : openImage($(this), e);
});


$('.image').on('mousemove', '.image-zoom', function(e) {
	let posX = e.clientX,
			posY = e.clientY;

	const cursor = $('.cursor');

	TweenMax.to(cursor, .25, {
		x: posX - (cursor.outerWidth() / 2),
		y: posY - (cursor.outerHeight() / 2),
		ease: Power2.easeOut
	});

	let windowHeight = $(window).outerHeight();
	let percY = posY / windowHeight;
	let imageHeight = $(this).outerHeight();

	// console.log(percY);

	if (imageHeight > windowHeight) {
		TweenMax.to($(this), .5, {
			y: (-imageHeight * percY) + (windowHeight * percY),
			ease: Power2.easeOut
		});
	}
});


// scroll image on mobile
const handleOrientation = (e) => {
	// WIP
	// set center to position on click
	$('.image').on('click', function() {
		mobileCenter = e.beta;
		$('.center').html(mobileCenter);
	});
	let min = mobileCenter + 10;
	let max = mobileCenter - 10;

	// move image on mobile
	if (imageOpen) {
		let target = $('.image.open .image-zoom');

		let distance = e.beta - mobileCenter;

		if (distance >= 10) distance = 10;
		if (distance <= -10) distance = -10;
		// WIP
		// if (distance >= min) distance = min;
		// if (distance <= max) distance = max;

		distance = 0.5 * (distance / 10) + 0.5;

		let windowHeight = $(window).outerHeight();
		let imageHeight = $(target).outerHeight();

		TweenMax.to(target, .5, {
			y: (-imageHeight * distance.toFixed(2)) + (windowHeight * distance.toFixed(2)),
			ease: Power2.easeOut,
		});
	}
}

window.addEventListener('deviceorientation', handleOrientation);
