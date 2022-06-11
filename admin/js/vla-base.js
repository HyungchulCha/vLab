/* Responsive Status Check */
function sCheck(){
	
	var	wc	=	$('.s_check'),
		wcP	=	wc.find('.sc_p').css('display'),
		wcT	=	wc.find('.sc_t').css('display'),
		wcM	=	wc.find('.sc_m').css('display');
	
	
	return "block" === wcP ? "p" : "block" === wcT ? "t" : "block" === wcM ? "m" : void 0

}
/* Slide */
function fnSlide({ dom, loop, auto, center, direct, effect, breakPoint }) {

    var $dom = $(dom),
        status = sCheck();

    if ($dom.length > 0) {

        /* s: set */
        var strSW = 's_w',
            strSL = 'sw_l'
            sL = $dom.find('.' + strSL),
            sLleng = sL.length,
            sC = $dom.find('.s_c'),
            sCleng = sC.length,
            strBtnPrev = '.btn_prev',
            strBtnNext = '.btn_next',
            btnPrev = $dom.find(strBtnPrev),
            btnNext = $dom.find(strBtnNext),
            btnPause = $dom.find('.btn_pause'),
            btnPlay = $dom.find('.btn_play'),
            isBtn = (btnPrev.length > 0) || (btnNext.length > 0),
            sP = $dom.find('.s_p'),
            sPleng = sP.length;

        sLleng === 0 && (sC.hide(),sP.hide(),btnPrev.hide(),btnNext.hide(),btnPause.hide(),btnPlay.hide());

        var sSlide = new Swiper(dom, {
            wrapperClass: strSW,
            slideClass: strSL,
            loop: loop,
            autoplay: auto,
            centeredSlides: center,
            direction: !direct ? 'horizontal' : direct,
            effect: !effect ? 'slide' : effect,
            slidesPerView: "auto",
            slidesPerGroup: 1,
            nested: true,
            pagination: sPleng > 0 && {
                el: sP,
                clickable: true,
                renderBullet: function(i, c) {
                    return '<span class="' + c + '">' + (i + 1) + "</span>";
                }
            },
            navigation: isBtn && {
                prevEl: strBtnPrev,
                nextEl: strBtnNext
            },
            on: {
                init: function() {
                    sCleng > 0 && ($dom.find('.s_c strong').text(1), $dom.find('.s_c span').text(sLleng));
                    //$dom.find('.sw_l').find('a').attr('tabindex', '0');
                    $dom.find('.swiper-slide-duplicate').find('a').attr('tabindex', '-1');
                }
            }
        });

        sSlide.on("transitionEnd", function() {
            sCleng > 0 && $dom.find('.s_c strong').text(sSlide.realIndex + 1);
        });

        var thBtnPause;
        var thBtnPlay;

        if (auto) {
            btnPlay.hide();
            btnPause.click(function() {
                sSlide.autoplay.stop();
                thBtnPause = $(this);
                thBtnPause.hide();
                thBtnPause.next().show();
                return false;
            });
            btnPlay.click(function() {
                sSlide.autoplay.start();
                thBtnPlay = $(this);
                thBtnPlay.hide();
                thBtnPlay.prev().show();
                return false;
            });
        } else {
            btnPlay.hide();
            btnPause.hide();
        }

        $dom.find('.s_w .sw_l a').focusin(function() {

            var isFirstIndex = loop ? $(this).parents('.sw_l').attr('data-swiper-slide-index') === '0' : $(this).parents('.sw_l').index() === 0;

            if (auto) {
                sSlide.autoplay.stop();
                $dom.find('.btn_pause').hide();
                $dom.find('.btn_play').show();
            }
            
            loop ? (isFirstIndex && sSlide.slideToLoop(0)) : (isFirstIndex && sSlide.slideTo(0));

        });

        $dom.find('.s_w').focusout(function() {

            if (auto) {
                sSlide.autoplay.start();
                $dom.find('.btn_pause').show();
                $dom.find('.btn_play').hide();
            }

        });

        var domLastFocus = loop ? $dom.find('.sw_l[data-swiper-slide-index="' + (sLleng - 1) + '"]').find('a') : $dom.find('.sw_l:last-child').find('a');

        domLastFocus.keydown(function(e) {

            var keyCode = e.keyCode || e.which;
            if (keyCode === 9) {
                sSlide.slideTo(0);
                if (auto) {
                    sSlide.autoplay.start();
                    $dom.find('.btn_pause').show();
                    $dom.find('.btn_play').hide();
                }
            }

        });

        /* e: set */

        // breakPoint 프로퍼티를 가지고 있으면
        if (breakPoint !== undefined) {

            $(window).on('resize', $.debounce(80, function(){

                var status = sCheck(),
                    isSame = breakPoint.includes(status);

                // 현재 상태와 breakPoint가 같을 때
                if (isSame) {
                    // 이미 실행한 상태면 return
                    if (sSlide !== undefined) {
                        return;
                    // 실행하지 않은 상태면 slide
                    } else {

                        /* s: set */
                        var strSW = 's_w',
                            strSL = 'sw_l'
                            sL = $dom.find('.' + strSL),
                            sLleng = sL.length,
                            sC = $dom.find('.s_c'),
                            sCleng = sC.length,
                            // sCCurrent = sC.find('strong'),
                            // sCTotal = sC.find('span'),
                            strBtnPrev = '.btn_prev',
                            strBtnNext = '.btn_next',
                            btnPrev = $dom.find(strBtnPrev),
                            btnNext = $dom.find(strBtnNext),
                            btnPause = $dom.find('.btn_pause'),
                            btnPlay = $dom.find('.btn_play'),
                            isBtn = (btnPrev.length > 0) || (btnNext.length > 0),
                            sP = $dom.find('.s_p'),
                            sPleng = sP.length;

                        sLleng === 0 && (sC.hide(),sP.hide(),btnPrev.hide(),btnNext.hide(),btnPause.hide(),btnPlay.hide());
                        
                        sSlide = new Swiper(dom, {
                            wrapperClass: strSW,
                            slideClass: strSL,
                            loop: loop,
                            autoplay: auto,
                            centeredSlides: center,
                            direction: !direct ? 'horizontal' : direct,
                            effect: !effect ? 'slide' : effect,
                            slidesPerView: "auto",
                            slidesPerGroup: 1,
                            nested: true,
                            pagination: sPleng > 0 && {
                                el: sP,
                                clickable: true,
                                renderBullet: function(i, c) {
                                    return '<span class="' + c + '">' + (i + 1) + "</span>";
                                }
                            },
                            navigation: isBtn && {
                                prevEl: strBtnPrev,
                                nextEl: strBtnNext
                            },
                            on: {
                                init: function() {
                                    sCleng > 0 && ($dom.find('.s_c strong').text(1), $dom.find('.s_c span').text(sLleng));
                                }
                            }
                        });
    
                        sSlide.on("transitionEnd", function() {
                            sCleng > 0 && $dom.find('.s_c strong').text(sSlide.realIndex + 1);
                        });
    
                        if (auto) {
                            btnPlay.hide();
                            btnPause.click(function() {
                                sSlide.autoplay.stop();
                                btnPause.hide();
                                btnPlay.show();
                                return false;
                            });
                            btnPlay.click(function() {
                                sSlide.autoplay.start();
                                btnPlay.hide();
                                btnPause.show();
                                return false;
                            });
                        } else {
                            btnPlay.hide();
                            btnPause.hide();
                        }
                        /* e: set */
    
                    }
                // 현재 상태와 breakPoint 상태가 다른 경우
                } else {
                    // 실행되지 않았다면 return
                    if (sSlide === undefined) {
                        return;
                    // 값이 있을 때 (이미 한번 실행했다는 의미) destroy
                    } else {
                        sSlide.destroy(true, true);
                        sSlide = undefined;
                        $dom.find('.s_w').removeAttr('style');
                        $dom.find('.sw_l').removeAttr('style');
                    }
                }

            }));

            var isSame = breakPoint.includes(status);

            // 현재 상태와 breakPoint 상태가 다르더라도 무조건 한번 실행하고 destroy해야 한다.
            if (!isSame) {
                sSlide.destroy(true, true);
                sSlide = undefined;
                $dom.find('.s_w').removeAttr('style');
                $dom.find('.sw_l').removeAttr('style');
            }

        }
    
    }
    
}

