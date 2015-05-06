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
		 <div id="wrapper_login">
			<div id="menu">
				<div id="left"></div>
				<div id="right"></div>
				<h2></h2>
				<div class="clear"></div>
			</div>
			<div class="body">
						<form action="/index.php/admin/login" method="post">
							<p>
								<input type="text" name="username" id="username"  size="40" class="text" value="<?php echo $_GET['username']?>">
								<br>
							</p>
							<p>

								<input type="password" name="password" id="password"   size="40" class="text" value="<?php echo $_GET['password']?>">
								<br>
							</p>
                            <p>

								<input type="text" name="reg_rand" class="text" id="yan" value=""  ><img id="code" alt="看不清，换一张" onclick="location.href='?username='+document.getElementById('username').value;"  src="http://120.24.230.34:4000/index.php/admin/rand_create"  title="换张图片"/>
								<br>
							</p>
							<p class="last">
								<input type="submit" value="登陆" class="login">
                                <a href="#">账号申请</a>
							</p>
							<div class="clear"></div>
						</form>
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
