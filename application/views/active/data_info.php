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
                                    <input class="date-picker" type="text" id="date_input"
                                           value= <?php echo date("Y-m-d") ?>>
                                </div>
                                <div class="game-nums">
                                    <div id="players_count" class="user-num"><?php echo $uv ?></div>


                                    <div class="collect-num" id="fenxiang"><?php echo $fenxiang ?></div>

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
                            时间： <input class="date-picker" type="text" id="date_input_visit" value=<?php echo date('Y-m-d ') ?>>
                        </div>
                        <div id="visit_record" style="width:1000px;height:400px" data-highcharts-chart="1">

                        </div>
                    </div>
                    <div class="game-section">
                        <div class="mod-stat game-stay-time bor">
                            <div class="hd">活动停留时间段</div>
                            <div class="bd" id="stay_time_statistics" data-highcharts-chart="0">

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
                                    <em><?php echo $return . '%'?></em>
                                    <i>昨日回访：<?php echo $yestday . '%' ?></i>
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

<script type="text/javascript">
    var stayTimeDatas = eval('({"values":[ <?php echo $stay ?> ],"keys":["00:00—04:00","04:00—08:00","08:00—12:00","12:00—16:00","16:00—20:00","20:00—00:00"]})');
    var activityId = <?php echo $_GET['id'] ?>;
    var visit_record = "<?php foreach($basic_info as $f) { ?>
    <?php echo '{name:' . "'" .  $f['basic_info'] . '<br>' . ' 访问IP: ' .  $f['ip'] . " 访问时间：'" . ',data: [[ ' . date('H',$f['tm']) . ',' . date('i',$f['tm'])   . "]]}" ?>
    <?php } ?>"
    visit_record   =   visit_record.replace(/\s+/g,"");
    visit_record = visit_record.replace(/}{/g,'}&{')
//    var visit_record = "{name: 'Mozilla/5.0 (Linux; U; Android 4.1.1; zh-cn; M032 Build/JRO03H) AppleWebKit/533.1 (KHTML, like Gecko)Version/4.0 MQQBrowser/5.4 TBS/025411 Mobile Safari/533.1 MicroMessenger/6.1.0.66_r1062275.542 NetType/WIFI来自： 访问IP: 27.184.52.134, 123.151.12.152 访问时间：',color: 'rgba(223, 83, 83, .5)',data: [[5, 37]]}";
    var a = <?php echo '222' ?>;
    var visit_region = <?php echo '"' . $area . '"' ?>;
</script>
</body>
</html>
