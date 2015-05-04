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
<html>
	<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,minimal-ui">
			<meta http-equiv="pragma" content="no-cache">
			<meta http-equiv="Cache-Control" content="no-cache, must-revalidate">
			<meta http-equiv="expires" content="-1">
			<title>火速小游戏</title>
			<link rel="stylesheet" type="text/css" href="css/m.min.css">
		</head>
<body>
	<div id="container">
	
	</div>
	<script language=javascript>
	var theurl="<?php echo $row['moregameh']?>"
		var mebtnopenurl = '<?php echo $row['moregameh']?>';
		window.shareData = {
		        "imgUrl": "<?php echo $row['icon']?>",
		        "timeLineLink": "<?php echo 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'].'?'.$_SERVER['QUERY_STRING'];?>",
		        "tTitle": "<?php echo $row['text'][0]['val']?>",
		        "tContent": "<?php echo $row['text'][1]['val']?>"
		};
				
		function goHome(){
			window.location=mebtnopenurl;
		}
		function clickMore(){
			if((window.location+"").indexOf("zf",1)>0){
				window.location = "http://www.huosu.com/phone/befrom.php";
			 }
			 else{
				goHome();
			 }
		}
		function dp_share(){
			document.title ="我在1分钟内" + (myData.score) + "次找到目标！你也来试试！";
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
		<div style="display: none;">
			<script type="text/javascript">
            var myData = { gameid: "qmxzfzm" };
			window.shareData.timeLineLink = theurl;
			function dp_submitScore(score){
				myData.score = parseInt(score);
				/*myData.scoreName = "成功寻找"+score+"次房祖名";
				if(score>1){
					if (confirm("你一共" + score+ "次找到目标，你的24k氪金眼还没瞎吗？快让你的朋友也来试试吧")){
						dp_share();
					}
				}*/
				return true;
			}
			function onShareComplete(res) {
                if (localStorage.myuid && myData.score != undefined) {
                  
                }
				else {
		        	document.location.href = mebtnopenurl;
				}
	        }
			</script>
			<div style="display: none;">
			<script type="text/javascript">
var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F2eac95e2df0ea5d2b0aaa92e3dbbe419' type='text/javascript'%3E%3C/script%3E"));
</script>
			</div>
</body>
</html>
<script id="tpl" type="text/html">
<div class="grid">
        <div class="page hide" id="loading">
            <div class="loading-txt"><%=loading%></div>
        </div>
        <div class="page hide" id="index">
            <h1><%=title%></h1>

            <div id="help"><%=help_txt%></div>
            <div class="btns">
                <button data-type="color" class="btn play-btn">
                    <%=btn_start%>
                </button>
				 
            </div>
        </div>
        <div class="page hide" id="room">
            <header>
                <span class="lv">
                    <%=score%>
                    <em>
                        1
                    </em>
                </span>
                <span class="time">
                </span>
               <!-- <span class="btn btn-pause">
                    <%=btn_pause%>
                </span>
				-->
            </header>
            <div id="box" class="lv1">
            </div>
        </div>
        <div class="page hide" id="dialog">
        <div class="inner">
                <div class="content gameover">
                    <div class="inner-content">
                        
                        <h3></h3>
                        <div class="btn-wrap">
                            <button class="btn btn-restart">
                                <%=btn_reTry%>
                            </button>
							<a href="javascript:void(0);" onclick="clickMore();" class="btn btn-boyaa">
								<%=btn_more_game%>
							</a>
                        </div>
						
						
                    </div>
                </div>
                <div class="content pause">
                    <div class="inner-content">
                        
                        <h3>
                            <%=game_pause%>
                        </h3>
                        <div class="btn-wrap">
                            <button class="btn btn-resume">
                                <%=btn_resume%>
                            </button>
							<a href="javascript:void(0);" onclick="clickMore();" class="btn btn-boyaa">
								<%=btn_more_game%>
							</a>
                        </div>
						
                    </div>
                </div>
            </div>
    </ins>
        </div>
    </div>
	<link rel="stylesheet" type="text/css" href="bdad.css">
<div id="bdfootpanel">
<a href="http://mp.weixin.qq.com/s?__biz=MjM5MjEwNjkwNw==&mid=200328205&idx=2&sn=7587cfa863d47ae2f14398f5cc0c8d19#rd" ><img src="ad.jpg" width="100%" height="50px"></a>
</div>
	<div id=share style="display: none">
			<img width=100% src="share.png"
				style="position: fixed; z-index: 9999; top: 0; left: 0; display: "
				ontouchstart="document.getElementById('share').style.display='none';" />
		</div>
</script>
<script src="js/libs.min.js"></script>
<script >
var _lang = {
        zh1: {
            title: "全民寻找房祖名123",
            help_txt: "虽然柯少向龙叔保证不会带坏房祖名,但龙叔强烈要求你找回祖名。123",
            score: "得分：",
            btn_pause: "暂停",
            btn_start: "开始游戏",
            btn_reTry: "再来一次",
            btn_more_game: "更多游戏",
            game_pause: "游戏暂停",
            btn_resume: "继续游戏",
            loading: "加载中...",
            lv_txt: ["龙叔的脑残粉", "龙叔的忠实粉", "龙叔的路人粉", "慧眼识祖名", "火眼金睛", "洞察一切", "两眼冒光", "24k氪金眼", "已被亮瞎！"],
            share_txt1: "我闯过",
            share_txt2: "关，击败",
            share_txt3: "%的人，我是【",
            share_txt4: "】，不服来战！",
            desc: "找出所有色块中颜色不同的一块。分享朋友圈，找到身边的色魔"
        },
        zh: {
            title: "<?php echo $row['text'][0]['val']?>",
            help_txt: "<?php echo $row['text'][1]['val']?>",
            score: "过关：",
            btn_pause: "暂停",
            btn_start: "开始游戏",
            btn_reTry: "再来一次",
            btn_more_game: "<?php echo $row['moregame']?>",
            game_pause: "游戏暂停",
            btn_resume: "继续游戏",
            loading: "加载中...",
            lv_txt: ["<?php echo $row['fenxiangc']?>", "<?php echo $row['fenxiangc']?>", "<?php echo $row['fenxiangc']?>", "<?php echo $row['fenxiangc']?>", "<?php echo $row['fenxiangc']?>", "<?php echo $row['fenxiangc']?>", "<?php echo $row['fenxiangc']?>", "<?php echo $row['fenxiangc']?>", "<?php echo $row['fenxiangc']?>"],
            share_txt1: "【找妹子】我在",
            share_txt2: "只袜子中找到",
            share_txt3: "个妹子，我是【",
            share_txt4: "】，不服来战！",
            desc: "找出所有'袜'字中的'妹'字。分享朋友圈，找到身边的色魔"
        },
        en: {
            title: "How strong is your eyesight",
            help_txt: "Find the box with the different colour",
            score: "Score：",
            btn_pause: "Pause",
            btn_start: "Start",
            btn_reTry: "Again",
            btn_more_game: "More games",
            game_pause: "Pause",
            btn_resume: "Continues",
            loading: "loading...",
            lv_txt: ["Blind", "Very weak", "Weak", "Just so so", "Not bad", "Nice one", "Great", "Amazing", "Insane"],
            share_txt1: "I passed ",
            share_txt2: "stages and defeated ",
            share_txt3: "% people. I am ",
            share_txt4: ", come to challenge me if you dare！",
            desc: "Find the box with the different colour, share it to your friends!"
        }
    },
    _config = {
        lang: "zh",
        color: {
            allTime: 60,
            addTime: 0,
            lvMap: [2, 3, 4, 5, 5, 6, 6, 7, 7, 7, 8, 8, 8, 8, 8, 8, 9]
        },
        pic: {
            isOpen: !1,
            allTime: 5,
            addTime: 0,
            lvMap: [2, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8]
        }
    },
    shareData1 = {};
!
function() {
    var a = _lang[_config.lang],
        b = $("#tpl").html(),
        c = _.template(b, a);
    $("#container").html(c)
}(),
function() {
    var a = $("#box"),
        b = {
            lv: $("#room .lv em"),
            time: $("#room .time"),
            start: $("#dialog .btn-restart"),
            back: $("#dialog .btn-back"),
            share: $("#dialog .btn-share"),
            pause: $("#room .btn-pause"),
            resume: $("#dialog .btn-resume"),
            dialog: $("#dialog"),
            d_content: $("#dialog .content"),
            d_pause: $("#dialog .pause"),
            d_gameover: $("#dialog .gameover")
        },
        c = {
            init: function(a, b, c) {
                this.type = a,
                    this.api = API[a],
                    this.config = _config[a],
                    this.reset(),
                    this.parent = c,
                    this.el = b,
                    this.renderUI(),
                    this.inited || this.initEvent(),
                    this.inited = !0,
                    this.start()
            },
            renderUI: function() {
                var b = 90 == window.orientation || -90 == window.orientation,
                    c = b ? window.innerHeight : window.innerWidth;
                c -= 20,
                    c = Math.min(c, 500),
                    a.width(c).height(c),
                    this.el.show()
            },
            initEvent: function() {
                var d = "ontouchstart" in document.documentElement ? "touchend" : "click",
                    e = this;
                $(window).resize(function() {
                        c.renderUI()
                    }),
                    a.on(d, "span",
                        function() {
                            var a = $(this).data("type");
                            "a" == a && e.nextLv.call(e)
                        }),
                    b.pause.on(d, _.bind(this.pause, this)),
                    b.resume.on(d, _.bind(this.resume, this)),
                    b.start.on(d, _.bind(this.start, this)),
                    b.back.on(d, _.bind(this.back, this)),
                    b.share.on(d, _.bind(this.share, this))
            },
            start: function() {
                this.time > 5 && b.time.removeClass("danger"),
                    b.dialog.hide(),
                    this._pause = !1,
                    this.lv = "undefined" != typeof this.lv ? this.lv + 1 : 0,
                    this.lvMap = this.config.lvMap[this.lv] || _.last(this.config.lvMap),
                    this.renderMap(),
                    this.renderInfo(),
                    this.timer || (this.timer = setInterval(_.bind(this.tick, this), 1e3));
            },
            share: function() {},
            resume: function() {
                b.dialog.hide(),
                    this._pause = !1
            },
            pause: function() {
                this._pause = !0,
                    b.d_content.hide(),
                    b.d_pause.show(),
                    b.dialog.show()
            },
            tick: function() {
                return this._pause ? void 0 : (this.time--, this.time < 6 && b.time.addClass("danger"), this.time < 0 ? void this.gameOver() : void b.time.text(parseInt(this.time)))
            },
            renderMap: function() {
                if (!this._pause) {
                    var b = this.lvMap * this.lvMap,
                        c = "",
                        d = "lv" + this.lvMap;
                    _(b).times(function() {
                            c += "<span></span>"
                        }),
                        a.attr("class", d).html(c),
                        this.api.render(this.lvMap, this.lv)
                }
            },
            renderInfo: function() {
                b.lv.text(this.lv + 1)
            },
            gameOver: function() {
                var Rankstr = "";
                var d = this.api.getGameOverText(this.lv);
                dp_submitScore(this.lv, d.lv);
                this.lastLv = this.lv,
                    this.lastGameTxt = d.txt,
                    this.lastGamePercent = d.percent,
                    b.d_content.hide(),
                    b.d_gameover.show().find("h3").text(this.lastGameTxt),
                    a.find("span").fadeOut(1500,
                        function() {
                            b.dialog.show()
                        }),
                    this._pause = !0,
                    _hmt.push(["_trackEvent", "score", "score_" + (this.lv + 1)]),
                    this.reset()
            },
            reset: function() {
                this.time = this.config.allTime,
                    this.lv = -1
            },
            nextLv: function() {
                this.time += this.config.addTime,
                    b.time.text(parseInt(this.time)),
                    this._pause || this.start()
            },
            back: function() {
                this._pause = !0,
                    this.el.hide(),
                    b.dialog.hide(),
                    this.parent.render()
            }
        };
    window.Game = c
}(),
function(a) {
    var b = {
            index: $("#index"),
            room: $("#room"),
            loading: $("#loading"),
            dialog: $("#dialog"),
            play: $(".play-btn"),
            btn_boyaa: $(".btn-boyaa"),
            banner: $(".banner"),
            boyaa_logo: $(".boyaa-logo")
        },
        c = window.navigator.userAgent.toLowerCase(),
        d = /android/i.test(c),
        e = /iphone|ipad|ipod/i.test(c),
        f = {
            init: function() {
                this.initEvent(),
                    this.loading(),
                    /android/i.test(c) ? (b.banner.attr("href", "").data("type", "android").find("img").attr("src", "assets/img/banner.android.jpg"), b.banner.show()) : /iphone|ipad|ipod/i.test(c) && (b.banner.attr("href", "").data("type", "ios").find("img").attr("src", "assets/img/banner.ios.jpg"), b.banner.show())
            },
            loading: function() {
                function a() {
                    d++,
                    d == c && f.render()
                }
                if (_config.pic.isOpen)
                    for (var b = ["assets/img/1.png", "assets/img/2.png", "assets/img/3.png", "assets/img/4.png", "assets/img/5.png", "assets/img/6.png", "assets/img/7.png", "assets/img/8.png", "assets/img/9.png", "assets/img/10.png", "assets/img/11.png", "assets/img/12.png", "assets/img/13.png", "assets/img/14.png", "assets/img/15.png", "assets/img/16.png", "assets/img/17.png", "assets/img/18.png"], c = b.length, d = 0, e = 0; c > e; e++) {
                        var g = new Image;
                        g.onload = a,
                            g.src = b[e]
                    } else f.render();
                var h = _lang[_config.lang];
            },
            render: function() {
                setTimeout(function() {
                        b.loading.hide(),
                            b.index.show()
                    },
                    1e3)
            },
            initEvent: function() {
                var a = "ontouchstart" in document.documentElement ? "touchstart" : "click",
                    c = this;
                b.play.on(a,
                        function() {
                            var a = $(this).data("type") || "color";
                            b.index.hide(),
                                Game.init(a, b.room, c)
                        }),
                    b.btn_boyaa.on(a,
                        function() {
                            _hmt.push(["_trackEvent", "button", "more_game"])
                        }),
                    b.boyaa_logo.on(a,
                        function() {
                            _hmt.push(["_trackEvent", "button", "boyaa_logo"])
                        }),
                    b.banner.on(a,
                        function() {
                            var a = $(this).data("t") || "",
                                b = d ? "android" : e ? "ios" : "other_os";
                            _hmt.push(["_trackEvent", "banner", b + "_" + a])
                        })
            }
        };
    f.init(),
        a.API = {}
}(window),
function() {
    var a = $("#box"),
        b = "span",
        c = $("#help p"),
        d = $("#help_color"),
        e = {
            lvT: _lang[_config.lang].lv_txt,
            render: function(e, f) {
                this.lv = f,
                    c.hide(),
                    d.show();
                var g = _config.color.lvMap[f] || _.last(_config.color.lvMap);
                this.d = 15 * Math.max(9 - g, 1),
                    this.d = f > 20 ? 10 : this.d,
                    this.d = f > 40 ? 8 : this.d,
                    this.d = f > 50 ? 5 : this.d;
                var h = Math.floor(Math.random() * e * e),
                    i = this.getColor(255 - this.d),
                    j = this.getLvColor(i[0]);
                var size = a.find(b).height() * 0.96;
                a.find(b).css("background-color", i[1]).data("type", "b").css({
                    "background": "url(<?php echo $row['img'][1]['val']?>)" + j[1],
                    "background-size": "cover"
                }), a.find(b).eq(h).css("background-color", j[1]).data("type", "a").css({
                    "background": "url(<?php echo $row['img'][0]['val']?>)" + j[1],
                    "background-size": "cover"
                });
            },
            getColor: function(a) {
                var b = [Math.round(Math.random() * a), Math.round(Math.random() * a), Math.round(Math.random() * a)],
                    c = "rgb(" + b.join(",") + ")";
                return [b, c]
            },
            getLvColor: function(a) {
                var b = this.d,
                    c = _.map(a,
                        function(a) {
                            return a + b + 10
                        }),
                    d = "rgb(" + c.join(",") + ")";
                return [c, d]
            },
            getGameOverText: function(a) {
                var b = 20 > a ? 0 : Math.ceil((a - 20) / 10),
                    c = this.lvT[b] || _.last(this.lvT),
                    d = c + "lv" + (a + 1),
                    e = a;
                return e = 20 > e ? 2 * a : 30 > a ? 3 * (a - 20) + 40 : 40 > a ? 1.5 * (a - 30) + 70 : 50 > a ? 1.35 * (a - 40) + 85 : 60 > a ? .05 * (a - 50) + 98.5 : 70 > a ? .02 * (a - 60) + 99 : 80 > a ? .02 * (a - 70) + 99.2 : 90 > a ? .02 * (a - 80) + 99.4 : 100 > a ? .02 * (a - 90) + 99.6 : 110 > a ? .02 * (a - 100) + 99.8 : 100,
                    e = ("" + e).length > 5 ? e.toFixed(2) : e, {
                        txt: d,
                        percent: e,
                        lv: c
                    }
            }
        };
    API.color = e
}();
(function() {
   
})();
</script>