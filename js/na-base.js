/*
 * NHIS Base Constant Value
 *
 */
var NB = {
    boolLogged: false,
    
    strSelectedTab: "선택된 탭",
    strOpen: "열기",
    strClose: "닫기",
    
    strNewWindow: "새창",
    numPrevTop: 0,
    numPCount: 0,
    numTCount: 0,
    numMCount: 0,

    cnBody: 'body',
    cnMyCardBg: '.mycard_bg',
    cnMyCardWrap: '.mycard',
    cnMyCard: '.mycard > div',
    cnMyCardBtnClose: '.mycard .btn_close',
    cnQnb: '.qnb',

    strMyCardOpen: 'mycard_open',
    strMCEvent: "ontouchstart" in document.documentElement ? "touchend" : "click",

    numMCInitX: 0,
    numMCInitX: 0,
    numMCY: 0,
};

/*
 * Slide : essential parameter - wrapClass, sLoop, sAuto, sCenter
 * 
 */
function fnSlide(wrapClass, sLoop, sAuto, sCenter, sDirect, sEffect, sBg, sPerGroup) {

    var so = $(wrapClass);

    if (so.length > 0) {

        var soList = so.find(".sw_l"),
            soListLength = soList.length,
            soCount = !sDirect ? so.find(".s_c") : so.parent().find('.s_c'),
            isSoCount = soCount.length > 0,
            soCountStrong = soCount.find("strong"),
            soCountSpan = soCount.find("span"),
            soBtns = !sDirect ? so.find(".s_b") : so.parent().find('.s_b'),
            isSoBtns = soBtns.length > 0,
            soBtnPause = !sDirect ? so.find(".btn_pause") : so.parent().find('.btn_pause'),
            soBtnPlay = !sDirect ? so.find(".btn_play") : so.parent().find('.btn_play'),
            soPagination = !sDirect ? so.find(".s_p") : so.parent().find('.s_p'),
            isSoPagination = soPagination.length > 0,
            soBg = sBg,
            isSoBg = !!soBg;

        soListLength === 0 && (
            soCount.hide(),
            soBtns.hide(),
            soPagination.hide()
        );

        var soSlide = new Swiper(wrapClass, {
            wrapperClass: "s_w",
            slideClass: "sw_l",
            loop: sLoop,
            autoplay: sAuto,
            centeredSlides: sCenter,
            direction: !sDirect ? 'horizontal' : sDirect,
            effect: !sEffect ? 'slide' : sEffect,
            slidesPerView: "auto",
            slidesPerGroup: !!sPerGroup ? sPerGroup : 1,
            nested: true,
            pagination: isSoPagination && {
                el: soPagination,
                clickable: true,
                renderBullet: function(i, c) {
                    return '<span class="' + c + '">' + (i + 1) + "</span>";
                }
            },
            navigation: isSoBtns && {
                prevEl: ".btn_prev",
                nextEl: ".btn_next"
            },
            on: {
                init: function() {
                    isSoCount && (soCountStrong.text(1), soCountSpan.text(soListLength));
                    isSoBg && so.css({ transition: "background 0.25s ease-out", background: soBg[0] });
                }
            }
        });

        // isSoCount &&
        //     soSlide.on("transitionEnd", function() {
        //         soCountStrong.text(soSlide.realIndex + 1);
        //     });

        // isSoBg &&
        //     soSlide.on("transitionEnd", function() {
        //         so.css("background", soBg[soSlide.realIndex]);
        //     });

        soSlide.on("transitionEnd", function() {
            isSoCount && soCountStrong.text(soSlide.realIndex + 1);
            isSoBg && so.css("background", soBg[soSlide.realIndex]);
            $('.btn_play').css('display') === 'none' && soSlide.autoplay.start();
            $('.btn_pause').css('display') === 'none' && soSlide.autoplay.stop();
        });

        if (sAuto) {
            soBtnPlay.hide();
            soBtnPause.click(function() {
                soSlide.autoplay.stop();
                soBtnPause.hide();
                soBtnPlay.show();
                return false;
            });
            soBtnPlay.click(function() {
                soSlide.autoplay.start();
                soBtnPlay.hide();
                soBtnPause.show();
                return false;
            });
        } else {
            soBtnPause.hide();
            soBtnPause.click(function() {
                soSlide.autoplay.stop();
                soBtnPause.hide();
                soBtnPlay.show();
                return false;
            });
            soBtnPlay.click(function() {
                soSlide.autoplay.start();
                soBtnPlay.hide();
                soBtnPause.show();
                return false;
            });
        }

        $(window).on('resize', $.debounce(80, function(){

            // 1. slide destroy
            soSlide.destroy();
            // 2. slide reinit
            soSlide = new Swiper(wrapClass, {
                wrapperClass: "s_w",
                slideClass: "sw_l",
                loop: sLoop,
                autoplay: sAuto,
                centeredSlides: sCenter,
                direction: !sDirect ? 'horizontal' : sDirect,
                effect: !sEffect ? 'slide' : sEffect,
                slidesPerView: "auto",
                slidesPerGroup: !!sPerGroup ? sPerGroup : 1,
                nested: true,
                pagination: isSoPagination && {
                    el: ".s_p",
                    clickable: true,
                    renderBullet: function(i, c) {
                        return '<span class="' + c + '">' + (i + 1) + "</span>";
                    }
                },
                navigation: isSoBtns && {
                    prevEl: ".btn_prev",
                    nextEl: ".btn_next"
                },
                on: {
                    init: function() {
                        isSoCount && (soCountStrong.text(1), soCountSpan.text(soListLength));
                        isSoBg && so.css({ transition: "background 0.25s ease-out", background: soBg[0] });
                    }
                }
            });

        }));

    }

}

