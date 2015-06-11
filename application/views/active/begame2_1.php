<!DOCTYPE html>
<!-- saved from url=(0041)http://act.aiwanpai.com/gameChoose?id=549 -->
<html lang="zh-cn">
<head>
    <title>新建活动-步骤2 - </title>
    <?php require('static_file.php') ?>
    <link rel="stylesheet" href="/public/active/css/pagination.css">
    <link rel="stylesheet" href="/public/active/css/activities_step2.css">
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
                        <li class="active">
                            <a href="./begame2?id=<?php echo $_GET['id'] ?>">
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
                            <a href="">
                                <span>
                                    确认提交
                                </span>
                                <i class="icon-circle"></i>
                            </a>
                        </li>
                    </ul>
                    <div class="content-main">
                        <form class="comm-form">

                            <div class="choice" data-id="5" style="display: block;">
                                <div class="choice-left">
                                    <h3>
                                        您已选择
                                        <span class="kiner-game-name"> <?php echo $val['title'] ?></span>
                                    </h3>

                                    <div class="litpic">
                                        <img src="<?php echo $val['img'] ?>">
                                    </div>
                                    <a class="del" href="./begame2?id=<?php echo $_GET['id']; ?>">
                                        删除重新选
                                    </a>

                                    <p class="comm-p">
                                        推荐商业场景：
                                    </p>

                                    <p class="focus-p kiner-game-scene">
                                        品牌传播
                                    </p>

                                    <p class="comm-p">
                                        格进为保证活动效果，建议各步骤画面按所选游戏的视觉风行设计。
                                    </p>
                                </div>
                                <div class="choice-right">
                                    <h3>
                                        游戏截图：
                                    </h3>

                                    <div class="scrollimg">
                                        <div class="scrollimg-main" style="width: 690px;"><img
                                                src="<?php echo $val['img1'] ?>"><img src="<?php echo $val['img2'] ?>">
                                        </div>
                                    </div>
                                    <h3>
                                        游戏说明：
                                    </h3>

                                    <div class="text"><?php echo $val['info'] ?></div>
                                </div>
                            </div>
                            <div class="submit-group">
                                <a class="pre" href="./begame2?id=<?php echo $_GET['id'] ?>">
                                    上一步
                                </a>
                                <a class="next no_validate"
                                   href="./begame3?id=<?php echo $_GET['id'] ?>&gid=<?php echo $_GET['gid'] ?>">
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
