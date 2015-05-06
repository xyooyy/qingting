<?php require('common/gameHeader.php') ?>
    <style>
        .u-file-btn {
            background: url(/public/images/17.png) no-repeat;
            position: relative;
            direction: ltr;
            overflow: hidden;
            text-align: center;
            padding: 1px 0;
        }

        .u-file-btn input {
            cursor: pointer;
            text-align: right;
            z-index: 10;
            font-size: 118px; /* font-size: 118px 工作正常 */
            position: absolute;
            top: 0px;
            right: 0px;
            opacity: 0;
            filter: Alpha(opacity:0);
        }
    </style>
    <div class="con">
        <div class="qt_menu">
            <span class="span_fang"></span><span class="span_jian"></span><span>游戏列表</span>
        </div>
        <div class="begame_info">
            <div class="left_begame">
                <ul>
                    <li class="now_begame"><span>①</span><br/>信息</li>
                    <li><span>②</span><br/>文字</li>
                    <li><span>③</span><br/>素材</li>
                    <li><span>④</span><br/>传播</li>
                </ul>
                <div class="clear"></div>
            </div>
            <div class="right_begame">
                <div class="game_info">
                    <div class="info_left">
                        <div class="be_title"><h2>|</h2><font>启动页</font>

                            <p></p></div>
                        <div class="clear"></div>
                        <div class="form">
                            <iframe id='frameFile' name='frameFile' style='display: none;'></iframe>
                            <form action="" method="post" id="formfile" target="frameFile"
                                  enctype="multipart/form-data">
                                <input type="hidden" name="id" id="gameid" value="<?php echo $list['id']; ?>"/>
                                <input type="hidden" name="mid" id="mgameid" value="<?php echo $list['mid'] ?>"/>
                                <input type="hidden" name="keyname" value="<?php echo $list['keyname'] ?>"/>
                                <input type="hidden" name="now_img" class="now_img" value=""/>

                                <div class="form_info">
                                    <div><font>标题：</font><span class="font2"><input type="text" name="title"
                                                                                    value="<?php echo $list['mid'] ? $list['title'] : '' ?>"/></span>

                                        <p>原文参考：<?php echo $list['title'] ?></p></div>
                                    <div><font>简介（宣传语）：</font><span class="font2"><input type="text" name="info"
                                                                                         value="<?php echo $list['mid'] ? $list['info'] : '' ?>"/></span>

                                        <p>原文参考：<?php echo $list['info'] ?></p></div>
                                    <div><font>游戏logo：</font><span class="font2">尺寸100*100   格式jpg、png 大小限制在100k</span>

                                        <p>
                                            <input type="hidden" name="icon1" id="icon1"
                                                   value="<?php echo $list['icon'] ?>"/>

                                        <div class="u-file-c u-file-btn"
                                             style="width:102px; height:102px;  float:left; margin-top:0;background-size:contain; color:#fff; "
                                             id="icon"><input type="file" class="upimg" name="icon"/>请选择上传文件
                                        </div>
                                        <img src="<?php echo $list['icon'] ?>" class="game_img"/></p></div>

                                </div>
                                <div class="form_info">
                                    <?php
                                    $i = 0;
                                    foreach ($list['games_t'] as $v) {
                                        $i++;
                                        ?>
                                        <div><font>信息<?php echo $i;?>：</font><span class="font2"><input type="text"
                                                                                                        name="<?php echo $v['key']?>"
                                                                                                        value="<?php echo $list['mid'] ? $v['val'] : ''?>"/></span>

                                            <p>原文参考：<?php echo $v['val']?></p></div>
                                    <?php } ?>
                                    <input type="hidden" name="text_count" id="text_count"
                                           value="<?php echo count($list['games_t']) ?>"/>
                                </div>
                                <div class="form_info">
                                    <?php
                                    $i = 0;
                                    foreach ($list['games_i'] as $v) {
                                        $i++;
                                        ?>
                                        <div><font>图片<?php echo $i?> ：</font><span class="font2">尺寸100*100   格式jpg、png 大小限制在100k</span>

                                            <p>
                                                <input type="hidden" name="<?php echo $v['key']?>1"
                                                       id="<?php echo $v['key']?>1" value="<?php echo $v['val']?>"/>

                                            <div class="u-file-c u-file-btn"
                                                 style="width:102px; height:102px;  float:left; margin-top:0;background-size:contain; color:#fff; "
                                                 id="<?php echo $v['key']?>"><input type="file" class="upimg"
                                                                                    name="<?php echo $v['key']?>"/>请选择上传文件
                                            </div>
                                            <img src="<?php echo $v['val']?>" class="game_img"/></p></div>
                                        <div class="clear"></div>
                                    <?php } ?>
                                    <input type="hidden" name="img_count" id="img_count"
                                           value="<?php echo count($list['games_i']) ?>"/>
                                </div>

                                <div class="form_info">
                                    <div><font>推广按钮标题：</font><span class="font2"><input type="text" name="moregame"
                                                                                        value="<?php echo $list['mid'] ? $list['moregame'] : '' ?>"/></span>

                                        <p>原文参考：更多游戏</p></div>
                                    <div><font>推广链接：</font><span class="font2"><input type="text" name="moregameh"
                                                                                      value="<?php echo $list['mid'] ? $list['moregameh'] : 'http://' ?>"/></span>

                                        <p>原文参考：http://yx.huosu.com/list.html</p></div>

                                    <?php if ($list['fenxiangi']) { ?>
                                        <div><font>分享logo：</font><span
                                                class="font2">尺寸100*100   格式jpg、png 大小限制在100k</span>

                                            <p>
                                                <input type="hidden" name="fenxiangi1" id="fenxiangi1"
                                                       value="<?php echo $list['fenxiangi'] ?>"/>

                                            <div class="u-file-c u-file-btn"
                                                 style="width:102px; height:102px;  float:left; margin-top:0;background-size:contain; color:#fff; "
                                                 id="fenxiangi"><input type="file" class="upimg" name="fenxiangi"/>请选择上传文件
                                            </div>
                                            <img src="<?php echo $list['fenxiangi'] ?>" class="game_img"/></p></div>
                                        <div class="clear"></div>
                                    <?php } ?>
                                    <?php if ($list['fenxiang']) { ?>
                                        <div><font>分享标题：</font><span class="font2"><input type="text" name="fengxiang"
                                                                                          value="<?php echo $list['fenxiang'] ?>"/></span>

                                            <p>原文参考更多游戏</p></div>
                                    <?php } ?>
                                    <?php if ($list['fenxiangc']) { ?>
                                        <div><font>分享链接：</font><span class="font2"><textarea name="fenxiangc"
                                                                                             style="width:20em; height:8em;"/><?php echo $list['fenxiangc'] ?></textarea></span>

                                            <p>原文参考http://www.huosu.com</p></div>
                                    <?php } ?>

                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="info_right">
                        <div class="right1">
                            <?php
                            $now_href = $list['mid'] ? 'mid=' . $list['mid'] : 'id=' . $list['id'];
                            ?>
                            <iframe
                                src="http://qingting.huosu.com/games/<?php echo $list['keyname'] ?>/?<?php echo $now_href ?>"
                                class="http://qingting.huosu.com/games/<?php echo $list['keyname'] ?>/"
                                id="phone"></iframe>
                        </div>
                        <div class="right1_s">
                            <input type="button" value="预览" onclick="f_sb(1)"/><input type="button" value="保存"
                                                                                      onclick="f_sb(2)"/><input
                                type="button" value="复制链接" onclick="copy_h()"/>

                            <div class="clear"></div>
                            <input type="text" id="hr"
                                   style="background:none; display:none; width:100%; height:2em; border:1px solid #dedede; margin-left:0; margin-top:1em; line-height:1.5em; color:#000;"/>

                        </div>
                    </div>
                    <div class="clear"></div>

                </div>
                <div class="game_foot"><input type="button" onclick="begame(1)" class="in1" value="上一步"/><input
                        class="in2" type="button" onclick="begame(2)" value="下一步"/></div>
            </div>
            <div class="clear"></div>
        </div>
        <div class="clear"></div>
    </div>
    <div class="clear"></div>
    <script>
        //翻页
        var now_d = 0;
        $(".form .form_info").eq(0).show();
        function begame(v) {
            if (v == 1) {
                now_d -= 1;
            }
            if (v == 2) {
                now_d += 1;
            }
            if (now_d < 0)now_d = 0;
            else if (now_d > 3)now_d = 3;
            $(".form .form_info").hide();
            $(".form .form_info").eq(now_d).show();
            $(".left_begame li").attr('class', '');
            $(".left_begame li").eq(now_d).attr('class', 'now_begame');

        }

        //上传图片
        $('.upimg').change(function () {
            $('#formfile').attr('action', './img_ajax');
            $('.now_img').val($(this).attr('name'));
            $('#formfile').submit();
        });
        function uploadSuccess(msg) {
            var now_img = $('.now_img').val();
            $("#" + now_img).html('<img src="' + msg + '" width=98 height=96>');
            $("#" + now_img + "1").val(msg);
        }

        function f_sb(v) {
            $('#formfile').attr('action', './ins_my');


            if ($('#mgameid').val() == '') {
                $.post("./game_make", {
                    id: $('#gameid').val(),
                    img_count: $('#img_count').val(),
                    text_count: $('#text_count').val()
                }, function (msg) {
                    //alert(msg);
                    $("#mgameid").val(msg);

                    $('#formfile').submit();

                    $("#phone").attr('src', $('#phone').attr('class') + '?mid=' + msg);
                });
            }
            else {
                $('#formfile').submit();
            }
        }
        function copy_h() {
            $("#hr").val($('#phone').attr('class') + '?mid=' + $('#mgameid').val())
            $("#hr").show();
            $("#hr").select();
        }

    </script>
<?php require('common/gamefooter.php') ?>
