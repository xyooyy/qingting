<?php 
 if($_SESSION['username']=='')header("Location:./logout");
?>
<!DOCTYPE html> 
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>火速轻应用-后台管理</title>
 
</head>

<body style="background-color:#f8f8f8;">

<iframe src="main_header" name="if_t"  width="100%"  id="if_h" frameborder=0 style="border-bottom:3px solid #dedede;"></iframe>
<iframe src="main_left" name="if_l" width="19%"   SCROLLING="no" id="if_l" frameborder=0></iframe>
<iframe src="/index.php/game/index" name="if_r" width="80%"   id="if_r" frameborder=0></iframe>
<script src="/public/js/jquery-1.7.2.min.js"></script>
<script>
 var w=document.documentElement.clientWidth;h=document.documentElement.clientHeight;
 $("#if_h").height(h*0.1);
 $("#if_l").height(h*0.85);
 $("#if_r").height(h*0.85);
</script>
</body>
</html>
