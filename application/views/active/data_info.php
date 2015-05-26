<!DOCTYPE html>
<!-- saved from url=(0030)http://act.aiwanpai.com/draft/ -->
<html lang="zh-cn">
<head>
    <title>数据中心</title>
    <?php require('static_file.php') ?>
    <link rel="stylesheet" href="/public/active/css/pagination.css">
    <link rel="stylesheet" href="/public/active/css/data_info.css">
    <!--    <script type="text/javascript" charset="utf-8" src="./活动管理_files/get.js"></script>-->
</head>
<body>

<?php
require('gameheader.php');
?>
<div class="wrap">
    <div class="grid-c2">
        <div class="col-aside">
            <?php
            require('gameleft.php');
            ?>
        </div>
        <div class="col-main">
            <div class="main-wrap">
                <div class="cont-topbar">
                    <div class="nav">
                        <ul>
                            <li>
                                <a class="cur" href="">投放指标数据</a>
                            </li>
                            <li class="btn-gamelist">
                                <a onclick="export_charts('a8b0edbbfeb411e482f2ac162d8a9b20')"
                                   href="javascript:void(0)">导出报表</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="stat-warp">
                    <div class="bor stat-game-con">
                        <div class="game-info">
                            <div class="game-logo">
                                <a href="javascript:void(0)">

                                    <img
                                        src= <?php echo $game['img'] ?>
                                        alt="" style="width:240px;height:240px;">
                                </a>
                            </div>
                            <div class="game-r">
                                <h2><?php echo $active['title'] ?></h2>
                                <div class="form-date">
                                    活动开始至：
                                    <input class="date-picker" type="text" id="date_input" value= <?php echo date("Y-m-d") ?>>
                                </div>
                                <div class="game-nums">
                                    <div id="players_count" class="user-num"><?php echo $uv ?></div>


                                    <div class="collect-num" id = "fenxiang"><?php echo $fenxiang ?></div>

                                    <div id="click_count" class="click-num"><?php echo $click ?></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="game-section" style="margin-bottom:20px">
                        <div class="mod-stat game-stay-time bor">
                            <div id="region" style="width:600px;height:350px;" data-highcharts-chart="2">

                            </div>
                        </div>
                        <div class="mod-stat game-stay-time bor" style="width:340px;margin-left:20px">
                            <div
                                style="margin: 30px 30px;width:280px;height:300px;background:#b2c3db;color: #FFF;text-align: center;">
                                <p style="font-size:45px;padding:25px">活动曝光量</p>

                                <p style="font-size:100px;">301</p>
                            </div>
                        </div>
                    </div>
                    <div class="bor stat-game-con">
                        <div class="form-date" style="margin-left:40px">
                            时间： <input class="date-picker" type="text" id="date_input_visit" value=" 2015-05-25 ">
                        </div>
                        <div id="visit_record" style="width:1000px;height:400px" data-highcharts-chart="1">

                        </div>
                    </div>
                    <div class="game-section">
                        <div class="mod-stat game-stay-time bor">
                            <div class="hd">活动停留时间段</div>
                            <div class="bd" id="stay_time_statistics" data-highcharts-chart="0">
                                <div class="highcharts-container" id="highcharts-0"
                                     style="position: relative; overflow: hidden; width: 630px; height: 275px; text-align: left; line-height: normal; z-index: 0; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);">
                                    <svg version="1.1"
                                         style="font-family:&quot;Lucida Grande&quot;, &quot;Lucida Sans Unicode&quot;, Arial, Helvetica, sans-serif;font-size:12px;"
                                         xmlns="http://www.w3.org/2000/svg" width="630" height="275">
                                        <desc>Created with Highcharts 4.0.4</desc>
                                        <defs>
                                            <clipPath id="highcharts-1">
                                                <rect x="0" y="0" width="564" height="229"></rect>
                                            </clipPath>
                                        </defs>
                                        <rect x="0" y="0" width="630" height="275" strokeWidth="0" fill="#FFFFFF"
                                              class=" highcharts-background"></rect>
                                        <g class="highcharts-button" style="cursor:default;" stroke-linecap="round"
                                           transform="translate(596,10)"><title>Chart context menu</title>
                                            <rect x="0.5" y="0.5" width="24" height="22" strokeWidth="1" fill="white"
                                                  stroke="none" stroke-width="1" rx="2" ry="2"></rect>
                                            <path fill="#E0E0E0"
                                                  d="M 6 6.5 L 20 6.5 M 6 11.5 L 20 11.5 M 6 16.5 L 20 16.5"
                                                  stroke="#666" stroke-width="3" zIndex="1"></path>
                                            <text x="0" zIndex="1" style="color:black;fill:black;" y="13"></text>
                                        </g>
                                        <g class="highcharts-grid" zIndex="1"></g>
                                        <g class="highcharts-grid" zIndex="1">
                                            <path fill="none" d="M 56 9.5 L 620 9.5" stroke="#C0C0C0" stroke-width="1"
                                                  zIndex="1" opacity="1"></path>
                                            <path fill="none" d="M 56 125.5 L 620 125.5" stroke="#C0C0C0"
                                                  stroke-width="1" zIndex="1" opacity="1"></path>
                                            <path fill="none" d="M 56 239.5 L 620 239.5" stroke="#C0C0C0"
                                                  stroke-width="1" zIndex="1" opacity="1"></path>
                                        </g>
                                        <g class="highcharts-axis" zIndex="2">
                                            <path fill="none" d="M 243.5 239 L 243.5 249" stroke="#C0D0E0"
                                                  stroke-width="1" opacity="1"></path>
                                            <path fill="none" d="M 337.5 239 L 337.5 249" stroke="#C0D0E0"
                                                  stroke-width="1" opacity="1"></path>
                                            <path fill="none" d="M 431.5 239 L 431.5 249" stroke="#C0D0E0"
                                                  stroke-width="1" opacity="1"></path>
                                            <path fill="none" d="M 525.5 239 L 525.5 249" stroke="#C0D0E0"
                                                  stroke-width="1" opacity="1"></path>
                                            <path fill="none" d="M 620.5 239 L 620.5 249" stroke="#C0D0E0"
                                                  stroke-width="1" opacity="1"></path>
                                            <path fill="none" d="M 149.5 239 L 149.5 249" stroke="#C0D0E0"
                                                  stroke-width="1" opacity="1"></path>
                                            <path fill="none" d="M 55.5 239 L 55.5 249" stroke="#C0D0E0"
                                                  stroke-width="1" opacity="1"></path>
                                            <path fill="none" d="M 56 239.5 L 620 239.5" stroke="#C0D0E0"
                                                  stroke-width="1" zIndex="7" visibility="visible"></path>
                                        </g>
                                        <g class="highcharts-axis" zIndex="2">
                                            <text x="24.03125" zIndex="7" text-anchor="end"
                                                  transform="translate(0,0) rotate(270 24.03125 10)"
                                                  class=" highcharts-yaxis-title" style="color:#707070;fill:#707070;"
                                                  visibility="visible" y="10">玩家
                                            </text>
                                        </g>
                                        <g class="highcharts-series-group" zIndex="3">
                                            <g class="highcharts-series highcharts-tracker" visibility="visible"
                                               zIndex="0.1" transform="translate(56,10) scale(1 1)" style=""
                                               clip-path="url(#highcharts-1)">
                                                <rect x="23.5" y="229.5" width="46" height="0" fill="#EF5AA2" rx="0"
                                                      ry="0" stroke="#FFFFFF" stroke-width="1"></rect>
                                                <rect x="117.5" y="229.5" width="46" height="0" fill="#EF5AA2" rx="0"
                                                      ry="0" stroke="#FFFFFF" stroke-width="1"></rect>
                                                <rect x="211.5" y="229.5" width="46" height="0" fill="#EF5AA2" rx="0"
                                                      ry="0" stroke="#FFFFFF" stroke-width="1"></rect>
                                                <rect x="305.5" y="115.5" width="46" height="114" fill="#EF5AA2" rx="0"
                                                      ry="0" stroke="#FFFFFF" stroke-width="1"></rect>
                                                <rect x="399.5" y="229.5" width="46" height="0" fill="#EF5AA2" rx="0"
                                                      ry="0" stroke="#FFFFFF" stroke-width="1"></rect>
                                                <rect x="493.5" y="229.5" width="46" height="0" fill="#EF5AA2" rx="0"
                                                      ry="0" stroke="#FFFFFF" stroke-width="1"></rect>
                                            </g>
                                            <g class="highcharts-markers" visibility="visible" zIndex="0.1"
                                               transform="translate(56,10) scale(1 1)" clip-path="none"></g>
                                        </g>
                                        <g class="highcharts-axis-labels highcharts-xaxis-labels" zIndex="7">
                                            <text x="103" text-anchor="middle"
                                                  style="width:74px;color:#606060;cursor:default;font-size:11px;fill:#606060;"
                                                  y="260" opacity="1">00:00—04:00
                                            </text>
                                            <text x="197" text-anchor="middle"
                                                  style="width:74px;color:#606060;cursor:default;font-size:11px;fill:#606060;"
                                                  y="260" opacity="1">04:00—08:00
                                            </text>
                                            <text x="291" text-anchor="middle"
                                                  style="width:74px;color:#606060;cursor:default;font-size:11px;fill:#606060;"
                                                  y="260" opacity="1">08:00—12:00
                                            </text>
                                            <text x="385" text-anchor="middle"
                                                  style="width:74px;color:#606060;cursor:default;font-size:11px;fill:#606060;"
                                                  y="260" opacity="1">12:00—16:00
                                            </text>
                                            <text x="479" text-anchor="middle"
                                                  style="width:74px;color:#606060;cursor:default;font-size:11px;fill:#606060;"
                                                  y="260" opacity="1">16:00—20:00
                                            </text>
                                            <text x="573" text-anchor="middle"
                                                  style="width:74px;color:#606060;cursor:default;font-size:11px;fill:#606060;"
                                                  y="260" opacity="1">20:00—00:00
                                            </text>
                                        </g>
                                        <g class="highcharts-axis-labels highcharts-yaxis-labels" zIndex="7">
                                            <text x="41" text-anchor="end"
                                                  style="width:188px;color:#606060;cursor:default;font-size:11px;fill:#606060;"
                                                  y="245.5" opacity="1">0
                                            </text>
                                            <text x="41" text-anchor="end"
                                                  style="width:188px;color:#606060;cursor:default;font-size:11px;fill:#606060;"
                                                  y="131" opacity="1">1
                                            </text>
                                            <text x="41" text-anchor="end"
                                                  style="width:188px;color:#606060;cursor:default;font-size:11px;fill:#606060;"
                                                  y="16.5" opacity="1">2
                                            </text>
                                        </g>
                                        <g class="highcharts-tooltip" zIndex="8"
                                           style="cursor:default;padding:0;white-space:nowrap;"
                                           transform="translate(0,-9999)">
                                            <path fill="none"
                                                  d="M 3 0 L 13 0 C 16 0 16 0 16 3 L 16 13 C 16 16 16 16 13 16 L 3 16 C 0 16 0 16 0 13 L 0 3 C 0 0 0 0 3 0"
                                                  isShadow="true" stroke="black" stroke-opacity="0.049999999999999996"
                                                  stroke-width="5" transform="translate(1, 1)"></path>
                                            <path fill="none"
                                                  d="M 3 0 L 13 0 C 16 0 16 0 16 3 L 16 13 C 16 16 16 16 13 16 L 3 16 C 0 16 0 16 0 13 L 0 3 C 0 0 0 0 3 0"
                                                  isShadow="true" stroke="black" stroke-opacity="0.09999999999999999"
                                                  stroke-width="3" transform="translate(1, 1)"></path>
                                            <path fill="none"
                                                  d="M 3 0 L 13 0 C 16 0 16 0 16 3 L 16 13 C 16 16 16 16 13 16 L 3 16 C 0 16 0 16 0 13 L 0 3 C 0 0 0 0 3 0"
                                                  isShadow="true" stroke="black" stroke-opacity="0.15" stroke-width="1"
                                                  transform="translate(1, 1)"></path>
                                            <path fill="rgba(249, 249, 249, .85)"
                                                  d="M 3 0 L 13 0 C 16 0 16 0 16 3 L 16 13 C 16 16 16 16 13 16 L 3 16 C 0 16 0 16 0 13 L 0 3 C 0 0 0 0 3 0"></path>
                                            <text x="8" zIndex="1" style="font-size:12px;color:#333333;fill:#333333;"
                                                  y="21"></text>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div class="mod-stat game-grade bor">
                            <div class="hd">回访率</div>
                            <div class="bd">
                                <div class="mod-star">
                                    <div class="star">
                                        <span style="width:100%;"></span>
                                    </div>
                                    <div class="text"><em></em>
                                        <span></span>
                                    </div>
                                </div>
                                <div class="state-num">
                                    <span>今日回访率</span>
                                    <em>0%</em>
                                    <i>昨日回访：0%</i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="copyright" style="text-align: center; margin:20px 0 0 0">
                    <?php require 'qingting_footer.php' ?>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="pop-overlay" class="hidden" style="z-index: 1"></div>
<script>
    var pageType = 'on';
</script>
<script src="/public/active/js/dropmenu.js"></script>
<script src="/public/active/js/hdp-modal.js"></script>
<script src="/public/active/js/icheck.min.js"></script>
<script src="/public/active/js/select.js"></script>
<script src="/public/active/js/jquery.datetimepicker.js"></script>
<script src="/public/active/js/UrlHelper.js"></script>
<script src="/public/active/js/webuploader.js"></script>
<script src="/public/active/js/highchart.js"></script>
<script src="/public/active/js/exporting.js"></script>

<script src="/public/active/js/data_info.js"></script>

<script type="text/javascript" >
    var stayTimeDatas = eval('({"values":[[0,0,0,0,0,0]],"keys":["00:00—04:00","04:00—08:00","08:00—12:00","12:00—16:00","16:00—20:00","20:00—00:00"]})');
    var activityId = <?php echo $_GET['id'] ?>;
    var visit_record = "";
    var a = <?php echo '222' ?>;
    var visit_region = <?php echo '"' . $area . '"' ?>;
</script>
</body>
</html>
