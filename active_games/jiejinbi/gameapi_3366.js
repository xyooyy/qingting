﻿function home_3366()
{
	var gameId = gameOption.gameid;
	if(navigator.userAgent.toLowerCase().indexOf('3366app') >= 0)
	{
		location.href = ""+gameId;
	}else if(navigator.userAgent.toLowerCase().indexOf('micromessenger') >= 0){
		location.href = ""+gameId;
	}else{
		location.href = "http://yx.huosu.com/yx/index"
	}
}
function more_3366()
{
	var ua = navigator.userAgent.toLowerCase();
	var suc = ua.indexOf('3366app') >= 0 && window.Android && Android.moreGame && Android.moreGame();
	if(!suc)
	{
		home_3366();
	}
}

var t;
function share_3366()
{
	//分享到微信
	 var h=document.documentElement.clientHeight; 
     var w=document.documentElement.clientWidth; 
	 var div=document.createElement('div');
	 div.setAttribute('id', 'share_3366')
	 div.style.cssText = "background:rgba(0,0,0,0.8); position:absolute; top:0px; left:0px; width:100%; height:100%; z-index:200;";
	 div.innerHTML = '<p style="text-align: right; padding-left: 10px;"><img src="http://m.3366.com/h5game/share_3366.png" style="max-width: 280px; padding-right: 25px;"></p>'
    document.body.appendChild(div);
	t = setTimeout(hideShare_3366, 3000);
}
	
function hideShare_3366()
{
	clearTimeout(t)
	document.body.removeChild(document.getElementById('share_3366'));
}
	
function submit_3366(score)
{
	//提交
	var cachekey = 'RecentPlaykey';
		var str = getCookie(cachekey);
		var ary = [];
		str ? ary = str.split('|') : '';
		for(var i = 0, len = ary.length; i < len; i++)
		{
			var g = ary[i].split(',');
			if(Number(g[0]) == gameOption.gameid){
				if(g.length > 2){
					if((Number(g[2]) < score && gameOption.scorecmp == 2)|| (Number(g[2]) > score && gameOption.scorecmp == 1)){
						g[2] = score;
						ary[i] = g.join(',');
					}
				}else{
					ary[i]+=","+score;
				}
				break;
			}
		}
		setCookie(cachekey,ary.join('|'), 365);
}

function getCookie(c_name)
	{
		if (document.cookie.length>0)
		{
		  var c_start=document.cookie.indexOf(c_name + "=")
		  if (c_start!=-1)
			{ 
			c_start=c_start + c_name.length+1 
			c_end=document.cookie.indexOf(";",c_start)
			if (c_end==-1) c_end=document.cookie.length
			return unescape(document.cookie.substring(c_start,c_end))
			} 
		}
		return ""
	}
	
	function setCookie(c_name,value,expiredays)
	{
		var exdate=new Date()
		exdate.setDate(exdate.getDate()+expiredays);
		document.cookie = "#";
	}

