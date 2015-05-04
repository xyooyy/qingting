<!DOCTYPE html>
<!-- saved from url=(0041)http://act.aiwanpai.com/gameChoose?id=549 -->
<html lang="zh-cn">
 <head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /> 
  <meta charset="UTF-8" /> 
  <title>新建活动-步骤2  -  </title> 
  <meta http-equiv="X-UA-Compatible" content="chrome=1" /> 
  <meta name="keywords" content="" /> 
  <meta name="description" content="your description" /> 
  <link rel="stylesheet" href="/public/active/css/common.css" /> 
  <link rel="stylesheet" href="/public/active/css/bootstrap.min.css" /> 
  <link rel="stylesheet" href="/public/active/css/pagination.css" /> 
  <link rel="stylesheet" href="/public/active/css/activities_step2.css" /> 
  <link rel="stylesheet" href="/public/active/css/demo.css" /> 
  <!--[if IE 6]>
    <script type="text/javascript">document.execCommand("BackgroundImageCache", false, true);</script>
    <![endif]--> 
  <script type="text/javascript">
        var rootUrl = 'http://qingting.huosu.com';
    </script> 
 </head> 
 <body> 
  <?php require('gameheader.php');?>
  <div class="wrap"> 
   <div class="main"> 
    <?php require('gameleft.php');?> 
    <div class="content"> 
     <div class="top-nav"> 
      <div class="w1036"> 
       <ul> 
        <li> <a href="http://act.aiwanpai.com/gameChoose?id=549#1"> 活动计划 </a> </li> 
       </ul> 
       <a class="create-btn" href="http://act.aiwanpai.com/gameChoose?id=549#1"> 新建活动 </a> 
      </div> 
     </div> 
     <div class="content-wrap"> 
      <div class="w1036"> 
       <ul class="step-show">
                        <li >
                            <a href="./begame1?id=<?php echo $_GET['id']?>">
                                <span>
                                    基本资料
                                </span>
                                <i class="icon-circle"></i>
                            </a>
                        </li>
                        <li class="active">
                            <a href="./begame2?id=<?php echo $_GET['id']?>">
                                <span>
                                    选择游戏
                                </span>
                                <i class="icon-circle"></i>
                            </a>
                        </li>
                        <li >
                            <a href="./begame3?id=<?php echo $_GET['id']?>">
                                <span>
                                    营销元素
                                </span>
                                <i class="icon-circle"></i>
                            </a>
                        </li>
                        <li>
                            <a href="./begame4?id=<?php echo $_GET['id']?>">
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
          <h3 class="title"> 为您推荐 <span>品牌传播</span> 相关游戏  </h3> 
          <div class="recommend"> 
           <ul class="game-list">
            <?php 
			 foreach($list as $v){
			?>
               <a href="./begame2_1?id=<?php echo $_GET['id']?>&gid=<?php echo $v['gid']?>"><li id="">
             <div class="litpic">
              <img src="<?php echo $v['img']?>" />
             </div>
             <div class="item-name">
              <!--<div class="icheckbox_polaris">
               <input class="kiner-choice-game" type="radio" name="child" data-id="5" style="position: absolute; opacity: 0;" /> 
              </div>-->
              <span style="text-align:center;"> <?php echo $v['title']?></span>
             </div></li></a>
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
          <a class="next"   href="<?php echo $gid?'begame3?id='.$_GET['id']:'javascript:;'?>"> 下一步 </a> 
         </div> 
        </form> 
       </div> 
       <div id="footer">
         Copyright &copy; All Rights Reserved 
       </div> 
      </div> 
     </div> 
    </div> 
   </div> 
  </div> 
  <script src="/public/active/js/jquery.js"></script> 
  <script src="/public/active/js/bootstrap.min.js"></script> 
  <script src="/public/active/js/hdp-modal.js"></script> 
  <script src="/public/active/js/app.js"></script>
  <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
   <div class="modal-dialog">
    <div class="modal-success-alert">
     <span class="text">这是标题</span>
     <a href="javascript:;">确定</a>
    </div>
   </div>
  </div> 
  <script src="/public/active/js/dropmenu.js"></script> 
  <script src="/public/active/js/icheck.min.js"></script> 
  <script src="/public/active/js/select.js"></script> 
  <script src="/public/active/js/jquery.datetimepicker.js"></script> 
  <script src="/public/active/js/UrlHelper.js"></script> 
  <script src="/public/active/js/webuploader.js"></script> 
  <script src="/public/active/js/activities_step2.js"></script> 
  <div class="select select-theme-default select-element select-enabled select-abutted select-abutted-left select-abutted-top select-element-attached-top select-element-attached-left select-target-attached-bottom select-target-attached-left" style="top: 0px; left: 0px; position: fixed; transform: translateX(0px) translateY(0px) translateZ(0px);">
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