/*
 * Slide + Scroll
 *
 */
function tabScrl() {

    var 
        tsStr = '.tab_scrl',
        ts = $(tsStr);

    if (ts.length > 0) {
        new Swiper(tsStr, {
            wrapperClass: "s_w",
            slideClass: "sw_l",
            slidesPerView: "auto",
            nested: true,
            freeMode: true
        });
    }
    
}

/*
 * Tab Common
 *
 */
function tabCommon(wrapClass) {

    var tabWrap = $(wrapClass),
        DotDltChar = wrapClass.replace(".", ""),
        tabList = tabWrap.find(".tab_list li"),
        tabContent = tabWrap.find(".tab_content");

    tabList.each(function() {
        if ($(this).find("a").attr("href") === undefined || $(this).find("a").attr("href") === null || $(this).find("a").attr("href") === "") {
            $(this).find("a").attr("href", "#" + DotDltChar + ($(this).index() + 1));
        }
    });

    tabContent.each(function() {
        $(this).attr("id", DotDltChar + ($(this).index() + 1));
    });

    tabList.removeClass("on");
    tabList.find("a").removeAttr("title");
    tabList.first().addClass("on");
    tabList.first().find("a").attr("title", NB.strSelectedTab);
    tabContent.removeClass("on");
    tabContent.first().addClass("on");

    tabList.find("a").click(function() {
        var 
        	thP = $(this).parent(),
        	isOn = thP.hasClass("on"),
            thLink = $(this).attr("href");

        if (!isOn) {
            tabList.removeClass("on");
            tabList.find("a").removeAttr("title");
            thP.addClass("on");
            $(this).attr("title", NB.strSelectedTab);
            tabContent.removeClass("on");
            $(thLink).addClass("on");
        }
        
        var sTab = $(this).parents('.s_tab'),
        	isSTab = sTab.length,
        	thPIdx = thP.index(),
	        thPLeft = thPIdx === 0 ? (thP.position().left - 8) : (thP.position().left);
        
        if (isSTab) {
        	sTab.animate({ scrollLeft: thPLeft }, 160, 'swing');
        }

        return false;
    });
    
}

/*
 * Tab Accessibility
 *
 */
function tabAccess(wrapClass) {

    var tabWrap = $(wrapClass),
        tabBox = tabWrap.find(".tab_box"),
        tabTitle = tabWrap.find(".tab_box .tab_title a");

    tabBox.removeClass("on");
    tabBox.find(".tab_title a").removeAttr("title");
    tabBox.first().addClass("on");
    tabBox.first().find(".tab_title a").attr("title", NB.strSelectedTab);

    tabTitle.click(function() {
        tabBox.removeClass("on");
        tabBox.find(".tab_title a").removeAttr("title");
        $(this).parents(".tab_box").addClass("on");
        $(this).attr("title", NB.strSelectedTab);

        return false;
    });

}

/*
 * Tab UI Insert Text
 *
 */
function tabSelected() {

    var isOn = $('[class^="tab_"] .on a');

    if (isOn.length > 0) {
        isOn.each(function(){
            $(this).attr("title", NB.strSelectedTab);
        });
    }

}

/*
 * Class Name Toggle
 *
 */