/* slide tab */
function fnSlideTab() {

    if ($('.tab_scrl').length > 0) {
        new Swiper('.tab_scrl', {
            wrapperClass: "s_w",
            slideClass: "sw_l",
            slidesPerView: "auto",
            nested: true,
            freeMode: true
        });
    }
    
}

/* Tab Common */
function tabCommon(wrapClass) {

    var tabWrap = $(wrapClass),
        tabList = tabWrap.find(".tab_list li"),
        tabContent = tabWrap.find(".tab_content");

    tabList.removeClass("on");
    tabList.first().addClass("on");
    tabList.find("a .hdn").remove();
    tabList.first().find("a").append('<em class="hdn">선택된 탭</em>');
    tabContent.removeClass("on");
    tabContent.first().addClass("on");

    tabList.find("a").click(function() {

        var 
        	thP = $(this).parent(),
            thPIdx = thP.index(),
        	isOn = thP.hasClass("on");

        if (!isOn) {
            tabList.removeClass("on");
            tabList.find("a .hdn").remove();
            thP.addClass("on");
            $(this).append('<em class="hdn">선택된 탭</em>');
            tabContent.removeClass("on");
            tabContent.eq(thPIdx).addClass('on');
        }
        
        var sTab = $(this).parents('.s_tab'),
        	isSTab = sTab.length > 0,
        	thPIdx = thP.index(),
	        thPLeft = thPIdx === 0 ? (thP.position().left - 8) : (thP.position().left);
        
        if (isSTab) {
        	sTab.animate({ scrollLeft: thPLeft }, 160, 'swing');
        }

        return false;
    });
    
}

