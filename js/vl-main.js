/* main - scroll + header */
var mWinH = 0;

function mWinHeight() {
    mWinH = $(window).outerHeight();
}

function mScroll() {

    var isMain = $('.main').length,
        hd = $('.header'),
        win = $(window);

    if (isMain > 0) {
        win.scroll(function(){
            if (win.scrollTop() > mWinH) {
                hd.addClass('hd_w');
            } else {
                hd.removeClass('hd_w');
            }
        });
    }

}

/* main - visual height check */
function mVisual() {
    $(this).css('height', $(window).outerHeight());
}

$(document).ready(function(){
    
    afterHasCheck('.main', mWinHeight, true);
    mScroll();
    afterHasCheck('.m_visual', mVisual, true);

});