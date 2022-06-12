/* scroll + header */

var mWinH = 0;

function mWinHeight() {
    mWinH = $(window).outerHeight();
}

function mScroll() {
    var win = $(window),
        hd = $(".header");

    win.scroll(function () {
        if (win.scrollTop() >= mWinH - $(".header").outerHeight()) {
            hd.addClass("hd_w");
        } else {
            hd.removeClass("hd_w");
        }
    });
}

/* main - visual height check */

function mVisualHeight() {
    $(this).css("height", $(window).outerHeight());
}
function mVisualScroll() {
    $(".m_visual").on("mousewheel", function (e) {
        e.deltaY === -1 &&
            $("html").animate(
                { scrollTop: mWinH - $(".header").outerHeight() },
                480,
                "easeOutCubic"
            );
    });
}
function mVisualDown() {
    $(".m_visual .mv_scroll").on("click", function () {
        $("html").animate(
            { scrollTop: mWinH - $(".header").outerHeight() },
            400,
            "easeOutCubic"
        );
        return false;
    });
}

$(document).ready(function () {
    afterHasCheck(".main", mWinHeight, true);
    mScroll();
    afterHasCheck(".m_visual", mVisualHeight, true);
    fnSlide({
        dom: ".m_pick .mp_slide",
        loop: false,
        auto: false,
        center: false,
    });
    afterHasCheck(".m_pick .mp_img", domRatio, true, 3 / 4);
    fnSlide({
        dom: ".m_news .mn_slide",
        loop: true,
        auto: false,
        center: true,
        breakPoint: ["p", "t"],
    });

    mVisualScroll();
    mVisualDown();
});



/* chart */
function prevValue(b, a) {
	return 0 == a ? b[a] : 0 == b[a] ? prevValue(b, a - 1) : b[a]
}

function nextValue(a, b) {
	return b == a.length - 1 ? a[b] : 0 == a[b] ? nextValue(a, b + 1) : a[b]
}

