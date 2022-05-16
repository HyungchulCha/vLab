/* scroll + header */

var mWinH = 0;

function mWinHeight() {
    mWinH = $(window).outerHeight();
}

function mScroll() {

    var win = $(window),
        hd = $('.header');

    win.stop().scroll(function () {
        if (win.scrollTop() >= (mWinH - ($('.header').outerHeight()))) {
            hd.addClass('hd_w');
        } else {
            hd.removeClass('hd_w');
        }
    });

}

/* main - visual height check */

function mVisualHeight() {
    $(this).css('height', $(window).outerHeight());
}
function mVisualScroll() {
    $('.m_visual').stop().on('mousewheel', function (e) {
        e.deltaY === -1 && $('html').animate({ scrollTop: (mWinH - ($('.header').outerHeight())) }, 480, 'easeOutCubic');
    });
}
function mVisualDown() {
    $('.m_visual .mv_scroll').on('click', function () {
        $('html').animate({ scrollTop: (mWinH - ($('.header').outerHeight())) }, 400, 'easeOutCubic');
        return false;
    });
}

$(document).ready(function () {

    afterHasCheck('.main', mWinHeight, true);
    mScroll();
    afterHasCheck('.m_visual', mVisualHeight, true);
    mVisualScroll();
    mVisualDown();
    fnSlide({ dom: '.m_pick .mp_slide', loop: false, auto: false, center: false });
    afterHasCheck('.m_pick .mp_img', domRatio, true, (3 / 4));
    fnSlide({ dom: '.m_news .mn_slide', loop: true, auto: false, center: true, breakPoint: ['p', 't'] });

});

