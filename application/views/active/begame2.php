<!DOCTYPE html>
<!-- saved from url=(0041)http://act.aiwanpai.com/gameChoose?id=549 -->
<html lang="zh-cn">
<head>
    <title>新建活动-步骤2 - </title>
    <?php require('static_file.php') ?>
    <link rel="stylesheet" href="/public/active/css/pagination.css"/>
    <link rel="stylesheet" href="/public/active/css/activities_step2.css"/>
    <link rel="stylesheet" href="/public/active/css/demo.css"/>
</head>
<body>
<?php require('gameheader.php'); ?>
<div class="wrap">
    <div class="main">
        <?php require('gameleft.php'); ?>
        <div class="content">
            <div class="top-nav">
                <div class="w1036">
                    <ul>
                        <li><a href="#"> 活动计划 </a></li>
                    </ul>
                    <a class="create-btn" href="#"> 新建活动 </a>
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
                        <li class="active">
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
                        <form class="comm-form">
                            <div class="unChoice">
                                <h3 class="title"> 为您推荐 <span>品牌传播</span> 相关游戏 </h3>

                                <div class="recommend">
                                    <ul class="game-list">
                                        <?php
                                            foreach ($active_games as $v) {
                                        ?>
                                            <li id="">
                                                <div class="litpic">
                                                <a href="./begame2_1?id=<?php echo $_GET['id']?>&gid=<?php echo $v['gid']?>">
                                                    <img class="active_game_img" src="<?php echo $v['img']?>"/>
                                                    <img class="active_game_qrcode" style="display:none;" src="<?php echo $v['qrcode']?>"/>
                                                </a>
                                                </div>
                                                <div class="item-name">
                                                    <div class="icheckbox_polaris">
                                                     <input class="kiner-choice-game" type="radio" name="child" data-id="<?php echo $v['gid']?>" value="<?php echo $v['gid']?>"  style="position: absolute; opacity: 0;" />
                                                     <ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; border: 0px; opacity: 0; background: rgb(255, 255, 255);"></ins>
                                                    </div>

                                                    <a href="./begame2_1?id=<?php echo $_GET['id']?>&gid=<?php echo $v['gid']?>">
                                                        <span
                                                            style="text-align:center;"> <?php echo $v['title']?>
                                                        </span>
                                                    </a>
                                                </div>
                                            </li>
                                        <?php
                                            }
                                        ?>

                                    </ul>
                                </div>

                            </div>

                            <div class="submit-group">
                                <a class="pre" href="javascript:;"> 上一步 </a>
                                <script>
                                    var isnext = <?php echo $gid?'true':'false'?>;//是否可以进入下一步
                                </script>
                                <a class="next"
                                   href="<?php echo $gid ? 'begame3?id=' . $_GET['id'] : 'javascript:;' ?>"> 下一步 </a>
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
        <div class="modal-success-alert">
            <span class="text">这是标题</span>
            <a href="javascript:;">确定</a>
        </div>
    </div>
</div>


<?php require('common_library.php') ?>
<script src="/public/active/js/activities_step2.js"></script>
<div
    class="select select-theme-default select-element select-enabled select-abutted select-abutted-left select-abutted-top select-element-attached-top select-element-attached-left select-target-attached-bottom select-target-attached-left"
    style="top: 0px; left: 0px; position: fixed; transform: translateX(0px) translateY(0px) translateZ(0px);">
    <div class="select-content">
        <ul class="select-options">
            <li class="select-option select-option-selected" data-value="all">全部游戏</li>
            <li class="select-option" data-value="hot">热门游戏</li>
            <li class="select-option" data-value="new">最新游戏</li>
            <li class="select-option" data-value="collect">我的收藏</li>
        </ul>
    </div>
</div>
<div data-tether-id="0" style="top: 0px; left: 0px; position: absolute;"></div>
</body>
</html>
