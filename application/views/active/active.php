<!DOCTYPE html>
<!-- saved from url=(0030)http://act.aiwanpai.com/draft/ -->
<html lang="zh-cn">
<head>
    <title>活动管理</title>
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
                <div class="cont-topbar">
                    <div class="nav">
                        <ul>
                            <li>
                                <a class="cur" href="#">活动管理</a>
                            </li>

                        </ul>
                    </div>
                </div>
                <div class="active-warp">
                    <div class="bor at-main m-list">
                        <div class="ml-op">
                            <!--<div class="op-l">
                                        <span class="btn-all">
                                            <div class="icheckbox_polaris"><input id="check-all" type="checkbox" style="position: absolute; opacity: 0;"> <ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background-color: rgb(255, 255, 255); border: 0px; opacity: 0; background-position: initial initial; background-repeat: initial initial;"></ins> </div>
                                            <label for="check-all">全选</label>
                                        </span>
                                        <span id="multiDel" class="btn-del">
                                            <i></i>批量删除</span>

                                        <span id="batch_offline" class="btn-check">
                                            <i></i>批量离线</span>

                            </div>-->
                        </div>
                        <div class="table-advert">
                            <table>
                                <colgroup>
                                    <col style="width:5%;">
                                    <col style="width:20%;">
                                    <col style="width:20%;">
                                    <col style="width:20%;">
                                    <col style="width:20%;">

                                    <col style="width:20%;">
                                </colgroup>
                                <tbody>
                                <tr>
                                    <th></th>
                                    <th>活动名称</th>
                                    <th>开始时间</th>
                                    <th>结束时间</th>
                                    <th>奖项管理</th>
                                    <th>操作</th>
                                </tr>
                                <?php foreach ($list as $v) { ?>
                                    <tr id="hide_<?php echo $v['id'] ?>">
                                        <td class="spec">
                                            <!-- <span class="check">
                                                  <div class="icheckbox_polaris"> </div>
                                              </span>-->
                                        </td>
                                        <td><?php echo $v['title'] ?></td>
                                        <td><?php echo $v['starttime'] ? date('Y-m-d H:i', $v['starttime']) : '' ?></td>
                                        <td><?php echo $v['endtime'] ? date('Y-m-d H:i', $v['endtime']) : '' ?></td>
                                        <td><?php echo $v['ischou'] == 1 ? '<a href="/prize_log/index?aid=' . $v['id'] . '" style="text-decoration:underline;">中奖名单</a>' : '' ?></td>
                                        <td width="30%">
                                            <a href="./begame4?id=<?php echo $v['id'] ?>">预览</a>&nbsp;&nbsp;|
                                            <a href="./begame1?id=<?php echo $v['id'] ?>">编辑</a>&nbsp;&nbsp;|
                                            <a href="#" onClick="del_active(<?php echo $v['id'] ?>)">删除</a>
                                        </td>
                                    </tr>
                                <?php } ?>

                                </tbody>
                            </table>
                        </div>
                        <div class="pagination center sk_pager">
                            <ul>
                                <?php echo $page ?>
                            </ul>
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
