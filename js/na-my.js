/* right navigation icon toggle */
function rnbToggle() {

    var
        bd = $('body'),
        qm = $('.rnb'),
        bdShadow = $('.rnb_bg'),
        btnOpen = $('.rnb_btn'),
        qmIcon = $('.rnb i');
        
    bdShadow.hide();
    
    btnOpen.click(function() {
        bd.addClass('of_h').addClass('has_layer_popup');
        btnOpen.addClass('hidden');
        bdShadow.show();
        qmIcon.show();
        setTimeout(function(){
            qm.addClass('open');
            bdShadow.addClass('open');
        }, 0);
        setTimeout(function(){
            qmIcon.addClass('show');
        }, 480);
        
        return false;
    });

    $('.rnb_bg, .rnb .btn_close, .rnb i').click(function() {
        qmIcon.removeClass('show');
        setTimeout(function() {
            qm.removeClass('open');
            bdShadow.removeClass('open');
        }, 0);
        setTimeout(function(){
        	bdShadow.hide();
            qmIcon.hide();
            btnOpen.removeClass('hidden');
        }, 240);
        bd.removeClass('of_h').removeClass('has_layer_popup');
        
        return false;
    });
    
}

/* roadmap select ui */
function roadmapSelect() {

    var 
        rms = $('.roadmap_select'),
        rmsT = rms.find('.lt_l > span'),
        rmsL = rms.find('.lt_c > ul > li'),
        rmsLLink = rms.find('.lt_c > ul > li > a');
    
    if (rms.length > 0) {

        rmsT.text(rmsL.first().find('span').text());
        rmsL.first().addClass('checked');

        rmsLLink.click(function(){

            var 
                th = $(this),
                thP = th.parent(),
                isOpen = thP.hasClass('open'),
                thPP = th.parents('.lt_p'),
                thText = th.find('span').text();

            if (!isOpen) {
                thP.siblings().removeClass('checked');
                thP.addClass('checked');
                rmsT.text(thText);
            }
            
            thPP.removeClass('open');
    
            return false;
        });

    }

}

/* svg circle gauge ui */
function circleGauge(per, count) {

    var 
        mg = $('.my_gauge')
        mgCount = $('.my_gauge .mg_count .mgc_t strong'),
        mgPer = $('.my_gauge .mg_count .mgc_b em');

    if (mg.length > 0) {

        // svg circle animate
        var progressValue = document.querySelector('.mg_circle .mg_progress_v');
        var progressM = document.querySelector('.mg_circle .mg_progress_m');
        var radius = progressValue.r.baseVal.value;
        var circumference = 2 * Math.PI * radius;

        progressM.style.strokeDasharray = circumference;
        progressM.style.strokeDashoffset = circumference / 4;
        progressValue.style.strokeDasharray = circumference;

        var _progress = (3 * per) / 400;
        var dashoffset = circumference * (1 - _progress);
        $({val : circumference}).animate({val : dashoffset}, {
            duration: 800,
            step: function() {
                progressValue.style.strokeDashoffset = this.val;
            },
            complete: function() {
                progressValue.style.strokeDashoffset = this.val;
            }
        });

        // nubmer animate
        $({val : 0}).animate({val : count}, {
            duration: 800,
            step: function() {
                mgCount.text(parseInt(this.val).toLocaleString());
            },
            complete: function() {
                mgCount.text(parseInt(this.val).toLocaleString());
            }
        });
        
        // per animate
        $({val : 0}).animate({val : per}, {
            duration: 800,
            step: function() {
                mgPer.text(parseInt(this.val) + '%');
            },
            complete: function() {
                mgPer.text(parseInt(this.val) + '%');
            }
        });

    }
    
}

