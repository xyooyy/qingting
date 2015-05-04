<?php
require("file_upload.php");

if($_GET['c']=="ins"){ 
    $d=(time()-2193217).rand(1,99999);
    mkdir('img/'.$d."/");
	//$d=(time()-2193217).rand(1,99999);
	if($_FILES['img1']['name']!='')$file1=uoload_img('img1','img/'.$d."/");
	if($_FILES['img2']['name']!='')$file2=uoload_img('img2','img/'.$d."/");
	$p['title']=$_POST['title'];
	$p['content']=$_POST['content'];
	$p['img1']=$file1;
	$p['img2']=$file2;  
	file_put_contents('img/'.$d.'/user.txt',json_encode($p));
}

?>
<html>
	<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,minimal-ui">
			<meta http-equiv="pragma" content="no-cache">
			<meta http-equiv="Cache-Control" content="no-cache, must-revalidate">
			<meta http-equiv="expires" content="-1">
			<title>火速小游戏</title>
			<link rel="stylesheet" type="text/css" href="css/m.min.css">
            <script src="http://www.huosu.com/js/jquery-1.9.1.js"></script>
		</head>
<body>
	<div id="container">
	  <div class="grid">
       <div class="page hide" id="index" style="display: block;">
            <form action="?c=ins" id="f" method="post" enctype="multipart/form-data" style="width:50%; margin:0 auto; float:left;">
              生成标题：<input type="text" value="全民寻找房祖名" name="title" onClick="this.value=''"  size="50"/><br/>
              生成简介：<input type="text" value="虽然柯少向龙叔保证不会带坏房祖名,但龙叔强烈要求你找回祖名。" size="50" name="content" onClick="this.value=''"/><br/>
              图片一：<input type="file"  name="img1" />如图：<img src="img/fantrue.png"/>尺寸为100*100<br/><br/><br/>
              图片二：<input type="file"  name="img2" />如图：<img src="img/fanfalse.png"/>尺寸为100*100<br/>
              <?php if($d){
				    $_GET['c']=='';
				  ?><div style="width:100%; height:120px; color:#fff; font-size:25px;">
              游戏地址为(复制到浏览器可直接使用)<br/>http://yx.huosu.com/games/game/qmxzfzm/?d=<?php echo $d;?>
              
              </div><?php }?>
           <button data-type="color" class="btn play-btn" onClick="sb()">生成游戏</button>
            </form>
             <div style="width:48%; float:left; font-size:25px; color:#fff;">
               实例：
               <img src="img/show.jpg" width="300" height="300"><img src="img/show1.jpg" width="300" height="300">
             </div>
        </div>
        </div>
	</div>
	 <script>
       function sb(){
		   $("#f").submit();
		   }
     </script>
		 
</body>
</html> 
 
 