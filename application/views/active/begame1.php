<!DOCTYPE html>
<!-- saved from url=(0029)http://act.aiwanpai.com/basic -->
<html lang="zh-cn">
<head>
    <title>基本资料</title>
    <?php require('static_file.php') ?>
    <link rel="stylesheet" href="/public/active/css/activities_step1.css"/>
    <link rel="stylesheet" href="/public/active/css/demo.css"/>
    <script type="text/javascript">
        var activityScene = '';
    </script>
</head>
<body>
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
                        <li><a href="#"> 活动计划 </a></li>
                    </ul>
                    <a class="create-btn" href="/active/begame1"> 新建活动 </a>
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
                            <a href="">
                                <span>
                                    选择游戏
                                </span>
                                <i class="icon-circle"></i>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <span>
                                    营销元素
                                </span>
                                <i class="icon-circle"></i>
                            </a>
                        </li>
                        <li>
                            <a href=>
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
                                <input class=" form-control input-name input-class" type="text" name="actName"
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
                                           value="1" <?php echo 1 == 1 ? 'checked' : ''; ?>  data-id="1"/>&nbsp;品牌传播&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input type="radio" name="scene"
                                           value="2" <?php echo $val['type'] == 2 ? 'checked' : ''; ?> data-id="2"/>&nbsp;微信关注&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input type="radio" name="scene"
                                           value="3" <?php echo $val['type'] == 3 ? 'checked' : ''; ?> data-id="3"/>&nbsp;商城引流&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input type="radio" name="scene"
                                           value="4" <?php echo $val['type'] == 4 ? 'checked' : ''; ?> data-id="4"/>&nbsp;线下导流&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input type="radio" name="scene"
                                           value="5" <?php echo $val['type'] == 5 ? 'checked' : ''; ?> data-id="5"/>&nbsp;展会活动&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input type="radio" name="scene"
                                           value="6" <?php echo $val['type'] == 6 ? 'checked' : ''; ?> data-id="6"/>&nbsp;销售线索收集&nbsp;&nbsp;&nbsp;&nbsp;

                                </div>

                            </div>
                            <div class="commercial-content">
                                <span> <h3> 品牌传播 </h3> <p> 中奖后得到兑换号，关注公众平台后给入口验证此兑换号正确后再真正获得 </p> </span>
                                <!--新增  二维码 kiner-->
                                <div class="code">
                                    <a href="#"><!--<img src="./begame1_files/1.jpg" alt="玩儿命加载中..." />--></a>
                                    <img src="/public/images/code_huosu.png">
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
                                    <input class="form-control input-name input-background" type="text" name="wxTitle"
                                           value="<?php echo $val['fenxiangt'] ?>"/>*如需获取分数的部分写入'#score#'
                                </div>
                                <div class="form-group" style="height:auto">
                                    <label>微信分享描述</label>
                                    <textarea class="form-textarea form-control form-border" placeholder="建议文本描述不要过长"
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
                                                    <img src="/public/images/s.png"/>
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
                    <?php require('qingting_footer.php') ?>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="/public/active/js/activities_step1.js"></script>
<?php require('common_library.php') ?>

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