(function()
{
		var gameid = gameOption.gameid;
		var serverId = gameid % 5 === 0 ? '' : gameid % 5;
		var imgurl = '';
		if(location.host == 'mt.3366.com')
		{
			imgurl =  'http://mt.3366.com/fileupload/h5games/iconfile/' + gameid % 100 + '/' + gameid + '.jpg';
		}
		else
		{
			imgurl =  'http://img' + serverId + '.3366img.com/fileupload/h5games/iconfile/' + gameid % 100 + '/' + gameid + '.jpg';
		}
		if(!window.shareData)
		{
			window.shareData = 
			{
				"tContent": document.title,
		        "tTitle": document.title
			}
		}
		
		function weixinShare()
		{
			var link = window.location.href
			if(window.shareData.tLink)
			{
				link = window.location.href;
			}
			WeixinJSBridge.on('menu:share:appmessage', function(argv) {
		        WeixinJSBridge.invoke('sendAppMessage', {
		            "img_url": imgurl,
		            "link": link,
		            "desc": window.shareData.tContent,
		            "title": window.shareData.tTitle
		        }, function(res) {
					if(typeof(pgvSendClick) == 'function'){
						pgvSendClick({hottag: '3366h5.wechat.gameshare.'+gameOption.gameid});
					}
					if(typeof (onShare_3366)== "function" )
					{
						onShare_3366(res);
					}
		        });
		    });

		    WeixinJSBridge.on('menu:share:timeline', function(argv) {
		        WeixinJSBridge.invoke('shareTimeline', {
		            "img_url": imgurl,
		            "img_width": "640",
		            "img_height": "640",
		            "link": link,
		            "desc": window.shareData.tContent,
		            "title": window.shareData.tTitle
		        }, function(res) {
					if(typeof(pgvSendClick) == 'function'){
						pgvSendClick({hottag: '3366h5.wechat.gameshare.'+gameOption.gameid});
					}
					if(typeof (onShare_3366)== "function")
					{
						onShare_3366(res);
					}
		        });
		    });
		}
		
		if(typeof WeixinJSBridge != 'undefined')
		{
			weixinShare();
		}
		else
		{
			document.addEventListener('WeixinJSBridgeReady', function onBridgeReady()
			{
				weixinShare();
			}, false);
		}
		
		
		
		
	function getScript(url)
	{
		var s = document.createElement('script');
		s.src = url;
		document.body.appendChild(s);
	}
	//玩家玩过上报
	getScript('');
	
	//设置我玩过的
	function setRecentPlay(gameid)
	{
		var MAX_GAMES = 8;
		var cachekey = 'RecentPlaykey';
		var str = getCookie(cachekey);
		var ary = [];
		str ? ary = str.split('|') : '';
		var v = gameid+','+new Date().getTime();
		for(var i = 0, len = ary.length; i < len; i++)
		{
			var g = ary[i].split(',');
			if(Number(g[0]) == gameid){
				ary.splice(i,1);
				if(g.length > 2){
					v += ","+ g[2];
				}
				
				break;
			}
		}
		ary.unshift(v);
		if(ary.length > MAX_GAMES)
		{
			ary = ary.slice(0,MAX_GAMES);
		}
		setCookie(cachekey,ary.join('|'), 365);
	}
	setRecentPlay(gameid);
	
	//pv统计
	var head = document.body;
    var script = document.createElement("script");
	script.type = "text/javascript"; 
    script.onload=function(){
		if(typeof(pgvMain) == 'function')
		{
			pgvMain({virtualDomain:'h.7k7k.com'});
		}
		var c_start = window.location.href.indexOf("clicktag");
		if(typeof(pgvSendClick) == 'function' && c_start != -1)
		{
			c_start=c_start + 9;
			c_end=window.location.href.indexOf("&",c_start);
			if (c_end==-1) c_end=str.length;
			var tag = window.location.href.substring(c_start,c_end);
			pgvSendClick({hottag: tag});
		}
		if(location.search.indexOf("from=timeline") > -1){//朋友圈
			pgvSendClick({hottag: 'from wechat.cshareentry.'+gameOption.gameid});
		}
		if(location.search.indexOf("from=singlemessage") > -1){//好友
			pgvSendClick({hottag: 'from wechat.shareentry.'+gameOption.gameid});
		}
		
		if(gameOption.gamename == '看你控制力有多强' || gameOption.gamename == '能过河就算你狠')
		{
			$(document).delegate('.app-fixedad','click',function(e)
			{
				pgvSendClick({hottag: '3366h5.h5game.wechatad.'+gameOption.gameid});
				setTimeout(function()
				{
					location.href = '#';<!--微信-->
				},500);
				e.preventDefault();
			});
		}
    };
    script.src = "";
    head.appendChild(script);
	
	if(gameOption.gamename == '看你控制力有多强' || gameOption.gamename == '能过河就算你狠')
	{
		try
		{
			$(document).ready(function()
			{
				$(document.body).append('<div class="app-fixedad"><a href="http://yx.huosu.com/yx/index"><i class="logo"></i><span class="btn">关注</span><p class="wording">游戏精彩，不用下载！</p></a></div>');
			});
		}catch(_){}
	}
})();