    (function(a){var s={socre:0};a.initMenu=function(r){a.request.get("uid");a.request.get("gid");var t=0,b=a.objExtend({height:16,fontId:"ui",hoverFontId:"ui",color:"#FFFFFF",strokeColor:"#000000",hoverColor:"#FFF100",hoverStrokeColor:"#7F2D00",paddingLeft:18,paddingTop:23,bgColor:"#CCCCCC",score:0,absoluteY:160,btnPadding:23,cross:false,options:[{x:0,y:0,align:"",text:"",fillStyle:"#000000",strokeStyle:"#FFFFFF"}],logo:{imageid:"",x:0,y:0,anchor:a.graphics.ANCHOR_LT},stopScreen:{width:140,height:180},
init:function(){},stop:function(){}},r||{});r=new a.ui.classes.button(a.objExtend(b,{width:15,fsx:217,fsy:64,hfsx:150,hfsy:64,align:"center",y:160}));var w=new a.ui.classes.button(a.objExtend(b,{width:15,fsx:239,fsy:64,hfsx:172,hfsy:64,align:"center",y:183})),x=new a.ui.classes.button(a.objExtend(b,{width:15,fsx:217,fsy:64,hfsx:150,hfsy:64,align:"",x:122,y:131})),y=new a.ui.classes.button(a.objExtend(b,{width:15,fsx:239,fsy:64,hfsx:172,hfsy:64,align:"",x:145,y:131})),z=new a.ui.classes.button(a.objExtend(b,
{width:60,fsx:60,fsy:0,hfsx:0,hfsy:0,align:"center",y:b.absoluteY})),A=new a.ui.classes.button(a.objExtend(b,{width:60,fsx:180,fsy:0,hfsx:120,hfsy:0,align:"center",y:160})),B=new a.ui.classes.button(a.objExtend(b,{width:60,fsx:60,fsy:16,hfsx:0,hfsy:16,align:"center",y:b.absoluteY+b.btnPadding})),C=new a.ui.classes.button(a.objExtend(b,{width:60,fsx:60,fsy:32,hfsx:0,hfsy:32,align:"center",y:b.absoluteY+b.btnPadding*2})),D=new a.ui.classes.button(a.objExtend(b,{width:60,fsx:60,fsy:48,hfsx:0,hfsy:48,
align:"center",y:b.absoluteY+b.btnPadding*3})),E=new a.ui.classes.button(a.objExtend(b,{width:60,fsx:180,fsy:32,hfsx:120,hfsy:32,align:"center",y:160})),F=new a.ui.classes.button(a.objExtend(b,{width:60,fsx:180,fsy:48,hfsx:120,hfsy:48,align:"center",y:183})),G=new a.ui.classes.button(a.objExtend(b,{width:60,fsx:180,fsy:16,hfsx:120,hfsy:16,align:"center",y:183})),k=[r,w],i=0,g=[z,B,C,D],d=0,h=[x,y,A,G],f=2,p=[E,F],l=1;if(a.localStorage.getItem("soundDisabled")=="true")i=1;else if(a.localStorage.getItem("soundDisabled")==
"false")i=0;var m=b.stopScreen,q={width:220,height:50,refresh:true,canClick:false,timeout:0,msg:"",tip:"",code:0,sendingAnimateTimeout:0,notice:["\u7ee7\u7eed\u52aa\u529b","\u4f60\u771f\u5389\u5bb3","\u8bf7\u91cd\u65b0\u767b\u9646","\u7f51\u7edc\u4e0d\u592a\u597d\u54e6","\u8bf7\u91cd\u65b0\u4e0a\u4f20\u79ef\u5206"]},u={refresh:true};a.menu(function(){a.canvas.clearScreen().fillStyle(b.bgColor).fillRect(0,0,a.canvas.screen.getWidth(),a.canvas.screen.getHeight());if(t==0){var c=parseInt((a.canvas.screen.getHeight()-
68)/2);k[0].y=c+29;k[1].y=c+52;a.canvas.strokeStyle(b.strokeColor).drawImage("ui",240,49,14,14,k[0].x-b.paddingLeft,k[0].y+i*b.paddingTop+1,14,14).drawImage("ui",120,64,30,16,parseInt((a.canvas.screen.getWidth()-30)/2),c,30,16);for(c=0;c<k.length;c++)c!=i&&k[c].show();k[i].hover();if(a.keyPressed("down")){i++;i%=k.length}else if(a.keyPressed("up")){i--;if(i<0)i=k.length-1}else if(a.keyPressed("a")||a.keyPressed("menu"))switch(i){case 0:a.localStorage.setItem("soundDisabled","false");t=1;break;case 1:a.localStorage.setItem("soundDisabled",
"true");t=1}}else{b.logo.imageid!=""&&a.canvas.drawImage(b.logo.imageid,b.logo.x,b.logo.y,b.logo.anchor);if(b.cross){g[d].y=b.absoluteY;g[d].hover();a.canvas.drawImage("ui",240,0,14,16,g[d].x-14,g[d].y,14,16).drawImage("ui",240,32,14,16,g[d].x+g[d].width,g[d].y,14,16);if(a.keyPressed("right")){a.canvas.drawImage("ui",240,48,14,16,g[d].x+g[d].width,g[d].y,14,16);d++;d%=g.length}else if(a.keyPressed("left")){a.canvas.drawImage("ui",240,16,14,16,g[d].x-14,g[d].y,14,16);d--;if(d<0)d=g.length-1}}else{a.canvas.drawImage("ui",
240,49,14,14,g[0].x-b.paddingLeft,g[0].y+d*b.paddingTop+1,14,14);for(c=0;c<g.length;c++)c!=d&&g[c].show();g[d].hover();if(a.keyPressed("down")){d++;d%=g.length}else if(a.keyPressed("up")){d--;if(d<0)d=g.length-1}}if(a.keyPressed("a")||a.keyPressed("menu"))switch(d){case 0:b.init();a.gameFlow.run();d=0;break;case 1:a.gameFlow.zone({type:"help",from:"menu"});d=0;break;case 2:try{window.hide()}catch(e){}d=0;break;case 3:window.close();}}}).stop(function(){var c=parseInt((a.canvas.screen.getWidth()-
m.width)/2),e=parseInt((a.canvas.screen.getHeight()-m.height)/2),j=parseInt((a.canvas.screen.getWidth()-78)/2),n=parseInt((a.canvas.screen.getHeight()-68)/2);a.canvas.fillStyle(b.bgColor).clearRect(c,e,m.width,m.height).fillRect(c,e,m.width,m.height).strokeStyle("#FFFFFF").strokeRect(c,e,m.width,m.height).drawImage("ui",f>1?187:120,64,30,16,j,n,30,16);h[0].x=j+40;h[0].y=n;h[1].x=j+63;h[1].y=n;h[2].y=n+29;h[3].y=n+52;for(c=0;c<h.length;c++)c!=f&&h[c].show();h[f].hover();if(f>1)if(a.localStorage.getItem("soundDisabled")==
"true")h[1].hover();else a.localStorage.getItem("soundDisabled")=="false"&&h[0].hover();else f==0?a.localStorage.setItem("soundDisabled","false"):a.localStorage.setItem("soundDisabled","true");if(f==0||f==1)if(a.keyPressed("left")||a.keyPressed("right"))if(f==0)f=1;else if(f==1)f=0;if(a.keyPressed("down"))if(f<2)f=2;else f<h.length-1&&f++;else if(a.keyPressed("up"))if(f>2)f--;else{if(f>0)if(a.localStorage.getItem("soundDisabled")=="true")f=1;else if(a.localStorage.getItem("soundDisabled")=="false")f=
0}else if(a.keyPressed("a")||a.keyPressed("menu"))switch(f){case 2:b.stop();a.gameFlow.run();f=2;break;case 3:a.gameFlow.over();f=2;break;default:f=2}}).over(function(){var c="\u672c\u6b21\u5206: "+parseInt(s.score);a.canvas.clearScreen().fillStyle(b.bgColor).fillRect(0,0,a.canvas.screen.getWidth(),a.canvas.screen.getHeight()).drawImage("ui",240,49,14,14,p[0].x-b.paddingLeft,p[0].y+l*b.paddingTop+1,14,14).drawString(c,0,90,a.graphics.VCENTER,true,b.color,b.strokeColor);codeStrWidth=codeStrXY=null;
q.msg!=""&&a.canvas.drawString(q.msg,0,120,a.graphics.VCENTER,true,b.color,b.strokeColor);q.tip!=""&&a.canvas.drawString(q.tip,0,145,a.graphics.VCENTER,true,b.color,b.strokeColor);for(c=0;c<p.length;c++)p[c].show();p[l].hover();if(a.keyPressed("down")){l++;l%=p.length}else if(a.keyPressed("up")){l--;if(l<0)l=p.length-1}else if(a.keyPressed("a")||a.keyPressed("menu"))switch(l){case 0:a.gameFlow.menu();l=1;q.msg="";q.tip=""}}).zone(function(c){switch(c.type){case "help":if(u.refresh){var e=a.canvas.screen.getWidth(),
j=a.canvas.screen.getHeight(),n=j-41,v=j-40,H=j-30,o=parseInt((e-20)/2);u.refresh=false;a.canvas.clearScreen().fillStyle(b.bgColor).fillRect(0,0,a.canvas.screen.getWidth(),a.canvas.screen.getHeight()).setColor(b.hoverColor,b.hoverStrokeColor);b.cross?a.canvas.drawString("\u5e2e",5,80,"",true,b.hoverColor,b.hoverStrokeColor).drawString("\u52a9",5,105,"",true,b.hoverColor,b.hoverStrokeColor).drawString("\u8bf4",5,130,"",true,b.hoverColor,b.hoverStrokeColor).drawString("\u660e",5,155,"",true,b.hoverColor,
b.hoverStrokeColor).drawString("\u6309",e-25,20,"",true,b.hoverColor,b.hoverStrokeColor).drawString("\u4e2d",e-25,45,"",true,b.hoverColor,b.hoverStrokeColor).drawString("\u5fc3",e-25,70,"",true,b.hoverColor,b.hoverStrokeColor).drawString("\u952e",e-25,95,"",true,b.hoverColor,b.hoverStrokeColor).drawString("\u8fd4",e-25,120,"",true,b.hoverColor,b.hoverStrokeColor).drawString("\u56de",e-25,145,"",true,b.hoverColor,b.hoverStrokeColor).drawString("\u4e3b",e-25,170,"",true,b.hoverColor,b.hoverStrokeColor).drawString("\u83dc",
e-25,195,"",true,b.hoverColor,b.hoverStrokeColor).drawString("\u5355",e-25,220,"",true,b.hoverColor,b.hoverStrokeColor).beginPath().moveTo(35,0).lineTo(35,j).closePath().stroke().beginPath().moveTo(e-35,0).lineTo(e-35,j).closePath().stroke():a.canvas.drawString("\u5e2e\u52a9\u8bf4\u660e",0,25,a.graphics.VCENTER,true,b.hoverColor,b.hoverStrokeColor).drawString("\u6309\u4e2d\u5fc3\u952e\u8fd4\u56de\u4e3b\u83dc\u5355",0,j-10,a.graphics.VCENTER,true,b.hoverColor,b.hoverStrokeColor).beginPath().moveTo(0,
41).lineTo(e,41).stroke().moveTo(o,40).lineTo(o+20,40).lineTo(o+10,30).lineTo(o,40).closePath().stroke().beginPath().moveTo(0,n).lineTo(e,n).stroke().moveTo(o,v).lineTo(o+20,v).lineTo(o+10,H).lineTo(o,v).closePath().stroke();for(e=0;e<b.options.length;e++)a.canvas.drawString(b.options[e].text,b.options[e].x,b.options[e].y,b.options[e].align,true,b.options[e].fillStyle,b.options[e].strokeStyle)}if(a.keyPressed("a")||a.keyPressed("menu")){u.refresh=true;a.gameFlow.menu()}}if(q.canClick&&a.keyPressed("a"))if(c.type!=
"update")if(c.from=="menu")a.gameFlow.menu();else c.from=="stop"&&a.gameFlow.stop();else a.gameFlow.over()});return a};a.updateScore=function(r){s=a.objExtend(s,r||{});return a}})(jsGame);
