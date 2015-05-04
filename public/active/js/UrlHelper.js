/**
 * 获取网页参数
 * Created by kiner on 2015/1/9.
 */
var hdpUrl = (function () {

    var isArray = function (obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }
    return {
        /**
         * 通过参数名获取网页参数
         * @param name
         * @returns {*}
         * @constructor
         */
        get: function GetQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        },
        /**
         * 设置网页参数
         * @param url   原始url地址
         * @param name  参数名
         * @param value 参数值
         * @returns {*}
         * @constructor
         */
        set: function SetQueryString(url, arrs, value) {

            //hdpUrl.set("index.html",{ aid : 1, aid2 : 2 })

            url += (url.indexOf("?") == -1 ? "?" : "&");
            if (value) {//如果提供了参数值，则说明用户值需要设置1个参数
                url += encodeURIComponent(arrs) + "=" + encodeURIComponent(value);
            } else {
                if (typeof arrs === "string") {//如果arrs的类型是字符串，则说明用户采用自己拼接的参数添加到url的方法
                    url += arrs;
                } else if (isArray(arrs)) {//如果arrs的类型是数组，则说明用户需要设置多个参数，且数组结构如:[ {"name":"参数名1" , "value" : "参数值1"},{"name":"参数名2" , "value" : "参数值2"} ]
                    var count = 0;
                    for (var i = 0; i < arrs.length; i++) {
                        count++;
                        url += encodeURIComponent(arrs[i].name) + "=" + encodeURIComponent(arrs[i].value);
                        if (count != arrs.length) {
                            url += (url.indexOf("?") == -1 ? "?" : "&");
                        }
                    }
                } else if (typeof arrs === "object") {//如果arrs的类型是对象，则说明用户需要设置多个参数，且对象结构如:{ "参数名1" : "参数值1", "参数名2" : "参数值2"  }
                    var count = 0, len = 0;
                    for (var a in arrs) {
                        len++;
                    }
                    for (var a in  arrs) {
                        count++;
                        url += encodeURIComponent(a) + "=" + encodeURIComponent(arrs[a]);

                        if (count != len) {
                            url += (url.indexOf("?") == -1 ? "?" : "&");
                        }

                    }
                }
            }
            return url;
        }
    }


})();