/* mymenu */
/* global menu toggle */
function gmToggle() {

    var
        gm = $('.gm'),
        btnAllOpen = $('.gm .gm_tgl .btn_all_open'),
        btnAllClose = $('.gm .gm_tgl .btn_all_close'),
        gmblL = $('.gm .gm_b .gmb_l .gmbl_t > ul > li'),
        gmbrWrap = $('.gm .gm_b .gmb_r'),
        gmbr = $('.gm .gm_b .gmb_r > div > div'),
        gmbrL = $('.gm .gm_b .gmb_r .gmbr_b > ul > li');

    if (gm.length > 0) {

        // Init : Basic        
        gmblL.first().addClass('on');
        gmbr.first().addClass('open');

        // init : has_child add class
        gmbrL.each(function(){
            var hasChild = $(this).find('ul').length;
            hasChild > 0 && $(this).addClass('has_child');
        });

        // 1-Depth Event
        gmblL.find('a').click(function(){

            var 
                thP = $(this).parent(),
                thPIndex = thP.index(),
                isOn = thP.hasClass('on');

            !isOn && (gmblL.removeClass('on'), thP.addClass('on'), gmbr.removeClass('open'), gmbr.eq(thPIndex).addClass('open'), gmbrWrap.scrollTop(0));

            return false;

        });

        // 2-Depth Event
        $('.gm .gm_b .gmb_r .gmbr_b > ul > li.has_child').find('> p').click(function(){
            var 
                thP = $(this).parent(),
                isOpen = thP.hasClass('open');

            !isOpen ? thP.addClass('open') : thP.removeClass('open');

            return false;
        });

        // All Open
        btnAllOpen.click(function(){
            var hasChild = $('.gm .gm_b .gmb_r .gmbr_b > ul > li.has_child');
            hasChild.addClass('open');
            return false;
        });

        // All Close
        btnAllClose.click(function(){
            var hasChild = $('.gm .gm_b .gmb_r .gmbr_b > ul > li.has_child');
            hasChild.removeClass('open');
            return false;
        });

    }
        
}

function myMenuBtnToggle() {
    var 
        winH = $(window).outerHeight(),
        mm = $('.mymenu'),
        gm = $('.gm'),
        mmtH = $('.mymenu_select .ms_t').outerHeight(),
        mmbtH = $('.mymenu_select .ms_b .msb_t').outerHeight(),
        mmbb = $('.mymenu_select .ms_b .msb_b'),

        btnLayer = mm.find('.btn_layer_toggle'),
        btnOrder = mm.find('.btn_order'),
        btnAddDelete = mm.find('.btn_adddelete');

    setTimeout(function(){
        winH = $(window).outerHeight();
        mmtH = $('.mymenu_select .ms_t').outerHeight();
        mmbtH = $('.mymenu_select .ms_b .msb_t').outerHeight();
        gm.attr('data-height', winH - 198).css('height', winH - 198);
        mmbb.attr('data-height', winH - 136 - mmtH - mmbtH);
    }, 80);

    $(window).resize(function(){
        var 
            winH = $(window).outerHeight(),
            mmtH = $('.mymenu_select .ms_t').outerHeight(),
            mmbtH = $('.mymenu_select .ms_b .msb_t').outerHeight()
            isLayer = mm.hasClass('is_layer');
        !isLayer && gm.css('height', winH - 198);
        isLayer && mmbb.css('height', winH - 136 - mmtH - mmbtH)
        gm.attr('data-height', winH - 198);
        mmbb.attr('data-height', winH - 136 - mmtH - mmbtH);
    });

    btnLayer.click(function(){
        var 
            isLayer = mm.hasClass('is_layer'),
            mmbbH = mmbb.attr('data-height'),
            gmH = gm.attr('data-height');

        if (!isLayer) {
            mm.addClass('is_layer');
            gm.css('height', 0);
            mmbb.css('height', mmbbH);
        } else {
            mm.removeClass('is_layer');
            gm.css('height', gmH);
            mmbb.css('height', 0);
        }

        return false;
    });

    btnOrder.click(function(){
        var isOrder = mm.hasClass('is_order');
        (!isOrder) && mm.addClass('is_order');

        return false;

    });

    btnAddDelete.click(function(){
        var isOrder = mm.hasClass('is_order');
        (isOrder) && mm.removeClass('is_order');

        return false;

    });

}

function myMenuListSortable() {
    var ls = $('.mymenu_select .ms_b .msb_b > div');

    if (ls.length > 0) {

        ls.find('> div').each(function(idx) {
            $(this).attr('data-index', idx + 1).find('.msbb_num').text(idx + 1);
        });

        ls.sortable({
            direction: 'vertical',
            animation: 150,
            ghostClass: "over",
            handle: ".ls_handle",
            onEnd: function() {
                ls.find('> div').each(function(idx) {
                    $(this).attr('data-index', idx + 1).find('.msbb_num').text(idx + 1);
                });
            },
            onAdd: function() {

            },
            onDelete: function() {
                
            }
        });

    }
}

$(document).ready(function() {
    fnSlide(".my_banner01", false, false, true);
    domRatio('.my_banner01 .s_w .sw_l', (2/3));
    circleGauge(78, 25874);
    rnbToggle();
    roadmapSelect();

    gmToggle();
    myMenuListSortable();
    myMenuBtnToggle();
});