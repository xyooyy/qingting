(function(){var h=Math,f=/webkit/i.test(navigator.appVersion)?"webkit":/firefox/i.test(navigator.userAgent)?"Moz":"opera"in window?"O":"",t=/android/gi.test(navigator.appVersion),u=/iphone|ipad/gi.test(navigator.appVersion),p=/playbook/gi.test(navigator.appVersion),B=/hp-tablet/gi.test(navigator.appVersion),v="WebKitCSSMatrix"in window&&"m11"in new WebKitCSSMatrix,l="ontouchstart"in window&&!B,z=f+"Transform"in document.documentElement.style,C=u||p,D=function(){return window.requestAnimationFrame||
window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(b){return setTimeout(b,1)}}(),A=window.cancelRequestAnimationFrame||window.webkitCancelRequestAnimationFrame||window.mozCancelRequestAnimationFrame||window.oCancelRequestAnimationFrame||window.msCancelRequestAnimationFrame||clearTimeout,w="onorientationchange"in window?"orientationchange":"resize",x=l?"touchstart":"mousedown",q=l?"touchmove":"mousemove",r=l?
"touchend":"mouseup",s=l?"touchcancel":"mouseup",y=f=="Moz"?"DOMMouseScroll":"mousewheel",n="translate"+(v?"3d(":"("),o=v?",0)":")";p=function(b,a){var c=this,d;c.wrapper=typeof b=="object"?b:document.getElementById(b);c.wrapper.style.overflow="hidden";c.scroller=c.wrapper.children[0];c.options={hScroll:true,vScroll:true,x:0,y:0,bounce:true,bounceLock:false,momentum:true,lockDirection:true,useTransform:true,useTransition:false,topOffset:0,checkDOMChanges:false,hScrollbar:true,vScrollbar:true,fixedScrollbar:t,
hideScrollbar:u,fadeScrollbar:u&&v,scrollbarClass:"",zoom:false,zoomMin:1,zoomMax:4,doubleTapZoom:2,wheelAction:"scroll",snap:false,snapThreshold:1,onRefresh:null,onBeforeScrollStart:function(e){e.preventDefault()},onScrollStart:null,onBeforeScrollMove:null,onScrollMove:null,onBeforeScrollEnd:null,onScrollEnd:null,onTouchEnd:null,onDestroy:null,onZoomStart:null,onZoom:null,onZoomEnd:null};if(c.zoom&&t){n="translate(";o=")"}for(d in a)c.options[d]=a[d];c.x=c.options.x;c.y=c.options.y;c.options.useTransform=
z?c.options.useTransform:false;c.options.hScrollbar=c.options.hScroll&&c.options.hScrollbar;c.options.vScrollbar=c.options.vScroll&&c.options.vScrollbar;c.options.zoom=c.options.useTransform&&c.options.zoom;c.options.useTransition=C&&c.options.useTransition;c.scroller.style[f+"TransitionProperty"]=c.options.useTransform?"-"+f.toLowerCase()+"-transform":"top left";c.scroller.style[f+"TransitionDuration"]="0";c.scroller.style[f+"TransformOrigin"]="0 0";if(c.options.useTransition)c.scroller.style[f+
"TransitionTimingFunction"]="cubic-bezier(0.33,0.66,0.66,1)";if(c.options.useTransform)c.scroller.style[f+"Transform"]=n+c.x+"px,"+c.y+"px"+o;else c.scroller.style.cssText+=";position:absolute;top:"+c.y+"px;left:"+c.x+"px";if(c.options.useTransition)c.options.fixedScrollbar=true;c.refresh();c._bind(w,window);c._bind(x);if(!l){c._bind("mouseout",c.wrapper);c.options.wheelAction!="none"&&c._bind(y)}if(c.options.checkDOMChanges)c.checkDOMTime=setInterval(function(){c._checkDOMChanges()},500)};p.prototype=
{enabled:true,x:0,y:0,steps:[],scale:1,currPageX:0,currPageY:0,pagesX:[],pagesY:[],aniTime:null,wheelZoomCount:0,handleEvent:function(b){switch(b.type){case x:if(!l&&b.button!==0)break;this._start(b);break;case q:this._move(b);break;case r:case s:this._end(b);break;case w:this._resize();break;case y:this._wheel(b);break;case "mouseout":this._mouseout(b);break;case "webkitTransitionEnd":this._transitionEnd(b)}},_checkDOMChanges:function(){this.moved||this.zoomed||this.animating||this.scrollerW==this.scroller.offsetWidth*
this.scale&&this.scrollerH==this.scroller.offsetHeight*this.scale||this.refresh()},_scrollbar:function(b){var a=document,c;if(this[b+"Scrollbar"]){if(!this[b+"ScrollbarWrapper"]){c=a.createElement("div");if(this.options.scrollbarClass)c.className=this.options.scrollbarClass+b.toUpperCase();else c.style.cssText="position:absolute;z-index:100;"+(b=="h"?"height:7px;bottom:1px;left:2px;right:"+(this.vScrollbar?"7":"2")+"px":"width:7px;bottom:"+(this.hScrollbar?"7":"2")+"px;top:2px;right:1px");c.style.cssText+=
";pointer-events:none;-"+f+"-transition-property:opacity;-"+f+"-transition-duration:"+(this.options.fadeScrollbar?"350ms":"0")+";overflow:hidden;opacity:"+(this.options.hideScrollbar?"0":"1");this.wrapper.appendChild(c);this[b+"ScrollbarWrapper"]=c;c=a.createElement("div");if(!this.options.scrollbarClass)c.style.cssText="position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);-"+f+"-background-clip:padding-box;-"+f+"-box-sizing:border-box;"+(b=="h"?"height:100%":
"width:100%")+";-"+f+"-border-radius:3px;border-radius:3px";c.style.cssText+=";pointer-events:none;-"+f+"-transition-property:-"+f+"-transform;-"+f+"-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);-"+f+"-transition-duration:0;-"+f+"-transform:"+n+"0,0"+o;if(this.options.useTransition)c.style.cssText+=";-"+f+"-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)";this[b+"ScrollbarWrapper"].appendChild(c);this[b+"ScrollbarIndicator"]=c}if(b=="h"){this.hScrollbarSize=this.hScrollbarWrapper.clientWidth;
this.hScrollbarIndicatorSize=h.max(this.hScrollbarSize*this.hScrollbarSize/this.scrollerW>>0,8);this.hScrollbarIndicator.style.width=this.hScrollbarIndicatorSize+"px";this.hScrollbarMaxScroll=this.hScrollbarSize-this.hScrollbarIndicatorSize;this.hScrollbarProp=this.hScrollbarMaxScroll/this.maxScrollX}else{this.vScrollbarSize=this.vScrollbarWrapper.clientHeight;this.vScrollbarIndicatorSize=h.max(this.vScrollbarSize*this.vScrollbarSize/this.scrollerH>>0,8);this.vScrollbarIndicator.style.height=this.vScrollbarIndicatorSize+
"px";this.vScrollbarMaxScroll=this.vScrollbarSize-this.vScrollbarIndicatorSize;this.vScrollbarProp=this.vScrollbarMaxScroll/this.maxScrollY}this._scrollbarPos(b,true)}else if(this[b+"ScrollbarWrapper"]){if(z)this[b+"ScrollbarIndicator"].style[f+"Transform"]="";this[b+"ScrollbarWrapper"].parentNode.removeChild(this[b+"ScrollbarWrapper"]);this[b+"ScrollbarWrapper"]=null;this[b+"ScrollbarIndicator"]=null}},_resize:function(){var b=this;setTimeout(function(){b.refresh()},t?200:0)},_pos:function(b,a){b=
this.hScroll?b:0;a=this.vScroll?a:0;if(this.options.useTransform)this.scroller.style[f+"Transform"]=n+b+"px,"+a+"px"+o+" scale("+this.scale+")";else{b>>=0;a>>=0;this.scroller.style.left=b+"px";this.scroller.style.top=a+"px"}this.x=b;this.y=a;this._scrollbarPos("h");this._scrollbarPos("v")},_scrollbarPos:function(b,a){var c=b=="h"?this.x:this.y;if(this[b+"Scrollbar"]){c*=this[b+"ScrollbarProp"];if(c<0){if(!this.options.fixedScrollbar){c=this[b+"ScrollbarIndicatorSize"]+(c*3>>0);if(c<8)c=8;this[b+"ScrollbarIndicator"].style[b==
"h"?"width":"height"]=c+"px"}c=0}else if(c>this[b+"ScrollbarMaxScroll"])if(this.options.fixedScrollbar)c=this[b+"ScrollbarMaxScroll"];else{c=this[b+"ScrollbarIndicatorSize"]-((c-this[b+"ScrollbarMaxScroll"])*3>>0);if(c<8)c=8;this[b+"ScrollbarIndicator"].style[b=="h"?"width":"height"]=c+"px";c=this[b+"ScrollbarMaxScroll"]+(this[b+"ScrollbarIndicatorSize"]-c)}this[b+"ScrollbarWrapper"].style[f+"TransitionDelay"]="0";this[b+"ScrollbarWrapper"].style.opacity=a&&this.options.hideScrollbar?"0":"1";this[b+
"ScrollbarIndicator"].style[f+"Transform"]=n+(b=="h"?c+"px,0":"0,"+c+"px")+o}},_start:function(b){var a=l?b.touches[0]:b,c,d;if(this.enabled){this.options.onBeforeScrollStart&&this.options.onBeforeScrollStart.call(this,b);if(this.options.useTransition||this.options.zoom)this._transitionTime(0);this.zoomed=this.animating=this.moved=false;this.dirY=this.dirX=this.absDistY=this.absDistX=this.distY=this.distX=0;if(this.options.zoom&&l&&b.touches.length>1){d=h.abs(b.touches[0].pageX-b.touches[1].pageX);
c=h.abs(b.touches[0].pageY-b.touches[1].pageY);this.touchesDistStart=h.sqrt(d*d+c*c);this.originX=h.abs(b.touches[0].pageX+b.touches[1].pageX-this.wrapperOffsetLeft*2)/2-this.x;this.originY=h.abs(b.touches[0].pageY+b.touches[1].pageY-this.wrapperOffsetTop*2)/2-this.y;this.options.onZoomStart&&this.options.onZoomStart.call(this,b)}if(this.options.momentum){if(this.options.useTransform){c=getComputedStyle(this.scroller,null)[f+"Transform"].replace(/[^0-9-.,]/g,"").split(",");d=c[4]*1;c=c[5]*1}else{d=
getComputedStyle(this.scroller,null).left.replace(/[^0-9-]/g,"")*1;c=getComputedStyle(this.scroller,null).top.replace(/[^0-9-]/g,"")*1}if(d!=this.x||c!=this.y){this.options.useTransition?this._unbind("webkitTransitionEnd"):A(this.aniTime);this.steps=[];this._pos(d,c)}}this.absStartX=this.x;this.absStartY=this.y;this.startX=this.x;this.startY=this.y;this.pointX=a.pageX;this.pointY=a.pageY;this.startTime=b.timeStamp||Date.now();this.options.onScrollStart&&this.options.onScrollStart.call(this,b);this._bind(q);
this._bind(r);this._bind(s)}},_move:function(b){var a=l?b.touches[0]:b,c=a.pageX-this.pointX,d=a.pageY-this.pointY,e=this.x+c,g=this.y+d,i=b.timeStamp||Date.now();this.options.onBeforeScrollMove&&this.options.onBeforeScrollMove.call(this,b);if(this.options.zoom&&l&&b.touches.length>1){e=h.abs(b.touches[0].pageX-b.touches[1].pageX);g=h.abs(b.touches[0].pageY-b.touches[1].pageY);this.touchesDist=h.sqrt(e*e+g*g);this.zoomed=true;a=1/this.touchesDistStart*this.touchesDist*this.scale;if(a<this.options.zoomMin)a=
0.5*this.options.zoomMin*Math.pow(2,a/this.options.zoomMin);else if(a>this.options.zoomMax)a=2*this.options.zoomMax*Math.pow(0.5,this.options.zoomMax/a);this.lastScale=a/this.scale;e=this.originX-this.originX*this.lastScale+this.x;g=this.originY-this.originY*this.lastScale+this.y;this.scroller.style[f+"Transform"]=n+e+"px,"+g+"px"+o+" scale("+a+")";this.options.onZoom&&this.options.onZoom.call(this,b)}else{this.pointX=a.pageX;this.pointY=a.pageY;if(e>0||e<this.maxScrollX)e=this.options.bounce?this.x+
c/2:e>=0||this.maxScrollX>=0?0:this.maxScrollX;if(g>this.minScrollY||g<this.maxScrollY)g=this.options.bounce?this.y+d/2:g>=this.minScrollY||this.maxScrollY>=0?this.minScrollY:this.maxScrollY;if(this.absDistX<6&&this.absDistY<6){this.distX+=c;this.distY+=d;this.absDistX=h.abs(this.distX);this.absDistY=h.abs(this.distY)}else{if(this.options.lockDirection)if(this.absDistX>this.absDistY+5){g=this.y;d=0}else if(this.absDistY>this.absDistX+5){e=this.x;c=0}this.moved=true;this._pos(e,g);this.dirX=c>0?-1:
c<0?1:0;this.dirY=d>0?-1:d<0?1:0;if(i-this.startTime>300){this.startTime=i;this.startX=this.x;this.startY=this.y}this.options.onScrollMove&&this.options.onScrollMove.call(this,b)}}},_end:function(b){if(!(l&&b.touches.length!=0)){var a=this,c=l?b.changedTouches[0]:b,d,e,g={dist:0,time:0},i={dist:0,time:0},k=(b.timeStamp||Date.now())-a.startTime,j=a.x,m=a.y;a._unbind(q);a._unbind(r);a._unbind(s);a.options.onBeforeScrollEnd&&a.options.onBeforeScrollEnd.call(a,b);if(a.zoomed){j=a.scale*a.lastScale;j=
Math.max(a.options.zoomMin,j);j=Math.min(a.options.zoomMax,j);a.lastScale=j/a.scale;a.scale=j;a.x=a.originX-a.originX*a.lastScale+a.x;a.y=a.originY-a.originY*a.lastScale+a.y;a.scroller.style[f+"TransitionDuration"]="200ms";a.scroller.style[f+"Transform"]=n+a.x+"px,"+a.y+"px"+o+" scale("+a.scale+")";a.zoomed=false;a.refresh();a.options.onZoomEnd&&a.options.onZoomEnd.call(a,b)}else{if(a.moved){if(k<300&&a.options.momentum){g=j?a._momentum(j-a.startX,k,-a.x,a.scrollerW-a.wrapperW+a.x,a.options.bounce?
a.wrapperW:0):g;i=m?a._momentum(m-a.startY,k,-a.y,a.maxScrollY<0?a.scrollerH-a.wrapperH+a.y-a.minScrollY:0,a.options.bounce?a.wrapperH:0):i;j=a.x+g.dist;m=a.y+i.dist;if(a.x>0&&j>0||a.x<a.maxScrollX&&j<a.maxScrollX)g={dist:0,time:0};if(a.y>a.minScrollY&&m>a.minScrollY||a.y<a.maxScrollY&&m<a.maxScrollY)i={dist:0,time:0}}if(g.dist||i.dist){g=h.max(h.max(g.time,i.time),10);if(a.options.snap){i=j-a.absStartX;k=m-a.absStartY;if(h.abs(i)<a.options.snapThreshold&&h.abs(k)<a.options.snapThreshold)a.scrollTo(a.absStartX,
a.absStartY,200);else{i=a._snap(j,m);j=i.x;m=i.y;g=h.max(i.time,g)}}a.scrollTo(j>>0,m>>0,g)}else if(a.options.snap){i=j-a.absStartX;k=m-a.absStartY;if(h.abs(i)<a.options.snapThreshold&&h.abs(k)<a.options.snapThreshold)a.scrollTo(a.absStartX,a.absStartY,200);else{i=a._snap(a.x,a.y);if(i.x!=a.x||i.y!=a.y)a.scrollTo(i.x,i.y,i.time)}}else a._resetPos(200)}else{if(l)if(a.doubleTapTimer&&a.options.zoom){clearTimeout(a.doubleTapTimer);a.doubleTapTimer=null;a.options.onZoomStart&&a.options.onZoomStart.call(a,
b);a.zoom(a.pointX,a.pointY,a.scale==1?a.options.doubleTapZoom:1);a.options.onZoomEnd&&setTimeout(function(){a.options.onZoomEnd.call(a,b)},200)}else a.doubleTapTimer=setTimeout(function(){a.doubleTapTimer=null;for(d=c.target;d.nodeType!=1;)d=d.parentNode;if(d.tagName!="SELECT"&&d.tagName!="INPUT"&&d.tagName!="TEXTAREA"){e=document.createEvent("MouseEvents");e.initMouseEvent("click",true,true,b.view,1,c.screenX,c.screenY,c.clientX,c.clientY,b.ctrlKey,b.altKey,b.shiftKey,b.metaKey,0,null);e._fake=
true;d.dispatchEvent(e)}},a.options.zoom?250:0);a._resetPos(200)}a.options.onTouchEnd&&a.options.onTouchEnd.call(a,b)}}},_resetPos:function(b){var a=this.x>=0?0:this.x<this.maxScrollX?this.maxScrollX:this.x,c=this.y>=this.minScrollY||this.maxScrollY>0?this.minScrollY:this.y<this.maxScrollY?this.maxScrollY:this.y;if(a==this.x&&c==this.y){if(this.moved){this.moved=false;this.options.onScrollEnd&&this.options.onScrollEnd.call(this)}if(this.hScrollbar&&this.options.hideScrollbar){if(f=="webkit")this.hScrollbarWrapper.style[f+
"TransitionDelay"]="300ms";this.hScrollbarWrapper.style.opacity="0"}if(this.vScrollbar&&this.options.hideScrollbar){if(f=="webkit")this.vScrollbarWrapper.style[f+"TransitionDelay"]="300ms";this.vScrollbarWrapper.style.opacity="0"}}else this.scrollTo(a,c,b||0)},_wheel:function(b){var a=this,c,d;if("wheelDeltaX"in b){c=b.wheelDeltaX/12;d=b.wheelDeltaY/12}else c="detail"in b?d=-b.detail*3:d=-b.wheelDelta;if(a.options.wheelAction=="zoom"){d=a.scale*Math.pow(2,1/3*(d?d/Math.abs(d):0));if(d<a.options.zoomMin)d=
a.options.zoomMin;if(d>a.options.zoomMax)d=a.options.zoomMax;if(d!=a.scale){!a.wheelZoomCount&&a.options.onZoomStart&&a.options.onZoomStart.call(a,b);a.wheelZoomCount++;a.zoom(b.pageX,b.pageY,d,400);setTimeout(function(){a.wheelZoomCount--;!a.wheelZoomCount&&a.options.onZoomEnd&&a.options.onZoomEnd.call(a,b)},400)}}else{c=a.x+c;d=a.y+d;if(c>0)c=0;else if(c<a.maxScrollX)c=a.maxScrollX;if(d>a.minScrollY)d=a.minScrollY;else if(d<a.maxScrollY)d=a.maxScrollY;a.scrollTo(c,d,0)}},_mouseout:function(b){var a=
b.relatedTarget;if(a)for(;a=a.parentNode;)if(a==this.wrapper)return;this._end(b)},_transitionEnd:function(b){if(b.target==this.scroller){this._unbind("webkitTransitionEnd");this._startAni()}},_startAni:function(){var b=this,a=b.x,c=b.y,d=Date.now(),e,g,i;if(!b.animating)if(b.steps.length){e=b.steps.shift();if(e.x==a&&e.y==c)e.time=0;b.animating=true;b.moved=true;if(b.options.useTransition){b._transitionTime(e.time);b._pos(e.x,e.y);b.animating=false;e.time?b._bind("webkitTransitionEnd"):b._resetPos(0)}else{i=
function(){var k=Date.now();if(k>=d+e.time){b._pos(e.x,e.y);b.animating=false;b.options.onAnimationEnd&&b.options.onAnimationEnd.call(b);b._startAni()}else{k=(k-d)/e.time-1;g=h.sqrt(1-k*k);k=(e.x-a)*g+a;b._pos(k,(e.y-c)*g+c);if(b.animating)b.aniTime=D(i)}};i()}}else b._resetPos(400)},_transitionTime:function(b){b+="ms";this.scroller.style[f+"TransitionDuration"]=b;if(this.hScrollbar)this.hScrollbarIndicator.style[f+"TransitionDuration"]=b;if(this.vScrollbar)this.vScrollbarIndicator.style[f+"TransitionDuration"]=
b},_momentum:function(b,a,c,d,e){a=h.abs(b)/a;var g=a*a/0.0012,i=0;i=0;if(b>0&&g>c){c+=e/(6/(g/a*6.0E-4));a=a*c/g;g=c}else if(b<0&&g>d){d+=e/(6/(g/a*6.0E-4));a=a*d/g;g=d}g*=b<0?-1:1;return{dist:g,time:a/6.0E-4>>0}},_offset:function(b){for(var a=-b.offsetLeft,c=-b.offsetTop;b=b.offsetParent;){a-=b.offsetLeft;c-=b.offsetTop}if(b!=this.wrapper){a*=this.scale;c*=this.scale}return{left:a,top:c}},_snap:function(b,a){var c,d,e;e=this.pagesX.length-1;c=0;for(d=this.pagesX.length;c<d;c++)if(b>=this.pagesX[c]){e=
c;break}e==this.currPageX&&e>0&&this.dirX<0&&e--;b=this.pagesX[e];d=(d=h.abs(b-this.pagesX[this.currPageX]))?h.abs(this.x-b)/d*500:0;this.currPageX=e;e=this.pagesY.length-1;for(c=0;c<e;c++)if(a>=this.pagesY[c]){e=c;break}e==this.currPageY&&e>0&&this.dirY<0&&e--;a=this.pagesY[e];c=(c=h.abs(a-this.pagesY[this.currPageY]))?h.abs(this.y-a)/c*500:0;this.currPageY=e;e=h.max(d,c)>>0;return{x:b,y:a,time:e||200}},_bind:function(b,a,c){(a||this.scroller).addEventListener(b,this,!!c)},_unbind:function(b,a,c){(a||
this.scroller).removeEventListener(b,this,!!c)},destroy:function(){this.scroller.style[f+"Transform"]="";this.vScrollbar=this.hScrollbar=false;this._scrollbar("h");this._scrollbar("v");this._unbind(w,window);this._unbind(x);this._unbind(q);this._unbind(r);this._unbind(s);if(this.options.hasTouch){this._unbind("mouseout",this.wrapper);this._unbind(y)}this.options.useTransition&&this._unbind("webkitTransitionEnd");this.options.checkDOMChanges&&clearInterval(this.checkDOMTime);this.options.onDestroy&&
this.options.onDestroy.call(this)},refresh:function(){var b,a,c,d=0;a=0;if(this.scale<this.options.zoomMin)this.scale=this.options.zoomMin;this.wrapperW=this.wrapper.clientWidth||1;this.wrapperH=this.wrapper.clientHeight||1;this.minScrollY=-this.options.topOffset||0;this.scrollerW=this.scroller.offsetWidth*this.scale>>0;this.scrollerH=(this.scroller.offsetHeight+this.minScrollY)*this.scale>>0;this.maxScrollX=this.wrapperW-this.scrollerW;this.maxScrollY=this.wrapperH-this.scrollerH+this.minScrollY;
this.dirY=this.dirX=0;this.options.onRefresh&&this.options.onRefresh.call(this);this.hScroll=this.options.hScroll&&this.maxScrollX<0;this.vScroll=this.options.vScroll&&(!this.options.bounceLock&&!this.hScroll||this.scrollerH>this.wrapperH);this.hScrollbar=this.hScroll&&this.options.hScrollbar;this.vScrollbar=this.vScroll&&this.options.vScrollbar&&this.scrollerH>this.wrapperH;b=this._offset(this.wrapper);this.wrapperOffsetLeft=-b.left;this.wrapperOffsetTop=-b.top;if(typeof this.options.snap=="string"){this.pagesX=
[];this.pagesY=[];c=this.scroller.querySelectorAll(this.options.snap);b=0;for(a=c.length;b<a;b++){d=this._offset(c[b]);d.left+=this.wrapperOffsetLeft;d.top+=this.wrapperOffsetTop;this.pagesX[b]=d.left<this.maxScrollX?this.maxScrollX:d.left*this.scale;this.pagesY[b]=d.top<this.maxScrollY?this.maxScrollY:d.top*this.scale}}else if(this.options.snap){for(this.pagesX=[];d>=this.maxScrollX;){this.pagesX[a]=d;d-=this.wrapperW;a++}if(this.maxScrollX%this.wrapperW)this.pagesX[this.pagesX.length]=this.maxScrollX-
this.pagesX[this.pagesX.length-1]+this.pagesX[this.pagesX.length-1];a=d=0;for(this.pagesY=[];d>=this.maxScrollY;){this.pagesY[a]=d;d-=this.wrapperH;a++}if(this.maxScrollY%this.wrapperH)this.pagesY[this.pagesY.length]=this.maxScrollY-this.pagesY[this.pagesY.length-1]+this.pagesY[this.pagesY.length-1]}this._scrollbar("h");this._scrollbar("v");if(!this.zoomed){this.scroller.style[f+"TransitionDuration"]="0";this._resetPos(200)}},scrollTo:function(b,a,c,d){var e=b;this.stop();e.length||(e=[{x:b,y:a,time:c,
relative:d}]);b=0;for(a=e.length;b<a;b++){if(e[b].relative){e[b].x=this.x-e[b].x;e[b].y=this.y-e[b].y}this.steps.push({x:e[b].x,y:e[b].y,time:e[b].time||0})}this._startAni()},scrollToElement:function(b,a){var c;if(b=b.nodeType?b:this.scroller.querySelector(b)){c=this._offset(b);c.left+=this.wrapperOffsetLeft;c.top+=this.wrapperOffsetTop;c.left=c.left>0?0:c.left<this.maxScrollX?this.maxScrollX:c.left;c.top=c.top>this.minScrollY?this.minScrollY:c.top<this.maxScrollY?this.maxScrollY:c.top;a=a===undefined?
h.max(h.abs(c.left)*2,h.abs(c.top)*2):a;this.scrollTo(c.left,c.top,a)}},scrollToPage:function(b,a,c){this.options.onScrollStart&&this.options.onScrollStart.call(this);if(this.options.snap){b=b=="next"?this.currPageX+1:b=="prev"?this.currPageX-1:b;a=a=="next"?this.currPageY+1:a=="prev"?this.currPageY-1:a;b=b<0?0:b>this.pagesX.length-1?this.pagesX.length-1:b;a=a<0?0:a>this.pagesY.length-1?this.pagesY.length-1:a;this.currPageX=b;this.currPageY=a;b=this.pagesX[b];a=this.pagesY[a]}else{b*=-this.wrapperW;
a*=-this.wrapperH;if(b<this.maxScrollX)b=this.maxScrollX;if(a<this.maxScrollY)a=this.maxScrollY}this.scrollTo(b,a,c||400)},disable:function(){this.stop();this._resetPos(0);this.enabled=false;this._unbind(q);this._unbind(r);this._unbind(s)},enable:function(){this.enabled=true},stop:function(){this.options.useTransition?this._unbind("webkitTransitionEnd"):A(this.aniTime);this.steps=[];this.animating=this.moved=false},zoom:function(b,a,c,d){var e=c/this.scale;if(this.options.useTransform){this.zoomed=
true;d=d===undefined?200:d;b=b-this.wrapperOffsetLeft-this.x;a=a-this.wrapperOffsetTop-this.y;this.x=b-b*e+this.x;this.y=a-a*e+this.y;this.scale=c;this.refresh();this.x=this.x>0?0:this.x<this.maxScrollX?this.maxScrollX:this.x;this.y=this.y>this.minScrollY?this.minScrollY:this.y<this.maxScrollY?this.maxScrollY:this.y;this.scroller.style[f+"TransitionDuration"]=d+"ms";this.scroller.style[f+"Transform"]=n+this.x+"px,"+this.y+"px"+o+" scale("+c+")";this.zoomed=false}},isReady:function(){return!this.moved&&
!this.zoomed&&!this.animating}};if(typeof exports!=="undefined")exports.iScroll=p;else window.iScroll=p})();
