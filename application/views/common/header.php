<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>火速轻应用</title>
<head>
    <link href="/public/css/admin.css" rel="stylesheet" type="text/css">
    <script type="text/javascript" src="/public/js/jquery-1.7.2.min.js"></script>
</head>
<body>
<div class="top">
    <img src="/public/images/logo.png" class="logo"/>

    <div class="user">用户名：<span style="margin-right:20px;"><?php echo $_SESSION['username']; ?></span><a
            href="./logout">退出</a></div>
</div>
</body>
<script>
    var w = document.documentElement.clientWidth;
    h = document.documentElement.clientHeight;

    $(".logo").height(h - 5);
    $(".user").css('line-height', (h - 5) + 'px');
</script>
