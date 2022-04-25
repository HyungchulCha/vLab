// Na Home Constant Value
var NH = {

    cnBody: 'body',
    cnNaHome: '.na_home',
    cnHeader: '.header',
    cnHeaderB: '.header .h_b',
    cnHeaderBList: '.header .h_b .hbs_w .hbsw_l',
    cnHomeSlide: '.home_slide',
    cnHomeSlideList: '.home_slide .hs_w .hsw_l',

    strHeaderBSlideWrap: 'hbs_w',
    strHeaderBSlideList: 'hbsw_l',
    strHomeSlideWrap: 'hs_w',
    strHomeSlideList: 'hsw_l',

    strOn: 'on',
    strOpen: 'open',
    strFixed: 'fixed',

    numInitialY: 0,
    boolIsScroll: false,

    objHB: null,
    objHS: null,

    boolHS01: false,
    boolHS02: false,
    boolHS03: false,
    boolHS04: false,
    boolHS05: false,
    boolHS06: false,
    boolHS07: false,
    boolHS08: false,
    boolHSLog01: false,
    boolHSLog02: false,
    boolHSLog03: false,
    boolHSLog04: false,
    boolHSLog05: false,
    boolHSLog06: false,
    boolHSLog07: false,
    boolHSLog08: false,

}

/* home gnb list width check */
function homeGnbWidth() {

    var 
        win = $(window),
        winW = win.outerWidth(),
        HBList = $(NH.cnHeaderBList),
        HBListLength = HBList.length,
        wrapPd = 8,
        listPd = 24,
        total = 0;
        totalInsertPd = 0;

    HBList.css('opacity', 0);
    HBList.each(function(){
        var th = $(this).find('span'),
        thW = th.outerWidth();
        total = total + thW;
        totalInsertPd = totalInsertPd + thW + listPd;
    });
    total = total + wrapPd;
    totalInsertPd = totalInsertPd + wrapPd;

    if (winW < totalInsertPd) {
        NH.boolIsScroll = true;
        HBList.css('padding', '0 ' + (listPd / 2) + 'px');
        NH.objHB = new Swiper(NH.cnHeaderB, {
            wrapperClass: NH.strHeaderBSlideWrap,
            slideClass: NH.strHeaderBSlideList,
            slidesPerView: 'auto',
            freeMode: true,
        });
    } else {
        NH.boolIsScroll = false;
        NH.objHB && NH.objHB.destroy();
        HBList.css('padding', '0 ' + ((winW - total) / (HBListLength * 2)) + 'px');
    }

    HBList.css('opacity', 1);

    $(window).on('resize', $.debounce(80, function(){
        
        var _winW = $(window).outerWidth();

        HBList.css('opacity', 0);

        if (_winW < totalInsertPd) {
            NH.boolIsScroll = true;
            HBList.css('padding', '0 ' + (listPd / 2) + 'px');
            NH.objHB = new Swiper(NH.cnHeaderB, {
                wrapperClass: NH.strHeaderBSlideWrap,
                slideClass: NH.strHeaderBSlideList,
                slidesPerView: 'auto',
                freeMode: true,
            });
        } else {
            NH.boolIsScroll = false;
            NH.objHB && NH.objHB.destroy();
            HBList.css('padding', '0 ' + ((_winW - total) / (HBListLength * 2)) + 'px');
        }

        HBList.css('opacity', 1);

    }));

    
}

// Home Gnb Slide
function homeGnbSlide() {

    var HBList = $(NH.cnHeaderBList),    
    nhr = JSON.parse(localStorage.getItem(NU.homeToggleRefer)),
    isDirect = JSON.parse(localStorage.getItem(NU.directCheck));

    nhrObj = nhr[0] || {};
    nhrObj.home = nhr.home || 0;
    nhrObj.scrollTop = nhr.scrollTop || 0;

    NH.objHS = new Swiper(NH.cnHomeSlide, {
        wrapperClass: NH.strHomeSlideWrap,
        slideClass: NH.strHomeSlideList,
        on: {
            init: function() {

                // 현재는 메인콘텐츠가 4개 밖에 없어서 시작하자마자 일괄처리
                // 추후에 메인콘테츠가 많아지면 분기처리(하단 개별함수에 맞게 넣으면 됨

                var 
                    hs01banner02List = $('.hs01_banner02 .box_w .s_w .sw_l'),
                    hs02status01List = $('.hs02_status01 .box_w .s_w .sw_l');

                fnSlide(".hs01_banner01 > div", true, false, true);
                domRatio('.hs01_banner01 > div', (2/3));
                //fnSlide(".hs01_alert01 .a_r .ar_inner", true, true, true, 'vertical');
                tabCommon('.hs01_board01_tab');

                if (hs01banner02List.length === 1) {
                    $('.hs01_banner02').addClass('one');
                } else {
                    fnSlide(".hs01_banner02 .box_w", false, false, true, 'horizontal');
                }
                
                domRatio('.hs01_banner02 .box_w', (13/32));
                domRatio('.hs01_banner03 .box_w > a > i', (2/3));
                if (hs02status01List.length === 1) {
                    $('.hs02_status01').addClass('one');
                } else {
                    fnSlide(".hs02_status01 .box_w", false, false, true, 'horizontal');
                }                
                tabCommon('.hs02_tab01');
                domRatio('.hs03_banner01 > div', (2/3));
                domRatio('.hs04_banner02 > div', (2/3));

                // !NB.boolLogged ? homeSlide01() : homeSlideLog01();
            }
        }
    });

    if (Number(isDirect) === 0) {
        HBList.first().addClass(NH.strOn);
    } else {
        NH.objHS.slideTo(nhrObj.home, 0);
        HBList.eq(nhrObj.home).addClass(NH.strOn);
        $(NH.cnHomeSlideList).eq(nhrObj.home).scrollTop(nhrObj.scrollTop);
    }

    HBList.click(function(){

        nhrObj.home = $(this).index();
        localStorage.setItem(NU.homeToggleRefer, JSON.stringify(nhrObj));

        NH.objHS.slideTo($(this).index());
    });

    NH.objHS.on('transitionStart', function() {

        var idx = NH.objHS.realIndex;

        NH.boolIsScroll && NH.objHB.slideTo(idx);
        HBList.removeClass(NH.strOn);
        $('.header .h_b .hbs_w .hbsw_l:nth-child(' + (idx + 1) + ')').addClass(NH.strOn);
        
        nhrObj.home = idx;
        nhrObj.scrollTop = $('.hsw_l.swiper-slide-active').scrollTop();
        localStorage.setItem(NU.homeToggleRefer, JSON.stringify(nhrObj));

        // switch (idx) {
        //     case 0:
        //         !NB.boolLogged ? homeSlide01() : homeSlideLog01();
        //         break;
        //     case 1:
        //         !NB.boolLogged ? homeSlide02() : homeSlideLog02();
        //         break;
        //     case 2:
        //         !NB.boolLogged ? homeSlide03() : homeSlideLog03();
        //         break;
        //     case 3:
        //         !NB.boolLogged ? homeSlide04() : homeSlideLog04();
        //         break;
        //     case 4:
        //         !NB.boolLogged ? homeSlide05() : homeSlideLog05();
        //         break;
        //     case 5:
        //         !NB.boolLogged ? homeSlide06() : homeSlideLog06();
        //         break;
        //     case 6:
        //         !NB.boolLogged ? homeSlide07() : homeSlideLog07();
        //         break;
        //     case 7:
        //         !NB.boolLogged ? homeSlide08() : homeSlideLog08();
        //         break;
        //     default:
        //         break;
        // }

    });

    $(NH.cnHomeSlideList).scroll(function(){
        nhrObj.scrollTop = $(this).scrollTop();
        localStorage.setItem(NU.homeToggleRefer, JSON.stringify(nhrObj));
    });

}