function classToggle() {

    var ltLink = $(".lt_p .lt_l"),
        ltAllLink = $('.lta_p .lta_l'),
        dtLink = $(".dt_l");

    if (ltAllLink.length > 0) {

        ltAllLink.each(function() {
            var isOpen = $(this).parents(".lta_p").hasClass("open");

            if (!isOpen) {
                $(this).append('<em class="hdn">' + NB.strOpen + "</em>");
                $(this).attr("title", NB.strOpen);
            } else {
                $(this).append('<em class="hdn">' + NB.strClose + "</em>");
                $(this).attr("title", NB.strClose);
            }
        });

        ltAllLink.click(function() {

            var thP = $(this).parents('.lta_p'),
                thTxt = $(this).find("em.hdn"),
                thPP = thP.find('.lt_p'),
                thPPList = thPP.find('.lt_l')
                thPPListTxt = thPPList.find('em.hdn'),
                isOpen = thP.hasClass('open');

            if (!isOpen) {
                thP.addClass('open');
                thTxt.text(NB.strClose);
                $(this).attr("title", NB.strClose);
                thPP.addClass('open');
                thPPList.attr("title", NB.strClose);
                thPPListTxt.text(NB.strClose);
            } else {
                thP.removeClass('open');
                thTxt.text(NB.strOpen);
                $(this).attr("title", NB.strOpen);
                thPP.removeClass('open');
                thPPList.attr("title", NB.strOpen);
                thPPListTxt.text(NB.strOpen);
            }

            return false;

        });

    }

    if (ltLink.length > 0) {
        ltLink.each(function() {
            var isOpen = $(this).parents(".lt_p").hasClass("open");

            if (!isOpen) {
                $(this).append('<em class="hdn">' + NB.strOpen + "</em>");
                $(this).attr("title", NB.strOpen);
            } else {
                $(this).append('<em class="hdn">' + NB.strClose + "</em>");
                $(this).attr("title", NB.strClose);
            }
        });

        ltLink.click(function() {
            var thP = $(this).parents(".lt_p"),
                thTxt = $(this).find("em.hdn"),
                isOpen = thP.hasClass("open");

            if (!isOpen) {
                thP.addClass("open");
                thTxt.text(NB.strClose);
                $(this).attr("title", NB.strClose);
            } else {
                thP.removeClass("open");
                thTxt.text(NB.strOpen);
                $(this).attr("title", NB.strOpen);
            }

            return false;
        });
    }

    if (dtLink.length > 0) {
        dtLink.each(function() {
            var th = $(this),
                thTargetDiv = $("." + th.attr("data-target")),
                thBtnClose = thTargetDiv.find(".btn_close");

            th.click(function() {
                thTargetDiv.addClass("open");
                return false;
            });

            thBtnClose.click(function() {
                thTargetDiv.removeClass("open");
                return false;
            });

            th.keydown(function(e) {
                var codeKey = e.keyCode || e.which;

                if (codeKey === 13) {
                    thTargetDiv.addClass("open");
                    thBtnClose.focus();
                }
            });

            thBtnClose.keydown(function(e) {
                var codeKey = e.keyCode || e.which;

                if (codeKey === 13) {
                    thTargetDiv.removeClass("open");
                    th.focus();
                }
            });
        });
    }

}

/*
 * new Window
 *
 */
function newWindow(wrapClass) {
    var thDiv = $(wrapClass),
        thDivLink = thDiv.find("a");

    thDivLink.each(function() {
        var isTarget = $(this).attr("target"),
            thTitle = $(this).attr("title");

        if (isTarget === "_blank") {
            $(this).append('<i class="ico_window"><em class="hdn">새창</em></i>');

            if (thTitle === undefined || thTitle === null || thTitle === "") {
                $(this).attr("title", NB.newWindow);
            }
        }
    });
}

/*
 * DOM Ratio
 *
 */
function domRatio(wrapClass, ratio) {
    var dom = $(wrapClass);
    (dom.length > 0) && dom.css('height', dom.outerWidth() * ratio);
    $(window).on('resize', $.debounce(80, function(){
        (dom.length > 0) && dom.css('height', dom.outerWidth() * ratio);
    }));
}

/*
 * inline-block width check
 *
 */
function inlineblockWidthCheck() {
    var ibDiv = $(".ib_w");

    if (ibDiv.length > 0) {
        ibDiv.each(function() {
        	
            var thW = $(this).outerWidth(),
                thP = $(this).parent(),
                isBtn = $(this).find(".btn");

            if (isBtn.length > 0) {
                thP.css({
                    width: thW + "px",
                    "text-align": "right"
                });
            } else {
                thP.css("width", thW + "px");
            }
            
        });
    }
}

/*
 * form input innertext unit
 *
 */
function fUnitTextWidth() {
    var fu = $(".f_unit");

    if (fu.length > 0) {
        fu.each(function() {
            var th = $(this),
                thInput = th.find("input"),
                thTxtWidth = th.find(".f_txt").outerWidth();

            thInput.css({
                "padding-right": thTxtWidth + "px",
                "text-align": "right"
            });
        });
    }
}

/*
 * Wrap Add Class Name After Login Check
 *
 */
function wrapAddClassAfterlogin() {
    NB.boolLogged === true && $('body').addClass('logged');
}

/*
 * Wrap Add Class Name After Bottom Fixed Button Check
 *
 */
function hasBottomFixedBtn() {
    var 
        bd = $('body'),
        bfBtn = $('.bottom_fixed_btn'),
        bfArea = $('.bottom_fixed_area'),
        bfAreaH = bfArea.outerHeight();

    (bfBtn.length > 0) && bd.addClass('has_bottom_fixed_btn');

    if (bfArea.length > 0) {
        $('.content').css('padding-bottom', bfAreaH + 32);
    };
}

/*
 * Wrap Add Class Name After Qnb
 *
 */