/* Tab Accessibility */
function tabAccess(wrapClass) {

    var tabWrap = $(wrapClass),
        tabBox = tabWrap.find(".tab_box"),
        tabTitle = tabWrap.find(".tab_box .tab_title a");

    tabBox.removeClass("on");
    tabBox.first().addClass("on");
    tabBox.find(".tab_title a .hdn").remove();
    tabBox.first().find(".tab_title a").append('<em class="hdn">선택된 탭</em>');

    tabTitle.click(function() {
        tabBox.removeClass("on");
        $(this).parents(".tab_box").addClass("on");
        tabBox.find(".tab_title a .hdn").remove();
        $(this).append('<em class="hdn">선택된 탭</em>');

        return false;
    });

}

/* after hasCheck */
function afterHasCheck(dom, f, isResize, ratio) {
    var $dom = $(dom);
    $dom.length > 0 && $dom.each(!ratio ? f : function(){
        f($(this), ratio);
    });
    isResize && $(window).on('resize', $.debounce(80, function(){
        $dom.length > 0 && $dom.each(!ratio ? f : function(){
            f($(this), ratio);
        });
    }));
}

/*
    className : lt_l
    afterHasCheck('.lt_l', listToggle)
 */
function listToggle() {

    var th = $(this),
        thP = th.parents('.lt_p'),
        isOpen = thP.hasClass("open");

    !isOpen ? ($(this).append('<em class="hdn">열기</em>')) : ($(this).append('<em class="hdn">닫기</em>'));

    th.on('click', function() {

        var thP = $(this).parent('.lt_p'),
            isOpen = thP.hasClass("open"),
            thTxt = $(this).find(".hdn");

        if (!isOpen) {
            thP.addClass("open");
            thTxt.text("닫기");
        } else {
            thP.removeClass("open");
            thTxt.text("열기");
        }

        return false;

    });
}
function targetToggle() {

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

}
/*
    className : a
    afterHasCheck('a', newWindow)
 */
