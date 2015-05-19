<!DOCTYPE html>
<!-- saved from url=(0030)http://act.aiwanpai.com/draft/ -->
<html lang="zh-cn">
<head>
    <title>数据中心</title>
    <?php require('static_file.php') ?>
    <link rel="stylesheet" href="/public/active/css/pagination.css">
    <link rel="stylesheet" href="/public/active/css/activity.css">
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