function hasQnb() {
    var 
        bd = $('body'),
        qnb = $('.qnb'),
        content = $('.content');

    content.length > 0 && qnb.length > 0 && bd.addClass('has_qnb');
}

/*
 * 0. Touch Env Check
 *
 */
function defaultAfterTouchCheck(e) {
    e.originalEvent.clientX === undefined && e.preventDefault();
}

/*
 * 1. MyCard Init
 *
 */
function myCardInit() {

    var winH = $(window).outerHeight(),
        myCardWrap = $(NB.cnMyCardWrap),
        bd = $(NB.cnBody),
        bs = $(NB.cnMyCardBg),
        qH = $(NB.cnQnb).outerHeight(),
        myCardVisibleH = 36,
        myCardTop = winH - qH - myCardVisibleH;

    bd.removeClass(NB.strMyCardOpen);
    bs.css({
        display: "none",
        opacity: 0
    });
    myCardWrap.css("top", winH - qH - myCardVisibleH).attr("data-position", myCardTop);

    $(window).on("resize", $.debounce(80, function() {
        var _winH = $(window).outerHeight(),
        myCardTop = _winH - qH - myCardVisibleH;
        bd.removeClass(NB.strMyCardOpen);
        bs.css({
            display: "none",
            opacity: 0
        });
        myCardWrap.css("top", myCardTop).attr("data-position", myCardTop);
    }));
}

/*
 * 2. MyCard Touch & Drag Start
 *
 */
function myCardDragTouchStart(e) {

    defaultAfterTouchCheck(e);

    var myCard = $(NB.cnMyCardWrap),
        ableTouch = e.originalEvent.clientX === undefined,
        bd = $(NB.cnBody);

    NB.numMCInitY = !ableTouch ? e.originalEvent.clientY : e.originalEvent.touches[0].clientY;
    NB.numMCY = myCard.position().top;
    bd.addClass('of_h');
}

/*
 * 3. MyCard Touch & Drag
 *
 */
function myCardDragTouch(e) {

    defaultAfterTouchCheck(e);

    var 
        ableTouch = e.originalEvent.clientX === undefined,
        myCard = $(NB.cnMyCardWrap),
        myCardEndY = Number(myCard.attr("data-position")),
        currentY = !ableTouch ? e.originalEvent.clientY : e.originalEvent.changedTouches[0].clientY,
        moveY = currentY - (NB.numMCInitY - NB.numMCY),
        resultY = moveY < 56 ? 56 : moveY > myCardEndY ? myCardEndY : moveY;
    
    myCard.css("top", resultY);
}

/*
 * 4. MyCard Touch & Drag End
 *
 */
function myCardDragTouchEnd(e) {

    defaultAfterTouchCheck(e);

    var 
        ableTouch = e.originalEvent.clientX === undefined,
        mycard = $(NB.cnMyCardWrap),
        bd = $(NB.cnBody),
        bs = $(NB.cnMyCardBg),
        isOpen = bd.hasClass(NB.strMyCardOpen),
        currentY = !ableTouch ? e.originalEvent.clientY : e.originalEvent.changedTouches[0].clientY,
        diffY = NB.numMCInitY - currentY;

    if (diffY < 0) {
        if (isOpen) {
            if (Math.abs(diffY) > 80) {
                bd.removeClass(NB.strMyCardOpen).removeClass('of_h').removeClass('has_layer_popup');
                bs.css("opacity", 0);

                $('.mycard').removeClass('is_qr');
                $('.mycard').find('.lt_p').removeClass('open');

                setTimeout(function() {
                    bs.hide();
                }, 240);
                mycard.css("top", mycard.attr("data-position") + "px");
            } else {
                mycard.css("top", 56);
            }
        }
    } else {
        if (!isOpen) {
            if (Math.abs(diffY) > 80) {
                bd.addClass(NB.strMyCardOpen).addClass('of_h').addClass('has_layer_popup');
                bs.show();
                setTimeout(function() {
                    bs.css("opacity", 1);
                }, 240);
                mycard.css("top", 56);
            } else {
                mycard.css("top", mycard.attr("data-position") + "px");
            }
        }
    }

    NB.numMCInitX = 0;
    NB.numMCInitY = 0;
    NB.numMCY = 0;
}

/*
 * 5. MyCard Click Events
 *
 */