function newWindow() {
    var th = $(this),
        thTarget = th.attr("target"),
        thTitle = th.attr("title");

    if (thTarget === "_blank") {
        th.append('<i class="ico_window"><em class="hdn">새창</em></i>');    
        (thTitle === undefined || thTitle === null || thTitle === "") && th.attr("title", "새창");
    }
}
/*
    className : [class^="tab_"] .on a
    afterHasCheck('[class^="tab_"] .on a', tabSelected)
 */
function tabSelected() {
    $(this).attr("title", '선택된 탭');
}
/* 
    className : target 
    afterHasCheck(target, domRatio, true, ratio)
*/
function domRatio(th, ratio) {
    th.css('height', th.outerWidth() * ratio);
}
/* 
    className : ib_w 
    afterHasCheck('.ib_w', inlineBlockWidth)
*/
function inlineBlockWidth() {
    var isBtn = $(this).find('.btn').length;
    $(this).parent().css({
        'width': isBtn > 0 ? ($(this).outerWidth() + 4) : $(this).outerWidth()
    });
}
/* 
    className : f_unit
    afterHasCheck('.f_unit', fUnitTextWidth)
*/
function fUnitTextWidth() {
    $(this).find('input').css({
        'padding-right': $(this).find('.f_txt').outerWidth()
    })
}
/* 
    className : form_area
    afterHasCheck('.form_area', formAreaTitleWidth)
*/
function formAreaTitleWidth() {

    var arr = [],
        th = $(this),
        thList = th.find('> ul > li'),
        thtitle = th.find('.fa_title'),
        isTitle = thtitle.length > 0,
        isPdNone = th.hasClass('pd_n'),
        per = 16;

    if (isPdNone) return;

    if (isTitle) {
        thList.each(function(){
            arr.push($(this).find('.fa_title').outerWidth());
        });
        arr.sort(function(a, b){ return b - a });
        thList.css('padding-left', arr[0] + per);
    }

}
/* 
    className : s_tab
    afterHasCheck('.s_tab', subTabScroll)
*/
function subTabScroll() {

    var th = $(this),
        thW = th.outerWidth(),
        thUl = th.find('ul'),
        thLi = th.find('li'),
        liOn = th.find('.on'),
        liOnPosX = liOn.position().left,
        thPd = 16,
        x = 0;

    th.scrollLeft(liOnPosX - (thPd / 2));
    thLi.each(function(){
        x =  x + $(this).outerWidth();
    });
    thW < x ? thUl.css('width', x + thPd) : thUl.removeAttr('style');

}

