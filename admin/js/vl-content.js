function searchResultTabScrl() {

    var 
        srTabSlide,
        srTab = $('.search_result .sr_tab');

    if ($('.search_result').length > 0) {
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
    
}

function mdlHasChild() {

    if ($('.mdl_list').length > 0) {
        $('.mdl_list li').each(function(){
            if ($(this).find('> div').length > 0) {
                $(this).addClass('has_child');
                $(this).prepend('<button class="lt_l"></button>')
            }
        });
    
        afterHasCheck('.lt_l', listToggle);
    }

}

function mdLnbTgl() {

    var btnMdl = $('.my_drive .md_lnb .btn_mdl'),
    btnBtns = $('.my_drive .md_btns .btn_btns');

    if (btnMdl.length > 0) {
        btnMdl.on('click', function(){
            var mdl = $('.my_drive .md_lnb'),
            isMdlOpen = mdl.hasClass('open');
            var mdb = $('.my_drive .md_btns'),
            isMdbOpen = mdb.hasClass('open');
            isMdlOpen ? mdl.removeClass('open') : ((isMdbOpen && mdb.removeClass('open')), mdl.addClass('open'));
            return false;
        });
    }
    if (btnBtns.length > 0) {
        btnBtns.on('click', function(){
            var mdl = $('.my_drive .md_lnb'),
            isMdlOpen = mdl.hasClass('open');
            var mdb = $('.my_drive .md_btns'),
            isMdbOpen = mdb.hasClass('open');
            isMdbOpen ? mdb.removeClass('open') : ((isMdlOpen && mdl.removeClass('open')), mdb.addClass('open'));
            return false;
        });
    }

}

function mdScroll() {

    var mdScroll = $('.my_drive .md_scroll'),
    winH = $(window).outerHeight(),
    status = sCheck();

    if (mdScroll.length > 0) {

        if (status === 'p') {
            mdScroll.css('height', '434px');
        } else if (status === 't') {
            mdScroll.css('height', (winH - 474) + 'px');
        } else {
            mdScroll.css('height', (winH - 424) + 'px');
        }

        $(window).on('resize', $.debounce(80, function(){

            var winH = $(window).outerHeight(),
            status = sCheck();

            if (status === 'p') {
                mdScroll.css('height', '434px');
            } else if (status === 't') {
                mdScroll.css('height', (winH - 474) + 'px');
            } else {
                mdScroll.css('height', (winH - 424) + 'px');
            }
        }));

    }

}

$(document).ready(function(){

    searchResultTabScrl();
    afterHasCheck('.sub_content .lab_card .lc_img', domRatio, true, (3 / 4));
    afterHasCheck('.sub_content.lab_view .lv_t .lvt_img > i', domRatio, true, (3 / 4));
    fnSlide({ dom: '.sub_content.lab_view .lv_slide', loop: false, auto: false, center: false });
    //afterHasCheck('.sub_content.lab_view .lv_slide .s_w .sw_l > div > a', domRatio, true, (1 / 1));
    afterHasCheck('.f_img .fi_thumb', domRatio, true, (3 / 4));
    mdlHasChild();
    mdLnbTgl();
    mdScroll();

});