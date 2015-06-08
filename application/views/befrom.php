<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> 
		<meta name="keywords" content="">
		<meta name="description" content="">
		<title>蜻蜓</title>
		<link rel="stylesheet" href="/public/css/style_login.css" type="text/css" media="screen" charset="utf-8"> 
        <script src="/public/js/jquery-1.7.2.min.js"></script>
</head>
	<body>
        <img src="/public/images/login_bg.jpg" id="loginBg" />         
        <div id="wrapper_login" class="wrapper_login_r">
			<div id="menu">
				<div id="left"></div>
				<div id="right"></div>
				<h2></h2>
				<div class="clear"></div>		
			</div> 
			<div class="body">
						 
							<p style="text-align:center;">
								 
								<a href="/index.php/active/index"  >进入蜻蜓</a>
								<br>
							</p><br><br>
							<p  style="text-align:center;">
								 
								<a href="/index.php/kuaizhan/getloginurl">进入快站</a>
								<br>
							</p><br><br>
                            <p  style="text-align:center;">
								 
								<a href="/index.php/yiqixiu/index">进入易企秀</a>
								<br>
							</p>
							 
							<div class="clear"></div>
					 
					<div class="clear"></div>  
			</div>		
		</div> 
	<script>
     
 window.onload=function(){  
		  changes();  
       }  
window.onresize=function(){  
         changes();  
            }  
	function changes(){ 
		var w = $(document).width(),h = $(document).height();
		    //alert(w);
			$('#loginBg').css({
				'width':w,
				'height':h
			});
			 
	}
	
    </script>
</body></html>