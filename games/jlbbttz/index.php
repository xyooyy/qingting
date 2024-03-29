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

<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <title><?php echo $row['title']?></title>
    <meta name="viewport"
          content="width=device-width,initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="full-screen" content="true"/>
    <meta name="screen-orientation" content="portrait"/>
    <meta name="x5-fullscreen" content="true"/>
    <meta name="360-fullscreen" content="true"/>
    <style>
        body {
            text-align: center;
            background: #000000;
            padding: 0;
            border: 0;
            margin: 0;
            height: 100%;
        }

        * {
            -webkit-touch-callout:none;
            -webkit-user-select:none;
            -khtml-user-select:none;
            -moz-user-select:none;
            -ms-user-select:none;
            user-select:none;
            -webkit-tap-highlight-color:rgba(0,0,0,0);
        }

        html {
            -ms-touch-action: none; /* Direct all pointer events to JavaScript code. */
        }
        .button {
        display: none;
        margin: 0 auto;
        width: 320px;
        }
	.imghide{
		display:none;
	}
	#statusnow{
		width:70%;
		height:250px;
	}
    .welcome {
        color: #FFF;
        font-family: Arial;
        font-size: 40px;
        line-height: 300px;
    }
    </style>
</head>
<body>
<div style="display:inline-block;width:100%; height:100%;margin: 0 auto; background: black; position:relative;" id="gameDiv">
    <div style="text-align:center;margin:20px 0;">
        <span id="timer" style="color:#fff;font-size:20px;display:none;">10 秒</span>
        <div id="result_panel" style="display:none;text-align:center;background-color:rgba(0,0,0,0.5)">
            <div><button id="reset" style="font-size:20px">再玩一次</button>
            <button onclick="clickMore();" style="font-size:20px"><?php echo $row['moregame']?></button></div>
        </div>
    </div>
    <div id="button" class="button">
    	 <img src="<?php echo $row['img'][0]['val']?>" id="statusnow"/>
    </div>
    <div style="text-align:center;margin-top:10px">
        <div id="result" style="color:#fff;font-size:30px;display:none">0 </div>
        <div id="best" style="margin-top:10px;color:#fff;font-size:20px;display:none"> </div>
    </div>
    <audio src="audio/2793.wav" preload id="clickdownsound"></audio>
    <img src="<?php echo $row['img'][0]['val']?>" class="imghide" id="status01"/>
    <img src="<?php echo $row['img'][1]['val']?>" class="imghide"  id="status02"/>