function myCardToggle() {
    var 
        bd = $(NB.cnBody),
        bs = $(NB.cnMyCardBg),
        myCard = $(NB.cnMyCardWrap),
        myCardInner = $(NB.cnMyCard),
        btnClose = $(NB.cnMyCardBtnClose),
        btnTgl = $('.mycard .lt_l'),
        btnShake = $('.mycard .btn_toggle_shake'),
        btnQr = $('.mycard .btn_toggle_qr'),
        btnCertify = $('.mycard .btn_toggle_certify');

    myCard.on("touchstart", myCardDragTouchStart);
    myCard.on("touchmove", myCardDragTouch);
    myCard.on(NB.strMCEvent, myCardDragTouchEnd);
    myCard.on({
        dragstart: myCardDragTouchStart,
        drag: myCardDragTouch,
        dragend: myCardDragTouchEnd
    });

    myCardInner.on(NB.strMCEvent, function(e) {

        defaultAfterTouchCheck(e);

        var 
            ableTouch = e.originalEvent.clientX === undefined,
            isOpen = bd.hasClass(NB.strMyCardOpen);

        if (!isOpen) {
            bd.addClass(NB.strMyCardOpen).addClass('of_h').addClass('has_layer_popup');
            bs.show();
            setTimeout(function() {
                bs.css("opacity", 1);
            }, 240);
            myCard.css("top", 56);
        }

        if (!ableTouch) {
            return false;
        }

    });

    btnTgl.on(NB.strMCEvent, function(e) {

        defaultAfterTouchCheck(e);

        var
            thP = $(this).parents('.lt_p'),
            isOpen = thP.hasClass('open'),
            ableTouch = e.originalEvent.clientX === undefined;

        if (!isOpen) {
            thP.addClass('open');
        } else {
            thP.removeClass('open');
        }

        if (!ableTouch) {
            return false;
        }

    });

    btnQr.on(NB.strMCEvent, function(e) {

        defaultAfterTouchCheck(e);

        var
            hasClassQr = myCard.hasClass('is_qr'),
            subHasClassQr = $('.sub_mycard').hasClass('is_qr'),
            ableTouch = e.originalEvent.clientX === undefined;

        if (!hasClassQr || !subHasClassQr) {
            myCard.length > 0 ? myCard.addClass('is_qr') : $('.sub_mycard').addClass('is_qr');
            fn_showQrCode();
        }

        if (!ableTouch) {
            return false;
        }

    });

    btnCertify.on(NB.strMCEvent, function(e) {

        defaultAfterTouchCheck(e);

        var
            hasClassQr = myCard.hasClass('is_qr'),
            subHasClassQr = $('.sub_mycard').hasClass('is_qr'),
            ableTouch = e.originalEvent.clientX === undefined;

        if (hasClassQr || subHasClassQr) {
            myCard.length > 0 ? myCard.removeClass('is_qr') : $('.sub_mycard').removeClass('is_qr');
        }

        if (!ableTouch) {
            return false;
        }

    });

    btnClose.on(NB.strMCEvent, function(e) {

        defaultAfterTouchCheck(e);

        bd.removeClass(NB.strMyCardOpen).removeClass('of_h').removeClass('has_layer_popup');
        bs.css("opacity", 0);

        $('.mycard').removeClass('is_qr');
        $('.mycard').find('.lt_p').removeClass('open');

        setTimeout(function() {
            bs.hide();
        }, 240);
        myCard.css("top", myCard.attr("data-position") + "px");
        return false;

    });

    btnShake.on(NB.strMCEvent, function(e) {

        defaultAfterTouchCheck(e);
        
        var isOff = $(this).hasClass('off');
        
        if (!isOff) {
            $(this).addClass('off');
            NU.isMobile && (window.location = "mnhis://myCardShakeOff");
        } else {
            $(this).removeClass('off');
            NU.isMobile && (window.location = "mnhis://myCardShakeOn");
        }
        return false;
    });
}

function subMyCardToggle() {
    var 
        bd = $(NB.cnBody),
        bs = $(NB.cnMyCardBg),
        myCard = $('.sub_mycard'),
        myCardInner = $('.sub_mycard > div'),
        btnTgl = $('.sub_mycard .lt_l'),
        btnShake = $('.sub_mycard .btn_toggle_shake'),
        btnQr = $('.sub_mycard .btn_toggle_qr'),
        btnCertify = $('.sub_mycard .btn_toggle_certify');

    btnQr.click(function(e) {

        var
            subHasClassQr = $('.sub_mycard').hasClass('is_qr');

        if (!subHasClassQr) {
            $('.sub_mycard').addClass('is_qr');
            fn_showQrCode();
        }
            return false;

    });

    btnCertify.click(function(e) {

        var
            subHasClassQr = $('.sub_mycard').hasClass('is_qr');

        if (subHasClassQr) {
            $('.sub_mycard').removeClass('is_qr');
        }
            return false;

    });

    btnShake.click(function(e) {
        
        var isOff = $(this).hasClass('off');
        
        if (!isOff) {
            $(this).addClass('off');
            NU.isMobile && (window.location = "mnhis://myCardShakeOff");
        } else {
            $(this).removeClass('off');
            NU.isMobile && (window.location = "mnhis://myCardShakeOn");
        }
        return false;
    });
}

