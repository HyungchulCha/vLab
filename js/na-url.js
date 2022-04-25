/* customize */
var NU = {
		
	homeToggleRefer: 'home_toggle_refer',
	gnbToggleRefer: 'gnb_toggle_refer',
	gnbIndexRefer: 'gnb_index_refer',
	directCheck: 'directCheck',
	homeFontSize: 'homeFontSize',
	beforeHCheck: false,
	beforeGMCheck: false,

    isAndroid: navigator.userAgent.indexOf("NHIS-M_Android") !== -1,
    isIos: navigator.userAgent.indexOf("NHIS-M_IOS") !== -1,
    isMobile: navigator.userAgent.indexOf("NHIS-M_Android") !== -1 || navigator.userAgent.indexOf("NHIS-M_IOS") !== -1,
	
};

/* 뒤로가기 두번 누르면 앱이 꺼져야 하는 페이지, 특정 페이지 URL */
var nhisAppHistoryResetUrl = [
	//'samplePage.do'
];

/* 로컬스토리지 초기화 */
function homeToggleReset() {
	
	localStorage.setItem(NU.homeToggleRefer, JSON.stringify([]));
	
}
function gnbToggleReset() {

	localStorage.setItem(NU.gnbToggleRefer, JSON.stringify([]));
	
}
function directCheckReset() {

	localStorage.setItem(NU.directCheck, JSON.stringify(0));
	
}
function homeFontSizeReset() {

	localStorage.setItem(NU.homeFontSize, JSON.stringify(0));
	
}

function localStorageInit() {
	homeToggleReset();
	gnbToggleReset();
	directCheckReset();
	// homeFontSizeReset();
}

/* 로컬스토리지에 Key 값 자체가 없으면 초기화 = 앱을 시작했다는 뜻 */
function homeToggleResetNullCheck() {
	
	if (JSON.parse(localStorage.getItem(NU.homeToggleRefer)) === null) {
		homeToggleReset();
	}
	
}
function gnbToggleResetNullCheck() {
	
	if (JSON.parse(localStorage.getItem(NU.gnbToggleRefer)) === null) {
		gnbToggleReset();
	}
	
}
function directCheckCheck() {
	
	if (JSON.parse(localStorage.getItem(NU.directCheck)) === null) {
		directCheckReset();
	}
	
}
function homeFontSizeCheck() {

	var bd = $('body');
	
	if (JSON.parse(localStorage.getItem(NU.homeFontSize)) === null) {
		homeFontSizeReset();
		bd.attr('data-font', '0');
	} else if (JSON.parse(localStorage.getItem(NU.homeFontSize)) === 0) {
		bd.attr('data-font', '0');	
	} else if (JSON.parse(localStorage.getItem(NU.homeFontSize)) === 1) {
		bd.attr('data-font', '1');
	} else if (JSON.parse(localStorage.getItem(NU.homeFontSize)) === 2) {
		bd.attr('data-font', '2');
	} else if (JSON.parse(localStorage.getItem(NU.homeFontSize)) === 3) {
		bd.attr('data-font', '3');
	}
	
}

/* 값을 쌓아둬야 하는 페이지에서의 링크는 이 함수를 실행 */
function nextLink(url, gnbIndex) {
	
	if(NU.isMobile){
		window.location = "mnhis://showLoading";
	}		

	if (gnbIndex !== undefined) {
		var arr = gnbIndex.split('-'); // ['1', '1', '1']
		localStorage.setItem(NU.gnbIndexRefer, JSON.stringify(arr));
	}

	localStorage.setItem(NU.directCheck, JSON.stringify(0));
	window.location.href = url;

}

/* Native에서 Back 버튼 클릭 시 이 함수를 실행한다. */
function mBackTrigger() {

	var
		currentPath = window.location.pathname.split('/'),
		currentPageName = currentPath[currentPath.length - 1],
		isEndPage = nhisAppHistoryResetUrl.indexOf(currentPageName) !== -1,
		body = $('body'),
		isLayerPopup = body.hasClass('has_layer_popup');

	if (isLayerPopup) {

		// layer popup : na-base.js
		layerPopupBackTrigger();
		// home event layer popup : na-base.js
		eventLayerPopupBackTrigger();
		// mycard : na-base.js
		myCardBackTrigger();
		// search voice : na-url.js
		searchVoiceBackTrigger();
		// rnb : na-url.js
		rnbBackTrigger();
		// login class select : na-url.js
		layerLoginBackTrigger();

		return;

	} else if (isEndPage) {

		return;

	} else {

		localStorage.setItem(NU.directCheck, JSON.stringify(1));
		NU.isMobile ?  window.location = "mnhis://historyBack" : history.go(-1);

	}

}

/* callback function at native back trigger */
function searchVoiceBackTrigger() {

    var 
        sf = $('.search_form'),
        svLayer = $('.layer_search_voice'),
        btnClose = svLayer.find('.btn_close');

    (sf.length > 0) && btnClose.trigger('click');
    
}

function rnbBackTrigger() {
	
    var
        qm = $('.rnb'),
        btnClose = qm.find('.btn_close');
        
    (qm.length > 0) && btnClose.trigger('click');
    
}

function layerLoginBackTrigger() {

    var
        layerLogin = $('.layer_login_select'),
        btnClose = layerLogin.find('.btn_close');

    (layerLogin.length > 0) && btnClose.trigger('click');

}

/* 기본 뒤로가기 버튼으로 사용하고 싶으면 class="btn_hb"라고 적으면 된다. */
function wHistoryBackBtn() {
	var btnHB = $('.btn_back');
	(btnHB.length > 0) && (btnHB.click(function(){ mBackTrigger(); }));
}

$(document).ready(function() {

	// historyResetNullCheck();
	// historyResetUrlCheck();
	homeToggleResetNullCheck();
	gnbToggleResetNullCheck();
	directCheckCheck();
	homeFontSizeCheck();
	wHistoryBackBtn();
    
});