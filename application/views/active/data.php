<!DOCTYPE html>
<!-- saved from url=(0030)http://act.aiwanpai.com/draft/ -->
<html lang="zh-cn">
<head>
    <title>数据中心</title>
    <?php require('static_file.php') ?>
    <link rel="stylesheet" href="/public/active/css/pagination.css">
    <link rel="stylesheet" href="/public/active/css/activity.css">
    <link rel="stylesheet" href="/public/active/css/data_center.css">
    <!--    <script type="text/javascript" charset="utf-8" src="./活动管理_files/get.js"></script>-->
</head>
<body>

<?php
require('gameheader.php');
?>
<div class="wrap">
    <div class="grid-c2">
        <div class="col-aside">
            <?php
            require('gameleft.php');
            ?>
        </div>
        <div class="col-main">
            <div class="main-wrap">
                <div class="cont-topbar">
                    <div class="nav">
                        <ul>
                            <li>
                                <a class="cur" href="<?php echo 'http://'.$_SERVER['HTTP_HOST'].'/active/dataCenter' ?>">投放指标数据</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="stat-warp">
                    <div class="bor mod-search">
                        <label>搜索查看活动数据</label>

                        <form action="/active/dataCenter" method="get">
                            <input name="keyword" type="text" value="" placeholder="输入关键字">
<!--                            <select name="online" class="select-select">-->
<!--                                <option value="">全部活动</option>-->
<!--                                <option value="1">在线活动</option>-->
<!--                                <option value="0">离线活动</option>-->
<!--                            </select>-->
                            <button type="submit">开始搜索</button>
                        </form>
                    </div>
                    <div class="bor">
                        <div class="mod-ads">
                            <div class="hd">
                                <p>搜索结果：
                                    <b><?php echo $count . '条' ?></b>相关结果</p>
                            </div>
                            <div class="bd">
                                <ul class="list-ads">
                                    <?php foreach ($active_games as $v) { ?>
                                        <li>
                                            <div class="act">
                                                <a href=<?php echo '/active/data_info?id='  . $v['id'] ?>
                                                   class="btn-data-rep">数据报告</a>

                                                <!-- <a href="#" class="btn-follow-game">关注游戏</a>  -->
                                            </div>
                                            <div class="cont">
                                                <div class="pic">
                                                    <img
                                                        src=<?php echo $v['img'] ?>
                                                        alt="" style="width:128px;height:128px;">
                                                </div>
                                                <dl class="info">
                                                    <div class="data_div_bottom"><?php echo $v['title'] ?></div>
                                                    <!--                                                    <dd>分类：飞行射击</dd>-->
                                                    <!--                                                    <dd>-->
                                                    <span class="item">状态：
                                                            <b class="game_status"><?php if (date('y-m-d h:i:s', time()) > date('y-m-d h:i:s', $v['endtime'])) {
                                                                    echo "离线";
                                                                } else {
                                                                    echo "在线";
                                                                } ?></b>
                                                    </span>
                                                    </dd>
                                                    <dd>
                                                    <span class="item">开始时间：
                                                        <b><?php echo $v['starttime'] ? date('Y-m-d', $v['starttime']) : '' ?></b>
                                                    </span>
                                                    <span class="item">结束时间：
                                                        <b><?php echo $v['endtime'] ? date('Y-m-d', $v['endtime']) : '' ?></b>
                                                    </span>
                                                    </dd>
                                                </dl>
                                            </div>
                                        </li>
                                    <?php } ?>
                                </ul>
                                <div class="pagination center sk_pager">
                                    <ul>
                                        <?php echo $page ?>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <?php require('qingting_footer.php') ?>
            </div>
        </div>
    </div>
</div>
<script>
    function del_active(id) {
        $.get("/index.php/active/del?id=" + id, function (data) {
            $("#hide_" + id).hide();
        });
    }
</script>
<div id="pop-overlay" class="hidden" style="z-index: 1"></div>
<script>
    var pageType = 'on';
</script>
<script src="/public/active/js/dropmenu.js"></script>
<script src="/public/active/js/hdp-modal.js"></script>
<script src="/public/active/js/icheck.min.js"></script>
<script src="/public/active/js/select.js"></script>
<script src="/public/active/js/jquery.datetimepicker.js"></script>
<script src="/public/active/js/UrlHelper.js"></script>
<script src="/public/active/js/webuploader.js"></script>
<script src="/public/active/js/activity.js"></script>

<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"
     style="display: none;">
    <div class="modal-dialog">
        <div class="modal-success-alert"><span class="text">这是标题</span><a href="javascript:;">确定</a></div>
    </div>
</div>
</body>
</html>
