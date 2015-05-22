<!DOCTYPE html>
<!-- saved from url=(0038)http://act.aiwanpai.com/prize?id=549#1 -->
<html lang="zh-cn">
<head>
    <title>新建活动-步骤3</title>
    <?php require('static_file.php') ?>
    <link rel="stylesheet" href="/public/active/css/activities_step3_4.css">
    <link rel="stylesheet" href="/public/active/css/demo.css">
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
                        <li>
                            <a href="#" class="active">
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

                        <div class="comm-form">
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
                                    <li class="current">
                                        <a href="./begame3_3?id=<?php echo $_GET['id'] ?>">
                                            <i class="icon"></i>
                                            分享页
                                        </a>
                                    </li>
                                    <li class="active">
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
                                    </li>
                                </ul>

                            </div>
                            <div class="act-step3_4" id="uploader">
                                <form action="./active_submit3_4" id="prize_form1" method="post">
                                    <input type="hidden" name="id" value="<?php echo $_GET['id'] ?>">

                                    <div class="prize-info">
                                        <div class="form-group convertCode">
                                            <label>
                                                兑换码前缀
                                            </label>
                                            <input class="input-class input-name" type="text" name="convertCodePrefix"
                                                   placeholder="兑换码前缀（提示:通常为4个字母）"
                                                   onkeyup="this.value=this.value.replace(/[^\da-zA-Z]/g,&#39;&#39;);"
                                                   maxlength="4" value="<?php echo $prize_t ? $prize_t : 'qt' ?>">
                                        </div>
                                        <div class="form-group">
                                            <label>
                                                每天抽奖次数
                                            </label>
                                            <input class="input-class input-name" type="url" name="lotteryTotal"
                                                   placeholder="每天抽奖次数"
                                                   onkeyup="this.value=this.value.replace(/[\D]/g,&#39;&#39;);if(parseInt(this.value)&lt;0)this.value=0;"
                                                   min="0" onblur="if(parseInt(this.value)&lt;0)this.value=0;"
                                                   maxlength="5" value="<?php echo $prize_c ? $prize_c : 3 ?>">
                                        </div>
                                        <div class="form-group">
                                            <label>
                                                每天派奖个数
                                            </label>
                                            <input class="input-class input-name" type="url" name="todayLotteryTotal"
                                                   placeholder="每天派奖个数"
                                                   onkeyup="this.value=this.value.replace(/[\D]/g,&#39;&#39;);if(parseInt(this.value)&lt;0)this.value=0;"
                                                   min="0" onblur="if(parseInt(this.value)&lt;0)this.value=0;"
                                                   maxlength="8" value="<?php echo $prize_c1 ? $prize_c1 : 100 ?>">
                                        </div>
                                        <!--<div class="form-group form-group-check">
                                        <label>抽奖次数奖励</label>
                                        <div style="margin-left:150px;">
                                        <div ><input type="radio" name="enableShare" <?php echo $prize_s == 0 ? 'checked' : ''; ?> value="0" data-id="1" checked="" style="position: absolute; opacity: 0;">
                                        <span class="options">分享不奖励抽奖次数</span></div>
                                        <br>
                                        <div  ><input type="radio" name="enableShare" value="1" data-id="2" <?php echo $prize_s == 1 ? 'checked' : ''; ?> style="position: absolute; opacity: 0;">
                                        <span class="options">玩家当天首次分享获得一次抽奖机会</span></div>

                                        <br>
                                        <div  ><input type="radio" name="enableShare" value="2" data-id="5" <?php echo $prize_s == 2 ? 'checked' : ''; ?> style="position: absolute; opacity: 0;"> <span class="options">分享后的链接每当有一位用户点击，将为分享者增加一次抽奖机会。</span></div>

                                        </div>
                                    </div>-->
                                    </div>
                                </form>
                                <div class="prize-set">
                                    <div class="add-btn">
                                        <a href="javascript:;" id="addchou">
                                            <i class="icon-prizeAdd"></i>
                                            添加奖项
                                        </a>
                                    </div>
                                    <div class="prize-input" style="display: none;">
                                        <iframe name="pr" width="1px" height="1px;"></iframe>
                                        <form action="/index.php/prize/add" method="post" enctype="multipart/form-data"
                                              target="pr" id="prize_form">
                                            <input type="hidden" name="aid" value="<?php echo $_GET['id'] ?>">
                                            <input type="hidden" name="id" value="" id="pid">

                                            <div class="form-group">
                                                <label>
                                                    奖项标题
                                                </label>
                                                <input class="input-class input-name" type="text" name="p_title"
                                                       id="p_title">
                                            </div>
                                            <div class="form-group">
                                                <label>
                                                    奖品名称
                                                </label>
                                                <input class="input-class input-name" type="text" name="p_name"
                                                       id="p_name">
                                            </div>
                                            <div class="form-group">
                                                <label>
                                                    奖品数量
                                                </label>
                                                <input class="input-class input-name" type="text" name="p_count"
                                                       id="p_count"
                                                       onkeyup="this.value=this.value.replace(/[\D]/g,&#39;&#39;);if(parseInt(this.value)&lt;0)this.value=0;"
                                                       min="0" onblur="if(parseInt(this.value)&lt;0)this.value=0;"
                                                       maxlength="8">
                                            </div>
                                            <div class="form-group">
                                                <label>
                                                    中奖概率
                                                </label>
                                                <input class="input-class input-name" type="text" name="p_size"
                                                       id="p_size"
                                                       onblur="var userreg=/^[0-9]+([.]{1}[0-9]{1,2})?$/;if(!userreg.test(this.value))this.value=&#39;&#39;;if(parseInt(this.value)&lt;0)this.value=0;else if((parseInt(this.value)&gt;=100))this.value=100;"
                                                       min="0" placeholder="数字和小数点，两位小数">%
                                            </div>
                                            <div class="form-group">
                                                <label>
                                                    奖品链接
                                                </label>
                                                <input class="input-class input-name" type="url" name="p_href"
                                                       id="p_href" placeholder="请输入奖品链接">
                                            </div>
                                            <div class="form-group form-group-check">
                                                <label>
                                                    奖品图片
                                                </label>

                                                <div class="form-single-upload">
                                                    <div class="form-fileupload litpci-load">
                                                        <img src="/public/active/css/images/s.png" id="jiangpin_img"
                                                             style="width:188px; height:205px;">

                                                        <em class="ico-sucess"></em>
                                                        <input type="hidden" name="avatar" value="">

                                                        <div class="inner">
                                                            <p>
                                                                <i>150px X 150px</i>
                                                            </p>

                                                            <p>（30K以内jpg,png图片）</p>

                                                            <div class="picker webuploader-container">
                                                                <div class="webuploader-pick">本地上传</div>
                                                                <div id="rt_rt_19hsjla6n4lo16ak9dbognuhu1"
                                                                     style="position: absolute; top: 0px; left: 0px; width: 110px; height: 40px; overflow: hidden; bottom: auto; right: auto;">
                                                                    <input type="file" name="file"
                                                                           class="webuploader-element-invisible"
                                                                           accept="image/*"><label
                                                                        style="opacity: 0; width: 100%; height: 100%; display: block; cursor: pointer; background: rgb(255, 255, 255);"></label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label>
                                                    &nbsp;
                                                </label>
                                                <a href="javascript:;" class="save-set1 save_settings">
                                                    保存设置
                                                </a>
                                            </div>
                                            <input type="text" name="fimg" value="" id="fimg"
                                                   style=" color:#fff; border:none;">

                                        </form>
                                    </div>
                                    <div class="prize-table" style="display: block; ">

                                    </div>


                                </div>
                            </div>

                            <!--kiner新增-->
                            <div class="submit-group">
                                <a class="pre" href="/index.php/active/begame3_3?id=<?php echo $_GET['id'] ?>">
                                    上一步
                                </a>
                                <a class="next" href="javascript:;" onClick="$('#prize_form1').submit();">
                                    下一步
                                </a>
                            </div>
                        </div>
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
<script src="/public/active/js/activities_step3_4.js"></script>
</body>
</html>