function myCardShake() {

    var 
        bd = $(NB.cnBody),
        bs = $(NB.cnMyCardBg),
        myCard = $(NB.cnMyCardWrap);
	    
	if (myCard.length > 0) {
	    	
	    var 
	        isOpen = bd.hasClass(NB.strMyCardOpen);
	
	    if (!isOpen) {
	        bd.addClass(NB.strMyCardOpen).addClass('of_h').addClass('has_layer_popup');
	        bs.show();
	        setTimeout(function() {
	            bs.css("opacity", 1);
	        }, 240);
	        myCard.css("top", 56);
	    }
    
	} else {
        nextLink('/mg/wbmma0010/loginViewNew.do');
    }

}

function myCardBackTrigger() {

    var 
        bd = $(NB.cnBody),
        bs = $(NB.cnMyCardBg),
		myCard = $(NB.cnMyCardWrap);
		
	if (myCard.length > 0) {

		bd.removeClass(NB.strMyCardOpen).removeClass('of_h').removeClass('has_layer_popup');
		bs.css("opacity", 0);

        $('.mycard').removeClass('is_qr')
        $('.mycard').find('.lt_p').removeClass('open');

		setTimeout(function() {
			bs.hide();
		}, 240);
		myCard.css("top", myCard.attr("data-position") + "px");

	}

}

function layerPopup({ title, descript, historyLock, pBtnText, pf, nBtnText, nf, cBtnText, cf}) {
    
    var bd = $("body"),
        doc = $("#docWrapper");

    var btnCount = 0;
    pBtnText !== undefined && btnCount++;
    nBtnText !== undefined && btnCount++;

    var html = "";
    html += '<div class="layer_popup">';
    html += "	<div>";
    title !== undefined && (html += '		<div class="lp_t"><span>' + title + "</span></div>");
    html += '		<div class="lp_c">';
    html += "			<p>" + descript + "</p>";
    html += "		</div>";
    html += '		<div class="lp_b">';
    html += "			<ul>";
    nBtnText !== undefined && (html += '<li><button class="btn_cancel"><span>' + nBtnText + "</span></button></li>");
    cBtnText !== undefined && (html += '<li><button class="btn_common"><span>' + cBtnText + "</span></button></li>");
    pBtnText !== undefined && (html += '<li><button class="btn_confirm"><strong>' + pBtnText + "</strong></button></li>");
    html += "			</ul>";
    html += "		</div>";
    html += "	</div>";
    html += "</div>";

    bd.append(html).addClass('of_h');
    historyLock && bd.addClass("has_layer_popup");

    var lp = $(".layer_popup");

    setTimeout(function(){
        lp.addClass('open');
    }, 240);

    lp.find(".btn_cancel").on("click", function() {
        historyLock && bd.removeClass("has_layer_popup");
        bd.removeClass('of_h');
        lp.removeClass('open');
        setTimeout(function(){
            lp.hide().remove();
        }, 240);

        nf !== undefined && nf();
    });

    lp.find(".btn_common").on("click", function() {
        historyLock && bd.removeClass("has_layer_popup");
        bd.removeClass('of_h');
        lp.removeClass('open');
        setTimeout(function(){
            lp.hide().remove();
        }, 240);

        cf !== undefined && cf();
    });

    lp.find(".btn_confirm").on("click", function() {
        historyLock && bd.removeClass("has_layer_popup");
        bd.removeClass('of_h');
        lp.removeClass('open');
        setTimeout(function(){
            lp.hide().remove();
        }, 240);

        pf !== undefined && pf();
    });
}

function layerPopupBackTrigger() {

    var lp = $(".layer_popup");
    (lp.length > 0) && lp.find(".btn_cancel").trigger('click');

}

function eventLayerPopup() {
	
	var 
		bd = $('body'),
		ep = $('.event.popup');
	
	ep.length > 0 && ep.hasClass('open') && bd.addClass('has_layer_popup');
	
}

function eventLayerPopupBackTrigger() {
	
	var ep = $('.event.popup');
	ep.length > 0 && ep.hasClass('open') && ep.find('.btn_close').trigger('click');
	
}
		
function boardListMoveScroll() {
			
    if ($('.board_list').length > 0 && boardPageIndex !== '') {
        
        var bUnit = ((Number(boardPageIndex) - 1) * 10) + 1;
        var bUnitTop = $('.board_list > ul > li:nth-child(' + bUnit + ')').position().top;	
        
        if (pIndex > 1) {
            $(window).scrollTop(bUnitTop);
        }
        
    }
    
}

function formAreaTitleWidthCheck() {

    var fa = $('.form_area');

    if (fa.length > 0) {
    	
    	fa.css('opacity', 0);
    		
		fa.each(function() {

            var 
                thList = $(this).find('> ul > li'),
                thArr = [],
                isNone = $(this).hasClass('pd_none');

            if (isNone) { return }

            if ($(this).find('> ul > li').find('.fa_title').length > 0) {
                thList.each(function() {
                    thArr.push($(this).find('.fa_title').outerWidth());
                });
    
                thArr.sort(function(a, b) { return b - a; });
    
                thList.css('padding-left', thArr[0] + 16);
            }
            
        });
    		
    	setTimeout(function(){    			
    		fa.css('opacity', 1);    		
    	}, 240);

    }
}

