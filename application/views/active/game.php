<!DOCTYPE html>
<!-- saved from url=(0029)http://act.aiwanpai.com/game/ -->
<html lang="zh-cn">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta charset="UTF-8">
    <title>游戏管理</title>
    <meta http-equiv="X-UA-Compatible" content="chrome=1">
    <meta name="keywords" content="">
    <meta name="description" content="your description">
    <link rel="stylesheet" href="/public/active/css/common.css">
    <link rel="stylesheet" href="/public/active/css/pagination.css">
    <link rel="stylesheet" href="/public/active/css/game-manager.css">
    <!--[if IE 6]>
    <script type="text/javascript">document.execCommand("BackgroundImageCache", false, true);</script>
    <![endif]-->
<!--    <script type="text/javascript" charset="utf-8" src="/public/active/js/get.js"></script>-->
</head>
<body>

<?php
require('gameheader.php');
?>
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
                        <a href="/active/index">
                            <i class="sidebar-icon sidebar-manage"></i>
            <span>
                活动管理
            </span>
                        </a>
                    </li>
                    <li>
                        <a href="/active/ticket">
                            <i class="sidebar-icon sidebar-number"></i>
            <span>
                券号管理
            </span>
                        </a>
                    </li>
                    <li>
                        <a href="/active/games" class="active">
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
                                <a href="" class="cur">游戏列表</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- 主内容{ -->
                <div class="game-manager">
                    <div class="game-manager--search">
                        <h3>游戏搜索</h3>

                        <form action="#" method="get" autocomplete="off" novalidate="" accept-charset="utf-8"
                              class="me-form">
                            <input type="text" placeholder="输入关键字" name="name">
                            <select name="typeId" id="manager_name" class="select-select">
                                <option value="-1">所有类别</option>
                                <option value="7">棋牌娱乐</option>
                                <option value="6">飞行射击</option>
                                <option value="5">角色扮演</option>
                                <option value="4">休闲益智</option>
                                <option value="3">模拟游戏</option>
                                <option value="2">体育竞技</option>
                                <option value="1">女孩专题</option>
                            </select><!--<a href="javascript:;" class="select-target select-theme-default select-enabled select-abutted select-abutted-left select-element-attached-top select-element-attached-left select-target-attached-bottom select-target-attached-left" tabindex="0">所有类别<b></b></a>-->
                            <button type="submit">开始搜索</button>
                        </form>
                    </div>
                    <div class="search-result">
                        <div class="search-result--sort">
                            <a href="#" class="current">全部游戏</a>
                            <a href="#">最新游戏</a>
                            <a href="#">热门推荐</a>

                        </div>
                        <div class="search-result--control">
                            <div class="ml-op">
                                <!--<div class="op-l">
                                    <span class="btn-all">
                                        <div class="icheckbox_polaris"><input id="check-all" type="checkbox" style="position: absolute; opacity: 0;"><ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background-color: rgb(255, 255, 255); border: 0px; opacity: 0; background-position: initial initial; background-repeat: initial initial;"></ins></div>
                                        <label for="check-all">全选</label>
                                    </span>
                                    <span class="btn-collect"><i></i>收藏</span>
                                    <span class="btn-unCollect"><i></i>取消收藏</span>
                                </div>-->
                            </div>
                        </div>
                        <div class="search-result--list">

                            <?php
                            foreach ($list as $v) {
                                ?>
                                <div class="item">
                                    <a href="http://<?php echo $_SERVER['HTTP_HOST']; ?>/active_games/<?php echo $v['href'] ?>"><img
                                            class="img" src="<?php echo $v['img'] ?>"></a>

                                    <div class="form-group item--name">
                                        <label>
                                            <!--<div class="icheckbox_polaris"><input type="checkbox" name="child" data-id="65a6e04bded911e482f2ac162d89ee80" style="position: absolute; opacity: 0;"><ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background-color: rgb(255, 255, 255); border: 0px; opacity: 0; background-position: initial initial; background-repeat: initial initial;"></ins></div>--><?php echo $v['title'] ?>
                                        </label>
                                    </div>
                                    <div class="item--gameinfo">
                                        购买次数:10&nbsp;&nbsp;
                                    </div>
                                    <!--<div class="area">
                                        <p>扫描游戏二维码</p>
                                        <img class="qr" src="/public/active/js/85686303.jpg" alt="65a6e04bded911e482f2ac162d89ee80">
                                    </div>-->
                                </div>
                            <?php } ?>

                            <div class="pagination center sk_pager">
                                <ul>
                                    <li class="current">
                                        <span>1</span>
                                    </li>


                                </ul>
                            </div>
                        </div>
                    </div>
                <?php require('qingting_footer.php') ?>
                </div>
            </div>
        </div>
    </div>
    <div id="pop-overlay" class="hidden"></div>
    <script src="/public/active/js/jquery.js"></script>
    <script src="/public/active/js/dropmenu.js"></script>
    <script src="/public/active/js/icheck.min.js"></script>
    <script src="/public/active/js/select.js"></script>
    <script src="/public/active/js/prompt.js"></script>
    <script src="/public/active/js/lww.js"></script>

</div>
<div
    class="select select-theme-default select-element select-enabled select-abutted select-abutted-left select-element-attached-top select-element-attached-left select-target-attached-bottom select-target-attached-left"
    style="top: 0px; left: 0px; position: absolute; -webkit-transform: translateX(841px) translateY(247px) translateZ(0px);">
    <div class="select-content">
        <ul class="select-options">
            <li class="select-option select-option-selected" data-value="-1">所有类别</li>
            <li class="select-option" data-value="7">棋牌娱乐</li>
            <li class="select-option" data-value="6">飞行射击</li>
            <li class="select-option" data-value="5">角色扮演</li>
            <li class="select-option" data-value="4">休闲益智</li>
            <li class="select-option" data-value="3">模拟游戏</li>
            <li class="select-option" data-value="2">体育竞技</li>
            <li class="select-option" data-value="1">女孩专题</li>
        </ul>
    </div>
</div>
<div data-tether-id="0" style="top: 0px; left: 0px; position: absolute;"></div>
</body>
</html>
