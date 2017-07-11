var mobile = false;
var mobileBreak = 768;
if($(window).width() <= mobileBreak){mobile = true;}
var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
var path;
function freezePage(){$('body').css({'width':'100%','height':'100%','overflow':'hidden'});}
function unfreezePage(){$('body').css({'width':'','height':'','overflow':''});}
function animScroll(sec, speed, offset){
	activeOffset = $(sec).offset().top+offset;	
	TweenMax.to('html,body', speed, {scrollTop:activeOffset, ease:Expo.easeInOut});
}
var blobseq1 = [1,1,2,1,2,1];
var blobseq2 = [1,2,2,1,2,1];
var blobseq3 = [1,2,2,1,1,2];
var blobseqM = [6,6,7,6,7,6];
var distblobseq1 = [];
var distblobseq2 = [];
distblobseq1[0] = [4,5,5];
distblobseq2[0] = [1,2,2];
distblobseq1[1] = [4,5];
distblobseq2[1] = [1,2];
distblobseq1[2] = [4,5,4];
distblobseq2[2] = [1,2,1];
distblobseq1[3] = [5,4];
distblobseq2[3] = [2,1];
distblobseq1[4] = [5,5,4];
distblobseq2[4] = [2,1,1];





//! WINDOW RESIZE

var winW;
var winH;
$(window).resize(function(){
	winW = $(window).width();
	winH = $(window).height();
	//console.log(winW);
	
	if(winW<=mobileBreak && !mobile){
		mobile = true;
		
		if(stickyOpen){
			TweenMax.set($('.sticky'), {'transform':'translate3d(0px, '+ -stickyH +'px, 0px)', 'display':'none', ease:Power3.easeOut});					
			stickyOpen = false;
		}
	}
	if(winW>mobileBreak && mobile){
		mobile = false;
	}
	
	// update big blob
	botH = Number($('.blob-mid-cover.bot').css('bottom').split('px')[0])+25;
	if(winW<=768){botH += 180;}
	bH = $('.big-blob.mid').outerHeight()-botH;
	$('.blob-mid-bg').css('height',bH);
	
	// update governance pipe
	if($('#governance').hasClass('on')){
		if(winW>1100 && $('#governance').find('.pipe-data').hasClass('pa12')){
			$('#governance').find('.pipe-data').removeClass('pa12')
			$('#governance').find('.pipe-data').addClass('pa09');
			$('#governance').find('.pipe-data>div').addClass('paD09');
		} 
		if(winW<=1100 && $('#governance').find('.pipe-data').hasClass('pa09')){
			$('#governance').find('.pipe-data').removeClass('pa09');
			$('#governance').find('.pipe-data>div').removeClass('paD09');
			$('#governance').find('.pipe-data').addClass('pa12')
		} 							
	}
	
	// token drop
	startingT = $('#token').find('.token').offset().top - winH;	
	
	// update framework code
	if($('#governance').hasClass('on')){
		if(winW>700 && !codeMoving){
			moveCode();
		} 
		if(winW<=700 && codeMoving){
			codeMoving = false;
			clearInterval(codemover);
		}
	}
	
	// adjust district box margin
	if(!mobile){
		gapAmt = ($('.district-boxes').width()-($('.district-box[data-num="1"]').outerWidth()*3))/2;
		if(gapAmt<81){
			$('.district-box[data-num="4"], .district-box[data-num="5"]').css('margin-top',gapAmt+'px');
		} else {
			$('.district-box[data-num="4"], .district-box[data-num="5"]').css('margin-top','81px');
		}
	} else {
		$('.district-box[data-num="4"], .district-box[data-num="5"]').css('margin-top','');
	}
	
})
$(window).resize();





//! LOADER

freezePage();
// start bg blob animations
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
	//$('#loader').addClass('remove');
	unfreezePage();
	
	// turn on hero animation
	$('#hero').addClass('on');
	//if(!mobile){heroClouds();}
	$('#hero').find('.pipeline').each(function(i){
		$(this).find('.pipe-data').addClass('pa0'+(i+1));
		$(this).find('.pipe-data>div').addClass('paD0'+(i+1));
	})
})




