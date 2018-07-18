$(window).resize(function(){
	winW = $(window).width();
	winH = $(window).height();
	console.log(winW);
})

jQuery(document).ready(function($){

	/*-------------------------------------
	Team
	-------------------------------------*/

	$('.team-photo').mouseenter(function(){
		$(this).siblings('.team-hover').css({'opacity':1})
	})

	$('.team-photo').mouseleave(function(){
		$(this).siblings('.team-hover').css({'opacity':0})
	})

	$('.team-person').click(function(){
		if(!$(this).hasClass('on')){
			resetBios($(this));
		}
	})

	$('.team-person').find('.blob-close').click(function(){
		TweenMax.to($(this).parents('.team-overlay'), .65, {'transform':'scale(.55) translate3d(0px,-55px,0px)', opacity:0, 'display':'none', onCompleteParams:[$(this).parents('.team-person')], ease:Back.easeInOut, easeParams:[2,3], onComplete:function(t){
			t.removeClass('on');
		}})
	})

	function resetBios(elem){
		
		// close any open first
		closeDel = 0;
		$('.team-person').each(function(){
			if($(this).hasClass('on')){
				TweenMax.to($(this).find('.team-overlay'), .65, {'transform':'scale(.55) translate3d(0px,-55px,0px)', opacity:0, 'display':'none', ease:Back.easeInOut, easeParams:[2,3]})
				closeDel = 500;
			}	
		})
		
		// open new
		setTimeout(function(){
			$('.team-person').removeClass('on');
			elem.addClass('on');
			elem.find('.team-overlay').css({'transform':'scale(.55) translate3d(0px,-55px,0px)', 'opacity':0, 'display':'block'})
			TweenMax.to(elem.find('.team-overlay'), .75, {'transform':'scale(1) translate3d(0px,0px,0px)', opacity:1, ease:Elastic.easeOut, easeParams:[2,3]})
			bioListener();
		}, closeDel)
	}

	function bioListener(){
		$('body').bind('click', function(){
			$('.team-person').each(function(){
				if($(this).hasClass('on')){
					TweenMax.to($(this).find('.team-overlay'), .65, {'transform':'scale(.55) translate3d(0px,-55px,0px)', opacity:0, 'display':'none', ease:Back.easeInOut, easeParams:[2,3], onCompleteParams:[$(this)], onComplete:function(t){
						t.removeClass('on');
					}})
				}	
			})
			$('body').unbind('click');
		})
	}

	$('.team-overlay').click(function(e){
		e.stopPropagation();
	})

	/*-------------------------------------
	Start Pipeline Animations on Load
	-------------------------------------*/

	$(window).on('load', function(){
		$('.pipeline').each(function(i){
			$(this).find('.pipe-data').addClass('pa0'+(i+1));
			$(this).find('.pipe-data>div').addClass('paD0'+(i+1));
		});
	})

	/*-------------------------------------
	MatchHeight Init
	-------------------------------------*/

	$('.transparency-features.description').matchHeight();
	$('.team-person').matchHeight();

	/*-------------------------------------
	Sticky Nav
	-------------------------------------*/

	var stickyOpen = false;
	var stickyH = 86;
	var lastSt = 0;
	var st;
	var autoOff = false;
	var stickyBreak = 900;

	if($(window).width()>=768){
		$('header.main').clone().appendTo('body').addClass('sticky');
	}

	$(window).scroll(function(){
			
		st = $(this).scrollTop();

		if(st<lastSt && $(window).width()>=stickyBreak){	
			if(!stickyOpen && st > 40){
				TweenMax.to($('.sticky'), .75, {delay:.2, 'transform':'translate3d(0px, 0px, 0px)', 'display':'block', ease:Elastic.easeOut, easeParams:[3,3]});	
				stickyOpen = true;
			}	
			if(stickyOpen && st <= 30){
				TweenMax.to($('.sticky'), .3, {'transform':'translate3d(0px, '+ -stickyH +'px, 0px)', 'display':'none', ease:Power3.easeOut});					
				stickyOpen = false;
			}
		}

		if(st>lastSt){
			if(stickyOpen){
				TweenMax.to($('.sticky'), .3, {'transform':'translate3d(0px, '+ -stickyH +'px, 0px)', 'display':'none', ease:Power3.easeOut});					
				stickyOpen = false;
			}
		}
		
		if(st<=0 && !autoOff){
			TweenMax.killTweensOf($('.sticky'));
			
			autoOff = true;
			
			TweenMax.to($('.sticky'), .3, {'transform':'translate3d(0px, '+ -stickyH +'px, 0px)', 'display':'none', ease:Power3.easeOut, onComplete:function(){
				autoOff = false;
			}});

			stickyOpen = false;
		}

		lastSt = st;
	})

	/*-------------------------------------
	Loader
	-------------------------------------*/

	var blobseq3 = [1,2,2,1,1,2];

	disablePage(true);
	
	$('#loader').find('.blob-bg-anim').find('.blobmover').each(function(i){

		if(i<4){
			$(this).find('.floater').addClass('blobfloat3');
		} else {
			$(this).find('.floater').addClass('blobfloat6');
		}
		
		$(this).find('.icon').addClass('blobfloatInner'+blobseq3[i]);
	})
	
	TweenMax.to('.loader-logo', .75, {delay:.2, scaleX:1, scaleY:1, opacity:1, ease:Elastic.easeOut, easeParams:[3,3]});

	$(window).on('load', function(){
		$(window).resize();
		
		TweenMax.to('.loader-logo', .5, {delay:.75, scaleX:0, scaleY:0, opacity:0, ease:Back.easeInOut, easeParams:[1,4]})
		
		TweenMax.to('#loader', .5, {delay:1, opacity:0, 'display':'none', onComplete:function(){
			$('#loader').find('.blob-bg-anim').find('.blobmover').each(function(i){
				$(this).find('.floater').removeClass('blobfloat3');
				$(this).find('.icon').removeClass('blobfloatInner'+blobseq3[i]);
			})
		}});

		disablePage(false);
		
	});

	/*-------------------------------------
	Disable Page
	-------------------------------------*/

	function disablePage(i){
		if(i == true){
			$('body').addClass('page-disabled');
		}

		if(i == false){
			$('body').removeClass('page-disabled');
		}
	}

	/*-------------------------------------
	Mobile Navigation
	-------------------------------------*/

	var blobseq2 = [1,2,2,1,2,1],
		blobseq3 = [1,2,2,1,1,2],
		menuOpen = false;

	$('.menuLines').mouseenter(function(){
		TweenMax.to($(this).siblings('.menu-icon').find('.bg'), .75, {'transform':'translate3d(-10px, 10px, 0px)', ease:Elastic.easeOut, easeParams:[2,3]})
	})
	$('.menuLines').mouseleave(function(){
		TweenMax.to($(this).siblings('.menu-icon').find('.bg'), .75, {'transform':'translate3d(0px, 0px, 0px)', ease:Elastic.easeOut, easeParams:[3,2]})
	})

	$('.menuLines').click(function(){
		
		if(!menuOpen){
			openMenu();
		} else {
			closeMenu();
		}
		
		return false;
	})

		
	function openMenu(){	
		menuOpen = true;
		
		// animate lines into X
		TweenMax.to($('.menuLines .top'), .75, {delay:.1, rotation:-45, top:0, ease:Back.easeInOut, easeParams:[3,1]})
		TweenMax.to($('.menuLines .mid'), .2, {delay:.3, opacity:0})
		TweenMax.to($('.menuLines .bottom'), .75, {delay:.1, rotation:45, top:0, ease:Back.easeInOut, easeParams:[3,1]})	
		
		// expand blob
		$('.menu-wrap').css({'display':'block'});
		$('.menu-blob').css({'transform':'translate3d(800px, -2000px, 0px)'});
		
		// start bg blob animations
		$('.mobile-menu').find('.blobmover').each(function(i){
			$(this).find('.floater').addClass('blobfloat3');
			$(this).find('.icon').addClass('blobfloatInner'+blobseq2[i]);
		})
		
		// setup menu parts
		$('.mobile-menu').addClass('open');
		TweenMax.to($('.menu-icon').find('.bg'), .5, {scaleX:2, scaleY:2, ease:Back.easeIn});
		
		TweenMax.to($('.menu-blob'), 1, {delay:.3, 'transform':'translate3d(0px, 0px, 0px)', ease:Elastic.easeOut, easeParams:[2,4], onComplete:function(){
			disablePage(true);
		}});
		
		bDel = .5;
		
		TweenMax.to($('.mobile-menu .menu-contents'), .3, {delay:.5, opacity:1})
		
		
		$('body').click(function(){
			if(menuOpen){
				closeMenu();
			}
		});
	}

	function closeMenu(){	
		// animate lines back to burger
		TweenMax.to($('.menuLines .top'), .75, {rotation:0, top:-9, ease:Elastic.easeInOut, easeParams:[3,1]})
		TweenMax.to($('.menuLines .mid'), .2, {delay:.2, opacity:1})
		TweenMax.to($('.menuLines .bottom'), .75, {rotation:0, top:9, ease:Elastic.easeInOut, easeParams:[3,1]})	
		
		// shrink blob
		TweenMax.to($('.menu-icon').find('.bg'), .75, {delay:.3, startAt:{scaleX:3, scaleY:3}, scaleX:1, scaleY:1, ease:Elastic.easeOut, easeParams:[3,4]});
		TweenMax.to($('.menu-blob'), 1, {'transform':'translate3d(800px, -2000px, 0px)', ease:Back.easeInOut, easeParams:[1,4], onComplete:function(){
			$('.mobile-menu').find('.nav').find('li').css({'opacity':0, 'visibility':'hidden'});
			$('.menu-wrap').css({'display':'none'});
			$('.mobile-menu').removeClass('open');
			
			// remove bg blob animations
			$('.mobile-menu').find('.blobmover').each(function(i){
				$(this).find('.floater').removeClass('blobfloat3');
				$(this).find('.icon').removeClass('blobfloatInner'+blobseq2[i]);
			})
		
			menuOpen = false;
		}})
		
		TweenMax.to($('.mobile-menu .menu-contents'), .3, {opacity:0})
		
		if($(window).width()<768){
			disablePage(false);
			TweenMax.to($('.menu-icon').find('.bg'), .75, {'transform':'translate3d(0px, 0px, 0px)', ease:Elastic.easeOut, easeParams:[3,2]})
		}
	}

});

$('.menu-contents').click(function(e){
	e.stopPropagation();
})





//! PAGE: FAQ - EXPAND COLLAPSE

$('.faq-question').find('.answer').height(0);
$('.faq-question').click(function(){
	if(!$(this).hasClass('open')){
		resetfaqs($(this));
		$(this).addClass('open');
		tmpH = $(this).find('.answer>div').outerHeight();
		TweenMax.to($(this).find('.answer'), .5, {startAt:{height:0}, height:tmpH, ease:Expo.easeInOut, onCompleteParams:[$(this).find('.answer')], onComplete:function(t){
			t.css('height','');
		}})
	} else {
		$(this).removeClass('open')
		$(this).find('.answer').css({'height':$(this).find('.answer>div').outerHeight()})
		TweenMax.to($(this).find('.answer'), .5, {height:0, ease:Expo.easeInOut})
	}
})

function resetfaqs(obj){
	$('.faq-question').each(function(){
		if($(this).hasClass('open') && $(this) != obj){
			$(this).removeClass('open');
			$(this).find('.answer').css({'height':$(this).find('.answer>div').outerHeight()})
			TweenMax.to($(this).find('.answer'), .5, {height:0, ease:Expo.easeInOut})
		}
	})
}
