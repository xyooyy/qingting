<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>蜻蜓-火速轻应用</title>

<link href="/public/css/qingting.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="/public/js/jquery-1.7.2.min.js"></script>
</head>
 
<body>
<div class="content">
  <div class="header">
     <a href="#" class="logo">蜻蜓-轻松定制H5游戏,应用</a>
     <div class="header_ul">
       <ul>
         <a href="./my"><li class="<?php echo $now_header=='my'?'now_header':($_COOKIE['now_header']=='my'&&$now_header!='index'?'now_header':'');?>">我的应用</li></a>
         <a href="./index"><li class="<?php echo $now_header=='index'?'now_header':($_COOKIE['now_header']=='index'&&$now_header!='my'?'now_header':'');?>">模板列表</li></a>
       </ul>
     </div>
     <div class="header_info">欢迎您,<?php echo $_SESSION['username'];?>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="./logout">退出</a></div>
  </div>