/* header */
function headerHandle() {

    var 
        bd = $('body'),
        bdbg = $('.body_bg'),
        tglSearch = $('.tgl_search'),
        tglUser = $('.tgl_user'),
        tglMenu = $('.tgl_menu'),
        btnCloseGN = $('.gn .btn_close'),
        btnCloseGlobalSearch = $('.global_search .btn_close'),
        btnCloseGlobalMenu = $('.global_menu .btn_close'),
        mm = $('.mm'),
        gn = $('.gn'),
        gs = $('.global_search'),
        gm = $('.global_menu'),
        hUser = $('.h_user'),
        hMenu = $('.h_menu'),
        gsListLast = $('.global_search .gs_fv_list a:last-child'),
        mmListLast = $('.mm .mm_list > ul > li:last-child > a'),
        gnListLast = $('.gn .gn_list > ul > li:last-child > div > ul > li:last-child > a');
    
    /*
        - 유저 영역 마우스 오버 시
        - 유저 영역 마우스 아웃 시
        - 유저 영역 포커스 진입 시
        - 유저 마지막 리스트에서 벗어날 때
        - 유저 버튼에서 역방향으로 벗어날 때
    */
    hUser.on('mouseenter', function(){
        $('.tgl_user').length > 0 && !(mm.hasClass('hover')) && mm.addClass('hover');
    });
    hUser.on('mouseleave', function(){
        $('.tgl_user').length > 0 && mm.hasClass('hover') && mm.removeClass('hover');
    });
    hUser.on('focusin', function(){
        $('.tgl_user').length > 0 && !(mm.hasClass('hover')) && mm.addClass('hover');
    });
    mmListLast.on('keydown', function(e){
        var kc = e.keyCode || e.which;
        if (kc === 9) {
            mm.hasClass('hover') && mm.removeClass('hover');
        }
    });
    tglUser.on('keydown', function(e){
        var kc = e.keyCode || e.which;
        if (kc === 9 && e.shiftKey) {
            mm.hasClass('hover') && mm.removeClass('hover');
        }
    });

    /*
        pc
        - 전체메뉴 영역 마우스 오버 시
        - 전체메뉴 영역 마우스 아웃 시 
        - 전체메뉴 영역 포커스 진입 시
        - 전체메뉴 첫 리스트에서 역방향 포커스 누를 때
        - 전체메뉴 마지막 리스트에서 벗어날 때

        tablet, mobile
        - 전체메뉴 버튼 클릭 시
        - 전체메뉴 닫기 버튼 클릭 시
        
        window resize
        - tablet, mobile -> pc 넘어갈 때
    */
   /*
    hMenu.on('mouseenter', function(){
        sCheck() === 'p' && !(gn.hasClass('hover')) && gn.addClass('hover');
    });
    hMenu.on('mouseleave', function(){
        sCheck() === 'p' && gn.hasClass('hover') && gn.removeClass('hover');
    });
    hMenu.on('focusin', function(){
        sCheck() === 'p' && !(gn.hasClass('hover')) && gn.addClass('hover');
    });
    gnListLast.on('keydown', function(e){
        var kc = e.keyCode || e.which;
        if (kc === 9) {
            sCheck() === 'p' && gn.hasClass('hover') && gn.removeClass('hover');
        }
    });
    tglMenu.on('keydown', function(e){
        var kc = e.keyCode || e.which;
        if (kc === 9 && e.shiftKey) {
            sCheck() === 'p' && gn.hasClass('hover') && gn.removeClass('hover');
        }
    });
    */
    tglMenu.on('click', function(){
        sCheck() === 'p' && !(gn.hasClass('hover')) && gn.addClass('hover');
        (sCheck() === 't' || sCheck() === 'm') && (bd.addClass('of_h'), bdbg.addClass('on'), gm.addClass('hover'));
        return false;
    });
    btnCloseGN.on('click', function(){
        gn.hasClass('hover') && gn.removeClass('hover');
    });
    gnListLast.on('keydown', function(e){
        var kc = e.keyCode || e.which;
        if (kc === 9) {
            sCheck() === 'p' && gn.hasClass('hover') && gn.removeClass('hover');
        }
    });
    btnCloseGlobalMenu.on('click', function(){
        (bd.removeClass('of_h'), bdbg.removeClass('on'), gm.removeClass('hover'));
        return false;
    });
    $(window).resize(function(){
        (sCheck() === 't' || sCheck() === 'm') && gn.removeClass('hover');
        sCheck() === 'p' && bd.hasClass('of_h') && bdbg.hasClass('on') && gm.hasClass('hover') && (bd.removeClass('of_h'), bdbg.removeClass('on'), gm.removeClass('hover'));
    });

    /*
        - 검색 버튼 클릭 시
        - 닫기 버튼 클릭 시
        - 자주 찾는 검색어 마지막 리스트 포커스 벗어날 때
    */
    tglSearch.on('click', function(){
        !(gs.hasClass('hover')) && (bd.addClass('of_h'), bdbg.addClass('on'), gs.addClass('hover'), btnCloseGlobalSearch.focus());
        return false;
    });
    btnCloseGlobalSearch.on('click', function(){
        gs.hasClass('hover') && (bd.removeClass('of_h'), bdbg.removeClass('on'), gs.removeClass('hover'), tglSearch.focus());
        return false;
    });
    gsListLast.on('keydown', function(e){
        var kc = e.keyCode || e.which;
        if (kc === 9) {
            gs.hasClass('hover') && (bd.removeClass('of_h'), bdbg.removeClass('on'), gs.removeClass('hover'), tglSearch.focus());
        }
    });
}

