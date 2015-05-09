<?php
require('../mysql_db.class.php');
$db= new db(); 
$table=$_GET['mid']?'games_my':'games';
$id=$_GET['mid']?'mid':'id';
$row=$db->query("select * from ".$table." where ".$id." =".$_GET[$id])->fetch_array();
$rs_t=$db->query("select * from ".$table."_info where gid=".$_GET[$id]." and tp='text'");
while($re_t=$rs_t->fetch_array()){
  $row['text'][]=$re_t;	
}
$rs_t=$db->query("select * from ".$table."_info where gid=".$_GET[$id]." and tp='img'");
while($re_t=$rs_t->fetch_array()){
  $row['img'][]=$re_t;	
} 
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>哥，挺住18秒！躲开条子</title>
    <link rel="icon" type="image/GIF" href="res/favicon.ico"/>
    <meta name="viewport" content="width=device-width,target-densitydpi=device-dpi,user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="full-screen" content="yes"/>
    <meta name="screen-orientation" content="portrait"/>
    <meta name="x5-fullscreen" content="true"/>
    <meta name="360-fullscreen" content="true"/>
    <style>
        body, canvas, div {
            -moz-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            -khtml-user-select: none;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        }
        .adbox{
            width: 100%;
            height: 50px;
            position: fixed;
            bottom: -50px;
            display: block;
            left: 50%;
            margin-left: -50%;
            background-size: contain;
            -webkit-animation: adbox .6s .2s;
            -webkit-animation-fill-mode: both;
        }
        .adbox2{
            width: 100%;
            height: 55px;
            position: fixed;
            top: -50px;
            display: block;
            left: 50%;
            margin-left: -50%;
            background-size: contain;
            -webkit-animation: adbox2 .6s .2s;
            -webkit-animation-fill-mode: both;
        }
        @-webkit-keyframes adbox{
             100%{bottom: 0; }
         }
        @-webkit-keyframes adbox2{
            100%{top: 0; }
        }
        canvas{
            background-size: contain;
        }
    </style>

</head>
<body style="padding:0; margin: 0; background: #000000;position: relative">

<canvas id="gameCanvas" width="320" height="506" ></canvas>


<script src="cocos2d-html5.js"></script>
<script src="jquery-1.11.1.min.js" type="text/javascript"></script>
<script language="JavaScript">
    /*document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
        WeixinJSBridge.call('hideToolbar');
    });*/

</script>
    <span style="display:none;">

<script type="text/javascript" >
//diretory

var res_enemy01 = "res/enemy_01.png";
var res_enemy02 = "res/enemy_02.png";
var res_enemy03 = "res/enemy_03.png";
var res_enemy04 = "res/enemy_04.png";
var res_player = "res/player.png";
var res_ad2 ="res/ad02.png";
var res_agin_btn = "res/agin_btn.png";
var res_background = "res/background.jpg";
var res_contents = "res/contents.png";
var res_dialog_bg = "res/dialog_bg.png";
var res_k_head = "<?php echo $row['img'][2]['val']?>";
var res_k_head2 = "<?php echo $row['img'][3]['val']?>";
var res_more_btn = "res/more_btn.png";
var res_share_btn = "res/share_btn.png";
var res_start = "res/start.png";
var res_share = "res/share.png";
var res_tiptitle = "res/tiptitle.png";
var sound_click = "res/click.mp3";
var sound_death = "res/death.mp3";
var sound_restart = "res/restart.mp3";
var sound_start = "res/start.mp3";

var res_f_head = "<?php echo $row['img'][0]['val']?>";
var res_f_head1 = "<?php echo $row['img'][0]['val']?>";
var res_f_head2 = "<?php echo $row['img'][1]['val']?>";
var res_k_head1 = "<?php echo $row['img'][2]['val']?>";
var res_f_head3 = "<?php echo $row['img'][0]['val']?>";
var res_k_head3 = "<?php echo $row['img'][2]['val']?>";
var g_resources = [
    {src:res_enemy01},
    {src: res_enemy02},
    {src: res_enemy03},
    {src: res_enemy04},
    {src:res_player},
    {src:res_ad2},
    {src:res_agin_btn},
    {src:res_background},
    {src:res_contents},
    {src:res_dialog_bg},
    {src:res_k_head},
    {src:res_k_head2},
    {src:res_more_btn},
    {src:res_share_btn},
    {src:res_start},
    {src:res_share},
    {src:res_tiptitle},
    {src:res_f_head},
    {src:res_f_head2},
    {src:res_f_head1},
    {src:res_k_head1},{src:res_k_head3},{src:res_f_head3}


];
</script>
<script type="text/javascript" src="device.js"></script>
<script type="text/javascript">
    var _hmt = _hmt || [];
    //imgUrl:分享出去图片
    //lineLink:分享出去的地址
    //descContent：分享出去的内容；
    //shareTitle：分享出去的标题
    function getAbsolutePath(relativePath) {
        var img=new Image();
        img.src=relativePath;
        var absolute=img.src;
        return absolute;
    }

    var lineLink = 'http://more.aiwanpai.com/youxi/escape18/';
    var shareTitle = '哥，挺住18秒！躲开条子';
    var shareCallback = "http://more.aiwanpai.com/";

    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {

        WeixinJSBridge.on('menu:share:appmessage', function (argv) {
            WeixinJSBridge.invoke('sendAppMessage', {
                "img_url":  getAbsolutePath(headSrc==res_k_head1?res_k_head3:res_f_head3),
                "link":lineLink,
                "desc":ShareWords,
                "content":ShareWords,
                "url":lineLink,
                "title":shareTitle
            }, function (res) {
                document.location.href = shareCallback;
            })
        });

        WeixinJSBridge.on('menu:share:timeline', function (argv) {
            WeixinJSBridge.invoke('shareTimeline', {
                "img_url": getAbsolutePath(headSrc==res_k_head1?res_k_head3:res_f_head3),
                "link":lineLink,
                "desc":ShareWords,
                "content":ShareWords,
                "url":lineLink,
                "title":ShareWords
            }, function (res) {
                document.location.href = shareCallback;
            });
        });


        WeixinJSBridge.on('menu:share:weibo', function (argv) {
            WeixinJSBridge.invoke('shareWeibo', {
                "img_url": getAbsolutePath(headSrc==res_k_head1?res_k_head3:res_f_head3),
                "link":lineLink,
                "desc":ShareWords,
                "content":ShareWords,
                "url":lineLink,
                "title":shareTitle
            }, function (res) {
                document.location.href = shareCallback;
            });
        });

    }, false);

    var c = document.getElementById("gameCanvas");
    c.style.background = "url(res/background.jpg) no-repeat center";
    c.style.backgroundSize = "cover";

</script>
</body>
</html>
