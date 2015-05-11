<!DOCTYPE html>
<!-- saved from url=(0036)http://act.aiwanpai.com/begin?id=549 -->
<html lang="zh-cn">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta charset="UTF-8">
    <title>新建活动-步骤3</title>
    <meta http-equiv="X-UA-Compatible" content="chrome=1">
    <meta name="keywords" content="">
    <meta name="description" content="your description">
    <link rel="stylesheet" href="/public/active/css/bootstrap.min.css">
    <link rel="stylesheet" href="/public/active/css/common.css">
    <link rel="stylesheet" href="/public/active/css/activities_step3.css">
    <link rel="stylesheet" href="/public/active/css/swiper.css" id="laySwiper">
    <link rel="stylesheet" href="/public/active/css/layout.css" id="layStyle">
    <link rel="stylesheet" href="/public/active/css/demo.css">
    <script type="text/javascript">
        var rootUrl =  'http://' + "<?php echo $_SERVER['HTTP_HOST'];?>";
    </script>
    <!--[if IE 6]>
    <script type="text/javascript">document.execCommand("BackgroundImageCache", false, true);</script>
    <![endif]-->
</head>
<body unselectable="on" onselectstart="return false;" style="-webkit-user-select: none;">
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
                        <li>
                            <a href="#" class="active">新建活动
                            </a>
                        </li>

                    </ul>

                </div>
            </div>
            <div class="content-wrap">
                <div class="w1036">
                    <ul class="step-show">
                        <li>
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
                        <li class="active">
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
                        <form class="comm-form">
                            <div class="top-menu">
                                <ul>
                                    <li class="active">
                                        <a href="./begame3?id=<?php echo $_GET['id'] ?>">
                                            <i class="icon"></i>
                                            活动开始
                                        </a>
                                    </li>
                                    <li class="">
                                        <a href="./begame3_2?id=<?php echo $_GET['id'] ?>">
                                            <i class="icon"></i>
                                            游戏结束
                                        </a>
                                    </li>
                                    <li>
                                        <a href="./begame3_3?id=<?php echo $_GET['id'] ?>">
                                            <i class="icon"></i>
                                            分享页
                                        </a>
                                    </li>
                                    <?php if ($ischou == 1) { ?>
                                        <li>
                                            <a href="./begame3_4?id=<?php echo $_GET['id'] ?>">
                                                <i class="icon"></i>
                                                奖品设置
                                            </a>
                                        </li>
                                        <li>
                                        <a href="./begame3_5?id=<?php echo $_GET['id'] ?>">
                                            <i class="icon"></i>
                                            抽奖结果
                                        </a>
                                        </li><?php } ?>
                                </ul>
                                <select name="screen" class="select-select">
                                    <option value="0">手机分辨率</option>
                                    <option value="1">iPhone4</option>
                                    <option value="2">iPhone5</option>
                                    <option value="3">iPhone6</option>
                                </select>
                            </div>
                            <div class="act-step3" id="uploader">
                                <div class="left">
                                    &nbsp;
                                    <ul class="choice-layout" id="swiper-choice">
                                        <li class="active lay1 common">
                                            <a href="javascript:void(0)">
                                                <img src="/public/active/css/images/swiper-lay1.png">
                                            </a>
                                        </li>
                                        <li class="lay2 symmetric">
                                            <a href="javascript:void(0)">
                                                <img src="/public/active/css/images/swiper-lay2.png">
                                            </a>
                                        </li>
                                        <li class="lay3 vertical">
                                            <a href="javascript:void(0)">
                                                <img src="/public/active/css/images/swiper-lay3.png">
                                            </a>
                                        </li>
                                    </ul>
                                    <div class="statusBar">
                               <!--          <div class="save-config">保存设置</div>
                                        <div class="set-select">
                                            <select name="set-way" class="select-select">
                                                <option value="1">一键设置</option>
                                                <option value="2">自定义设置</option>
                                            </select><a href="javascript:;" class="select-target select-theme-default select-enabled select-element-attached-left select-target-attached-left select-element-attached-top select-target-attached-bottom" tabindex="0">一键设置<b></b></a>
                                        </div> -->
                                 <!--        <div class="set-select">
                                            <select name="set-start-show" class="select-select">
                                            	<option value="theEnd" selected="selected">仅末页显示开始按钮</option>
                                                <option value="all">每页均显示开始按钮</option>
                                            </select><a href="javascript:;" class="select-target select-theme-default select-enabled select-element-attached-left select-target-attached-left select-element-attached-top select-target-attached-bottom" tabindex="0">仅末页显示开始按钮<b></b></a>
                                        </div> -->
                                    </div>
                                </div>
                                <div class="mid">
                                    <div class="phone" style="width: 320px; height: 480px;">
                                        <div class="phone-simulation lay-common" data-layout="symmetric"
                                             data-start="theEnd" data-screen="1">
                                            <div class="swiper-container">
                                                <div class="swiper-wrapper"
                                                     style=" -webkit-transform: translate3d(0px, 0px, 0px);">
                                                </div>

                                                <div class="btn-area">
                                                    <a class="start-btn hdp-btn cc" href="javascript:;"
                                                       style="right: 0px; position: absolute;">
                                                        开始游戏

                                                        <div class="btn-current">
                                                            <i class="btn-current-i tl"></i>
                                                            <i class="btn-current-i tr"></i>
                                                            <i class="btn-current-i bl"></i>
                                                            <i class="btn-current-i br"></i>
                                                        </div>

                                                    </a>
                                                </div>

                                                <div class="pagination"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="right">
                                    <div class="img-load">
                                        <ul></ul>
                                        <div class="queueList">
                                            <div id="dndArea" class="placeholder">
                                                <div id="filePicker" class="webuploader-container">
                                                    <div class="webuploader-pick">添加图片</div>
                                                    <div id="rt_rt_19hsddif2gkn1qo91j4t6gv1qss1"
                                                         style="position: absolute; top: 0px; left: 0px; width: 300px; height: 48px; overflow: hidden; bottom: auto; right: auto;">
                                                        <input type="file" name="file"
                                                               class="webuploader-element-invisible" multiple><label
                                                            style="opacity: 0; width: 100%; height: 100%; display: block; cursor: pointer; background: rgb(255, 255, 255);"></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <p class="important">
                                            请按以下建议尺寸上传页面
                                            最多可上传5张活动页面
                                        </p>

                                        <p>
                                            尺寸：640px x 1136px
                                        </p>

                                        <p>
                                            大小：80k
                                        </p>

                                        <p>
                                            格式：jpg、gif、png
                                        </p>

                                        <div class="statusBar" style="display:block;">

                                            <!--kiner-->
                                            <div class="progress" style="display: none;">
                                                <span class="text">0%</span>
                                                <span class="percentage" style="width: 0%;"></span>
                                            </div>
                                            <div class="info">共0张（0B），已上传0张</div>
                                            <!--<div class="btns">
                                                <div id="filePicker2"></div>
                                                <div class="uploadBtn state-pedding">开始上传</div>
                                            </div>-->
                                        </div>
                                    </div>
                                    <div class="btn-set">
                                        <div class="layout-set" id="btn-set" style="display: block;">
                                            <!--    上传图片    -->
                                            <div class="goback-btn">
                                                <a href="javascript:;" class="back">
                                                    &lt;- 返回上传图片</a>
                                            </div>

                                            <!-- Nav tabs -->
                                            <ul class="set-nav" role="tablist">
                                                <li role="presentation" style="width:50%;">
                                                    <a href="http://act.aiwanpai.com/begin?id=549#home" role="tab"
                                                       data-toggle="tab">样式</a>
                                                </li>
                                                <li role="presentation" class="active" style="width:50%;">
                                                    <a href="http://act.aiwanpai.com/begin?id=549#profile" role="tab"
                                                       data-toggle="tab">格式</a>
                                                </li>
                                            </ul>

                                            <!-- Tab panes -->
                                            <div class="tab-content">
                                                <div role="tabpanel" class="tab-pane" id="home">
                                                    <div class="set-main">
                                                        <div id="target2"></div>
                                                    </div>
                                                </div>
                                                <div role="tabpanel" class="tab-pane active" id="profile">
                                                    <div class="set-main">
                                                        <div id="target3">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div role="tabpanel" class="tab-pane" id="messages">
                                                    <div class="set-main">
                                                        <div id="target4">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!--kiner新增-->
                            <div class="submit-group">
                                <a class="reset" href="javascript:;" data-url="#">
                                    重置数据
                                </a>
                                <a class="pre" href="./begame2?id=<?php echo $_GET['id'] ?>">
                                    上一步
                                </a>
                                <a class="next" href="javascript:;">
                                    下一步
                                </a>
                            </div>
                        </form>
                    </div>
                    <div id="footer">
                        Copyright © All Rights Reserved
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
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"
     style="display: none;">
    <div class="modal-dialog">
        <div class="modal-success-alert"><span class="text">这是标题</span><a href="javascript:;">确定</a></div>
    </div>