function nullChkAndStrToInt(a) {
	return a = "" == a || null == a ? 0 : parseInt(a)
}
var N_Data = {
    USA: { kr: "미국", en: "USA", cn: "美国", pointStyle: "triangle", borderDash: [0, 0], backgroundColor: "#ff12ff", pointColor: "#ff12ff", lineColor: "#ff12ff", fontColor: "#ff12ff" },
    Brazil: { kr: "브라질", en: "Brazil", cn: "巴西", pointStyle: "rect", borderDash: [0, 0], backgroundColor: "#ffffff", pointColor: "#4f4f4f", lineColor: "#4f4f4f", fontColor: "#4f4f4f" },
    Russia: { kr: "러시아", en: "Russia", cn: "俄罗斯", pointStyle: "rectRot", borderDash: [0, 0], backgroundColor: "#ffffff", pointColor: "#e92828", lineColor: "#e92828", fontColor: "#e92828" },
    UK: { kr: "영국", en: "UK", cn: "英国", pointStyle: "circle", borderDash: [2, 1], backgroundColor: "#ffffff", pointColor: "#15399e", lineColor: "#15399e", fontColor: "#15399e" },
    Spain: { kr: "스페인", en: "Spain", cn: "西班牙", pointStyle: "triangle", borderDash: [2, 1], backgroundColor: "#ffffff", pointColor: "#ff12ff", lineColor: "#ff12ff", fontColor: "#ff12ff" },
    Italy: { kr: "이탈리아", en: "Italy", cn: "意大利", pointStyle: "rect", borderDash: [2, 1], backgroundColor: "#ffffff", pointColor: "#197b30", lineColor: "#197b30", fontColor: "#197b30" },
    India: { kr: "인도", en: "India", cn: "印度", pointStyle: "rectRot", borderDash: [2, 1], backgroundColor: "#ffffff", pointColor: "#0606ff", lineColor: "#0606ff", fontColor: "#0606ff" },
    Germany: { kr: "독일", en: "Germany", cn: "德国", pointStyle: "circle", borderDash: [0, 0], backgroundColor: "#ffffff", pointColor: "#721dca", lineColor: "#721dca", fontColor: "#721dca" },
    Peru: { kr: "페루", en: "Peru", cn: "秘鲁", pointStyle: "triangle", borderDash: [0, 0], backgroundColor: "#ffffff", pointColor: "#00b8ce", lineColor: "#00b8ce", fontColor: "#00b8ce" },
    Turkey: { kr: "터키", en: "Turkey", cn: "土耳其", pointStyle: "rect", borderDash: [0, 0], backgroundColor: "#4f4f4f", pointColor: "#4f4f4f", lineColor: "#4f4f4f", fontColor: "#4f4f4f" },
    Iran: { kr: "이란", en: "Iran", cn: "伊朗", pointStyle: "rectRot", borderDash: [0, 0], backgroundColor: "#e92828", pointColor: "#e92828", lineColor: "#e92828", fontColor: "#e92828" },
    France: { kr: "프랑스", en: "France", cn: "法国", pointStyle: "circle", borderDash: [2, 1], backgroundColor: "#15399e", pointColor: "#15399e", lineColor: "#15399e", fontColor: "#15399e" }
};
var NPTB_data = {
    date: ["6.1", "6.2", "6.3", "6.4", "6.5", "6.6", "6.7", "6.8", "6.9", "6.10", "6.11", "6.12", "6.13", "6.14"],
    USA: ["1786593", "1808291", "1830066", "1849560", "1870156", "1894753", "1917080", "1938842", "1956499", "1973803", "1997636", "2018875", "2044572", "2071782"],
    Brazil: ["514849", "526447", "555383", "584016", "614941", "630708", "657783", "676695", "692349", "739503", "772416", "802828", "828810", "850514"],
    Russia: ["405843", "414878", "423741", "432277", "441108", "449834", "458689", "467673", "476658", "485253", "493657", "502436", "511423", "520129"],
    UK: ["274762", "276332", "277985", "279856", "281661", "283311", "284868", "286194", "287399", "289140", "290143", "291409", "297535", "308993"],
    Spain: ["239429", "239638", "239932", "240326", "240660", "240978", "241310", "246628", "256611", "266598", "276583", "286579", "292950", "294375"],
    Italy: ["233019", "233197", "233515", "233836", "234013", "234531", "236657", "241550", "241717", "241966", "242280", "242707", "243209", "243605"],
    India: ["182143", "190535", "198706", "207615", "216919", "226770", "234801", "234998", "235278", "235561", "235763", "236142", "236305", "236651"],
    Germany: ["183410", "183594", "183879", "184121", "184472", "187400", "191758", "196515", "199696", "203736", "208823", "214788", "214788", "220749"],
    Peru: ["164476", "170039", "170039", "178914", "183198", "184924", "185450", "185750", "186109", "186506", "186522", "186691", "187226", "187267"],
    Turkey: ["163942", "164769", "165555", "166422", "167410", "168340", "169425", "171789", "173832", "175927", "177938", "180176", "182545", "184955"],
    Iran: ["151466", "154445", "157562", "160696", "164270", "167156", "169218", "170132", "171121", "172114", "173036", "174023", "175218", "176677"],
    France: ["151753", "152091", "151325", "151677", "152444", "153055", "153634", "153977", "154188", "154591", "155136", "155561", "156287", "156813"]
};
function mLineChart04() {
	new Chart(document.getElementById("m_lineChart04"), {
		type: "line",
		data: {
			labels: NPTB_data.date,
			datasets: [{
				type: "line",
				data: NPTB_data.USA,
				label: N_Data.USA.en,
				pointStyle: N_Data.USA.pointStyle,
				pointBackgroundColor: N_Data.USA.backgroundColor,
				pointBorderColor: N_Data.USA.pointColor,
				borderColor: N_Data.USA.lineColor,
				borderDash: N_Data.USA.borderDash,
				borderWidth: 2,
				fill: false,
				pointRadius: function(a) {
					return 0 === a.dataIndex || a.dataIndex === a.chart.config.data.labels.length - 1 ? "4" : "0"
				}
			}, {
				type: "line",
				data: NPTB_data.India,
				label: N_Data.India.en,
				pointStyle: N_Data.India.pointStyle,
				pointBackgroundColor: N_Data.India.backgroundColor,
				pointBorderColor: N_Data.India.pointColor,
				borderColor: N_Data.India.lineColor,
				borderDash: N_Data.India.borderDash,
				borderWidth: 2,
				fill: false,
				pointRadius: function(a) {
					return 0 === a.dataIndex || a.dataIndex === a.chart.config.data.labels.length - 1 ? "4" : "0"
				}
			}, {
				type: "line",
				data: NPTB_data.Brazil,
				label: N_Data.Brazil.en,
				pointStyle: N_Data.Brazil.pointStyle,
				pointBackgroundColor: N_Data.Brazil.backgroundColor,
				pointBorderColor: N_Data.Brazil.pointColor,
				borderColor: N_Data.Brazil.lineColor,
				borderDash: N_Data.Brazil.borderDash,
				borderWidth: 2,
				fill: false,
				pointRadius: function(a) {
					return 0 === a.dataIndex || a.dataIndex === a.chart.config.data.labels.length - 1 ? "4" : "0"
				}
			}, {
				type: "line",
				data: NPTB_data.France,
				label: N_Data.France.en,
				pointStyle: N_Data.France.pointStyle,
				pointBackgroundColor: N_Data.France.backgroundColor,
				pointBorderColor: N_Data.France.pointColor,
				borderColor: N_Data.France.lineColor,
				borderDash: N_Data.France.borderDash,
				borderWidth: 2,
				fill: false,
				pointRadius: function(a) {
					return 0 === a.dataIndex || a.dataIndex === a.chart.config.data.labels.length - 1 ? "4" : "0"
				}
			}, {
				type: "line",
				data: NPTB_data.Germany,
				label: N_Data.Germany.en,
				pointStyle: N_Data.Germany.pointStyle,
				pointBackgroundColor: N_Data.Germany.backgroundColor,
				pointBorderColor: N_Data.Germany.pointColor,
				borderColor: N_Data.Germany.lineColor,
				borderDash: N_Data.Germany.borderDash,
				borderWidth: 2,
				fill: false,
				pointRadius: function(a) {
					return 0 === a.dataIndex || a.dataIndex === a.chart.config.data.labels.length - 1 ? "4" : "0"
				}
			}, {
				type: "line",
				data: NPTB_data.UK,
				label: N_Data.UK.en,
				pointStyle: N_Data.UK.pointStyle,
				pointBackgroundColor: N_Data.UK.backgroundColor,
				pointBorderColor: N_Data.UK.pointColor,
				borderColor: N_Data.UK.lineColor,
				borderDash: N_Data.UK.borderDash,
				borderWidth: 2,
				fill: false,
				pointRadius: function(a) {
					return 0 === a.dataIndex || a.dataIndex === a.chart.config.data.labels.length - 1 ? "4" : "0"
				}
			}, {
				type: "line",
				data: NPTB_data.Russia,
				label: N_Data.Russia.en,
				pointStyle: N_Data.Russia.pointStyle,
				pointBackgroundColor: N_Data.Russia.backgroundColor,
				pointBorderColor: N_Data.Russia.pointColor,
				borderColor: N_Data.Russia.lineColor,
				borderDash: N_Data.Russia.borderDash,
				borderWidth: 2,
				fill: false,
				pointRadius: function(a) {
					return 0 === a.dataIndex || a.dataIndex === a.chart.config.data.labels.length - 1 ? "4" : "0"
				}
			}, {
				type: "line",
				data: NPTB_data.Italy,
				label: N_Data.Italy.en,
				pointStyle: N_Data.Italy.pointStyle,
				pointBackgroundColor: N_Data.Italy.backgroundColor,
				pointBorderColor: N_Data.Italy.pointColor,
				borderColor: N_Data.Italy.lineColor,
				borderDash: N_Data.Italy.borderDash,
				borderWidth: 2,
				fill: false,
				pointRadius: function(a) {
					return 0 === a.dataIndex || a.dataIndex === a.chart.config.data.labels.length - 1 ? "4" : "0"
				}
			}, {
				type: "line",
				data: NPTB_data.Turkey,
				label: N_Data.Turkey.en,
				pointStyle: N_Data.Turkey.pointStyle,
				pointBackgroundColor: N_Data.Turkey.backgroundColor,
				pointBorderColor: N_Data.Turkey.pointColor,
				borderColor: N_Data.Turkey.lineColor,
				borderDash: N_Data.Turkey.borderDash,
				borderWidth: 2,
				fill: false,
				pointRadius: function(a) {
					return 0 === a.dataIndex || a.dataIndex === a.chart.config.data.labels.length - 1 ? "4" : "0"
				}
			}]
		},
		options: {
			maintainAspectRatio: false,
			title: {
				display: false
			},
			legend: {
				display: true,
				position: "bottom",
				labels: {
					usePointStyle: true,
					boxWidth: 6,
					fontFamily: "Lato",
					fontSize: 11
				}
			},
			tooltips: {
				enabled: true,
				titleFontFamily: "'Lato'",
				bodyFontFamily: "'Lato'",
				bodyFontSize: 11,
				callbacks: {
					label: function(a, b) {
						return Number(a.value).toLocaleString()
					}
				}
			},
			hover: {
				mode: null
			},
			layout: {
				padding: {
					left: 0,
					right: 60,
					top: 0,
					bottom: 0
				}
			},
			scales: {
				yAxes: [{
					display: true,
					ticks: {
						beginAtZero: true,
						fontColor: "#666",
						fontSize: 10,
						fontFamily: "'Lato'"
					},
					gridLines: {
						display: true,
						zeroLineColor: "#000"
					}
				}],
				xAxes: [{
					display: true,
					ticks: {
						fontColor: "#333",
						fontSize: 10,
						fontFamily: "'Lato'"
					},
					gridLines: {
						display: false
					}
				}]
			},
			plugins: {
				datalabels: {
					display: function(a) {
						return a.dataIndex === a.chart.config.data.labels.length - 1
					},
					align: "right",
					anchor: "center",
					textAlign: "left",
					offset: 8,
					font: {
						family: "Lato",
						size: 11,
						weight: "bold"
					},
					formatter: function(a, b) {
						return a.toLocaleString()
					}
				}
			}
		}
	})
}

