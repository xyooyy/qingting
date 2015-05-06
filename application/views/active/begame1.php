<!DOCTYPE html>
<!-- saved from url=(0029)http://act.aiwanpai.com/basic -->
<html lang="zh-cn">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta charset="UTF-8"/>
    <title>基本资料</title>
    <meta http-equiv="X-UA-Compatible" content="chrome=1"/>
    <meta name="keywords" content=""/>
    <meta name="description" content="your description"/>
    <link rel="stylesheet" href="/public/active/css/common.css"/>
    <link rel="stylesheet" href="/public/active/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="/public/active/css/activities_step1.css"/>
    <link rel="stylesheet" href="/public/active/css/demo.css"/>
    <!--[if IE 6]>
    <script type="text/javascript">document.execCommand("BackgroundImageCache", false, true);</script>
    <![endif]-->
    <script type="text/javascript">
        var rootUrl = "<?php echo $_SERVER['HTTP_HOST'];?>";
        var activityScene = '';
    </script>
    <style>
        body .form-group .form-textarea {
            width: 400px;
            background: #eeeeee;
            line-height: 28px;
            color: #636363;
            border: 0 none;
            height: 80px;
            overflow: auto;
            padding: 10px 14px;
            resize: none;
        }
    </style>
</head>
<body class="">
<?php
require('gameheader.php');
?>
<div class="wrap">
    <div class="main">
        <?php
        require('gameleft.php');
        ?>
        <div class="content">
            <div class="top-nav">
                <div class="w1036">
                    <ul>
                        <li><a href="http://act.aiwanpai.com/basic#1"> 活动计划 </a></li>
                    </ul>
                    <a class="create-btn" href="./begame1_files/begame1.html"> 新建活动 </a>
                </div>
            </div>
            <div class="content-wrap">
                <div class="w1036">
                    <ul class="step-show">
                        <li class="active">
                            <a href="./begame1?id=<?php echo $_GET['id'] ?>">
                                <span>
                                    基本资料
                                </span>
                                <i class="icon-circle"></i>
                            </a>
                        </li>
                        <li>
                            <a href="./begame2?id=<?php echo $_GET['id'] ?>">
                                <span>
                                    选择游戏
                                </span>
                                <i class="icon-circle"></i>
                            </a>
                        </li>
                        <li>
                            <a href="./begame3?id=<?php echo $_GET['id'] ?>">
                                <span>
                                    营销元素
                                </span>
                                <i class="icon-circle"></i>
                            </a>
                        </li>
                        <li>
                            <a href="./begame4?id=<?php echo $_GET['id'] ?>">
                                <span>
                                    确认提交
                                </span>
                                <i class="icon-circle"></i>
                            </a>
                        </li>
                    </ul>
                    <div class="content-main">
                        <form class="comm-form" action="./active_submit" method="post">
                            <input type="hidden" name="id" value="<?php echo $_GET['id'] ?>">

                            <div class="form-group">
                                <label> 活动名称 </label>
                                <input class="input-class input-name" type="text" name="actName"
                                       value="<?php echo $val['title'] ?>"/>

                                <div class="prompt">
                                    <i class="icon-prompt"></i>
                                    <span class="prompt-text"> 以页面标题形式出现在手机顶部位置，仅显示前10个字符。 </span>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="form-date form-fl">
                                    <label>开始时间</label>
                                    <input class="input-class date-picker" type="text" name="startTime"
                                           value="<?php echo $val['starttime'] ? date('Y-m-d H:i', $val['starttime']) : date('Y-m-d H:i', time()) ?>"
                                           autocomplete="on" readonly=""/>
                                    <label class="ti">结束时间</label>
                                    <input class="input-class date-picker" type="text" name="endTime"
                                           value="<?php echo $val['endtime'] ? date('Y-m-d H:i', $val['endtime']) : date('Y-m-d H:i', (time() + 24 * 3600 * 7)) ?>"
                                           autocomplete="on" readonly=""/>
                                </div>
                            </div>
                            <div class="form-group form-group-check">
                                <label>选择商业场景</label>

                                <div>
                                    <input type="radio" name="scene"
                                           value="1" <?php echo $val['type'] == 1 ? 'checked' : ''; ?>  data-id="1"/>&nbsp;品牌传播&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input type="radio" name="scene"
                                           value="2" <?php echo $val['type'] == 2 ? 'checked' : ''; ?> data-id="2"/>&nbsp;微信关注&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input type="radio" name="scene"
                                           value="3" <?php echo $val['type'] == 3 ? 'checked' : ''; ?> data-id="3"/>&nbsp;商城引流&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input type="radio" name="scene"
                                           value="4" <?php echo $val['type'] == 4 ? 'checked' : ''; ?> data-id="4"/>&nbsp;线下导流&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input type="radio" name="scene"
                                           value="5" <?php echo $val['type'] == 5 ? 'checked' : ''; ?> data-id="5"/>&nbsp;展会活动&nbsp;&nbsp;&nbsp;&nbsp;
                                </div>

                            </div>
                            <div class="commercial-content">
                                <span> <h3> 品牌传播 </h3> <p> 中奖后得到兑换号，关注公众平台后给入口验证此兑换号正确后再真正获得 </p> </span>
                                <!--新增  二维码 kiner-->
                                <div class="code">
                                    <a href="#"><!--<img src="./begame1_files/1.jpg" alt="玩儿命加载中..." />--></a>
                                </div>
                            </div>
                            <div class="yesOrNo has-prize">
                                <div class="form-group">
                                    <label> 是否设活动奖品 </label>

                                    <div>
                                        <input type="radio" name="ischou"
                                               value="1" <?php echo $val['ischou'] == 1 ? 'checked' : ''; ?>
                                               data-id="1"/>&nbsp;需要&nbsp;&nbsp;&nbsp;&nbsp;
                                        <input type="radio" name="ischou"
                                               value="0" <?php echo $val['ischou'] == 0 ? 'checked' : ''; ?>
                                               data-id="0"/>&nbsp;不需要&nbsp;&nbsp;&nbsp;&nbsp;
                                    </div>

                                </div>
                            </div>
                            <div class="wx-share">
                                <div class="form-group">
                                    <label> 微信分享标题 </label>
                                    <input class="input-class input-name" type="text" name="wxTitle"
                                           value="<?php echo $val['fenxiangt'] ?>"/>*如需获取分数的部分写入'#score#'
                                </div>
                                <div class="form-group" style="height:auto">
                                    <label>微信分享描述</label>
                                    <textarea class="form-textarea" placeholder="建议文本描述不要过长"
                                              name="wxDesc"><?php echo $val['fenxiangc'] ?></textarea>
                                </div>
                                <div class="form-group form-group-check">
                                    <label> 微信分享缩图 </label>

                                    <div class="form-single-upload wx-avatar-upload">
                                        <div class="form-fileupload litpci-load" style="height:200px;width:200px;">
                                            <img
                                                src="<?php echo $val['fenxiangi'] ? 'http://' .$_SERVER['HTTP_HOST'] . $val['fenxiangi'] : '/public/images/s.png' ?>"
                                                id="now_img"/>
                                            <em class="ico-sucess"></em>

                                            <input type="hidden" name="wxImg" value=""/>

                                            <div class="inner bg" style="display: none;">
                                                <p><i>200px X 200px</i></p>

                                                <p>（30K以内jpg,png图片）</p>

                                                <div class="picker webuploader-container">
                                                    <div class="webuploader-pick">
                                                        本地上传
                                                    </div>
                                                    <div id="rt_rt_19hscv7ca1bmcif0bin1htlmk51"
                                                         style="position: absolute; top: 0px; left: 0px; width: 110px; height: 40px; overflow: hidden; bottom: auto; right: auto;">
                                                        <input type="file" name="file"
                                                               class="webuploader-element-invisible" accept="image/*"/>
                                                        <label
                                                            style="opacity: 0; width: 100%; height: 100%; display: block; cursor: pointer; background: rgb(255, 255, 255);"></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="new-eggs-info" style="display: none;">
                                <div class="yesOrNo">
                                    <div class="form-group">
                                        <label> 重复中奖 </label>

                                        <div class="iradio_polaris">
                                            <input type="radio" name="liveErnieActivity.repeatedlyWinning" value="1"
                                                   data-id="1" style="position: absolute; opacity: 0;"/>
                                            <ins class="iCheck-helper"
                                                 style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; border: 0px; opacity: 0; background: rgb(255, 255, 255);"></ins>
                                        </div>
                                        <span class="options">允许</span>

                                        <div class="iradio_polaris checked">
                                            <input type="radio" name="liveErnieActivity.repeatedlyWinning" value="0"
                                                   data-id="2" checked="" style="position: absolute; opacity: 0;"/>
                                            <ins class="iCheck-helper"
                                                 style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; border: 0px; opacity: 0; background: rgb(255, 255, 255);"></ins>
                                        </div>
                                        <span class="options">不允许</span>
                                    </div>
                                </div>
                                <div class="new-eggs-prize cc">
                                    <div class="fl">
                                        <div class="form-group">
                                            <label>奖品标题</label>
                                            <input class="input-class input-name" type="text" name="prize_title"/>
                                        </div>
                                        <div class="form-group form-group-check">
                                            <label> 奖品图片 </label>

                                            <div class="form-single-upload new-eggs-prize-upload">
                                                <div class="form-fileupload litpci-load"
                                                     style="height:200px;width:200px;">
                                                    <img src="./begame1_files/s.png"/>
                                                    <em class="ico-sucess"></em>
                                                    <input type="hidden" name="avatar" value=""/>

                                                    <div class="inner">
                                                        <p><i>200px X 200px</i></p>

                                                        <p>（30K以内jpg,png图片）</p>

                                                        <div class="picker webuploader-container">
                                                            <div class="webuploader-pick">
                                                                本地上传
                                                            </div>
                                                            <div id="rt_rt_19hscv7cej4e1onfe1ef518l34"
                                                                 style="position: absolute; top: 0px; left: 0px; width: 110px; height: 40px; overflow: hidden; bottom: auto; right: auto;">
                                                                <input type="file" name="file"
                                                                       class="webuploader-element-invisible"
                                                                       accept="image/*"/>
                                                                <label
                                                                    style="opacity: 0; width: 100%; height: 100%; display: block; cursor: pointer; background: rgb(255, 255, 255);"></label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="fr form-action prize-action">
                                        <button class="btn prize-add" type="button">新增</button>
                                        <button class="btn prize-remove" type="button">移除</button>
                                    </div>
                                </div>
                            </div>
                            <div class="submit-group">
                                <a class="next" href="javascript:;"
                                   onClick="$('#fimg').val($('#now_img').attr('src'));"> 下一步 </a>
                            </div>
                            <input type="text" name="fimg" value="" id="fimg" style=" color:#fff; border:none;">
                            <!-- <input type="submit" > -->
                        </form>
                    </div>
                    <div id="footer">
                        Copyright &copy; All Rights Reserved
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="/public/active/js/jquery.js"></script>
<script src="/public/active/js/bootstrap.min.js"></script>
<script src="/public/active/js/hdp-modal.js"></script>
<script src="/public/active/js/app.js"></script>
<script src="/public/active/js/dropmenu.js"></script>
<script src="/public/active/js/icheck.min.js"></script>
<script src="/public/active/js/select.js"></script>
<script src="/public/active/js/jquery.datetimepicker.js"></script>
<script src="/public/active/js/UrlHelper.js"></script>
<script src="/public/active/js/webuploader.js"></script>
<script src="/public/active/js/activities_step1.js"></script>
<div class="xdsoft_datetimepicker xdsoft_noselect ">
    <div class="xdsoft_datepicker active">
        <div class="xdsoft_mounthpicker">
            <button type="button" class="xdsoft_prev"></button>
            <button type="button" class="xdsoft_today_button" style="visibility: visible;"></button>
            <div class="xdsoft_label xdsoft_month">
                <span>四月</span>

                <div class="xdsoft_select xdsoft_monthselect xdsoft_scroller_box">
                    <div style="margin-top: 0px;">
                        <div class="xdsoft_option " data-value="0">
                            一月
                        </div>
                        <div class="xdsoft_option " data-value="1">
                            二月
                        </div>
                        <div class="xdsoft_option " data-value="2">
                            三月
                        </div>
                        <div class="xdsoft_option xdsoft_current" data-value="3">
                            四月
                        </div>
                        <div class="xdsoft_option " data-value="4">
                            五月
                        </div>
                        <div class="xdsoft_option " data-value="5">
                            六月
                        </div>
                        <div class="xdsoft_option " data-value="6">
                            七月
                        </div>
                        <div class="xdsoft_option " data-value="7">
                            八月
                        </div>
                        <div class="xdsoft_option " data-value="8">
                            九月
                        </div>
                        <div class="xdsoft_option " data-value="9">
                            十月
                        </div>
                        <div class="xdsoft_option " data-value="10">
                            十一月
                        </div>
                        <div class="xdsoft_option " data-value="11">
                            十二月
                        </div>
                    </div>
                    <div class="xdsoft_scrollbar">
                        <div class="xdsoft_scroller" style="display: block; height: 10px; margin-top: 0px;"></div>
                    </div>
                </div>
            </div>
            <div class="xdsoft_label xdsoft_year">
                <span>2015</span>

                <div class="xdsoft_select xdsoft_yearselect xdsoft_scroller_box">
                    <div style="margin-top: 0px;">
                        <div class="xdsoft_option " data-value="1950">
                            1950
                        </div>
                        <div class="xdsoft_option " data-value="1951">
                            1951
                        </div>
                        <div class="xdsoft_option " data-value="1952">
                            1952
                        </div>
                        <div class="xdsoft_option " data-value="1953">
                            1953
                        </div>
                        <div class="xdsoft_option " data-value="1954">
                            1954
                        </div>
                        <div class="xdsoft_option " data-value="1955">
                            1955
                        </div>
                        <div class="xdsoft_option " data-value="1956">
                            1956
                        </div>
                        <div class="xdsoft_option " data-value="1957">
                            1957
                        </div>
                        <div class="xdsoft_option " data-value="1958">
                            1958
                        </div>
                        <div class="xdsoft_option " data-value="1959">
                            1959
                        </div>
                        <div class="xdsoft_option " data-value="1960">
                            1960
                        </div>
                        <div class="xdsoft_option " data-value="1961">
                            1961
                        </div>
                        <div class="xdsoft_option " data-value="1962">
                            1962
                        </div>
                        <div class="xdsoft_option " data-value="1963">
                            1963
                        </div>
                        <div class="xdsoft_option " data-value="1964">
                            1964
                        </div>
                        <div class="xdsoft_option " data-value="1965">
                            1965
                        </div>
                        <div class="xdsoft_option " data-value="1966">
                            1966
                        </div>
                        <div class="xdsoft_option " data-value="1967">
                            1967
                        </div>
                        <div class="xdsoft_option " data-value="1968">
                            1968
                        </div>
                        <div class="xdsoft_option " data-value="1969">
                            1969
                        </div>
                        <div class="xdsoft_option " data-value="1970">
                            1970
                        </div>
                        <div class="xdsoft_option " data-value="1971">
                            1971
                        </div>
                        <div class="xdsoft_option " data-value="1972">
                            1972
                        </div>
                        <div class="xdsoft_option " data-value="1973">
                            1973
                        </div>
                        <div class="xdsoft_option " data-value="1974">
                            1974
                        </div>
                        <div class="xdsoft_option " data-value="1975">
                            1975
                        </div>
                        <div class="xdsoft_option " data-value="1976">
                            1976
                        </div>
                        <div class="xdsoft_option " data-value="1977">
                            1977
                        </div>
                        <div class="xdsoft_option " data-value="1978">
                            1978
                        </div>
                        <div class="xdsoft_option " data-value="1979">
                            1979
                        </div>
                        <div class="xdsoft_option " data-value="1980">
                            1980
                        </div>
                        <div class="xdsoft_option " data-value="1981">
                            1981
                        </div>
                        <div class="xdsoft_option " data-value="1982">
                            1982
                        </div>
                        <div class="xdsoft_option " data-value="1983">
                            1983
                        </div>
                        <div class="xdsoft_option " data-value="1984">
                            1984
                        </div>
                        <div class="xdsoft_option " data-value="1985">
                            1985
                        </div>
                        <div class="xdsoft_option " data-value="1986">
                            1986
                        </div>
                        <div class="xdsoft_option " data-value="1987">
                            1987
                        </div>
                        <div class="xdsoft_option " data-value="1988">
                            1988
                        </div>
                        <div class="xdsoft_option " data-value="1989">
                            1989
                        </div>
                        <div class="xdsoft_option " data-value="1990">
                            1990
                        </div>
                        <div class="xdsoft_option " data-value="1991">
                            1991
                        </div>
                        <div class="xdsoft_option " data-value="1992">
                            1992
                        </div>
                        <div class="xdsoft_option " data-value="1993">
                            1993
                        </div>
                        <div class="xdsoft_option " data-value="1994">
                            1994
                        </div>
                        <div class="xdsoft_option " data-value="1995">
                            1995
                        </div>
                        <div class="xdsoft_option " data-value="1996">
                            1996
                        </div>
                        <div class="xdsoft_option " data-value="1997">
                            1997
                        </div>
                        <div class="xdsoft_option " data-value="1998">
                            1998
                        </div>
                        <div class="xdsoft_option " data-value="1999">
                            1999
                        </div>
                        <div class="xdsoft_option " data-value="2000">
                            2000
                        </div>
                        <div class="xdsoft_option " data-value="2001">
                            2001
                        </div>
                        <div class="xdsoft_option " data-value="2002">
                            2002
                        </div>
                        <div class="xdsoft_option " data-value="2003">
                            2003
                        </div>
                        <div class="xdsoft_option " data-value="2004">
                            2004
                        </div>
                        <div class="xdsoft_option " data-value="2005">
                            2005
                        </div>
                        <div class="xdsoft_option " data-value="2006">
                            2006
                        </div>
                        <div class="xdsoft_option " data-value="2007">
                            2007
                        </div>
                        <div class="xdsoft_option " data-value="2008">
                            2008
                        </div>
                        <div class="xdsoft_option " data-value="2009">
                            2009
                        </div>
                        <div class="xdsoft_option " data-value="2010">
                            2010
                        </div>
                        <div class="xdsoft_option " data-value="2011">
                            2011
                        </div>
                        <div class="xdsoft_option " data-value="2012">
                            2012
                        </div>
                        <div class="xdsoft_option " data-value="2013">
                            2013
                        </div>
                        <div class="xdsoft_option " data-value="2014">
                            2014
                        </div>
                        <div class="xdsoft_option xdsoft_current" data-value="2015">
                            2015
                        </div>
                        <div class="xdsoft_option " data-value="2016">
                            2016
                        </div>
                        <div class="xdsoft_option " data-value="2017">
                            2017
                        </div>
                        <div class="xdsoft_option " data-value="2018">
                            2018
                        </div>
                        <div class="xdsoft_option " data-value="2019">
                            2019
                        </div>
                        <div class="xdsoft_option " data-value="2020">
                            2020
                        </div>
                        <div class="xdsoft_option " data-value="2021">
                            2021
                        </div>
                        <div class="xdsoft_option " data-value="2022">
                            2022
                        </div>
                        <div class="xdsoft_option " data-value="2023">
                            2023
                        </div>
                        <div class="xdsoft_option " data-value="2024">
                            2024
                        </div>
                        <div class="xdsoft_option " data-value="2025">
                            2025
                        </div>
                        <div class="xdsoft_option " data-value="2026">
                            2026
                        </div>
                        <div class="xdsoft_option " data-value="2027">
                            2027
                        </div>
                        <div class="xdsoft_option " data-value="2028">
                            2028
                        </div>
                        <div class="xdsoft_option " data-value="2029">
                            2029
                        </div>
                        <div class="xdsoft_option " data-value="2030">
                            2030
                        </div>
                        <div class="xdsoft_option " data-value="2031">
                            2031
                        </div>
                        <div class="xdsoft_option " data-value="2032">
                            2032
                        </div>
                        <div class="xdsoft_option " data-value="2033">
                            2033
                        </div>
                        <div class="xdsoft_option " data-value="2034">
                            2034
                        </div>
                        <div class="xdsoft_option " data-value="2035">
                            2035
                        </div>
                        <div class="xdsoft_option " data-value="2036">
                            2036
                        </div>
                        <div class="xdsoft_option " data-value="2037">
                            2037
                        </div>
                        <div class="xdsoft_option " data-value="2038">
                            2038
                        </div>
                        <div class="xdsoft_option " data-value="2039">
                            2039
                        </div>
                        <div class="xdsoft_option " data-value="2040">
                            2040
                        </div>
                        <div class="xdsoft_option " data-value="2041">
                            2041
                        </div>
                        <div class="xdsoft_option " data-value="2042">
                            2042
                        </div>
                        <div class="xdsoft_option " data-value="2043">
                            2043
                        </div>
                        <div class="xdsoft_option " data-value="2044">
                            2044
                        </div>
                        <div class="xdsoft_option " data-value="2045">
                            2045
                        </div>
                        <div class="xdsoft_option " data-value="2046">
                            2046
                        </div>
                        <div class="xdsoft_option " data-value="2047">
                            2047
                        </div>
                        <div class="xdsoft_option " data-value="2048">
                            2048
                        </div>
                        <div class="xdsoft_option " data-value="2049">
                            2049
                        </div>
                        <div class="xdsoft_option " data-value="2050">
                            2050
                        </div>
                    </div>
                    <div class="xdsoft_scrollbar">
                        <div class="xdsoft_scroller" style="display: block; height: 10px; margin-top: 0px;"></div>
                    </div>
                </div>
            </div>
            <button type="button" class="xdsoft_next"></button>
        </div>
        <div class="xdsoft_calendar">
            <table>
                <thead>
                <tr>
                    <th>日</th>
                    <th>一</th>
                    <th>二</th>
                    <th>三</th>
                    <th>四</th>
                    <th>五</th>
                    <th>六</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td data-date="29" data-month="2" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week0 xdsoft_date xdsoft_other_month xdsoft_weekend">
                        <div>
                            29
                        </div>
                    </td>
                    <td data-date="30" data-month="2" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week1 xdsoft_date xdsoft_other_month">
                        <div>
                            30
                        </div>
                    </td>
                    <td data-date="31" data-month="2" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week2 xdsoft_date xdsoft_other_month">
                        <div>
                            31
                        </div>
                    </td>
                    <td data-date="1" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week3 xdsoft_date">
                        <div>
                            1
                        </div>
                    </td>
                    <td data-date="2" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week4 xdsoft_date xdsoft_current xdsoft_today">
                        <div>
                            2
                        </div>
                    </td>
                    <td data-date="3" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week5 xdsoft_date">
                        <div>
                            3
                        </div>
                    </td>
                    <td data-date="4" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week6 xdsoft_date xdsoft_weekend">
                        <div>
                            4
                        </div>
                    </td>
                </tr>
                <tr>
                    <td data-date="5" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week0 xdsoft_date xdsoft_weekend">
                        <div>
                            5
                        </div>
                    </td>
                    <td data-date="6" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week1 xdsoft_date">
                        <div>
                            6
                        </div>
                    </td>
                    <td data-date="7" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week2 xdsoft_date">
                        <div>
                            7
                        </div>
                    </td>
                    <td data-date="8" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week3 xdsoft_date">
                        <div>
                            8
                        </div>
                    </td>
                    <td data-date="9" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week4 xdsoft_date">
                        <div>
                            9
                        </div>
                    </td>
                    <td data-date="10" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week5 xdsoft_date">
                        <div>
                            10
                        </div>
                    </td>
                    <td data-date="11" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week6 xdsoft_date xdsoft_weekend">
                        <div>
                            11
                        </div>
                    </td>
                </tr>
                <tr>
                    <td data-date="12" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week0 xdsoft_date xdsoft_weekend">
                        <div>
                            12
                        </div>
                    </td>
                    <td data-date="13" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week1 xdsoft_date">
                        <div>
                            13
                        </div>
                    </td>
                    <td data-date="14" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week2 xdsoft_date">
                        <div>
                            14
                        </div>
                    </td>
                    <td data-date="15" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week3 xdsoft_date">
                        <div>
                            15
                        </div>
                    </td>
                    <td data-date="16" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week4 xdsoft_date">
                        <div>
                            16
                        </div>
                    </td>
                    <td data-date="17" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week5 xdsoft_date">
                        <div>
                            17
                        </div>
                    </td>
                    <td data-date="18" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week6 xdsoft_date xdsoft_weekend">
                        <div>
                            18
                        </div>
                    </td>
                </tr>
                <tr>
                    <td data-date="19" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week0 xdsoft_date xdsoft_weekend">
                        <div>
                            19
                        </div>
                    </td>
                    <td data-date="20" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week1 xdsoft_date">
                        <div>
                            20
                        </div>
                    </td>
                    <td data-date="21" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week2 xdsoft_date">
                        <div>
                            21
                        </div>
                    </td>
                    <td data-date="22" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week3 xdsoft_date">
                        <div>
                            22
                        </div>
                    </td>
                    <td data-date="23" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week4 xdsoft_date">
                        <div>
                            23
                        </div>
                    </td>
                    <td data-date="24" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week5 xdsoft_date">
                        <div>
                            24
                        </div>
                    </td>
                    <td data-date="25" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week6 xdsoft_date xdsoft_weekend">
                        <div>
                            25
                        </div>
                    </td>
                </tr>
                <tr>
                    <td data-date="26" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week0 xdsoft_date xdsoft_weekend">
                        <div>
                            26
                        </div>
                    </td>
                    <td data-date="27" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week1 xdsoft_date">
                        <div>
                            27
                        </div>
                    </td>
                    <td data-date="28" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week2 xdsoft_date">
                        <div>
                            28
                        </div>
                    </td>
                    <td data-date="29" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week3 xdsoft_date">
                        <div>
                            29
                        </div>
                    </td>
                    <td data-date="30" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week4 xdsoft_date">
                        <div>
                            30
                        </div>
                    </td>
                    <td data-date="1" data-month="4" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week5 xdsoft_date xdsoft_other_month">
                        <div>
                            1
                        </div>
                    </td>
                    <td data-date="2" data-month="4" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week6 xdsoft_date xdsoft_other_month xdsoft_weekend">
                        <div>
                            2
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="xdsoft_timepicker active">
        <button type="button" class="xdsoft_prev"></button>
        <div class="xdsoft_time_box xdsoft_scroller_box">
            <div class="xdsoft_time_variant" style="margin-top: 0px;">
                <div class="xdsoft_time " data-hour="0" data-minute="0">
                    00:00
                </div>
                <div class="xdsoft_time " data-hour="0" data-minute="10">
                    00:10
                </div>
                <div class="xdsoft_time " data-hour="0" data-minute="20">
                    00:20
                </div>
                <div class="xdsoft_time " data-hour="0" data-minute="30">
                    00:30
                </div>
                <div class="xdsoft_time " data-hour="0" data-minute="40">
                    00:40
                </div>
                <div class="xdsoft_time " data-hour="0" data-minute="50">
                    00:50
                </div>
                <div class="xdsoft_time " data-hour="1" data-minute="0">
                    01:00
                </div>
                <div class="xdsoft_time " data-hour="1" data-minute="10">
                    01:10
                </div>
                <div class="xdsoft_time " data-hour="1" data-minute="20">
                    01:20
                </div>
                <div class="xdsoft_time " data-hour="1" data-minute="30">
                    01:30
                </div>
                <div class="xdsoft_time " data-hour="1" data-minute="40">
                    01:40
                </div>
                <div class="xdsoft_time " data-hour="1" data-minute="50">
                    01:50
                </div>
                <div class="xdsoft_time " data-hour="2" data-minute="0">
                    02:00
                </div>
                <div class="xdsoft_time " data-hour="2" data-minute="10">
                    02:10
                </div>
                <div class="xdsoft_time " data-hour="2" data-minute="20">
                    02:20
                </div>
                <div class="xdsoft_time " data-hour="2" data-minute="30">
                    02:30
                </div>
                <div class="xdsoft_time " data-hour="2" data-minute="40">
                    02:40
                </div>
                <div class="xdsoft_time " data-hour="2" data-minute="50">
                    02:50
                </div>
                <div class="xdsoft_time " data-hour="3" data-minute="0">
                    03:00
                </div>
                <div class="xdsoft_time " data-hour="3" data-minute="10">
                    03:10
                </div>
                <div class="xdsoft_time " data-hour="3" data-minute="20">
                    03:20
                </div>
                <div class="xdsoft_time " data-hour="3" data-minute="30">
                    03:30
                </div>
                <div class="xdsoft_time " data-hour="3" data-minute="40">
                    03:40
                </div>
                <div class="xdsoft_time " data-hour="3" data-minute="50">
                    03:50
                </div>
                <div class="xdsoft_time " data-hour="4" data-minute="0">
                    04:00
                </div>
                <div class="xdsoft_time " data-hour="4" data-minute="10">
                    04:10
                </div>
                <div class="xdsoft_time " data-hour="4" data-minute="20">
                    04:20
                </div>
                <div class="xdsoft_time " data-hour="4" data-minute="30">
                    04:30
                </div>
                <div class="xdsoft_time " data-hour="4" data-minute="40">
                    04:40
                </div>
                <div class="xdsoft_time " data-hour="4" data-minute="50">
                    04:50
                </div>
                <div class="xdsoft_time " data-hour="5" data-minute="0">
                    05:00
                </div>
                <div class="xdsoft_time " data-hour="5" data-minute="10">
                    05:10
                </div>
                <div class="xdsoft_time " data-hour="5" data-minute="20">
                    05:20
                </div>
                <div class="xdsoft_time " data-hour="5" data-minute="30">
                    05:30
                </div>
                <div class="xdsoft_time " data-hour="5" data-minute="40">
                    05:40
                </div>
                <div class="xdsoft_time " data-hour="5" data-minute="50">
                    05:50
                </div>
                <div class="xdsoft_time " data-hour="6" data-minute="0">
                    06:00
                </div>
                <div class="xdsoft_time " data-hour="6" data-minute="10">
                    06:10
                </div>
                <div class="xdsoft_time " data-hour="6" data-minute="20">
                    06:20
                </div>
                <div class="xdsoft_time " data-hour="6" data-minute="30">
                    06:30
                </div>
                <div class="xdsoft_time " data-hour="6" data-minute="40">
                    06:40
                </div>
                <div class="xdsoft_time " data-hour="6" data-minute="50">
                    06:50
                </div>
                <div class="xdsoft_time " data-hour="7" data-minute="0">
                    07:00
                </div>
                <div class="xdsoft_time " data-hour="7" data-minute="10">
                    07:10
                </div>
                <div class="xdsoft_time " data-hour="7" data-minute="20">
                    07:20
                </div>
                <div class="xdsoft_time " data-hour="7" data-minute="30">
                    07:30
                </div>
                <div class="xdsoft_time " data-hour="7" data-minute="40">
                    07:40
                </div>
                <div class="xdsoft_time " data-hour="7" data-minute="50">
                    07:50
                </div>
                <div class="xdsoft_time " data-hour="8" data-minute="0">
                    08:00
                </div>
                <div class="xdsoft_time " data-hour="8" data-minute="10">
                    08:10
                </div>
                <div class="xdsoft_time " data-hour="8" data-minute="20">
                    08:20
                </div>
                <div class="xdsoft_time " data-hour="8" data-minute="30">
                    08:30
                </div>
                <div class="xdsoft_time " data-hour="8" data-minute="40">
                    08:40
                </div>
                <div class="xdsoft_time " data-hour="8" data-minute="50">
                    08:50
                </div>
                <div class="xdsoft_time " data-hour="9" data-minute="0">
                    09:00
                </div>
                <div class="xdsoft_time " data-hour="9" data-minute="10">
                    09:10
                </div>
                <div class="xdsoft_time " data-hour="9" data-minute="20">
                    09:20
                </div>
                <div class="xdsoft_time " data-hour="9" data-minute="30">
                    09:30
                </div>
                <div class="xdsoft_time " data-hour="9" data-minute="40">
                    09:40
                </div>
                <div class="xdsoft_time " data-hour="9" data-minute="50">
                    09:50
                </div>
                <div class="xdsoft_time " data-hour="10" data-minute="0">
                    10:00
                </div>
                <div class="xdsoft_time " data-hour="10" data-minute="10">
                    10:10
                </div>
                <div class="xdsoft_time " data-hour="10" data-minute="20">
                    10:20
                </div>
                <div class="xdsoft_time " data-hour="10" data-minute="30">
                    10:30
                </div>
                <div class="xdsoft_time " data-hour="10" data-minute="40">
                    10:40
                </div>
                <div class="xdsoft_time " data-hour="10" data-minute="50">
                    10:50
                </div>
                <div class="xdsoft_time " data-hour="11" data-minute="0">
                    11:00
                </div>
                <div class="xdsoft_time " data-hour="11" data-minute="10">
                    11:10
                </div>
                <div class="xdsoft_time " data-hour="11" data-minute="20">
                    11:20
                </div>
                <div class="xdsoft_time " data-hour="11" data-minute="30">
                    11:30
                </div>
                <div class="xdsoft_time " data-hour="11" data-minute="40">
                    11:40
                </div>
                <div class="xdsoft_time " data-hour="11" data-minute="50">
                    11:50
                </div>
                <div class="xdsoft_time " data-hour="12" data-minute="0">
                    12:00
                </div>
                <div class="xdsoft_time " data-hour="12" data-minute="10">
                    12:10
                </div>
                <div class="xdsoft_time " data-hour="12" data-minute="20">
                    12:20
                </div>
                <div class="xdsoft_time " data-hour="12" data-minute="30">
                    12:30
                </div>
                <div class="xdsoft_time " data-hour="12" data-minute="40">
                    12:40
                </div>
                <div class="xdsoft_time " data-hour="12" data-minute="50">
                    12:50
                </div>
                <div class="xdsoft_time " data-hour="13" data-minute="0">
                    13:00
                </div>
                <div class="xdsoft_time " data-hour="13" data-minute="10">
                    13:10
                </div>
                <div class="xdsoft_time " data-hour="13" data-minute="20">
                    13:20
                </div>
                <div class="xdsoft_time " data-hour="13" data-minute="30">
                    13:30
                </div>
                <div class="xdsoft_time " data-hour="13" data-minute="40">
                    13:40
                </div>
                <div class="xdsoft_time " data-hour="13" data-minute="50">
                    13:50
                </div>
                <div class="xdsoft_time " data-hour="14" data-minute="0">
                    14:00
                </div>
                <div class="xdsoft_time " data-hour="14" data-minute="10">
                    14:10
                </div>
                <div class="xdsoft_time xdsoft_current" data-hour="14" data-minute="20">
                    14:20
                </div>
                <div class="xdsoft_time " data-hour="14" data-minute="30">
                    14:30
                </div>
                <div class="xdsoft_time " data-hour="14" data-minute="40">
                    14:40
                </div>
                <div class="xdsoft_time " data-hour="14" data-minute="50">
                    14:50
                </div>
                <div class="xdsoft_time " data-hour="15" data-minute="0">
                    15:00
                </div>
                <div class="xdsoft_time " data-hour="15" data-minute="10">
                    15:10
                </div>
                <div class="xdsoft_time " data-hour="15" data-minute="20">
                    15:20
                </div>
                <div class="xdsoft_time " data-hour="15" data-minute="30">
                    15:30
                </div>
                <div class="xdsoft_time " data-hour="15" data-minute="40">
                    15:40
                </div>
                <div class="xdsoft_time " data-hour="15" data-minute="50">
                    15:50
                </div>
                <div class="xdsoft_time " data-hour="16" data-minute="0">
                    16:00
                </div>
                <div class="xdsoft_time " data-hour="16" data-minute="10">
                    16:10
                </div>
                <div class="xdsoft_time " data-hour="16" data-minute="20">
                    16:20
                </div>
                <div class="xdsoft_time " data-hour="16" data-minute="30">
                    16:30
                </div>
                <div class="xdsoft_time " data-hour="16" data-minute="40">
                    16:40
                </div>
                <div class="xdsoft_time " data-hour="16" data-minute="50">
                    16:50
                </div>
                <div class="xdsoft_time " data-hour="17" data-minute="0">
                    17:00
                </div>
                <div class="xdsoft_time " data-hour="17" data-minute="10">
                    17:10
                </div>
                <div class="xdsoft_time " data-hour="17" data-minute="20">
                    17:20
                </div>
                <div class="xdsoft_time " data-hour="17" data-minute="30">
                    17:30
                </div>
                <div class="xdsoft_time " data-hour="17" data-minute="40">
                    17:40
                </div>
                <div class="xdsoft_time " data-hour="17" data-minute="50">
                    17:50
                </div>
                <div class="xdsoft_time " data-hour="18" data-minute="0">
                    18:00
                </div>
                <div class="xdsoft_time " data-hour="18" data-minute="10">
                    18:10
                </div>
                <div class="xdsoft_time " data-hour="18" data-minute="20">
                    18:20
                </div>
                <div class="xdsoft_time " data-hour="18" data-minute="30">
                    18:30
                </div>
                <div class="xdsoft_time " data-hour="18" data-minute="40">
                    18:40
                </div>
                <div class="xdsoft_time " data-hour="18" data-minute="50">
                    18:50
                </div>
                <div class="xdsoft_time " data-hour="19" data-minute="0">
                    19:00
                </div>
                <div class="xdsoft_time " data-hour="19" data-minute="10">
                    19:10
                </div>
                <div class="xdsoft_time " data-hour="19" data-minute="20">
                    19:20
                </div>
                <div class="xdsoft_time " data-hour="19" data-minute="30">
                    19:30
                </div>
                <div class="xdsoft_time " data-hour="19" data-minute="40">
                    19:40
                </div>
                <div class="xdsoft_time " data-hour="19" data-minute="50">
                    19:50
                </div>
                <div class="xdsoft_time " data-hour="20" data-minute="0">
                    20:00
                </div>
                <div class="xdsoft_time " data-hour="20" data-minute="10">
                    20:10
                </div>
                <div class="xdsoft_time " data-hour="20" data-minute="20">
                    20:20
                </div>
                <div class="xdsoft_time " data-hour="20" data-minute="30">
                    20:30
                </div>
                <div class="xdsoft_time " data-hour="20" data-minute="40">
                    20:40
                </div>
                <div class="xdsoft_time " data-hour="20" data-minute="50">
                    20:50
                </div>
                <div class="xdsoft_time " data-hour="21" data-minute="0">
                    21:00
                </div>
                <div class="xdsoft_time " data-hour="21" data-minute="10">
                    21:10
                </div>
                <div class="xdsoft_time " data-hour="21" data-minute="20">
                    21:20
                </div>
                <div class="xdsoft_time " data-hour="21" data-minute="30">
                    21:30
                </div>
                <div class="xdsoft_time " data-hour="21" data-minute="40">
                    21:40
                </div>
                <div class="xdsoft_time " data-hour="21" data-minute="50">
                    21:50
                </div>
                <div class="xdsoft_time " data-hour="22" data-minute="0">
                    22:00
                </div>
                <div class="xdsoft_time " data-hour="22" data-minute="10">
                    22:10
                </div>
                <div class="xdsoft_time " data-hour="22" data-minute="20">
                    22:20
                </div>
                <div class="xdsoft_time " data-hour="22" data-minute="30">
                    22:30
                </div>
                <div class="xdsoft_time " data-hour="22" data-minute="40">
                    22:40
                </div>
                <div class="xdsoft_time " data-hour="22" data-minute="50">
                    22:50
                </div>
                <div class="xdsoft_time " data-hour="23" data-minute="0">
                    23:00
                </div>
                <div class="xdsoft_time " data-hour="23" data-minute="10">
                    23:10
                </div>
                <div class="xdsoft_time " data-hour="23" data-minute="20">
                    23:20
                </div>
                <div class="xdsoft_time " data-hour="23" data-minute="30">
                    23:30
                </div>
                <div class="xdsoft_time " data-hour="23" data-minute="40">
                    23:40
                </div>
                <div class="xdsoft_time " data-hour="23" data-minute="50">
                    23:50
                </div>
            </div>
            <div class="xdsoft_scrollbar">
                <div class="xdsoft_scroller" style="display: block; height: 10px; margin-top: 0px;"></div>
            </div>
        </div>
        <button type="button" class="xdsoft_next"></button>
    </div>
