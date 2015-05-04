<!DOCTYPE html>
<!-- saved from url=(0030)http://act.aiwanpai.com/draft/ -->
<html lang="zh-cn"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta charset="UTF-8">
    <title>活动管理</title>
    <meta http-equiv="X-UA-Compatible" content="chrome=1">
    <meta name="keywords" content="">
    <meta name="description" content="your description">
    <link rel="stylesheet" href="/public/active/css/common.css">
    <link rel="stylesheet" href="/public/active/css/pagination.css">
    <link rel="stylesheet" href="/public/active/css/activity.css">
    <!--[if IE 6]>
    <script type="text/javascript">document.execCommand("BackgroundImageCache", false, true);</script>
    <![endif]-->
    <script type="text/javascript">
        var rootUrl = '';
    </script>
<script type="text/javascript" charset="utf-8" src="./活动管理_files/get.js"></script></head>
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
            <a href="/active/begame1" >
                <i class="sidebar-icon sidebar-create"></i>
            <span>
                新建活动
            </span>
            </a>
        </li>
        <li>
            <a href="/active/index" class="active">
                <i class="sidebar-icon sidebar-manage"></i>
            <span>
                活动管理
            </span>
            </a>
        </li> 
        <li>
            <a href="/active/games" >
                <i class="sidebar-icon sidebar-game"></i>
                <span>
                    游戏中心
                </span>
            </a>
        </li>
    </ul>
</div>        </div>
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
                                    <col style="width:30%;">
                                </colgroup>
                                <tbody><tr>
                                    <th></th>
                                    <th>中奖码</th>
                                    <th>中奖时间</th>
                                    <th>奖品id</th>
                                     
                                    <th>操作</th>
                                </tr>
                                <?php foreach($list as $v){?>
                                <tr >
                                    <td class="spec">
                                              <!-- <span class="check">
                                                    <div class="icheckbox_polaris"> </div>
                                                </span>--> 
                                    </td>
                                    <td><?php echo $v['prize_t']?></td>
                                    <td><?php echo $v['tm']?date('Y-m-d H:i',$v['tm']):''?></td>
                                    <td><?php echo $v['p_name']?></td>
                                    
                                    <td width="30%"> 
                                        <a href="javascript:;" class="singleDel" data-id="">删除</a>
                                    </td>
                                </tr>
                                 <?php }?>
                                 
                            </tbody></table>
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
</div>            </div>
        </div>
    </div>
</div>
<div class="pop-dialogs">
    <div class="pop-mod hidden " id="pop-mod-1">
        <div class="pm-bd">
            确定要删除选中的会员吗？
        </div>
        <div class="pm-ft pm-ft-2">
            <a href="http://act.aiwanpai.com/draft/#" class="submit">确定删除</a>
            <a href="http://act.aiwanpai.com/draft/#" class="gray close">取消操作</a>
        </div>
        <span class="pm-close">关闭</span>
    </div>
    <div class="pop-mod hidden" id="pop-mod-2">
        <div class="pm-bd">
            删除成功
        </div>
        <div class="pm-ft">
            <a href="http://act.aiwanpai.com/draft/#" class="close">确&nbsp;&nbsp;&nbsp;&nbsp;定</a>
        </div>
        <span class="pm-close">关闭</span>
    </div>
    <div class="pop-mod hidden" id="pop-mod-3">
        <div class="pm-bd">
            请选择要删除的用户！
        </div>
        <div class="pm-ft">
            <a href="http://act.aiwanpai.com/draft/#" class="close">确&nbsp;&nbsp;&nbsp;&nbsp;定</a>
        </div>
        <span class="pm-close">关闭</span>
    </div>
    <div class="pop-mod hidden" id="pop-mod-4">
        <div class="pm-bd">
            删除用户失败！
        </div>
        <div class="pm-ft">
            <a href="http://act.aiwanpai.com/draft/#" class="close">确&nbsp;&nbsp;&nbsp;&nbsp;定</a>
        </div>
        <span class="pm-close">关闭</span>
    </div>
    <div class="pop-mod hidden" id="pop-mod-5">
        <div class="pm-bd">
            请选择要离线的活动！
        </div>
        <div class="pm-ft">
            <a href="http://act.aiwanpai.com/draft/#" class="close">确&nbsp;&nbsp;&nbsp;&nbsp;定</a>
        </div>
        <span class="pm-close">关闭</span>
    </div>
    <div class="pop-mod hidden" id="pop-mod-6">
        <div class="pm-bd">
            操作成功！
        </div>
        <div class="pm-ft">
            <a href="http://act.aiwanpai.com/draft/#" class="close">确&nbsp;&nbsp;&nbsp;&nbsp;定</a>
        </div>
        <span class="pm-close">关闭</span>
    </div>
</div>
<div id="pop-overlay" class="hidden" style="z-index: 1"></div>
<script>
    var pageType = 'on';
</script>
<script src="/public/active/js/jquery.js"></script>
<script src="/public/active/js/dropmenu.js"></script>
<script src="/public/active/js/hdp-modal.js"></script>
<script src="/public/active/js/icheck.min.js"></script>
<script src="/public/active/js/select.js"></script>
<script src="/public/active/js/prompt.js"></script>
<script src="/public/active/js/jquery.datetimepicker.js"></script>
<script src="/public/active/js/webuploader.js"></script>
<script src="/public/active/js/activity.js"></script>

<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;"><div class="modal-dialog"><div class="modal-success-alert"><span class="text">这是标题</span><a href="javascript:;">确定</a></div></div></div></body></html>