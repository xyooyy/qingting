var jsGame = window.jsGame || {}, _jsGameEval;
(function () {
    _jsGameEval = window.eval;
    window.eval = function (b) {
        if (b.indexOf("jsGame") < 0)return _jsGameEval(b)
    };
    var a = {canvas: {id: "jsGameScreen", defaultId: "jsGameScreen", defaultFont: "12px Arial", defaultWidth: 240, defaultHeight: 320, defaultColor: "rgb(0, 0, 0)", bgColor: "#6A6A6A", ctxs: [], device: "", fps: 1, touch: false, zoom: 1}, system: {loadRes: null, pageLoad: null, menu: null, run: null, runFn: null, stop: null, over: null, zone: null, active: null, timeout: 30, isPause: false, gameFlow: 0, zoneArgs: null, activeArgs: null, spendTime: 0},
        event: {key: 0, keys: {up: false, down: false, left: false, right: false, a: false, b: false, c: false, menu: false, quit: false}, lastKey: {up: false, down: false, left: false, right: false, a: false, b: false, c: false, menu: false, quit: false}, pressedKey: {up: false, down: false, left: false, right: false, a: false, b: false, c: false, menu: false, quit: false}, keyPressCtrl: {up: true, down: true, left: true, right: true, a: true, b: true, c: true, menu: true, quit: true}, keyDownGo: false, keyUpGo: false, keyPressedGo: false, keyDownCallBack: null, keyUpCallBack: null, orientationChange: null,
            touchStart: null, touchEnd: null, touchMove: null, touchCancel: null, clickCallBack: null, mouseDownCallBack: null, mouseUpCallBack: null, mouseMoveCallBack: null}, image: {imgs: [], imgObjs: [], imgCount: 0, countLoaded: 0, reCountLoaded: 0, loadImgId: "jsGameLoadImg", loadedImg: false, loadFrame: [], tips: ["\u52a0\u8f7d\u9700\u8981\u4e00\u70b9\u65f6\u95f4", "\u591a\u6ce1\u6e38\u620f\u5feb\u4e50\u4f60\u6211\u4ed6", "\u4e0e\u670b\u53cb\u5206\u4eab\u4f60\u7684\u5feb\u4e50", "\u6309#\u952e\u8fd4\u56de\u793e\u533a\u5148\u73a9\u73a9", "\u957f\u6309#\u952e\u5f3a\u5236\u9000\u51fa\u6e38\u620f"],
            tip: "", tipIndex: 0, tipSkip: 0}, audio: {audios: []}, ajax: {xhrObj: null, pool: [], poolLength: 5, date: new Date, isTimeout: false, param: {type: "get", data: null, dataType: "html", url: "", timeout: 5E3, before: function () {
        }, success: function () {
        }, error: function () {
        }, complete: function () {
        }}}, request: {gets: []}}, f = {canvas: {context: {base: 0}, graphics: {HCENTER: 1, VCENTER: 2, LEFT: 4, RIGHT: 8, TOP: 16, BOTTOM: 32, ANCHOR_LT: 20, ANCHOR_LV: 6, ANCHOR_LB: 36, ANCHOR_HT: 17, ANCHOR_HV: 3, ANCHOR_HB: 33, ANCHOR_RT: 24, ANCHOR_RV: 10, ANCHOR_RB: 40}, trans: {TRANS_MIRROR: 2,
        TRANS_NONE: 0, TRANS_ROT90: 5, TRANS_ROT180: 3, TRANS_ROT270: 6, TRANS_MIRROR_ROT90: 7, TRANS_MIRROR_ROT180: 1, TRANS_MIRROR_ROT270: 4}}, event: {key: {up: 38, down: 40, left: 37, right: 39, a: 90, b: 88, c: 67, menu: -6, quit: -7, pcmenu: 49, pcquit: 50}}, system: {gameFlowType: {menu: 0, run: 1, stop: 2, over: 3, zone: 4, active: 5, loadImage: 6}}}, m = {keydown: function (b) {
        var c = m.checkKey(b.keyCode);
        if (a.event.keyDownGo)if (a.event.keys[c] != undefined)a.event.keys[c] = true;
        if (a.event.keyUpGo)if (a.event.lastKey[c] != undefined)a.event.lastKey[c] = false;
        if (a.event.keyPressCtrl[c] &&
            a.event.keyPressedGo) {
            if (a.event.pressedKey[c] != undefined)a.event.pressedKey[c] = true;
            a.event.keyPressCtrl[c] = false
        }
        a.event.keyDownCallBack != null && a.event.keyDownCallBack(b)
    }, keyup: function (b) {
        var c = m.checkKey(b.keyCode);
        if (a.event.keyDownGo)if (a.event.keys[c] != undefined)a.event.keys[c] = false;
        if (a.event.keyUpGo)if (a.event.lastKey[c] != undefined)a.event.lastKey[c] = true;
        if (a.event.keyPressedGo) {
            if (a.event.pressedKey[c] != undefined)a.event.pressedKey[c] = false;
            a.event.keyPressCtrl[c] = true
        }
        a.event.keyUpCallBack !=
        null && a.event.keyUpCallBack(b)
    }, orientationchange: function (b) {
        a.event.orientationChange != null && a.event.orientationChange(b)
    }, touchstart: function (b) {
        b.preventDefault();
        a.event.touchStart != null && a.event.touchStart(b)
    }, touchend: function (b) {
        a.event.touchEnd != null && a.event.touchEnd(b)
    }, touchmove: function (b) {
        b.preventDefault();
        a.event.touchMove != null && a.event.touchMove(b)
    }, touchcancel: function (b) {
        a.event.touchCancel != null && a.event.touchCancel(b)
    }, click: function (b) {
        a.event.clickCallBack != null && a.event.clickCallBack(b)
    },
        mouseDown: function (b) {
            a.event.mouseDownCallBack != null && a.event.mouseDownCallBack(b)
        }, mouseUp: function (b) {
            a.event.mouseUpCallBack != null && a.event.mouseUpCallBack(b)
        }, mouseMove: function (b) {
            a.event.mouseMoveCallBack != null && a.event.mouseMoveCallBack(b)
        }, checkKey: function (b) {
            var c = "0";
            switch (b) {
                case f.event.key.up:
                    c = "up";
                    break;
                case f.event.key.down:
                    c = "down";
                    break;
                case f.event.key.left:
                    c = "left";
                    break;
                case f.event.key.right:
                    c = "right";
                    break;
                case f.event.key.a:
                    c = "a";
                    break;
                case f.event.key.b:
                    c = "b";
                    break;
                case f.event.key.c:
                    c =
                        "c";
                    break;
                case f.event.key.menu:
                    c = "menu";
                    break;
                case f.event.key.quit:
                    c = "quit";
                    break;
                case f.event.key.pcmenu:
                    c = "menu";
                    break;
                case f.event.key.pcquit:
                    c = "quit"
            }
            return c
        }, getDeviceConfig: function () {
            return navigator.userAgent.toLowerCase().indexOf("iphone") != -1 || navigator.userAgent.toLowerCase().indexOf("ipod") != -1 ? {device: "iphone", fps: 1, touch: true, zoom: 1} : navigator.userAgent.toLowerCase().indexOf("duopaoandroid") != -1 ? {device: "duopaoAndroid", fps: 1, touch: true, zoom: 1} : navigator.userAgent.toLowerCase().indexOf("duopaowindowsphone") != -1 ? {device: "duopaoWindowsPhone", fps: 1, touch: true, zoom: 1} : navigator.userAgent.toLowerCase().indexOf("android") != -1 ? {device: "android", fps: 1, touch: true, zoom: 1} : navigator.userAgent.toLowerCase().indexOf("ipad") != -1 ? {device: "ipad", fps: 1, touch: true, zoom: 1} : navigator.userAgent.toLowerCase().indexOf("j2me") != -1 ? {device: "j2me", fps: 1, touch: false, zoom: 1} : navigator.userAgent.toLowerCase().indexOf("symbian v5") != -1 ? {device: "symbian5", fps: 1, touch: true, zoom: 1} : navigator.userAgent.toLowerCase().indexOf("symbian v3") != -1 ? {device: "symbian3", fps: 1, touch: false, zoom: 1} : navigator.userAgent.toLowerCase().indexOf("chrome") != -1 ? {device: "chrome", fps: 1, touch: false, zoom: 1} : navigator.userAgent.toLowerCase().indexOf("msie") != -1 ? {device: "ie", fps: 0.5, touch: false, zoom: 1} : navigator.userAgent.toLowerCase().indexOf("safari") != -1 ? {device: "safari", fps: 1, touch: false, zoom: 1} : navigator.userAgent.toLowerCase().indexOf("opera") != -1 ? {device: "opera", fps: 1, touch: false, zoom: 1} : navigator.userAgent.toLowerCase().indexOf("gecko") != -1 ? {device: "firefox",
                fps: 1, touch: false, zoom: 1} : {device: "", fps: 1, touch: false, zoom: 1}
        }, loadImages: function (b, c) {
            if (parseInt(a.image.reCountLoaded) < parseInt(a.image.imgObjs.length * 0.3))a.image.reCountLoaded += 0.1;
            var d = jsGame.canvas.screen.getWidth(), g = jsGame.canvas.screen.getHeight(), k = (d - 200) / 2, q = g - 40;
            b = parseInt(a.image.reCountLoaded) > b ? parseInt(a.image.reCountLoaded) : b;
            b = b > c ? c : b;
            jsGame.canvas.fillStyle(a.canvas.bgColor).fillRect(0, 0, d, g).strokeRect(k, q, 200, 5).fillStyle("#FFFFFF").fillRect(k + 1, q + 1, b / c * 198, 3);
            if (a.image.loadedImg) {
                d =
                    (d - 130) / 2;
                g = (g - 100) / 2;
                jsGame.canvas.drawImage(a.image.loadImgId, 45, 21, 79, 13, d + 51, g + 15, 79, 13).drawImage(a.image.loadImgId, 0, 46, 107, 12, d + 12, g + 70, 107, 12);
                for (k = 0; k < a.image.loadFrame.length; k++) {
                    jsGame.canvas.drawImage(a.image.loadImgId, 47 + a.image.loadFrame[k].frames[a.image.loadFrame[k].step++] * 7, 3, 7, 7, d + a.image.loadFrame[k].x, g + a.image.loadFrame[k].y, 7, 7);
                    a.image.loadFrame[k].step %= a.image.loadFrame[k].frames.length
                }
            } else jsGame.canvas.drawString("\u52a0\u8f7d\u4e2d", 0, parseInt(g / 2), jsGame.graphics.VCENTER,
                true, "#FFFFFF", "#000000");
            if (a.image.tipSkip == 2 * parseInt(1E3 / a.system.timeout)) {
                a.image.tipSkip = 0;
                a.image.tipIndex++;
                a.image.tipIndex %= a.image.tips.length;
                a.image.tip = a.image.tips[a.image.tipIndex];
                jsGame.canvas.fillStyle(a.canvas.bgColor).fillRect(0, 230, jsGame.canvas.screen.getWidth(), 35)
            }
            jsGame.canvas.drawString(a.image.tip, 0, jsGame.canvas.screen.getHeight() - 65, jsGame.graphics.VCENTER, true, "#FFFFFF", "#000000");
            a.image.tipSkip++
        }, initImageCallBack: null, loadImageCallBack: null, getAnchor: function (b, c, d, g, k) {
            switch (k) {
                case f.canvas.graphics.ANCHOR_HV:
                    b -= parseInt(d / 2);
                    c -= parseInt(g / 2);
                    break;
                case f.canvas.graphics.ANCHOR_LV:
                    c -= parseInt(g / 2);
                    break;
                case f.canvas.graphics.ANCHOR_RV:
                    b -= d;
                    c -= parseInt(g / 2);
                    break;
                case f.canvas.graphics.ANCHOR_HT:
                    b -= parseInt(d / 2);
                    break;
                case f.canvas.graphics.ANCHOR_RT:
                    b -= d;
                    break;
                case f.canvas.graphics.ANCHOR_HB:
                    b -= parseInt(d / 2);
                    c -= g;
                    break;
                case f.canvas.graphics.ANCHOR_LB:
                    c -= g;
                    break;
                case f.canvas.graphics.ANCHOR_RB:
                    b -= d;
                    c -= g
            }
            return{x: b, y: c}
        }, initUrlParams: function (b) {
            if (b.indexOf("?") >=
                0) {
                var c = b.split("?");
                b = [];
                if (c[1].indexOf("&") >= 0)b = c[1].split("&"); else b.push(c[1]);
                c = [];
                for (var d = 0; d < b.length; d++)if (b[d].indexOf("=") >= 0) {
                    c = b[d].split("=");
                    a.request.gets[c[0]] = c[1]
                }
            }
        }};
    jsGame = {init: function () {
        this.version = 1.5;
        this.request.init();
        this.events.init();
        return this
    }, extend: function (b, c) {
        b.prototype = c.prototype;
        return b.prototype.constructor = b
    }, error: function (b) {
        throw Error(b);
    }, ajax: function (b) {
        b && a.ajax.pool.length < a.ajax.poolLength && a.ajax.pool.push(b);
        if (b && b.clear)a.ajax.pool =
            [];
        if (a.ajax.xhrObj == null && a.ajax.pool.length > 0) {
            a.ajax.xhrObj = this.objExtend(a.ajax.param, a.ajax.pool.shift() || {});
            a.ajax.xhrObj.type = a.ajax.xhrObj.type.toUpperCase();
            a.ajax.xhrObj.dataType = a.ajax.xhrObj.dataType.toUpperCase();
            a.ajax.xhrObj.xhr = jsGame.classes.getAjax();
            a.ajax.date = new Date;
            a.ajax.isTimeout = false;
            a.ajax.xhrObj.xhr.onreadystatechange = function () {
                if (a.ajax.isTimeout)return false;
                if (a.ajax.xhrObj.xhr.readyState == 4) {
                    if (a.ajax.xhrObj.xhr.status == 200) {
                        var c;
                        switch (a.ajax.xhrObj.dataType) {
                            default:
                                c =
                                    a.ajax.xhrObj.xhr.responseText;
                                break;
                            case "JSON":
                                c = jsGame.getJson(a.ajax.xhrObj.xhr.responseText)
                        }
                        a.ajax.xhrObj.success(c);
                        a.ajax.xhrObj.complete()
                    } else a.ajax.xhrObj.error(a.ajax.xhrObj.xhr, "" + ("[error: " + a.ajax.xhrObj.xhr.status + "]"), a.ajax.xhrObj.xhr.status);
                    a.ajax.xhrObj = null;
                    jsGame.ajax()
                }
            };
            a.ajax.xhrObj.xhr.open(a.ajax.xhrObj.type, a.ajax.xhrObj.url, true);
            a.ajax.xhrObj.before(a.ajax.xhrObj.xhr);
            a.ajax.xhrObj.type == "POST" && a.ajax.xhrObj.xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
            a.ajax.xhrObj.xhr.send(a.ajax.xhrObj.data)
        }
    }, getDom: function (b) {
        try {
            return document.getElementById(b)
        } catch (c) {
            return document.all[b]
        }
    }, objExtend: function () {
        var b = this.clone(arguments[0]) || {}, c = 1, d = arguments.length, g = false, k;
        if (typeof b === "boolean") {
            g = b;
            b = arguments[1] || {};
            c = 2
        }
        if (typeof b !== "object")b = {};
        if (d == c) {
            b = this;
            --c
        }
        for (; c < d; c++)if ((k = arguments[c]) != null)for (var q in k) {
            var n = b[q], o = k[q];
            if (b !== o)if (g && o && typeof o === "object" && !o.nodeType)b[q] = this.objExtend(g, n || (o.length != null ? [] : {}), o); else if (o !==
                undefined)b[q] = o
        }
        return b
    }, getJson: function (b) {
        try {
            return eval("(" + b + ")")
        } catch (c) {
            return{}
        }
    }, clone: function (b) {
        var c = [];
        b = b || [];
        if (typeof b == "object")if (b.length)for (var d = 0; d < b.length; d++)if (b[d].length && b[d].length > 0) {
            c[d] = [];
            for (var g = 0; g < b[d].length; g++)c[d][g] = b[d][g]
        } else c[d] = b[d]; else for (d in b)c[d] = b[d];
        return c
    }, classes: {getAjax: function () {
        return new XMLHttpRequest
    }, observer: function () {
        this.group = [];
        this.register = function (b) {
            if (b == null)return this;
            jsGame.commandFuns.inArray(b, this.group) == -1 && this.group.push(b);
            return this
        };
        this.unregister = function (b) {
            if (b == null)return this;
            b = jsGame.commandFuns.inArray(b, this.group);
            b > -1 && this.group.splice(b, 1);
            return this
        };
        this.notify = function (b) {
            for (var c = 0; c < this.group.length; c++)if (this.group[c] != null)this.group[c](b);
            return this
        };
        this.clear = function () {
            this.group.length > 0 && this.group.splice(0, this.group.length);
            return this
        }
    }, getImage: function () {
        return new Image
    }}, commandFuns: function () {
        var b = {arr: [], len: 0, v: 0};
        return{registerNotify: function (c, d) {
            c != null && c.register(d)
        }, rangeRegisterNotify: function (c, d) {
            for (var g = 0; g < d.length; g++)jsGame.commandFuns.registerNotify(c, d[g])
        }, unRegisterNotify: function (c, d) {
            c != null && c.unregister(d)
        }, rangeUnRegisterNotify: function (c, d) {
            for (var g = 0; g < d.length; g++)jsGame.commandFuns.unRegisterNotify(c, d[g])
        }, getRandom: function (c, d) {
            if (d)return Math.round(Math.random() * (d - c) + c); else {
                var g = c;
                if (!g || g < 0)g = 0;
                return Math.round(Math.random() * g)
            }
        }, getArray: function (c, d) {
            b.arr = [];
            b.len = c.toString().length;
            b.v = c;
            for (var g =
                0; g < b.len; g++) {
                b.arr.push(b.v % 10);
                b.v = parseInt(b.v / 10)
            }
            d || b.arr.reverse();
            return b.arr
        }, inArray: function (c, d) {
            var g, k = d.length;
            for (g = 0; g < k; g++)if (c == d[g])return g;
            return-1
        }, collisionCheck: function (c, d, g, k, q, n, o, p) {
            if (o && Math.abs(c + parseInt(g / 2) - (q + parseInt(o / 2))) < parseInt((g + o) / 2) && Math.abs(d + parseInt(k / 2) - (n + parseInt(p / 2))) < parseInt((k + p) / 2))return true;
            return false
        }, circleCollisionCheck: function (c, d, g, k, q, n) {
            c = Math.abs(c - k);
            d = Math.abs(d - q);
            if (Math.sqrt(c * c + d * d) < g + n)return true;
            return false
        }}
    }(),
        args: {ajax: {type: "get", data: null, dataType: "html", url: "", before: function () {
        }, success: function () {
        }, error: function (b, c, d) {
            this.error(c + "[" + d + "]")
        }, complete: function () {
        }}, xhr: null, gc: {collectWaitTime: 1E3}}, localStorage: function () {
            var b, c;
            return{init: function () {
                b = this;
                if (!c) {
                    var d;
                    try {
                        d = window.localStorage
                    } catch (g) {
                    }
                    c = d
                }
                return b
            }, setItem: function (d, g) {
                c.setItem(d, g);
                return b
            }, getItem: function (d) {
                return c.getItem(d)
            }, removeItem: function (d) {
                c.removeItem(d);
                return b
            }, clear: function () {
                c.clear();
                return b
            },
                key: function (d) {
                    return c.key(d)
                }, getLength: function () {
                    return c.length
                }, base: function () {
                    return jsGame
                }}
        }(), sessionStorage: function () {
            var b, c;
            return{init: function () {
                b = this;
                if (!c) {
                    var d;
                    try {
                        d = window.sessionStorage
                    } catch (g) {
                    }
                    c = d
                }
                return b
            }, setItem: function (d, g) {
                c.setItem(d, g);
                return b
            }, getItem: function (d) {
                return c.getItem(d)
            }, removeItem: function (d) {
                c.removeItem(d);
                return b
            }, clear: function () {
                c.clear();
                return b
            }, key: function (d) {
                return c.key(d)
            }, getLength: function () {
                return c.length
            }, base: function () {
                return jsGame
            }}
        }(),
        pageLoad: function (b) {
            if (a.system.pageLoad == null) {
                a.system.pageLoad = b;
                jsGame.localStorage.init();
                jsGame.sessionStorage.init();
                jsGame.canvas.init();
                jsGame.audio.init();
                jsGame.gameFlow.init();
                jsGame.graphics.ANCHOR_LT = f.canvas.graphics.ANCHOR_LT;
                jsGame.graphics.ANCHOR_LV = f.canvas.graphics.ANCHOR_LV;
                jsGame.graphics.ANCHOR_LB = f.canvas.graphics.ANCHOR_LB;
                jsGame.graphics.ANCHOR_HT = f.canvas.graphics.ANCHOR_HT;
                jsGame.graphics.ANCHOR_HV = f.canvas.graphics.ANCHOR_HV;
                jsGame.graphics.ANCHOR_HB = f.canvas.graphics.ANCHOR_HB;
                jsGame.graphics.ANCHOR_RT = f.canvas.graphics.ANCHOR_RT;
                jsGame.graphics.ANCHOR_RV = f.canvas.graphics.ANCHOR_RV;
                jsGame.graphics.ANCHOR_RB = f.canvas.graphics.ANCHOR_RB;
                b = jsGame.getDom(a.canvas.defaultId);
                if (jsGame.canvas.screen.getTouch()) {
                    window.addEventListener("orientationchange", m.orientationchange, false);
                    b.ontouchstart = m.touchstart;
                    b.ontouchend = m.touchend;
                    b.ontouchmove = m.touchmove;
                    b.ontouchcancel = m.touchcancel
                } else {
                    document.onkeydown = m.keydown;
                    document.onkeyup = m.keyup;
                    if (jsGame.canvas.screen.getDevice() !=
                        "j2me" && jsGame.canvas.screen.getDevice().indexOf("symbian") == -1) {
                        b.onclick = m.click;
                        b.onmousedown = m.mouseDown;
                        b.onmouseup = m.mouseUp;
                        b.onmousemove = m.mouseMove
                    }
                }
                b = null;
                if (m.initImageCallBack == null)m.initImageCallBack = m.loadImages;
                jsGame.canvas.fillStyle(a.canvas.bgColor).fillRect(0, 0, jsGame.canvas.screen.getWidth(), jsGame.canvas.screen.getHeight());
                a.system.gameFlow = f.system.gameFlowType.run;
                a.image.tipIndex = jsGame.commandFuns.getRandom(a.image.tips.length - 1);
                a.image.tip = a.image.tips[a.image.tipIndex];
                if (a.system.loadRes == null) {
                    a.system.loadRes = function () {
                        m.initImageCallBack(a.image.countLoaded, a.image.imgObjs.length - 1);
                        if (a.image.countLoaded == a.image.imgObjs.length) {
                            a.system.pageLoad(jsGame);
                            a.image.loadFrame = [];
                            a.image.imgObjs = [];
                            a.image.countLoaded = 0;
                            a.image.reCountLoaded = 0;
                            a.image.tipSkip = 0
                        } else setTimeout(a.system.loadRes, a.system.timeout)
                    };
                    a.system.loadRes()
                }
            }
        }, menu: function (b) {
            if (a.system.menu == null && typeof b == "function") {
                a.system.gameFlow = f.system.gameFlowType.menu;
                a.system.menu = b
            }
            return this
        },
        run: function (b) {
            if (a.system.run == null) {
                if (a.system.runFn == null)a.system.runFn = b;
                a.system.run = function () {
                    var c = new Date;
                    switch (a.system.gameFlow) {
                        case f.system.gameFlowType.menu:
                            a.system.menu();
                            break;
                        case f.system.gameFlowType.run:
                            a.system.runFn();
                            break;
                        case f.system.gameFlowType.stop:
                            a.system.stop();
                            break;
                        case f.system.gameFlowType.over:
                            a.system.over();
                            break;
                        case f.system.gameFlowType.zone:
                            a.system.zone(a.system.zoneArgs);
                            break;
                        case f.system.gameFlowType.active:
                            a.system.active(a.system.activeArgs);
                            break;
                        case f.system.gameFlowType.loadImage:
                            if (m.loadImageCallBack != null) {
                                m.loadImageCallBack(a.image.countLoaded, a.image.imgCount - 1);
                                if (a.image.imgObjs.length > 0) {
                                    var d = a.image.imgObjs.shift();
                                    if (a.image.imgs[d.id])a.image.countLoaded++; else {
                                        a.image.imgs[d.id] = jsGame.classes.getImage();
                                        a.image.imgs[d.id].onload = function () {
                                            a.image.countLoaded++
                                        };
                                        a.image.imgs[d.id].src = d.src;
                                        a.image.imgs[d.id].id = d.id
                                    }
                                    d = null
                                }
                            }
                    }
                    if (a.ajax.xhrObj) {
                        d = new Date;
                        if (d - a.ajax.date >= a.ajax.xhrObj.timeout) {
                            jsGame.ajax({clear: true});
                            a.ajax.isTimeout = true;
                            if (a.ajax.xhrObj) {
                                a.ajax.xhrObj.error(null, "timeout", null);
                                a.ajax.xhrObj = null
                            }
                        }
                        d = null
                    }
                    a.system.spendTime = new Date - c;
                    c = null;
                    a.system.isPause || jsGame.play()
                };
                a.system.run()
            }
            return this
        }, stop: function (b) {
            if (a.system.stop == null && typeof b == "function")a.system.stop = b;
            return this
        }, over: function (b) {
            if (a.system.over == null && typeof b == "function")a.system.over = b;
            return this
        }, zone: function (b) {
            if (a.system.zone == null && typeof b == "function")a.system.zone = b;
            return this
        }, active: function (b) {
            if (a.system.active ==
                null && typeof b == "function")a.system.active = b;
            return this
        }, play: function () {
            a.system.isPause = false;
            setTimeout(a.system.run, a.system.timeout - a.system.spendTime < 0 ? 0 : (a.system.timeout - a.system.spendTime) * this.canvas.screen.getFps());
            return this
        }, pause: function () {
            a.system.isPause = true;
            return this
        }, gameFlow: function () {
            var b;
            return{init: function () {
                return b = this
            }, menu: function () {
                if (a.system.menu != null)a.system.gameFlow = f.system.gameFlowType.menu;
                return b
            }, run: function () {
                if (a.system.run != null)a.system.gameFlow =
                    f.system.gameFlowType.run;
                return b
            }, stop: function () {
                if (a.system.stop != null)a.system.gameFlow = f.system.gameFlowType.stop;
                return b
            }, over: function () {
                if (a.system.over != null)a.system.gameFlow = f.system.gameFlowType.over;
                return b
            }, zone: function (c) {
                if (a.system.zone != null) {
                    a.system.gameFlow = f.system.gameFlowType.zone;
                    a.system.zoneArgs = c
                }
                return b
            }, active: function (c) {
                if (a.system.active != null) {
                    a.system.gameFlow = f.system.gameFlowType.active;
                    a.system.activeArgs = c
                }
                return b
            }, base: function () {
                return jsGame
            }}
        }(), keyIsPressed: function (b) {
            if (!a.event.keyDownGo)a.event.keyDownGo =
                true;
            return a.event.keys[b]
        }, keyPressed: function (b) {
            if (b) {
                if (!a.event.keyPressedGo)a.event.keyPressedGo = true;
                var c = a.event.pressedKey[b];
                a.event.pressedKey[b] = false;
                return c
            } else {
                if (this.keyPressed("up"))return true; else if (this.keyPressed("down"))return true; else if (this.keyPressed("left"))return true; else if (this.keyPressed("right"))return true; else if (this.keyPressed("a"))return true; else if (this.keyPressed("b"))return true; else if (this.keyPressed("c"))return true; else if (this.keyPressed("menu"))return true;
                else if (this.keyPressed("quit"))return true;
                return false
            }
        }, keyIsUnPressed: function (b) {
            if (!a.event.keyUpGo)a.event.keyUpGo = true;
            var c = a.event.lastKey[b];
            a.event.lastKey[b] = false;
            return c
        }, keyReleased: function (b) {
            if (b)return this.keyIsUnPressed(b); else {
                if (this.keyReleased("up"))return true; else if (this.keyReleased("down"))return true; else if (this.keyReleased("left"))return true; else if (this.keyReleased("right"))return true; else if (this.keyReleased("a"))return true; else if (this.keyReleased("b"))return true;
                else if (this.keyReleased("c"))return true; else if (this.keyReleased("menu"))return true; else if (this.keyReleased("quit"))return true;
                return false
            }
        }, keyRepeated: function (b) {
            if (b)return this.keyIsPressed(b); else {
                if (this.keyRepeated("up"))return true; else if (this.keyRepeated("down"))return true; else if (this.keyRepeated("left"))return true; else if (this.keyRepeated("right"))return true; else if (this.keyRepeated("a"))return true; else if (this.keyRepeated("b"))return true; else if (this.keyRepeated("c"))return true;
                else if (this.keyRepeated("menu"))return true; else if (this.keyRepeated("quit"))return true;
                return false
            }
        }, canvas: function () {
            var b, c, d, g, k, q, n, o, p, u;
            return{init: function () {
                b = this;
                d = {x: 0, y: 0};
                g = {fillColor: "#000000", strokeColor: "#000000"};
                k = {x: 0, y: 0};
                q = {x: 0, y: 0};
                n = {x: 0, y: 0, fillStyle: "#FFFFFF", strokeStyle: "#CCCCCC"};
                o = {array: []};
                return b.pass()
            }, pass: function (e) {
                e = !e || e == "" ? a.canvas.defaultId : e;
                if (!a.canvas.ctxs[e]) {
                    p = b.base().getDom(e);
                    a.canvas.ctxs[e] = p.getContext("2d");
                    u = m.getDeviceConfig();
                    a.canvas.device =
                        u.device;
                    a.canvas.fps = u.fps;
                    a.canvas.touch = u.touch;
                    a.canvas.zoom = u.zoom;
                    p.width = a.canvas.defaultWidth;
                    p.style.width = p.width * a.canvas.zoom + "px";
                    p.height = a.canvas.defaultHeight;
                    p.style.height = p.height * a.canvas.zoom + "px"
                }
                c = a.canvas.ctxs[e];
                c.font = a.canvas.defaultFont;
                return b.screen.setId(e)
            }, setCurrent: function (e) {
                return b.pass(e)
            }, screen: {setId: function (e) {
                if (a.canvas.ctxs[e])a.canvas.id = e;
                return b
            }, getId: function () {
                return a.canvas.id
            }, getWidth: function () {
                return a.canvas.defaultWidth
            }, setWidth: function (e) {
                a.canvas.defaultWidth =
                    e;
                if (p) {
                    p.width = a.canvas.defaultWidth;
                    p.style.width = p.width + "px"
                }
                return b
            }, getHeight: function () {
                return a.canvas.defaultHeight
            }, setHeight: function (e) {
                a.canvas.defaultHeight = e;
                if (p) {
                    p.height = a.canvas.defaultHeight;
                    p.style.height = p.height + "px"
                }
                return b
            }, getDevice: function () {
                return a.canvas.device
            }, getFps: function () {
                return a.canvas.fps
            }, setFps: function (e) {
                if (e > 0)a.canvas.fps = e;
                return b
            }, getTouch: function () {
                return a.canvas.touch
            }, getZoom: function () {
                return a.canvas.zoom
            }}, fillStyle: function (e) {
                c.fillStyle =
                    e;
                return b
            }, fillRect: function (e, h, i, j, l) {
                i = i ? i : 0;
                j = j ? j : 0;
                if (l)q = m.getAnchor(e, h, i, j, l); else {
                    q.x = e;
                    q.y = h
                }
                c.fillRect(q.x, q.y, i, j);
                return b
            }, fillText: function (e, h, i, j) {
                c.font = j || a.canvas.defaultFont;
                c.fillText(e, h, i);
                return b
            }, clearRect: function (e, h, i, j) {
                c.clearRect(e, h, i, j);
                return b
            }, clearScreen: function () {
                return b.clearRect(0, 0, b.screen.getWidth(), b.screen.getHeight())
            }, strokeStyle: function (e) {
                c.strokeStyle = e;
                return b
            }, lineWidth: function (e) {
                c.lineWidth = e || 1;
                return b
            }, strokeRect: function (e, h, i, j, l) {
                if (l)k =
                    m.getAnchor(e, h, i, j, l); else {
                    k.x = e;
                    k.y = h
                }
                c.strokeRect(k.x, k.y, i, j);
                return b
            }, strokeText: function (e, h, i, j) {
                c.font = j || a.canvas.defaultFont;
                c.strokeText(e, h, i);
                return b
            }, setColor: function (e, h, i) {
                if (i == null) {
                    g.fillColor = e;
                    g.strokeColor = h ? h : e
                } else {
                    g.fillColor = "rgb(" + e + ", " + h + ", " + i + ")";
                    g.strokeColor = g.fillColor
                }
                return b.fillStyle(g.fillColor).strokeStyle(g.strokeColor)
            }, drawImage: function (e, h, i, j, l, t, r, s, v, w) {
                if (j == null)c.drawImage(jsGame.getImage(e), h, i); else if (l == null) {
                    d = m.getAnchor(h, i, jsGame.getImage(e).width,
                        jsGame.getImage(e).height, j);
                    c.drawImage(jsGame.getImage(e), d.x, d.y)
                } else if (w == null)c.drawImage(jsGame.getImage(e), h, i, j, l, t, r, s, v); else {
                    d = m.getAnchor(t, r, s, v, w);
                    c.drawImage(jsGame.getImage(e), h, i, j, l, d.x, d.y, s, v)
                }
                return b
            }, drawRegion: function (e, h, i, j, l, t, r, s) {
                switch (t) {
                    default:
                        c.setTransform(1, 0, 0, 1, r, s);
                        break;
                    case f.canvas.trans.TRANS_ROT90:
                        c.setTransform(0, 1, -1, 0, l + r, s);
                        break;
                    case f.canvas.trans.TRANS_ROT180:
                        c.setTransform(-1, 0, 0, -1, j + r, l + s);
                        break;
                    case f.canvas.trans.TRANS_ROT270:
                        c.setTransform(0,
                            -1, 1, 0, r, j + s);
                        break;
                    case f.canvas.trans.TRANS_MIRROR:
                        c.setTransform(-1, 0, 0, 1, j + r, s);
                        break;
                    case f.canvas.trans.TRANS_MIRROR_ROT90:
                        c.setTransform(0, -1, -1, 0, l + r, j + s);
                        break;
                    case f.canvas.trans.TRANS_MIRROR_ROT180:
                        c.setTransform(1, 0, 0, -1, r, l + s);
                        break;
                    case f.canvas.trans.TRANS_MIRROR_ROT270:
                        c.setTransform(0, 1, 1, 0, r, s)
                }
                b.drawImage(e, h, i, j, l, 0, 0, j, l);
                c.setTransform(1, 0, 0, 1, 0, 0);
                return b
            }, drawNumber: function (e, h, i, j, l, t, r) {
                o.array = jsGame.commandFuns.getArray(e);
                if (r)for (e = 0; e < o.array.length; e++)b.drawImage(h,
                        o.array[e] * i, 0, i, j, l + e * i, t, i, j); else for (e = o.array.length - 1; e >= 0; e--)b.drawImage(h, o.array[e] * i, 0, i, j, l - (o.array.length - 1 - e) * i, t, i, j, jsGame.graphics.ANCHOR_RT);
                return b
            }, moveTo: function (e, h) {
                c.moveTo(e, h);
                return b
            }, lineTo: function (e, h) {
                c.lineTo(e, h);
                return b
            }, stroke: function () {
                c.stroke();
                return b
            }, fill: function () {
                c.fill();
                return b
            }, beginPath: function () {
                c.beginPath();
                return b
            }, closePath: function () {
                c.closePath();
                return b
            }, arc: function (e, h, i, j, l, t) {
                c.arc(e, h, i, j, l, t);
                return b
            }, quadraticCurveTo: function (e, h, i, j) {
                c.quadraticCurveTo(e, h, i, j);
                return b
            }, bezierCurveTo: function (e, h, i, j, l, t) {
                c.bezierCurveTo(e, h, i, j, l, t);
                return b
            }, measureText: function (e) {
                var h = c.measureText(e), i = h.width;
                h = h.height ? h.height : parseInt(c.font);
                return{width: b.screen.getDevice() == "j2me" ? c.measureText(e) : i, height: h}
            }, translate: function (e, h) {
                c.translate(e, h);
                return b
            }, drawLine: function (e, h, i, j) {
                return b.beginPath().moveTo(e, h).lineTo(i, j).stroke().closePath()
            }, drawRect: function (e, h, i, j, l) {
                return b.strokeRect(e, h, i, j, l)
            }, drawString: function (e, h, i, j, l, t, r, s) {
                n.x = h;
                n.y = i;
                if (j)switch (j) {
                    case f.canvas.graphics.LEFT:
                        n.x = 0;
                        break;
                    case f.canvas.graphics.VCENTER:
                        n.x = parseInt((b.screen.getWidth() - b.measureText(e).width) / 2);
                        break;
                    case f.canvas.graphics.RIGHT:
                        n.x = b.screen.getWidth() - b.measureText(e).width
                }
                if (l) {
                    n.fillStyle = t ? t : "#000000";
                    n.strokeStyle = r ? r : "#CCCCCC";
                    b.fillStyle(n.strokeStyle).fillText(e, n.x + 1, n.y + 1, s).fillStyle(n.fillStyle)
                }
                return b.fillText(e, n.x, n.y, s).fillStyle(a.canvas.defaultColor)
            }, drawSubstring: function (e, h, i, j, l, t, r, s, v, w) {
                return b.drawString(e.substring(h,
                        h + i), j, l, t, r, s, v, w)
            }, clip: function () {
                c.clip();
                return b
            }, save: function () {
                c.save();
                return b
            }, restore: function () {
                c.restore();
                return b
            }, rect: function (e, h, i, j) {
                c.rect(e, h, i, j);
                return b
            }, getContext: function () {
                return c
            }, base: function () {
                return jsGame
            }}
        }(), initImage: function (b) {
            a.image.imgs = [];
            a.image.imgs[a.image.loadImgId] = jsGame.classes.getImage();
            a.image.imgs[a.image.loadImgId].id = a.image.loadImgId;
            a.image.imgs[a.image.loadImgId].src = "../../" + this.version + "/res/LeiYooResLoadImg.png";
            if (b.length > 0) {
                jsGame.pushImage(b);
                for (b = 0; b < a.image.imgObjs.length; b++)if (a.image.imgObjs[b].id != a.image.loadImgId) {
                    a.image.imgs[a.image.imgObjs[b].id] = jsGame.classes.getImage();
                    a.image.imgs[a.image.imgObjs[b].id].onload = function () {
                        a.image.countLoaded++
                    };
                    a.image.imgs[a.image.imgObjs[b].id].onerror = function () {
                        a.image.tips = ["\u8d44\u6e90\u52a0\u8f7d\u51fa\u9519\u8bf7\u6309#\u9000\u51fa"]
                    };
                    a.image.imgs[a.image.imgObjs[b].id].src = a.image.imgObjs[b].src;
                    a.image.imgs[a.image.imgObjs[b].id].id = a.image.imgObjs[b].id;
                    a.image.imgs[a.image.imgObjs[b].id].url =
                        a.image.imgObjs[b].src
                } else {
                    a.image.countLoaded++;
                    if (a.image.imgs[a.image.loadImgId].src != a.image.imgObjs[b].src) {
                        a.image.imgs[a.image.loadImgId].src = a.image.imgObjs[b].src;
                        a.image.imgs[a.image.loadImgId].url = a.image.imgObjs[b].src
                    }
                }
            }
            a.image.imgs[a.image.loadImgId].onload = function () {
                a.image.loadedImg = true;
                a.image.loadFrame = [
                    {x: 14, y: 0, frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], step: 0},
                    {x: 23, y: 1, frames: [11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], step: 0},
                    {x: 31, y: 6, frames: [10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9], step: 0},
                    {x: 35, y: 15, frames: [9,
                        10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8], step: 0},
                    {x: 34, y: 24, frames: [8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7], step: 0},
                    {x: 28, y: 32, frames: [7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6], step: 0},
                    {x: 20, y: 35, frames: [6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5], step: 0},
                    {x: 11, y: 34, frames: [5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4], step: 0},
                    {x: 3, y: 29, frames: [4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3], step: 0},
                    {x: 0, y: 21, frames: [3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2], step: 0},
                    {x: 1, y: 12, frames: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1], step: 0},
                    {x: 6, y: 4, frames: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0], step: 0}
                ]
            };
            return this
        }, loadImage: function (b) {
            if (a.system.gameFlow !=
                f.system.gameFlowType.loadImage && b.length > 0) {
                a.system.gameFlow = f.system.gameFlowType.loadImage;
                a.image.imgObjs = b;
                a.image.imgCount = a.image.imgObjs.length;
                a.image.countLoaded = 0
            }
        }, pushImage: function (b) {
            for (var c = 0; c < b.length; c++)a.image.imgObjs.push(b[c]);
            return this
        }, initImageCallBack: function (b) {
            if (typeof b == "function")m.initImageCallBack = b;
            return this
        }, loadImageCallBack: function (b) {
            if (typeof b == "function")m.loadImageCallBack = b;
            return this
        }, getImage: function (b) {
            if (a.image.imgs[b])return a.image.imgs[b]
        },
        audio: function () {
            var b = null;
            return{init: function () {
                return b = this
            }, play: function (c, d) {
                if (a.audio.audios[c] && !a.audio.audios[c].isPlaying) {
                    a.audio.audios[c].isPlaying = true;
                    a.audio.audios[c].dom.loop = d ? "loop" : undefined;
                    try {
                        a.audio.audios[c].dom.play()
                    } catch (g) {
                    }
                }
                return b
            }, pause: function (c) {
                if (a.audio.audios[c] && a.audio.audios[c].isPlaying) {
                    a.audio.audios[c].isPlaying = false;
                    try {
                        a.audio.audios[c].dom.pause()
                    } catch (d) {
                    }
                }
                return b
            }, noSound: function () {
                for (var c in a.audio.audios)a.audio.audios[c].dom.pause();
                return b
            }}
        }(), initAudio: function (b) {
            if (b.length > 0) {
                a.audio.audios = [];
                for (var c = 0; c < b.length; c++) {
                    a.audio.audios[b[c].id] = {id: b[c].id, dom: this.getDom(b[c].id), src: b[c].src, isPlaying: false};
                    a.audio.audios[b[c].id].dom.src = a.audio.audios[b[c].id].src
                }
            }
            return this
        }, setRunFrequency: function (b) {
            a.system.timeout = b;
            return this
        }, events: function () {
            var b;
            return{init: function () {
                return b = this
            }, keyDown: function (c) {
                if (!a.event.keyDownGo)a.event.keyDownGo = true;
                if (!a.event.keyUpGo)a.event.keyUpGo = true;
                if (!a.event.keyPressedGo)a.event.keyPressedGo =
                    true;
                a.event.keyDownCallBack = c;
                return b
            }, keyUp: function (c) {
                if (!a.event.keyDownGo)a.event.keyDownGo = true;
                if (!a.event.keyUpGo)a.event.keyUpGo = true;
                if (!a.event.keyPressedGo)a.event.keyPressedGo = true;
                a.event.keyUpCallBack = c;
                return b
            }, orientationChange: function (c) {
                a.event.orientationChange = c;
                return b
            }, touchStart: function (c) {
                a.event.touchStart = c;
                return b
            }, touchEnd: function (c) {
                a.event.touchEnd = c;
                return b
            }, touchMove: function (c) {
                a.event.touchMove = c;
                return b
            }, touchCancel: function (c) {
                a.event.touchCancel = c;
                return b
            },
                click: function (c) {
                    a.event.clickCallBack = c;
                    return b
                }, mouseDown: function (c) {
                    a.event.mouseDownCallBack = c;
                    return b
                }, mouseUp: function (c) {
                    a.event.mouseUpCallBack = c;
                    return b
                }, mouseMove: function (c) {
                    a.event.mouseMoveCallBack = c;
                    return b
                }, base: function () {
                    return jsGame
                }}
        }(), ui: function () {
            return{classes: {button: function (b) {
                b = jsGame.objExtend({display: true, id: "", fontId: "", fsx: 0, fsy: 0, hoverFontId: "", hfsx: 0, hfsy: 0, align: "", x: 0, y: 0, width: 50, height: 20}, b || {});
                this.display = b.display;
                this.id = b.id;
                this.fontId = b.fontId;
                this.fsx = b.fsx;
                this.fsy = b.fsy;
                this.hoverFontId = b.hoverFontId;
                this.hfsx = b.hfsx;
                this.hfsy = b.hfsy;
                this.align = b.align;
                this.width = b.width;
                this.height = b.height;
                if (this.align == "")this.x = b.x; else if (this.align == "center")this.x = (jsGame.canvas.screen.getWidth() - this.width) / 2; else if (this.align == "left")this.x = 0; else if (this.align == "right")this.x = jsGame.canvas.screen.getWidth() - this.width;
                if (this.text != "") {
                    var c = jsGame.canvas.measureText(this.text).width;
                    c = parseInt((this.width - c) / 2);
                    if (c < 0)c = 0;
                    this.fontX = this.x +
                        c;
                    c = c = null
                }
                this.y = b.y;
                this.show = function () {
                    this.display = true;
                    this.fontId != "" && jsGame.canvas.drawImage(this.fontId, this.fsx, this.fsy, this.width, this.height, this.x, this.y, this.width, this.height)
                };
                this.hover = function () {
                    this.display && this.hoverFontId != "" && jsGame.canvas.drawImage(this.hoverFontId, this.hfsx, this.hfsy, this.width, this.height, this.x, this.y, this.width, this.height)
                };
                b = null
            }}}
        }(), graphics: {HCENTER: f.canvas.graphics.HCENTER, VCENTER: f.canvas.graphics.VCENTER, LEFT: f.canvas.graphics.LEFT, RIGHT: f.canvas.graphics.RIGHT,
            TOP: f.canvas.graphics.TOP, BOTTOM: f.canvas.graphics.BOTTOM}, trans: {TRANS_NONE: f.canvas.trans.TRANS_NONE, TRANS_ROT90: f.canvas.trans.TRANS_ROT90, TRANS_ROT180: f.canvas.trans.TRANS_ROT180, TRANS_ROT270: f.canvas.trans.TRANS_ROT270, TRANS_MIRROR: f.canvas.trans.TRANS_MIRROR, TRANS_MIRROR_ROT90: f.canvas.trans.TRANS_MIRROR_ROT90, TRANS_MIRROR_ROT180: f.canvas.trans.TRANS_MIRROR_ROT180, TRANS_MIRROR_ROT270: f.canvas.trans.TRANS_MIRROR_ROT270}, request: function () {
            return{init: function () {
                m.initUrlParams(location.href)
            },
                get: function (b) {
                    return a.request.gets[b] ? a.request.gets[b] : ""
                }}
        }()}.init()
})();