function subTabScroll() {

    var st = $('.s_tab');

    if (st.length > 0) {

        st.each(function(){

            var
                stackW = 0,
                thPd = 16,
                thW = $(this).outerWidth(),
                thUl = $(this).find('ul'),
                thLi = $(this).find('li'),
                onList = $(this).find('.on'),
                onListX = onList.position().left;

            $(this).scrollLeft(onListX - (thPd / 2));

            thLi.each(function(){
                stackW = stackW + $(this).outerWidth();
            });

            thW < stackW ? thUl.css('width', stackW + thPd) : thUl.removeAttr('style');

        });

    }

}

function footerFontSize() {

    var 
        btnM = $('.footer .btn_minus'),
        btnP = $('.footer .btn_plus');

    btnM.click(function(){
        var 
            bdStatus = $('body').attr('data-font');

        if (bdStatus === '3') {
            $('body').attr('data-font', 2);
            localStorage.setItem(NU.homeFontSize, JSON.stringify(2));
        } else if (bdStatus === '2') {
            $('body').attr('data-font', 1);
            localStorage.setItem(NU.homeFontSize, JSON.stringify(1));
        } else {
            $('body').attr('data-font', 0);
            localStorage.setItem(NU.homeFontSize, JSON.stringify(0));            
        }

        return false;
    });

    btnP.click(function(){
        var 
            bdStatus = $('body').attr('data-font');

        if (bdStatus === '0') {
            $('body').attr('data-font', 1);
            localStorage.setItem(NU.homeFontSize, JSON.stringify(1));
        } else if (bdStatus === '1') {
            $('body').attr('data-font', 2);
            localStorage.setItem(NU.homeFontSize, JSON.stringify(2));
        } else {
            $('body').attr('data-font', 3);
            localStorage.setItem(NU.homeFontSize, JSON.stringify(3));            
        }

        return false;

    });
}

function subGuideArea() {

    var 
        bg = $('.box_guide'),
        bgMinH = 80;

    if (bg.length > 0) {

        bg.each(function(){
            var bgInH = $(this).find('> div').outerHeight();
            bgInH < bgMinH && $(this).addClass('box_guide_short');
        });
        
    }

    var bg02 = $('.box_guide02');

    if (bg02.length > 0) {
        bg02.each(function(){
            var isLtl = $(this).find('.lt_l');
            isLtl.length <= 0 && $(this).addClass('pb_none');
        });
    }

}

function layerFullIsBottom() {
    var lf = $('.layer_full');
    if (lf.length > 0) {
        lf.each(function(){
            var isBottom = $(this).find('.lf_b');
            isBottom.length > 0 && $(this).addClass('is_bottom');
        });
    }
}

$(document).ready(function() {
    /* after login */
    // NB.boolLogged = true;
    wrapAddClassAfterlogin();
    newWindow('body');
    hasQnb();
    formAreaTitleWidthCheck();
    setTimeout(inlineblockWidthCheck, 480);
    setTimeout(fUnitTextWidth, 480);
    hasBottomFixedBtn();
    myCardInit();
	myCardToggle();

    setTimeout(tabScrl, 480);
    classToggle();
    boardListMoveScroll();
    setTimeout(subTabScroll, 160);

    subMyCardToggle();
    footerFontSize();

    subGuideArea();
    layerFullIsBottom();
    
});

$(window).resize(function(){
    setTimeout(subTabScroll, 160);
});






/*
 * Sub Content
 *
 */

/* 건강검진 실시안내 */
function conductSelect() {

    var 
        rms = $('.conduct_select'),
        rmsT = rms.find('.lt_l > span'),
        rmsL = rms.find('.lt_c > ul > li'),
        rmsLLink = rms.find('.lt_c > ul > li > a');

        conductList = $('.conduct_list_wrap > div');
    
    if (rms.length > 0) {

        rmsT.text(rmsL.first().find('span').text());
        rmsL.first().addClass('checked');
        conductList.first().addClass('on');

        rmsLLink.click(function(){

            var 
                th = $(this),
                thP = th.parent(),
                thIndex = thP.index(),
                isOpen = thP.hasClass('open'),
                thPP = th.parents('.lt_p'),
                thText = th.find('span').text();

            if (!isOpen) {
                thP.siblings().removeClass('checked');
                thP.addClass('checked');
                rmsT.text(thText);
            }
            
            thPP.removeClass('open');
            conductList.removeClass('on');
            conductList.eq(thIndex).addClass('on');
    
            return false;
        });

    }

}

/* s: pagination */
var _firstPageLabel = "";//"<a class=\"first\" href=\"#\" onclick=\"{0}({1}); return false;\"></a>";							
var _previousPageLabel = "<li role=\"button\" class=\"prev\" onclick=\"{0}({1}); return false;\"><span>이전</span></li>";
var _previousPageLabelNonClick = "<li role=\"button\" class=\"prev disabled\"><span>이전</span></li>";
						
