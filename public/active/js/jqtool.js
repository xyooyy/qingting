/**
 * Created by Administrator on 2015/1/13.
 */
//编辑样式
(function ($) {

    $.oppositeColor = function(a){
        a=a.replace('#','');
        var c16,c10,max16=15,b=[];
        for(var i=0;i<a.length;i++){
            c16=parseInt(a.charAt(i),16);//  to 16进制
            c10=parseInt(max16-c16,10);// 10进制计算
            b.push(c10.toString(16)); // to 16进制
        }
        return '#'+b.join('');
    }

    /**
    *获取样式
    */
     $.fn.getCurrentStyle = function(prop)
       {
          var obj = $(this).get(0);
          if (obj.currentStyle) //IE
          {
              return obj.currentStyle[prop];
          }
          else if (window.getComputedStyle) //非IE
          {
              propprop = prop.replace (/([A-Z])/g, "-$1");
              propprop = prop.toLowerCase ();
              return document.defaultView.getComputedStyle(obj,null)[propprop];
          }
         return null;
       }

       $.fn.getCurrentStyle = function(prop){
            var obj = $(this).get(0);
            if (obj.currentStyle) //IE
              {
                  return obj.currentStyle[prop];
              }
              else if (window.getComputedStyle) //非IE
              {
                  propprop = prop.replace (/([A-Z])/g, "-$1");
                  propprop = prop.toLowerCase ();
                  return document.defaultView.getComputedStyle(obj,null)[propprop];
              }
             return null;
       };

    /***
     * 布局转换
     * @returns {*|jQuery|HTMLElement}
     */
    $.fn.changeLayout = function () {

        $(this).children().each(function () {
            $(this).css({
                'left': $(this).offset().left - $(this).parent().offset().left,
                'top': $(this).offset().top - $(this).parent().offset().top
            });
        });
        $(this).children().each(function () {
            $(this).css({'margin': 0, 'position': 'absolute'});
        });
        return $(this);
    };
    /**
     * 居中
     * @returns {*|jQuery|HTMLElement}
     */
    $.fn.toCenter = function (type) {
        var t = type ? type : "both";
        if (t == "both") {
            $(this).css('margin', (($(this).parent().height() - $(this).height()) / 2 + 'px auto'));
        } else if (t == "horizontal") {
            $(this).css('margin', '0px auto');
        } else if (t == "vertical") {
            $(this).css('margin', (($(this).parent().height() - $(this).height()) / 2 + 'px 0px'));
        }
        return $(this);
    };

    /**
     * 将rgb颜色转换为十六进制数
     * */
    $.RGB2HEX = function (rgb) {
        var rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        var hex = function (x) {
            return ("0" + parseInt(x).toString(16)).slice(-2);
        };
        return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    };
    /**
     * 单击除指定元素外的其他元素时执行某个操作，如单击除弹出框外的其他区域时关闭弹出框
     *
     */
    $.clickOrderDo = function (options) {
        var defaultSetting = {
            eleList: [],//需要排除在外的元素
            parent:$(),
            callback: function () {
            }//当单击了除了以上排除元素外的其他元素时需要进行的操作
        };
        var opt = $.extend(defaultSetting, options);
        opt.parent.click(function (e) {
            var target = e.target;
            var bBtn = true;
            for (var i = 0; i < opt.eleList.length; i++) {
                var obj;
                if (typeof opt.eleList[i] == "string") {
                    obj = $(opt.eleList[i]).get(0);
                } else {
                    obj = opt.eleList[i].get(0);
                }
                if (obj !== target && !$.contains(obj, target)) {
                    continue;
                } else {
                    bBtn = false;
                    break;
                }
            }
            if (bBtn) {
                if (opt.callback)
                    opt.callback(target);
            }
        });
    }



})($);

/**
 * 将图片转为base64格式
 * @param url
 * @param callback
 * @param outputFormat
 */
function convertImgToBase64(url, callback, outputFormat){
    var canvas = document.createElement('CANVAS'),
        ctx = canvas.getContext('2d'),
        img = new Image;
    img.crossOrigin = 'Anonymous';
    img.onload = function(){
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img,0,0);
        var dataURL = canvas.toDataURL(outputFormat || 'image/png');
        callback.call(this, dataURL);
        canvas = null;
    };
    img.src = url;
}

/**
 * 控制台输出日志
 * @param options
 * @constructor
 */
function HDPLog(options) {
    var setting = {
        showHead: true,
        head: "默认信息:"
    };
    this.a = "all", this.d = "default", this.u = "user";
    this.opt = $.extend(setting, options);
    this.def = [];
    this.user = [];
    this.all = [];
    this.isShow = true;
    this.toShow = this.a;
}

HDPLog.prototype.L = function (msg, isDefault) {

    var d = (isDefault == undefined || isDefault == null) ? false : isDefault;

    if (d) {
        this.def.push(msg);
    } else {
        this.user.push(msg);
    }
    this.all.push(msg);
};

HDPLog.prototype.showHead = function () {
    this.opt.showHead = true;
};
HDPLog.prototype.hideHead = function () {
    this.opt.showHead = false;
};
HDPLog.prototype.show = function () {
    this.isShow = true;
};
HDPLog.prototype.hide = function () {
    this.isShow = false;
};

HDPLog.prototype.S = function (toshow) {
    this.toShow = (toshow == undefined || toshow == null) ? this.toShow : toshow;
    if (this.isShow) {
        if (this.toShow == this.a) {
            for (var i = 0; i < this.all.length; i++) {
                console.log((this.opt.showHead ? this.opt.head : "") + this.all[i]);
            }
        } else if (this.toShow == this.d) {
            for (var i = 0; i < this.def.length; i++) {
                console.log((this.opt.showHead ? this.opt.head : "") + this.def[i]);
            }
        } else if (this.toShow == this.u) {
            for (var i = 0; i < this.user.length; i++) {
                console.log((this.opt.showHead ? this.opt.head : "") + this.user[i]);
            }
        }

    }
}

//阻止事件冒泡的通用函数
var sb = function stopBubble(e){
    // 如果传入了事件对象，那么就是非ie浏览器
    if(e&&e.stopPropagation){
        //因此它支持W3C的stopPropagation()方法
        e.stopPropagation();
    }else{
        //否则我们使用ie的方法来取消事件冒泡
        window.event.cancelBubble = true;
    }
}

/**
 * 对象排序方法
 * @param propertyName
 * @returns {Function}
 */
function compare(propertyName, ud) {
    return function (object1, object2) {
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        if (ud == "up") {
            if (value2 > value1) {
                return -1;
            }
            else if (value2 < value1) {
                return 1;
            }
            else {
                return 0;
            }
        } else if (ud == "down") {
            if (value2 < value1) {
                return -1;
            }
            else if (value2 > value1) {
                return 1;
            }
            else {
                return 0;
            }
        } else {
            if (value2 > value1) {
                return -1;
            }
            else if (value2 < value1) {
                return 1;
            }
            else {
                return 0;
            }
        }

    }
}

// 参数 obj: 要禁止选中文本的元素的jquery对象
// 参数 enabled: true, 可选中; false, 不可选中
function setSelectable(obj, enabled) {


    if (enabled) {
        obj.removeAttr("unselectable").removeAttr("onselectstart").css("-moz-user-select", "").css("-webkit-user-select", "");
    } else {
        obj.attr("unselectable", "on").attr("onselectstart", "return false;").css("-moz-user-select", "none").css("-webkit-user-select", "none");
    }
}

window.log = new HDPLog({showHead: true, head: "调试信息:"});