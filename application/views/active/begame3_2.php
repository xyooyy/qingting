<!DOCTYPE html>
<!-- saved from url=(0034)http://act.aiwanpai.com/end?id=581 -->
<html lang="zh-cn">
<head>
    <title>新建活动-步骤3</title>
    <?php require('static_file.php') ?>
    <link rel="stylesheet" href="/public/active/css/activities_step3.css">
    <link rel="stylesheet" href="/public/active/css/layout.css" id="layStyle">
    <link rel="stylesheet" href="/public/active/css/demo.css">
<!--    <script type="text/javascript">-->
<!--        var websiteUrl = 'http://localhost:8081/aiwanpai-game-website';-->
<!--//    </script>-->
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
                            <a href="#" class="active">
                                新建活动
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
                                    <li class="current">
                                        <a href="./begame3?id=<?php echo $_GET['id'] ?>">
                                            <i class="icon"></i>
                                            活动开始
                                        </a>
                                    </li>
                                    <li class="active">
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
                                    <ul class="choice-layout">
                                        <li class="active lay1">
                                            <a href="javascript:void(0);">
                                                <img src="/public/active/css/images/lay-common.png">
                                            </a>
                                        </li>
                                        <li class="lay2">
                                            <a href="javascript:void(0);">
                                                <img src="/public/active/css/images/lay-vertical.png">
                                            </a>
                                        </li>
                                        <li class="lay3">
                                            <a href="javascript:void(0);">
                                                <img src="/public/active/css/images/lay-symmetric.png">
                                            </a>
                                        </li>
                                    </ul>
                                    <div class="custom-set">
                                        <ul>
                                            <li class="icon-btn hdp-btn ui-draggable ui-draggable-handle" data-id=" hdp-replay-btn">
                                                <a href="http://act.aiwanpai.com/end?id=581#1">
                                                    <i class="icon-add"></i>
                                                    <span>
                                                        重玩按钮
                                                    </span>
                                                    <div class="btn-current">
                                                        <i class="btn-current-i tl"></i>
                                                        <i class="btn-current-i tr"></i>
                                                        <i class="btn-current-i bl"></i>
                                                        <i class="btn-current-i br"></i>
                                                    </div>
                                                </a>
                                            </li>
                                            <li class="icon-btn hdp-btn ui-draggable ui-draggable-handle" data-id=" hdp-share-btn">
                                                <a href="http://act.aiwanpai.com/end?id=581#1">
                                                    <i class="icon-add"></i>
                                                    <span>
                                                        分享按钮
                                                    </span>
                                                    <div class="btn-current">
                                                        <i class="btn-current-i tl"></i>
                                                        <i class="btn-current-i tr"></i>
                                                        <i class="btn-current-i bl"></i>
                                                        <i class="btn-current-i br"></i>
                                                    </div>
                                                </a>
                                            </li>
                                            <li class="icon-btn hdp-btn ui-draggable ui-draggable-handle" data-id=" hdp-attention-btn">
                                                <a href="http://act.aiwanpai.com/end?id=581#1" data-id="url">
                                                    <i class="icon-add"></i>
                                                    <span>
                                                        关注我们
                                                    </span>
                                                    <div class="btn-current">
                                                        <i class="btn-current-i tl"></i>
                                                        <i class="btn-current-i tr"></i>
                                                        <i class="btn-current-i bl"></i>
                                                        <i class="btn-current-i br"></i>
                                                    </div>
                                                </a>
                                            </li>
                                            <li class="only-btn hdp-btn ui-draggable ui-draggable-handle" data-id=" hdp-home-btn">
                                                <a href="http://act.aiwanpai.com/end?id=581#1">
                                                    官方主页
                                                    <div class="btn-current">
                                                        <i class="btn-current-i tl"></i>
                                                        <i class="btn-current-i tr"></i>
                                                        <i class="btn-current-i bl"></i>
                                                        <i class="btn-current-i br"></i>
                                                    </div>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="statusBar">
                            <!--             <div class="set-select">
                                            <select name="set-way" class="select-select">
                                                <option value="1">一键设置</option>
                                                <option value="2">自定义设置</option>
                                            </select><a href="javascript:;" class="select-target select-theme-default select-enabled select-element-attached-top select-element-attached-left select-target-attached-bottom select-target-attached-left" tabindex="0">一键设置<b></b></a>
                                        </div> -->
                                        <div class="btns">
                                            <div id="filePicker2"></div>
                                            <div class="uploadBtn state-ready">保存设置</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="mid">
                                    <div class="phone" unselectable="on" onselectstart="return false;"
                                         style="width: 320px; height: 480px; -webkit-user-select: none;">
                                        <div class="phone-simulation lay-common ui-droppable" data-layout="common"
                                             data-screen="1">
                                            <div class="layoutBg hdp-layoutBg"
                                                 style="position: relative; height: 100%;">
                                                <div class="footerArea"
                                                     style="z-index: 99; position: absolute; bottom: 0px; left: 16px;">
                                                    <div class="homepage hdp-textarea">
                                                        <p class="text-main">官方主页：http://www.huosu.com</p>
                                                    </div>
                                                    <div class="copyright hdp-textarea">
                                                        <p class="text-main">火速网络科技技术支持</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="layoutAuto">
                                                <div class="layoutbox" style="height: 100%; width: 100%;">
                                                    <div class="layoutArea">
                                                        <div class="layoutArea">
                                                            <div class="textArea hdp-textarea">
                                                                <div class="text-main">
                                                                    恭喜你得了 #score# 分
                                                                </div>
                                                            </div>
                                                            <div class="btnArea">
                                                                <a class="btn1 hdp-btn hdp-lottery-btn" data-id="url"
                                                     data-url="<?php echo $ischou == 1 ? 'http://' . $_SERVER['HTTP_HOST'] . '/active/games_choujiang?id=' . $_GET['id'] : '#' ?>"
                                                                   href= <?php echo $ischou == 1 ? 'javascript:;prize' : 'javascript:;fenxiang' ?> >
                                                                    <?php echo $ischou == 1 ? '抽奖' : '分享' ?>
                                                                    <div class="btn-current">
                                                                        <i class="btn-current-i tl"></i>
                                                                        <i class="btn-current-i tr"></i>
                                                                        <i class="btn-current-i bl"></i>
                                                                        <i class="btn-current-i br"></i>
                                                                    </div>
                                                                </a>
                                                                <a class="btn2 hdp-btn hdp-replay-btn"
                                                                   href="javascript:;">
                                                                    重玩
                                                                    <div class="btn-current">
                                                                        <i class="btn-current-i tl"></i>
                                                                        <i class="btn-current-i tr"></i>
                                                                        <i class="btn-current-i bl"></i>
                                                                        <i class="btn-current-i br"></i>
                                                                    </div>
                                                                </a>
                                                                <a class="btn3 hdp-btn hdp-attention-btn"
                                                                   href="javascript:;" data-id="url" data-url="#">
                                                                    关注我们
                                                                    <div class="btn-current">
                                                                        <i class="btn-current-i tl"></i>
                                                                        <i class="btn-current-i tr"></i>
                                                                        <i class="btn-current-i bl"></i>
                                                                        <i class="btn-current-i br"></i>
                                                                    </div>
                                                                </a>

                                                                <!--<div class="btn-area">
                                                                    <a class="btn4 hdp-btn hdp-share-btn" href="javascript:;">
                                                                        分享按钮
                                                                        <div class="btn-current">
                                                                            <i class="btn-current-i tl"></i>
                                                                            <i class="btn-current-i tr"></i>
                                                                            <i class="btn-current-i bl"></i>
                                                                            <i class="btn-current-i br"></i>
                                                                        </div>
                                                                    </a>
                                                                </div>-->
                                                            </div>


                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="right">
                                    <div class="layout-set" id="bg-set" style="display: block">

                                        <!-- Nav tabs -->
                                        <ul class="set-nav tab" role="tablist" style="display: none;">
                                            <li role="presentation" style="width:50%">
                                                <a href="http://act.aiwanpai.com/end?id=581#home" role="tab"
                                                   data-toggle="tab">样式</a>
                                            </li>
                                            <li role="presentation" class="active" style="width:50%">
                                                <a href="http://act.aiwanpai.com/end?id=581#profile" role="tab"
                                                   data-toggle="tab">格式</a>
                                            </li>
                                        </ul>
                                        <h3 class="stitle" style="text-align: center; margin-bottom: -20px;">背景设置</h3>

                                        <!-- Tab panes -->
                                        <div class="tab-content">
                                            <div role="tabpanel" class="tab-pane active" id="home">
                                                <div class="set-main">
                                                    <div id="target2"><br><br>

                                                        <div class="img-set webuploader-container">
                                                            <div class="webuploader-pick">上传图片</div>
                                                            <div id="rt_rt_19huhd81mo1415gn1oik19uged31"
                                                                 style="position: absolute; top: 0px; left: 0px; width: 220px; height: 48px; overflow: hidden; bottom: auto; right: auto;">
                                                                <input type="file" name="file"
                                                                       class="webuploader-element-invisible"><label
                                                                    style="opacity: 0; width: 100%; height: 100%; display: block; cursor: pointer; background: rgb(255, 255, 255);"></label>
                                                            </div>
                                                        </div>
                                                        <hr>
                                                        <div class="setColor-label">背景颜色：</div>
                                                        <div class="inputArea"
                                                             style="cursor:pointer;margin-top:1px;box-shadow:0 0 2px gray; border:3px solid rgb(250,250,250) ;display:inline-block;float:right;margin-left:20px;width:88px;height:30px;background:url(/public/active/css/images/nullcolor.jpg);border-radius:0px;"></div>
                                                        <br>
                                                        <hr>
                                                        <div class="setComn-label">旋转角度：</div>
                                                        <div class="toolbar"
                                                             style="border-radius: 6px; display: inline-block; margin-top: 7px; margin-left: 0px; width: 100px; height: 6px; touch-action: pan-y; -webkit-user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); background-color: rgb(197, 197, 197);">
                                                            <div class="toolprogress"
                                                                 style="cursor:pointer;border-radius:5px;top;0;left:-1px;height:100%;width:0%;">
                                                                <div
                                                                    style="cursor:pointer;box-shadow: 0px 1px 4px #a0a0a0;float:right;box-shadow: 0px 1px 2px #a0a0a0;background:-webkit-gradient(linear, 0% 0%, 0% 80%, from(#FFFFFF), to(#F0F0F0));background:-moz-linear-gradient(top, #FFFFFF, #F0F0F0);background:-o-linear-gradient(top, #FFFFFF, #F0F0F0);background:-ms-linear-gradient(top, #FFFFFF, #F0F0F0); background:-webkit-gradient(linear, 0% 0%, 0% 80%,from(#FFFFFF), to(#F0F0F0)); border-radius:16px;height:16px;margin-right:-12px;margin-top:-7px;width:16px;top:50%;"></div>
                                                            </div>
                                                        </div>
                                                        <div style="margin-left:35px;display:inline-block;height:30px">
                                                            <input
                                                                style="width:60px;height:30px;text-align:center;border:solid 1px #dad8d7;padding:0 2px; height:30px;width:60px"
                                                                value="0%">

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
                                                        <div class="setComn-label">模糊程度：</div>
                                                        <div class="toolbar"
                                                             style="border-radius: 6px; display: inline-block; margin-top: 7px; margin-left: 0px; width: 100px; height: 6px; touch-action: pan-y; -webkit-user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); background-color: rgb(197, 197, 197);">
                                                            <div class="toolprogress"
                                                                 style="cursor:pointer;border-radius:5px;top;0;left:-1px;height:100%;width:0%;">
                                                                <div
                                                                    style="cursor:pointer;box-shadow: 0px 1px 4px #a0a0a0;float:right;box-shadow: 0px 1px 2px #a0a0a0;background:-webkit-gradient(linear, 0% 0%, 0% 80%, from(#FFFFFF), to(#F0F0F0));background:-moz-linear-gradient(top, #FFFFFF, #F0F0F0);background:-o-linear-gradient(top, #FFFFFF, #F0F0F0);background:-ms-linear-gradient(top, #FFFFFF, #F0F0F0); background:-webkit-gradient(linear, 0% 0%, 0% 80%,from(#FFFFFF), to(#F0F0F0)); border-radius:16px;height:16px;margin-right:-12px;margin-top:-7px;width:16px;top:50%;"></div>
                                                            </div>
                                                        </div>
                                                        <div style="margin-left:35px;display:inline-block;height:30px">
                                                            <input
                                                                style="width:60px;height:30px;text-align:center;border:solid 1px #dad8d7;padding:0 2px; height:30px;width:60px"
                                                                value="0级">

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
                                <a class="pre" href="./begame3?id=<?php echo $_GET['id'] ?>">
                                    上一步
                                </a>
                                <a class="next" href="javascript:;">
                                    下一步
                                </a>
                            </div>
                        </form>
                    </div>
                <?php require('qingting_footer.php') ?>
                </div>
            </div>
        </div>
    </div>
</div>


<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"
     style="display: none;">
    <div class="modal-dialog">
        <div class="modal-success-alert"><span class="text">这是标题</span><a href="javascript:;">确定</a></div>
    </div>
</div>
<?php require('common_library.php') ?>
<script src="/public/active/js/hammer.min.js"></script>
<script src="/public/active/js/jquery-ui.min.js"></script>
<script src="/public/active/js/jqtool.js"></script>
<script src="/public/active/js/progressbar.js"></script>
<script src="/public/active/js/step.js"></script>
<script src="/public/active/js/background-position.js"></script>
<script src="/public/active/js/color_picker.js"></script>
<script src="/public/active/js/activities_step3.js"></script>
<script src="/public/active/js/activities_step3_2.js"></script>
<script>
</script>

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
    class="select select-theme-default select-element select-enabled select-element-attached-top select-element-attached-left select-target-attached-bottom select-target-attached-left"
    style="top: 0px; left: 0px; position: absolute; transform: translateX(229px) translateY(723px) translateZ(0px);">
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
        $(".phone").html($("#hide_html").html());
        $("#hide_html").html('');
    }
</script>
