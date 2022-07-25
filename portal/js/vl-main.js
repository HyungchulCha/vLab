/* main - visual height check */

function mVisualHeight() {
    $(this).css('height', $(window).outerHeight());
}

function mVisualDown() {
    $('.m_visual .mv_scroll').on('click', function () {
        $('html').stop().animate({ scrollTop: ($(window).outerHeight() - ($('.header').outerHeight())) }, 400, 'easeOutCubic');
        return false;
    });
}

$(document).ready(function () {

    afterHasCheck('.m_visual', mVisualHeight, true);
    fnSlide({ dom: '.m_pick .mp_slide', loop: false, auto: false, center: false });
    afterHasCheck('.m_pick .mp_img', domRatio, true, (3 / 4));
    fnSlide({ dom: '.m_news .mn_slide', loop: true, auto: false, center: true, breakPoint: ['p', 't'] });
    mVisualDown();

});

var listen = true;

$('html').on('mousewheel DOMMouseScroll', function (e, delta) {
    var offTop = $(window).outerHeight() - $('.header').outerHeight();
    var isOfh = $('body').hasClass('of_h');
    if (isOfh) return;
    if (e.offsetY > offTop) return;
    if (delta > 0) return;
    if (!listen) return;
    listen = false;
    delta < 0 && $('html, body').animate({ scrollTop: offTop }, 1000, 'easeOutCubic', function(){
        console.log('end');
        listen = true;
    });
    
});

$(window).stop().on('scroll', $.throttle(160, function(e) {
    var hd = $('.header'),
        offTop = $(window).outerHeight() - hd.outerHeight();
    if ($(window).scrollTop() >= offTop) {
        hd.addClass('hd_w');
    } else {
        hd.removeClass('hd_w');
    }
}));