</div>
<script src="/public/active/js/dropmenu.js"></script>
<script src="/public/active/js/icheck.min.js"></script>
<script src="/public/active/js/select.js"></script>
<script src="/public/active/js/jquery.datetimepicker.js"></script>
<script src="/public/active/js/UrlHelper.js"></script>
<script src="/public/active/js/jqtool.js"></script>
<script src="/public/active/js/color_picker.js"></script>
<script src="/public/active/js/jquery-ui.min.js"></script>
<script src="/public/active/js/hammer.min.js"></script>
<script src="/public/active/js/progressbar.js"></script>
<script src="/public/active/js/step.js"></script>
<script src="/public/active/js/webuploader.js"></script>
<script src="/public/active/js/activities_step3.js"></script>
<script src="/public/active/js/activities_step3_1.js"></script>
<script src="/public/active/js/idangerous.swiper.min.js"></script>

<div
    class="select select-theme-default select-element select-enabled select-abutted select-abutted-left select-element-attached-top select-element-attached-left select-target-attached-bottom select-target-attached-left"
    style="top: 0px; left: 0px; position: absolute; transform: translateX(1060px) translateY(358px) translateZ(0px);">
    <div class="select-content">
        <ul class="select-options">
            <li class="select-option" data-value="0">手机分辨率</li>
            <li class="select-option select-option-selected" data-value="1">iPhone4</li>
            <li class="select-option" data-value="2">iPhone5</li>
            <li class="select-option" data-value="3">iPhone6</li>
        </ul>
    </div>
