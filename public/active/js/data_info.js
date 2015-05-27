$(function () {
    //select美化
    Select.init({
        selector: '.mod-search select, .pop-game-select select'
    });

    //************画报�?***********
    //访客停留时间统计
    loadstayTimeStatistics(stayTimeDatas);
    //日期输入框失去焦点的时候，更新游戏数和收藏�?
    $("#date_input").datetimepicker({
        lang: 'ch',
        timepicker: false,
        scrollInput: false,
        format: 'Y-m-d',
        onClose: function (dp, $input) {
            var val = $input.val();
            var time;
            if (val) {
                time = Date.parse(val).toString();
                time=time.substring(0,time.length-3);
            }
            ;
            if (time) {
                loadCountValues(time);
            }
        }
    });


    //来访记录报�〃
    load_visit_record(visit_record);

    //来访记录日期输入框失去焦点的时候，更新游戏数和收藏�?
    $("#date_input_visit").datetimepicker({
        lang: 'ch',
        timepicker: false,
        scrollInput: false,
        format: 'Y-m-d',
        onClose: function (dp, $input) {
            var val = $input.val();
            var time;
            if (val) {
                time = Date.parse(val);
            }
            ;
            if (time) {
                $.ajax({
                    type: "GET",
                    //url: "../ajax_activity_count_visit/" + activityId,
                    data: "time=" + time,
                    dataType: "text",
                    success: function (result) {
                        load_visit_record(result);
                    }
                });
            }
        }
    });


    //活动访客地域信息

    load_visit_region(visit_region);

});


function loadstayTimeStatistics(datas) {
    //游戏活跃时间统计
    $('#stay_time_statistics').highcharts({
        chart: {
            type: 'column',
            width: 630,
            height: 275
        },
        colors: ['#EF5AA2'],
        title: {
            text: ''
        },
        xAxis: {
            categories: datas.keys,
            title: {
                text: null
            }
        },
        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: '玩家',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: '人'
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        series: [{
            name: '时间段',
            data: datas.values[0]
        }]
    });
}


//加载玩家数和点击�?
function loadCountValues(time) {
    $("#players_count").text("");
    $("#click_count").text("");
    $.ajax({
        type: "GET",
        url: root_url + "/active/date_info?id="   + activityId,
        data: "time=" + time,
        dataType: "json",
        success: function (result) {
            //显示玩家数和点击�?
            var playersCount = 0;
            var clickCount = 0;
            var date = "";
            if (result) {
                playersCount = result.players_count;
                clickCount = result.click_count;
                date = result.date;
                fenxiang = result.fenxiang;
            }
            $("#players_count").text(playersCount);
            $("#click_count").text(clickCount);
            $("#fenxiang").text(fenxiang);
            $("#date_input").val(date);
        }
    });
}

//导出
function export_charts(aid) {
    var stay_time_statistics = $('#stay_time_statistics').highcharts();
    var visit_record = $('#visit_record').highcharts();
    var visit_region = $('#region').highcharts();
    var svgsJson = {
        "活动访客信息": visit_region.getSVG(),
        "活动参与者来访记录:": visit_record.getSVG(),
        "活动访客停留时间": stay_time_statistics.getSVG()
    };
    var svgs = JSON.stringify(svgsJson);
    $("#svgs").val(svgs);
    $("#aid").val(aid);
    $("#export_form").submit();
}

//加载活动访客记录
function load_visit_record(data) {


    var visit_data = [];

    if (data != "") {
        var visit_array = data.split('&');
        for (var i = 0; i < visit_array.length; i++) {
            visit_data.push(eval('(' + visit_array[i] + ')'));
        }
    } else {
        visit_data = "[]";
    }


    $('#visit_record').highcharts({
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: '活动参与者来访记录' + $("#date_input_visit").val(),
            style: {
                fontFamily: 'Microsoft YaHei',
                fontSize: '30px',
                color: '#636363'
            }
        },
        xAxis: {
            title: {
                enabled: true,
                text: '小时(H)'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: '分钟 (M)'
            }
        },
        legend: {
            enabled: false

        },
        credits: {
            enabled: false
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 15,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    },
                    symbol: 'circle'
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    headerFormat: '{series.name}',
                    pointFormat: '{point.x}时{point.y}分'
                }
            }
        },
        series: visit_data
    });

}

function load_visit_region(data) {
    if (data == "") {
        data = [['暂无数据', 1]];
    } else {
        data = eval('(' + data + ')');
    }
    $('#region').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: '活动访客地域信息',
            style: {
                fontFamily: 'Microsoft YaHei',
                fontSize: '30px',
                color: '#636363'
            }

        },
        credits: {
            enabled: false
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    connectorColor: '#000000',
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            type: 'pie',
            name: '比例',
            data: data
        }]
    });
}
