function searchResultTabScrl() {

    var 
        srTabSlide,
        srTab = $('.search_result .sr_tab');

    (sCheck() === 't' || sCheck() === 'm') && (function(){
        srTabSlide = new Swiper('.search_result .sr_tab', {
            wrapperClass: "s_w",
            slideClass: "sw_l",
            slidesPerView: "auto",
            nested: true,
            freeMode: true
        });
    })();

    $(window).on('resize', $.debounce(80, function(){
        if (sCheck() === 'p') {
            if (srTabSlide === undefined) {
                return;
            } else {
                srTabSlide.destroy(true, true);
                srTabSlide = undefined;
                srTab.removeAttr('style');
                srTab.find('.s_w').removeAttr('style');
                srTab.find('.sw_l').removeAttr('style');
            }
        } else {
            srTabSlide = new Swiper('.search_result .sr_tab', {
                wrapperClass: "s_w",
                slideClass: "sw_l",
                slidesPerView: "auto",
                nested: true,
                freeMode: true
            });
        }
    }));

    $('.search_result .sr_tab').find('.sw_l').first().addClass('on');
    
}

$(document).ready(function(){

    searchResultTabScrl();
    afterHasCheck('.lab_card .lc_img', domRatio, true, (3 / 4));
    afterHasCheck('.lab_view .lv_t .lvt_img > i', domRatio, true, (3 / 4));
    fnSlide({ dom: '.lab_view .lv_slide', loop: false, auto: false, center: false });
    afterHasCheck('.lab_view .lv_slide .s_w .sw_l > div > a', domRatio, true, (1 / 1));
    afterHasCheck('.f_img .fi_thumb', domRatio, true, (3 / 4));

});