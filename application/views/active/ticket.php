<!doctype html>
<html lang="zh-cn">
<head>
    <title>券号管理</title>
    <?php require('static_file.php') ?>
    <link rel="stylesheet" href="/public/active/css/pagination.css">
    <link rel="stylesheet" href="/public/active/css/activity.css">
    <link rel="stylesheet" href="/public/active/css/ticket.css">
</head>
<body>
<?php require('gameheader.php') ?>
<div class="wrap">
    <div class="grid-c2">
        <div class="col-aside">
            <div class="sidebar">
                <ul>
                    <li>
                        <a href="/active/begame1">
                            <i class="sidebar-icon sidebar-create"></i>
            <span>
                新建活动
            </span>
                        </a>
                    </li>
                    <li>
                        <a href="/active/index" >
                            <i class="sidebar-icon sidebar-manage"></i>
            <span>
                活动管理
            </span>
                        </a>
                    </li>
                    <li>
                        <a href="/active/ticket" class="active">
                            <i class="sidebar-icon sidebar-number"></i>
            <span>
                券号管理
            </span>
                        </a>
                    </li>
                    <li>
                        <a href="/active/games">
                            <i class="sidebar-icon sidebar-game"></i>
                <span>
                    游戏中心
                </span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="col-main">
            <div class="main-wrap">
                <div class="cont-topbar">
                    <div class="nav">
                        <ul>
                            <li>
                                <a href="#" class="cur">券号管理</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="active-warp">
                    <div class="bor at-main m-list">
                        <div class="game-manager--search">

                            <!--<h3>券号查询</h3> -->
                            <form action="/active/search" method="get" autocomplete="off"
                                  novalidate accept-charset="utf-8" class="me-form">
                                <select name="input_type" id="input_type">
                                    <option value="1" selected>领奖代码</option>
                                    <option value="2">手机号码</option>
                                </select>
                                <input type="text" placeholder="输入领取码" name="convertCode" value="">
                                <select name="state">
                                    <option value="-1" selected>全部</option>
                                    <option value="0">正常</option>
                                    <option value="1">已领取</option>
                                    <option value="2">已使用</option>
                                    <option value="3">已作废</option>
                                    <option value="4">已过期</option>
                                </select>
                                <button type="submit">开始搜索</button>
                            </form>
                        </div>
                        <div class="table-advert">
                            <table width="100%">
                                <colgroup>

                                    <!--<col style="width:7%;" />-->
                                    <col style="width:18%;"/>
                                    <col style="width:12%;"/>
                                    <col style="width:10%;"/>
                                    <col style="width:10%;"/>
                                    <col style="width:10%;"/>
                                    <col style="width:10%;"/>
                                    <col/>
                                </colgroup>
                                <tr>
                                    <th style="text-align: center">活动名称</th>
                                    <th>奖品名称</th>
                                    <th>领奖代码</th>
                                    <th>生成时间</th>
                                    <th>状态</th>
                                    <th>操作</th>
                                </tr>
                            </table>
                        </div>
                        <div class="pagination center sk_pager">
                            <ul>
                                <li class="current">
                                    <span>1</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="copyright" style="text-align: center; margin:20px 0 0 0">
                    <div class="inner">
                        <p>Copyright ©
                            Version 0.1.1 </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="pop-dialogs">
    <div class="pop-mod hidden " id="pop-mod-1">
        <div class="pm-bd">
            确定要删除选中的会员吗？
        </div>
        <div class="pm-ft pm-ft-2">
            <a href="#" class="submit">确定删除</a>
            <a href="#" class="gray close">取消操作</a>
        </div>
        <span class="pm-close">关闭</span>
    </div>
    <div class="pop-mod hidden" id="pop-mod-2">
        <div class="pm-bd">
            删除成功
        </div>
        <div class="pm-ft">
            <a href="#" class="close">确&nbsp;&nbsp;&nbsp;&nbsp;定</a>
        </div>
        <span class="pm-close">关闭</span>
    </div>
    <div class="pop-mod hidden" id="pop-mod-3">
        <div class="pm-bd">
            请选择要删除的用户！
        </div>
        <div class="pm-ft">
            <a href="#" class="close">确&nbsp;&nbsp;&nbsp;&nbsp;定</a>
        </div>
        <span class="pm-close">关闭</span>
    </div>
    <div class="pop-mod hidden" id="pop-mod-4">
        <div class="pm-bd">
            删除用户失败！
        </div>
        <div class="pm-ft">
            <a href="#" class="close">确&nbsp;&nbsp;&nbsp;&nbsp;定</a>
        </div>
        <span class="pm-close">关闭</span>
    </div>
    <div class="pop-mod hidden" id="pop-mod-5">
        <div class="pm-bd">
            请选择要离线的活动！
        </div>
        <div class="pm-ft">
            <a href="#" class="close">确&nbsp;&nbsp;&nbsp;&nbsp;定</a>
        </div>
        <span class="pm-close">关闭</span>
    </div>
    <div class="pop-mod hidden" id="pop-mod-6">
        <div class="pm-bd">
            操作成功！
        </div>
        <div class="pm-ft">
            <a href="#" class="close">确&nbsp;&nbsp;&nbsp;&nbsp;定</a>
        </div>
        <span class="pm-close">关闭</span>
    </div>
</div>
<div id="pop-overlay" class="hidden" style="z-index: 1"></div>
<script>
    var pageType = 'on';
</script>
<?php require('common_library.php') ?>
<script src="/public/active/js/prompt.js"></script>
<script src="/public/active/js/ticket.js"></script>
</body>
</html>