</div>
        <script src="jquery/1.10.2/jquery.min.js"></script>
            <script type="text/javascript">
                    var initial = 1000;
                    var count = initial;
                    var counter; //10 will  run it every 100th of a second
                    var state = 0;
                    var total = 0;
					var cds=$('#clickdownsound').get(0);
                    if (localStorage.max) {
                        $('#best').html( '最好成绩：' + localStorage.max + ' ');
                    }

                    function timer() {
                        if (count <= 0) {
                            clearInterval(counter);
                            state = 0;
                            $('#result_panel').show();
                            if ( !localStorage.max || parseInt(localStorage.max) < total) {
                                localStorage.max = total;
                                $('#best').html( '最好成绩：' + localStorage.max + ' ');
                            }
							$('#timer').hide();
                            localStorage.max = parseInt(localStorage.max) > total ? localStorage.max: total;
                            dp_submitScore(total);
                            offEvent();
                            return;
                        }
                        count--;
                        displayCount(count);
                    }

                    function displayCount(count) {
                        var res = count / 100;
                        document.getElementById("timer").innerHTML = res.toPrecision(count.toString().length) + " 秒";
                    }
                    $(document).on('touchmove', function(e) {
                        e.preventDefault();
                    })
                  
                    function reset() {
                        count = initial;
                        total = 0;
                        state = 0;
                        $('#result').html(total + ' ');
                        $('#timer').html(10 + ' 秒');
                        initEvent();
                    }
					
                    $('#reset').on('touchend  click', function (e) {
                        reset();
                        $('#result_panel').hide();
                        $('#timer').show();
                        
                         e.preventDefault();
                    });
                    displayCount(initial);
                    initEvent();
                   function offEvent(){
                   		$('#button').unbind();
                   }
                   function initEvent(){
                   		  $('#button').on('touchstart mousedown', function (e) {
                        	if (!state) {
                            	state = 1;
                            	counter = setInterval(timer, 10);
                        	}
                        	 $('#statusnow').attr('src',$('#status01').attr('src'));
                        	if(cds.paused){
                        			cds.currentTime=0;
                        	}
                        	cds.play();
                        	e.preventDefault();
                    	});

                    $('#button').on('touchend mouseup', function (e) {
                        if (state) {
                            total+=parseInt(Math.random()*700)+1;
                            $('#result').html(total + ' ');
                        }
                        cds.pause();
                        $('#statusnow').attr('src',$('#status02').attr('src'));
                        e.preventDefault();
                    });
                   }
            </script>
        <div class="welcome"><?php echo $row['text'][0]['val']?></div>
        <script>
            $(document).ready(function(){
                setTimeout(function(){
                    $(".welcome").fadeOut(function(){
                        $(".welcome").text("Ready？").fadeIn(function(){
                            setTimeout(function(){
                                $(".welcome").fadeOut(function(){
                                    $(".welcome").text("GO!").fadeIn();
                                    setTimeout(function(){
                                        $(".welcome").fadeOut(function(){
                                            $("#button").show();
                                            $("#timer").show();
                                            $("#result").show();
                                            $("#best").show();
                                        });
                                    }, 1000);
                                });
                            }, 500);
                        });
                    });
                }, 1000);
            });
        </script>
		<script language=javascript>
		var mebtnopenurl = '<?php echo $row['moregame']?>';
		window.shareData = {
		        "imgUrl": "http://more.aiwanpai.com/youxi/jlbbttz/icon.png",
		        "timeLineLink": "http://more.aiwanpai.com/youxi/jlbbttz/",
		        "tTitle": "冰桶挑战",
		        "tContent": "冰桶挑战"
		};
				
		function goHome(){
			window.location=mebtnopenurl;
		}
		function clickMore(){
			if((window.location+"").indexOf("f=zf",1)>0){
				window.location = "http://cnhklm.com/game";
			 }
			 else{
				goHome();
			 }
		}
		function dp_share(){
			document.title ="冰桶挑战全民出动，我在短短10秒倒了"+myData.score+"，还有谁？"
			document.getElementById("share").style.display="";
			window.shareData.tTitle = document.title;
		}
		function dp_Ranking(){
			window.location=mebtnopenurl;
		}

		function showAd(){
		}
		function hideAd(){
		}
		document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
		    
		    WeixinJSBridge.on('menu:share:appmessage', function(argv) {
		        WeixinJSBridge.invoke('sendAppMessage', {
		            "img_url": window.shareData.imgUrl,
		            "link": window.shareData.timeLineLink,
		            "desc": window.shareData.tContent,
		            "title": window.shareData.tTitle
		        }, onShareComplete);
		    });

		    WeixinJSBridge.on('menu:share:timeline', function(argv) {
		        WeixinJSBridge.invoke('shareTimeline', {
		            "img_url": window.shareData.imgUrl,
		            "img_width": "640",
		            "img_height": "640",
		            "link": window.shareData.timeLineLink,
		            "desc": window.shareData.tContent,
		            "title": window.shareData.tTitle
		        }, onShareComplete);
		    });
		}, false);
		</script>
		<div id=share style="display: none">
			<img width=100% src="share.png"
				style="position: fixed; z-index: 9999; top: 0; left: 0; display: "
				ontouchstart="document.getElementById('share').style.display='none';" />
		</div>
		<div style="display: none;">
			<script type="text/javascript">
            var myData = { gameid: "bttz" };
			// var domain = ["oixm.cn", "hiemma.cn", "peagame.net"][parseInt(Math.random() * 3)];
			//window.shareData.timeLineLink ="http://www."+ parseInt(Math.random()*100000) +"."+ myData.gameid +"."+domain+"/gc.html?gameid=" + myData.gameid + (localStorage.myuid ? "&uid=" + localStorage.myuid : "");
			function dp_submitScore(score){
				myData.score = score;
				myData.scoreName ="共倒"+score+"";
				if(score>0){
					if (confirm(" 你这么吊小伙伴们知道不？")){
						dp_share();
					}
				}
			}
			function onShareComplete(res) {
                if (localStorage.myuid && myData.score != undefined) {
                    setTimeout(function(){
                        if (confirm("要将成绩提交到9G游戏排行榜吗？")) {
                            //window.location = "http://wx.9g.com/rank/submit2.jsp?gameid=" + myData.gameid + "&uid=" + localStorage.myuid + "&score=" + myData.score + "&scorename=" + encodeURIComponent(myData.scoreName);
                        }
                        else {
                            document.location.href = mebtnopenurl;
                        }
                    }, 500);
                }
				else {
		        	document.location.href = mebtnopenurl;
				}
	        }
	    
			</script>
			<div style="display: none;">
			 
			</div>
</body>
</html>