//! BACK TO TOP

$('.backtotop>div, .sticky .logo').click(function(){
	TweenMax.to('html,body', .75, {scrollTop:0, ease:Expo.easeInOut});
})





//! STICKY NAV

var stickyOpen = false;
var stickyH = 86;
var lastSt = 0;
var st;
var autoOff = false;

$(window).scroll(function(){
		
	st = $(this).scrollTop();

	if(st<lastSt && !mobile){	
		if(!stickyOpen && st > 40){
			//console.log('go')
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





//! GLOBAL MENU

var menuOpen = false;

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
	$('#globalMenu').find('.blobmover').each(function(i){
		$(this).find('.floater').addClass('blobfloat3');
		$(this).find('.icon').addClass('blobfloatInner'+blobseq2[i]);
	})
	
	// setup menu parts
	$('#globalMenu').addClass('open');
	TweenMax.to($('.menu-icon').find('.bg'), .5, {scaleX:2, scaleY:2, ease:Back.easeIn});
	TweenMax.to($('.menu-blob'), 1, {delay:.3, 'transform':'translate3d(0px, 0px, 0px)', ease:Elastic.easeOut, easeParams:[2,4], onComplete:function(){
		if(mobile){
			freezePage();
		}
	}});
	
	bDel = .5;
	
	TweenMax.to($('.mobile-top-links'), .5, {delay:.5, opacity:1});
	TweenMax.to($('.mobile-logo, .menu-wrap .toplinks.dsk'), .3, {delay:.5, opacity:1})
	TweenMax.to($('.mobile-links, #globalNav .social'), .3, {delay:bDel+(10*.1), opacity:1})
	
	// bring on links
	$('#globalNav').find('.nav').css('opacity','');
	$('#globalNav').find('.nav').find('li').each(function(i){
		TweenMax.to($(this), .5, {delay:bDel+(i*.1), startAt:{'transform':'translate3d(0px, 50px, 0px)','visibility':'visible'}, 'transform':'translate3d(0px, 0px, 0px)', opacity:1, ease:Elastic.easeOut, easeParams:[4,3]})
	})
	
	$('body').click(function(){
	if(menuOpen){
		closeMenu();
	}
	})
}

function closeMenu(){	
	// animate lines back to burger
	TweenMax.to($('.menuLines .top'), .75, {rotation:0, top:-9, ease:Elastic.easeInOut, easeParams:[3,1]})
	TweenMax.to($('.menuLines .mid'), .2, {delay:.2, opacity:1})
	TweenMax.to($('.menuLines .bottom'), .75, {rotation:0, top:9, ease:Elastic.easeInOut, easeParams:[3,1]})	
	
	// shrink blob
	TweenMax.to($('.menu-icon').find('.bg'), .75, {delay:.3, startAt:{scaleX:3, scaleY:3}, scaleX:1, scaleY:1, ease:Elastic.easeOut, easeParams:[3,4]});
	TweenMax.to($('.menu-blob'), 1, {'transform':'translate3d(800px, -2000px, 0px)', ease:Back.easeInOut, easeParams:[1,4], onComplete:function(){
		$('#globalNav').find('.nav').find('li').css({'opacity':0, 'visibility':'hidden'});
		$('.menu-wrap').css({'display':'none'});
		$('#globalMenu').removeClass('open');
		
		// remove bg blob animations
		$('#globalMenu').find('.blobmover').each(function(i){
			$(this).find('.floater').removeClass('blobfloat3');
			$(this).find('.icon').removeClass('blobfloatInner'+blobseq2[i]);
		})
	
		menuOpen = false;
	}})
	
	TweenMax.to($('.menu-wrap .toplinks.dsk, .mobile-logo, .mobile-links, #globalNav ul, .mobile-top-links'), .3, {opacity:0})
	
	if(mobile){
		unfreezePage();
		TweenMax.to($('.menu-icon').find('.bg'), .75, {'transform':'translate3d(0px, 0px, 0px)', ease:Elastic.easeOut, easeParams:[3,2]})
	}
}

$('#globalNav').find('a').click(function(){
	gotoSec = $(this).attr('href');
	dif = 0;
	if(Number($(gotoSec).attr('data-dif'))){dif = Number($(gotoSec).attr('data-dif'))}
	if(mobile){
		if(Number($(gotoSec).attr('data-dif-mobile'))){dif = Number($(gotoSec).attr('data-dif-mobile'))}
	}
	
	// close menu if mobile
	if(mobile){
		closeMenu();
		setTimeout(function(){
			animScroll($(gotoSec), .75, dif);
		}, 500);
	} else {
		
		animScroll($(gotoSec), .75, dif);
	}
	
	return false;
})

$('.menu-wrap').click(function(e){
	e.stopPropagation();
})





//! SCROLL BASED ANIMATION

function isScrolledIntoView(elem, offset){
	viewDif = Number(offset);
	
    sT = Number($(document).scrollTop());
	vT = Number($(elem).offset().top)+viewDif;
	vB = sT+winH;
	vH = vT+$(elem).outerHeight()+winH;
	if((vT <= vB && vT >= sT) || (vT <= vB && vB <= vH)){
		return true;
	}
}

$(window).scroll(function(){
	$('.hasAnim').each(function(){
		
		
		//! TURN ON ANIMATIONS
		
		if(isScrolledIntoView($(this), 0)){
			
			// turn on nav highlight
			/*tmpID = $(this).attr('id');
			$('#globalNav').find('li').each(function(){
				if($(this).attr('data-id') == tmpID){
					if(!$(this).find('a').hasClass('onSection')){
						$(this).find('a').addClass('onSection');
					}
				} else {
					if($(this).find('a').hasClass('onSection')){
						$(this).find('a').removeClass('onSection');
					}
				}
			})*/
			
			if(!$(this).hasClass('on')){
				//console.log($(this).attr('id')+' on');
				$(this).addClass('on');

				// special animation start
				if($(this).attr('id') == 'hero'){
										
					$('#hero').find('.pipeline').each(function(i){
						$(this).find('.pipe-data').addClass('pa0'+(i+1));
						$(this).find('.pipe-data>div').addClass('paD0'+(i+1));
					})					
				}
				
				if($(this).attr('id') == 'framework'){
					$('#framework').find('.pipeline[data-num="1"]').find('.pipe-data').each(function(i){
						if(i<2){
							$(this).addClass('pa07');
							$(this).find('div').addClass('paD07');
						}
						if(i>=2 && i<4){
							$(this).addClass('pa08');
							$(this).find('div').addClass('paD08');
						}
						if(i>=4){
							$(this).addClass('pa10');
						}
					})
					$('#framework').find('.pipeline[data-num="2"]').find('.pipe-data').addClass('pa11');
					moveCode();
				}
				
				if($(this).attr('id') == 'governance'){
					if(winW>1100){
						$('#governance').find('.pipe-data').addClass('pa09');
						$('#governance').find('.pipe-data>div').addClass('paD09');
					} else {
						$('#governance').find('.pipe-data').addClass('pa12');
					}					
				}
				
				if($(this).attr('id') == 'districts'){
					$('#districts').find('.pipe-data').addClass('pa03');
					$('#districts').find('.pipe-data>div').addClass('paD03');
					
					
					$('#districts').find('.blob-bg-anim').each(function(i){
						$(this).find('.blobmover').each(function(n){
							$(this).find('.floater').addClass('blobfloat'+distblobseq1[i][n]);
							$(this).find('.icon').addClass('blobfloatInner'+distblobseq2[i][n]);
						})
					})
				}
				
				if($(this).attr('id') == 'roadmap'){
					$('#roadmap').find('.pipe-data').each(function(i){
						if(i<4){
							$(this).addClass('pa05');
							$(this).find('div').addClass('paD05');
						} else {
							$(this).addClass('pa06');
							$(this).find('div').addClass('paD06');
						}
					})
				}	
				
				if($(this).attr('id') == 'contribution'){
					$('#contribution').find('.blobmover').each(function(i){
						
						if(!mobile){
							$(this).find('.floater').addClass('blobfloat'+blobseq1[i]);
						} else {
							$(this).find('.floater').addClass('blobfloat'+blobseqM[i]);
						}
						$(this).find('.icon').addClass('blobfloatInner'+blobseq2[i]);
					})
				}
				
				if($(this).attr('id') == 'globalFooter'){
					$('#globalFooter').find('.pipe-data').addClass('pa04');
					$('#globalFooter').find('.pipe-data>div').addClass('paD04');
				}
			}
			
			
			
			
		//! TURN OFF ANIMATIONS
		
		} else {
			if($(this).hasClass('on')){
				$(this).removeClass('on');
				
				// special animations
				if($(this).attr('id') == 'hero'){
					//if(!mobile){clearInterval(cloudMover);}
					$('#hero').find('.pipeline').each(function(i){
						$(this).find('.pipe-data').removeClass('pa0'+(i+1));
						$(this).find('.pipe-data>div').removeClass('paD0'+(i+1));
					})
				}
				
				if($(this).attr('id') == 'framework'){
					$('#framework').find('.pipeline[data-num="1"]').find('.pipe-data').each(function(i){
						if(i<2){
							$(this).removeClass('pa07');
							$(this).find('div').removeClass('paD07');
						}
						if(i>=2 && i<4){
							$(this).removeClass('pa08');
							$(this).find('div').removeClass('paD08');
						}
						if(i>=4){
							$(this).removeClass('pa10');
						}
					})
					$('#framework').find('.pipeline[data-num="2"]').find('.pipe-data').removeClass('pa11');
					codeMoving = false;
					clearInterval(codemover);
				}
				
				if($(this).attr('id') == 'governance'){
					if(winW>1100){
						$('#governance').find('.pipe-data').removeClass('pa09');
						$('#governance').find('.pipe-data>div').removeClass('paD09');
					} else {
						$('#governance').find('.pipe-data').removeClass('pa12');
					}					
				}
				
				if($(this).attr('id') == 'districts'){
					$('#districts').find('.pipe-data').removeClass('pa03');
					$('#districts').find('.pipe-data>div').removeClass('paD03');
					
					$('#districts').find('.blob-bg-anim').each(function(i){
						$(this).find('.blobmover').each(function(n){
							$(this).find('.floater').removeClass('blobfloat'+distblobseq1[i][n]);
							$(this).find('.icon').removeClass('blobfloatInner'+distblobseq2[i][n]);
						})
					})
				}	
				
				if($(this).attr('id') == 'roadmap'){
					$('#roadmap').find('.pipe-data').each(function(i){
						if(i<4){
							$(this).removeClass('pa05');
							$(this).find('div').removeClass('paD05');
						} else {
							$(this).removeClass('pa06');
							$(this).find('div').removeClass('paD06');
						}
					})
				}	
				
				if($(this).attr('id') == 'contribution'){
					$('#contribution').find('.blobmover').each(function(i){
						if(!mobile){
							$(this).find('.floater').removeClass('blobfloat'+blobseq1[i]);
						} else {
							$(this).find('.floater').removeClass('blobfloat'+blobseqM[i]);
						}
						$(this).find('.icon').removeClass('blobfloatInner'+blobseq2[i]);
					})
				}
				
				if($(this).attr('id') == 'globalFooter'){
					$('#globalFooter').find('.pipe-data').removeClass('pa04');
					$('#globalFooter').find('.pipe-data>div').removeClass('paD04');
				}
			}
		}	
	})
	
	// Token Parallax
	if($('#token').hasClass('on')){	
				
		moveAmt = Math.round(($(window).scrollTop()-startingT)/pspeed);
		if(moveAmt<0){moveAmt = 0;}
		
		$('#token').find('.token').css('transform', 'translate3d(0px,' + moveAmt + 'px, 0px)');	
		
		if(moveAmt>515 && !checkBoxDrop){
			dropCheckboxes();
			checkBoxDrop = true;
		}
	} else {
		if(checkBoxDrop){
			resetCheckboxes();
			checkBoxDrop = false;
		}
	}

})





//! TEAM BIOS

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






//! ANIMATIONS

var goSpeeds = [2,1,2.5];
function heroClouds(){
	var goPos = [winW-300,winW-100,winW-450];
	
	cloudMover = setInterval(function(){
		$('.cloud').each(function(i){
			goPos[i]+=-goSpeeds[i];
			if(goPos[i]<-$(this).width()){
				goPos[i] = winW;
			}
			TweenMax.set($(this), {'transform':'translate3d('+goPos[i]+'px,0px,0px)'})
			
		})
	}, 30);
}

pspeed = 1.75;	
var checkBoxDrop = false;
function dropCheckboxes(){
	$('.checkbox').each(function(i){
		tmpR = Number($(this).attr('data-rot'));
		
		TweenMax.to($(this), 1.5, {delay:(i*.1), 'transform':'translate3d(0px,0px,0px)', ease:Power3.easeOut})
		TweenMax.to($(this).find('img'), 1.5, {delay:(i*.1), rotation:tmpR, ease:Power3.easeOut})
		 
	})	
}

function resetCheckboxes(){
	$('.checkbox').each(function(){
		tmpT = Number($(this).css('top').split('px')[0])+100;
		randR = Math.floor((Math.random() * 360) - 180);
		TweenMax.set($(this), {'transform':'translate3d(0px,'+ -tmpT +'px,0px)'})
		TweenMax.set($(this).find('img'), {rotation:randR})
	})
}
resetCheckboxes();





//! ANIMATION: CODE WRITER

var codelines = 8;
var codegap = 7;

var codedata = '';
var codenum = 1;

$('.framework-code').each(function(){
	
	var codedata = '';
	var codenum = 1;
	
	for(i=0;i<codelines;i++){
		codedata += '<div class="codeline" data-num="'+i+'">';
		codedata += '<img src="';
		if($('body').hasClass('cn')) {
		    codedata += '../';
        } else {
            codedata += './';
        }
		codedata += 'images/parts/codeline'+codenum+'.png">';
		codedata += '<div class="code-mask-cover"></div>';
		codedata += '</div>';
		codenum++;
		if(codenum == 5){codenum = 1;}
	}
	
	$(this).find('.codehold').append(codedata);

})

function resetCodePos(){
	$('.framework-code').each(function(){
		$(this).find('.codeline').each(function(i){
			$(this).css({'transform':'translate3d(0px, '+ (i*codegap) +'px, 0px)', 'opacity':0})
		})
	})
	$('.code-mask-cover').css({'transform':'translate3d(43px, 0px, 0px)'});
}
var codeMoving = false;
function moveCode(){
	resetCodePos();
	codeMoving = true;
	
	codemover = setInterval(function(){
		
		$('.framework-code').each(function(){
			$(this).find('.codeline').each(function(){
				goP = $(this).position().top - codegap;
				if(goP<-codegap){
					goP = 42;
					$(this).css({'transform':'translate3d(0px, '+ goP +'px, 0px)', 'opacity':0})
					TweenMax.set($(this).find('.code-mask-cover'), {'transform':'translate3d(0px, 0px, 0px)'})
				} else {
					$(this).css({'transform':'translate3d(0px, '+ goP +'px, 0px)', 'opacity':1})
					if(goP == 35){
						TweenMax.set($(this).find('.code-mask-cover'), {'transform':'translate3d(43px, 0px, 0px)'})
					}
				}
			})
		})
	
	}, 1000)
}

