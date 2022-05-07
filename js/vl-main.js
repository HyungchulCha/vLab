/* scroll + header */

var mWinH = 0;

function mWinHeight() {
    mWinH = $(window).outerHeight();
}

function mScroll() {

    var win = $(window),
        hd = $('.header');

    win.scroll(function () {
        if (win.scrollTop() > mWinH) {
            hd.addClass('hd_w');
        } else {
            hd.removeClass('hd_w');
        }
    });

}

/* main - visual height check */

function mVisual() {
    $(this).css('height', $(window).outerHeight());
}

$(document).ready(function () {

    afterHasCheck('.main', mWinHeight, true);
    mScroll();
    afterHasCheck('.m_visual', mVisual, true);
    fnSlide({ dom: '.m_pick > div', loop: true, auto: false, center: false});
    fnSlide({ dom: '.m_news > div', loop: true, auto: false, center: true, breakPoint: ['p', 't']});
    
});