var modalLabViewCount = 0;
var modalLabListCount = 0;

function modalTgl() {
    var btnModal = $('.btn_modal');

    btnModal.on('click', function(){
        var target = $(this).attr('data-modal-target');
        $('#' + target).addClass('open');
        $('#' + target).find('.btn_close').first().focus();
        $('body').addClass('of_h');

        afterHasCheck('.ib_w', inlineBlockWidth);

        if ($('.modal-labview').length > 0 && modalLabViewCount === 0) {
            setTimeout(function(){
                afterHasCheck('.modal-labview .lab_view .lv_t .lvt_img > i', domRatio, true, (3 / 4));
                fnSlide({ dom: '.modal-labview .lab_view .lv_slide', loop: false, auto: false, center: false });
                afterHasCheck('.modal-labview .lab_view .lv_slide .s_w .sw_l > div > a', domRatio, true, (1 / 1));
                modalLabViewCount = 1;
            }, 160);            
        }

        if ($('.modal-lablist').length > 0 && modalLabListCount === 0) {
            setTimeout(function(){
                afterHasCheck('.modal-lablist .lab_card .lc_img', domRatio, true, (3 / 4));
                modalLabListCount = 1;
            }, 160);
        }

        return false;
    });

    $('.modal .btn_close').on('click', function(){
        var 
            thP = $(this).parents('.modal'),
            target = thP.attr('id');
        thP.removeClass('open');
        $('body').removeClass('of_h');
        $("[data-modal-target='" + target + "']").focus();
        return false;
    });
}

function popupLabReview() {
    var btnReviewTgl = $('.pl_review > a'),
    plr = $('.popup_lab_review')
    btnClose = plr.find('.btn_close'),
    bd = $('body');

    if (plr.length > 0) {
        btnReviewTgl.on('click', function(){
            plr.addClass('open');
            bd.addClass('of_h');
            btnClose.focus();
            return false;
        });
        btnClose.on('click', function(){
            plr.removeClass('open');
            bd.removeClass('of_h');
            btnReviewTgl.focus();
            return false;
        });
        $(window).on('resize', $.debounce(80, function(){
            if (sCheck() !== 'p' && plr.hasClass('open')) {
                plr.removeClass('open');
                bd.removeClass('of_h');
            }
        }));
    }    
}

function popupLabHeaderTgl() {
    var pl = $('.popup_lab'),
    plh = pl.find('.p_header'),
    plhEvent;

    if (pl.length > 0) {

        sCheck() === 'p' ? plh.removeClass('over') : plh.addClass('over');

        plh.on('mouseenter', function(){
            if (sCheck() === 'p') {
                clearTimeout(plhEvent);
                plh.addClass('over');
            }
        });
        plh.on('mouseleave', function(){
            if (sCheck() === 'p') {
                plhEvent = setTimeout(function(){
                    plh.removeClass('over');
                }, 1000);
            }
        });

        $(window).on('resize', $.debounce(80, function(){
            sCheck() === 'p' ? plh.removeClass('over') : plh.addClass('over');
        }));
        
    }
}

function vlaLnbTgl() {
    var lList = $('.lnb .l_list li');
    lList.each(function(){
        if ($(this).find('> div').length > 0) {
            $(this).addClass('lt_p');
            $(this).find('> a').addClass('lt_l');
        }
    });
}

$(document).ready(function(){
    
    vlaLnbTgl();

    headerHandle();

    afterHasCheck('a', newWindow);
    afterHasCheck('.lt_l', listToggle);
    afterHasCheck('.dt_l', targetToggle);
    afterHasCheck('[class^="tab_"] .on a', tabSelected);
    afterHasCheck('.ib_w', inlineBlockWidth);
    afterHasCheck('.f_unit', fUnitTextWidth);
    //afterHasCheck('.form_area', formAreaTitleWidth);
    afterHasCheck('.s_tab', subTabScroll);

    modalTgl();
    popupLabReview();
    popupLabHeaderTgl();

});