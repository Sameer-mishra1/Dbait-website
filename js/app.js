gsap.registerPlugin(ScrollTrigger)


// Mobile animation 
LottieScrollTrigger({
	target: "#animation",
	path: "https://assets10.lottiefiles.com/packages/lf20_hsgjxstb.json",
	speed: "slow",
	scrub: 2, // seconds it takes for the playhead to "catch up"
	// you can also add ANY ScrollTrigger values here too, like trigger, start, end, onEnter, onLeave, onUpdate, etc. See https://greensock.com/docs/v3/Plugins/ScrollTrigger
	onLoad() {
		$('.spinner-wrapper').fadeOut('slow');
	}
});

// Desktop Animation
LottieScrollTrigger({
	target: "#desktopAnimation",
	path: "https://assets3.lottiefiles.com/packages/lf20_3jdtjehp.json",
	speed: "slow",
	scrub: 2, // seconds it takes for the playhead to "catch up"
	// you can also add ANY ScrollTrigger values here too, like trigger, start, end, onEnter, onLeave, onUpdate, etc. See https://greensock.com/docs/v3/Plugins/ScrollTrigger
	onLoad() {
		// $('.spinner-wrapper').fadeOut('slow');
	}
});

function LottieScrollTrigger(vars) {
	let playhead = {frame: 0},
		target = gsap.utils.toArray(vars.target)[0],
		speeds = {slow: "+=3000", medium: "+=1000", fast: "+=500"},
		st = {trigger: target, pin: true, start: "top top", end: speeds[vars.speed] || "+=1000", scrub: 1},
		animation = lottie.loadAnimation({
			container: target,
			renderer: vars.renderer || "svg",
			loop: false,
			autoplay: false,
			path: vars.path
		});
	for (let p in vars) { // let users override the ScrollTrigger defaults
		st[p] = vars[p];
	}
	animation.addEventListener("DOMLoaded", function() {
		gsap.to(playhead, {
			frame: animation.totalFrames - 1,
			ease: "none",
			onUpdate: () => animation.goToAndStop(playhead.frame, true),
			scrollTrigger: st
		});
    // in case there are any other ScrollTriggers on the page and the loading of this Lottie asset caused layout changes
    ScrollTrigger.sort();
    ScrollTrigger.refresh(); 
    
    vars.onLoad() && vars.onLoad();
	});
  return animation;
}

// https://greensock.com/docs/v3/HelperFunctions#lottie

// $(window).load(function() {
// 	$('.spinner-wrapper').fadeOut('slow');
// });