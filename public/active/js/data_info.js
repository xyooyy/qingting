$(function () {
    //select缇庡寲
    Select.init({
        selector: '.mod-search select, .pop-game-select select'
    });

    //************鐢绘姤琛�***********
    //璁垮鍋滅暀鏃堕棿缁熻
    loadstayTimeStatistics(stayTimeDatas);
    //鏃ユ湡杈撳叆妗嗗け鍘荤劍鐐圭殑鏃跺€欙紝鏇存柊娓告垙鏁板拰鏀惰棌鏁�
    $("#date_input").datetimepicker({
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
                loadCountValues(time);
            }
        }
    });


    //鏉ヨ璁板綍鎶ヨ〃
    load_visit_record(visit_record);

    //鏉ヨ璁板綍鏃ユ湡杈撳叆妗嗗け鍘荤劍鐐圭殑鏃跺€欙紝鏇存柊娓告垙鏁板拰鏀惰棌鏁�
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
                    url: "../ajax_activity_count_visit/" + activityId,
                    data: "time=" + time,
                    dataType: "text",
                    success: function (result) {
                        load_visit_record(result);
                    }
                });
            }
        }
    });


    //娲诲姩璁垮鍦板煙淇℃伅

    load_visit_region(visit_region);

});


function loadstayTimeStatistics(datas) {
    //娓告垙娲昏穬鏃堕棿缁熻
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
                text: '鐜╁',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' 浜�'
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        series: [{
            name: '鏃堕棿娈�',
            data: datas.values[0]
        }]
    });
}


//鍔犺浇鐜╁鏁板拰鐐瑰嚮鏁�
function loadCountValues(time) {
    $("#players_count").text("");
    $("#click_count").text("");
    $.ajax({
        type: "GET",
        url: root_url + "/data/" + activityId + "/get_basic_info",
        data: "time=" + time,
        dataType: "json",
        success: function (result) {
            //鏄剧ず鐜╁鏁板拰鐐瑰嚮鏁�
            var playersCount = 0;
            var clickCount = 0;
            var date = "";
            if (result) {
                playersCount = result.players_count;
                clickCount = result.click_count;
                date = result.date;
            }
            $("#players_count").text(playersCount);
            $("#click_count").text(clickCount);
            $("#date_input").val(date);
        }
    });
}

//瀵煎嚭
function export_charts(aid) {
    var stay_time_statistics = $('#stay_time_statistics').highcharts();
    var visit_record = $('#visit_record').highcharts();
    var visit_region = $('#region').highcharts();
    var svgsJson = {
        "娲诲姩璁垮淇℃伅": visit_region.getSVG(),
        "娲诲姩鍙備笌鑰呮潵璁胯褰�:": visit_record.getSVG(),
        "娲诲姩璁垮鍋滅暀鏃堕棿锛�": stay_time_statistics.getSVG()
    };
    var svgs = JSON.stringify(svgsJson);
    $("#svgs").val(svgs);
    $("#aid").val(aid);
    $("#export_form").submit();
}

//鍔犺浇娲诲姩璁垮璁板綍
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
            text: '娲诲姩鍙備笌鑰呮潵璁胯褰�' + $("#date_input_visit").val(),
            style: {
                fontFamily: 'Microsoft YaHei',
                fontSize: '30px',
                color: '#636363'
            }
        },
        xAxis: {
            title: {
                enabled: true,
                text: '灏忔椂(H)'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: '鍒嗛挓 (M)'
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
                    pointFormat: '{point.x}鏃秢point.y}鍒�'
                }
            }
        },
        series: visit_data
    });

}

function load_visit_region(data) {
    if (data == "") {
        data = [['鏆傛棤鏁版嵁', 1]];
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
            name: '姣斾緥',
            data: data
        }]
    });
}
