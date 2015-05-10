<!DOCTYPE html>
<!-- saved from url=(0036)http://act.aiwanpai.com/share?id=581 -->
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
    <link rel="stylesheet" href="/public/active/css/layout.css" id="layStyle">
    <link rel="stylesheet" href="/public/active/css/demo.css">
    <script type="text/javascript">
        var rootUrl = "<?php echo $_SERVER['HTTP_HOST'];?>";
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
                            <a href="#">
                                活动计划
                            </a>
                        </li>

                    </ul>
                    <a class="create-btn" href="#">
                        新建活动
                    </a>
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
                                    <li class="current">
                                        <a href="./begame3?id=<?php echo $_GET['id'] ?>">
                                            <i class="icon"></i>
                                            活动开始
                                        </a>
                                    </li>
                                    <li class="current">
                                        <a href="./begame3_2?id=<?php echo $_GET['id'] ?>">
                                            <i class="icon"></i>
                                            游戏结束
                                        </a>
                                    </li>
                                    <li class="active">
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
                                <!--<div class="left">
                                    &nbsp;
                                    <div class="statusBar">
                                        <div class="set-select">
                                            <select name="set-way" class="select-select">
                                                <option value="1">一键设置</option>
                                                <option value="2">自定义设置</option>
                                            </select><a href="javascript:;" class="select-target select-theme-default select-enabled select-abutted select-abutted-left select-element-attached-top select-element-attached-left select-target-attached-bottom select-target-attached-left" tabindex="0">一键设置<b></b></a>
                                        </div>
                                        <div class="btns">
                                            <div id="filePicker2"></div>
                                            <div class="uploadBtn state-ready">保存设置</div>
                                        </div>
                                    </div>
                                </div>-->
                                <div class="mid">
                                    <div class="phone-simulation share-page" data-screen="1"
                                         style="width: 320px; height: 480px;">
                                        <div class="layoutArea">
                                            <div class="mask"></div>
                                            <div class="share-content">
                                                <div class="arrow-img hdp-img"
                                                     style="left: 144px; top: 0px; margin: 0px; position: absolute;">
                                                    <img
                                                        src="data:image/png;base64,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">
                                                </div>
                                                <div class="clearfix"
                                                     style="left: 0px; top: 0px; margin: 0px; position: absolute;"></div>
                                                <div class="share-text"
                                                     style="left: 0px; top: 98px; margin: 0px; position: absolute;">
                                                    <h3 class="hdp-textarea">
                                                        <div class="text-main"><span>爱我请FUN享</span></div>
                                                    </h3>
                                                    <h3 class="hdp-textarea" style="color: #FFFFFF;">
                                                        <div class="text-main"><span>点击分享到微信朋友圈，邀请你的小伙伴一起玩游戏吧！</span>
                                                        </div>
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="right">
                                    <div class="layout-set" id="bg-set" style="display: block">

                                        <!-- Nav tabs -->
                                        <ul class="set-nav tab" role="tablist" style="display: none;">
                                            <li role="presentation" class="active" style="width:50%">
                                                <a href="#" role="tab" data-toggle="tab">样式</a>
                                            </li>
                                            <li role="presentation" style="width:50%">
                                                <a href="#" role="tab" data-toggle="tab">格式</a>
                                            </li>
                                        </ul>

                                        <!--<ul class="set-nav stitle" style="display: none;">-->

                                        <!--<li role="presentation">-->

                                        <!--&nbsp;-->

                                        <!--</li>-->

                                        <!--<li role="presentation">-->

                                        <!--<a href="#messages" role="tab" data-toggle="tab" class="title">背景编辑</a> -->

                                        <!--</li>-->

                                        <!--<li role="presentation">-->

                                        <!--&nbsp;-->

                                        <!--</li>-->

                                        <!--</ul>-->
                                        <h3 class="stitle" style="text-align: center; margin-bottom: -20px;">遮罩层设置</h3>

                                        <!-- Tab panes -->
                                        <div class="tab-content">
                                            <div role="tabpanel" class="tab-pane active" id="home">
                                                <div class="set-main">
                                                    <div id="target2"><br><br>

                                                        <div class="setComn-label">遮罩层透明度：</div>
                                                        <div class="toolbar"
                                                             style="border-radius: 6px; display: inline-block; margin-top: 7px; margin-left: 0px; width: 100px; height: 6px; touch-action: pan-y; -webkit-user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); background-color: rgb(197, 197, 197);">
                                                            <div class="toolprogress"
                                                                 style="cursor:pointer;border-radius:5px;top;0;left:-1px;height:100%;width:100%;">
                                                                <div
                                                                    style="cursor:pointer;box-shadow: 0px 1px 4px #a0a0a0;float:right;box-shadow: 0px 1px 2px #a0a0a0;background:-webkit-gradient(linear, 0% 0%, 0% 80%, from(#FFFFFF), to(#F0F0F0));background:-moz-linear-gradient(top, #FFFFFF, #F0F0F0);background:-o-linear-gradient(top, #FFFFFF, #F0F0F0);background:-ms-linear-gradient(top, #FFFFFF, #F0F0F0); background:-webkit-gradient(linear, 0% 0%, 0% 80%,from(#FFFFFF), to(#F0F0F0)); border-radius:16px;height:16px;margin-right:-12px;margin-top:-7px;width:16px;top:50%;"></div>
                                                            </div>
                                                        </div>
                                                        <div style="margin-left:35px;display:inline-block;height:30px">
                                                            <input
                                                                style="width:60px;height:30px;text-align:center;border:solid 1px #dad8d7;padding:0 2px; height:30px;width:60px"
                                                                value="100%">

                                                            <div style="float:right;width:25px;height:30px">
                                                                <div class="noselect"
                                                                     style="cursor:pointer;width:25px;text-align:center;line-height:14px;height:14px">
                                                                    +
                                                                </div>
                                                                <div class="noselect"
                                                                     style="cursor:pointer;width:25px;text-align:center;line-height:14px;height:14px">
                                                                    -
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <br>
                                                        <hr>
                                                    </div>
                                                </div>
                                            </div>
                                            <div role="tabpanel" class="tab-pane" id="profile">
                                                <div class="set-main">
                                                    <div id="target3"></div>
                                                </div>
                                            </div>
                                            <div role="tabpanel" class="tab-pane" id="messages">
                                                <div class="set-main">
                                                    <div id="target4"></div>
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
                                <a class="pre" href="./begame3_2?id=<?php echo $_GET['id'] ?>">
                                    上一步
                                </a>
                                <a class="next" href="javascript:;">
                                    <!--<a class="next" href="javascript:;">-->
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
<script src="/public/active/js/webuploader.js"></script>
<script src="/public/active/js/hammer.min.js"></script>
<script src="/public/active/js/UrlHelper.js"></script>
<script src="/public/active/js/progressbar.js"></script>
<script src="/public/active/js/jquery-ui.min.js"></script>
<script src="/public/active/js/jqtool.js"></script>
<script src="/public/active/js/step.js"></script>
<script src="/public/active/js/background-position.js"></script>
<script src="/public/active/js/color_picker.js"></script>
<script src="/public/active/js/hdp-modal(1).js"></script>
<script src="/public/active/js/activities_step3.js"></script>
<script src="/public/active/js/activities_step3_3.js"></script>

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
    class="select select-theme-default select-element select-enabled select-abutted select-abutted-left select-element-attached-top select-element-attached-left select-target-attached-bottom select-target-attached-left"
    style="top: 0px; left: 0px; position: absolute; transform: translateX(229px) translateY(473px) translateZ(0px);">
    <div class="select-content">
        <ul class="select-options">
            <li class="select-option select-option-selected" data-value="1">一键设置</li>
            <li class="select-option" data-value="2">自定义设置</li>
        </ul>
    </div>
</div>
</body>
</html>
<div id="hide_html" style="display:none;"><?php echo $html ?></div>
<script>

    if ($("#hide_html").html().length > 0) {
        $(".mid").html($("#hide_html").html());
        $("#hide_html").html('');
    }
</script>