</div>
<div data-tether-id="0" style="top: 0px; left: 0px; position: absolute;"></div>
<div
    class="select select-theme-default select-element select-enabled select-element-attached-left select-target-attached-left select-element-attached-top select-target-attached-bottom"
    style="top: 0px; left: 0px; position: absolute; transform: translateX(229px) translateY(809px) translateZ(0px);">
    <div class="select-content">
        <ul class="select-options">
            <li class="select-option select-option-selected" data-value="1">一键设置</li>
            <li class="select-option" data-value="2">自定义设置</li>
        </ul>
    </div>
</div>
<div
    class="select select-theme-default select-element select-enabled select-element-attached-left select-target-attached-left select-element-attached-top select-target-attached-bottom"
    style="top: 0px; left: 0px; position: absolute; transform: translateX(229px) translateY(859px) translateZ(0px);">
    <div class="select-content">
        <ul class="select-options">
            <li class="select-option select-option-selected" data-value="theEnd">仅末页显示开始按钮</li>
            <li class="select-option" data-value="all">每页均显示开始按钮</li>
        </ul>
    </div>
</div>
</body>
</html>
<div id="hide_html" style="display:none;"><?php echo $html ?></div>
<script>
    if ($("#hide_html").html().length > 0) {
        $(".phone").html($("#hide_html").html());
        $("#hide_html").html('');
    }
</script>