var WEEK_CHART3_data = {
    date: ["05월 02주","05월 03주","05월 04주","06월 01주"],
    total: [2563,1653,1176,759],
    daily: [4.96,3.20,2.28,1.47]
}

function mLineBarChart(canvas, baseColor, pointColor, pointType, weeklyData) {
    new Chart(document.getElementById(canvas), {
        type: 'bar',
        data: {

            labels: weeklyData.date,
            datasets: [
                {
                    type: 'line',
                    data: weeklyData.daily,
                    pointStyle: pointType,
                    pointRadius: '4',
                    pointBackgroundColor: '#fff' ,
                    pointBorderColor: pointColor,
                    borderColor: baseColor,
                    borderWidth: 3,
                    fill: false,
                    yAxisID: 'yAxes_right',
                    lineTension:0
                },
                {
                    type: 'bar',
                    data: weeklyData.total,
                    backgroundColor: baseColor,
                    categoryPercentage: 0.6,
                    barPercentage: 0.3,
                    yAxisID: 'yAxes_left'
                }
            ]
        },
        options: {
            responsive: true,
            animation: {
                duration: 800,
                easing: "easeOutQuart",

            },
            events: false,
            hover: { animationDuration: 0 },
            maintainAspectRatio: false,
            title: { display: false },
            legend: { display: false },
            tooltips: {
                enabled: false,
                titleFontFamily: "'Lato' 'Noto Sans CJK kr'",
                bodyFontFamily: "'Lato' 'Noto Sans CJK kr'",
                bodyFontSize: 11,
                callbacks: {
                    label: function(a, b) {
                        return Number(a.value).toLocaleString();
                    }
                }
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 24,
                    bottom: 0
                }
            },
            scales: {
                yAxes: [
                    {
                        display: true,
                        ticks: {

                            fontColor: '#666',
                            fontSize: 10,
                            fontFamily: "'Lato'",
                            min:0,
                            callback: function(a, b, c) {
                                return a.toLocaleString();
                            },
                            maxTicksLimit: 8,
                            precision: 1
                        },
                        position: 'right',
                        id: 'yAxes_right',
                        gridLines: {
                            display: false
                        }
                    },
                    {
                        display: true,
                        ticks: {
                            autoSkip: true,
                            fontColor: '#666',
                            fontSize: 10,
                            fontFamily: "'Lato'",
                            maxTicksLimit: 8,
                            min: 0,
                            callback: function(a, b, c) {
                                return a.toLocaleString();
                            }

                        },
                        position: 'left',
                        id: 'yAxes_left',
                        gridLines: {
                            display: true,
                            zeroLineColor: '#ddd'
                        }
                    }
                ],
                xAxes: [
                    {
                        display: true,
                        ticks: {
                            fontColor: '#555',
                            fontSize: 13,
                            fontFamily: "'Noto Sans KR'"
                        },
                        gridLines: {
                            display: false,
                            offsetGridLines: false
                        }
                    }
                ]
            },
            plugins: {
                datalabels: {
                    display: function(a) {
                        if (a.datasetIndex === 1) {
                            if (a.dataIndex === a.chart.config.data.labels.length) {
                                return true;
                            } else {
                                return false;
                            }
                        } else {
                            return true;
                        }
                    },
                    align: 'end',
                    anchor: 'end',
                    textAlign: 'center',
                    offset: 0,
                    font: {
                        family: 'Lato',
                        size: 13,
                        weight: 'bold'
                    },
                    textStrokeColor: 'rgba(255,255,255,1)',
                    textStrokeWidth: 3,
                    color: function(a) {
                        if (a.datasetIndex === 0) {
                            return pointColor;
                        } else {
                            return pointColor;
                        }
                    },
                    formatter: function(a, b) {
                        var a = Number(a);
                        return a.toLocaleString();
                    }
                }
            }
        }
    });
}