var _currentPageLabel = "<li role=\"button\" class=\"page on\"><span>{0}</span></li>";
var _otherPageLabel = "<li role=\"button\" class=\"page\" onclick=\"{0}({1}); return false;\"><span>{2}</span></li>";        

var _nextPageLabel = "<li role=\"button\" class=\"next\" onclick=\"{0}({1}); return false;\"><span>다음</span></li>";
var _nextPageLabelNonClick = "<li role=\"button\" class=\"next disabled\" ><span>다음</span></li>";
var _lastPageLabel = "";//"<a class=\"last\" href=\"#\" onclick=\"{0}({1}); return false;\"></a>";

function fn_makePaginationTag(pageNo, pageSize, pageUnit, totCnt, jfunction) {
	_currentPageNo = pageNo;
	_recordCountPerPage = pageSize;
	_pageSize = pageUnit;
	_totalRecordCount = totCnt;

	return fn_renderPaginationTag(jfunction);
}

function fn_renderPaginationTag(jsFunction) {
	var retStr = "";
	
	var firstPageNo = getFirstPageNo();
	var firstPageNoOnPageList = getFirstPageNoOnPageList();
	var lastPageNoOnPageList = getLastPageNoOnPageList();
	var lastPageNo = getLastPageNo();
	
	if(firstPageNoOnPageList > _pageSize){
		retStr += _previousPageLabel.replace("{0}", jsFunction).replace("{1}", parseInt(firstPageNoOnPageList)-1);
	}else{
		retStr += _previousPageLabelNonClick.replace("{0}", jsFunction).replace("{1}", firstPageNo);
       }
		
	for(var i=firstPageNoOnPageList;i<=lastPageNoOnPageList;i++){
		if(i==_currentPageNo){
			// 데이타가 있을 경우에면 현재 페이지 출력
			if (getTotalRecordCount() > 0) {
				retStr += _currentPageLabel.replace("{0}", i);
			} 
    	}else{
    		retStr += _otherPageLabel.replace("{0}", jsFunction).replace("{1}", i).replace("{2}", i);
    	}
		
    }
    
	if(lastPageNoOnPageList < _totalPageCount){
       	retStr += _nextPageLabel.replace("{0}", jsFunction).replace("{1}", parseInt(firstPageNoOnPageList)+parseInt(_pageSize));
       }else{
       	retStr += _nextPageLabelNonClick.replace("{0}", jsFunction).replace("{1}", lastPageNo);
       }

	return retStr;
}

var _currentPageNo;
var _recordCountPerPage;
var _pageSize;
var _totalRecordCount;

function getRecordCountPerPage() {
	return _recordCountPerPage;
}

function getPageSize() {
	return _pageSize;
}

function getCurrentPageNo() {
	return _currentPageNo;
}

function getTotalRecordCount() {
	return _totalRecordCount;
}

var _totalPageCount;
var _firstPageNoOnPageList;
var _lastPageNoOnPageList;
var _firstRecordIndex;
var _lastRecordIndex;

function getTotalPageCount() {
	if (getTotalRecordCount() == 1) {
		_totalPageCount = 1;
		return _totalPageCount;
	}
	_totalPageCount = parseInt((getTotalRecordCount() - 1) / getRecordCountPerPage()) + 1;
	return _totalPageCount;
}

function getFirstPageNo() {
	return 1;
}

function getLastPageNo() {
	return getTotalPageCount();
}

function getFirstPageNoOnPageList() {
	if (getCurrentPageNo() == 1) {
		_firstPageNoOnPageList = 1;
		return _firstPageNoOnPageList;
	}
	
	_firstPageNoOnPageList = parseInt((getCurrentPageNo() - 1) / getPageSize()) * getPageSize() + 1;
	return _firstPageNoOnPageList;
}

function getLastPageNoOnPageList() {
	_lastPageNoOnPageList = parseInt(getFirstPageNoOnPageList()) + parseInt(getPageSize()) - 1;
	if (_lastPageNoOnPageList > getTotalPageCount()) {
		_lastPageNoOnPageList = getTotalPageCount();
	}
	return _lastPageNoOnPageList;
}

function getFirstRecordIndex() {
	if (getCurrentPageNo() == 1) {
		_firstRecordIndex = 1;
		return _firstRecordIndex;
	}
	
	_firstRecordIndex = (getCurrentPageNo() - 1) * getRecordCountPerPage();
	return _firstRecordIndex;
}

function getLastRecordIndex() {
	_lastRecordIndex = getCurrentPageNo() * getRecordCountPerPage();
	return _lastRecordIndex;
}
/* e: pagination */

$(document).ready(function(){
    conductSelect();
    domRatio('.banner_detail .box_w > a', (2/3));
    domRatio('.webtoon_list .box_w > a', (13/32));
});