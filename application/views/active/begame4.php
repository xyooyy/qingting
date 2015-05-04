<!DOCTYPE html>
<!-- saved from url=(0038)http://act.aiwanpai.com/confirm?id=549 -->
<html lang="zh-cn"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta charset="UTF-8">
    <title>新建活动-步骤4</title>
    <meta http-equiv="X-UA-Compatible" content="chrome=1">
    <meta name="keywords" content="">
    <meta name="description" content="your description">
    <link rel="stylesheet" href="/public/active/css/bootstrap.min.css">
    <link rel="stylesheet" href="/public/active/css/common.css">
    <link rel="stylesheet" href="/public/active/css/activities_step4.css">
    <link rel="stylesheet" href="/public/active/css/demo.css">
    <script type="text/javascript">
       var rootUrl = 'http://qingting.huosu.com';
    </script>
    <!--[if IE 6]>
    <script type="text/javascript">document.execCommand("BackgroundImageCache", false, true);</script>
    <![endif]-->
</head>
<body>
 
<?php require('gameheader.php');?>
<div class="wrap">
    <div class="main">
<?php require('gameleft.php');?>
        <div class="content">
            <div class="top-nav">
                <div class="w1036">
                    <ul>
                        <li>
                            <a href="#" class="active">
                                活动计划
                            </a>
                        </li>
                        
                    </ul>
                   
                </div>
            </div>
            <div class="content-wrap">
                <div class="w1036">
                    <ul class="step-show">
                        <li >
                            <a href="./begame1?id=<?php echo $_GET['id']?>">
                                <span>
                                    基本资料
                                </span>
                                <i class="icon-circle"></i>
                            </a>
                        </li>
                        <li>
                            <a href="./begame2?id=<?php echo $_GET['id']?>">
                                <span>
                                    选择游戏
                                </span>
                                <i class="icon-circle"></i>
                            </a>
                        </li>
                        <li >
                            <a href="./begame3?id=<?php echo $_GET['id']?>">
                                <span>
                                    营销元素
                                </span>
                                <i class="icon-circle"></i>
                            </a>
                        </li>
                        <li  class="active">
                            <a href="./begame4?id=<?php echo $_GET['id']?>">
                                <span>
                                    确认提交
                                </span>
                                <i class="icon-circle"></i>
                            </a>
                        </li>
                    </ul>
                    <div class="content-main">
                        <form class="comm-form">
                            <div class="act-4-left less255">
                                <h3>
                                    活动预览
                                </h3>

                                <div class="code">
                                    <img src="/<?php echo $val['erweima'];?>">
                                </div>
                                <p>
                                    复制活动链接
                                </p>

                                <div class="form-group">
                                    <textarea class="input-class"  style="height:8em; font-size:1.2em; line-height:1.5em;">http://qingting.huosu.com/<?php echo $val['html_start']?></textarea>
                                </div>
                            </div>
                            <div class="act-4-right">
                                <div class="bar">
                                    基本信息
                                </div>
                                <div class="form-group">
                                    <label>
                                        活动名称
                                    </label>

                                    <div class="name-show">
                                    <?php echo $val['title']?>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="form-date form-fl">
                                        <label>开始时间</label>

                                        <div class="input-class date-picker"><?php echo $val['starttime']?date('Y-m-d H:i',$val['starttime']):date('Y-m-d H:i',time())?>
                                        </div>
                                        <label class="ti">结束时间</label>
                                        <input class="input-class date-picker" type="text" name="endTime" value="<?php echo $val['endtime']?date('Y-m-d H:i',$val['endtime']):date('Y-m-d H:i',(time()+24*3600*7))?>" autocomplete="on" readonly>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>选择商业场景</label>
                                    <span class="content-show-text"><?php echo $val['type']?></span>
                                </div>
                                <div class="form-group form-group-check mb30">
                                    <label>选取游戏</label>

                                    <div class="game-show">
                                        <img src="<?php echo $val['games']['img']?>">
                                    </div>
                                </div>
                                <div class="bar">
                                    微信分享
                                </div>
                                <div class="form-group mb15">
                                    <label>
                                        标题
                                    </label>

                                    <div class="name-show">
                                    <?php echo $val['fenxiangt']?>
                                    </div>
                                </div>
                                <div class="form-group form-group-check mb15">
                                    <label>
                                        描述
                                    </label>

                                    <div class="description-area">
                                    <?php echo $val['fenxiangc']?>
                                    </div>
                                </div>
                                <div class="form-group form-group-check">
                                    <label>缩略图</label>

                                    <div class="litpic-show">
                                        <img src="http://qingting.huosu.com/<?php echo $val['fenxiangi']?>">
                                    </div>
                                </div>
                            </div>
                            <div class="clearfix"></div>
                            <div class="submit-group">
                                <a class="pre" href="./begame3_3?id=<?php echo $_GET['id']?>">
                                    上一步
                                </a>
                                <a class="next" href="./index">
                                    确认提交
                                </a>
                            </div>
                        </form>
                    </div>
                    <div id="footer">
                        Copyright ©  All Rights Reserved
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="./js/jquery.js"></script>
<script src="./js/bootstrap.min.js"></script>
<script src="./js/hdp-modal.js"></script>
<script src="./js/app.js"></script><div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;"><div class="modal-dialog"><div class="modal-success-alert"><span class="text">这是标题</span><a href="javascript:;">确定</a></div></div></div>
<script src="./js/dropmenu.js"></script>
<script src="./js/icheck.min.js"></script>
<script src="./js/select.js"></script>
<script src="./js/UrlHelper.js"></script>
<script src="./js/jquery.datetimepicker.js"></script>
<script src="./js/webuploader.js"></script>
<script src="./js/activities_step4.js"></script>

</body></html>