// Header Toggle
function headerToggle() {

    var homeSlideList = $(NH.cnHomeSlideList);

    // base - scroll
    homeSlideList.bind('scroll', function() {

        var 
            bd = $(NH.cnBody),
            isFixed = bd.hasClass(NH.strFixed),
            hslScrollTop = $(this).scrollTop();

        !isFixed && (hslScrollTop > 0) && bd.addClass(NH.strFixed);
        isFixed && (hslScrollTop === 0) && bd.removeClass(NH.strFixed);

    });

    // mobile - touch
    homeSlideList.bind('touchstart', function(e) {
        NH.numInitialY = e.originalEvent.touches[0].clientY;
    });

    homeSlideList.bind('touchend', function(e) {
        var currentY = e.originalEvent.changedTouches[0].clientY,
            diffY = NH.numInitialY - currentY,
            bd = $(NH.cnBody),
            isFixed = bd.hasClass(NH.strFixed);
            thScrollTop = $(this).scrollTop();

        0 > diffY && isFixed && thScrollTop === 0 && bd.removeClass(NH.strFixed);
        NH.numInitialY = 0;
    });

    // web - mousewheel
    homeSlideList.bind('mousewheel', function(e) {
        var 
            currentDeltaY = e.originalEvent.deltaY,
            bd = $(NH.cnBody),
            isFixed = bd.hasClass(NH.strFixed),
            thScrollTop = $(this).scrollTop();

        currentDeltaY < 0 && thScrollTop === 0 && isFixed && bd.removeClass(NH.strFixed);
    });

}

function homeAlertScrollTop() {
    $('.hsw_l').first().scrollTop($('.hs01_alert01').position().top);
}

$(document).ready(function(){
    setTimeout(homeGnbWidth, 240);
    setTimeout(homeGnbSlide, 40);
    headerToggle();
});

/* Back 버튼으로 클릭해서 전환 후 로딩된 페이지에서만 이 함수가 호출된다. */
// window.onpageshow = function(e) {
	
// 	if (e.persisted || window.performance && window.performance.navigation.type === 2) {
		
// 		var nhr = JSON.parse(localStorage.getItem(NU.homeToggleRefer));

//         if ($('.home_slide').length > 0) {
            
//             NU.beforeHCheck = true;

//             $(NH.cnHeaderBList).eq(nhr.home).addClass('on');
            
//             setTimeout(function () {
//                 NH.objHS.slideTo(nhr.home, 0);
//                 $(NH.cnHomeSlideList).eq(nhr.home).scrollTop(nhr.scrollTop);
//             }, 120);


//         }

//    }

// };

/*


// Home Slide Content
function homeSlide01() { 

    if (!NH.boolHS01) {


        
        NH.boolHS01 = true;
    }
     
}

function homeSlide02() {

    if (!NH.boolHS02) {


        
        NH.boolHS01 = true;
    }

}

function homeSlide03() {

    if (!NH.boolHS03) {


        
        NH.boolHS03 = true;
    }

}

function homeSlide04() {

    if (!NH.boolHS04) {


        
        NH.boolHS04 = true;
    }

}

function homeSlideLog01() { 

    if (!NH.boolHSLog01) {



        NH.boolHSLog01 = true;

    }

}

function homeSlideLog02() { 

    if (!NH.boolHSLog02) {



        NH.boolHSLog02 = true;

    }

}

function homeSlideLog03() { 

    if (!NH.boolHSLog03) {



        NH.boolHSLog03 = true;

    }

}

function homeSlideLog04() { 

    if (!NH.boolHSLog04) {



        NH.boolHSLog04 = true;

    }

}
*/