</div>
<div class="xdsoft_datetimepicker xdsoft_noselect ">
    <div class="xdsoft_datepicker active">
        <div class="xdsoft_mounthpicker">
            <button type="button" class="xdsoft_prev"></button>
            <button type="button" class="xdsoft_today_button" style="visibility: visible;"></button>
            <div class="xdsoft_label xdsoft_month">
                <span>四月</span>

                <div class="xdsoft_select xdsoft_monthselect xdsoft_scroller_box">
                    <div style="margin-top: 0px;">
                        <div class="xdsoft_option " data-value="0">
                            一月
                        </div>
                        <div class="xdsoft_option " data-value="1">
                            二月
                        </div>
                        <div class="xdsoft_option " data-value="2">
                            三月
                        </div>
                        <div class="xdsoft_option xdsoft_current" data-value="3">
                            四月
                        </div>
                        <div class="xdsoft_option " data-value="4">
                            五月
                        </div>
                        <div class="xdsoft_option " data-value="5">
                            六月
                        </div>
                        <div class="xdsoft_option " data-value="6">
                            七月
                        </div>
                        <div class="xdsoft_option " data-value="7">
                            八月
                        </div>
                        <div class="xdsoft_option " data-value="8">
                            九月
                        </div>
                        <div class="xdsoft_option " data-value="9">
                            十月
                        </div>
                        <div class="xdsoft_option " data-value="10">
                            十一月
                        </div>
                        <div class="xdsoft_option " data-value="11">
                            十二月
                        </div>
                    </div>
                    <div class="xdsoft_scrollbar">
                        <div class="xdsoft_scroller" style="display: block; height: 10px; margin-top: 0px;"></div>
                    </div>
                </div>
            </div>
            <div class="xdsoft_label xdsoft_year">
                <span>2015</span>

                <div class="xdsoft_select xdsoft_yearselect xdsoft_scroller_box">
                    <div style="margin-top: 0px;">
                        <div class="xdsoft_option " data-value="1950">
                            1950
                        </div>
                        <div class="xdsoft_option " data-value="1951">
                            1951
                        </div>
                        <div class="xdsoft_option " data-value="1952">
                            1952
                        </div>
                        <div class="xdsoft_option " data-value="1953">
                            1953
                        </div>
                        <div class="xdsoft_option " data-value="1954">
                            1954
                        </div>
                        <div class="xdsoft_option " data-value="1955">
                            1955
                        </div>
                        <div class="xdsoft_option " data-value="1956">
                            1956
                        </div>
                        <div class="xdsoft_option " data-value="1957">
                            1957
                        </div>
                        <div class="xdsoft_option " data-value="1958">
                            1958
                        </div>
                        <div class="xdsoft_option " data-value="1959">
                            1959
                        </div>
                        <div class="xdsoft_option " data-value="1960">
                            1960
                        </div>
                        <div class="xdsoft_option " data-value="1961">
                            1961
                        </div>
                        <div class="xdsoft_option " data-value="1962">
                            1962
                        </div>
                        <div class="xdsoft_option " data-value="1963">
                            1963
                        </div>
                        <div class="xdsoft_option " data-value="1964">
                            1964
                        </div>
                        <div class="xdsoft_option " data-value="1965">
                            1965
                        </div>
                        <div class="xdsoft_option " data-value="1966">
                            1966
                        </div>
                        <div class="xdsoft_option " data-value="1967">
                            1967
                        </div>
                        <div class="xdsoft_option " data-value="1968">
                            1968
                        </div>
                        <div class="xdsoft_option " data-value="1969">
                            1969
                        </div>
                        <div class="xdsoft_option " data-value="1970">
                            1970
                        </div>
                        <div class="xdsoft_option " data-value="1971">
                            1971
                        </div>
                        <div class="xdsoft_option " data-value="1972">
                            1972
                        </div>
                        <div class="xdsoft_option " data-value="1973">
                            1973
                        </div>
                        <div class="xdsoft_option " data-value="1974">
                            1974
                        </div>
                        <div class="xdsoft_option " data-value="1975">
                            1975
                        </div>
                        <div class="xdsoft_option " data-value="1976">
                            1976
                        </div>
                        <div class="xdsoft_option " data-value="1977">
                            1977
                        </div>
                        <div class="xdsoft_option " data-value="1978">
                            1978
                        </div>
                        <div class="xdsoft_option " data-value="1979">
                            1979
                        </div>
                        <div class="xdsoft_option " data-value="1980">
                            1980
                        </div>
                        <div class="xdsoft_option " data-value="1981">
                            1981
                        </div>
                        <div class="xdsoft_option " data-value="1982">
                            1982
                        </div>
                        <div class="xdsoft_option " data-value="1983">
                            1983
                        </div>
                        <div class="xdsoft_option " data-value="1984">
                            1984
                        </div>
                        <div class="xdsoft_option " data-value="1985">
                            1985
                        </div>
                        <div class="xdsoft_option " data-value="1986">
                            1986
                        </div>
                        <div class="xdsoft_option " data-value="1987">
                            1987
                        </div>
                        <div class="xdsoft_option " data-value="1988">
                            1988
                        </div>
                        <div class="xdsoft_option " data-value="1989">
                            1989
                        </div>
                        <div class="xdsoft_option " data-value="1990">
                            1990
                        </div>
                        <div class="xdsoft_option " data-value="1991">
                            1991
                        </div>
                        <div class="xdsoft_option " data-value="1992">
                            1992
                        </div>
                        <div class="xdsoft_option " data-value="1993">
                            1993
                        </div>
                        <div class="xdsoft_option " data-value="1994">
                            1994
                        </div>
                        <div class="xdsoft_option " data-value="1995">
                            1995
                        </div>
                        <div class="xdsoft_option " data-value="1996">
                            1996
                        </div>
                        <div class="xdsoft_option " data-value="1997">
                            1997
                        </div>
                        <div class="xdsoft_option " data-value="1998">
                            1998
                        </div>
                        <div class="xdsoft_option " data-value="1999">
                            1999
                        </div>
                        <div class="xdsoft_option " data-value="2000">
                            2000
                        </div>
                        <div class="xdsoft_option " data-value="2001">
                            2001
                        </div>
                        <div class="xdsoft_option " data-value="2002">
                            2002
                        </div>
                        <div class="xdsoft_option " data-value="2003">
                            2003
                        </div>
                        <div class="xdsoft_option " data-value="2004">
                            2004
                        </div>
                        <div class="xdsoft_option " data-value="2005">
                            2005
                        </div>
                        <div class="xdsoft_option " data-value="2006">
                            2006
                        </div>
                        <div class="xdsoft_option " data-value="2007">
                            2007
                        </div>
                        <div class="xdsoft_option " data-value="2008">
                            2008
                        </div>
                        <div class="xdsoft_option " data-value="2009">
                            2009
                        </div>
                        <div class="xdsoft_option " data-value="2010">
                            2010
                        </div>
                        <div class="xdsoft_option " data-value="2011">
                            2011
                        </div>
                        <div class="xdsoft_option " data-value="2012">
                            2012
                        </div>
                        <div class="xdsoft_option " data-value="2013">
                            2013
                        </div>
                        <div class="xdsoft_option " data-value="2014">
                            2014
                        </div>
                        <div class="xdsoft_option xdsoft_current" data-value="2015">
                            2015
                        </div>
                        <div class="xdsoft_option " data-value="2016">
                            2016
                        </div>
                        <div class="xdsoft_option " data-value="2017">
                            2017
                        </div>
                        <div class="xdsoft_option " data-value="2018">
                            2018
                        </div>
                        <div class="xdsoft_option " data-value="2019">
                            2019
                        </div>
                        <div class="xdsoft_option " data-value="2020">
                            2020
                        </div>
                        <div class="xdsoft_option " data-value="2021">
                            2021
                        </div>
                        <div class="xdsoft_option " data-value="2022">
                            2022
                        </div>
                        <div class="xdsoft_option " data-value="2023">
                            2023
                        </div>
                        <div class="xdsoft_option " data-value="2024">
                            2024
                        </div>
                        <div class="xdsoft_option " data-value="2025">
                            2025
                        </div>
                        <div class="xdsoft_option " data-value="2026">
                            2026
                        </div>
                        <div class="xdsoft_option " data-value="2027">
                            2027
                        </div>
                        <div class="xdsoft_option " data-value="2028">
                            2028
                        </div>
                        <div class="xdsoft_option " data-value="2029">
                            2029
                        </div>
                        <div class="xdsoft_option " data-value="2030">
                            2030
                        </div>
                        <div class="xdsoft_option " data-value="2031">
                            2031
                        </div>
                        <div class="xdsoft_option " data-value="2032">
                            2032
                        </div>
                        <div class="xdsoft_option " data-value="2033">
                            2033
                        </div>
                        <div class="xdsoft_option " data-value="2034">
                            2034
                        </div>
                        <div class="xdsoft_option " data-value="2035">
                            2035
                        </div>
                        <div class="xdsoft_option " data-value="2036">
                            2036
                        </div>
                        <div class="xdsoft_option " data-value="2037">
                            2037
                        </div>
                        <div class="xdsoft_option " data-value="2038">
                            2038
                        </div>
                        <div class="xdsoft_option " data-value="2039">
                            2039
                        </div>
                        <div class="xdsoft_option " data-value="2040">
                            2040
                        </div>
                        <div class="xdsoft_option " data-value="2041">
                            2041
                        </div>
                        <div class="xdsoft_option " data-value="2042">
                            2042
                        </div>
                        <div class="xdsoft_option " data-value="2043">
                            2043
                        </div>
                        <div class="xdsoft_option " data-value="2044">
                            2044
                        </div>
                        <div class="xdsoft_option " data-value="2045">
                            2045
                        </div>
                        <div class="xdsoft_option " data-value="2046">
                            2046
                        </div>
                        <div class="xdsoft_option " data-value="2047">
                            2047
                        </div>
                        <div class="xdsoft_option " data-value="2048">
                            2048
                        </div>
                        <div class="xdsoft_option " data-value="2049">
                            2049
                        </div>
                        <div class="xdsoft_option " data-value="2050">
                            2050
                        </div>
                    </div>
                    <div class="xdsoft_scrollbar">
                        <div class="xdsoft_scroller" style="display: block; height: 10px; margin-top: 0px;"></div>
                    </div>
                </div>
            </div>
            <button type="button" class="xdsoft_next"></button>
        </div>
        <div class="xdsoft_calendar">
            <table>
                <thead>
                <tr>
                    <th>日</th>
                    <th>一</th>
                    <th>二</th>
                    <th>三</th>
                    <th>四</th>
                    <th>五</th>
                    <th>六</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td data-date="29" data-month="2" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week0 xdsoft_date xdsoft_other_month xdsoft_weekend">
                        <div>
                            29
                        </div>
                    </td>
                    <td data-date="30" data-month="2" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week1 xdsoft_date xdsoft_other_month">
                        <div>
                            30
                        </div>
                    </td>
                    <td data-date="31" data-month="2" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week2 xdsoft_date xdsoft_other_month">
                        <div>
                            31
                        </div>
                    </td>
                    <td data-date="1" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week3 xdsoft_date">
                        <div>
                            1
                        </div>
                    </td>
                    <td data-date="2" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week4 xdsoft_date xdsoft_today">
                        <div>
                            2
                        </div>
                    </td>
                    <td data-date="3" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week5 xdsoft_date">
                        <div>
                            3
                        </div>
                    </td>
                    <td data-date="4" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week6 xdsoft_date xdsoft_weekend">
                        <div>
                            4
                        </div>
                    </td>
                </tr>
                <tr>
                    <td data-date="5" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week0 xdsoft_date xdsoft_weekend">
                        <div>
                            5
                        </div>
                    </td>
                    <td data-date="6" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week1 xdsoft_date">
                        <div>
                            6
                        </div>
                    </td>
                    <td data-date="7" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week2 xdsoft_date">
                        <div>
                            7
                        </div>
                    </td>
                    <td data-date="8" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week3 xdsoft_date">
                        <div>
                            8
                        </div>
                    </td>
                    <td data-date="9" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week4 xdsoft_date xdsoft_current">
                        <div>
                            9
                        </div>
                    </td>
                    <td data-date="10" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week5 xdsoft_date">
                        <div>
                            10
                        </div>
                    </td>
                    <td data-date="11" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week6 xdsoft_date xdsoft_weekend">
                        <div>
                            11
                        </div>
                    </td>
                </tr>
                <tr>
                    <td data-date="12" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week0 xdsoft_date xdsoft_weekend">
                        <div>
                            12
                        </div>
                    </td>
                    <td data-date="13" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week1 xdsoft_date">
                        <div>
                            13
                        </div>
                    </td>
                    <td data-date="14" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week2 xdsoft_date">
                        <div>
                            14
                        </div>
                    </td>
                    <td data-date="15" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week3 xdsoft_date">
                        <div>
                            15
                        </div>
                    </td>
                    <td data-date="16" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week4 xdsoft_date">
                        <div>
                            16
                        </div>
                    </td>
                    <td data-date="17" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week5 xdsoft_date">
                        <div>
                            17
                        </div>
                    </td>
                    <td data-date="18" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week6 xdsoft_date xdsoft_weekend">
                        <div>
                            18
                        </div>
                    </td>
                </tr>
                <tr>
                    <td data-date="19" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week0 xdsoft_date xdsoft_weekend">
                        <div>
                            19
                        </div>
                    </td>
                    <td data-date="20" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week1 xdsoft_date">
                        <div>
                            20
                        </div>
                    </td>
                    <td data-date="21" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week2 xdsoft_date">
                        <div>
                            21
                        </div>
                    </td>
                    <td data-date="22" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week3 xdsoft_date">
                        <div>
                            22
                        </div>
                    </td>
                    <td data-date="23" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week4 xdsoft_date">
                        <div>
                            23
                        </div>
                    </td>
                    <td data-date="24" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week5 xdsoft_date">
                        <div>
                            24
                        </div>
                    </td>
                    <td data-date="25" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week6 xdsoft_date xdsoft_weekend">
                        <div>
                            25
                        </div>
                    </td>
                </tr>
                <tr>
                    <td data-date="26" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week0 xdsoft_date xdsoft_weekend">
                        <div>
                            26
                        </div>
                    </td>
                    <td data-date="27" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week1 xdsoft_date">
                        <div>
                            27
                        </div>
                    </td>
                    <td data-date="28" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week2 xdsoft_date">
                        <div>
                            28
                        </div>
                    </td>
                    <td data-date="29" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week3 xdsoft_date">
                        <div>
                            29
                        </div>
                    </td>
                    <td data-date="30" data-month="3" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week4 xdsoft_date">
                        <div>
                            30
                        </div>
                    </td>
                    <td data-date="1" data-month="4" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week5 xdsoft_date xdsoft_other_month">
                        <div>
                            1
                        </div>
                    </td>
                    <td data-date="2" data-month="4" data-year="2015"
                        class="xdsoft_date xdsoft_day_of_week6 xdsoft_date xdsoft_other_month xdsoft_weekend">
                        <div>
                            2
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="xdsoft_timepicker active">
        <button type="button" class="xdsoft_prev"></button>
        <div class="xdsoft_time_box xdsoft_scroller_box">
            <div class="xdsoft_time_variant" style="margin-top: 0px;">
                <div class="xdsoft_time " data-hour="0" data-minute="0">
                    00:00
                </div>
                <div class="xdsoft_time " data-hour="0" data-minute="10">
                    00:10
                </div>
                <div class="xdsoft_time " data-hour="0" data-minute="20">
                    00:20
                </div>
                <div class="xdsoft_time " data-hour="0" data-minute="30">
                    00:30
                </div>
                <div class="xdsoft_time " data-hour="0" data-minute="40">
                    00:40
                </div>
                <div class="xdsoft_time " data-hour="0" data-minute="50">
                    00:50
                </div>
                <div class="xdsoft_time " data-hour="1" data-minute="0">
                    01:00
                </div>
                <div class="xdsoft_time " data-hour="1" data-minute="10">
                    01:10
                </div>
                <div class="xdsoft_time " data-hour="1" data-minute="20">
                    01:20
                </div>
                <div class="xdsoft_time " data-hour="1" data-minute="30">
                    01:30
                </div>
                <div class="xdsoft_time " data-hour="1" data-minute="40">
                    01:40
                </div>
                <div class="xdsoft_time " data-hour="1" data-minute="50">
                    01:50
                </div>
                <div class="xdsoft_time " data-hour="2" data-minute="0">
                    02:00
                </div>
                <div class="xdsoft_time " data-hour="2" data-minute="10">
                    02:10
                </div>
                <div class="xdsoft_time " data-hour="2" data-minute="20">
                    02:20
                </div>
                <div class="xdsoft_time " data-hour="2" data-minute="30">
                    02:30
                </div>
                <div class="xdsoft_time " data-hour="2" data-minute="40">
                    02:40
                </div>
                <div class="xdsoft_time " data-hour="2" data-minute="50">
                    02:50
                </div>
                <div class="xdsoft_time " data-hour="3" data-minute="0">
                    03:00
                </div>
                <div class="xdsoft_time " data-hour="3" data-minute="10">
                    03:10
                </div>
                <div class="xdsoft_time " data-hour="3" data-minute="20">
                    03:20
                </div>
                <div class="xdsoft_time " data-hour="3" data-minute="30">
                    03:30
                </div>
                <div class="xdsoft_time " data-hour="3" data-minute="40">
                    03:40
                </div>
                <div class="xdsoft_time " data-hour="3" data-minute="50">
                    03:50
                </div>
                <div class="xdsoft_time " data-hour="4" data-minute="0">
                    04:00
                </div>
                <div class="xdsoft_time " data-hour="4" data-minute="10">
                    04:10
                </div>
                <div class="xdsoft_time " data-hour="4" data-minute="20">
                    04:20
                </div>
                <div class="xdsoft_time " data-hour="4" data-minute="30">
                    04:30
                </div>
                <div class="xdsoft_time " data-hour="4" data-minute="40">
                    04:40
                </div>
                <div class="xdsoft_time " data-hour="4" data-minute="50">
                    04:50
                </div>
                <div class="xdsoft_time " data-hour="5" data-minute="0">
                    05:00
                </div>
                <div class="xdsoft_time " data-hour="5" data-minute="10">
                    05:10
                </div>
                <div class="xdsoft_time " data-hour="5" data-minute="20">
                    05:20
                </div>
                <div class="xdsoft_time " data-hour="5" data-minute="30">
                    05:30
                </div>
                <div class="xdsoft_time " data-hour="5" data-minute="40">
                    05:40
                </div>
                <div class="xdsoft_time " data-hour="5" data-minute="50">
                    05:50
                </div>
                <div class="xdsoft_time " data-hour="6" data-minute="0">
                    06:00
                </div>
                <div class="xdsoft_time " data-hour="6" data-minute="10">
                    06:10
                </div>
                <div class="xdsoft_time " data-hour="6" data-minute="20">
                    06:20
                </div>
                <div class="xdsoft_time " data-hour="6" data-minute="30">
                    06:30
                </div>
                <div class="xdsoft_time " data-hour="6" data-minute="40">
                    06:40
                </div>
                <div class="xdsoft_time " data-hour="6" data-minute="50">
                    06:50
                </div>
                <div class="xdsoft_time " data-hour="7" data-minute="0">
                    07:00
                </div>
                <div class="xdsoft_time " data-hour="7" data-minute="10">
                    07:10
                </div>
                <div class="xdsoft_time " data-hour="7" data-minute="20">
                    07:20
                </div>
                <div class="xdsoft_time " data-hour="7" data-minute="30">
                    07:30
                </div>
                <div class="xdsoft_time " data-hour="7" data-minute="40">
                    07:40
                </div>
                <div class="xdsoft_time " data-hour="7" data-minute="50">
                    07:50
                </div>
                <div class="xdsoft_time " data-hour="8" data-minute="0">
                    08:00
                </div>
                <div class="xdsoft_time " data-hour="8" data-minute="10">
                    08:10
                </div>
                <div class="xdsoft_time " data-hour="8" data-minute="20">
                    08:20
                </div>
                <div class="xdsoft_time " data-hour="8" data-minute="30">
                    08:30
                </div>
                <div class="xdsoft_time " data-hour="8" data-minute="40">
                    08:40
                </div>
                <div class="xdsoft_time " data-hour="8" data-minute="50">
                    08:50
                </div>
                <div class="xdsoft_time " data-hour="9" data-minute="0">
                    09:00
                </div>
                <div class="xdsoft_time " data-hour="9" data-minute="10">
                    09:10
                </div>
                <div class="xdsoft_time " data-hour="9" data-minute="20">
                    09:20
                </div>
                <div class="xdsoft_time " data-hour="9" data-minute="30">
                    09:30
                </div>
                <div class="xdsoft_time " data-hour="9" data-minute="40">
                    09:40
                </div>
                <div class="xdsoft_time " data-hour="9" data-minute="50">
                    09:50
                </div>
                <div class="xdsoft_time " data-hour="10" data-minute="0">
                    10:00
                </div>
                <div class="xdsoft_time " data-hour="10" data-minute="10">
                    10:10
                </div>
                <div class="xdsoft_time " data-hour="10" data-minute="20">
                    10:20
                </div>
                <div class="xdsoft_time " data-hour="10" data-minute="30">
                    10:30
                </div>
                <div class="xdsoft_time " data-hour="10" data-minute="40">
                    10:40
                </div>
                <div class="xdsoft_time " data-hour="10" data-minute="50">
                    10:50
                </div>
                <div class="xdsoft_time " data-hour="11" data-minute="0">
                    11:00
                </div>
                <div class="xdsoft_time " data-hour="11" data-minute="10">
                    11:10
                </div>
                <div class="xdsoft_time " data-hour="11" data-minute="20">
                    11:20
                </div>
                <div class="xdsoft_time " data-hour="11" data-minute="30">
                    11:30
                </div>
                <div class="xdsoft_time " data-hour="11" data-minute="40">
                    11:40
                </div>
                <div class="xdsoft_time " data-hour="11" data-minute="50">
                    11:50
                </div>
                <div class="xdsoft_time " data-hour="12" data-minute="0">
                    12:00
                </div>
                <div class="xdsoft_time " data-hour="12" data-minute="10">
                    12:10
                </div>
                <div class="xdsoft_time " data-hour="12" data-minute="20">
                    12:20
                </div>
                <div class="xdsoft_time " data-hour="12" data-minute="30">
                    12:30
                </div>
                <div class="xdsoft_time " data-hour="12" data-minute="40">
                    12:40
                </div>
                <div class="xdsoft_time " data-hour="12" data-minute="50">
                    12:50
                </div>
                <div class="xdsoft_time " data-hour="13" data-minute="0">
                    13:00
                </div>
                <div class="xdsoft_time " data-hour="13" data-minute="10">
                    13:10
                </div>
                <div class="xdsoft_time " data-hour="13" data-minute="20">
                    13:20
                </div>
                <div class="xdsoft_time " data-hour="13" data-minute="30">
                    13:30
                </div>
                <div class="xdsoft_time " data-hour="13" data-minute="40">
                    13:40
                </div>
                <div class="xdsoft_time " data-hour="13" data-minute="50">
                    13:50
                </div>
                <div class="xdsoft_time " data-hour="14" data-minute="0">
                    14:00
                </div>
                <div class="xdsoft_time " data-hour="14" data-minute="10">
                    14:10
                </div>
                <div class="xdsoft_time xdsoft_current" data-hour="14" data-minute="20">
                    14:20
                </div>
                <div class="xdsoft_time " data-hour="14" data-minute="30">
                    14:30
                </div>
                <div class="xdsoft_time " data-hour="14" data-minute="40">
                    14:40
                </div>
                <div class="xdsoft_time " data-hour="14" data-minute="50">
                    14:50
                </div>
                <div class="xdsoft_time " data-hour="15" data-minute="0">
                    15:00
                </div>
                <div class="xdsoft_time " data-hour="15" data-minute="10">
                    15:10
                </div>
                <div class="xdsoft_time " data-hour="15" data-minute="20">
                    15:20
                </div>
                <div class="xdsoft_time " data-hour="15" data-minute="30">
                    15:30
                </div>
                <div class="xdsoft_time " data-hour="15" data-minute="40">
                    15:40
                </div>
                <div class="xdsoft_time " data-hour="15" data-minute="50">
                    15:50
                </div>
                <div class="xdsoft_time " data-hour="16" data-minute="0">
                    16:00
                </div>
                <div class="xdsoft_time " data-hour="16" data-minute="10">
                    16:10
                </div>
                <div class="xdsoft_time " data-hour="16" data-minute="20">
                    16:20
                </div>
                <div class="xdsoft_time " data-hour="16" data-minute="30">
                    16:30
                </div>
                <div class="xdsoft_time " data-hour="16" data-minute="40">
                    16:40
                </div>
                <div class="xdsoft_time " data-hour="16" data-minute="50">
                    16:50
                </div>
                <div class="xdsoft_time " data-hour="17" data-minute="0">
                    17:00
                </div>
                <div class="xdsoft_time " data-hour="17" data-minute="10">
                    17:10
                </div>
                <div class="xdsoft_time " data-hour="17" data-minute="20">
                    17:20
                </div>
                <div class="xdsoft_time " data-hour="17" data-minute="30">
                    17:30
                </div>
                <div class="xdsoft_time " data-hour="17" data-minute="40">
                    17:40
                </div>
                <div class="xdsoft_time " data-hour="17" data-minute="50">
                    17:50
                </div>
                <div class="xdsoft_time " data-hour="18" data-minute="0">
                    18:00
                </div>
                <div class="xdsoft_time " data-hour="18" data-minute="10">
                    18:10
                </div>
                <div class="xdsoft_time " data-hour="18" data-minute="20">
                    18:20
                </div>
                <div class="xdsoft_time " data-hour="18" data-minute="30">
                    18:30
                </div>
                <div class="xdsoft_time " data-hour="18" data-minute="40">
                    18:40
                </div>
                <div class="xdsoft_time " data-hour="18" data-minute="50">
                    18:50
                </div>
                <div class="xdsoft_time " data-hour="19" data-minute="0">
                    19:00
                </div>
                <div class="xdsoft_time " data-hour="19" data-minute="10">
                    19:10
                </div>
                <div class="xdsoft_time " data-hour="19" data-minute="20">
                    19:20
                </div>
                <div class="xdsoft_time " data-hour="19" data-minute="30">
                    19:30
                </div>
                <div class="xdsoft_time " data-hour="19" data-minute="40">
                    19:40
                </div>
                <div class="xdsoft_time " data-hour="19" data-minute="50">
                    19:50
                </div>
                <div class="xdsoft_time " data-hour="20" data-minute="0">
                    20:00
                </div>
                <div class="xdsoft_time " data-hour="20" data-minute="10">
                    20:10
                </div>
                <div class="xdsoft_time " data-hour="20" data-minute="20">
                    20:20
                </div>
                <div class="xdsoft_time " data-hour="20" data-minute="30">
                    20:30
                </div>
                <div class="xdsoft_time " data-hour="20" data-minute="40">
                    20:40
                </div>
                <div class="xdsoft_time " data-hour="20" data-minute="50">
                    20:50
                </div>
                <div class="xdsoft_time " data-hour="21" data-minute="0">
                    21:00
                </div>
                <div class="xdsoft_time " data-hour="21" data-minute="10">
                    21:10
                </div>
                <div class="xdsoft_time " data-hour="21" data-minute="20">
                    21:20
                </div>
                <div class="xdsoft_time " data-hour="21" data-minute="30">
                    21:30
                </div>
                <div class="xdsoft_time " data-hour="21" data-minute="40">
                    21:40
                </div>
                <div class="xdsoft_time " data-hour="21" data-minute="50">
                    21:50
                </div>
                <div class="xdsoft_time " data-hour="22" data-minute="0">
                    22:00
                </div>
                <div class="xdsoft_time " data-hour="22" data-minute="10">
                    22:10
                </div>
                <div class="xdsoft_time " data-hour="22" data-minute="20">
                    22:20
                </div>
                <div class="xdsoft_time " data-hour="22" data-minute="30">
                    22:30
                </div>
                <div class="xdsoft_time " data-hour="22" data-minute="40">
                    22:40
                </div>
                <div class="xdsoft_time " data-hour="22" data-minute="50">
                    22:50
                </div>
                <div class="xdsoft_time " data-hour="23" data-minute="0">
                    23:00
                </div>
                <div class="xdsoft_time " data-hour="23" data-minute="10">
                    23:10
                </div>
                <div class="xdsoft_time " data-hour="23" data-minute="20">
                    23:20
                </div>
                <div class="xdsoft_time " data-hour="23" data-minute="30">
                    23:30
                </div>
                <div class="xdsoft_time " data-hour="23" data-minute="40">
                    23:40
                </div>
                <div class="xdsoft_time " data-hour="23" data-minute="50">
                    23:50
                </div>
            </div>
            <div class="xdsoft_scrollbar">
                <div class="xdsoft_scroller" style="display: block; height: 10px; margin-top: 0px;"></div>
            </div>
        </div>
        <button type="button" class="xdsoft_next"></button>
    </div>
</div>
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"
     style="display: none;">
    <div class="modal-dialog">
        <div class="modal-success-alert">
            <span class="text">微信分享标题不能为空，请您填写。</span>
            <a href="javascript:;">确定</a>
        </div>
    </div>
</div>
</body>
</html>
