var egret;
var that;
(function(c) {
	var d = function() {
		function b() {
			this._hashCode = b.hashCount++
		}
		Object.defineProperty(b.prototype, "hashCode", {
			get: function() {
				return this._hashCode
			},
			enumerable: !0,
			configurable: !0
		});
		b.hashCount = 1;
		return b
	}();
	c.HashObject = d;
	d.prototype.__class__ = "egret.HashObject"
})(egret || (egret = {}));
var __extends = this.__extends || function(c, d) {
		function b() {
			this.constructor = c
		}
		for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
		b.prototype = d.prototype;
		c.prototype = new b
	};
(function(c) {
	var d = function(b) {
		function a(e) {
			"undefined" === typeof e && (e = 300);
			b.call(this);
			this.objectPool = [];
			this._length = 0;
			1 > e && (e = 1);
			this.autoDisposeTime = e;
			this.frameCount = 0
		}
		__extends(a, b);
		a.prototype._checkFrame = function() {
			this.frameCount--;
			0 >= this.frameCount && this.dispose()
		};
		Object.defineProperty(a.prototype, "length", {
			get: function() {
				return this._length
			},
			enumerable: !0,
			configurable: !0
		});
		a.prototype.push = function(e) {
			var l = this.objectPool; - 1 == l.indexOf(e) && (l.push(e), this._length++, 0 == this.frameCount &&
				(this.frameCount = this.autoDisposeTime, a._callBackList.push(this)))
		};
		a.prototype.pop = function() {
			if (0 == this._length) return null;
			this._length--;
			return this.objectPool.pop()
		};
		a.prototype.dispose = function() {
			0 < this._length && (this.objectPool = [], this._length = 0);
			this.frameCount = 0;
			var e = a._callBackList,
				l = e.indexOf(this); - 1 != l && e.splice(l, 1)
		};
		a._callBackList = [];
		return a
	}(c.HashObject);
	c.Recycler = d;
	d.prototype.__class__ = "egret.Recycler"
})(egret || (egret = {}));
(function(c) {
	c.__START_TIME;
	c.getTimer = function() {
		return Date.now() - c.__START_TIME
	}
})(egret || (egret = {}));
(function(c) {
	c.__callLaterFunctionList = [];
	c.__callLaterThisList = [];
	c.__callLaterArgsList = [];
	c.callLater = function(d, b) {
		for (var a = [], e = 0; e < arguments.length - 2; e++) a[e] = arguments[e + 2];
		c.__callLaterFunctionList.push(d);
		c.__callLaterThisList.push(b);
		c.__callLaterArgsList.push(a)
	}
})(egret || (egret = {}));
var egret_dom;
(function(c) {
	function d() {
		for (var b = document.createElement("div").style, a = ["t", "webkitT", "msT", "MozT", "OT"], e = 0; e < a.length; e++)
			if (a[e] + "ransform" in b) return a[e];
		return a[0]
	}
	c.header = "";
	c.getHeader = d;
	c.getTrans = function(b) {
		"" == c.header && (c.header = d());
		return c.header + b.substring(1, b.length)
	}
})(egret_dom || (egret_dom = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a(e, a, n) {
			"undefined" === typeof a && (a = !1);
			"undefined" === typeof n && (n = !1);
			b.call(this);
			this._eventPhase = 2;
			this._isPropagationImmediateStopped = this._isPropagationStopped = this._isDefaultPrevented = !1;
			this.isNew = !0;
			this._type = e;
			this._bubbles = a;
			this._cancelable = n
		}
		__extends(a, b);
		Object.defineProperty(a.prototype, "type", {
			get: function() {
				return this._type
			},
			enumerable: !0,
			configurable: !0
		});
		Object.defineProperty(a.prototype, "bubbles", {
			get: function() {
				return this._bubbles
			},
			enumerable: !0,
			configurable: !0
		});
		Object.defineProperty(a.prototype, "cancelable", {
			get: function() {
				return this._cancelable
			},
			enumerable: !0,
			configurable: !0
		});
		Object.defineProperty(a.prototype, "eventPhase", {
			get: function() {
				return this._eventPhase
			},
			enumerable: !0,
			configurable: !0
		});
		Object.defineProperty(a.prototype, "currentTarget", {
			get: function() {
				return this._currentTarget
			},
			enumerable: !0,
			configurable: !0
		});
		Object.defineProperty(a.prototype, "target", {
			get: function() {
				return this._target
			},
			enumerable: !0,
			configurable: !0
		});
		a.prototype.isDefaultPrevented = function() {
			return this._isDefaultPrevented
		};
		a.prototype.preventDefault = function() {
			this._cancelable && (this._isDefaultPrevented = !0)
		};
		a.prototype.stopPropagation = function() {
			this._bubbles && (this._isPropagationStopped = !0)
		};
		a.prototype.stopImmediatePropagation = function() {
			this._bubbles && (this._isPropagationImmediateStopped = !0)
		};
		a.prototype._reset = function() {
			this.isNew ? this.isNew = !1 : (this._isPropagationImmediateStopped = this._isPropagationStopped = this._isDefaultPrevented = !1,
				this._currentTarget = this._target = null, this._eventPhase = 2)
		};
		a._dispatchByTarget = function(e, a, b, d, f, g) {
			"undefined" === typeof f && (f = !1);
			"undefined" === typeof g && (g = !1);
			var k = e.eventRecycler;
			k || (k = e.eventRecycler = new c.Recycler);
			var p = k.pop();
			p ? p._type = b : p = new e(b);
			p._bubbles = f;
			p._cancelable = g;
			if (d)
				for (var m in d) p[m] = d[m], null !== p[m] && (d[m] = null);
			e = a.dispatchEvent(p);
			k.push(p);
			return e
		};
		a._getPropertyData = function(e) {
			var a = e._props;
			a || (a = e._props = {});
			return a
		};
		a.dispatchEvent = function(e, l, b, c) {
			"undefined" ===
				typeof b && (b = !1);
			var d = a._getPropertyData(a);
			c && (d.data = c);
			a._dispatchByTarget(a, e, l, d, b)
		};
		a.ADDED_TO_STAGE = "addedToStage";
		a.REMOVED_FROM_STAGE = "removedFromStage";
		a.ADDED = "added";
		a.REMOVED = "removed";
		a.COMPLETE = "complete";
		a.ENTER_FRAME = "enterFrame";
		a.RENDER = "render";
		a.FINISH_RENDER = "finishRender";
		a.FINISH_UPDATE_TRANSFORM = "finishUpdateTransform";
		a.LEAVE_STAGE = "leaveStage";
		a.RESIZE = "resize";
		a.CHANGE = "change";
		return a
	}(c.HashObject);
	c.Event = d;
	d.prototype.__class__ = "egret.Event"
})(egret || (egret = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a(e, a, n) {
			"undefined" === typeof a && (a = !1);
			"undefined" === typeof n && (n = !1);
			b.call(this, e, a, n)
		}
		__extends(a, b);
		a.dispatchIOErrorEvent = function(e) {
			c.Event._dispatchByTarget(a, e, a.IO_ERROR)
		};
		a.IO_ERROR = "ioError";
		return a
	}(c.Event);
	c.IOErrorEvent = d;
	d.prototype.__class__ = "egret.IOErrorEvent"
})(egret || (egret = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a(e, a, n, c, d, g, k, p, m, q) {
			"undefined" === typeof a && (a = !0);
			"undefined" === typeof n && (n = !0);
			"undefined" === typeof c && (c = 0);
			"undefined" === typeof d && (d = 0);
			"undefined" === typeof g && (g = 0);
			"undefined" === typeof k && (k = !1);
			"undefined" === typeof p && (p = !1);
			"undefined" === typeof q && (q = !1);
			b.call(this, e, a, n);
			this._stageY = this._stageX = 0;
			this.touchPointID = c;
			this._stageX = d;
			this._stageY = g;
			this.ctrlKey = k;
			this.altKey = p;
			this.touchDown = q
		}
		__extends(a, b);
		Object.defineProperty(a.prototype, "stageX", {
			get: function() {
				return this._stageX
			},
			enumerable: !0,
			configurable: !0
		});
		Object.defineProperty(a.prototype, "stageY", {
			get: function() {
				return this._stageY
			},
			enumerable: !0,
			configurable: !0
		});
		Object.defineProperty(a.prototype, "localX", {
			get: function() {
				return this._currentTarget.globalToLocal(this._stageX, this._stageY, c.Point.identity).x
			},
			enumerable: !0,
			configurable: !0
		});
		Object.defineProperty(a.prototype, "localY", {
			get: function() {
				return this._currentTarget.globalToLocal(this._stageX, this._stageY, c.Point.identity).y
			},
			enumerable: !0,
			configurable: !0
		});
		a.dispatchTouchEvent = function(e, l, b, d, f, g, k, p, m) {
			"undefined" === typeof b && (b = 0);
			"undefined" === typeof d && (d = 0);
			"undefined" === typeof f && (f = 0);
			"undefined" === typeof g && (g = !1);
			"undefined" === typeof k && (k = !1);
			"undefined" === typeof p && (p = !1);
			"undefined" === typeof m && (m = !1);
			var q = c.Event._getPropertyData(a);
			q.touchPointID = b;
			q._stageX = d;
			q._stageY = f;
			q.ctrlKey = g;
			q.altKey = k;
			q.shiftKey = p;
			q.touchDown = m;
			c.Event._dispatchByTarget(a, e, l, q, !0, !0)
		};
		a.TOUCH_TAP = "touchTap";
		a.TOUCH_MOVE = "touchMove";
		a.TOUCH_BEGIN = "touchBegin";
		a.TOUCH_END = "touchEnd";
		a.TOUCH_RELEASE_OUTSIDE = "touchReleaseOutside";
		a.TOUCH_ROLL_OUT = "touchRollOut";
		a.TOUCH_ROLL_OVER = "touchRollOver";
		a.TOUCH_OUT = "touchOut";
		a.TOUCH_OVER = "touchOver";
		return a
	}(c.Event);
	c.TouchEvent = d;
	d.prototype.__class__ = "egret.TouchEvent"
})(egret || (egret = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a(e, a, n) {
			"undefined" === typeof a && (a = !1);
			"undefined" === typeof n && (n = !1);
			b.call(this, e, a, n)
		}
		__extends(a, b);
		a.dispatchTimerEvent = function(e, l) {
			c.Event._dispatchByTarget(a, e, l)
		};
		a.TIMER = "timer";
		a.TIMER_COMPLETE = "timerComplete";
		return a
	}(c.Event);
	c.TimerEvent = d;
	d.prototype.__class__ = "egret.TimerEvent"
})(egret || (egret = {}));
(function(c) {
	var d = function() {
		function b() {}
		b.CAPTURING_PHASE = 1;
		b.AT_TARGET = 2;
		b.BUBBLING_PHASE = 3;
		return b
	}();
	c.EventPhase = d;
	d.prototype.__class__ = "egret.EventPhase"
})(egret || (egret = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a(e) {
			"undefined" === typeof e && (e = null);
			b.call(this);
			this._eventTarget = e ? e : this
		}
		__extends(a, b);
		a.prototype.addEventListener = function(e, a, b, d, f) {
			"undefined" === typeof d && (d = !1);
			"undefined" === typeof f && (f = 0);
			"undefined" === typeof d && (d = !1);
			"undefined" === typeof f && (f = 0);
			a || c.Logger.fatal("addEventListener\u4fa6\u542c\u51fd\u6570\u4e0d\u80fd\u4e3a\u7a7a");
			d ? (this._captureEventsMap || (this._captureEventsMap = {}), d = this._captureEventsMap) : (this._eventsMap || (this._eventsMap = {}), d = this._eventsMap);
			var g = d[e];
			g || (g = d[e] = []);
			this._insertEventBin(g, a, b, f)
		};
		a.prototype._insertEventBin = function(e, a, b, c) {
			for (var d = -1, g = e.length, k = 0; k < g; k++) {
				var p = e[k];
				if (p.listener === a && p.thisObject === b) return !1; - 1 == d && p.priority < c && (d = k)
			}
			a = {
				listener: a,
				thisObject: b,
				priority: c
			}; - 1 != d ? e.splice(d, 0, a) : e.push(a);
			return !0
		};
		a.prototype.removeEventListener = function(e, a, b, c) {
			"undefined" === typeof c && (c = !1);
			if (c = c ? this._captureEventsMap : this._eventsMap) {
				var d = c[e];
				d && (this._removeEventBin(d, a, b), 0 ==
					d.length && delete c[e])
			}
		};
		a.prototype._removeEventBin = function(e, a, b) {
			for (var c = e.length, d = 0; d < c; d++) {
				var g = e[d];
				if (g.listener === a && g.thisObject === b) return e.splice(d, 1), !0
			}
			return !1
		};
		a.prototype.hasEventListener = function(e) {
			return this._eventsMap && this._eventsMap[e] || this._captureEventsMap && this._captureEventsMap[e]
		};
		a.prototype.willTrigger = function(e) {
			return this.hasEventListener(e)
		};
		a.prototype.dispatchEvent = function(e) {
			e._reset();
			e._target = this._eventTarget;
			e._currentTarget = this._eventTarget;
			return this._notifyListener(e)
		};
		a.prototype._notifyListener = function(e) {
			var a = 1 == e._eventPhase ? this._captureEventsMap : this._eventsMap;
			if (!a) return !0;
			a = a[e._type];
			if (!a) return !0;
			var b = a.length;
			if (0 == b) return !0;
			for (var a = a.concat(), c = 0; c < b; c++) {
				var d = a[c];
				d.listener.call(d.thisObject, e);
				if (e._isPropagationImmediateStopped) break
			}
			return !e._isDefaultPrevented
		};
		a.prototype.dispatchEventWith = function(e, a, b) {
			"undefined" === typeof a && (a = !1);
			c.Event.dispatchEvent(this, e, a, b)
		};
		return a
	}(c.HashObject);
	c.EventDispatcher = d;
	d.prototype.__class__ =
		"egret.EventDispatcher"
})(egret || (egret = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a() {
			b.call(this);
			this.reuseEvent = new c.Event("")
		}
		__extends(a, b);
		a.prototype.run = function() {
			c.Ticker.getInstance().run();
			c.Ticker.getInstance().register(this.renderLoop, this, Number.NEGATIVE_INFINITY);
			c.Ticker.getInstance().register(this.broadcastEnterFrame, this, Number.POSITIVE_INFINITY);
			this.touchContext.run()
		};
		a.prototype.renderLoop = function(e) {
			if (0 < c.__callLaterFunctionList.length) {
				var l = c.__callLaterFunctionList;
				c.__callLaterFunctionList = [];
				var b = c.__callLaterThisList;
				c.__callLaterThisList = [];
				var d = c.__callLaterArgsList;
				c.__callLaterArgsList = []
			}
			e = this.stage;
			var f = a.cachedEvent;
			f._type = c.Event.RENDER;
			this.dispatchEvent(f);
			c.Stage._invalidateRenderFlag && (this.broadcastRender(), c.Stage._invalidateRenderFlag = !1);
			l && this.doCallLaterList(l, b, d);
			l = this.rendererContext;
			l.onRenderStart();
			l.clearScreen();
			e._updateTransform();
			f._type = c.Event.FINISH_UPDATE_TRANSFORM;
			this.dispatchEvent(f);
			e._draw(l);
			f._type = c.Event.FINISH_RENDER;
			this.dispatchEvent(f);
			l.onRenderFinish()
		};
		a.prototype.broadcastEnterFrame =
			function(e) {
				e = this.reuseEvent;
				e._type = c.Event.ENTER_FRAME;
				this.dispatchEvent(e);
				for (var a = c.DisplayObject._enterFrameCallBackList.concat(), b = a.length, d = 0; d < b; d++) {
					var f = a[d];
					e._target = f.display;
					e._currentTarget = f.display;
					f.listener.call(f.thisObject, e)
				}
				a = c.Recycler._callBackList;
				for (d = a.length - 1; 0 <= d; d--) a[d]._checkFrame()
		};
		a.prototype.broadcastRender = function() {
			var e = this.reuseEvent;
			e._type = c.Event.RENDER;
			for (var a = c.DisplayObject._renderCallBackList.concat(), b = a.length, d = 0; d < b; d++) {
				var f = a[d],
					g =
						f.display;
				e._target = g;
				e._currentTarget = g;
				f.listener.call(f.thisObject, e)
			}
		};
		a.prototype.doCallLaterList = function(e, a, b) {
			for (var c = e.length, d = 0; d < c; d++) {
				var g = e[d];
				null != g && g.apply(a[d], b[d])
			}
		};
		a.DEVICE_PC = "web";
		a.DEVICE_MOBILE = "native";
		a.RUNTIME_HTML5 = "runtime_html5";
		a.RUNTIME_NATIVE = "runtime_native";
		a.cachedEvent = new c.Event("");
		return a
	}(c.EventDispatcher);
	c.MainContext = d;
	d.prototype.__class__ = "egret.MainContext"
})(egret || (egret = {}));
var testDeviceType = function() {
	if (!this.navigator) return !0;
	var c = navigator.userAgent.toLowerCase();
	return -1 != c.indexOf("mobile") || -1 != c.indexOf("android")
}, testRuntimeType = function() {
		return this.navigator ? !0 : !1
	};
egret.MainContext.instance = new egret.MainContext;
egret.MainContext.deviceType = testDeviceType() ? egret.MainContext.DEVICE_MOBILE : egret.MainContext.DEVICE_PC;
egret.MainContext.runtimeType = testRuntimeType() ? egret.MainContext.RUNTIME_HTML5 : egret.MainContext.RUNTIME_NATIVE;
(function(c) {
	var d = function() {
		function b() {
			this._tick = this._preDrawCount = this._updateTransformPerformanceCost = this._renderPerformanceCost = this._logicPerformanceCost = this._lastTime = 0;
			this._maxDeltaTime = 500;
			this._totalDeltaTime = 0
		}
		b.getInstance = function() {
			null == b.instance && (b.instance = new b);
			return b.instance
		};
		b.prototype.run = function() {
			c.Ticker.getInstance().register(this.update, this);
			null == this._txt && (this._txt = new c.TextField, this._txt.size = 28, c.MainContext.instance.stage.addChild(this._txt));
			var a =
				c.MainContext.instance;
			a.addEventListener(c.Event.ENTER_FRAME, this.onEnterFrame, this);
			a.addEventListener(c.Event.RENDER, this.onStartRender, this);
			a.addEventListener(c.Event.FINISH_RENDER, this.onFinishRender, this);
			a.addEventListener(c.Event.FINISH_UPDATE_TRANSFORM, this.onFinishUpdateTransform, this)
		};
		b.prototype.onEnterFrame = function(a) {
			this._lastTime = c.getTimer()
		};
		b.prototype.onStartRender = function(a) {
			a = c.getTimer();
			this._logicPerformanceCost = a - this._lastTime;
			this._lastTime = a
		};
		b.prototype.onFinishUpdateTransform =
			function(a) {
				a = c.getTimer();
				this._updateTransformPerformanceCost = a - this._lastTime;
				this._lastTime = a
		};
		b.prototype.onFinishRender = function(a) {
			a = c.getTimer();
			this._renderPerformanceCost = a - this._lastTime;
			this._lastTime = a
		};
		b.prototype.update = function(a) {
			this._tick++;
			this._totalDeltaTime += a;
			if (this._totalDeltaTime >= this._maxDeltaTime) {
				a = (this._preDrawCount - 1).toString();
				var e = Math.ceil(this._logicPerformanceCost).toString() + "," + Math.ceil(this._updateTransformPerformanceCost).toString() + "," + Math.ceil(this._renderPerformanceCost).toString() +
					"," + Math.ceil(c.MainContext.instance.rendererContext.renderCost).toString();
				this._txt.text = "draw:" + a + "\ncost:" + e + "\nFPS:" + Math.floor(1E3 * this._tick / this._totalDeltaTime).toString();
				this._tick = this._totalDeltaTime = 0
			}
			this._preDrawCount = 0
		};
		b.prototype.onDrawImage = function() {
			this._preDrawCount++
		};
		return b
	}();
	c.Profiler = d;
	d.prototype.__class__ = "egret.Profiler"
})(egret || (egret = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a() {
			b.apply(this, arguments);
			this._timeScale = 1;
			this._paused = !1;
			this.callBackList = []
		}
		__extends(a, b);
		a.prototype.run = function() {
			c.__START_TIME = (new Date).getTime();
			c.MainContext.instance.deviceContext.executeMainLoop(this.update, this)
		};
		a.prototype.update = function(e) {
			var a = this.callBackList.concat(),
				b = a.length;
			e *= this._timeScale;
			e *= this._timeScale;
			for (var c = 0; c < b; c++) {
				var d = a[c];
				d.listener.call(d.thisObject, e)
			}
		};
		a.prototype.register = function(e, a, b) {
			"undefined" ===
				typeof b && (b = 0);
			this._insertEventBin(this.callBackList, e, a, b)
		};
		a.prototype.unregister = function(e, a) {
			this._removeEventBin(this.callBackList, e, a)
		};
		a.prototype.setTimeout = function(e, a, b) {
			for (var d = [], f = 0; f < arguments.length - 3; f++) d[f] = arguments[f + 3];
			c.Logger.warning("Ticker#setTimeout\u65b9\u6cd5\u5373\u5c06\u5e9f\u5f03,\u8bf7\u4f7f\u7528egret.setTimeout");
			c.setTimeout.apply(null, [e, a, b].concat(d))
		};
		a.prototype.setTimeScale = function(e) {
			this._timeScale = e
		};
		a.prototype.getTimeScale = function() {
			return this._timeScale
		};
		a.prototype.pause = function() {
			this._paused = !0
		};
		a.prototype.resume = function() {
			this._paused = !1
		};
		a.getInstance = function() {
			null == a.instance && (a.instance = new a);
			return a.instance
		};
		return a
	}(c.EventDispatcher);
	c.Ticker = d;
	d.prototype.__class__ = "egret.Ticker"
})(egret || (egret = {}));
(function(c) {
	var d = function() {
		function b() {}
		b.LEFT = "left";
		b.RIGHT = "right";
		b.CENTER = "center";
		b.JUSTIFY = "justify";
		b.CONTENT_JUSTIFY = "contentJustify";
		return b
	}();
	c.HorizontalAlign = d;
	d.prototype.__class__ = "egret.HorizontalAlign"
})(egret || (egret = {}));
(function(c) {
	var d = function() {
		function b() {}
		b.TOP = "top";
		b.BOTTOM = "bottom";
		b.MIDDLE = "middle";
		b.JUSTIFY = "justify";
		b.CONTENT_JUSTIFY = "contentJustify";
		return b
	}();
	c.VerticalAlign = d;
	d.prototype.__class__ = "egret.VerticalAlign"
})(egret || (egret = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a(e, a) {
			"undefined" === typeof a && (a = 0);
			b.call(this);
			this._currentCount = 0;
			this.delay = e;
			this.repeatCount = a
		}
		__extends(a, b);
		a.prototype.currentCount = function() {
			return this._currentCount
		};
		Object.defineProperty(a.prototype, "running", {
			get: function() {
				return this._running
			},
			enumerable: !0,
			configurable: !0
		});
		a.prototype.reset = function() {
			this.stop();
			this._currentCount = 0
		};
		a.prototype.start = function() {
			this._running || (this.lastTime = c.getTimer(), 0 != this._currentCount && (this._currentCount =
				0), c.Ticker.getInstance().register(this.onEnterFrame, this), this._running = !0)
		};
		a.prototype.stop = function() {
			this._running && (c.Ticker.getInstance().unregister(this.onEnterFrame, this), this._running = !1)
		};
		a.prototype.onEnterFrame = function(e) {
			e = c.getTimer();
			e - this.lastTime > this.delay && (this.lastTime = e, this._currentCount++, c.TimerEvent.dispatchTimerEvent(this, c.TimerEvent.TIMER), 0 < this.repeatCount && this._currentCount >= this.repeatCount && (this.stop(), c.TimerEvent.dispatchTimerEvent(this, c.TimerEvent.TIMER_COMPLETE)))
		};
		return a
	}(c.EventDispatcher);
	c.Timer = d;
	d.prototype.__class__ = "egret.Timer"
})(egret || (egret = {}));
(function(c) {
	c.getQualifiedClassName = function(c) {
		c = c.prototype ? c.prototype : c.__proto__;
		if (c.hasOwnProperty("__class__")) return c.__class__;
		var b = c.constructor.toString(),
			a = b.indexOf("("),
			b = b.substring(9, a);
		return c.__class__ = b
	}
})(egret || (egret = {}));
(function(c) {
	var d = {};
	c.getDefinitionByName = function(b) {
		if (!b) return null;
		var a = d[b];
		if (a) return a;
		for (var e = b.split("."), l = e.length, a = __global, c = 0; c < l; c++)
			if (a = a[e[c]], !a) return null;
		return d[b] = a
	}
})(egret || (egret = {}));
var __global = __global || this;
(function(c) {
	function d(e) {
		for (var a in b) {
			var c = b[a];
			c.delay -= e;
			0 >= c.delay && (c.listener.apply(c.thisObject, c.params), delete b[a])
		}
	}
	var b = {}, a = 0;
	c.setTimeout = function(e, l, n) {
		for (var h = [], f = 0; f < arguments.length - 3; f++) h[f] = arguments[f + 3];
		h = {
			listener: e,
			thisObject: l,
			delay: n,
			params: h
		};
		0 == a && c.Ticker.getInstance().register(d, null);
		a++;
		b[a] = h;
		return a
	};
	c.clearTimeout = function(e) {
		delete b[e]
	}
})(egret || (egret = {}));
(function(c) {
	c.hasDefinition = function(d) {
		return c.getDefinitionByName(d) ? !0 : !1
	}
})(egret || (egret = {}));
(function(c) {
	c.toColorString = function(c) {
		if (isNaN(c) || 0 > c) c = 0;
		16777215 < c && (c = 16777215);
		for (c = c.toString(16).toUpperCase(); 6 > c.length;) c = "0" + c;
		return "#" + c
	}
})(egret || (egret = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a(e, a, c, d, f, g) {
			"undefined" === typeof e && (e = 1);
			"undefined" === typeof a && (a = 0);
			"undefined" === typeof c && (c = 0);
			"undefined" === typeof d && (d = 1);
			"undefined" === typeof f && (f = 0);
			"undefined" === typeof g && (g = 0);
			b.call(this);
			this.a = e;
			this.b = a;
			this.c = c;
			this.d = d;
			this.tx = f;
			this.ty = g
		}
		__extends(a, b);
		a.prototype.prepend = function(e, a, b, c, d, g) {
			var k = this.tx;
			if (1 != e || 0 != a || 0 != b || 1 != c) {
				var p = this.a,
					m = this.c;
				this.a = p * e + this.b * b;
				this.b = p * a + this.b * c;
				this.c = m * e + this.d * b;
				this.d = m * a + this.d *
					c
			}
			this.tx = k * e + this.ty * b + d;
			this.ty = k * a + this.ty * c + g;
			return this
		};
		a.prototype.append = function(e, a, b, c, d, g) {
			var k = this.a,
				p = this.b,
				m = this.c,
				q = this.d;
			if (1 != e || 0 != a || 0 != b || 1 != c) this.a = e * k + a * m, this.b = e * p + a * q, this.c = b * k + c * m, this.d = b * p + c * q;
			this.tx = d * k + g * m + this.tx;
			this.ty = d * p + g * q + this.ty;
			return this
		};
		a.prototype.prependMatrix = function(e) {
			this.prepend(e.a, e.b, e.c, e.d, e.tx, e.ty);
			return this
		};
		a.prototype.appendMatrix = function(e) {
			this.append(e.a, e.b, e.c, e.d, e.tx, e.ty);
			return this
		};
		a.prototype.prependTransform = function(e,
			l, b, c, d, g, k, p, m) {
			if (d % 360) {
				var q = d * a.DEG_TO_RAD;
				d = Math.cos(q);
				q = Math.sin(q)
			} else d = 1, q = 0; if (p || m) this.tx -= p, this.ty -= m;
			g || k ? (g *= a.DEG_TO_RAD, k *= a.DEG_TO_RAD, this.prepend(d * b, q * b, -q * c, d * c, 0, 0), this.prepend(Math.cos(k), Math.sin(k), -Math.sin(g), Math.cos(g), e, l)) : this.prepend(d * b, q * b, -q * c, d * c, e, l);
			return this
		};
		a.prototype.appendTransform = function(e, l, b, c, d, g, k, p, m) {
			if (d % 360) {
				var q = d * a.DEG_TO_RAD;
				d = Math.cos(q);
				q = Math.sin(q)
			} else d = 1, q = 0;
			g || k ? (g *= a.DEG_TO_RAD, k *= a.DEG_TO_RAD, this.append(Math.cos(k), Math.sin(k), -Math.sin(g), Math.cos(g), e, l), this.append(d * b, q * b, -q * c, d * c, 0, 0)) : this.append(d * b, q * b, -q * c, d * c, e, l);
			if (p || m) this.tx -= p * this.a + m * this.c, this.ty -= p * this.b + m * this.d;
			return this
		};
		a.prototype.rotate = function(e) {
			var a = Math.cos(e);
			e = Math.sin(e);
			var b = this.a,
				c = this.c,
				d = this.tx;
			this.a = b * a - this.b * e;
			this.b = b * e + this.b * a;
			this.c = c * a - this.d * e;
			this.d = c * e + this.d * a;
			this.tx = d * a - this.ty * e;
			this.ty = d * e + this.ty * a;
			return this
		};
		a.prototype.skew = function(e, l) {
			e *= a.DEG_TO_RAD;
			l *= a.DEG_TO_RAD;
			this.append(Math.cos(l), Math.sin(l), -Math.sin(e), Math.cos(e), 0, 0);
			return this
		};
		a.prototype.scale = function(e, a) {
			this.a *= e;
			this.d *= a;
			this.c *= e;
			this.b *= a;
			this.tx *= e;
			this.ty *= a;
			return this
		};
		a.prototype.translate = function(e, a) {
			this.tx += e;
			this.ty += a;
			return this
		};
		a.prototype.identity = function() {
			this.a = this.d = 1;
			this.b = this.c = this.tx = this.ty = 0;
			return this
		};
		a.prototype.identityMatrix = function(e) {
			this.a = e.a;
			this.b = e.b;
			this.c = e.c;
			this.d = e.d;
			this.tx = e.tx;
			this.ty = e.ty;
			return this
		};
		a.prototype.invert = function() {
			var e = this.a,
				a = this.b,
				b = this.c,
				c = this.d,
				d = this.tx,
				g = e * c - a * b;
			this.a = c / g;
			this.b = -a / g;
			this.c = -b / g;
			this.d = e / g;
			this.tx = (b * this.ty - c * d) / g;
			this.ty = -(e * this.ty - a * d) / g;
			return this
		};
		a.transformCoords = function(e, a, b) {
			var d = c.Point.identity;
			d.x = e.a * a + e.c * b + e.tx;
			d.y = e.d * b + e.b * a + e.ty;
			return d
		};
		a.prototype.toArray = function(e) {
			this.array || (this.array = new Float32Array(9));
			e ? (this.array[0] = this.a, this.array[1] = this.b, this.array[2] = 0, this.array[3] = this.c, this.array[4] = this.d, this.array[5] = 0, this.array[6] = this.tx, this.array[7] = this.ty) : (this.array[0] = this.a,
				this.array[1] = this.b, this.array[2] = this.tx, this.array[3] = this.c, this.array[4] = this.d, this.array[5] = this.ty, this.array[6] = 0, this.array[7] = 0);
			this.array[8] = 1;
			return this.array
		};
		a.identity = new a;
		a.DEG_TO_RAD = Math.PI / 180;
		return a
	}(c.HashObject);
	c.Matrix = d;
	d.prototype.__class__ = "egret.Matrix"
})(egret || (egret = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a(e, a) {
			"undefined" === typeof e && (e = 0);
			"undefined" === typeof a && (a = 0);
			b.call(this);
			this.x = e;
			this.y = a
		}
		__extends(a, b);
		a.prototype.clone = function() {
			return new a(this.x, this.y)
		};
		a.prototype.equals = function(e) {
			return this.x == e.x && this.y == e.y
		};
		a.distance = function(e, a) {
			return Math.sqrt((e.x - a.x) * (e.x - a.x) + (e.y - a.y) * (e.y - a.y))
		};
		a.identity = new a(0, 0);
		return a
	}(c.HashObject);
	c.Point = d;
	d.prototype.__class__ = "egret.Point"
})(egret || (egret = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a(e, a, c, d) {
			"undefined" === typeof e && (e = 0);
			"undefined" === typeof a && (a = 0);
			"undefined" === typeof c && (c = 0);
			"undefined" === typeof d && (d = 0);
			b.call(this);
			this.x = e;
			this.y = a;
			this.width = c;
			this.height = d
		}
		__extends(a, b);
		Object.defineProperty(a.prototype, "right", {
			get: function() {
				return this.x + this.width
			},
			set: function(e) {
				this.width = e - this.x
			},
			enumerable: !0,
			configurable: !0
		});
		Object.defineProperty(a.prototype, "bottom", {
			get: function() {
				return this.y + this.height
			},
			set: function(e) {
				this.height =
					e - this.y
			},
			enumerable: !0,
			configurable: !0
		});
		a.prototype.initialize = function(e, a, b, c) {
			this.x = e;
			this.y = a;
			this.width = b;
			this.height = c;
			return this
		};
		a.prototype.contains = function(e, a) {
			return this.x <= e && this.x + this.width >= e && this.y <= a && this.y + this.height >= a
		};
		a.prototype.intersects = function(e) {
			var a = e.right,
				b = e.bottom,
				c = this.right,
				d = this.bottom;
			return this.contains(e.x, e.y) || this.contains(e.x, b) || this.contains(a, e.y) || this.contains(a, b) || e.contains(this.x, this.y) || e.contains(this.x, d) || e.contains(c, this.y) ||
				e.contains(c, d) ? !0 : !1
		};
		a.prototype.clone = function() {
			return new a(this.x, this.y, this.width, this.height)
		};
		a.prototype.containsPoint = function(e) {
			return this.x < e.x && this.x + this.width > e.x && this.y < e.y && this.y + this.height > e.y ? !0 : !1
		};
		a.identity = new a(0, 0, 0, 0);
		return a
	}(c.HashObject);
	c.Rectangle = d;
	d.prototype.__class__ = "egret.Rectangle"
})(egret || (egret = {}));
(function(c) {
	var d = function() {
		function b() {}
		b.fatal = function(a, e) {
			"undefined" === typeof e && (e = null);
			c.Logger.traceToConsole("Fatal", a, e);
			throw Error(c.Logger.getTraceCode("Fatal", a, e));
		};
		b.info = function(a, e) {
			"undefined" === typeof e && (e = null);
			c.Logger.traceToConsole("Info", a, e)
		};
		b.warning = function(a, e) {
			"undefined" === typeof e && (e = null);
			c.Logger.traceToConsole("Warning", a, e)
		};
		b.traceToConsole = function(a, e, l) {
		};
		b.getTraceCode = function(a, e, l) {
			return "[" + a + "]" + e + ":" +
				(null == l ? "" : l)
		};
		return b
	}();
	c.Logger = d;
	d.prototype.__class__ = "egret.Logger"
})(egret || (egret = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a() {
			b.call(this);
			this._isSupportDOMParser = this._xmlDict = this._parser = null;
			this._xmlDict = {};
			window.DOMParser ? (this._isSupportDOMParser = !0, this._parser = new DOMParser) : this._isSupportDOMParser = !1
		}
		__extends(a, b);
		a.getInstance = function() {
			a._instance || (a._instance = new a);
			return a._instance
		};
		a.prototype.parserXML = function(e) {
			for (var a = 0;
				"\n" == e.charAt(a) || "\t" == e.charAt(a) || "\r" == e.charAt(a) || " " == e.charAt(a);) a++;
			0 != a && (e = e.substring(a, e.length));
			this._isSupportDOMParser ?
				a = this._parser.parseFromString(e, "text/xml") : (a = new ActiveXObject("Microsoft.XMLDOM"), a.async = "false", a.loadXML(e));
			null == a && c.Logger.info("xml not found!");
			return a
		};
		a._instance = null;
		return a
	}(c.HashObject);
	c.SAXParser = d;
	d.prototype.__class__ = "egret.SAXParser"
})(egret || (egret = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(e) {
		function l() {
			e.call(this);
			this._designHeight = this._designWidth = 0;
			this._scaleY = this._scaleX = 1;
			this._stageHeight = this._stageWidth = this._offSetY = 0
		}
		__extends(l, e);
		l.getInstance = function() {
			null == l.instance && (a.initialize(), l.instance = new l);
			return l.instance
		};
		l.prototype.setDesignSize = function(e, a, l) {
			this._designWidth = e;
			this._designHeight = a;
			l && (c.Logger.warning("\u8be5\u65b9\u6cd5\u76ee\u524d\u4e0d\u5e94\u4f20\u5165 resolutionPolicy \u53c2\u6570\uff0c\u8bf7\u5728 docs/1.0_Final_ReleaseNote\u4e2d\u67e5\u770b\u5982\u4f55\u5347\u7ea7"),
				this._setResolutionPolicy(l))
		};
		l.prototype._setResolutionPolicy = function(e) {
			this._resolutionPolicy = e;
			e.init(this);
			e._apply(this, this._designWidth, this._designHeight)
		};
		l.prototype.getScaleX = function() {
			return this._scaleX
		};
		l.prototype.getScaleY = function() {
			return this._scaleY
		};
		l.prototype.getOffSetY = function() {
			return this._offSetY
		};
		l.canvas_name = "egretCanvas";
		l.canvas_div_name = "gameDiv";
		return l
	}(c.HashObject);
	c.StageDelegate = d;
	d.prototype.__class__ = "egret.StageDelegate";
	var b = function() {
		function e(a,
			l) {
			this._containerStrategy = a;
			this._contentStrategy = l
		}
		e.prototype.init = function(e) {
			this._containerStrategy.init(e);
			this._contentStrategy.init(e)
		};
		e.prototype._apply = function(e, a, l) {
			this._containerStrategy._apply(e, a, l);
			this._contentStrategy._apply(e, a, l)
		};
		return e
	}();
	c.ResolutionPolicy = b;
	b.prototype.__class__ = "egret.ResolutionPolicy";
	var a = function() {
		function a() {}
		a.initialize = function() {
			a.EQUAL_TO_FRAME = new e
		};
		a.prototype.init = function(e) {};
		a.prototype._apply = function(e, a, l) {};
		a.prototype._setupContainer =
			function() {
				var e = document.body,
					a;
				e && (a = e.style) && (a.paddingTop = a.paddingTop || "0px", a.paddingRight = a.paddingRight || "0px", a.paddingBottom = a.paddingBottom || "0px", a.paddingLeft = a.paddingLeft || "0px", a.borderTop = a.borderTop || "0px", a.borderRight = a.borderRight || "0px", a.borderBottom = a.borderBottom || "0px", a.borderLeft = a.borderLeft || "0px", a.marginTop = a.marginTop || "0px", a.marginRight = a.marginRight || "0px", a.marginBottom = a.marginBottom || "0px", a.marginLeft = a.marginLeft || "0px")
		};
		return a
	}();
	c.ContainerStrategy = a;
	a.prototype.__class__ = "egret.ContainerStrategy";
	var e = function(e) {
		function a() {
			e.apply(this, arguments)
		}
		__extends(a, e);
		a.prototype._apply = function(e) {
			this._setupContainer()
		};
		return a
	}(a);
	c.EqualToFrame = e;
	e.prototype.__class__ = "egret.EqualToFrame";
	b = function() {
		function e() {}
		e.prototype.init = function(e) {};
		e.prototype._apply = function(e, a, l) {};
		e.prototype.setEgretSize = function(e, a, l, b, n) {
			"undefined" === typeof n && (n = 0);
			c.StageDelegate.getInstance()._stageWidth = e;
			c.StageDelegate.getInstance()._stageHeight =
				a;
			e = document.getElementById(d.canvas_div_name);
			e.style.width = l + "px";
			e.style.height = b + "px";
			e.style.top = n + "px"
		};
		return e
	}();
	c.ContentStrategy = b;
	b.prototype.__class__ = "egret.ContentStrategy";
	var l = function(e) {
		function a(l) {
			"undefined" === typeof l && (l = 0);
			e.call(this);
			this.minWidth = l
		}
		__extends(a, e);
		a.prototype._apply = function(e, a, l) {
			a = document.documentElement.clientWidth;
			var b = document.documentElement.clientHeight,
				c = b / l,
				n = a / c,
				d = 1;
			0 != this.minWidth && (d = Math.min(1, n / this.minWidth));
			this.setEgretSize(n / d, l,
				a, b * d);
			e._scaleX = c * d;
			e._scaleY = c * d
		};
		return a
	}(b);
	c.FixedHeight = l;
	l.prototype.__class__ = "egret.FixedHeight";
	l = function(e) {
		function a(l) {
			"undefined" === typeof l && (l = 0);
			e.call(this);
			this.minHeight = l
		}
		__extends(a, e);
		a.prototype._apply = function(e, a, l) {
			l = document.documentElement.clientWidth;
			var b = document.documentElement.clientHeight,
				c = l / a,
				n = b / c,
				d = 1;
			0 != this.minHeight && (d = Math.min(1, n / this.minHeight));
			this.setEgretSize(a, n / d, l * d, b);
			e._scaleX = c * d;
			e._scaleY = c * d
		};
		return a
	}(b);
	c.FixedWidth = l;
	l.prototype.__class__ =
		"egret.FixedWidth";
	l = function(e) {
		function a(l, b) {
			e.call(this);
			this.width = l;
			this.height = b
		}
		__extends(a, e);
		a.prototype._apply = function(e, a, l) {
			l = this.width;
			var b = this.height,
				c = l / a;
			this.setEgretSize(a, b / c, l, b);
			e._scaleX = c;
			e._scaleY = c
		};
		return a
	}(b);
	c.FixedSize = l;
	l.prototype.__class__ = "egret.FixedSize";
	l = function(e) {
		function a() {
			e.call(this)
		}
		__extends(a, e);
		a.prototype._apply = function(e, a, l) {
			this.setEgretSize(a, l, a, l);
			e._scaleX = 1;
			e._scaleY = 1
		};
		return a
	}(b);
	c.NoScale = l;
	l.prototype.__class__ = "egret.NoScale";
	l = function(e) {
		function a() {
			e.call(this)
		}
		__extends(a, e);
		a.prototype._apply = function(e, a, l) {
			var b = document.documentElement.clientWidth,
				c = document.documentElement.clientHeight,
				b = b / a < c / l ? b / a : c / l,
				c = l * b;
			e._offSetY = Math.floor((document.documentElement.clientHeight - c) / 2);
			this.setEgretSize(a, l / 1, a * b * 1, c, e._offSetY);
			e._scaleX = 1 * b;
			e._scaleY = 1 * b
		};
		return a
	}(b);
	c.ShowAll = l;
	l.prototype.__class__ = "egret.ShowAll";
	b = function(e) {
		function a() {
			e.call(this)
		}
		__extends(a, e);
		a.prototype._apply = function(e, a, l) {
			var b = document.documentElement.clientWidth,
				c = document.documentElement.clientHeight,
				b = b / a,
				c = c / l;
			this.setEgretSize(a, l, a * b, l * c);
			e._scaleX = b;
			e._scaleY = c
		};
		return a
	}(b);
	c.FullScreen = b;
	b.prototype.__class__ = "egret.FullScreen"
})(egret || (egret = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a() {
			b.call(this);
			this._originalData = {};
			this._drawAreaList = []
		}
		__extends(a, b);
		a.getInstance = function() {
			null == a.instance && (a.instance = new a);
			return a.instance
		};
		a.prototype.addDrawArea = function(e) {
			this._drawAreaList.push(e)
		};
		a.prototype.clearDrawArea = function() {
			this._drawAreaList = []
		};
		a.prototype.drawImage = function(e, a, b, d, f, g, k, p, m, q) {
			k = k || 0;
			p = p || 0;
			var s = a._texture_to_render;
			if (null != s && 0 != g && 0 != f && 0 != m && 0 != q)
				if (a._worldBounds) {
					var r = this._originalData;
					r.sourceX =
						b;
					r.sourceY = d;
					r.sourceWidth = f;
					r.sourceHeight = g;
					r.destX = k;
					r.destY = p;
					r.destWidth = m;
					r.destHeight = q;
					for (var t = this.getDrawAreaList(), u = 0; u < t.length; u++) {
						var v = t[u];
						if (!this.ignoreRender(a, v, r.destX, r.destY)) {
							if (0 != this._drawAreaList.length)
								if (0 != a._worldTransform.b || 0 != a._worldTransform.c) {
									if (a._worldBounds.x + r.destX < v.x || a._worldBounds.y + r.destY < v.y || a._worldBounds.x + a._worldBounds.width + r.destX > v.x + v.width || a._worldBounds.y + a._worldBounds.height + r.destY > v.y + v.height) {
										c.Logger.fatal("\u8bf7\u4e0d\u8981\u8ba9\u5e26\u6709\u65cb\u8f6c\u548c\u659c\u5207\u7684\u663e\u793a\u5bf9\u8c61\u8de8\u8fc7\u91cd\u7ed8\u533a\u57df");
										break
									}
								} else {
									var x = a._worldTransform.a,
										y = a._worldTransform.d,
										w;
									a._worldBounds.x + r.destX < v.x && (w = (v.x - a._worldBounds.x) / x - r.destX, b += w / (m / f), f -= w / (m / f), m -= w, k += w);
									a._worldBounds.y + r.destY < v.y && (w = (v.y - a._worldBounds.y) / y - r.destY, d += w / (q / g), g -= w / (q / g), q -= w, p += w);
									a._worldBounds.x + a._worldBounds.width + r.destX > v.x + v.width && (w = (a._worldBounds.x + a._worldBounds.width - v.x - v.width) / x + r.destX, f -= w / (m / f), m -= w);
									a._worldBounds.y + a._worldBounds.height + r.destY > v.y + v.height && (w = (a._worldBounds.y + a._worldBounds.height -
										v.y - v.height) / y + r.destY, g -= w / (q / g), q -= w)
								}
							e.drawImage(s, b, d, f, g, k, p, m, q)
						}
					}
				} else e.drawImage(s, b, d, f, g, k, p, m, q)
		};
		a.prototype.ignoreRender = function(e, a, b, c) {
			var d = e._worldBounds;
			b *= e._worldTransform.a;
			c *= e._worldTransform.d;
			return d.x + d.width + b <= a.x || d.x + b >= a.x + a.width || d.y + d.height + c <= a.y || d.y + c >= a.y + a.height ? !0 : !1
		};
		a.prototype.getDrawAreaList = function() {
			var e;
			0 == this._drawAreaList.length ? (this._defaultDrawAreaList || (this._defaultDrawAreaList = [new c.Rectangle(0, 0, c.MainContext.instance.stage.stageWidth,
				c.MainContext.instance.stage.stageHeight)]), e = this._defaultDrawAreaList) : e = this._drawAreaList;
			return e
		};
		return a
	}(c.HashObject);
	c.RenderFilter = d;
	d.prototype.__class__ = "egret.RenderFilter"
})(egret || (egret = {}));
(function(c) {
	var d = function() {
		function b() {}
		b.mapClass = function(a, e, l) {
			"undefined" === typeof l && (l = "");
			a = this.getKey(a) + "#" + l;
			this.mapClassDic[a] = e
		};
		b.getKey = function(a) {
			return "string" == typeof a ? a : c.getQualifiedClassName(a)
		};
		b.mapValue = function(a, e, l) {
			"undefined" === typeof l && (l = "");
			a = this.getKey(a) + "#" + l;
			this.mapValueDic[a] = e
		};
		b.hasMapRule = function(a, e) {
			"undefined" === typeof e && (e = "");
			var l = this.getKey(a) + "#" + e;
			return this.mapValueDic[l] || this.mapClassDic[l] ? !0 : !1
		};
		b.getInstance = function(a, e) {
			"undefined" ===
				typeof e && (e = "");
			var l = this.getKey(a) + "#" + e;
			if (this.mapValueDic[l]) return this.mapValueDic[l];
			var b = this.mapClassDic[l];
			if (b) return b = new b, this.mapValueDic[l] = b, delete this.mapClassDic[l], b;
			throw Error("\u8c03\u7528\u4e86\u672a\u914d\u7f6e\u7684\u6ce8\u5165\u89c4\u5219:" + l + "\u3002 \u8bf7\u5148\u5728\u9879\u76ee\u521d\u59cb\u5316\u91cc\u914d\u7f6e\u6307\u5b9a\u7684\u6ce8\u5165\u89c4\u5219\uff0c\u518d\u8c03\u7528\u5bf9\u5e94\u5355\u4f8b\u3002");
		};
		b.mapClassDic = {};
		b.mapValueDic = {};
		return b
	}();
	c.Injector =
		d;
	d.prototype.__class__ = "egret.Injector"
})(egret || (egret = {}));
(function(c) {
	var d = function() {
		function b() {}
		b.NORMAL = "normal";
		b.ADD = "add";
		b.LAYER = "layer";
		return b
	}();
	c.BlendMode = d;
	d.prototype.__class__ = "egret.BlendMode"
})(egret || (egret = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a() {
			b.call(this);
			this._sizeDirty = this._normalDirty = !0;
			this._parent = null;
			this._cacheAsBitmap = !1;
			this._y = this._x = 0;
			this._scaleY = this._scaleX = 1;
			this._anchorY = this._anchorX = this._anchorOffsetY = this._anchorOffsetX = 0;
			this._visible = !0;
			this._rotation = 0;
			this._alpha = 1;
			this._skewY = this._skewX = 0;
			this._hasHeightSet = this._hasWidthSet = !1;
			this.worldAlpha = 1;
			this._rectH = this._rectW = 0;
			this._stage = null;
			this._worldTransform = new c.Matrix;
			this._cacheBounds = new c.Rectangle(0, 0, 0, 0)
		}
		__extends(a, b);
		a.prototype._setDirty = function() {
			this._normalDirty = !0
		};
		a.prototype.getDirty = function() {
			return this._normalDirty || this._sizeDirty
		};
		a.prototype._setParentSizeDirty = function() {
			var e = this._parent;
			!e || e._hasWidthSet || e._hasHeightSet || e._setSizeDirty()
		};
		a.prototype._setSizeDirty = function() {
			this._sizeDirty || (this._sizeDirty = !0, this._setDirty(), this._setParentSizeDirty())
		};
		a.prototype._clearDirty = function() {
			this._normalDirty = !1
		};
		a.prototype._clearSizeDirty = function() {
			this._sizeDirty = !1
		};
		Object.defineProperty(a.prototype,
			"parent", {
				get: function() {
					return this._parent
				},
				enumerable: !0,
				configurable: !0
			});
		a.prototype._parentChanged = function(e) {
			this._parent = e
		};
		Object.defineProperty(a.prototype, "x", {
			get: function() {
				return this._x
			},
			set: function(e) {
				this._setX(e)
			},
			enumerable: !0,
			configurable: !0
		});
		a.prototype._setX = function(e) {
			c.NumberUtils.isNumber(e) && this._x != e && (this._x = e, this._setDirty(), this._setParentSizeDirty())
		};
		Object.defineProperty(a.prototype, "y", {
			get: function() {
				return this._y
			},
			set: function(e) {
				this._setY(e)
			},
			enumerable: !0,
			configurable: !0
		});
		a.prototype._setY = function(e) {
			c.NumberUtils.isNumber(e) && this._y != e && (this._y = e, this._setDirty(), this._setParentSizeDirty())
		};
		Object.defineProperty(a.prototype, "scaleX", {
			get: function() {
				return this._scaleX
			},
			set: function(e) {
				c.NumberUtils.isNumber(e) && this._scaleX != e && (this._scaleX = e, this._setDirty(), this._setParentSizeDirty())
			},
			enumerable: !0,
			configurable: !0
		});
		Object.defineProperty(a.prototype, "scaleY", {
			get: function() {
				return this._scaleY
			},
			set: function(e) {
				c.NumberUtils.isNumber(e) &&
					this._scaleY != e && (this._scaleY = e, this._setDirty(), this._setParentSizeDirty())
			},
			enumerable: !0,
			configurable: !0
		});
		Object.defineProperty(a.prototype, "anchorOffsetX", {
			get: function() {
				return this._anchorOffsetX
			},
			set: function(e) {
				c.NumberUtils.isNumber(e) && this._anchorOffsetX != e && (this._anchorOffsetX = e, this._setDirty(), this._setParentSizeDirty())
			},
			enumerable: !0,
			configurable: !0
		});
		Object.defineProperty(a.prototype, "anchorOffsetY", {
			get: function() {
				return this._anchorOffsetY
			},
			set: function(e) {
				c.NumberUtils.isNumber(e) &&
					this._anchorOffsetY != e && (this._anchorOffsetY = e, this._setDirty(), this._setParentSizeDirty())
			},
			enumerable: !0,
			configurable: !0
		});
		Object.defineProperty(a.prototype, "anchorX", {
			get: function() {
				return this._anchorX
			},
			set: function(e) {
				c.NumberUtils.isNumber(e) && this._anchorX != e && (this._anchorX = e, this._setDirty(), this._setParentSizeDirty())
			},
			enumerable: !0,
			configurable: !0
		});
		Object.defineProperty(a.prototype, "anchorY", {
			get: function() {
				return this._anchorY
			},
			set: function(e) {
				c.NumberUtils.isNumber(e) && this._anchorY !=
					e && (this._anchorY = e, this._setDirty(), this._setParentSizeDirty())
			},
			enumerable: !0,
			configurable: !0
		});
		Object.defineProperty(a.prototype, "visible", {
			get: function() {
				return this._visible
			},
			set: function(e) {
				this._setVisible(e)
			},
			enumerable: !0,
			configurable: !0
		});
		a.prototype._setVisible = function(e) {
			this._visible != e && (this._visible = e, this._setSizeDirty())
		};
		Object.defineProperty(a.prototype, "rotation", {
			get: function() {
				return this._rotation
			},
			set: function(e) {
				c.NumberUtils.isNumber(e) && this._rotation != e && (this._rotation =
					e, this._setSizeDirty())
			},
			enumerable: !0,
			configurable: !0
		});
		Object.defineProperty(a.prototype, "alpha", {
			get: function() {
				return this._alpha
			},
			set: function(e) {
				c.NumberUtils.isNumber(e) && this._alpha != e && (this._alpha = e, this._setDirty())
			},
			enumerable: !0,
			configurable: !0
		});
		Object.defineProperty(a.prototype, "skewX", {
			get: function() {
				return this._skewX
			},
			set: function(e) {
				c.NumberUtils.isNumber(e) && this._skewX != e && (this._skewX = e, this._setSizeDirty())
			},
			enumerable: !0,
			configurable: !0
		});
		Object.defineProperty(a.prototype,
			"skewY", {
				get: function() {
					return this._skewY
				},
				set: function(e) {
					c.NumberUtils.isNumber(e) && this._skewY != e && (this._skewY = e, this._setSizeDirty())
				},
				enumerable: !0,
				configurable: !0
			});
		Object.defineProperty(a.prototype, "touchEnabled", {
			get: function() {
				return this._touchEnabled
			},
			set: function(e) {
				this._touchEnabled = e
			},
			enumerable: !0,
			configurable: !0
		});
		Object.defineProperty(a.prototype, "scrollRect", {
			get: function() {
				return this._scrollRect
			},
			set: function(e) {
				this._scrollRect = e;
				this._setSizeDirty()
			},
			enumerable: !0,
			configurable: !0
		});
		Object.defineProperty(a.prototype, "measuredWidth", {
			get: function() {
				return this._measureBounds().width
			},
			enumerable: !0,
			configurable: !0
		});
		Object.defineProperty(a.prototype, "measuredHeight", {
			get: function() {
				return this._measureBounds().height
			},
			enumerable: !0,
			configurable: !0
		});
		Object.defineProperty(a.prototype, "explicitWidth", {
			get: function() {
				return this._explicitWidth
			},
			enumerable: !0,
			configurable: !0
		});
		Object.defineProperty(a.prototype, "explicitHeight", {
			get: function() {
				return this._explicitHeight
			},
			enumerable: !0,
			configurable: !0
		});
		Object.defineProperty(a.prototype, "width", {
			get: function() {
				return this._getSize(c.Rectangle.identity).width
			},
			set: function(e) {
				this._setWidth(e)
			},
			enumerable: !0,
			configurable: !0
		});
		Object.defineProperty(a.prototype, "height", {
			get: function() {
				return this._getSize(c.Rectangle.identity).height
			},
			set: function(e) {
				this._setHeight(e)
			},
			enumerable: !0,
			configurable: !0
		});
		a.prototype._setWidth = function(e) {
			this._setSizeDirty();
			this._explicitWidth = e;
			this._hasWidthSet = c.NumberUtils.isNumber(e)
		};
		a.prototype._setHeight =
			function(e) {
				this._setSizeDirty();
				this._explicitHeight = e;
				this._hasHeightSet = c.NumberUtils.isNumber(e)
		};
		a.prototype._draw = function(e) {
			if (this._visible && !this.drawCacheTexture(e)) {
				e.setAlpha(this.worldAlpha, this.blendMode);
				e.setTransform(this._worldTransform);
				var a = this.mask || this._scrollRect;
				a && e.pushMask(a);
				this._render(e);
				a && e.popMask()
			}
			this.destroyCacheBounds()
		};
		a.prototype.drawCacheTexture = function(e) {
			if (this._cacheAsBitmap) {
				var a = this._texture_to_render,
					b = a._offsetX,
					d = a._offsetY,
					f = a._textureWidth,
					a = a._textureHeight;
				this._updateTransform();
				e.setAlpha(this.worldAlpha, this.blendMode);
				e.setTransform(this._worldTransform);
				var g = c.MainContext.instance.rendererContext.texture_scale_factor;
				c.RenderFilter.getInstance().drawImage(e, this, 0, 0, f * g, a * g, b, d, f, a);
				return !0
			}
			return !1
		};
		a.prototype._updateTransform = function() {
			this._calculateWorldform()
		};
		a.prototype._calculateWorldform = function() {
			this._worldTransform.identityMatrix(this._parent._worldTransform);
			var e = this._getOffsetPoint();
			this._worldTransform.appendTransform(this._x,
				this._y, this._scaleX, this._scaleY, this._rotation, this._skewX, this._skewY, e.x, e.y);
			this._scrollRect && this._worldTransform.append(1, 0, 0, 1, -this._scrollRect.x, -this._scrollRect.y);
			this.worldAlpha = this._parent.worldAlpha * this._alpha
		};
		a.prototype._render = function(e) {};
		a.prototype.getBounds = function(e) {
			var a = this._measureBounds(),
				b = this._hasWidthSet ? this._explicitWidth : a.width,
				d = this._hasHeightSet ? this._explicitHeight : a.height,
				f = a.x,
				a = a.y,
				g, k;
			0 != this._anchorX || 0 != this._anchorY ? (g = b * this._anchorX, k = d * this._anchorY) :
				(g = this._anchorOffsetX, k = this._anchorOffsetY);
			this._cacheBounds.initialize(f - g, a - k, b, d);
			b = this._cacheBounds;
			e || (e = new c.Rectangle);
			return e.initialize(b.x, b.y, b.width, b.height)
		};
		a.prototype.destroyCacheBounds = function() {
			this._cacheBounds.x = 0;
			this._cacheBounds.y = 0;
			this._cacheBounds.width = 0;
			this._cacheBounds.height = 0
		};
		a.prototype._getConcatenatedMatrix = function() {
			for (var e = a.identityMatrixForGetConcatenated.identity(), l = this; null != l;) {
				if (0 != l._anchorX || 0 != l._anchorY) {
					var b = l._getSize(c.Rectangle.identity);
					e.prependTransform(l._x, l._y, l._scaleX, l._scaleY, l._rotation, l._skewX, l._skewY, b.width * l._anchorX, b.height * l._anchorY)
				} else e.prependTransform(l._x, l._y, l._scaleX, l._scaleY, l._rotation, l._skewX, l._skewY, l._anchorOffsetX, l._anchorOffsetY);
				l = l._parent
			}
			return e
		};
		a.prototype.localToGlobal = function(e, a, b) {
			"undefined" === typeof e && (e = 0);
			"undefined" === typeof a && (a = 0);
			var d = this._getConcatenatedMatrix();
			d.append(1, 0, 0, 1, e, a);
			b || (b = new c.Point);
			b.x = d.tx;
			b.y = d.ty;
			return b
		};
		a.prototype.globalToLocal = function(e,
			a, b) {
			"undefined" === typeof e && (e = 0);
			"undefined" === typeof a && (a = 0);
			var d = this._getConcatenatedMatrix();
			d.invert();
			d.append(1, 0, 0, 1, e, a);
			b || (b = new c.Point);
			b.x = d.tx;
			b.y = d.ty;
			return b
		};
		a.prototype.hitTest = function(e, a, b) {
			"undefined" === typeof b && (b = !1);
			if (!this._visible || !b && !this._touchEnabled) return null;
			b = this._getSize(c.Rectangle.identity);
			return 0 <= e && e < b.width && 0 <= a && a < b.height ? this.mask || this._scrollRect ? this._scrollRect && e < this._scrollRect.width && a < this._scrollRect.height || this.mask && this.mask.x <=
				e && e < this.mask.x + this.mask.width && this.mask.y <= a && a < this.mask.y + this.mask.height ? this : null : this : null
		};
		a.prototype.hitTestPoint = function(e, a, b) {
			e = this.globalToLocal(e, a);
			return b ? (this._hitTestPointTexture || (this._hitTestPointTexture = new c.RenderTexture), b = this._hitTestPointTexture, b.drawToTexture(this), 0 != b.getPixel32(e.x - this._hitTestPointTexture._offsetX, e.y - this._hitTestPointTexture._offsetY)[3] ? !0 : !1) : !! this.hitTest(e.x, e.y, !0)
		};
		a.prototype._getMatrix = function() {
			var e = c.Matrix.identity.identity(),
				a = this._getOffsetPoint();
			e.appendTransform(this._x, this._y, this._scaleX, this._scaleY, this._rotation, this._skewX, this._skewY, a.x, a.y);
			return e
		};
		a.prototype._getSize = function(e) {
			return this._hasHeightSet && this._hasWidthSet ? e.initialize(0, 0, this._explicitWidth, this._explicitHeight) : this._measureSize(c.Rectangle.identity)
		};
		a.prototype._measureSize = function(e) {
			this._sizeDirty ? (e = this._measureBounds(), this._rectW = e.width, this._rectH = e.height, this._clearSizeDirty()) : (e.width = this._rectW, e.height = this._rectH);
			return e
		};
		a.prototype._measureBounds = function() {
			return c.Rectangle.identity.initialize(0, 0, 0, 0)
		};
		a.prototype._getOffsetPoint = function() {
			var e = this._anchorOffsetX,
				a = this._anchorOffsetY;
			if (0 != this._anchorX || 0 != this._anchorY) a = this._getSize(c.Rectangle.identity), e = this._anchorX * a.width, a = this._anchorY * a.height;
			var b = c.Point.identity;
			b.x = e;
			b.y = a;
			return b
		};
		a.prototype._onAddToStage = function() {
			this._stage = c.MainContext.instance.stage;
			c.DisplayObjectContainer.__EVENT__ADD_TO_STAGE_LIST.push(this)
		};
		a.prototype._onRemoveFromStage =
			function() {
				this._stage = null;
				c.DisplayObjectContainer.__EVENT__REMOVE_FROM_STAGE_LIST.push(this)
		};
		Object.defineProperty(a.prototype, "stage", {
			get: function() {
				return this._stage
			},
			enumerable: !0,
			configurable: !0
		});
		a.prototype.addEventListener = function(e, l, d, h, f) {
			"undefined" === typeof h && (h = !1);
			"undefined" === typeof f && (f = 0);
			b.prototype.addEventListener.call(this, e, l, d, h, f);
			((h = e == c.Event.ENTER_FRAME) || e == c.Event.RENDER) && this._insertEventBin(h ? a._enterFrameCallBackList : a._renderCallBackList, l, d, f)
		};
		a.prototype.removeEventListener =
			function(e, l, d, h) {
				"undefined" === typeof h && (h = !1);
				b.prototype.removeEventListener.call(this, e, l, d, h);
				((h = e == c.Event.ENTER_FRAME) || e == c.Event.RENDER) && this._removeEventBin(h ? a._enterFrameCallBackList : a._renderCallBackList, l, d)
		};
		a.prototype.dispatchEvent = function(a) {
			if (!a._bubbles) return b.prototype.dispatchEvent.call(this, a);
			for (var l = [], c = this; c;) l.push(c), c = c._parent;
			a._reset();
			this._dispatchPropagationEvent(a, l);
			return !a._isDefaultPrevented
		};
		a.prototype._dispatchPropagationEvent = function(a, b, c) {
			c =
				b.length;
			for (var d = 1, f = c - 1; 0 <= f; f--) {
				var g = b[f];
				a._currentTarget = g;
				a._target = this;
				a._eventPhase = d;
				g._notifyListener(a);
				if (a._isPropagationStopped || a._isPropagationImmediateStopped) return
			}
			g = b[0];
			a._currentTarget = g;
			a._target = this;
			a._eventPhase = 2;
			g._notifyListener(a);
			if (!a._isPropagationStopped && !a._isPropagationImmediateStopped)
				for (d = 3, f = 1; f < c && (g = b[f], a._currentTarget = g, a._target = this, a._eventPhase = d, g._notifyListener(a), !a._isPropagationStopped && !a._isPropagationImmediateStopped); f++);
		};
		a.prototype.willTrigger =
			function(a) {
				for (var b = this; b;) {
					if (b.hasEventListener(a)) return !0;
					b = b._parent
				}
				return !1
		};
		Object.defineProperty(a.prototype, "cacheAsBitmap", {
			get: function() {
				return this._cacheAsBitmap
			},
			set: function(a) {
				(this._cacheAsBitmap = a) ? (this.renderTexture || (this.renderTexture = new c.RenderTexture), this.renderTexture.drawToTexture(this), this._texture_to_render = this.renderTexture) : this._texture_to_render = null
			},
			enumerable: !0,
			configurable: !0
		});
		a.getTransformBounds = function(a, b) {
			var c, d, f = a.width,
				g = a.height,
				k = f * b.a,
				f =
					f * b.b,
				p = g * b.c,
				g = g * b.d,
				m = b.tx,
				q = b.ty,
				s = m,
				r = m,
				t = q,
				u = q;
			(c = k + m) < s ? s = c : c > r && (r = c);
			(c = k + p + m) < s ? s = c : c > r && (r = c);
			(c = p + m) < s ? s = c : c > r && (r = c);
			(d = f + q) < t ? t = d : d > u && (u = d);
			(d = f + g + q) < t ? t = d : d > u && (u = d);
			(d = g + q) < t ? t = d : d > u && (u = d);
			return a.initialize(s, t, r - s, u - t)
		};
		a.identityMatrixForGetConcatenated = new c.Matrix;
		a._enterFrameCallBackList = [];
		a._renderCallBackList = [];
		return a
	}(c.EventDispatcher);
	c.DisplayObject = d;
	d.prototype.__class__ = "egret.DisplayObject"
})(egret || (egret = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a() {
			b.call(this);
			this._touchChildren = !0;
			this._children = []
		}
		__extends(a, b);
		Object.defineProperty(a.prototype, "touchChildren", {
			get: function() {
				return this._touchChildren
			},
			set: function(a) {
				this._touchChildren = a
			},
			enumerable: !0,
			configurable: !0
		});
		Object.defineProperty(a.prototype, "numChildren", {
			get: function() {
				return this._children.length
			},
			enumerable: !0,
			configurable: !0
		});
		a.prototype.setChildIndex = function(a, b) {
			this.doSetChildIndex(a, b)
		};
		a.prototype.doSetChildIndex = function(a,
			b) {
			var d = this._children.indexOf(a);
			0 > d && c.Logger.fatal("child\u4e0d\u5728\u5f53\u524d\u5bb9\u5668\u5185");
			this._children.splice(d, 1);
			0 > b || this._children.length <= b ? this._children.push(a) : this._children.splice(b, 0, a)
		};
		a.prototype.addChild = function(a) {
			var b = this._children.length;
			a._parent == this && b--;
			return this._doAddChild(a, b)
		};
		a.prototype.addChildAt = function(a, b) {
			return this._doAddChild(a, b)
		};
		a.prototype._doAddChild = function(e, b, d) {
			"undefined" === typeof d && (d = !0);
			if (e == this) return e;
			if (0 > b || b > this._children.length) return c.Logger.fatal("\u63d0\u4f9b\u7684\u7d22\u5f15\u8d85\u51fa\u8303\u56f4"),
			e;
			var h = e._parent;
			if (h == this) return this.doSetChildIndex(e, b), e;
			h && h.removeChild(e);
			this._children.splice(b, 0, e);
			e._parentChanged(this);
			d && e.dispatchEventWith(c.Event.ADDED, !0);
			if (this._stage)
				for (e._onAddToStage(), b = a.__EVENT__ADD_TO_STAGE_LIST; 0 < b.length;) b.shift().dispatchEventWith(c.Event.ADDED_TO_STAGE);
			e._setDirty();
			this._setSizeDirty();
			return e
		};
		a.prototype.removeChild = function(a) {
			a = this._children.indexOf(a);
			if (0 <= a) return this._doRemoveChild(a);
			c.Logger.fatal("child\u672a\u88abaddChild\u5230\u8be5parent");
			return null
		};
		a.prototype.removeChildAt = function(a) {
			if (0 <= a && a < this._children.length) return this._doRemoveChild(a);
			c.Logger.fatal("\u63d0\u4f9b\u7684\u7d22\u5f15\u8d85\u51fa\u8303\u56f4");
			return null
		};
		a.prototype._doRemoveChild = function(e, b) {
			"undefined" === typeof b && (b = !0);
			var d = this._children,
				h = d[e];
			b && h.dispatchEventWith(c.Event.REMOVED, !0);
			if (this._stage) {
				h._onRemoveFromStage();
				for (var f = a.__EVENT__REMOVE_FROM_STAGE_LIST; 0 < f.length;) f.shift().dispatchEventWith(c.Event.REMOVED_FROM_STAGE)
			}
			h._parentChanged(null);
			d.splice(e, 1);
			this._setSizeDirty();
			return h
		};
		a.prototype.getChildAt = function(a) {
			if (0 <= a && a < this._children.length) return this._children[a];
			c.Logger.fatal("\u63d0\u4f9b\u7684\u7d22\u5f15\u8d85\u51fa\u8303\u56f4");
			return null
		};
		a.prototype.contains = function(a) {
			for (; a;) {
				if (a == this) return !0;
				a = a._parent
			}
			return !1
		};
		a.prototype.swapChildrenAt = function(a, b) {
			0 <= a && a < this._children.length && 0 <= b && b < this._children.length ? this._swapChildrenAt(a, b) : c.Logger.fatal("\u63d0\u4f9b\u7684\u7d22\u5f15\u8d85\u51fa\u8303\u56f4")
		};
		a.prototype.swapChildren = function(a, b) {
			var d = this._children.indexOf(a),
				h = this._children.indexOf(b); - 1 == d || -1 == h ? c.Logger.fatal("child\u672a\u88abaddChild\u5230\u8be5parent") : this._swapChildrenAt(d, h)
		};
		a.prototype._swapChildrenAt = function(a, b) {
			if (a != b) {
				var c = this._children,
					d = c[a];
				c[a] = c[b];
				c[b] = d
			}
		};
		a.prototype.getChildIndex = function(a) {
			return this._children.indexOf(a)
		};
		a.prototype.removeChildren = function() {
			for (var a = this._children.length - 1; 0 <= a; a--) this._doRemoveChild(a)
		};
		a.prototype._updateTransform =
			function() {
				if (this._visible) {
					b.prototype._updateTransform.call(this);
					for (var a = 0, l = this._children.length; a < l; a++) this._children[a]._updateTransform()
				}
		};
		a.prototype._render = function(a) {
			for (var b = 0, c = this._children.length; b < c; b++) this._children[b]._draw(a)
		};
		a.prototype._measureBounds = function() {
			for (var a = 0, b = 0, d = 0, h = 0, f = this._children.length, g = 0; g < f; g++) {
				var k = this._children[g],
					p;
				if (k._visible && (p = c.DisplayObject.getTransformBounds(k._getSize(c.Rectangle.identity), k._getMatrix()))) {
					var k = p.x,
						m = p.y,
						q = p.width + p.x,
						s = p.height + p.y;
					if (k < a || 0 == g) a = k;
					if (q > b || 0 == g) b = q;
					if (m < d || 0 == g) d = m;
					if (s > h || 0 == g) h = s
				}
			}
			return c.Rectangle.identity.initialize(a, d, b - a, h - d)
		};
		a.prototype.hitTest = function(a, l, d) {
			"undefined" === typeof d && (d = !1);
			var h;
			if (!this._visible) return null;
			if (this._scrollRect) {
				if (0 > a || 0 > l || a > this._scrollRect.width || l > this._scrollRect.height) return null
			} else if (this.mask && (this.mask.x > a || a > this.mask.x + this.mask.width || this.mask.y > l || l > this.mask.y + this.mask.height)) return null;
			for (var f = this._children,
					g = this._touchChildren, k = f.length - 1; 0 <= k; k--) {
				var p = f[k],
					m = p,
					q = m._getOffsetPoint(),
					s = m._x,
					r = m._y;
				this._scrollRect && (s -= this._scrollRect.x, r -= this._scrollRect.y);
				m = c.Matrix.identity.identity().prependTransform(s, r, m._scaleX, m._scaleY, m._rotation, 0, 0, q.x, q.y);
				m.invert();
				m = c.Matrix.transformCoords(m, a, l);
				if (p = p.hitTest(m.x, m.y, !0)) {
					if (!g) return this;
					if (p._touchEnabled && g) return p;
					h = this
				}
			}
			return h ? h : this._texture_to_render || this.graphics ? b.prototype.hitTest.call(this, a, l, d) : null
		};
		a.prototype._onAddToStage =
			function() {
				b.prototype._onAddToStage.call(this);
				for (var a = this._children.length, l = 0; l < a; l++) this._children[l]._onAddToStage()
		};
		a.prototype._onRemoveFromStage = function() {
			b.prototype._onRemoveFromStage.call(this);
			for (var a = this._children.length, l = 0; l < a; l++) this._children[l]._onRemoveFromStage()
		};
		a.prototype.getChildByName = function(a) {
			for (var b = this._children, c = b.length, d, f = 0; f < c; f++)
				if (d = b[f], d.name == a) return d;
			return null
		};
		a.__EVENT__ADD_TO_STAGE_LIST = [];
		a.__EVENT__REMOVE_FROM_STAGE_LIST = [];
		return a
	}(c.DisplayObject);
	c.DisplayObjectContainer = d;
	d.prototype.__class__ = "egret.DisplayObjectContainer"
})(egret || (egret = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a(a, l) {
			"undefined" === typeof a && (a = 480);
			"undefined" === typeof l && (l = 800);
			b.call(this);
			this.touchEnabled = !0;
			this._stage = this;
			this._stageWidth = a;
			this._stageHeight = l
		}
		__extends(a, b);
		a.prototype.invalidate = function() {
			a._invalidateRenderFlag = !0
		};
		Object.defineProperty(a.prototype, "scaleMode", {
			get: function() {
				return this._scaleMode
			},
			set: function(a) {
				if (this._scaleMode != a) {
					this._scaleMode = a;
					var b = {};
					b[c.StageScaleMode.NO_SCALE] = new c.NoScale;
					b[c.StageScaleMode.SHOW_ALL] =
						new c.ShowAll;
					b[c.StageScaleMode.NO_BORDER] = new c.FixedWidth;
					b[c.StageScaleMode.EXACT_FIT] = new c.FullScreen;
					a = b[a];
					if (!a) throw Error("\u4f7f\u7528\u4e86\u5c1a\u672a\u5b9e\u73b0\u7684ScaleMode");
					b = new c.EqualToFrame;
					a = new c.ResolutionPolicy(b, a);
					c.StageDelegate.getInstance()._setResolutionPolicy(a);
					this._stageWidth = c.StageDelegate.getInstance()._stageWidth;
					this._stageHeight = c.StageDelegate.getInstance()._stageHeight;
					this.dispatchEventWith(c.Event.RESIZE)
				}
			},
			enumerable: !0,
			configurable: !0
		});
		Object.defineProperty(a.prototype,
			"stageWidth", {
				get: function() {
					return this._stageWidth
				},
				enumerable: !0,
				configurable: !0
			});
		Object.defineProperty(a.prototype, "stageHeight", {
			get: function() {
				return this._stageHeight
			},
			enumerable: !0,
			configurable: !0
		});
		a.prototype.hitTest = function(a, b) {
			if (!this._touchEnabled) return null;
			var d;
			if (!this._touchChildren) return this;
			for (var h = this._children, f = h.length - 1; 0 <= f; f--) {
				var g = d = h[f],
					k = g._getOffsetPoint(),
					g = c.Matrix.identity.identity().prependTransform(g._x, g._y, g._scaleX, g._scaleY, g._rotation, 0, 0, k.x, k.y);
				g.invert();
				g = c.Matrix.transformCoords(g, a, b);
				if ((d = d.hitTest(g.x, g.y, !0)) && d._touchEnabled) return d
			}
			return this
		};
		a.prototype.getBounds = function(a) {
			a || (a = new c.Rectangle);
			return a.initialize(0, 0, this._stageWidth, this._stageHeight)
		};
		a.prototype._updateTransform = function() {
			for (var a = 0, b = this._children.length; a < b; a++) this._children[a]._updateTransform()
		};
		a._invalidateRenderFlag = !1;
		return a
	}(c.DisplayObjectContainer);
	c.Stage = d;
	d.prototype.__class__ = "egret.Stage"
})(egret || (egret = {}));
(function(c) {
	var d = function() {
		function b() {}
		b.NO_BORDER = "noBorder";
		b.NO_SCALE = "noScale";
		b.SHOW_ALL = "showAll";
		b.EXACT_FIT = "exactFit";
		return b
	}();
	c.StageScaleMode = d;
	d.prototype.__class__ = "egret.StageScaleMode"
})(egret || (egret = {}));
(function(c) {
	var d = function() {
		function b() {}
		b.REPEAT = "repeat";
		b.SCALE = "scale";
		return b
	}();
	c.BitmapFillMode = d;
	d.prototype.__class__ = "egret.BitmapFillMode"
})(egret || (egret = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a(a) {
			b.call(this);
			this.debug = !1;
			this.debugColor = 16711680;
			this.fillMode = "scale";
			a && (this._texture = a, this._setSizeDirty())
		}
		__extends(a, b);
		Object.defineProperty(a.prototype, "texture", {
			get: function() {
				return this._texture
			},
			set: function(a) {
				a != this._texture && (this._setSizeDirty(), this._texture = a)
			},
			enumerable: !0,
			configurable: !0
		});
		a.prototype._render = function(e) {
			var b = this._texture;
			b ? (this._texture_to_render = b, a._drawBitmap(e, this._hasWidthSet ? this._explicitWidth : b._textureWidth,
				this._hasHeightSet ? this._explicitHeight : b._textureHeight, this)) : this._texture_to_render = null
		};
		a._drawBitmap = function(e, b, d, h) {
			var f = h._texture_to_render;
			if (f) {
				var g = f._textureWidth,
					k = f._textureHeight;
				if ("scale" == h.fillMode) {
					var p = h.scale9Grid || f.scale9Grid;
					if (p && g - p.width < b && k - p.height < d) a.drawScale9GridImage(e, h, p, b, d);
					else {
						var p = f._offsetX,
							m = f._offsetY,
							q = f._bitmapWidth || g,
							s = f._bitmapHeight || k;
						b /= g;
						p = Math.round(p * b);
						b = Math.round(q * b);
						d /= k;
						m = Math.round(m * d);
						d = Math.round(s * d);
						c.RenderFilter.getInstance().drawImage(e,
							h, f._bitmapX, f._bitmapY, q, s, p, m, b, d)
					}
				} else a.drawRepeatImage(e, h, b, d)
			}
		};
		a.drawRepeatImage = function(a, b, d, h) {
			var f = b._texture_to_render;
			if (f)
				for (var g = f._textureWidth, k = f._textureHeight, p = f._bitmapX, m = f._bitmapY, q = f._bitmapWidth || g, s = f._bitmapHeight || k, r = f._offsetX, f = f._offsetY, t = c.RenderFilter.getInstance(); r < d; r += g)
					for (var u = f; u < h; u += k) {
						var v = Math.min(q, d - r),
							x = Math.min(s, h - u);
						t.drawImage(a, b, p, m, v, x, r, u, v, x)
					}
		};
		a.drawScale9GridImage = function(a, b, d, h, f) {
			var g = b._texture_to_render;
			if (g && d) {
				var k = c.RenderFilter.getInstance(),
					p = g._textureWidth,
					m = g._textureHeight,
					q = g._bitmapX,
					s = g._bitmapY,
					r = g._bitmapWidth || p,
					t = g._bitmapHeight || m,
					u = g._offsetX,
					g = g._offsetY;
				d = c.Rectangle.identity.initialize(d.x - Math.round(u), d.y - Math.round(u), d.width, d.height);
				u = Math.round(u);
				g = Math.round(g);
				h -= p - r;
				f -= m - t;
				d.y == d.bottom && (d.bottom < t ? d.bottom++ : d.y--);
				d.x == d.right && (d.right < r ? d.right++ : d.x--);
				var p = q + d.x,
					m = q + d.right,
					v = r - d.right,
					x = s + d.y,
					y = s + d.bottom,
					w = t - d.bottom,
					z = u + d.x,
					A = g + d.y,
					t = f - (t - d.bottom),
					r = h - (r - d.right);
				k.drawImage(a, b, q, s, d.x, d.y, u, g,
					d.x, d.y);
				k.drawImage(a, b, p, s, d.width, d.y, z, g, r - d.x, d.y);
				k.drawImage(a, b, m, s, v, d.y, u + r, g, h - r, d.y);
				k.drawImage(a, b, q, x, d.x, d.height, u, A, d.x, t - d.y);
				k.drawImage(a, b, p, x, d.width, d.height, z, A, r - d.x, t - d.y);
				k.drawImage(a, b, m, x, v, d.height, u + r, A, h - r, t - d.y);
				k.drawImage(a, b, q, y, d.x, w, u, g + t, d.x, f - t);
				k.drawImage(a, b, p, y, d.width, w, z, g + t, r - d.x, f - t);
				k.drawImage(a, b, m, y, v, w, u + r, g + t, h - r, f - t)
			}
		};
		a.prototype._measureBounds = function() {
			var a = this._texture;
			return a ? c.Rectangle.identity.initialize(a._offsetX, a._offsetY, a._textureWidth,
				a._textureHeight) : b.prototype._measureBounds.call(this)
		};
		a.debug = !1;
		return a
	}(c.DisplayObject);
	c.Bitmap = d;
	d.prototype.__class__ = "egret.Bitmap"
})(egret || (egret = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a() {
			b.call(this);
			this._text = "";
			this._textChanged = !1;
			this._bitmapPool = []
		}
		__extends(a, b);
		Object.defineProperty(a.prototype, "text", {
			get: function() {
				return this._text
			},
			set: function(a) {
				this._textChanged = !0;
				this._text = a
			},
			enumerable: !0,
			configurable: !0
		});
		a.prototype._updateTransform = function() {
			this.visible && (this._textChanged && this._renderText(), b.prototype._updateTransform.call(this))
		};
		a.prototype._renderText = function(a) {
			var b = a = 0;
			this._textChanged && this.removeChildren();
			for (var d = 0, h = this.text.length; d < h; d++) {
				var f = this.text.charAt(d),
					g = this.spriteSheet.getTexture(f);
				if (null == g) {}
				else {
					var f = g._offsetX,
						k = g._offsetY,
						p = g._textureWidth;
					if (this._textChanged) {
						var m = this._bitmapPool[d];
						m || (m = new c.Bitmap, this._bitmapPool.push(m));
						m.texture = g;
						this.addChild(m);
						m.x = a
					}
					a += p + f;
					k + g._textureHeight > b && (b = k + g._textureHeight)
				}
			}
			this._textChanged = !1;
			return c.Rectangle.identity.initialize(0, 0, a, b)
		};
		a.prototype._measureBounds =
			function() {
				return this._renderText(!0)
		};
		return a
	}(c.DisplayObjectContainer);
	c.BitmapText = d;
	d.prototype.__class__ = "egret.BitmapText"
})(egret || (egret = {}));
(function(c) {
	var d = function() {
		function b() {
			this._lastY = this._lastX = this._maxY = this._maxX = this._minY = this._minX = 0;
			this.commandQueue = []
		}
		b.prototype.beginFill = function(a, e) {};
		b.prototype._setStyle = function(a) {};
		b.prototype.drawRect = function(a, e, b, c) {
			this.checkRect(a, e, b, c)
		};
		b.prototype.drawCircle = function(a, e, b) {
			this.checkRect(a - b, e - b, 2 * b, 2 * b)
		};
		b.prototype.drawRoundRect = function(a, e, b, c, d, f) {
			this.checkRect(a, e, b, c)
		};
		b.prototype.drawEllipse = function(a, e, b, c) {
			this.checkRect(a - b, e - c, 2 * b, 2 * c)
		};
		b.prototype.lineStyle =
			function(a, e, b, c, d, f, g, k) {};
		b.prototype.lineTo = function(a, e) {
			this.checkPoint(a, e)
		};
		b.prototype.curveTo = function(a, e, b, c) {
			this.checkPoint(a, e);
			this.checkPoint(b, c)
		};
		b.prototype.moveTo = function(a, e) {
			this.checkPoint(a, e)
		};
		b.prototype.clear = function() {
			this._maxY = this._maxX = this._minY = this._minX = 0
		};
		b.prototype.endFill = function() {};
		b.prototype._draw = function(a) {};
		b.prototype.checkRect = function(a, e, b, c) {
			this._minX = Math.min(this._minX, a);
			this._minY = Math.min(this._minY, e);
			this._maxX = Math.max(this._maxX, a +
				b);
			this._maxY = Math.max(this._maxY, e + c)
		};
		b.prototype.checkPoint = function(a, e) {
			this._minX = Math.min(this._minX, a);
			this._minY = Math.min(this._minY, e);
			this._maxX = Math.max(this._maxX, a);
			this._maxY = Math.max(this._maxY, e);
			this._lastX = a;
			this._lastY = e
		};
		return b
	}();
	c.Graphics = d;
	d.prototype.__class__ = "egret.Graphics";
	(function() {
		return function(b, a, e) {
			this.method = b;
			this.thisObject = a;
			this.args = e
		}
	})().prototype.__class__ = "Command"
})(egret || (egret = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a() {
			b.call(this)
		}
		__extends(a, b);
		Object.defineProperty(a.prototype, "graphics", {
			get: function() {
				this._graphics || (this._graphics = new c.Graphics);
				return this._graphics
			},
			enumerable: !0,
			configurable: !0
		});
		a.prototype._render = function(a) {
			this._graphics && this._graphics._draw(a)
		};
		return a
	}(c.DisplayObject);
	c.Shape = d;
	d.prototype.__class__ = "egret.Shape"
})(egret || (egret = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a() {
			b.call(this)
		}
		__extends(a, b);
		Object.defineProperty(a.prototype, "graphics", {
			get: function() {
				this._graphics || (this._graphics = new c.Graphics);
				return this._graphics
			},
			enumerable: !0,
			configurable: !0
		});
		a.prototype._render = function(a) {
			this._graphics && this._graphics._draw(a);
			b.prototype._render.call(this, a)
		};
		return a
	}(c.DisplayObjectContainer);
	c.Sprite = d;
	d.prototype.__class__ = "egret.Sprite"
})(egret || (egret = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a() {
			b.call(this);
			this._fontFamily = "Arial";
			this._size = 30;
			this._textColorString = "#FFFFFF";
			this._textColor = 16777215;
			this._strokeColorString = "#000000";
			this._stroke = this._strokeColor = 0;
			this._textAlign = "left";
			this._verticalAlign = "top";
			this._numLines = this._lineSpacing = 0;
			this.measuredWidths = []
		}
		__extends(a, b);
		Object.defineProperty(a.prototype, "text", {
			get: function() {
				return this._text
			},
			set: function(a) {
				this._setText(a)
			},
			enumerable: !0,
			configurable: !0
		});
		a.prototype._setTextDirty =
			function() {
				this._setSizeDirty()
		};
		a.prototype._setText = function(a) {
			this._text != a && (this._setTextDirty(), this._text = a)
		};
		Object.defineProperty(a.prototype, "fontFamily", {
			get: function() {
				return this._fontFamily
			},
			set: function(a) {
				this._setFontFamily(a)
			},
			enumerable: !0,
			configurable: !0
		});
		a.prototype._setFontFamily = function(a) {
			this._fontFamily != a && (this._setTextDirty(), this._fontFamily = a)
		};
		Object.defineProperty(a.prototype, "size", {
			get: function() {
				return this._size
			},
			set: function(a) {
				this._setSize(a)
			},
			enumerable: !0,
			configurable: !0
		});
		a.prototype._setSize = function(a) {
			this._size != a && (this._setTextDirty(), this._size = a)
		};
		Object.defineProperty(a.prototype, "italic", {
			get: function() {
				return this._italic
			},
			set: function(a) {
				this._setItalic(a)
			},
			enumerable: !0,
			configurable: !0
		});
		a.prototype._setItalic = function(a) {
			this._italic != a && (this._setTextDirty(), this._italic = a)
		};
		Object.defineProperty(a.prototype, "bold", {
			get: function() {
				return this._bold
			},
			set: function(a) {
				this._setBold(a)
			},
			enumerable: !0,
			configurable: !0
		});
		a.prototype._setBold =
			function(a) {
				this._bold != a && (this._setTextDirty(), this._bold = a)
		};
		Object.defineProperty(a.prototype, "textColor", {
			get: function() {
				return this._textColor
			},
			set: function(a) {
				this._setTextColor(a)
			},
			enumerable: !0,
			configurable: !0
		});
		a.prototype._setTextColor = function(a) {
			this._textColor != a && (this._setTextDirty(), this._textColor = a, this._textColorString = c.toColorString(a))
		};
		Object.defineProperty(a.prototype, "strokeColor", {
			get: function() {
				return this._strokeColor
			},
			set: function(a) {
				this._setStrokeColor(a)
			},
			enumerable: !0,
			configurable: !0
		});
		a.prototype._setStrokeColor = function(a) {
			this._strokeColor != a && (this._setTextDirty(), this._strokeColor = a, this._strokeColorString = c.toColorString(a))
		};
		Object.defineProperty(a.prototype, "stroke", {
			get: function() {
				return this._stroke
			},
			set: function(a) {
				this._setStroke(a)
			},
			enumerable: !0,
			configurable: !0
		});
		a.prototype._setStroke = function(a) {
			this._stroke != a && (this._setTextDirty(), this._stroke = a)
		};
		Object.defineProperty(a.prototype, "textAlign", {
			get: function() {
				return this._textAlign
			},
			set: function(a) {
				this._setTextAlign(a)
			},
			enumerable: !0,
			configurable: !0
		});
		a.prototype._setTextAlign = function(a) {
			this._textAlign != a && (this._setTextDirty(), this._textAlign = a)
		};
		Object.defineProperty(a.prototype, "verticalAlign", {
			get: function() {
				return this._verticalAlign
			},
			set: function(a) {
				this._setVerticalAlign(a)
			},
			enumerable: !0,
			configurable: !0
		});
		a.prototype._setVerticalAlign = function(a) {
			this._verticalAlign != a && (this._setTextDirty(), this._verticalAlign = a)
		};
		Object.defineProperty(a.prototype, "lineSpacing", {
			get: function() {
				return this._lineSpacing
			},
			set: function(a) {
				this._setLineSpacing(a)
			},
			enumerable: !0,
			configurable: !0
		});
		a.prototype._setLineSpacing = function(a) {
			this._lineSpacing != a && (this._setTextDirty(), this._lineSpacing = a)
		};
		Object.defineProperty(a.prototype, "numLines", {
			get: function() {
				return this._numLines
			},
			enumerable: !0,
			configurable: !0
		});
		a.prototype._render = function(a) {
			this.drawText(a, !1);
			this._clearDirty()
		};
		a.prototype._measureBounds = function() {
			return this.drawText(c.MainContext.instance.rendererContext, !0)
		};
		a.prototype.drawText = function(a,
			b) {
			var d = this.getTextLines(a);
			if (!d) return c.Rectangle.identity.initialize(0, 0, 0, 0);
			var h = d.length,
				f = 0.5 * this._size,
				g = this._size + this._lineSpacing,
				k = h * g - this._lineSpacing;
			this._textHeight = k;
			var p = this._hasHeightSet ? this._explicitHeight : Number.POSITIVE_INFINITY;
			if (this._hasHeightSet && k < p) {
				var m = 0;
				this._verticalAlign == c.VerticalAlign.MIDDLE ? m = 0.5 : this._verticalAlign == c.VerticalAlign.BOTTOM && (m = 1);
				f += m * (p - k)
			}
			var m = f = Math.round(f),
				q = 0;
			this._textAlign == c.HorizontalAlign.CENTER ? q = 0.5 : this._textAlign == c.HorizontalAlign.RIGHT &&
				(q = 1);
			var s = this.measuredWidths,
				r;
			r = this._hasWidthSet ? this._explicitWidth : this._textWidth;
			for (var t = Number.POSITIVE_INFINITY, u = 0; u < h; u++) {
				var v = d[u],
					x = Math.round((r - s[u]) * q);
				x < t && (t = x);
				!b && f < p && a.drawText(this, v, x, f, r);
				f += g
			}
			return c.Rectangle.identity.initialize(t, m, r, k)
		};
		a.prototype.getTextLines = function(a) {
			var b = this._text ? this._text.toString() : "";
			if (!b) return null;
			var c = this.measuredWidths;
			c.length = 0;
			a.setupFont(this);
			var b = b.split(/(?:\r\n|\r|\n)/),
				d = b.length,
				f = 0;
			if (this._hasWidthSet)
				for (var g =
					this._explicitWidth, k = 0; k < d; k++) {
					var p = b[k],
						m = a.measureText(p);
					if (m > g) {
						for (var q = "", s = 0, r = p.length, t = 0; t < r; t++) {
							var u = p.charAt(t),
								m = a.measureText(u);
							s + m > g && (0 == s ? (b.splice(k, 0, u), c[k] = m, f < m && (f = m), m = 0, u = "") : (b.splice(k, 0, q), c[k] = s, f < s && (f = s), q = "", s = 0), k++, d++);
							s += m;
							q += u
						}
						b[k] = q;
						c[k] = s
					} else c[k] = m, f < m && (f = m)
				} else
					for (k = 0; k < d; k++) p = b[k], m = a.measureText(p), c[k] = m, f < m && (f = m);
			this._textWidth = f;
			return b
		};
		return a
	}(c.DisplayObject);
	c.TextField = d;
	d.prototype.__class__ = "egret.TextField"
})(egret || (egret = {}));
(function(c) {
	var d = function() {
		function b() {}
		b.DYNAMIC = "dynamic";
		b.INPUT = "input";
		return b
	}();
	c.TextFieldType = d;
	d.prototype.__class__ = "egret.TextFieldType"
})(egret || (egret = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a(a) {
			b.call(this);
			var c = a.bitmapData;
			this.bitmapData = c;
			this._textureMap = {};
			this._sourceWidth = c.width;
			this._sourceHeight = c.height;
			this._bitmapX = a._bitmapX - a._offsetX;
			this._bitmapY = a._bitmapY - a._offsetY
		}
		__extends(a, b);
		a.prototype.getTexture = function(a) {
			return this._textureMap[a]
		};
		a.prototype.createTexture = function(a, b, d, h, f, g, k, p, m) {
			"undefined" === typeof g && (g = 0);
			"undefined" === typeof k && (k = 0);
			"undefined" === typeof p && (p = g + h);
			"undefined" === typeof m && (m = k + f);
			var q =
				new c.Texture;
			q._bitmapData = this.bitmapData;
			q._bitmapX = this._bitmapX + b;
			q._bitmapY = this._bitmapY + d;
			q._bitmapWidth = h;
			q._bitmapHeight = f;
			q._offsetX = g;
			q._offsetY = k;
			q._textureWidth = p;
			q._textureHeight = m;
			q._sourceWidth = this._sourceWidth;
			q._sourceHeight = this._sourceHeight;
			return this._textureMap[a] = q
		};
		return a
	}(c.HashObject);
	c.SpriteSheet = d;
	d.prototype.__class__ = "egret.SpriteSheet"
})(egret || (egret = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a() {
			b.call(this);
			this._isFocus = !1;
			this._size = 30;
			this._textColorString = "#FFFFFF";
			this._textColor = 16777215;
			this._fontFamily = "Arial";
			this._multiline = !1;
			this._text = new c.TextField;
			this.addChild(this._text);
			this._text.size = 30;
			this.stageText = c.StageText.create();
			var a = this.localToGlobal();
			this.stageText._open(a.x, a.y, this._explicitWidth, this._explicitHeight)
		}
		__extends(a, b);
		a.prototype._onAddToStage = function() {
			b.prototype._onAddToStage.call(this);
			this.graphics.beginFill(16777215,
				0);
			this.graphics.drawRect(0, 0, this.width, this.height);
			this.graphics.endFill();
			this.touchEnabled = !0;
			this.stageText._addListeners();
			this.stageText.addEventListener("blur", this.onBlurHandler, this);
			this.stageText.addEventListener("focus", this.onFocusHandler, this);
			this.stageText.addEventListener("updateText", this.updateTextHandler, this);
			this.addEventListener(c.TouchEvent.TOUCH_BEGIN, this.onMouseDownHandler, this);
			c.MainContext.instance.stage.addEventListener(c.TouchEvent.TOUCH_BEGIN, this.onStageDownHandler,
				this)
		};
		a.prototype.onFocusHandler = function(a) {
			this.hideText()
		};
		a.prototype.onBlurHandler = function(a) {
			this.showText()
		};
		a.prototype.onMouseDownHandler = function(a) {
			a.stopPropagation();
			this.stageText._show()
		};
		a.prototype.onStageDownHandler = function(a) {
			this.stageText._hide();
			this.showText()
		};
		a.prototype.showText = function() {
			this._isFocus && (this._isFocus = !1, this._text.visible = !0, this.resetText())
		};
		a.prototype.hideText = function() {
			this._isFocus || (this._text.visible = !1, this._isFocus = !0)
		};
		a.prototype._onRemoveFromStage =
			function() {
				b.prototype._onRemoveFromStage.call(this);
				this.stageText._remove();
				this.stageText._removeListeners();
				this.stageText.removeEventListener("blur", this.onBlurHandler, this);
				this.stageText.removeEventListener("focus", this.onFocusHandler, this);
				this.stageText.removeEventListener("updateText", this.updateTextHandler, this);
				this.removeEventListener(c.TouchEvent.TOUCH_BEGIN, this.onMouseDownHandler, this);
				c.MainContext.instance.stage.removeEventListener(c.TouchEvent.TOUCH_BEGIN, this.onStageDownHandler,
					this)
		};
		a.prototype.updateTextHandler = function(a) {
			this.resetText()
		};
		a.prototype.setText = function(a) {
			c.Logger.warning("TextInput.setText()\u5df2\u5e9f\u5f03\uff0c\u8bf7\u4f7f\u7528TextInput.text\u8bbe\u7f6e");
			this.stageText._setText(a);
			this.resetText()
		};
		a.prototype.getText = function() {
			c.Logger.warning("TextInput.getText()\u5df2\u5e9f\u5f03\uff0c\u8bf7\u4f7f\u7528TextInput.text\u83b7\u53d6");
			return this.stageText._getText()
		};
		Object.defineProperty(a.prototype, "text", {
			get: function() {
				return this.stageText._getText()
			},
			set: function(a) {
				this.stageText._setText(a);
				this.resetText()
			},
			enumerable: !0,
			configurable: !0
		});
		a.prototype.setTextType = function(a) {
			this.stageText._setTextType(a);
			this.resetText()
		};
		a.prototype.getTextType = function() {
			return this.stageText._getTextType()
		};
		a.prototype.resetText = function() {
			if ("password" == this.getTextType()) {
				this._text.text = "";
				for (var a = 0, b = this.stageText._getText().length; a < b; a++) this._text.text += "*"
			} else this._text.text = this.stageText._getText()
		};
		a.prototype._updateTransform = function() {
			var a =
				this._worldTransform.a,
				c = this._worldTransform.b,
				d = this._worldTransform.c,
				h = this._worldTransform.d,
				f = this._worldTransform.tx,
				g = this._worldTransform.ty;
			b.prototype._updateTransform.call(this);
			var k = this._worldTransform;
			if (a != k.a || c != k.b || d != k.c || h != k.d || f != k.tx || g != k.ty) a = this.localToGlobal(), this.stageText.changePosition(a.x, a.y), this.stageText.changeSize(this._explicitWidth, this._explicitHeight)
		};
		a.prototype._draw = function(a) {
			b.prototype._draw.call(this, a);
			this.stageText._draw()
		};
		Object.defineProperty(a.prototype,
			"size", {
				get: function() {
					return this._size
				},
				set: function(a) {
					this._size != a && (this._size = a, this._text.size = a, this.stageText.setSize(this._size))
				},
				enumerable: !0,
				configurable: !0
			});
		Object.defineProperty(a.prototype, "textColor", {
			get: function() {
				return this._textColor
			},
			set: function(a) {
				this._textColor != a && (this._textColor = a, this._textColorString = c.toColorString(a), this._text.textColor = a, this.stageText.setTextColor(this._textColorString))
			},
			enumerable: !0,
			configurable: !0
		});
		Object.defineProperty(a.prototype, "fontFamily", {
			get: function() {
				return this._fontFamily
			},
			set: function(a) {
				this._setFontFamily(a)
			},
			enumerable: !0,
			configurable: !0
		});
		a.prototype._setFontFamily = function(a) {
			this._fontFamily != a && (this._fontFamily = a, this.stageText.setTextFontFamily(a))
		};
		a.prototype._setWidth = function(a) {
			this._text.width = a;
			this.stageText.setWidth(a);
			b.prototype._setWidth.call(this, a)
		};
		a.prototype._setHeight = function(a) {
			this._text.height = a;
			this.stageText.setHeight(a);
			b.prototype._setHeight.call(this, a)
		};
		a.prototype._setMultiline = function(a) {
			this._multiline =
				a;
			this.stageText._setMultiline(a)
		};
		Object.defineProperty(a.prototype, "multiline", {
			get: function() {
				return this._multiline
			},
			set: function(a) {
				this._setMultiline(a)
			},
			enumerable: !0,
			configurable: !0
		});
		return a
	}(c.Sprite);
	c.TextInput = d;
	d.prototype.__class__ = "egret.TextInput"
})(egret || (egret = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a(a, c) {
			b.call(this, a);
			this.charList = this.parseConfig(c)
		}
		__extends(a, b);
		a.prototype.getTexture = function(a) {
			var b = this._textureMap[a];
			if (!b) {
				b = this.charList[a];
				if (!b) return null;
				b = this.createTexture(a, b.x, b.y, b.width, b.height, b.offsetX, b.offsetY);
				this._textureMap[a] = b
			}
			return b
		};
		a.prototype.parseConfig = function(a) {
			a = a.split("\r\n").join("\n");
			a = a.split("\n");
			for (var b = this.getConfigByKey(a[3], "count"), c = {}, d = 4; d < 4 + b; d++) {
				var f = a[d],
					g = String.fromCharCode(this.getConfigByKey(f,
						"id")),
					k = {};
				c[g] = k;
				k.x = this.getConfigByKey(f, "x");
				k.y = this.getConfigByKey(f, "y");
				k.width = this.getConfigByKey(f, "width");
				k.height = this.getConfigByKey(f, "height");
				k.offsetX = this.getConfigByKey(f, "xoffset");
				k.offsetY = this.getConfigByKey(f, "yoffset")
			}
			return c
		};
		a.prototype.getConfigByKey = function(a, b) {
			for (var c = a.split(" "), d = 0, f = c.length; d < f; d++) {
				var g = c[d];
				if (b == g.substring(0, b.length)) return c = g.substring(b.length + 1), parseInt(c)
			}
			return 0
		};
		return a
	}(c.SpriteSheet);
	c.BitmapTextSpriteSheet = d;
	d.prototype.__class__ =
		"egret.BitmapTextSpriteSheet"
})(egret || (egret = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(a) {
		function e(e, d) {
			a.call(this);
			this.frameRate = 60;
			e instanceof b ? (c.Logger.warning("MovieClip#constructor\u63a5\u53e3\u53c2\u6570\u5df2\u7ecf\u53d8\u66f4\uff0c\u8bf7\u5c3d\u5feb\u8c03\u6574\u7528\u6cd5\u4e3a new MovieClip(data,texture)"), this.delegate = e) : this.delegate = new b(e, d);
			this.delegate.setMovieClip(this)
		}
		__extends(e, a);
		e.prototype.gotoAndPlay = function(a) {
			this.delegate.gotoAndPlay(a)
		};
		e.prototype.gotoAndStop = function(a) {
			this.delegate.gotoAndStop(a)
		};
		e.prototype.stop =
			function() {
				this.delegate.stop()
		};
		e.prototype.dispose = function() {
			this.delegate.dispose()
		};
		e.prototype.release = function() {
			c.Logger.warning("MovieClip#release\u65b9\u6cd5\u5373\u5c06\u5e9f\u5f03");
			this.dispose()
		};
		e.prototype.getCurrentFrameIndex = function() {
			c.Logger.warning("MovieClip#getCurrentFrameIndex\u65b9\u6cd5\u5373\u5c06\u5e9f\u5f03");
			return this.delegate._currentFrameIndex
		};
		e.prototype.getTotalFrame = function() {
			c.Logger.warning("MovieClip#getTotalFrame\u65b9\u6cd5\u5373\u5c06\u5e9f\u5f03");
			return this.delegate._totalFrame
		};
		e.prototype.setInterval = function(a) {
			c.Logger.warning("MovieClip#setInterval\u65b9\u6cd5\u5373\u5c06\u5e9f\u5f03,\u8bf7\u4f7f\u7528MovieClip#frameRate\u4ee3\u66ff");
			this.frameRate = 60 / a
		};
		e.prototype.getIsPlaying = function() {
			c.Logger.warning("MovieClip#getIsPlaying\u65b9\u6cd5\u5373\u5c06\u5e9f\u5f03");
			return this.delegate.isPlaying
		};
		return e
	}(c.DisplayObjectContainer);
	c.MovieClip = d;
	d.prototype.__class__ = "egret.MovieClip";
	var b = function() {
		function a(a, b) {
			this.data = a;
			this._currentFrameIndex = this._passTime =
				this._totalFrame = 0;
			this._isPlaying = !1;
			this._frameData = a;
			this._spriteSheet = new c.SpriteSheet(b)
		}
		a.prototype.setMovieClip = function(a) {
			this.movieClip = a;
			this.bitmap = new c.Bitmap;
			this.movieClip.addChild(this.bitmap)
		};
		a.prototype.gotoAndPlay = function(a) {
			this.checkHasFrame(a);
			this._isPlaying = !0;
			this._currentFrameIndex = 0;
			this._currentFrameName = a;
			this._totalFrame = this._frameData.frames[a].totalFrame;
			this.playNextFrame();
			this._passTime = 0;
			c.Ticker.getInstance().register(this.update, this)
		};
		a.prototype.gotoAndStop =
			function(a) {
				this.checkHasFrame(a);
				this.stop();
				this._currentFrameIndex = this._passTime = 0;
				this._currentFrameName = a;
				this._totalFrame = this._frameData.frames[a].totalFrame;
				this.playNextFrame()
		};
		a.prototype.stop = function() {
			this._isPlaying = !1;
			c.Ticker.getInstance().unregister(this.update, this)
		};
		a.prototype.dispose = function() {};
		a.prototype.checkHasFrame = function(a) {
			void 0 == this._frameData.frames[a] && c.Logger.fatal("MovieClip\u6ca1\u6709\u5bf9\u5e94\u7684frame\uff1a", a)
		};
		a.prototype.update = function(a) {
			for (var b =
				1E3 / this.movieClip.frameRate, b = Math.floor((this._passTime % b + a) / b); 1 <= b;) 1 == b ? this.playNextFrame() : this.playNextFrame(!1), b--;
			this._passTime += a
		};
		a.prototype.playNextFrame = function(a) {
			"undefined" === typeof a && (a = !0);
			var b = this._frameData.frames[this._currentFrameName].childrenFrame[this._currentFrameIndex];
			if (a) {
				a = this.getTexture(b.res);
				var c = this.bitmap;
				c.x = b.x;
				c.y = b.y;
				c.texture = a
			}
			null != b.action && this.movieClip.dispatchEventWith(b.action);
			this._currentFrameIndex++;
			this._currentFrameIndex == this._totalFrame &&
				(this._currentFrameIndex = 0)
		};
		a.prototype.getTexture = function(a) {
			var b = this._frameData.res[a],
				c = this._spriteSheet.getTexture(a);
			c || (c = this._spriteSheet.createTexture(a, b.x, b.y, b.w, b.h));
			return c
		};
		return a
	}();
	c.DefaultMovieClipDelegate = b;
	b.prototype.__class__ = "egret.DefaultMovieClipDelegate"
})(egret || (egret = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a() {
			b.call(this);
			this._multiline = !1;
			this._maxChars = 0
		}
		__extends(a, b);
		a.prototype._getText = function() {
			return null
		};
		a.prototype._setText = function(a) {};
		a.prototype._setTextType = function(a) {};
		a.prototype._getTextType = function() {
			return null
		};
		a.prototype._open = function(a, b, c, d) {};
		a.prototype._show = function() {};
		a.prototype._remove = function() {};
		a.prototype._hide = function() {};
		a.prototype._draw = function() {};
		a.prototype._addListeners = function() {};
		a.prototype._removeListeners =
			function() {};
		a.prototype.changePosition = function(a, b) {};
		a.prototype.changeSize = function(a, b) {};
		a.prototype.setSize = function(a) {};
		a.prototype.setTextColor = function(a) {};
		a.prototype.setTextFontFamily = function(a) {};
		a.prototype.setWidth = function(a) {};
		a.prototype.setHeight = function(a) {};
		a.prototype._setMultiline = function(a) {
			this._multiline = a
		};
		a.create = function() {
			return null
		};
		return a
	}(c.EventDispatcher);
	c.StageText = d;
	d.prototype.__class__ = "egret.StageText"
})(egret || (egret = {}));
(function(c) {
	var d = function() {
		function b() {}
		b.GET = "get";
		b.POST = "post";
		return b
	}();
	c.URLRequestMethod = d;
	d.prototype.__class__ = "egret.URLRequestMethod"
})(egret || (egret = {}));
(function(c) {
	var d = function() {
		function b() {}
		b.BINARY = "binary";
		b.TEXT = "text";
		b.VARIABLES = "variables";
		b.TEXTURE = "texture";
		b.SOUND = "sound";
		return b
	}();
	c.URLLoaderDataFormat = d;
	d.prototype.__class__ = "egret.URLLoaderDataFormat"
})(egret || (egret = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a(a) {
			"undefined" === typeof a && (a = null);
			b.call(this);
			null !== a && this.decode(a)
		}
		__extends(a, b);
		a.prototype.decode = function(a) {
			this.variables || (this.variables = {});
			a = a.split("+").join(" ");
			for (var b, c = /[?&]?([^=]+)=([^&]*)/g; b = c.exec(a);) this.variables[decodeURIComponent(b[1])] = decodeURIComponent(b[2])
		};
		a.prototype.toString = function() {
			if (!this.variables) return "";
			var a = this.variables,
				b = "",
				c = !0,
				d;
			for (d in a) c ? c = !1 : b += "&", b += d + "=" + a[d];
			return b
		};
		return a
	}(c.HashObject);
	c.URLVariables = d;
	d.prototype.__class__ = "egret.URLVariables"
})(egret || (egret = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a(a) {
			"undefined" === typeof a && (a = null);
			b.call(this);
			this.method = c.URLRequestMethod.GET;
			this.url = a
		}
		__extends(a, b);
		return a
	}(c.HashObject);
	c.URLRequest = d;
	d.prototype.__class__ = "egret.URLRequest"
})(egret || (egret = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a(a) {
			"undefined" === typeof a && (a = null);
			b.call(this);
			this.dataFormat = c.URLLoaderDataFormat.TEXT;
			a && this.load(a)
		}
		__extends(a, b);
		a.prototype.load = function(a) {
			this._request = a;
			this.data = null;
			c.MainContext.instance.netContext.proceed(this)
		};
		return a
	}(c.EventDispatcher);
	c.URLLoader = d;
	d.prototype.__class__ = "egret.URLLoader"
})(egret || (egret = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a() {
			b.call(this);
			this._textureHeight = this._textureWidth = this._offsetY = this._offsetX = this._bitmapHeight = this._bitmapWidth = this._bitmapY = this._bitmapX = 0
		}
		__extends(a, b);
		Object.defineProperty(a.prototype, "textureWidth", {
			get: function() {
				return this._textureWidth
			},
			enumerable: !0,
			configurable: !0
		});
		Object.defineProperty(a.prototype, "textureHeight", {
			get: function() {
				return this._textureHeight
			},
			enumerable: !0,
			configurable: !0
		});
		Object.defineProperty(a.prototype, "bitmapData", {
			get: function() {
				return this._bitmapData
			},
			enumerable: !0,
			configurable: !0
		});
		a.prototype._setBitmapData = function(a) {
			var b = c.MainContext.instance.rendererContext.texture_scale_factor;
			this._bitmapData = a;
			this._sourceWidth = a.width;
			this._sourceHeight = a.height;
			this._textureWidth = this._sourceWidth * b;
			this._textureHeight = this._sourceHeight * b;
			this._bitmapWidth = this._textureWidth;
			this._bitmapHeight = this._textureHeight;
			this._offsetX = this._offsetY = this._bitmapX = this._bitmapY = 0
		};
		a.prototype.getPixel32 = function(a, b) {
			return this._bitmapData.getContext("2d").getImageData(a,
				b, 1, 1).data
		};
		return a
	}(c.HashObject);
	c.Texture = d;
	d.prototype.__class__ = "egret.Texture"
})(egret || (egret = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a() {
			b.call(this);
			this._bitmapData = document.createElement("canvas");
			this.renderContext = c.RendererContext.createRendererContext(this._bitmapData)
		}
		__extends(a, b);
		a.prototype.drawToTexture = function(a) {
			var b = this._bitmapData,
				d = a.getBounds(c.Rectangle.identity);
			b.width = d.width;
			b.height = d.height;
			a._worldTransform.identity();
			a.worldAlpha = 1;
			if (a instanceof c.DisplayObjectContainer) {
				this._offsetX = d.x;
				this._offsetY = d.y;
				a._worldTransform.append(1, 0, 0, 1, -d.x, -d.y);
				for (var b =
					a._children, d = 0, h = b.length; d < h; d++) b[d]._updateTransform()
			}
			b = c.RenderFilter.getInstance();
			d = b._drawAreaList.concat();
			b._drawAreaList.length = 0;
			this.renderContext.clearScreen();
			this.webGLTexture = null;
			(h = a.mask || a._scrollRect) && this.renderContext.pushMask(h);
			a._render(this.renderContext);
			h && this.renderContext.popMask();
			b._drawAreaList = d;
			this._textureWidth = this._bitmapData.width;
			this._textureHeight = this._bitmapData.height;
			this._sourceWidth = this._textureWidth;
			this._sourceHeight = this._textureHeight
		};
		return a
	}(c.Texture);
	c.RenderTexture = d;
	d.prototype.__class__ = "egret.RenderTexture"
})(egret || (egret = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a() {
			b.call(this);
			this.renderCost = 0;
			this.texture_scale_factor = 1
		}
		__extends(a, b);
		a.prototype.clearScreen = function() {};
		a.prototype.clearRect = function(a, b, c, d) {};
		a.prototype.drawImage = function(a, b, d, h, f, g, k, p, m) {
			c.Profiler.getInstance().onDrawImage()
		};
		a.prototype.setTransform = function(a) {};
		a.prototype.setAlpha = function(a, b) {};
		a.prototype.setupFont = function(a) {};
		a.prototype.measureText = function(a) {
			return 0
		};
		a.prototype.drawText = function(a, b, d, h, f) {
			c.Profiler.getInstance().onDrawImage()
		};
		a.prototype.strokeRect = function(a, b, c, d, f) {};
		a.prototype.pushMask = function(a) {};
		a.prototype.popMask = function() {};
		a.prototype.onRenderStart = function() {};
		a.prototype.onRenderFinish = function() {};
		a.createRendererContext = function(a) {
			return null
		};
		return a
	}(c.HashObject);
	c.RendererContext = d;
	d.prototype.__class__ = "egret.RendererContext"
})(egret || (egret = {}));
(function(c) {
	var d = function() {
		function b() {}
		b.MOUSE = "mouse";
		b.TOUCH = "touch";
		b.mode = "touch";
		return b
	}();
	c.InteractionMode = d;
	d.prototype.__class__ = "egret.InteractionMode"
})(egret || (egret = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a() {
			b.call(this);
			this._currentTouchTarget = {};
			this.maxTouches = 2;
			this.touchDownTarget = {};
			this.touchingIdentifiers = [];
			this.lastTouchY = this.lastTouchX = -1
		}
		__extends(a, b);
		a.prototype.run = function() {};
		a.prototype.getTouchData = function(a, b, c) {
			var d = this._currentTouchTarget[a];
			null == d && (d = {}, this._currentTouchTarget[a] = d);
			d.stageX = b;
			d.stageY = c;
			d.identifier = a;
			return d
		};
		a.prototype.dispatchEvent = function(a, b) {
			c.TouchEvent.dispatchTouchEvent(b.target, a, b.identifier, b.stageX,
				b.stageY, !1, !1, !1, !0 == this.touchDownTarget[b.identifier])
		};
		a.prototype.onTouchBegan = function(a, b, d) {
			if (this.touchingIdentifiers.length != this.maxTouches) {
				var h = c.MainContext.instance.stage.hitTest(a, b);
				h && (a = this.getTouchData(d, a, b), this.touchDownTarget[d] = !0, a.target = h, a.beginTarget = h, this.dispatchEvent(c.TouchEvent.TOUCH_BEGIN, a));
				this.touchingIdentifiers.push(d)
			}
		};
		a.prototype.onTouchMove = function(a, b, d) {
			if (-1 != this.touchingIdentifiers.indexOf(d) && (a != this.lastTouchX || b != this.lastTouchY)) {
				this.lastTouchX =
					a;
				this.lastTouchY = b;
				var h = c.MainContext.instance.stage.hitTest(a, b);
				h && (a = this.getTouchData(d, a, b), a.target = h, this.dispatchEvent(c.TouchEvent.TOUCH_MOVE, a))
			}
		};
		a.prototype.onTouchEnd = function(a, b, d) {
			var h = this.touchingIdentifiers.indexOf(d); - 1 != h && (this.touchingIdentifiers.splice(h, 1), h = c.MainContext.instance.stage.hitTest(a, b)) && (a = this.getTouchData(d, a, b), delete this.touchDownTarget[d], d = a.beginTarget, a.target = h, this.dispatchEvent(c.TouchEvent.TOUCH_END, a), d == h ? this.dispatchEvent(c.TouchEvent.TOUCH_TAP,
				a) : a.beginTarget && (a.target = a.beginTarget, this.dispatchEvent(c.TouchEvent.TOUCH_RELEASE_OUTSIDE, a)), delete this._currentTouchTarget[a.identifier])
		};
		return a
	}(c.HashObject);
	c.TouchContext = d;
	d.prototype.__class__ = "egret.TouchContext"
})(egret || (egret = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a() {
			b.call(this)
		}
		__extends(a, b);
		a.prototype.proceed = function(a) {};
		a._getUrl = function(a) {
			var b = a.url; - 1 == b.indexOf("?") && a.method == c.URLRequestMethod.GET && a.data && a.data instanceof c.URLVariables && (b = b + "?" + a.data.toString());
			return b
		};
		return a
	}(c.HashObject);
	c.NetContext = d;
	d.prototype.__class__ = "egret.NetContext"
})(egret || (egret = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a() {
			b.call(this);
			this.frameRate = 60
		}
		__extends(a, b);
		a.prototype.executeMainLoop = function(a, b) {};
		return a
	}(c.HashObject);
	c.DeviceContext = d;
	d.prototype.__class__ = "egret.DeviceContext"
})(egret || (egret = {}));
(function(c) {
	var d = function() {
		function b() {}
		b.call = function(a, e) {};
		b.addCallback = function(a, e) {};
		return b
	}();
	c.ExternalInterface = d;
	d.prototype.__class__ = "egret.ExternalInterface"
})(egret || (egret = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a() {
			b.call(this);
			this.translate = this.isHD ? function(a) {
				return "translate3d(" + a.x + "px, " + (a.y - c.MainContext.instance.stage.stageHeight) + "px, 0) "
			} : function(a) {
				return "translate(" + a.x + "px, " + a.y + "px) "
			};
			this.rotate = this.isHD ? function(a) {
				return "rotateZ(" + a + "deg) "
			} : function(a) {
				return "rotate(" + a + "deg) "
			};
			this.ua = navigator.userAgent.toLowerCase();
			var a = this.ua.match(/micromessenger|qqbrowser|mqqbrowser|ucbrowser|360browser|baidubrowser|maxthon|ie|opera|firefox/) || this.ua.match(/chrome|safari/);
			a && 0 < a.length && (a = a[0], "micromessenger" == a && (this.type = "wechat"), this.type = a);
			this.type = "unknow";
			switch (this.type) {
				case "firefox":
					this.pfx = "Moz";
					this.isHD = !0;
					break;
				case "chrome":
				case "safari":
					this.pfx = "webkit";
					this.isHD = !0;
					break;
				case "opera":
					this.pfx = "O";
					this.isHD = !1;
					break;
				case "ie":
					this.pfx = "ms";
					this.isHD = !1;
					break;
				default:
					this.pfx = "webkit", this.isHD = !0
			}
			this.trans = this.pfx + "Transform"
		}
		__extends(a, b);
		a.getInstance = function() {
			null == a.instance && (a.instance = new a);
			return a.instance
		};
		Object.defineProperty(a.prototype,
			"isMobile", {
				get: function() {
					c.Logger.warning("Browser.isMobile\u63a5\u53e3\u53c2\u6570\u5df2\u7ecf\u53d8\u66f4\uff0c\u8bf7\u5c3d\u5feb\u8c03\u6574\u7528\u6cd5\u4e3a egret.MainContext.deviceType == egret.MainContext.DEVICE_MOBILE ");
					return c.MainContext.deviceType == c.MainContext.DEVICE_MOBILE
				},
				enumerable: !0,
				configurable: !0
			});
		a.prototype.$new = function(a) {
			return this.$(document.createElement(a))
		};
		a.prototype.$ = function(e) {
			var b = document;
			if (e = e instanceof HTMLElement ? e : b.querySelector(e)) e.find = e.find ||
				this.$, e.hasClass = e.hasClass || function(a) {
					return this.className.match(new RegExp("(\\s|^)" + a + "(\\s|$)"))
			}, e.addClass = e.addClass || function(a) {
				this.hasClass(a) || (this.className && (this.className += " "), this.className += a);
				return this
			}, e.removeClass = e.removeClass || function(a) {
				this.hasClass(a) && (this.className = this.className.replace(a, ""));
				return this
			}, e.remove = e.remove || function() {}, e.appendTo = e.appendTo || function(a) {
				a.appendChild(this);
				return this
			}, e.prependTo = e.prependTo || function(a) {
				a.childNodes[0] ?
					a.insertBefore(this, a.childNodes[0]) : a.appendChild(this);
				return this
			}, e.transforms = e.transforms || function() {
				this.style[a.getInstance().trans] = a.getInstance().translate(this.position) + a.getInstance().rotate(this.rotation) + a.getInstance().scale(this.scale) + a.getInstance().skew(this.skew);
				return this
			}, e.position = e.position || {
				x: 0,
				y: 0
			}, e.rotation = e.rotation || 0, e.scale = e.scale || {
				x: 1,
				y: 1
			}, e.skew = e.skew || {
				x: 0,
				y: 0
			}, e.translates = function(a, e) {
				this.position.x = a;
				this.position.y = e - c.MainContext.instance.stage.stageHeight;
				this.transforms();
				return this
			}, e.rotate = function(a) {
				this.rotation = a;
				this.transforms();
				return this
			}, e.resize = function(a, e) {
				this.scale.x = a;
				this.scale.y = e;
				this.transforms();
				return this
			}, e.setSkew = function(a, e) {
				this.skew.x = a;
				this.skew.y = e;
				this.transforms();
				return this
			};
			return e
		};
		a.prototype.scale = function(a) {
			return "scale(" + a.x + ", " + a.y + ") "
		};
		a.prototype.skew = function(a) {
			return "skewX(" + -a.x + "deg) skewY(" + a.y + "deg)"
		};
		return a
	}(c.HashObject);
	c.Browser = d;
	d.prototype.__class__ = "egret.Browser"
})(egret || (egret = {}));
(function(c) {
	(function(c) {
		c.getItem = function(b) {
			return null
		};
		c.setItem = function(b, a) {};
		c.removeItem = function(b) {};
		c.clear = function() {}
	})(c.localStorage || (c.localStorage = {}))
})(egret || (egret = {}));
(function(c) {
	var d = function() {
		function b() {}
		b.parse = function(a) {
			a = c.SAXParser.getInstance().parserXML(a);
			if (!a || !a.childNodes) return null;
			for (var e = a.childNodes.length, d = !1, n = 0; n < e; n++) {
				var h = a.childNodes[n];
				if (1 == h.nodeType) {
					d = !0;
					break
				}
			}
			return d ? b.parseNode(h) : null
		};
		b.parseNode = function(a) {
			if (!a || 1 != a.nodeType) return null;
			var e = {};
			e.localName = a.localName;
			e.name = a.nodeName;
			a.namespaceURI && (e.namespace = a.namespaceURI);
			a.prefix && (e.prefix = a.prefix);
			for (var c = a.attributes, d = c.length, h = 0; h < d; h++) {
				var f =
					c[h],
					g = f.name;
				0 != g.indexOf("xmlns:") && (e["$" + g] = f.value)
			}
			c = a.childNodes;
			d = c.length;
			for (h = 0; h < d; h++)
				if (f = b.parseNode(c[h])) e.children || (e.children = []), f.parent = e, e.children.push(f);!e.children && (a = a.textContent.trim()) && (e.text = a);
			return e
		};
		b.findChildren = function(a, e, c) {
			c ? c.length = 0 : c = [];
			b.findByPath(a, e, c);
			return c
		};
		b.findByPath = function(a, e, c) {
			var d = e.indexOf("."),
				h; - 1 == d ? (h = e, d = !0) : (h = e.substring(0, d), e = e.substring(d + 1), d = !1);
			if (a = a.children)
				for (var f = a.length, g = 0; g < f; g++) {
					var k = a[g];
					k.localName ==
						h && (d ? c.push(k) : b.findByPath(k, e, c))
				}
		};
		b.getAttributes = function(a, e) {
			e ? e.length = 0 : e = [];
			for (var b in a) "$" == b.charAt(0) && e.push(b.substring(1));
			return e
		};
		return b
	}();
	c.XML = d;
	d.prototype.__class__ = "egret.XML"
})(egret || (egret = {}));
(function(c) {
	var d = function() {
		function a() {}
		a.LITTLE_ENDIAN = "LITTLE_ENDIAN";
		a.BIG_ENDIAN = "BIG_ENDIAN";
		return a
	}();
	c.Endian = d;
	d.prototype.__class__ = "egret.Endian";
	var b = function() {
		function a() {
			this.length = this.position = 0;
			this._mode = "";
			this.maxlength = 0;
			this._endian = d.LITTLE_ENDIAN;
			this.isLittleEndian = !1;
			this._mode = "Typed array";
			this.maxlength = 4;
			this.arraybytes = new ArrayBuffer(this.maxlength);
			this.unalignedarraybytestemp = new ArrayBuffer(16);
			this.endian = a.DEFAULT_ENDIAN
		}
		Object.defineProperty(a.prototype,
			"endian", {
				get: function() {
					return this._endian
				},
				set: function(a) {
					this._endian = a;
					this.isLittleEndian = a == d.LITTLE_ENDIAN
				},
				enumerable: !0,
				configurable: !0
			});
		a.prototype.ensureWriteableSpace = function(a) {
			this.ensureSpace(a + this.position)
		};
		a.prototype.setArrayBuffer = function(a) {
			this.ensureSpace(a.byteLength);
			this.length = a.byteLength;
			a = new Int8Array(a);
			(new Int8Array(this.arraybytes, 0, this.length)).set(a);
			this.position = 0
		};
		Object.defineProperty(a.prototype, "bytesAvailable", {
			get: function() {
				return this.length - this.position
			},
			enumerable: !0,
			configurable: !0
		});
		a.prototype.ensureSpace = function(a) {
			if (a > this.maxlength) {
				a = a + 255 & -256;
				var b = new ArrayBuffer(a),
					c = new Uint8Array(this.arraybytes, 0, this.length);
				(new Uint8Array(b, 0, this.length)).set(c);
				this.arraybytes = b;
				this.maxlength = a
			}
		};
		a.prototype.writeByte = function(a) {
			this.ensureWriteableSpace(1);
			(new Int8Array(this.arraybytes))[this.position++] = ~~a;
			this.position > this.length && (this.length = this.position)
		};
		a.prototype.readByte = function() {
			if (this.position >= this.length) throw "ByteArray out of bounds read. Positon=" +
				this.position + ", Length=" + this.length;
			return (new Int8Array(this.arraybytes))[this.position++]
		};
		a.prototype.readBytes = function(a, b, c) {
			"undefined" === typeof b && (b = 0);
			"undefined" === typeof c && (c = 0);
			null == c && (c = a.length);
			a.ensureWriteableSpace(b + c);
			var d = new Int8Array(a.arraybytes),
				f = new Int8Array(this.arraybytes);
			d.set(f.subarray(this.position, this.position + c), b);
			this.position += c;
			c + b > a.length && (a.length += c + b - a.length)
		};
		a.prototype.writeUnsignedByte = function(a) {
			this.ensureWriteableSpace(1);
			(new Uint8Array(this.arraybytes))[this.position++] = ~~a & 255;
			this.position > this.length && (this.length = this.position)
		};
		a.prototype.readUnsignedByte = function() {
			if (this.position >= this.length) throw "ByteArray out of bounds read. Positon=" + this.position + ", Length=" + this.length;
			return (new Uint8Array(this.arraybytes))[this.position++]
		};
		a.prototype.writeUnsignedShort = function(a) {
			this.ensureWriteableSpace(2);
			if (0 == (this.position & 1)) {
				var b = new Uint16Array(this.arraybytes);
				b[this.position >> 1] = ~~a & 65535
			} else b = new Uint16Array(this.unalignedarraybytestemp, 0, 1), b[0] = ~~a & 65535, a = new Uint8Array(this.arraybytes, this.position, 2), b = new Uint8Array(this.unalignedarraybytestemp, 0, 2), a.set(b);
			this.position += 2;
			this.position > this.length && (this.length = this.position)
		};
		a.prototype.readUTFBytes = function(a) {
			var b = "";
			a = this.position + a;
			for (var c = new DataView(this.arraybytes); this.position < a;) {
				var d = c.getUint8(this.position++);
				if (128 > d) {
					if (0 == d) break;
					b += String.fromCharCode(d)
				} else if (224 > d) b += String.fromCharCode((d & 63) << 6 | c.getUint8(this.position++) & 127);
				else if (240 > d) var f = c.getUint8(this.position++),
				b = b + String.fromCharCode((d & 31) << 12 | (f & 127) << 6 | c.getUint8(this.position++) & 127);
				else var f = c.getUint8(this.position++),
				g = c.getUint8(this.position++), b = b + String.fromCharCode((d & 15) << 18 | (f & 127) << 12 | g << 6 & 127 | c.getUint8(this.position++) & 127)
			}
			return b
		};
		a.prototype.readInt = function() {
			var a = (new DataView(this.arraybytes)).getInt32(this.position, this.isLittleEndian);
			this.position += 4;
			return a
		};
		a.prototype.readShort = function() {
			var a = (new DataView(this.arraybytes)).getInt16(this.position, this.isLittleEndian);
			this.position += 2;
			return a
		};
		a.prototype.readDouble = function() {
			var a = (new DataView(this.arraybytes)).getFloat64(this.position, this.isLittleEndian);
			this.position += 8;
			return a
		};
		a.prototype.readUnsignedShort = function() {
			if (this.position > this.length + 2) throw "ByteArray out of bounds read. Position=" + this.position + ", Length=" + this.length;
			if (0 == (this.position & 1)) {
				var a = new Uint16Array(this.arraybytes),
					b = this.position >> 1;
				this.position += 2;
				return a[b]
			}
			a = new Uint16Array(this.unalignedarraybytestemp, 0, 1);
			b = new Uint8Array(this.arraybytes,
				this.position, 2);
			(new Uint8Array(this.unalignedarraybytestemp, 0, 2)).set(b);
			this.position += 2;
			return a[0]
		};
		a.prototype.writeUnsignedInt = function(a) {
			this.ensureWriteableSpace(4);
			if (0 == (this.position & 3)) {
				var b = new Uint32Array(this.arraybytes);
				b[this.position >> 2] = ~~a & 4294967295
			} else b = new Uint32Array(this.unalignedarraybytestemp, 0, 1), b[0] = ~~a & 4294967295, a = new Uint8Array(this.arraybytes, this.position, 4), b = new Uint8Array(this.unalignedarraybytestemp, 0, 4), a.set(b);
			this.position += 4;
			this.position > this.length &&
				(this.length = this.position)
		};
		a.prototype.readUnsignedInt = function() {
			if (this.position > this.length + 4) throw "ByteArray out of bounds read. Position=" + this.position + ", Length=" + this.length;
			if (0 == (this.position & 3)) {
				var a = new Uint32Array(this.arraybytes),
					b = this.position >> 2;
				this.position += 4;
				return a[b]
			}
			a = new Uint32Array(this.unalignedarraybytestemp, 0, 1);
			b = new Uint8Array(this.arraybytes, this.position, 4);
			(new Uint8Array(this.unalignedarraybytestemp, 0, 4)).set(b);
			this.position += 4;
			return a[0]
		};
		a.prototype.writeFloat =
			function(a) {
				this.ensureWriteableSpace(4);
				if (0 == (this.position & 3)) {
					var b = new Float32Array(this.arraybytes);
					b[this.position >> 2] = a
				} else b = new Float32Array(this.unalignedarraybytestemp, 0, 1), b[0] = a, a = new Uint8Array(this.arraybytes, this.position, 4), b = new Uint8Array(this.unalignedarraybytestemp, 0, 4), a.set(b);
				this.position += 4;
				this.position > this.length && (this.length = this.position)
		};
		a.prototype.readFloat = function() {
			if (this.position > this.length + 4) throw "ByteArray out of bounds read. Positon=" + this.position + ", Length=" +
				this.length;
			if (0 == (this.position & 3)) {
				var a = new Float32Array(this.arraybytes),
					b = this.position >> 2;
				this.position += 4;
				return a[b]
			}
			a = new Float32Array(this.unalignedarraybytestemp, 0, 1);
			b = new Uint8Array(this.arraybytes, this.position, 4);
			(new Uint8Array(this.unalignedarraybytestemp, 0, 4)).set(b);
			this.position += 4;
			return a[0]
		};
		a.DEFAULT_ENDIAN = d.BIG_ENDIAN;
		return a
	}();
	c.ByteArray = b;
	b.prototype.__class__ = "egret.ByteArray"
})(egret || (egret = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a(a, c, d) {
			b.call(this);
			this._target = null;
			this.loop = this.ignoreGlobalPause = this._useTicks = !1;
			this._actions = this._steps = this.pluginData = null;
			this.paused = !1;
			this.duration = 0;
			this._prevPos = -1;
			this.position = null;
			this._stepPosition = this._prevPosition = 0;
			this.passive = !1;
			this.initialize(a, c, d)
		}
		__extends(a, b);
		a.get = function(e, b, c, d) {
			"undefined" === typeof b && (b = null);
			"undefined" === typeof c && (c = null);
			"undefined" === typeof d && (d = !1);
			d && a.removeTweens(e);
			return new a(e, b, c)
		};
		a.removeTweens = function(e) {
			if (e.tween_count) {
				for (var b = a._tweens, c = b.length - 1; 0 <= c; c--) b[c]._target == e && (b[c].paused = !0, b.splice(c, 1));
				e.tween_count = 0
			}
		};
		a.pauseTweens = function(a) {
			if (a.tween_count)
				for (var b = c.Tween._tweens, d = b.length - 1; 0 <= d; d--) b[d]._target == a && (b[d].paused = !0)
		};
		a.resumeTweens = function(a) {
			if (a.tween_count)
				for (var b = c.Tween._tweens, d = b.length - 1; 0 <= d; d--) b[d]._target == a && (b[d].paused = !1)
		};
		a.tick = function(e, b) {
			"undefined" === typeof b && (b = !1);
			for (var c = a._tweens.concat(), d = c.length - 1; 0 <=
				d; d--) {
				var f = c[d];
				b && !f.ignoreGlobalPause || f.paused || f.tick(f._useTicks ? 1 : e)
			}
		};
		a._register = function(e, b) {
			var d = e._target,
				h = a._tweens;
			if (b) d && (d.tween_count = d.tween_count ? d.tween_count + 1 : 1), h.push(e), a._inited || (c.Ticker.getInstance().register(a.tick, null), a._inited = !0);
			else
				for (d && d.tween_count--, d = h.length; d--;)
					if (h[d] == e) {
						h.splice(d, 1);
						break
					}
		};
		a.removeAllTweens = function() {
			for (var e = a._tweens, b = 0, c = e.length; b < c; b++) {
				var d = e[b];
				d.paused = !0;
				d._target.tweenjs_count = 0
			}
			e.length = 0
		};
		a.prototype.initialize =
			function(e, b, c) {
				this._target = e;
				b && (this._useTicks = b.useTicks, this.ignoreGlobalPause = b.ignoreGlobalPause, this.loop = b.loop, b.onChange && this.addEventListener("change", b.onChange, b.onChangeObj), b.override && a.removeTweens(e));
				this.pluginData = c || {};
				this._curQueueProps = {};
				this._initQueueProps = {};
				this._steps = [];
				this._actions = [];
				b && b.paused ? this.paused = !0 : a._register(this, !0);
				b && null != b.position && this.setPosition(b.position, a.NONE)
		};
		a.prototype.setPosition = function(a, b) {
			"undefined" === typeof b && (b = 1);
			0 > a &&
				(a = 0);
			var c = a,
				d = !1;
			c >= this.duration && (this.loop ? c %= this.duration : (c = this.duration, d = !0));
			if (c == this._prevPos) return d;
			var f = this._prevPos;
			this.position = this._prevPos = c;
			this._prevPosition = a;
			if (this._target)
				if (d) this._updateTargetProps(null, 1);
				else
			if (0 < this._steps.length) {
				for (var g = 0, k = this._steps.length; g < k && !(this._steps[g].t > c); g++);
				g = this._steps[g - 1];
				this._updateTargetProps(g, (this._stepPosition = c - g.t) / g.d)
			}
			0 != b && 0 < this._actions.length && (this._useTicks ? this._runActions(c, c) : 1 == b && c < f ? (f != this.duration &&
				this._runActions(f, this.duration), this._runActions(0, c, !0)) : this._runActions(f, c));
			d && this.setPaused(!0);
			this.dispatchEventWith("change");
			return d
		};
		a.prototype._runActions = function(a, b, c) {
			"undefined" === typeof c && (c = !1);
			var d = a,
				f = b,
				g = -1,
				k = this._actions.length,
				p = 1;
			a > b && (d = b, f = a, g = k, k = p = -1);
			for (;
				(g += p) != k;) {
				b = this._actions[g];
				var m = b.t;
				(m == f || m > d && m < f || c && m == a) && b.f.apply(b.o, b.p)
			}
		};
		a.prototype._updateTargetProps = function(e, b) {
			var c, d, f, g;
			if (e || 1 != b) {
				if (this.passive = !! e.v) return;
				e.e && (b = e.e(b, 0, 1, 1));
				c = e.p0;
				d = e.p1
			} else this.passive = !1, c = d = this._curQueueProps;
			for (var k in this._initQueueProps) {
				null == (f = c[k]) && (c[k] = f = this._initQueueProps[k]);
				null == (g = d[k]) && (d[k] = g = f);
				f = f == g || 0 == b || 1 == b || "number" != typeof f ? 1 == b ? g : f : f + (g - f) * b;
				var p = !1;
				if (g = a._plugins[k])
					for (var m = 0, q = g.length; m < q; m++) {
						var s = g[m].tween(this, k, f, c, d, b, !! e && c == d, !e);
						s == a.IGNORE ? p = !0 : f = s
					}
				p || (this._target[k] = f)
			}
		};
		a.prototype.setPaused = function(e) {
			this.paused = e;
			a._register(this, !e);
			return this
		};
		a.prototype._cloneProps = function(a) {
			var b = {}, c;
			for (c in a) b[c] = a[c];
			return b
		};
		a.prototype._addStep = function(a) {
			0 < a.d && (this._steps.push(a), a.t = this.duration, this.duration += a.d);
			return this
		};
		a.prototype._appendQueueProps = function(e) {
			var b, c, d, f, g, k;
			for (k in e)
				if (void 0 === this._initQueueProps[k]) {
					c = this._target[k];
					if (b = a._plugins[k])
						for (d = 0, f = b.length; d < f; d++) c = b[d].init(this, k, c);
					this._initQueueProps[k] = this._curQueueProps[k] = void 0 === c ? null : c
				}
			for (k in e) {
				c = this._curQueueProps[k];
				if (b = a._plugins[k])
					for (g = g || {}, d = 0, f = b.length; d < f; d++) b[d].step &&
						b[d].step(this, k, c, e[k], g);
				this._curQueueProps[k] = e[k]
			}
			g && this._appendQueueProps(g);
			return this._curQueueProps
		};
		a.prototype._addAction = function(a) {
			a.t = this.duration;
			this._actions.push(a);
			return this
		};
		a.prototype._set = function(a, b) {
			for (var c in a) b[c] = a[c]
		};
		a.prototype.wait = function(a, b) {
			if (null == a || 0 >= a) return this;
			var c = this._cloneProps(this._curQueueProps);
			return this._addStep({
				d: a,
				p0: c,
				p1: c,
				v: b
			})
		};
		a.prototype.to = function(a, b, c) {
			"undefined" === typeof c && (c = void 0);
			if (isNaN(b) || 0 > b) b = 0;
			return this._addStep({
				d: b ||
					0,
				p0: this._cloneProps(this._curQueueProps),
				e: c,
				p1: this._cloneProps(this._appendQueueProps(a))
			})
		};
		a.prototype.call = function(a, b, c) {
			"undefined" === typeof b && (b = void 0);
			"undefined" === typeof c && (c = void 0);
			return this._addAction({
				f: a,
				p: c ? c : [],
				o: b ? b : this._target
			})
		};
		a.prototype.set = function(a, b) {
			"undefined" === typeof b && (b = null);
			return this._addAction({
				f: this._set,
				o: this,
				p: [a, b ? b : this._target]
			})
		};
		a.prototype.play = function(a) {
			a || (a = this);
			return this.call(a.setPaused, a, [!1])
		};
		a.prototype.pause = function(a) {
			a ||
				(a = this);
			return this.call(a.setPaused, a, [!0])
		};
		a.prototype.tick = function(a) {
			this.paused || this.setPosition(this._prevPosition + a)
		};
		a.NONE = 0;
		a.LOOP = 1;
		a.REVERSE = 2;
		a._tweens = [];
		a.IGNORE = {};
		a._plugins = {};
		a._inited = !1;
		return a
	}(c.EventDispatcher);
	c.Tween = d;
	d.prototype.__class__ = "egret.Tween"
})(egret || (egret = {}));
(function(c) {
	var d = function() {
		function b() {
			c.Logger.fatal("Ease\u4e0d\u80fd\u88ab\u5b9e\u4f8b\u5316")
		}
		b.get = function(a) {
			-1 > a && (a = -1);
			1 < a && (a = 1);
			return function(b) {
				return 0 == a ? b : 0 > a ? b * (b * -a + 1 + a) : b * ((2 - b) * a + (1 - a))
			}
		};
		b.getPowIn = function(a) {
			return function(b) {
				return Math.pow(b, a)
			}
		};
		b.getPowOut = function(a) {
			return function(b) {
				return 1 - Math.pow(1 - b, a)
			}
		};
		b.getPowInOut = function(a) {
			return function(b) {
				return 1 > (b *= 2) ? 0.5 * Math.pow(b, a) : 1 - 0.5 * Math.abs(Math.pow(2 - b, a))
			}
		};
		b.sineIn = function(a) {
			return 1 - Math.cos(a *
				Math.PI / 2)
		};
		b.sineOut = function(a) {
			return Math.sin(a * Math.PI / 2)
		};
		b.sineInOut = function(a) {
			return -0.5 * (Math.cos(Math.PI * a) - 1)
		};
		b.getBackIn = function(a) {
			return function(b) {
				return b * b * ((a + 1) * b - a)
			}
		};
		b.getBackOut = function(a) {
			return function(b) {
				b -= 1;
				return b * b * ((a + 1) * b + a) + 1
			}
		};
		b.getBackInOut = function(a) {
			a *= 1.525;
			return function(b) {
				return 1 > (b *= 2) ? 0.5 * b * b * ((a + 1) * b - a) : 0.5 * ((b -= 2) * b * ((a + 1) * b + a) + 2)
			}
		};
		b.circIn = function(a) {
			return -(Math.sqrt(1 - a * a) - 1)
		};
		b.circOut = function(a) {
			return Math.sqrt(1 - a * a)
		};
		b.circInOut = function(a) {
			return 1 >
				(a *= 2) ? -0.5 * (Math.sqrt(1 - a * a) - 1) : 0.5 * (Math.sqrt(1 - (a -= 2) * a) + 1)
		};
		b.bounceIn = function(a) {
			return 1 - b.bounceOut(1 - a)
		};
		b.bounceOut = function(a) {
			return a < 1 / 2.75 ? 7.5625 * a * a : a < 2 / 2.75 ? 7.5625 * (a -= 1.5 / 2.75) * a + 0.75 : a < 2.5 / 2.75 ? 7.5625 * (a -= 2.25 / 2.75) * a + 0.9375 : 7.5625 * (a -= 2.625 / 2.75) * a + 0.984375
		};
		b.bounceInOut = function(a) {
			return 0.5 > a ? 0.5 * b.bounceIn(2 * a) : 0.5 * b.bounceOut(2 * a - 1) + 0.5
		};
		b.getElasticIn = function(a, b) {
			var c = 2 * Math.PI;
			return function(d) {
				if (0 == d || 1 == d) return d;
				var h = b / c * Math.asin(1 / a);
				return -(a * Math.pow(2, 10 *
					(d -= 1)) * Math.sin((d - h) * c / b))
			}
		};
		b.getElasticOut = function(a, b) {
			var c = 2 * Math.PI;
			return function(d) {
				if (0 == d || 1 == d) return d;
				var h = b / c * Math.asin(1 / a);
				return a * Math.pow(2, -10 * d) * Math.sin((d - h) * c / b) + 1
			}
		};
		b.getElasticInOut = function(a, b) {
			var c = 2 * Math.PI;
			return function(d) {
				var h = b / c * Math.asin(1 / a);
				return 1 > (d *= 2) ? -0.5 * a * Math.pow(2, 10 * (d -= 1)) * Math.sin((d - h) * c / b) : a * Math.pow(2, -10 * (d -= 1)) * Math.sin((d - h) * c / b) * 0.5 + 1
			}
		};
		b.quadIn = b.getPowIn(2);
		b.quadOut = b.getPowOut(2);
		b.quadInOut = b.getPowInOut(2);
		b.cubicIn = b.getPowIn(3);
		b.cubicOut = b.getPowOut(3);
		b.cubicInOut = b.getPowInOut(3);
		b.quartIn = b.getPowIn(4);
		b.quartOut = b.getPowOut(4);
		b.quartInOut = b.getPowInOut(4);
		b.quintIn = b.getPowIn(5);
		b.quintOut = b.getPowOut(5);
		b.quintInOut = b.getPowInOut(5);
		b.backIn = b.getBackIn(1.7);
		b.backOut = b.getBackOut(1.7);
		b.backInOut = b.getBackInOut(1.7);
		b.elasticIn = b.getElasticIn(1, 0.3);
		b.elasticOut = b.getElasticOut(1, 0.3);
		b.elasticInOut = b.getElasticInOut(1, 0.3 * 1.5);
		return b
	}();
	c.Ease = d;
	d.prototype.__class__ = "egret.Ease"
})(egret || (egret = {}));
(function(c) {
	var d = function() {
		function b() {
			this.type = b.EFFECT
		}
		b.prototype.play = function(a) {
			"undefined" === typeof a && (a = !1);
			var b = this.audio;
			b && (isNaN(b.duration) || (b.currentTime = 0), b.loop = a, b.play())
		};
		b.prototype.pause = function() {
			var a = this.audio;
			a && a.pause()
		};
		b.prototype.load = function() {
			var a = this.audio;
			a && a.load()
		};
		b.prototype.addEventListener = function(a, b) {
			this.audio && this.audio.addEventListener(a, b, !1)
		};
		b.prototype.removeEventListener = function(a, b) {
			this.audio && this.audio.removeEventListener(a,
				b, !1)
		};
		b.prototype.setVolume = function(a) {
			var b = this.audio;
			b && (b.volume = a)
		};
		b.prototype.getVolume = function() {
			return this.audio ? this.audio.volume : 0
		};
		b.prototype.preload = function(a) {
			this.type = a
		};
		b.prototype._setAudio = function(a) {
			this.audio = a
		};
		b.MUSIC = "music";
		b.EFFECT = "effect";
		return b
	}();
	c.Sound = d;
	d.prototype.__class__ = "egret.Sound"
})(egret || (egret = {}));
(function(c) {
	var d = function() {
		function b() {}
		b.isNumber = function(a) {
			return "number" === typeof a && !isNaN(a)
		};
		return b
	}();
	c.NumberUtils = d;
	d.prototype.__class__ = "egret.NumberUtils"
})(egret || (egret = {}));
Function.prototype.bind || (Function.prototype.bind = function(c) {
	if ("function" !== typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
	var d = Array.prototype.slice.call(arguments, 1),
		b = this,
		a = function() {}, e = function() {
			return b.apply(this instanceof a && c ? this : c, d.concat(Array.prototype.slice.call(arguments)))
		};
	a.prototype = this.prototype;
	e.prototype = new a;
	return e
});
var __extends = this.__extends || function(c, d) {
		function b() {
			this.constructor = c
		}
		for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
		b.prototype = d.prototype;
		c.prototype = new b
	}, RES;
(function(c) {
	var d = function(b) {
		function a(a, c, d) {
			"undefined" === typeof c && (c = !1);
			"undefined" === typeof d && (d = !1);
			b.call(this, a, c, d);
			this.itemsTotal = this.itemsLoaded = 0
		}
		__extends(a, b);
		a.dispatchResourceEvent = function(b, c, d, h, f, g) {
			"undefined" === typeof d && (d = "");
			"undefined" === typeof h && (h = null);
			"undefined" === typeof f && (f = 0);
			"undefined" === typeof g && (g = 0);
			var k = egret.Event._getPropertyData(a);
			k.groupName = d;
			k.resItem = h;
			k.itemsLoaded = f;
			k.itemsTotal = g;
			egret.Event._dispatchByTarget(a, b, c, k)
		};
		a.ITEM_LOAD_ERROR =
			"itemLoadError";
		a.CONFIG_COMPLETE = "configComplete";
		a.GROUP_PROGRESS = "groupProgress";
		a.GROUP_COMPLETE = "groupComplete";
		return a
	}(egret.Event);
	c.ResourceEvent = d;
	d.prototype.__class__ = "RES.ResourceEvent"
})(RES || (RES = {}));
(function(c) {
	var d = function() {
		function b(a, b, c) {
			this._loaded = !1;
			this.name = a;
			this.url = b;
			this.type = c
		}
		Object.defineProperty(b.prototype, "loaded", {
			get: function() {
				return this.data ? this.data.loaded : this._loaded
			},
			set: function(a) {
				this.data && (this.data.loaded = a);
				this._loaded = a
			},
			enumerable: !0,
			configurable: !0
		});
		b.prototype.toString = function() {
			return '[ResourceItem name="' + this.name + '" url="' + this.url + '" type="' + this.type + '"]'
		};
		b.TYPE_XML = "xml";
		b.TYPE_IMAGE = "image";
		b.TYPE_BIN = "bin";
		b.TYPE_TEXT = "text";
		b.TYPE_JSON =
			"json";
		b.TYPE_SHEET = "sheet";
		b.TYPE_FONT = "font";
		b.TYPE_SOUND = "sound";
		return b
	}();
	c.ResourceItem = d;
	d.prototype.__class__ = "RES.ResourceItem"
})(RES || (RES = {}));
(function(c) {
	var d = function() {
		function b() {
			this.keyMap = {};
			this.groupDic = {};
			c.configInstance = this
		}
		b.prototype.getGroupByName = function(a) {
			var b = [];
			if (!this.groupDic[a]) return b;
			a = this.groupDic[a];
			for (var c = a.length, d = 0; d < c; d++) b.push(this.parseResourceItem(a[d]));
			return b
		};
		b.prototype.getRawGroupByName = function(a) {
			return this.groupDic[a] ? this.groupDic[a] : []
		};
		b.prototype.createGroup = function(a, b, c) {
			"undefined" === typeof c && (c = !1);
			if (!c && this.groupDic[a] || !b || 0 == b.length) return !1;
			c = this.groupDic;
			for (var d =
				[], h = b.length, f = 0; f < h; f++) {
				var g = b[f],
					k = c[g];
				if (k)
					for (var g = k.length, p = 0; p < g; p++) {
						var m = k[p]; - 1 == d.indexOf(m) && d.push(m)
					} else(m = this.keyMap[g]) && -1 == d.indexOf(m) && d.push(m)
			}
			if (0 == d.length) return !1;
			this.groupDic[a] = d;
			return !0
		};
		b.prototype.parseConfig = function(a, b) {
			if (a) {
				var c = a.resources;
				if (c)
					for (var d = c.length, h = 0; h < d; h++) {
						var f = c[h],
							g = f.url;
						g && -1 == g.indexOf("://") && (f.url = b + g);
						this.addItemToKeyMap(f)
					}
				if (c = a.groups)
					for (d = c.length, h = 0; h < d; h++) {
						for (var g = c[h], k = [], p = g.keys.split(","), m = p.length, q = 0; q <
							m; q++) f = p[q].trim(), (f = this.keyMap[f]) && -1 == k.indexOf(f) && k.push(f);
						this.groupDic[g.name] = k
					}
			}
		};
		b.prototype.addSubkey = function(a, b) {
			var c = this.keyMap[b];
			c && !this.keyMap[a] && (this.keyMap[a] = c)
		};
		b.prototype.addItemToKeyMap = function(a) {
			this.keyMap[a.name] || (this.keyMap[a.name] = a);
			if (a.hasOwnProperty("subkeys")) {
				var b = a.subkeys.split(",");
				a.subkeys = b;
				for (var c = b.length, d = 0; d < c; d++) {
					var h = b[d];
					null == this.keyMap[h] && (this.keyMap[h] = a)
				}
			}
		};
		b.prototype.getName = function(a) {
			return (a = this.keyMap[a]) ? a.name : ""
		};
		b.prototype.getType = function(a) {
			return (a = this.keyMap[a]) ? a.type : ""
		};
		b.prototype.getRawResourceItem = function(a) {
			return this.keyMap[a]
		};
		b.prototype.getResourceItem = function(a) {
			return (a = this.keyMap[a]) ? this.parseResourceItem(a) : null
		};
		b.prototype.parseResourceItem = function(a) {
			var b = new c.ResourceItem(a.name, a.url, a.type);
			b.data = a;
			return b
		};
		return b
	}();
	c.ResourceConfig = d;
	d.prototype.__class__ = "RES.ResourceConfig"
})(RES || (RES = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a() {
			b.call(this);
			this.thread = 2;
			this.loadingCount = 0;
			this.groupTotalDic = {};
			this.numLoadedDic = {};
			this.itemListDic = {};
			this.priorityQueue = {};
			this.lazyLoadList = [];
			this.analyzerDic = {};
			this.queueIndex = 0
		}
		__extends(a, b);
		a.prototype.isGroupInLoading = function(a) {
			return void 0 !== this.itemListDic[a]
		};
		a.prototype.loadGroup = function(a, b, d) {
			"undefined" === typeof d && (d = 0);
			if (!this.itemListDic[b] && b)
				if (a && 0 != a.length) {
					this.priorityQueue[d] ? this.priorityQueue[d].push(b) : this.priorityQueue[d] =
						[b];
					this.itemListDic[b] = a;
					d = a.length;
					for (var h = 0; h < d; h++) a[h].groupName = b;
					this.groupTotalDic[b] = a.length;
					this.numLoadedDic[b] = 0;
					this.next()
				} else a = new c.ResourceEvent(c.ResourceEvent.GROUP_COMPLETE), a.groupName = b, this.dispatchEvent(a)
		};
		a.prototype.loadItem = function(a) {
			this.lazyLoadList.push(a);
			a.groupName = "";
			this.next()
		};
		a.prototype.next = function() {
			for (; this.loadingCount < this.thread;) {
				var a = this.getOneResourceItem();
				if (!a) break;
				this.loadingCount++;
				if (a.loaded) this.onItemComplete(a);
				else {
					var b = this.analyzerDic[a.type];
					b || (b = this.analyzerDic[a.type] = egret.Injector.getInstance(c.AnalyzerBase, a.type));
					b.loadFile(a, this.onItemComplete, this)
				}
			}
		};
		a.prototype.getOneResourceItem = function() {
			var a = Number.NEGATIVE_INFINITY,
				b;
			for (b in this.priorityQueue) a = Math.max(a, b);
			a = this.priorityQueue[a];
			if (!a || 0 == a.length) return 0 == this.lazyLoadList.length ? null : this.lazyLoadList.pop();
			b = a.length;
			for (var c, d = 0; d < b; d++) {
				this.queueIndex >= b && (this.queueIndex = 0);
				c = this.itemListDic[a[this.queueIndex]];
				if (0 < c.length) break;
				this.queueIndex++
			}
			return 0 ==
				c.length ? null : c.shift()
		};
		a.prototype.onItemComplete = function(a) {
			this.loadingCount--;
			var b = a.groupName;
			a.loaded || c.ResourceEvent.dispatchResourceEvent(this.resInstance, c.ResourceEvent.ITEM_LOAD_ERROR, b, a);
			if (b) {
				this.numLoadedDic[b]++;
				var d = this.numLoadedDic[b],
					h = this.groupTotalDic[b];
				c.ResourceEvent.dispatchResourceEvent(this.resInstance, c.ResourceEvent.GROUP_PROGRESS, b, a, d, h);
				d == h && (this.removeGroupName(b), delete this.groupTotalDic[b], delete this.numLoadedDic[b], delete this.itemListDic[b], c.ResourceEvent.dispatchResourceEvent(this,
					c.ResourceEvent.GROUP_COMPLETE, b))
			} else this.callBack.call(this.resInstance, a);
			this.next()
		};
		a.prototype.removeGroupName = function(a) {
			for (var b in this.priorityQueue) {
				for (var c = this.priorityQueue[b], d = c.length, f = 0, g = !1, d = c.length, k = 0; k < d; k++) {
					if (c[k] == a) {
						c.splice(f, 1);
						g = !0;
						break
					}
					f++
				}
				if (g) {
					0 == c.length && delete this.priorityQueue[b];
					break
				}
			}
		};
		return a
	}(egret.EventDispatcher);
	c.ResourceLoader = d;
	d.prototype.__class__ = "RES.ResourceLoader"
})(RES || (RES = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a() {
			b.call(this);
			this.resourceConfig = c.configInstance
		}
		__extends(a, b);
		a.prototype.addSubkey = function(a, b) {
			this.resourceConfig.addSubkey(a, b)
		};
		a.prototype.loadFile = function(a, b, c) {};
		a.prototype.getRes = function(a) {};
		a.prototype.destroyRes = function(a) {
			return !1
		};
		a.getStringPrefix = function(a) {
			if (!a) return "";
			var b = a.indexOf(".");
			return -1 != b ? a.substring(0, b) : ""
		};
		a.getStringTail = function(a) {
			if (!a) return "";
			var b = a.indexOf(".");
			return -1 != b ? a.substring(b + 1) : ""
		};
		return a
	}(egret.HashObject);
	c.AnalyzerBase = d;
	d.prototype.__class__ = "RES.AnalyzerBase"
})(RES || (RES = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a() {
			b.call(this);
			this.fileDic = {};
			this.resItemDic = [];
			this._dataFormat = egret.URLLoaderDataFormat.BINARY;
			this.recycler = new egret.Recycler
		}
		__extends(a, b);
		a.prototype.loadFile = function(a, b, c) {
			if (this.fileDic[a.name]) b.call(c, a);
			else {
				var d = this.getLoader();
				this.resItemDic[d.hashCode] = {
					item: a,
					func: b,
					thisObject: c
				};
				d.load(new egret.URLRequest(a.url))
			}
		};
		a.prototype.getLoader = function() {
			var a = this.recycler.pop();
			a || (a = new egret.URLLoader, a.addEventListener(egret.Event.COMPLETE,
				this.onLoadFinish, this), a.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadFinish, this));
			a.dataFormat = this._dataFormat;
			return a
		};
		a.prototype.onLoadFinish = function(a) {
			var b = a.target,
				c = this.resItemDic[b.hashCode];
			delete this.resItemDic[b.hashCode];
			this.recycler.push(b);
			var d = c.item,
				f = c.func;
			d.loaded = a.type == egret.Event.COMPLETE;
			d.loaded && this.analyzeData(d, b.data);
			f.call(c.thisObject, d)
		};
		a.prototype.analyzeData = function(a, b) {
			var c = a.name;
			!this.fileDic[c] && b && (this.fileDic[c] = b)
		};
		a.prototype.getRes =
			function(a) {
				return this.fileDic[a]
		};
		a.prototype.hasRes = function(a) {
			return null != this.getRes(a)
		};
		a.prototype.destroyRes = function(a) {
			return this.fileDic[a] ? (delete this.fileDic[a], !0) : !1
		};
		return a
	}(c.AnalyzerBase);
	c.BinAnalyzer = d;
	d.prototype.__class__ = "RES.BinAnalyzer"
})(RES || (RES = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a() {
			b.call(this);
			this._dataFormat = egret.URLLoaderDataFormat.TEXTURE
		}
		__extends(a, b);
		a.prototype.analyzeData = function(a, b) {
			var c = a.name;
			!this.fileDic[c] && b && (this.fileDic[c] = b, (c = a.data) && c.scale9grid && (c = c.scale9grid.split(","), b.scale9Grid = new egret.Rectangle(parseInt(c[0]), parseInt(c[1]), parseInt(c[2]), parseInt(c[3]))))
		};
		return a
	}(c.BinAnalyzer);
	c.ImageAnalyzer = d;
	d.prototype.__class__ = "RES.ImageAnalyzer"
})(RES || (RES = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a() {
			b.call(this);
			this._dataFormat = egret.URLLoaderDataFormat.TEXT
		}
		__extends(a, b);
		a.prototype.analyzeData = function(a, b) {
			var c = a.name;
			if (!this.fileDic[c] && b) try {
				this.fileDic[c] = JSON.parse(b)
			} catch (d) {
				egret.Logger.warning("JSON\u6587\u4ef6\u683c\u5f0f\u4e0d\u6b63\u786e: " + a.url + "\ndata:" + b)
			}
		};
		return a
	}(c.BinAnalyzer);
	c.JsonAnalyzer = d;
	d.prototype.__class__ = "RES.JsonAnalyzer"
})(RES || (RES = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a() {
			b.call(this);
			this._dataFormat = egret.URLLoaderDataFormat.TEXT
		}
		__extends(a, b);
		return a
	}(c.BinAnalyzer);
	c.TextAnalyzer = d;
	d.prototype.__class__ = "RES.TextAnalyzer"
})(RES || (RES = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a() {
			b.call(this);
			this.sheetMap = {};
			this.textureMap = {};
			this._dataFormat = egret.URLLoaderDataFormat.TEXT
		}
		__extends(a, b);
		a.prototype.getRes = function(a) {
			var b = this.fileDic[a];
			b || (b = this.textureMap[a]);
			!b && (b = c.AnalyzerBase.getStringPrefix(a), b = this.fileDic[b]) && (a = c.AnalyzerBase.getStringTail(a), b = b.getTexture(a));
			return b
		};
		a.prototype.onLoadFinish = function(a) {
			var b = a.target,
				c = this.resItemDic[b.hashCode];
			delete this.resItemDic[b.hashCode];
			this.recycler.push(b);
			var d =
				c.item,
				f = c.func;
			d.loaded = a.type == egret.Event.COMPLETE;
			d.loaded && this.analyzeData(d, b.data);
			"string" == typeof b.data ? (this._dataFormat = egret.URLLoaderDataFormat.TEXTURE, this.loadFile(d, f, c.thisObject), this._dataFormat = egret.URLLoaderDataFormat.TEXT) : f.call(c.thisObject, d)
		};
		a.prototype.analyzeData = function(a, b) {
			var c = a.name;
			if (!this.fileDic[c] && b) {
				var d;
				if ("string" == typeof b) {
					try {
						d = JSON.parse(b)
					} catch (f) {
						egret.Logger.warning("JSON\u6587\u4ef6\u683c\u5f0f\u4e0d\u6b63\u786e: " + a.url)
					}
					d && (this.sheetMap[c] =
						d, a.loaded = !1, a.url = this.getRelativePath(a.url, d.file))
				} else d = this.sheetMap[c], delete this.sheetMap[c], b && (d = this.parseSpriteSheet(b, d, a.data && a.data.subkeys ? "" : c), this.fileDic[c] = d)
			}
		};
		a.prototype.getRelativePath = function(a, b) {
			a = a.split("\\").join("/");
			var c = a.lastIndexOf("/");
			return a = -1 != c ? a.substring(0, c + 1) + b : b
		};
		a.prototype.parseSpriteSheet = function(a, b, c) {
			b = b.frames;
			if (!b) return null;
			var d = new egret.SpriteSheet(a),
				f = this.textureMap,
				g;
			for (g in b) {
				var k = b[g];
				a = d.createTexture(g, k.x, k.y, k.w, k.h,
					k.offX, k.offY, k.sourceW, k.sourceH);
				k.scale9grid && (k = k.scale9grid.split(","), a.scale9Grid = new egret.Rectangle(parseInt(k[0]), parseInt(k[1]), parseInt(k[2]), parseInt(k[3])));
				null == f[g] && (f[g] = a, c && this.addSubkey(g, c))
			}
			return d
		};
		return a
	}(c.BinAnalyzer);
	c.SheetAnalyzer = d;
	d.prototype.__class__ = "RES.SheetAnalyzer"
})(RES || (RES = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a() {
			b.call(this)
		}
		__extends(a, b);
		a.prototype.analyzeData = function(a, b) {
			var c = a.name;
			if (!this.fileDic[c] && b) {
				var d;
				"string" == typeof b ? (d = b, this.sheetMap[c] = d, a.loaded = !1, a.url = this.getTexturePath(a.url, d)) : (d = this.sheetMap[c], delete this.sheetMap[c], b && (d = new egret.BitmapTextSpriteSheet(b, d), this.fileDic[c] = d))
			}
		};
		a.prototype.getTexturePath = function(a, b) {
			var c = "",
				d = b.split("\n")[2],
				f = d.indexOf('file="'); - 1 != f && (d = d.substring(f + 6), f = d.indexOf('"'), c = d.substring(0,
					f));
			a = a.split("\\").join("/");
			f = a.lastIndexOf("/");
			return a = -1 != f ? a.substring(0, f + 1) + c : c
		};
		return a
	}(c.SheetAnalyzer);
	c.FontAnalyzer = d;
	d.prototype.__class__ = "RES.FontAnalyzer"
})(RES || (RES = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a() {
			b.call(this);
			this._dataFormat = egret.URLLoaderDataFormat.SOUND
		}
		__extends(a, b);
		a.prototype.analyzeData = function(a, b) {
			var c = a.name;
			!this.fileDic[c] && b && (this.fileDic[c] = b, (c = a.data) && c.soundType ? b.preload(c.soundType) : b.preload(egret.Sound.EFFECT))
		};
		return a
	}(c.BinAnalyzer);
	c.SoundAnalyzer = d;
	d.prototype.__class__ = "RES.SoundAnalyzer"
})(RES || (RES = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a() {
			b.call(this);
			this._dataFormat = egret.URLLoaderDataFormat.TEXT
		}
		__extends(a, b);
		a.prototype.analyzeData = function(a, b) {
			var c = a.name;
			if (!this.fileDic[c] && b) try {
				var d = egret.XML.parse(b);
				this.fileDic[c] = d
			} catch (f) {}
		};
		return a
	}(c.BinAnalyzer);
	c.XMLAnalyzer = d;
	d.prototype.__class__ = "RES.XMLAnalyzer"
})(RES || (RES = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	c.loadConfig = function(a, c, d) {
		"undefined" === typeof c && (c = "");
		"undefined" === typeof d && (d = "json");
		b.loadConfig(a, c, d)
	};
	c.loadGroup = function(a, c) {
		"undefined" === typeof c && (c = 0);
		b.loadGroup(a, c)
	};
	c.isGroupLoaded = function(a) {
		return b.isGroupLoaded(a)
	};
	c.getGroupByName = function(a) {
		return b.getGroupByName(a)
	};
	c.createGroup = function(a, c, d) {
		"undefined" === typeof d && (d = !1);
		return b.createGroup(a, c, d)
	};
	c.hasRes = function(a) {
		return b.hasRes(a)
	};
	c.getRes = function(a) {
		return b.getRes(a)
	};
	c.getResAsync =
		function(a, c, d) {
			b.getResAsync(a, c, d)
	};
	c.getResByUrl = function(a, c, d, n) {
		"undefined" === typeof n && (n = "");
		b.getResByUrl(a, c, d, n)
	};
	c.destroyRes = function(a) {
		return b.destroyRes(a)
	};
	c.setMaxLoadingThread = function(a) {
		b.setMaxLoadingThread(a)
	};
	c.addEventListener = function(a, c, d, n, h) {
		"undefined" === typeof n && (n = !1);
		"undefined" === typeof h && (h = 0);
		b.addEventListener(a, c, d, n, h)
	};
	c.removeEventListener = function(a, c, d, n) {
		"undefined" === typeof n && (n = !1);
		b.removeEventListener(a, c, d, n)
	};
	var d = function(a) {
		function b() {
			a.call(this);
			this.analyzerDic = {};
			this.configItemList = [];
			this.configComplete = this.callLaterFlag = !1;
			this.loadedGroups = [];
			this.groupNameList = [];
			this.asyncDic = {};
			this.init()
		}
		__extends(b, a);
		b.prototype.getAnalyzerByType = function(a) {
			var b = this.analyzerDic[a];
			b || (b = this.analyzerDic[a] = egret.Injector.getInstance(c.AnalyzerBase, a));
			return b
		};
		b.prototype.init = function() {
			egret.Injector.hasMapRule(c.AnalyzerBase, c.ResourceItem.TYPE_BIN) || egret.Injector.mapClass(c.AnalyzerBase, c.BinAnalyzer, c.ResourceItem.TYPE_BIN);
			egret.Injector.hasMapRule(c.AnalyzerBase,
				c.ResourceItem.TYPE_IMAGE) || egret.Injector.mapClass(c.AnalyzerBase, c.ImageAnalyzer, c.ResourceItem.TYPE_IMAGE);
			egret.Injector.hasMapRule(c.AnalyzerBase, c.ResourceItem.TYPE_TEXT) || egret.Injector.mapClass(c.AnalyzerBase, c.TextAnalyzer, c.ResourceItem.TYPE_TEXT);
			egret.Injector.hasMapRule(c.AnalyzerBase, c.ResourceItem.TYPE_JSON) || egret.Injector.mapClass(c.AnalyzerBase, c.JsonAnalyzer, c.ResourceItem.TYPE_JSON);
			egret.Injector.hasMapRule(c.AnalyzerBase, c.ResourceItem.TYPE_SHEET) || egret.Injector.mapClass(c.AnalyzerBase,
				c.SheetAnalyzer, c.ResourceItem.TYPE_SHEET);
			egret.Injector.hasMapRule(c.AnalyzerBase, c.ResourceItem.TYPE_FONT) || egret.Injector.mapClass(c.AnalyzerBase, c.FontAnalyzer, c.ResourceItem.TYPE_FONT);
			egret.Injector.hasMapRule(c.AnalyzerBase, c.ResourceItem.TYPE_SOUND) || egret.Injector.mapClass(c.AnalyzerBase, c.SoundAnalyzer, c.ResourceItem.TYPE_SOUND);
			egret.Injector.hasMapRule(c.AnalyzerBase, c.ResourceItem.TYPE_XML) || egret.Injector.mapClass(c.AnalyzerBase, c.XMLAnalyzer, c.ResourceItem.TYPE_XML);
			this.resConfig =
				new c.ResourceConfig;
			this.resLoader = new c.ResourceLoader;
			this.resLoader.callBack = this.onResourceItemComp;
			this.resLoader.resInstance = this;
			this.resLoader.addEventListener(c.ResourceEvent.GROUP_COMPLETE, this.onGroupComp, this)
		};
		b.prototype.loadConfig = function(a, b, c) {
			"undefined" === typeof c && (c = "json");
			this.configItemList.push({
				url: a,
				resourceRoot: b,
				type: c
			});
			this.callLaterFlag || (egret.callLater(this.startLoadConfig, this), this.callLaterFlag = !0)
		};
		b.prototype.startLoadConfig = function() {
			this.callLaterFlag = !1;
			var a = this.configItemList;
			this.configItemList = [];
			this.loadingConfigList = a;
			for (var d = a.length, h = [], f = 0; f < d; f++) {
				var g = a[f],
					g = new c.ResourceItem(g.url, g.url, g.type);
				h.push(g)
			}
			this.resLoader.loadGroup(h, b.GROUP_CONFIG, Number.MAX_VALUE)
		};
		b.prototype.isGroupLoaded = function(a) {
			return -1 != this.loadedGroups.indexOf(a)
		};
		b.prototype.getGroupByName = function(a) {
			return this.resConfig.getGroupByName(a)
		};
		b.prototype.loadGroup = function(a, b) {
			"undefined" === typeof b && (b = 0);
			if (-1 == this.loadedGroups.indexOf(a) && !this.resLoader.isGroupInLoading(a))
				if (this.configComplete) {
					var c =
						this.resConfig.getGroupByName(a);
					this.resLoader.loadGroup(c, a, b)
				} else this.groupNameList.push({
					name: a,
					priority: b
				})
		};
		b.prototype.createGroup = function(a, b, c) {
			"undefined" === typeof c && (c = !1);
			if (c) {
				var e = this.loadedGroups.indexOf(a); - 1 != e && this.loadedGroups.splice(e, 1)
			}
			return this.resConfig.createGroup(a, b, c)
		};
		b.prototype.onGroupComp = function(a) {
			if (a.groupName == b.GROUP_CONFIG) {
				a = this.loadingConfigList.length;
				for (var d = 0; d < a; d++) {
					var h = this.loadingConfigList[d],
						f = this.getAnalyzerByType(h.type),
						g = f.getRes(h.url);
					f.destroyRes(h.url);
					this.resConfig.parseConfig(g, h.resourceRoot)
				}
				this.configComplete = !0;
				this.loadingConfigList = null;
				c.ResourceEvent.dispatchResourceEvent(this, c.ResourceEvent.CONFIG_COMPLETE);
				h = this.groupNameList;
				a = h.length;
				for (d = 0; d < a; d++) f = h[d], this.loadGroup(f.name, f.priority);
				this.groupNameList = []
			} else this.loadedGroups.push(a.groupName), this.dispatchEvent(a)
		};
		b.prototype.hasRes = function(a) {
			var b = this.resConfig.getType(a);
			return "" == b && (a = c.AnalyzerBase.getStringPrefix(a), b = this.resConfig.getType(a),
				"" == b) ? !1 : !0
		};
		b.prototype.getRes = function(a) {
			var b = this.resConfig.getType(a);
			return "" == b && (b = c.AnalyzerBase.getStringPrefix(a), b = this.resConfig.getType(b), "" == b) ? null : this.getAnalyzerByType(b).getRes(a)
		};
		b.prototype.getResAsync = function(a, b, e) {
			var d = this.resConfig.getType(a),
				g = this.resConfig.getName(a);
			if ("" == d && (g = c.AnalyzerBase.getStringPrefix(a), d = this.resConfig.getType(g), "" == d)) {
				b.call(e, null);
				return
			}(d = this.getAnalyzerByType(d).getRes(a)) ? b.call(e, d) : (a = {
					key: a,
					compFunc: b,
					thisObject: e
				}, this.asyncDic[g] ?
				this.asyncDic[g].push(a) : (this.asyncDic[g] = [a], g = this.resConfig.getResourceItem(g), this.resLoader.loadItem(g)))
		};
		b.prototype.getResByUrl = function(a, b, e, d) {
			"undefined" === typeof d && (d = "");
			if (a) {
				d || (d = this.getTypeByUrl(a));
				var g = this.getAnalyzerByType(d).getRes(a);
				g ? b.call(e, g) : (b = {
					key: a,
					compFunc: b,
					thisObject: e
				}, this.asyncDic[a] ? this.asyncDic[a].push(b) : (this.asyncDic[a] = [b], a = new c.ResourceItem(a, a, d), this.resLoader.loadItem(a)))
			} else b.call(e, null)
		};
		b.prototype.getTypeByUrl = function(a) {
			(a = a.substr(a.lastIndexOf(".") +
				1)) && (a = a.toLowerCase());
			switch (a) {
				case c.ResourceItem.TYPE_XML:
				case c.ResourceItem.TYPE_JSON:
				case c.ResourceItem.TYPE_SHEET:
					break;
				case "png":
				case "jpg":
				case "gif":
					a = c.ResourceItem.TYPE_IMAGE;
					break;
				case "fnt":
					a = c.ResourceItem.TYPE_FONT;
					break;
				case "txt":
					a = c.ResourceItem.TYPE_TEXT;
					break;
				case "mp3":
				case "ogg":
				case "mpeg":
				case "wav":
				case "m4a":
				case "mp4":
				case "aiff":
				case "wma":
				case "mid":
					a = c.ResourceItem.TYPE_SOUND;
					break;
				default:
					a = c.ResourceItem.TYPE_BIN
			}
			return a
		};
		b.prototype.onResourceItemComp = function(a) {
			var b =
				this.asyncDic[a.name];
			delete this.asyncDic[a.name];
			a = this.getAnalyzerByType(a.type);
			for (var c = b.length, e = 0; e < c; e++) {
				var d = b[e],
					k = a.getRes(d.key);
				d.compFunc.call(d.thisObject, k, d.key)
			}
		};
		b.prototype.destroyRes = function(a) {
			var b = this.resConfig.getRawGroupByName(a);
			if (b) {
				var c = this.loadedGroups.indexOf(a); - 1 != c && this.loadedGroups.splice(c, 1);
				a = b.length;
				for (var e = 0; e < a; e++) {
					c = b[e];
					c.loaded = !1;
					var d = this.getAnalyzerByType(c.type);
					d.destroyRes(c.name)
				}
				return !0
			}
			b = this.resConfig.getType(a);
			if ("" == b) return !1;
			c = this.resConfig.getRawResourceItem(a);
			c.loaded = !1;
			d = this.getAnalyzerByType(b);
			return d.destroyRes(a)
		};
		b.prototype.setMaxLoadingThread = function(a) {
			1 > a && (a = 1);
			this.resLoader.thread = a
		};
		b.GROUP_CONFIG = "RES__CONFIG";
		return b
	}(egret.EventDispatcher);
	d.prototype.__class__ = "Resource";
	var b = new d
})(RES || (RES = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a(c) {
			"undefined" === typeof c && (c = 60);
			b.call(this);
			this.frameRate = c;
			this._time = 0;
			60 == c && (a.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame, a.cancelAnimationFrame = window.cancelAnimationFrame || window.msCancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.oCancelAnimationFrame || window.cancelRequestAnimationFrame ||
				window.msCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.webkitCancelRequestAnimationFrame);
			a.requestAnimationFrame || (a.requestAnimationFrame = function(a) {
				return window.setTimeout(a, 1E3 / c)
			});
			a.cancelAnimationFrame || (a.cancelAnimationFrame = function(a) {
				return window.clearTimeout(a)
			});
			a.instance = this;
			this.registerListener()
		}
		__extends(a, b);
		a.prototype.enterFrame = function() {
			var b = a.instance,
				d = a._thisObject,
				n = a._callback,
				h = c.getTimer(),
				f = h -
					b._time;
			b._requestAnimationId = a.requestAnimationFrame.call(window, a.prototype.enterFrame);
			n.call(d, f);
			b._time = h
		};
		a.prototype.executeMainLoop = function(b, c) {
			a._callback = b;
			a._thisObject = c;
			this.enterFrame()
		};
		a.prototype.reset = function() {
			var b = a.instance;
			b._requestAnimationId && (b._time = c.getTimer(), a.cancelAnimationFrame.call(window, b._requestAnimationId), b.enterFrame())
		};
		a.prototype.registerListener = function() {
			var b = function() {
				a.instance.reset()
			}, c = function() {
					document[d] || b()
				};
			window.onfocus = b;
			window.onblur =
				function() {};
			var d, h;
			"undefined" !== typeof document.hidden ? (d = "hidden", h = "visibilitychange") : "undefined" !== typeof document.mozHidden ? (d = "mozHidden", h = "mozvisibilitychange") : "undefined" !== typeof document.msHidden ? (d = "msHidden", h = "msvisibilitychange") : "undefined" !== typeof document.webkitHidden && (d = "webkitHidden", h = "webkitvisibilitychange");
			"onpageshow" in window && "onpagehide" in window && window.addEventListener("pageshow", b, !1);
			d && h && document.addEventListener(h, c, !1)
		};
		return a
	}(c.DeviceContext);
	c.HTML5DeviceContext =
		d;
	d.prototype.__class__ = "egret.HTML5DeviceContext"
})(egret || (egret = {}));
var egret_html5_localStorage;
(function(c) {
	c.getItem = function(c) {
		return window.localStorage.getItem(c)
	};
	c.setItem = function(c, b) {
		window.localStorage.setItem(c, b)
	};
	c.removeItem = function(c) {
		window.localStorage.removeItem(c)
	};
	c.clear = function() {
		window.localStorage.clear()
	};
	c.init = function() {
		for (var d in c) egret.localStorage[d] = c[d]
	}
})(egret_html5_localStorage || (egret_html5_localStorage = {}));
egret_html5_localStorage.init();
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a(a) {
			b.call(this);
			this.globalAlpha = 1;
			this.canvas = a || this.createCanvas();
			this.canvasContext = this.canvas.getContext("2d");
			var c = this.canvasContext.setTransform,
				d = this;
			this.canvasContext.setTransform = function(a, b, e, k, p, m) {
				d._matrixA = a;
				d._matrixB = b;
				d._matrixC = e;
				d._matrixD = k;
				d._matrixTx = p;
				d._matrixTy = m;
				c.call(d.canvasContext, a, b, e, k, p, m)
			};
			this._matrixA = 1;
			this._matrixC = this._matrixB = 0;
			this._matrixD = 1;
			this._transformTy = this._transformTx = this._matrixTy = this._matrixTx =
				0;
			b.call(this)
		}
		__extends(a, b);
		a.prototype.createCanvas = function() {
			var a = c.Browser.getInstance().$("#egretCanvas");
			if (!a) {
				var b = document.getElementById(c.StageDelegate.canvas_div_name),
					a = c.Browser.getInstance().$new("canvas");
				a.id = "egretCanvas";
				a.width = c.MainContext.instance.stage.stageWidth;
				a.height = c.MainContext.instance.stage.stageHeight;
				a.style.width = b.style.width;
				a.style.height = b.style.height;
				b.appendChild(a)
			}
			return a
		};
		a.prototype.clearScreen = function() {
			for (var a = c.RenderFilter.getInstance().getDrawAreaList(),
					b = 0, d = a.length; b < d; b++) {
				var h = a[b];
				this.clearRect(h.x, h.y, h.width, h.height)
			}
			this.renderCost = 0
		};
		a.prototype.clearRect = function(a, b, c, d) {
			this.canvasContext.clearRect(a, b, c, d)
		};
		a.prototype.drawImage = function(a, d, n, h, f, g, k, p, m) {
			var q = c.MainContext.instance.rendererContext.texture_scale_factor;
			d /= q;
			n /= q;
			h /= q;
			f /= q;
			a = a._bitmapData;
			g += this._transformTx;
			k += this._transformTy;
			q = c.getTimer();
			this.canvasContext.drawImage(a, d, n, h, f, g, k, p, m);
			b.prototype.drawImage.call(this, a, d, n, h, f, g, k, p, m);
			this.renderCost += c.getTimer() -
				q
		};
		a.prototype.setTransform = function(a) {
			1 == a.a && 0 == a.b && 0 == a.c && 1 == a.d && 1 == this._matrixA && 0 == this._matrixB && 0 == this._matrixC && 1 == this._matrixD ? (this._transformTx = a.tx - this._matrixTx, this._transformTy = a.ty - this._matrixTy) : (this._transformTx = this._transformTy = 0, this._matrixA == a.a && this._matrixB == a.b && this._matrixC == a.c && this._matrixD == a.d && this._matrixTx == a.tx && this._matrixTy == a.ty || this.canvasContext.setTransform(a.a, a.b, a.c, a.d, a.tx, a.ty))
		};
		a.prototype.setAlpha = function(a, b) {
			a != this.globalAlpha &&
				(this.canvasContext.globalAlpha = this.globalAlpha = a);
			b ? (this.blendValue = b, this.canvasContext.globalCompositeOperation = b) : this.blendValue != c.BlendMode.NORMAL && (this.blendValue = c.BlendMode.NORMAL, this.canvasContext.globalCompositeOperation = c.BlendMode.NORMAL)
		};
		a.prototype.setupFont = function(a) {
			var b = this.canvasContext,
				c = a._italic ? "italic " : "normal ",
				c = c + (a._bold ? "bold " : "normal "),
				c = c + (a._size + "px " + a._fontFamily);
			b.font = c;
			b.textAlign = "left";
			b.textBaseline = "middle"
		};
		a.prototype.measureText = function(a) {
			return this.canvasContext.measureText(a).width
		};
		a.prototype.drawText = function(a, c, d, h, f) {
			var g = a._strokeColorString,
				k = a._stroke,
				p = this.canvasContext;
			p.fillStyle = a._textColorString;
			p.strokeStyle = g;
			k && (p.lineWidth = 2 * k, p.strokeText(c, d + this._transformTx, h + this._transformTy, f || 65535));
			p.fillText(c, d + this._transformTx, h + this._transformTy, f || 65535);
			b.prototype.drawText.call(this, a, c, d, h, f)
		};
		a.prototype.strokeRect = function(a, b, c, d, f) {
			this.canvasContext.strokeStyle = f;
			this.canvasContext.strokeRect(a, b, c, d)
		};
		a.prototype.pushMask = function(a) {
			this.canvasContext.save();
			this.canvasContext.beginPath();
			this.canvasContext.rect(a.x + this._transformTx, a.y + this._transformTy, a.width, a.height);
			this.canvasContext.clip();
			this.canvasContext.closePath()
		};
		a.prototype.popMask = function() {
			this.canvasContext.restore();
			this.canvasContext.setTransform(1, 0, 0, 1, 0, 0)
		};
		a.prototype.onRenderStart = function() {
			this.canvasContext.save()
		};
		a.prototype.onRenderFinish = function() {
			this.canvasContext.restore();
			this.canvasContext.setTransform(1, 0, 0, 1, 0, 0)
		};
		return a
	}(c.RendererContext);
	c.HTML5CanvasRenderer =
		d;
	d.prototype.__class__ = "egret.HTML5CanvasRenderer"
})(egret || (egret = {}));
var egret_h5_graphics;
(function(c) {
	c.beginFill = function(b, a) {
		"undefined" === typeof a && (a = 1);
		var c = "rgba(" + (b >> 16) + "," + ((b & 65280) >> 8) + "," + (b & 255) + "," + a + ")";
		this.fillStyleColor = c;
		this.commandQueue.push(new d(this._setStyle, this, [c]))
	};
	c.drawRect = function(b, a, c, l) {
		this.commandQueue.push(new d(function(a, b, c, d) {
			var e = this.renderContext;
			this.canvasContext.beginPath();
			this.canvasContext.rect(e._transformTx + a, e._transformTy + b, c, d);
			this.canvasContext.closePath()
		}, this, [b, a, c, l]));
		this._fill()
	};
	c.drawCircle = function(b, a, c) {
		this.commandQueue.push(new d(function(a,
			b, c) {
			var d = this.renderContext;
			this.canvasContext.beginPath();
			this.canvasContext.arc(d._transformTx + a, d._transformTy + b, c, 0, 2 * Math.PI);
			this.canvasContext.closePath()
		}, this, [b, a, c]));
		this._fill()
	};
	c.drawRoundRect = function(b, a, c, l, n, h) {
		this.commandQueue.push(new d(function(a, b, c, d, e, l) {
			var h = this.renderContext;
			a = h._transformTx + a;
			b = h._transformTy + b;
			e /= 2;
			l = l ? l / 2 : e;
			c = a + c;
			d = b + d;
			h = d - l;
			this.canvasContext.beginPath();
			this.canvasContext.moveTo(c, h);
			this.canvasContext.quadraticCurveTo(c, d, c - e, d);
			this.canvasContext.lineTo(a +
				e, d);
			this.canvasContext.quadraticCurveTo(a, d, a, d - l);
			this.canvasContext.lineTo(a, b + l);
			this.canvasContext.quadraticCurveTo(a, b, a + e, b);
			this.canvasContext.lineTo(c - e, b);
			this.canvasContext.quadraticCurveTo(c, b, c, b + l);
			this.canvasContext.lineTo(c, h);
			this.canvasContext.closePath()
		}, this, [b, a, c, l, n, h]));
		this._fill()
	};
	c.drawEllipse = function(b, a, c, l) {
		this.commandQueue.push(new d(function(a, b, c, d) {
			var e = this.renderContext;
			this.canvasContext.save();
			a = e._transformTx + a;
			b = e._transformTy + b;
			var e = c > d ? c : d,
				l = c / e;
			d /=
				e;
			this.canvasContext.scale(l, d);
			this.canvasContext.beginPath();
			this.canvasContext.moveTo((a + c) / l, b / d);
			this.canvasContext.arc(a / l, b / d, e, 0, 2 * Math.PI);
			this.canvasContext.closePath();
			this.canvasContext.restore();
			this.canvasContext.stroke()
		}, this, [b, a, c, l]));
		this._fill()
	};
	c.lineStyle = function(b, a, c, l, n, h, f, g) {
		"undefined" === typeof b && (b = NaN);
		"undefined" === typeof a && (a = 0);
		"undefined" === typeof c && (c = 1);
		"undefined" === typeof l && (l = !1);
		"undefined" === typeof n && (n = "normal");
		"undefined" === typeof h && (h = null);
		"undefined" ===
			typeof f && (f = null);
		"undefined" === typeof g && (g = 3);
		this.strokeStyleColor && (this.createEndLineCommand(), this.commandQueue.push(this.endLineCommand));
		this.strokeStyleColor = a = "rgba(" + (a >> 16) + "," + ((a & 65280) >> 8) + "," + (a & 255) + "," + c + ")";
		this.commandQueue.push(new d(function(a, b) {
			this.canvasContext.lineWidth = a;
			this.canvasContext.strokeStyle = b;
			this.canvasContext.beginPath()
		}, this, [b, a]));
		"undefined" === typeof this.lineX && (this.lineY = this.lineX = 0);
		this.moveTo(this.lineX, this.lineY)
	};
	c.lineTo = function(b, a) {
		this.commandQueue.push(new d(function(a,
			b) {
			var c = this.renderContext;
			this.canvasContext.lineTo(c._transformTx + a, c._transformTy + b)
		}, this, [b, a]));
		this.lineX = b;
		this.lineY = a
	};
	c.curveTo = function(b, a, c, l) {
		this.commandQueue.push(new d(function(a, b, c, d) {
			var e = this.renderContext;
			this.canvasContext.quadraticCurveTo(e._transformTx + a, e._transformTy + b, e._transformTx + c, e._transformTy + d)
		}, this, [b, a, c, l]));
		this.lineX = c;
		this.lineY = l
	};
	c.moveTo = function(b, a) {
		this.commandQueue.push(new d(function(a, b) {
			var c = this.renderContext;
			this.canvasContext.moveTo(c._transformTx +
				a, c._transformTy + b)
		}, this, [b, a]))
	};
	c.clear = function() {
		this.lineY = this.lineX = this.commandQueue.length = 0;
		this.fillStyleColor = this.strokeStyleColor = null
	};
	c.createEndFillCommand = function() {
		this.endFillCommand || (this.endFillCommand = new d(function() {
			this.canvasContext.fill();
			this.canvasContext.closePath()
		}, this, null))
	};
	c.endFill = function() {
		null != this.fillStyleColor && this._fill();
		this.fillStyleColor = null
	};
	c._fill = function() {
		this.fillStyleColor && (this.createEndFillCommand(), this.commandQueue.push(this.endFillCommand))
	};
	c.createEndLineCommand = function() {
		this.endLineCommand || (this.endLineCommand = new d(function() {
			this.canvasContext.stroke();
			this.canvasContext.closePath()
		}, this, null))
	};
	c._draw = function(b) {
		this.renderContext = b;
		b = this.canvasContext = this.renderContext.canvasContext;
		b.save();
		var a = this.commandQueue.length;
		this.strokeStyleColor && 0 < a && this.commandQueue[a - 1] != this.endLineCommand && (this.createEndLineCommand(), this.commandQueue.push(this.endLineCommand), a = this.commandQueue.length);
		for (var c = 0; c < a; c++) {
			var d =
				this.commandQueue[c];
			d.method.apply(d.thisObject, d.args)
		}
		b.restore()
	};
	var d = function() {
		return function(b, a, c) {
			this.method = b;
			this.thisObject = a;
			this.args = c
		}
	}();
	d.prototype.__class__ = "Command";
	c._setStyle = function(b) {
		this.canvasContext.fillStyle = b;
		this.canvasContext.beginPath()
	};
	c.init = function() {
		for (var b in c) egret.Graphics.prototype[b] = c[b];
		egret.RendererContext.createRendererContext = function(a) {
			return new egret.HTML5CanvasRenderer(a)
		}
	}
})(egret_h5_graphics || (egret_h5_graphics = {}));
egret_h5_graphics.init();
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a(a) {
			b.call(this);
			this.size = 2E3;
			this.vertSize = 6;
			this.contextLost = !1;
			this.glContextId = 0;
			this.currentBlendMode = "";
			this.currentBaseTexture = null;
			this.currentBatchSize = 0;
			this.maskList = [];
			this.maskDataFreeList = [];
			this.canvasContext = document.createElement("canvas").getContext("2d");
			this.canvas = a || this.createCanvas();
			this.canvas.addEventListener("webglcontextlost", this.handleContextLost.bind(this), !1);
			this.canvas.addEventListener("webglcontextrestored",
				this.handleContextRestored.bind(this), !1);
			this.projectionX = this.canvas.width / 2;
			this.projectionY = -this.canvas.height / 2;
			a = 6 * this.size;
			this.vertices = new Float32Array(4 * this.size * this.vertSize);
			this.indices = new Uint16Array(a);
			for (var d = 0, n = 0; d < a; d += 6, n += 4) this.indices[d + 0] = n + 0, this.indices[d + 1] = n + 1, this.indices[d + 2] = n + 2, this.indices[d + 3] = n + 0, this.indices[d + 4] = n + 2, this.indices[d + 5] = n + 3;
			this.initWebGL();
			this.shaderManager = new c.WebGLShaderManager(this.gl);
			this.worldTransform = new c.Matrix;
			this.initBlendMode();
			c.MainContext.instance.addEventListener(c.Event.FINISH_RENDER, this._draw, this);
			c.TextField.prototype._draw = function(a) {
				this.getDirty() && (this.cacheAsBitmap = !0);
				c.DisplayObject.prototype._draw.call(this, a)
			}
		}
		__extends(a, b);
		a.prototype.createCanvas = function() {
			var a = c.Browser.getInstance().$("#egretCanvas");
			if (!a) {
				var b = document.getElementById(c.StageDelegate.canvas_div_name),
					a = c.Browser.getInstance().$new("canvas");
				a.id = "egretCanvas";
				a.width = c.MainContext.instance.stage.stageWidth;
				a.height = c.MainContext.instance.stage.stageHeight;
				a.style.width = b.style.width;
				a.style.height = b.style.height;
				b.appendChild(a)
			}
			return a
		};
		a.prototype.handleContextLost = function() {
			this.contextLost = !0
		};
		a.prototype.handleContextRestored = function() {
			this.initWebGL();
			this.shaderManager.setContext(this.gl);
			this.contextLost = !1
		};
		a.prototype.initWebGL = function() {
			for (var a = {
				stencil: !0
			}, b, c = ["experimental-webgl", "webgl"], d = 0; d < c.length; d++) {
				try {
					b = this.canvas.getContext(c[d], a)
				} catch (f) {}
				if (b) break
			}
			if (!b) throw Error("\u5f53\u524d\u6d4f\u89c8\u5668\u4e0d\u652f\u6301webgl");
			this.setContext(b)
		};
		a.prototype.setContext = function(a) {
			this.gl = a;
			a.id = this.glContextId++;
			this.vertexBuffer = a.createBuffer();
			this.indexBuffer = a.createBuffer();
			a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
			a.bufferData(a.ELEMENT_ARRAY_BUFFER, this.indices, a.STATIC_DRAW);
			a.bindBuffer(a.ARRAY_BUFFER, this.vertexBuffer);
			a.bufferData(a.ARRAY_BUFFER, this.vertices, a.DYNAMIC_DRAW);
			a.disable(a.DEPTH_TEST);
			a.disable(a.CULL_FACE);
			a.enable(a.BLEND);
			a.colorMask(!0, !0, !0, !0)
		};
		a.prototype.initBlendMode = function() {
			a.blendModesWebGL[c.BlendMode.NORMAL] =
				[this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA];
			a.blendModesWebGL[c.BlendMode.ADD] = [this.gl.SRC_ALPHA, this.gl.DST_ALPHA]
		};
		a.prototype.start = function() {
			if (!this.contextLost) {
				var a = this.gl;
				a.activeTexture(a.TEXTURE0);
				a.bindBuffer(a.ARRAY_BUFFER, this.vertexBuffer);
				a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
				var b = this.shaderManager.defaultShader;
				a.uniform2f(b.projectionVector, this.projectionX, this.projectionY);
				var c = 4 * this.vertSize;
				a.vertexAttribPointer(b.aVertexPosition, 2, a.FLOAT, !1, c, 0);
				a.vertexAttribPointer(b.aTextureCoord,
					2, a.FLOAT, !1, c, 8);
				a.vertexAttribPointer(b.colorAttribute, 2, a.FLOAT, !1, c, 16)
			}
		};
		a.prototype.clearScreen = function() {
			var a = this.gl;
			a.colorMask(!0, !0, !0, !0);
			for (var b = c.RenderFilter.getInstance().getDrawAreaList(), d = 0, h = b.length; d < h; d++) {
				var f = b[d];
				a.viewport(f.x, f.y, f.width, f.height);
				a.bindFramebuffer(a.FRAMEBUFFER, null);
				a.clearColor(0, 0, 0, 0);
				a.clear(a.COLOR_BUFFER_BIT)
			}
			this.renderCost = 0
		};
		a.prototype.setBlendMode = function(b) {
			b || (b = c.BlendMode.NORMAL);
			if (this.currentBlendMode != b) {
				var d = a.blendModesWebGL[b];
				d && (this.gl.blendFunc(d[0], d[1]), this.currentBlendMode = b)
			}
		};
		a.prototype.drawImage = function(a, b, d, h, f, g, k, p, m) {
			if (!this.contextLost) {
				var q = c.MainContext.instance.rendererContext.texture_scale_factor;
				b /= q;
				d /= q;
				h /= q;
				f /= q;
				this.createWebGLTexture(a);
				if (a.webGLTexture !== this.currentBaseTexture || this.currentBatchSize >= this.size) this._draw(), this.currentBaseTexture = a.webGLTexture;
				var s = this.worldTransform,
					r = s.a,
					t = s.b,
					u = s.c,
					v = s.d,
					x = s.tx,
					y = s.ty;
				0 == g && 0 == k || s.append(1, 0, 0, 1, g, k);
				1 == h / p && 1 == f / m || s.append(p / h,
					0, 0, m / f, 0, 0);
				g = s.a;
				k = s.b;
				p = s.c;
				m = s.d;
				var q = s.tx,
					w = s.ty;
				s.a = r;
				s.b = t;
				s.c = u;
				s.d = v;
				s.tx = x;
				s.ty = y;
				r = a._sourceWidth;
				t = a._sourceHeight;
				a = h;
				s = f;
				b /= r;
				d /= t;
				h /= r;
				f /= t;
				r = this.vertices;
				t = 4 * this.currentBatchSize * this.vertSize;
				u = this.worldAlpha;
				r[t++] = q;
				r[t++] = w;
				r[t++] = b;
				r[t++] = d;
				r[t++] = u;
				r[t++] = 16777215;
				r[t++] = g * a + q;
				r[t++] = k * a + w;
				r[t++] = h + b;
				r[t++] = d;
				r[t++] = u;
				r[t++] = 16777215;
				r[t++] = g * a + p * s + q;
				r[t++] = m * s + k * a + w;
				r[t++] = h + b;
				r[t++] = f + d;
				r[t++] = u;
				r[t++] = 16777215;
				r[t++] = p * s + q;
				r[t++] = m * s + w;
				r[t++] = b;
				r[t++] = f + d;
				r[t++] = u;
				r[t++] =
					16777215;
				this.currentBatchSize++
			}
		};
		a.prototype._draw = function() {
			if (0 != this.currentBatchSize && !this.contextLost) {
				var a = c.getTimer();
				this.start();
				var b = this.gl;
				b.bindTexture(b.TEXTURE_2D, this.currentBaseTexture);
				var d = this.vertices.subarray(0, 4 * this.currentBatchSize * this.vertSize);
				b.bufferSubData(b.ARRAY_BUFFER, 0, d);
				b.drawElements(b.TRIANGLES, 6 * this.currentBatchSize, b.UNSIGNED_SHORT, 0);
				this.currentBatchSize = 0;
				this.renderCost += c.getTimer() - a;
				c.Profiler.getInstance().onDrawImage()
			}
		};
		a.prototype.setTransform =
			function(a) {
				var b = this.worldTransform;
				b.a = a.a;
				b.b = a.b;
				b.c = a.c;
				b.d = a.d;
				b.tx = a.tx;
				b.ty = a.ty
		};
		a.prototype.setAlpha = function(a, b) {
			this.worldAlpha = a;
			this.setBlendMode(b)
		};
		a.prototype.createWebGLTexture = function(a) {
			if (!a.webGLTexture) {
				var b = this.gl;
				a.webGLTexture = b.createTexture();
				b.bindTexture(b.TEXTURE_2D, a.webGLTexture);
				b.pixelStorei(b.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0);
				b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, b.RGBA, b.UNSIGNED_BYTE, a._bitmapData);
				b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.LINEAR);
				b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.LINEAR);
				b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE);
				b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE);
				b.bindTexture(b.TEXTURE_2D, null)
			}
		};
		a.prototype.pushMask = function(a) {
			this._draw();
			var b = this.gl;
			0 == this.maskList.length && (b.enable(b.STENCIL_TEST), b.stencilFunc(b.ALWAYS, 1, 1));
			var c = this.maskDataFreeList.pop();
			c ? (c.x = a.x, c.y = a.y, c.w = a.width, c.h = a.height) : c = {
				x: a.x,
				y: a.y,
				w: a.width,
				h: a.height
			};
			this.maskList.push(c);
			b.colorMask(!1, !1, !1, !1);
			b.stencilOp(b.KEEP, b.KEEP, b.INCR);
			this.renderGraphics(c);
			b.colorMask(!0, !0, !0, !0);
			b.stencilFunc(b.NOTEQUAL, 0, this.maskList.length);
			b.stencilOp(b.KEEP, b.KEEP, b.KEEP)
		};
		a.prototype.popMask = function() {
			this._draw();
			var a = this.gl,
				b = this.maskList.pop();
			b && (a.colorMask(!1, !1, !1, !1), a.stencilOp(a.KEEP, a.KEEP, a.DECR), this.renderGraphics(b), a.colorMask(!0, !0, !0, !0), a.stencilFunc(a.NOTEQUAL, 0, this.maskList.length), a.stencilOp(a.KEEP, a.KEEP, a.KEEP), this.maskDataFreeList.push(b));
			0 == this.maskList.length &&
				a.disable(a.STENCIL_TEST)
		};
		a.prototype.setupFont = function(a) {
			var b = this.canvasContext,
				c = a.italic ? "italic " : "normal ",
				c = c + (a.bold ? "bold " : "normal "),
				c = c + (a.size + "px " + a.fontFamily);
			b.font = c;
			b.textAlign = "left";
			b.textBaseline = "middle"
		};
		a.prototype.measureText = function(a) {
			return this.canvasContext.measureText(a).width
		};
		a.prototype.renderGraphics = function(a) {
			var b = this.gl,
				c = this.shaderManager.primitiveShader;
			this.graphicsPoints ? (this.graphicsPoints.length = 0, this.graphicsIndices.length = 0) : (this.graphicsPoints =
				[], this.graphicsIndices = [], this.graphicsBuffer = b.createBuffer(), this.graphicsIndexBuffer = b.createBuffer());
			this.updateGraphics(a);
			this.shaderManager.activateShader(c);
			b.blendFunc(b.ONE, b.ONE_MINUS_SRC_ALPHA);
			b.uniformMatrix3fv(c.translationMatrix, !1, this.worldTransform.toArray(!0));
			b.uniform2f(c.projectionVector, this.projectionX, -this.projectionY);
			b.uniform2f(c.offsetVector, 0, 0);
			b.uniform3fv(c.tintColor, [1, 1, 1]);
			b.uniform1f(c.alpha, this.worldAlpha);
			b.bindBuffer(b.ARRAY_BUFFER, this.graphicsBuffer);
			b.vertexAttribPointer(c.aVertexPosition, 2, b.FLOAT, !1, 24, 0);
			b.vertexAttribPointer(c.colorAttribute, 4, b.FLOAT, !1, 24, 8);
			b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, this.graphicsIndexBuffer);
			b.drawElements(b.TRIANGLE_STRIP, this.graphicsIndices.length, b.UNSIGNED_SHORT, 0);
			this.shaderManager.activateShader(this.shaderManager.defaultShader)
		};
		a.prototype.updateGraphics = function(a) {
			var b = this.gl;
			this.buildRectangle(a);
			b.bindBuffer(b.ARRAY_BUFFER, this.graphicsBuffer);
			b.bufferData(b.ARRAY_BUFFER, new Float32Array(this.graphicsPoints),
				b.STATIC_DRAW);
			b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, this.graphicsIndexBuffer);
			b.bufferData(b.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.graphicsIndices), b.STATIC_DRAW)
		};
		a.prototype.buildRectangle = function(a) {
			var b = a.x,
				c = a.y,
				d = a.w;
			a = a.h;
			var f = this.graphicsPoints,
				g = this.graphicsIndices,
				k = f.length / 6;
			f.push(b, c);
			f.push(0, 0, 0, 1);
			f.push(b + d, c);
			f.push(0, 0, 0, 1);
			f.push(b, c + a);
			f.push(0, 0, 0, 1);
			f.push(b + d, c + a);
			f.push(0, 0, 0, 1);
			g.push(k, k, k + 1, k + 2, k + 3, k + 3)
		};
		a.blendModesWebGL = {};
		return a
	}(c.RendererContext);
	c.WebGLRenderer =
		d;
	d.prototype.__class__ = "egret.WebGLRenderer"
})(egret || (egret = {}));
(function(c) {
	var d = function() {
		function b() {}
		b.compileProgram = function(a, c, d) {
			d = b.compileFragmentShader(a, d);
			c = b.compileVertexShader(a, c);
			var n = a.createProgram();
			a.attachShader(n, c);
			a.attachShader(n, d);
			a.linkProgram(n);
			a.getProgramParameter(n, a.LINK_STATUS);
			return n
		};
		b.compileFragmentShader = function(a, c) {
			return b._compileShader(a, c, a.FRAGMENT_SHADER)
		};
		b.compileVertexShader = function(a, c) {
			return b._compileShader(a, c, a.VERTEX_SHADER)
		};
		b._compileShader =
			function(a, b, c) {
				c = a.createShader(c);
				a.shaderSource(c, b);
				a.compileShader(c);
				return a.getShaderParameter(c, a.COMPILE_STATUS) ? c : null
		};
		b.checkCanUseWebGL = function() {
			if (void 0 == b.canUseWebGL) try {
				var a = document.createElement("canvas");
				b.canUseWebGL = !! window.WebGLRenderingContext && !(!a.getContext("webgl") && !a.getContext("experimental-webgl"))
			} catch (c) {
				b.canUseWebGL = !1
			}
			return b.canUseWebGL
		};
		return b
	}();
	c.WebGLUtils = d;
	d.prototype.__class__ = "egret.WebGLUtils"
})(egret || (egret = {}));
(function(c) {
	var d = function() {
		function c(a) {
			this.maxAttibs = 10;
			this.attribState = [];
			this.tempAttribState = [];
			for (var b = 0; b < this.maxAttibs; b++) this.attribState[b] = !1;
			this.setContext(a)
		}
		c.prototype.setContext = function(c) {
			this.gl = c;
			this.primitiveShader = new a(c);
			this.defaultShader = new b(c);
			this.activateShader(this.defaultShader)
		};
		c.prototype.activateShader = function(a) {
			this.gl.useProgram(a.program);
			this.setAttribs(a.attributes)
		};
		c.prototype.setAttribs = function(a) {
			var b, c;
			c = this.tempAttribState.length;
			for (b =
				0; b < c; b++) this.tempAttribState[b] = !1;
			c = a.length;
			for (b = 0; b < c; b++) this.tempAttribState[a[b]] = !0;
			a = this.gl;
			c = this.attribState.length;
			for (b = 0; b < c; b++) this.attribState[b] !== this.tempAttribState[b] && (this.attribState[b] = this.tempAttribState[b], this.tempAttribState[b] ? a.enableVertexAttribArray(b) : a.disableVertexAttribArray(b))
		};
		return c
	}();
	c.WebGLShaderManager = d;
	d.prototype.__class__ = "egret.WebGLShaderManager";
	var b = function() {
		function a(b) {
			this.defaultVertexSrc = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec2 aColor;\nuniform vec2 projectionVector;\nuniform vec2 offsetVector;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nconst vec2 center = vec2(-1.0, 1.0);\nvoid main(void) {\n   gl_Position = vec4( ((aVertexPosition + offsetVector) / projectionVector) + center , 0.0, 1.0);\n   vTextureCoord = aTextureCoord;\n   vec3 color = mod(vec3(aColor.y/65536.0, aColor.y/256.0, aColor.y), 256.0) / 256.0;\n   vColor = vec4(color * aColor.x, aColor.x);\n}";
			this.program = null;
			this.fragmentSrc = "precision lowp float;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nuniform sampler2D uSampler;\nvoid main(void) {\n   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;\n}";
			this.gl = b;
			this.init()
		}
		a.prototype.init = function() {
			var a = this.gl,
				b = c.WebGLUtils.compileProgram(a, this.defaultVertexSrc, this.fragmentSrc);
			a.useProgram(b);
			this.uSampler = a.getUniformLocation(b, "uSampler");
			this.projectionVector = a.getUniformLocation(b, "projectionVector");
			this.offsetVector =
				a.getUniformLocation(b, "offsetVector");
			this.dimensions = a.getUniformLocation(b, "dimensions");
			this.aVertexPosition = a.getAttribLocation(b, "aVertexPosition");
			this.aTextureCoord = a.getAttribLocation(b, "aTextureCoord");
			this.colorAttribute = a.getAttribLocation(b, "aColor"); - 1 === this.colorAttribute && (this.colorAttribute = 2);
			this.attributes = [this.aVertexPosition, this.aTextureCoord, this.colorAttribute];
			this.program = b
		};
		return a
	}();
	c.EgretShader = b;
	b.prototype.__class__ = "egret.EgretShader";
	var a = function() {
		function a(b) {
			this.alpha =
				this.translationMatrix = this.attributes = this.colorAttribute = this.aVertexPosition = this.tintColor = this.offsetVector = this.projectionVector = this.program = null;
			this.fragmentSrc = "precision mediump float;\nvarying vec4 vColor;\nvoid main(void) {\n   gl_FragColor = vColor;\n}";
			this.vertexSrc = "attribute vec2 aVertexPosition;\nattribute vec4 aColor;\nuniform mat3 translationMatrix;\nuniform vec2 projectionVector;\nuniform vec2 offsetVector;\nuniform float alpha;\nuniform vec3 tint;\nvarying vec4 vColor;\nvoid main(void) {\n   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);\n   v -= offsetVector.xyx;\n   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);\n   vColor = aColor * vec4(tint * alpha, alpha);\n}";
			this.gl = b;
			this.init()
		}
		a.prototype.init = function() {
			var a = this.gl,
				b = c.WebGLUtils.compileProgram(a, this.vertexSrc, this.fragmentSrc);
			a.useProgram(b);
			this.projectionVector = a.getUniformLocation(b, "projectionVector");
			this.offsetVector = a.getUniformLocation(b, "offsetVector");
			this.tintColor = a.getUniformLocation(b, "tint");
			this.aVertexPosition = a.getAttribLocation(b, "aVertexPosition");
			this.colorAttribute = a.getAttribLocation(b, "aColor");
			this.attributes = [this.aVertexPosition, this.colorAttribute];
			this.translationMatrix =
				a.getUniformLocation(b, "translationMatrix");
			this.alpha = a.getUniformLocation(b, "alpha");
			this.program = b
		};
		return a
	}();
	c.PrimitiveShader = a;
	a.prototype.__class__ = "egret.PrimitiveShader"
})(egret || (egret = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a() {
			b.call(this)
		}
		__extends(a, b);
		a.prototype.proceed = function(a) {
			function b(d) {
				c.IOErrorEvent.dispatchIOErrorEvent(a)
			}

			function d(b) {
				switch (a.dataFormat) {
					case c.URLLoaderDataFormat.TEXT:
						a.data = f.responseText;
						break;
					case c.URLLoaderDataFormat.VARIABLES:
						a.data = new c.URLVariables(f.responseText);
						break;
					case c.URLLoaderDataFormat.BINARY:
						a.data = f.response;
						break;
					default:
						a.data = f.responseText
				}
				c.callLater(c.Event.dispatchEvent, c.Event, a, c.Event.COMPLETE)
			}
			if (a.dataFormat ==
				c.URLLoaderDataFormat.TEXTURE) this.loadTexture(a);
			else if (a.dataFormat == c.URLLoaderDataFormat.SOUND) this.loadSound(a);
			else {
				var h = a._request,
					f = this.getXHR();
				f.onerror = b;
				f.onload = d;
				var g = c.NetContext._getUrl(h);
				f.open(h.method, g, !0);
				this.setResponseType(f, a.dataFormat);
				h.method != c.URLRequestMethod.GET && h.data ? h.data instanceof c.URLVariables ? (f.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), f.send(h.data.toString())) : (f.setRequestHeader("Content-Type", "multipart/form-data"), f.send(h.data)) :
					f.send()
			}
		};
		a.prototype.loadSound = function(a) {
			function b(f) {
				window.clearTimeout(h.__timeoutId);
				h.removeEventListener("canplaythrough", b, !1);
				h.removeEventListener("error", d, !1);
				f = new c.Sound;
				f._setAudio(h);
				a.data = f;
				c.callLater(c.Event.dispatchEvent, c.Event, a, c.Event.COMPLETE)
			}

			function d(f) {
				window.clearTimeout(h.__timeoutId);
				h.removeEventListener("canplaythrough", b, !1);
				h.removeEventListener("error", d, !1);
				c.IOErrorEvent.dispatchIOErrorEvent(a)
			}
			var h = new Audio(a._request.url);
			h.__timeoutId = window.setTimeout(b,
				100);
			h.addEventListener("canplaythrough", b, !1);
			h.addEventListener("error", d, !1);
			h.load()
		};
		a.prototype.getXHR = function() {
			return window.XMLHttpRequest ? new window.XMLHttpRequest : new ActiveXObject("MSXML2.XMLHTTP")
		};
		a.prototype.setResponseType = function(a, b) {
			switch (b) {
				case c.URLLoaderDataFormat.TEXT:
				case c.URLLoaderDataFormat.VARIABLES:
					a.responseType = c.URLLoaderDataFormat.TEXT;
					break;
				case c.URLLoaderDataFormat.BINARY:
					a.responseType = "arraybuffer";
					break;
				default:
					a.responseType = b
			}
		};
		a.prototype.loadTexture =
			function(a) {
				var b = a._request,
					d = new Image;
				d.crossOrigin = "Anonymous";
				d.onload = function(b) {
					d.onerror = null;
					d.onload = null;
					b = new c.Texture;
					b._setBitmapData(d);
					a.data = b;
					c.callLater(c.Event.dispatchEvent, c.Event, a, c.Event.COMPLETE)
				};
				d.onerror = function(b) {
					d.onerror = null;
					d.onload = null;
					c.IOErrorEvent.dispatchIOErrorEvent(a)
				};
				d.src = b.url
		};
		return a
	}(c.NetContext);
	c.HTML5NetContext = d;
	d.prototype.__class__ = "egret.HTML5NetContext"
})(egret || (egret = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a() {
			b.call(this);
			this._isTouchDown = !1;
			this.rootDiv = document.getElementById(c.StageDelegate.canvas_div_name)
		}
		__extends(a, b);
		a.prototype.prevent = function(a) {
			a.stopPropagation();
			!0 != a.isScroll && a.preventDefault()
		};
		a.prototype.run = function() {
			var a = this;
			window.navigator.msPointerEnabled ? (this.rootDiv.addEventListener("MSPointerDown", function(b) {
				a._onTouchBegin(b);
				a.prevent(b)
			}, !1), this.rootDiv.addEventListener("MSPointerMove", function(b) {
				a._onTouchMove(b);
				a.prevent(b)
			}, !1), this.rootDiv.addEventListener("MSPointerUp", function(b) {
				a._onTouchEnd(b);
				a.prevent(b)
			}, !1)) : c.MainContext.deviceType == c.MainContext.DEVICE_MOBILE ? this.addTouchListener() : c.MainContext.deviceType == c.MainContext.DEVICE_PC && (this.addTouchListener(), this.addMouseListener());
			window.addEventListener("mousedown", function(b) {
				a.inOutOfCanvas(b) ? a.dispatchLeaveStageEvent() : a._isTouchDown = !0
			});
			window.addEventListener("mouseup", function(b) {
				a._isTouchDown && a.inOutOfCanvas(b) && a.dispatchLeaveStageEvent();
				a._isTouchDown = !1
			})
		};
		a.prototype.addMouseListener = function() {
			var a = this;
			this.rootDiv.addEventListener("mousedown", function(b) {
				a._onTouchBegin(b)
			});
			this.rootDiv.addEventListener("mousemove", function(b) {
				a._onTouchMove(b)
			});
			this.rootDiv.addEventListener("mouseup", function(b) {
				a._onTouchEnd(b)
			})
		};
		a.prototype.addTouchListener = function() {

			var a = this;
			this.rootDiv.addEventListener("touchstart", function(b) {
				for (var c = b.changedTouches.length, d = 0; d < c; d++) a._onTouchBegin(b.changedTouches[d]);
				a.prevent(b)
			}, !1);
			this.rootDiv.addEventListener("touchmove",
				function(b) {
					for (var c = b.changedTouches.length, d = 0; d < c; d++) a._onTouchMove(b.changedTouches[d]);
					a.prevent(b)
				}, !1);
			this.rootDiv.addEventListener("touchend", function(b) {
				for (var c = b.changedTouches.length, d = 0; d < c; d++) a._onTouchEnd(b.changedTouches[d]);
				a.prevent(b)
			}, !1);
			this.rootDiv.addEventListener("touchcancel", function(b) {
				for (var c = b.changedTouches.length, d = 0; d < c; d++) a._onTouchEnd(b.changedTouches[d]);
				a.prevent(b)
			}, !1)
		};
		a.prototype.inOutOfCanvas = function(a) {
			a = this.getLocation(this.rootDiv, a);
			return 0 >
				a.x || 0 > a.y || a.x > c.MainContext.instance.stage.width || a.y > c.MainContext.instance.stage.height ? !0 : !1
		};
		a.prototype.dispatchLeaveStageEvent = function() {
			c.MainContext.instance.stage.dispatchEventWith(c.Event.LEAVE_STAGE)
		};
		a.prototype._onTouchBegin = function(a) {
			var b = this.getLocation(this.rootDiv, a),
				c = -1;
			a.hasOwnProperty("identifier") && (c = a.identifier);
			this.onTouchBegan(b.x, b.y, c)
		};
		a.prototype._onTouchMove = function(a) {
			var b = this.getLocation(this.rootDiv, a),
				c = -1;
			a.hasOwnProperty("identifier") && (c = a.identifier);
			this.onTouchMove(b.x, b.y, c)
		};
		a.prototype._onTouchEnd = function(a) {
			var b = this.getLocation(this.rootDiv, a),
				c = -1;
			a.hasOwnProperty("identifier") && (c = a.identifier);
			this.onTouchEnd(b.x, b.y, c)
		};
		a.prototype.getLocation = function(a, b) {
			var d = document.documentElement,
				h = window,
				f, g;
			"function" === typeof a.getBoundingClientRect ? (g = a.getBoundingClientRect(), f = g.left, g = g.top) : g = f = 0;
			f += h.pageXOffset - d.clientLeft;
			g += h.pageYOffset - d.clientTop;
			null != b.pageX ? (d = b.pageX, h = b.pageY) : (f -= document.body.scrollLeft, g -= document.body.scrollTop,
				d = b.clientX, h = b.clientY);
			var k = c.Point.identity;
			k.x = (d - f) / c.StageDelegate.getInstance().getScaleX();
			k.y = (h - g) / c.StageDelegate.getInstance().getScaleY();
			return k
		};
		return a
	}(c.TouchContext);
	c.HTML5TouchContext = d;
	d.prototype.__class__ = "egret.HTML5TouchContext"
})(egret || (egret = {}));
__extends = this.__extends || function(c, d) {
	function b() {
		this.constructor = c
	}
	for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
	b.prototype = d.prototype;
	c.prototype = new b
};
(function(c) {
	var d = function(b) {
		function a() {
			b.call(this);
			this._size = 30;
			this._isShow = !0;
			this._inputType = this._text = "";
			this._canUse = !1
		}
		__extends(a, b);
		a.prototype._getText = function() {
			return this._isShow ? this.inputElement.value : this._text
		};
		a.prototype._setText = function(a) {
			this._isShow ? this.inputElement.value = a : this._text = a
		};
		a.prototype._setTextType = function(a) {
			this.inputElement.type = a
		};
		a.prototype._getTextType = function() {
			return this.inputElement.type
		};
		a.prototype._setMultiline = function(a) {
			b.prototype._setMultiline.call(this,
				a);
			this._createInput()
		};
		a.prototype._open = function(a, b, d, h) {
			"undefined" === typeof d && (d = 160);
			var f = c.StageDelegate.getInstance().getScaleX(),
				g = c.StageDelegate.getInstance().getScaleY();
			h = c.Browser.getInstance().$new("div");
			h.position.x = a * f;
			h.position.y = b * g;
			h.style.width = d + "px";
			h.scale.x = f;
			h.scale.y = g;
			h.transforms();
			h.style[egret_dom.getTrans("transformOrigin")] = "0% 0% 0px";
			a = this.getStageDelegateDiv();
			a.appendChild(h);
			this.div = h;
			this._createInput();
			h && !h.parentNode && (a = this.getStageDelegateDiv(), a.appendChild(h));
			h.style.display = "block";
			this._call = this.onHandler.bind(this)
		};
		a.prototype._createInput = function() {
			var a = !1,
				b;
			this._multiline && "textarea" != this._inputType ? (a = !0, this._inputType = "textarea", b = document.createElement("textarea")) : this._multiline || "input" == this._inputType || (a = !0, this._inputType = "input", b = document.createElement("input"));
			a && (b.type = "text", b.style.fontSize = this._size + "px", b.style.lineHeight = this._size + "px", b.style.textAlign = "left", b.style.fontFamily = "Arial", b.style.fontStyle = "normal", b.style.fontWeight =
				"normal", b.style.color = "#FFFFFF", b.style.border = "none", b.style.background = "none", b.style.width = this.div.style.width, b.style.padding = "0", b.style.outline = "medium", this.inputElement && this.inputElement.parentNode ? (this.inputElement.parentNode.removeChild(this.inputElement), this._removeListeners(), this.inputElement = b, this._addListeners()) : this.inputElement = b, this.div.appendChild(b))
		};
		a.prototype._addListeners = function() {
			window.navigator.msPointerEnabled ? (this.addListener("MSPointerDown"), this.addListener("MSPointerUp")) :
				c.MainContext.deviceType == c.MainContext.DEVICE_MOBILE ? (this.addListener("touchstart"), this.addListener("touchend"), this.addListener("touchcancel")) : c.MainContext.deviceType == c.MainContext.DEVICE_PC && (this.addListener("mousedown"), this.addListener("mouseup"));
			this.addListener("focus");
			this.addListener("blur");
			this._isShow = !0;
			this._closeInput();
			this.closeKeyboard()
		};
		a.prototype._removeListeners = function() {
			window.navigator.msPointerEnabled ? (this.removeListener("MSPointerDown"), this.removeListener("MSPointerUp")) :
				c.MainContext.deviceType == c.MainContext.DEVICE_MOBILE ? (this.removeListener("touchstart"), this.removeListener("touchend"), this.removeListener("touchcancel")) : c.MainContext.deviceType == c.MainContext.DEVICE_PC && (this.removeListener("mousedown"), this.removeListener("mouseup"));
			this.removeListener("blur");
			this.removeListener("focus")
		};
		a.prototype.addListener = function(a) {
			this.inputElement.addEventListener(a, this._call)
		};
		a.prototype.removeListener = function(a) {
			this.inputElement.removeEventListener(a, this._call)
		};
		a.prototype.onHandler = function(a) {
			a.isScroll = !0;
			"blur" == a.type ? (this.dispatchEvent(new c.Event("blur")), this._closeInput()) : "focus" == a.type ? this._canUse ? (this._canUse = !1, this._openInput(), this.dispatchEvent(new c.Event("focus"))) : (a.isScroll = !1, this.inputElement.blur()) : ("touchstart" == a.type || "mousedown" == a.type || "MSPointerDown" == a.type) && this._isShow && a.stopPropagation()
		};
		a.prototype._show = function() {
			this._canUse = !0
		};
		a.prototype._hide = function() {
			this._canUse = !1;
			this._closeInput();
			this.closeKeyboard()
		};
		a.prototype._openInput = function() {
			this._isShow || (this._isShow = !0, this.inputElement.value = this._text)
		};
		a.prototype._closeInput = function() {
			this._isShow && (this._isShow = !1, this._text = this.inputElement.value, this.inputElement.value = "")
		};
		a.prototype.closeKeyboard = function() {
			this.inputElement.focus();
			this.inputElement.blur()
		};
		a.prototype.getStageDelegateDiv = function() {
			var a = c.Browser.getInstance().$("#StageDelegateDiv");
			a || (a = c.Browser.getInstance().$new("div"), a.id = "StageDelegateDiv", document.getElementById(c.StageDelegate.canvas_div_name).appendChild(a),
				a.transforms());
			return a
		};
		a.prototype._remove = function() {
			var a = this.div;
			a && a.parentNode && a.parentNode.removeChild(a)
		};
		a.prototype.changePosition = function(a, b) {
			var d = c.StageDelegate.getInstance().getScaleX(),
				h = c.StageDelegate.getInstance().getScaleY();
			this.div.position.x = a * d;
			this.div.position.y = b * h;
			this.div.transforms()
		};
		a.prototype.changeSize = function(a, b) {
			this.inputElement.style.width = a + "px";
			this.div.style.width = a + "px";
			this.div.transforms()
		};
		a.prototype.setSize = function(a) {
			this._size = a;
			this.inputElement.style.fontSize =
				this._size + "px"
		};
		a.prototype.setTextColor = function(a) {
			this.inputElement.style.color = a
		};
		a.prototype.setTextFontFamily = function(a) {
			this.inputElement.style.fontFamily = a
		};
		a.prototype.setWidth = function(a) {
			this.inputElement.style.width = a + "px"
		};
		a.prototype.setHeight = function(a) {
			this.inputElement.style.height = a + "px"
		};
		return a
	}(c.StageText);
	c.HTML5StageText = d;
	d.prototype.__class__ = "egret.HTML5StageText"
})(egret || (egret = {}));
egret.StageText.create = function() {
	return new egret.HTML5StageText
};
var utils;
(function(c) {
	var d = function() {
		function b() {}
		b.hitTest = function(a, b) {
			var c = a.getBounds(),
				d = b.getBounds();
			c.x = a.x;
			c.y = a.y;
			d.x = b.x;
			d.y = b.y;
			return c.intersects(d)
		};
		return b
	}();
	c.GameUtil = d;
	d.prototype.__class__ = "utils.GameUtil";
	c.createBitmapByName = function(b) {
		var a = new egret.Bitmap;
		b = RES.getRes(b);
		a.texture = b;
		return a
	};
	c.createSpriteByName = function(b) {
		var a = new egret.Bitmap;
		b = RES.getRes(b);
		a.texture = b;
		b = new egret.Sprite;
		b.addChild(a);
		return b
	};
	c.createSoundByName = function(b) {
		return RES.getRes(b)
	};
	c.createRectangular =
		function(b, a, c, d, n, h) {
			"undefined" === typeof b && (b = 0);
			"undefined" === typeof a && (a = 0);
			"undefined" === typeof c && (c = 480);
			"undefined" === typeof d && (d = 640);
			"undefined" === typeof n && (n = 1);
			"undefined" === typeof h && (h = 0);
			var f = new egret.Sprite;
			f.graphics.beginFill(h, n);
			f.graphics.drawRect(b, a, c, d);
			f.graphics.endFill();
			f.width = c;
			f.height = d;
			return f
	};
	c.createCircle = function(b, a, c, d, n) {
		"undefined" === typeof b && (b = 0);
		"undefined" === typeof a && (a = 0);
		"undefined" === typeof c && (c = 10);
		"undefined" === typeof d && (d = 1);
		"undefined" ===
			typeof n && (n = 16777215);
		var h = new egret.Sprite;
		h.graphics.beginFill(n, d);
		h.graphics.drawCircle(b, a, c);
		h.graphics.endFill();
		return h
	};
	c.createTextLabel = function(b, a, c, d, n, h, f, g, k, p, m, q) {
		"undefined" === typeof a && (a = 0);
		"undefined" === typeof c && (c = "left");
		"undefined" === typeof d && (d = "none");
		"undefined" === typeof n && (n = 14);
		"undefined" === typeof h && (h = 0);
		"undefined" === typeof f && (f = 0);
		"undefined" === typeof g && (g = 0);
		"undefined" === typeof k && (k = 0);
		"undefined" === typeof p && (p = 0);
		"undefined" === typeof m && (m = 0);
		"undefined" ===
			typeof q && (q = 0);
		b = new egret.TextField;
		b.textColor = a;
		b.textAlign = c;
		b.text = d;
		b.size = n;
		0 != h && (b.width = h);
		0 != f && 0 != g && (b.strokeColor = f, b.stroke = g);
		b.rotation = m;
		0 != q && (b.skewX = q);
		b.x = k;
		b.y = p;
		return b
	};
	c.randomInt = function(b, a) {
		if (0 >= a - b) return 0;
		var c = a - b;
		return Math.floor(Math.random() * c) + b
	};
	c.createBitmap = function(b, a, c, d) {
		"undefined" === typeof c && (c = 0);
		"undefined" === typeof d && (d = 0);
		var n = new egret.Bitmap;
		n.texture = b.getTexture(a);
		n.x = c;
		n.y = d;
		return n
	};
	c.isWeiXin = function() {
		return "MicroMessenger" == navigator.userAgent.toString().match(/MicroMessenger/i) ? !0 : !1
	}
})(utils || (utils = {}));
var __extends = this.__extends || function(c, d) {
		function b() {
			this.constructor = c
		}
		for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
		b.prototype = d.prototype;
		c.prototype = new b
	}, ColorSprite = function(c) {
		function d(b, a, d) {
			c.call(this);
			this.CsId = this.ColorId = this.id = 0;
			this.ColorArr = [];
			this.SpriteSheet = b;
			this.id = a;
			this.CsId = d;
			this.ColorId = Math.floor(8 * Math.random());
			b = "color_" + this.ColorId.toString();
			a = utils.createRectangular(0, 0, 110, 200, 0, 0);
			this.addChild(a);
			a.x = -55;
			switch (this.id) {
				case 0:
					a = new egret.Bitmap;
					a =
						utils.createBitmap(this.SpriteSheet, b, 0, 0);
					this.ColorArr.push(a);
					this.addChild(a);
					break;
				case 1:
					a = utils.createBitmap(this.SpriteSheet, b, 0, 0);
					this.addChild(a);
					this.ColorArr.push(a);
					a = utils.createBitmap(this.SpriteSheet, b, 0, 0);
					this.addChild(a);
					a.x = 42;
					this.ColorArr.push(a);
					break;
				case 2:
					a = utils.createBitmap(this.SpriteSheet, b, 0, 0);
					this.addChild(a);
					this.ColorArr.push(a);
					a = utils.createBitmap(this.SpriteSheet, b, 0, 0);
					this.addChild(a);
					a.y = 42;
					this.ColorArr.push(a);
					break;
				case 3:
					a = utils.createBitmap(this.SpriteSheet,
						b, 0, 0);
					this.addChild(a);
					this.ColorArr.push(a);
					a = utils.createBitmap(this.SpriteSheet, b, 0, 0);
					this.addChild(a);
					a.x = 42;
					this.ColorArr.push(a);
					a = utils.createBitmap(this.SpriteSheet, b, 0, 0);
					this.addChild(a);
					a.y = 42;
					this.ColorArr.push(a);
					break;
				case 4:
					a = utils.createBitmap(this.SpriteSheet, b, 0, 0);
					this.addChild(a);
					this.ColorArr.push(a);
					a = utils.createBitmap(this.SpriteSheet, b, 0, 0);
					this.addChild(a);
					a.y = 42;
					this.ColorArr.push(a);
					a = utils.createBitmap(this.SpriteSheet, b, 0, 0);
					this.addChild(a);
					a.y = 42;
					a.x = 42;
					this.ColorArr.push(a);
					break;
				case 5:
					a = utils.createBitmap(this.SpriteSheet, b, 0, 0);
					this.ColorArr.push(a);
					this.addChild(a);
					a = utils.createBitmap(this.SpriteSheet, b, 0, 0);
					this.ColorArr.push(a);
					this.addChild(a);
					a.x = 42;
					a = utils.createBitmap(this.SpriteSheet, b, 0, 0);
					this.ColorArr.push(a);
					this.addChild(a);
					a.x = 84;
					break;
				case 6:
					a = utils.createBitmap(this.SpriteSheet, b, 0, 0);
					this.ColorArr.push(a);
					this.addChild(a);
					a = utils.createBitmap(this.SpriteSheet, b, 0, 0);
					this.addChild(a);
					a.y = 42;
					this.ColorArr.push(a);
					a = utils.createBitmap(this.SpriteSheet,
						b, 0, 0);
					this.addChild(a);
					a.y = 84;
					this.ColorArr.push(a);
					break;
				case 7:
					a = utils.createBitmap(this.SpriteSheet, b, 0, 0);
					this.addChild(a);
					this.ColorArr.push(a);
					a = utils.createBitmap(this.SpriteSheet, b, 0, 0);
					this.addChild(a);
					a.y = 42;
					this.ColorArr.push(a);
					a = utils.createBitmap(this.SpriteSheet, b, 0, 0);
					this.addChild(a);
					a.x = 42;
					this.ColorArr.push(a);
					a = utils.createBitmap(this.SpriteSheet, b, 0, 0);
					this.addChild(a);
					a.x = 42;
					a.y = 42;
					this.ColorArr.push(a);
					break;
				case 8:
					for (d = 0; 4 > d; d++) a = utils.createBitmap(this.SpriteSheet, b, 0,
						0), this.addChild(a), this.ColorArr.push(a), a.x = 42 * d;
					break;
				case 9:
					for (d = 0; 4 > d; d++) a = utils.createBitmap(this.SpriteSheet, b, 0, 0), this.addChild(a), this.ColorArr.push(a), a.y = 42 * d;
					break;
				case 10:
					for (d = 0; 5 > d; d++) a = utils.createBitmap(this.SpriteSheet, b, 0, 0), this.addChild(a), this.ColorArr.push(a), a.y = 42 * d;
					break;
				case 11:
					for (d = 0; 5 > d; d++) a = utils.createBitmap(this.SpriteSheet, b, 0, 0), this.addChild(a), this.ColorArr.push(a), a.x = 42 * d;
					break;
				case 12:
					for (d = 0; 3 > d; d++) a = utils.createBitmap(this.SpriteSheet,
						b, 0, 0), this.addChild(a), this.ColorArr.push(a), a.x = 42 * d;
					a = utils.createBitmap(this.SpriteSheet, b, 0, 0);
					this.addChild(a);
					a.x = 0;
					a.y = 42;
					this.ColorArr.push(a);
					a = utils.createBitmap(this.SpriteSheet, b, 0, 0);
					this.addChild(a);
					a.x = 0;
					a.y = 84;
					this.ColorArr.push(a);
					break;
				case 13:
					for (d = 0; 3 > d; d++) a = utils.createBitmap(this.SpriteSheet, b, 0, 0), this.addChild(a), this.ColorArr.push(a), a.x = 84, a.y = 42 * d;
					a = utils.createBitmap(this.SpriteSheet, b, 0, 0);
					this.addChild(a);
					a.x = 0;
					a.y = 84;
					this.ColorArr.push(a);
					a = utils.createBitmap(this.SpriteSheet,
						b, 0, 0);
					this.addChild(a);
					a.x = 42;
					a.y = 84;
					this.ColorArr.push(a);
					break;
				case 14:
					for (d = 0; 3 > d; d++) a = utils.createBitmap(this.SpriteSheet, b, 0, 0), this.addChild(a), this.ColorArr.push(a), a.y = 42 * d;
					a = utils.createBitmap(this.SpriteSheet, b, 0, 0);
					this.addChild(a);
					a.x = 42;
					a.y = 84;
					this.ColorArr.push(a);
					a = utils.createBitmap(this.SpriteSheet, b, 0, 0);
					this.addChild(a);
					a.x = 84;
					a.y = 84;
					this.ColorArr.push(a);
					break;
				case 15:
					for (d = 0; 3 > d; d++) a = utils.createBitmap(this.SpriteSheet, b, 0, 0), this.addChild(a), this.ColorArr.push(a), a.x = 42 * d;
					a = utils.createBitmap(this.SpriteSheet, b, 0, 0);
					this.ColorArr.push(a);
					this.addChild(a);
					a.y = 42;
					a = utils.createBitmap(this.SpriteSheet, b, 0, 0);
					this.ColorArr.push(a);
					this.addChild(a);
					a.y = 84
			}
		}
		__extends(d, c);
		return d
	}(egret.Sprite);
ColorSprite.prototype.__class__ = "ColorSprite";
var __extends = this.__extends || function(c, d) {
		function b() {
			this.constructor = c
		}
		for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
		b.prototype = d.prototype;
		c.prototype = new b
	}, MapCalculate = function(c) {
		function d() {
			c.call(this)
		}
		__extends(d, c);
		d.overControl = function(b, a) {
			for (var c = !1, l = b.length - 1; 0 <= l; l--)
				if (null != b[l] && (c = d.SpriteRun(b[l], a))) return !0;
			return !1
		};
		d.SpriteRun = function(b, a) {
			for (var c = !1, l = 0; 10 > l; l++)
				for (var n = 0; 10 > n; n++)
					if (0 == a[l][n] && (c = d.toCalculate(a, l, n, b, !0))) return !0;
			return !1
		};
		d.rmeoveElement =
			function(b, a, c, d) {
				if (0 < b[0].length)
					for (var n = 0; n < b[0].length; n++) {
						for (var h = 138 + 42 * b[0][n], f = a.length - 1; 0 <= f; f--)
							for (var g = a[f].ColorArr.length - 1; 0 <= g; g--) a[f].ColorArr[g].y + a[f].y == h && (a[f].removeChild(a[f].ColorArr[g]), a[f].ColorArr.splice(g, 1), 0 == a[f].ColorArr.length && (c.removeChild(a[f]), a.splice(f, 1)));
						d[b[0][n]] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
						f = utils.createRectangular(0, 0, 420, 40, 1, 16777215);
						c.addChild(f);
						f.x = 32;
						f.y = 138 + 42 * b[0][n];
						egret.Tween.get(f).wait(100).to({
							alpha: 0
						}, 250).call(function() {
							c.removeChild(this)
						})
					}
				if (0 <
					b[1].length) {
					for (n = 0; n < b[1].length; n++) {
						h = 32 + 42 * b[1][n];
						for (f = a.length - 1; 0 <= f; f--)
							for (g = a[f].ColorArr.length - 1; 0 <= g; g--) a[f].ColorArr[g].x + a[f].x == h && (a[f].removeChild(a[f].ColorArr[g]), a[f].ColorArr.splice(g, 1), 0 == a[f].ColorArr.length && (c.removeChild(a[f]), a.splice(f, 1)));
						f = utils.createRectangular(0, 0, 40, 420, 1, 16777215);
						c.addChild(f);
						f.x = 32 + 42 * b[1][n];
						f.y = 138;
						egret.Tween.get(f).wait(100).to({
							alpha: 0
						}, 250).call(function() {
							c.removeChild(this)
						})
					}
					for (a = b[1].length - 1; 0 <= a; a--)
						for (n = 0; 10 > n; n++) d[n][b[1][a]] =
							0
				}
		};
		d.toCalculate = function(b, a, c, d, n) {
			"undefined" === typeof a && (a = 0);
			"undefined" === typeof c && (c = 0);
			"undefined" === typeof d && (d = null);
			"undefined" === typeof n && (n = !1);
			switch (d.id) {
				case 0:
					if (void 0 == b[a][c] || 0 != b[a][c]) return !1;
					if (!n) {
						b[a][c] = 1;
						break
					}
					break;
				case 1:
					if (void 0 == b[a][c] || 0 != b[a][c] || void 0 == b[a][c + 1] || 0 != b[a][c + 1]) return !1;
					if (!n) {
						b[a][c] = 1;
						b[a][c + 1] = 1;
						break
					}
					break;
				case 2:
					if (9 < a + 1 || void 0 == b[a][c] || 0 != b[a][c] || void 0 == b[a + 1][c] || 0 != b[a + 1][c]) return !1;
					if (!n) {
						b[a][c] = 1;
						b[a + 1][c] = 1;
						break
					}
					break;
				case 3:
					if (9 <
						a + 1 || void 0 == b[a][c] || 0 != b[a][c] || void 0 == b[a + 1][c] || 0 != b[a + 1][c] || void 0 == b[a][c + 1] || 0 != b[a][c + 1]) return !1;
					if (!n) {
						b[a][c] = 1;
						b[a + 1][c] = 1;
						b[a][c + 1] = 1;
						break
					}
					break;
				case 4:
					if (9 < a + 1 || void 0 == b[a][c] || 0 != b[a][c] || void 0 == b[a + 1][c] || 0 != b[a + 1][c] || void 0 == b[a + 1][c + 1] || 0 != b[a + 1][c + 1]) return !1;
					if (!n) {
						b[a][c] = 1;
						b[a + 1][c + 1] = 1;
						b[a + 1][c] = 1;
						break
					}
					break;
				case 5:
					if (void 0 == b[a][c] || 0 != b[a][c] || void 0 == b[a][c + 1] || 0 != b[a][c + 1] || void 0 == b[a][c + 2] || 0 != b[a][c + 2]) return !1;
					if (!n) {
						b[a][c] = 1;
						b[a][c + 1] = 1;
						b[a][c + 2] = 1;
						break
					}
					break;
				case 6:
					if (9 < a + 2 || null == b[a][c] || 0 != b[a][c] || null == b[a + 1][c] || 0 != b[a + 1][c] || null == b[a + 2][c] || 0 != b[a + 2][c]) return !1;
					if (!n) {
						b[a][c] = 1;
						b[a + 1][c] = 1;
						b[a + 2][c] = 1;
						break
					}
					break;
				case 7:
					if (9 < a + 1 || 0 != b[a][c] || void 0 == b[a][c] || void 0 == b[a + 1][c] || 0 != b[a + 1][c] || void 0 == b[a][c + 1] || 0 != b[a][c + 1] || void 0 == b[a + 1][c + 1] || 0 != b[a + 1][c + 1]) return !1;
					if (!n) {
						b[a][c] = 1;
						b[a + 1][c] = 1;
						b[a][c + 1] = 1;
						b[a + 1][c + 1] = 1;
						break
					}
					break;
				case 8:
					if (0 != b[a][c] || void 0 == b[a][c] || void 0 == b[a][c + 1] || 0 != b[a][c + 1] || void 0 == b[a][c + 2] || 0 != b[a][c + 2] || void 0 ==
						b[a][c + 3] || 0 != b[a][c + 3]) return !1;
					if (!n) {
						b[a][c] = 1;
						b[a][c + 1] = 1;
						b[a][c + 2] = 1;
						b[a][c + 3] = 1;
						break
					}
					break;
				case 9:
					if (9 < a + 3 || 0 != b[a][c] || void 0 == b[a][c] || void 0 == b[a + 1][c] || 0 != b[a + 1][c] || void 0 == b[a + 2][c] || 0 != b[a + 2][c] || void 0 == b[a + 3][c] || 0 != b[a + 3][c]) return !1;
					if (!n) {
						b[a][c] = 1;
						b[a + 1][c] = 1;
						b[a + 2][c] = 1;
						b[a + 3][c] = 1;
						break
					}
					break;
				case 10:
					if (9 < a + 4 || 0 != b[a][c] || void 0 == b[a][c] || void 0 == b[a + 1][c] || 0 != b[a + 1][c] || void 0 == b[a + 2][c] || 0 != b[a + 2][c] || void 0 == b[a + 3][c] || 0 != b[a + 3][c] || void 0 == b[a + 4][c] || 0 != b[a + 4][c]) return !1;
					if (!n) {
						b[a][c] = 1;
						b[a + 1][c] = 1;
						b[a + 2][c] = 1;
						b[a + 3][c] = 1;
						b[a + 4][c] = 1;
						break
					}
					break;
				case 11:
					if (0 != b[a][c] || void 0 == b[a][c] || void 0 == b[a][c + 1] || 0 != b[a][c + 1] || void 0 == b[a][c + 2] || 0 != b[a][c + 2] || void 0 == b[a][c + 3] || 0 != b[a][c + 3] || void 0 == b[a][c + 4] || 0 != b[a][c + 4]) return !1;
					if (!n) {
						b[a][c] = 1;
						b[a][c + 1] = 1;
						b[a][c + 2] = 1;
						b[a][c + 3] = 1;
						b[a][c + 4] = 1;
						break
					}
					break;
				case 12:
					if (9 < a + 2 || 0 != b[a][c] || void 0 == b[a][c] || void 0 == b[a + 1][c] || 0 != b[a + 1][c] || void 0 == b[a + 2][c] || 0 != b[a + 2][c] || void 0 == b[a][c + 1] || 0 != b[a][c + 1] || void 0 == b[a][c + 2] || 0 !=
						b[a][c + 2]) return !1;
					if (!n) {
						b[a][c] = 1;
						b[a + 1][c] = 1;
						b[a + 2][c] = 1;
						b[a][c + 1] = 1;
						b[a][c + 2] = 1;
						break
					}
					break;
				case 13:
					if (9 < a + 2 || 0 != b[a + 2][c] || void 0 == b[a + 2][c] || void 0 == b[a + 2][c + 1] || 0 != b[a + 2][c + 1] || void 0 == b[a][c + 2] || 0 != b[a][c + 2] || void 0 == b[a + 1][c + 2] || 0 != b[a + 1][c + 2] || void 0 == b[a + 2][c + 2] || 0 != b[a + 2][c + 2]) return !1;
					if (!n) {
						b[a + 2][c] = 1;
						b[a + 2][c + 1] = 1;
						b[a][c + 2] = 1;
						b[a + 1][c + 2] = 1;
						b[a + 2][c + 2] = 1;
						break
					}
					break;
				case 14:
					if (9 < a + 2 || 0 != b[a][c] || void 0 == b[a][c] || void 0 == b[a + 1][c] || 0 != b[a + 1][c] || void 0 == b[a + 2][c] || 0 != b[a + 2][c] || void 0 ==
						b[a + 2][c + 1] || 0 != b[a + 2][c + 1] || void 0 == b[a + 2][c + 2] || 0 != b[a + 2][c + 2]) return !1;
					if (!n) {
						b[a][c] = 1;
						b[a + 1][c] = 1;
						b[a + 2][c] = 1;
						b[a + 2][c + 1] = 1;
						b[a + 2][c + 2] = 1;
						break
					}
					break;
				case 15:
					if (9 < a + 2 || 0 != b[a][c] || void 0 == b[a][c] || void 0 == b[a][c + 1] || 0 != b[a][c + 1] || void 0 == b[a][c + 2] || 0 != b[a][c + 2] || void 0 == b[a + 1][c] || 0 != b[a + 1][c] || void 0 == b[a + 2][c] || 0 != b[a + 2][c]) return !1;
					if (!n) {
						b[a][c] = 1;
						b[a][c + 1] = 1;
						b[a][c + 2] = 1;
						b[a + 1][c] = 1;
						b[a + 2][c] = 1;
						break
					}
					break;
				case 16:
					if (9 < a + 2 || 0 != b[a][c] || void 0 == b[a][c] || void 0 == b[a][c + 1] || 0 != b[a][c + 1] || void 0 ==
						b[a + 1][c + 1] || 0 != b[a][c + 2] || void 0 == b[a + 1][c] || 0 != b[a + 1][c] || void 0 == b[a + 2][c] || 0 != b[a + 2][c]) return !1;
					n || (b[a][c] = 1, b[a][c + 1] = 1, b[a][c + 2] = 1, b[a + 1][c] = 1, b[a + 2][c] = 1)
			}
			return !0
		};
		return d
	}(egret.Sprite);
MapCalculate.prototype.__class__ = "MapCalculate";
var Settings = function() {
	function c() {}
	c.Stage_width = 480;
	c.Stage_height = 800;
	c.MusicBtnBool = !0;
	c.CurrentScore = 0;
	c.TotalScore = 0;
	c.RunBool = !1;
	c.ShareTitle = "\u8fd9\u4e2a\u6e38\u620f\u7b80\u5355\u6709\u597d\u73a9\uff0c\u800c\u4e14\u4e0d\u7528\u4e0b\u8f7d\uff01";
	c.ShareUrl = "http://uc.duopao.com/uc/wxlogin?url=http://www.duopao.com/games/play/g20141120012319163064";
	c.ShareImageUrl = "http://resource5.duopao.com/duopao/icon/bgeluosi.jpg";
	return c
}();
Settings.prototype.__class__ = "Settings";
var Share;
(function(c) {
	c.Share_xinlang = function(c, b, a) {
		c = "http://v.t.sina.com.cn/share/share.php?title=" + c + "&url=" + b + "&content=utf-8&sourceUrl=" + b + "&pic=" + a;
		window.open(c, "newwindow", "height=400,width=400,top=100,left=100");
	};
	c.Share_tengxun = function(c, b, a) {
		c = "http://v.t.qq.com/share/share.php?title=" + c + "&url=" + b + "&pic=" + a;
		window.open(c, "newwindow", "height=100,width=100,top=100,left=100");
	};
	c.Share_qqkongjian = function(c, b, a) {
		c = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary=" +
			c + "&url=" + b + "&pics=" + a;
		window.open(c, "newwindow", "height=400,width=400,top=100,left=100");
	}
})(Share || (Share = {}));
var __extends = this.__extends || function(c, d) {
		function b() {
			this.constructor = c
		}
		for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
		b.prototype = d.prototype;
		c.prototype = new b
	}, GameOverPlan = function(c) {
		function d() {
			c.call(this);
			this.ScorePlan_Point = new egret.Point(35, 173);
			this.HouseBtn_Point = new egret.Point(35, 382);
			this.RstartBtn_Point = new egret.Point(246, 382);
			this.viewInit()
		}
		__extends(d, c);
		d.prototype.viewInit = function() {
			this.ScorePlan = utils.createSpriteByName("ScorePlan");
			this.ScorePlan.name = "ScorePlan";
			this.bg = utils.createRectangular(0, 0, 480, 800, 1, 16777215);
			this.HouseBtnBig = utils.createSpriteByName("HouseBtnBig");
			this.HouseBtnBig.name = "HouseBtnBig";
			this.RstartBtnBig = utils.createSpriteByName("RstartBtnBig");
			this.RstartBtnBig.name = "RstartBtnBig";
			this.overScorePlan = utils.createTextLabel(this.overScorePlan, 16777215, "center", "0", 40, 200);
			this.ScorePlan.addChild(this.overScorePlan);
			this.overScorePlan.x = 108;
			this.overScorePlan.y = 62;
			this.addChild(this.bg);
			this.bg.alpha = 0;
			this.addChild(this.ScorePlan);
			this.ScorePlan.x =
				this.ScorePlan_Point.x;
			this.ScorePlan.y = this.ScorePlan_Point.y + 800;
			this.addChild(this.HouseBtnBig);
			this.HouseBtnBig.x = this.HouseBtn_Point.x;
			this.HouseBtnBig.y = this.HouseBtn_Point.y + 800;
			this.addChild(this.RstartBtnBig);
			this.RstartBtnBig.x = this.RstartBtn_Point.x;
			this.RstartBtnBig.y = this.RstartBtn_Point.y + 800;
			this.ScorePlan.touchEnabled = !0;
			this.HouseBtnBig.touchEnabled = !0;
			this.RstartBtnBig.touchEnabled = !0
		};
		d.prototype.add = function() {
			this.bg.alpha = 0.5;
			this.bg.touchEnabled = !0;
			this.overScorePlan.text = Settings.CurrentScore.toString();
			egret.Tween.get(this.HouseBtnBig).wait(0).to({
				y: this.HouseBtn_Point.y
			}, 300);
			egret.Tween.get(this.RstartBtnBig).wait(0).to({
				y: this.RstartBtn_Point.y
			}, 300);
			egret.Tween.get(this.ScorePlan).wait(0).to({
				y: this.ScorePlan_Point.y
			}, 300)
		};
		d.prototype.remove = function() {
			this.bg.alpha = 0;
			this.bg.touchEnabled = !1;
			egret.Tween.get(this.HouseBtnBig).wait(0).to({
				y: this.HouseBtn_Point.y + 800
			}, 300);
			egret.Tween.get(this.RstartBtnBig).wait(0).to({
				y: this.RstartBtn_Point.y + 800
			}, 300);
			egret.Tween.get(this.ScorePlan).wait(0).to({
				y: this.ScorePlan_Point.y +
					800
			}, 300)
		};
		return d
	}(egret.Sprite);
GameOverPlan.prototype.__class__ = "GameOverPlan";
var __extends = this.__extends || function(c, d) {
		function b() {
			this.constructor = c
		}
		for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
		b.prototype = d.prototype;
		c.prototype = new b
	}, GameStopView = function(c) {
		function d() {
			c.call(this);
			this.HouseBtn_Point = new egret.Point(90, 212);
			this.RstartBtn_Point = new egret.Point(243, 212);
			this.MusicBtn_Point = new egret.Point(90, 365);
			this.PlayBtn_Point = new egret.Point(243, 365);
			this.MusicStopBtn = new egret.Sprite;
			this.bg = utils.createRectangular(0, 0, 480, 800, 1, 16777215);
			this.HouseBtnMini =
//				utils.createSpriteByName("HouseBtnMini");
			this.RstartBtnMini = utils.createSpriteByName("RstartBtnMini");
			this.PlayBtn = utils.createSpriteByName("PlayBtn");
			this.addChild(this.bg);
			this.bg.alpha = 0;
			this.bitmap_music_on = utils.createBitmapByName("MusicBtn_on");
			this.bitmap_music_off = utils.createBitmapByName("MusicBtn_off");
			this.MusicStopBtn.addChild(this.bitmap_music_off);
			this.MusicStopBtn.addChild(this.bitmap_music_on);
			this.HouseBtnMini.x = this.HouseBtn_Point.x;
			this.HouseBtnMini.y = this.HouseBtn_Point.y + 800;
			this.addChild(this.HouseBtnMini);
			this.RstartBtnMini.x = this.RstartBtn_Point.x;
			this.RstartBtnMini.y = this.RstartBtn_Point.y + 800;
			this.addChild(this.RstartBtnMini);
			this.MusicStopBtn.x = this.MusicBtn_Point.x;
			this.MusicStopBtn.y = this.MusicBtn_Point.y + 800;
			this.addChild(this.MusicStopBtn);
			this.PlayBtn.x = this.PlayBtn_Point.x;
			this.PlayBtn.y = this.PlayBtn_Point.y + 800;
			this.addChild(this.PlayBtn);
			this.HouseBtnMini.touchEnabled = !0;
			this.HouseBtnMini.name = "HouseBtnMini";
			this.RstartBtnMini.touchEnabled = !0;
			this.RstartBtnMini.name =
				"RstartBtnMini";
			this.MusicStopBtn.touchEnabled = !0;
			this.MusicStopBtn.name = "MusicStopBtn";
			this.PlayBtn.touchEnabled = !0;
			this.PlayBtn.name = "PlayBtn"
		}
		__extends(d, c);
		d.prototype.add = function() {
			this.bg.alpha = 0.5;
			this.bg.touchEnabled = !0;
			egret.Tween.get(this.HouseBtnMini).wait(0).to({
				y: this.HouseBtn_Point.y
			}, 300);
			egret.Tween.get(this.RstartBtnMini).wait(0).to({
				y: this.RstartBtn_Point.y
			}, 300);
			egret.Tween.get(this.MusicStopBtn).wait(0).to({
				y: this.MusicBtn_Point.y
			}, 300);
			egret.Tween.get(this.PlayBtn).wait(0).to({
					y: this.PlayBtn_Point.y
				},
				300)
		};
		d.prototype.remove = function() {
			egret.Tween.get(this.HouseBtnMini).wait(0).to({
				y: this.HouseBtn_Point.y + 800
			}, 300);
			egret.Tween.get(this.RstartBtnMini).wait(0).to({
				y: this.RstartBtn_Point.y + 800
			}, 300);
			egret.Tween.get(this.MusicStopBtn).wait(0).to({
				y: this.MusicBtn_Point.y + 800
			}, 300);
			egret.Tween.get(this.PlayBtn).wait(0).to({
				y: this.PlayBtn_Point.y + 800
			}, 300);
			this.bg.alpha = 0;
			this.bg.touchEnabled = !1
		};
		d.prototype.MusicBtnChange = function() {
			Settings.MusicBtnBool = !Settings.MusicBtnBool;
			Settings.MusicBtnBool ?
				(this.bitmap_music_off.alpha = 0, this.bitmap_music_on.alpha = 1) : (this.bitmap_music_off.alpha = 1, this.bitmap_music_on.alpha = 0)
		};
		return d
	}(egret.Sprite);
GameStopView.prototype.__class__ = "GameStopView";
var __extends = this.__extends || function(c, d) {
		function b() {
			this.constructor = c
		}
		for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
		b.prototype = d.prototype;
		c.prototype = new b
	}, myMap = function(c) {
		function d(b) {
			c.call(this);
			this.MapSpriteArray = [];
			this.MapArr = [];
			this.MapColorSpriteArray = [];
			this.ColorSpriteSheet = b;
			this.MapColorSpriteArray = [];
			this.MapSpriteArray = [];
			this.MapArr = []
		}
		__extends(d, c);
		d.prototype.detection = function() {
			for (var b = [
				[],
				[]
			], a = 0, c = 0, d = 0; 10 > d; d++)
				for (var n = 0; 10 > n; n++) 0 == n && (c = a = 0), a += this.MapArr[d][n],
			c += this.MapArr[n][d], 9 == n && (10 == a && b[0].push(d), 10 == c && b[1].push(d));
			return b
		};
		d.prototype.MapAdd = function(b) {
			for (var a = 0; 10 > a; a++)
				for (var c = 0; 10 > c; c++)
					if (b.x >= 12 + 42 * c && b.x <= 12 + 42 * (c + 1) && b.y >= 118 + 42 * a && b.y <= 118 + 42 * (a + 1)) return MapCalculate.toCalculate(this.MapArr, a, c, b) ? (b.x = 32 + 42 * c, b.y = 138 + 42 * a, !0) : !1;
			return !1
		};
		d.prototype.run = function(b) {
			if (b)
				for (b = 0; 10 > b; b++) {
					this.MapArr.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
					for (var a = 0; 10 > a; a++) {
						var c = utils.createBitmap(this.ColorSpriteSheet,
							"bgBox", 0, 0);
						c.x = 32 + a * (c.width + 2);
						c.y = 138 + b * (c.width + 2);
						this.addChild(c);
						this.MapSpriteArray.push(c)
					}
				} else
					for (b = 0; b < this.MapSpriteArray.length; b++) this.removeChild(this.MapSpriteArray[b])
		};
		d.prototype.MapNumberInit = function() {
			this.MapArr = [];
			for (var b = 0; 10 > b; b++) this.MapArr.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
		};
		return d
	}(egret.Sprite);
myMap.prototype.__class__ = "myMap";
var __extends = this.__extends || function(c, d) {
		function b() {
			this.constructor = c
		}
		for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
		b.prototype = d.prototype;
		c.prototype = new b
	}, Html5GamePlan = function(c) {
		function d() {
			c.call(this);
			this.bool = !1;
			this.plan = utils.createSpriteByName("Html5GamePlan");
			this.addChild(this.plan);
			this.plan.y = 800;
			this.plan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onH5GameTap, this)
		}
		__extends(d, c);
		d.prototype.onH5GameTap = function(b) {
			window.open("http://uc.duopao.com/uc/wxlogin?url=http://www.duopao.com/games/play/g20141120012319163064", "newwindow")
		};
		d.prototype.add = function() {
			this.plan.touchEnabled = !0;
			egret.Tween.get(this.plan).wait(0).to({
				y: 572
			}, 200);
			this.bool = !0
		};
		d.prototype.remove = function() {
			this.plan.touchEnabled = !1;
			egret.Tween.get(this.plan).wait(0).to({
				y: 800
			}, 200);
			this.bool = !1
		};
		return d
	}(egret.Sprite);
Html5GamePlan.prototype.__class__ = "Html5GamePlan";
var __extends = this.__extends || function(c, d) {
		function b() {
			this.constructor = c
		}
		for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
		b.prototype = d.prototype;
		c.prototype = new b
	}, ShareGamePlan = function(c) {
		function d() {
			c.call(this);
			this.bool = !1;
			this.BtnSound = utils.createSoundByName("button_click");
			this.plan = utils.createSpriteByName("ShareGamePlan");
			this.plan.y = 800;
			this.addChild(this.plan);
			this.xinLangBtn = utils.createSpriteByName("XinLang");
			this.xinLangBtn.name = "xinLangBtn";
			this.plan.addChild(this.xinLangBtn);
			this.xinLangBtn.x = 192;
			this.xinLangBtn.y = 58;
			this.xinLangBtn.touchEnabled = !0;
			this.TengXunBtn = utils.createSpriteByName("TengXun");
			this.TengXunBtn.name = "TengXunBtn";
			this.plan.addChild(this.TengXunBtn);
			this.TengXunBtn.x = 88;
			this.TengXunBtn.y = 58;
			this.TengXunBtn.touchEnabled = !0;
			this.QQKongJian = utils.createSpriteByName("QQkongjian");
			this.QQKongJian.name = "QQKongJian";
			this.plan.addChild(this.QQKongJian);
			this.QQKongJian.x = 295;
			this.QQKongJian.y = 58;
			this.QQKongJian.touchEnabled = !0;
			this.plan.addEventListener(egret.TouchEvent.TOUCH_TAP,
				this.SharePlanTap, this)
		}
		__extends(d, c);
		d.prototype.SharePlanTap = function(b) {
			switch (b.target.name) {
				case "TengXunBtn":
					Share.Share_tengxun(Settings.ShareTitle, Settings.ShareUrl, Settings.ShareImageUrl);
					break;
				case "QQKongJian":
					Share.Share_qqkongjian(Settings.ShareTitle, Settings.ShareUrl, Settings.ShareImageUrl);
					break;
				case "xinLangBtn":
					Share.Share_xinlang(Settings.ShareTitle, Settings.ShareUrl, Settings.ShareImageUrl)
			}
			Settings.MusicBtnBool && this.BtnSound.play()
		};
		d.prototype.add = function() {
			this.touchChildren =
				this.touchEnabled = !0;
			egret.Tween.get(this.plan).wait(0).to({
				y: 572
			}, 200);
			this.bool = !0
		};
		d.prototype.remove = function() {
			this.touchChildren = this.touchEnabled = !1;
			egret.Tween.get(this.plan).wait(0).to({
				y: 800
			}, 200);
			this.bool = !1
		};
		return d
	}(egret.Sprite);
ShareGamePlan.prototype.__class__ = "ShareGamePlan";
var __extends = this.__extends || function(c, d) {
		function b() {
			this.constructor = c
		}
		for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
		b.prototype = d.prototype;
		c.prototype = new b
	}, GameControl = function(c) {
		function d(b) {
			c.call(this);
			this.ElementArr = [];
			this.Index_x = 578;
			this.downElement = null;
			this.destory = [];
			this.BtnSound = utils.createSoundByName("button_click");
			this.BoxDownSound = utils.createSoundByName("box_down_sound");
			this.XiaoChuSound = utils.createSoundByName("xiaochu");
			this.OverSound = utils.createSoundByName("over");
			this.ColorSpriteSheet = b;
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
		}
		__extends(d, c);
		d.prototype.onAddToStage = function(b) {
			this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
		};
		d.prototype.start = function() {
			this.destory = [];
			this.StopView = new GameStopView;
			this.overPlan = new GameOverPlan;
			this.map = new myMap(this.ColorSpriteSheet);
			this.addChild(this.map);
			this.map.run(!0);
			this.BestScoreLogo = utils.createSpriteByName("bestScoreLogo");
			this.addChild(this.BestScoreLogo);
			this.GameStopBtn = utils.createSpriteByName("GameStopBtn");
			this.GameStopBtn.x = 420;
			this.GameStopBtn.y = 20;
			this.addChild(this.GameStopBtn);
			this.GameStopBtn.touchEnabled = !0;
			this.GameStopBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGameStopClick, this);
			this.BestScoreLogo.x = 201;
			this.BestScoreLogo.y = 38;
			this.CurrentScorePlan = utils.createTextLabel(this.CurrentScorePlan, 9951577, "right", "0", 40, 120);
			this.addChild(this.CurrentScorePlan);
			this.CurrentScorePlan.x = 60;
			this.CurrentScorePlan.y = 50;
			this.BestScorePlan =
				utils.createTextLabel(this.BestScorePlan, 6077923, "center", Settings.TotalScore.toString(), 40);
			this.addChild(this.BestScorePlan);
			this.BestScorePlan.x = 300;
			this.BestScorePlan.y = 50;
			this.addChild(this.StopView);
			this.addChild(this.overPlan);
			this.downElement = null;
			this.createEelement();
			this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.ElementUP, this);
			this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.ElementMove, this)
		};
		d.prototype.createEelement = function() {
			for (var b = 0, a = 0; 3 > a; a++) {
				var c =
					Math.floor(16 * Math.random()),
					c = new ColorSprite(this.ColorSpriteSheet, c, a);
				c.scaleX = c.scaleY = 0.5;
				b += c.width;
				this.ElementArr.push(c);
				c.touchEnabled = !0;
				c.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.ElementDown, this)
			}
			b = (480 - b) / 3;
			this.myPoint0 = new egret.Point(30, this.Index_x + (800 - this.ElementArr[0].height - this.Index_x) / 2);
			this.ElementArr[0].x = this.myPoint0.x + 480;
			this.ElementArr[0].y = this.myPoint0.y;
			this.myPoint1 = new egret.Point(30 + this.ElementArr[0].width + b, this.Index_x + (800 - this.ElementArr[1].height -
				this.Index_x) / 2);
			this.ElementArr[1].x = this.myPoint1.x + 480;
			this.ElementArr[1].y = this.myPoint1.y;
			this.myPoint2 = new egret.Point(30 + this.ElementArr[0].width + 2 * b + this.ElementArr[1].width, this.Index_x + (800 - this.ElementArr[2].height - this.Index_x) / 2);
			this.ElementArr[2].x = this.myPoint2.x + 480;
			this.ElementArr[2].y = this.myPoint2.y;
			this.addChild(this.ElementArr[0]);
			this.addChild(this.ElementArr[1]);
			this.addChild(this.ElementArr[2]);
			egret.Tween.get(this.ElementArr[0]).wait(0).to({
					x: this.myPoint0.x,
					y: this.myPoint0.y
				},
				250);
			egret.Tween.get(this.ElementArr[1]).wait(0).to({
				x: this.myPoint1.x,
				y: this.myPoint1.y
			}, 250);
			egret.Tween.get(this.ElementArr[2]).wait(0).to({
				x: this.myPoint2.x,
				y: this.myPoint2.y
			}, 250)
		};
		d.prototype.ElementDown = function(b) {
			this.downElement = b.target;
			this.removeChild(this.downElement);
			this.addChild(this.downElement);
			this.downElement.scaleX = this.downElement.scaleY = 1;
			this.downElement.x = b.stageX - this.downElement.width / 4;
			this.downElement.y = b.stageY - this.downElement.height;
			// Settings.MusicBtnBool && this.BoxDownSound.play()
		};
		d.prototype.ElementMove = function(b) {
			null != this.downElement && (this.downElement.x = b.stageX - this.downElement.width / 4, this.downElement.y = b.stageY - this.downElement.height)
		};
		d.prototype.ElementUP = function(b) {
			if (null != this.downElement) {
				(b = this.map.MapAdd(this.downElement)) ? (this.destory.push(this.downElement), this.downElement.touchEnabled = !1, Settings.CurrentScore += this.downElement.ColorArr.length, this.CurrentScorePlan.text = Settings.CurrentScore.toString(), /*Settings.MusicBtnBool && this.BoxDownSound.play(),*/
					this.ElementArr[this.downElement.CsId] = null, this.downElement.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.ElementDown, this), null == this.ElementArr[0] && null == this.ElementArr[1] && null == this.ElementArr[2] && (this.ElementArr = [], this.createEelement())) : (this.downElement.scaleX = this.downElement.scaleY = 0.5, egret.Tween.get(this.downElement).wait(0).to({
					x: this["myPoint" + this.downElement.CsId].x,
					y: this["myPoint" + this.downElement.CsId].y
				}, 100));
				this.downElement = null;
				b = this.map.detection();
				if (0 < b[0].length ||
					0 < b[1].length) {
					var a;
					a = 0 + 20 * b[0].length;
					a += 20 * b[1].length;
					Settings.CurrentScore += a;
					this.CurrentScorePlan.text = Settings.CurrentScore.toString();
					// Settings.MusicBtnBool && this.XiaoChuSound.play();
					MapCalculate.rmeoveElement(b, this.destory, this, this.map.MapArr)
				}
				b = MapCalculate.overControl(this.ElementArr, this.map.MapArr);
				b || (this.over())
			}
		};
		d.prototype.over = function() {
            gameOverHandlerFunction(Settings.CurrentScore);
			this.removeChild(this.overPlan);
			this.addChild(this.overPlan);
			this.overPlan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.overPlanClick, this);
			this.overPlan.add();
			this.stop();
			this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.ElementDown, this);
			Settings.CurrentScore > Settings.TotalScore && (Settings.TotalScore = Settings.CurrentScore, egret.localStorage.setItem("BestScore", Settings.TotalScore.toString()), Settings.ShareTitle = "1010\u8fd9\u4e2a\u5c0f\u6e38\u620f\u975e\u5e38\u4e0d\u9519\uff0c\u7b80\u5355\u7c97\u66b4\uff0c\u8fd8\u4e0d\u7528\u4e0b\u8f7d\uff0c\u6211\u6700\u9ad8\u5f97\u4e86" +
				Settings.TotalScore.toString() + "\u5206,\u4e0d\u670d\u6765\u6311\u6218\uff01");
			setTimeout(function(){
                gameOverHandlerFunction(Settings.CurrentScore);//结束弹窗
			},1500);
			
		};
		d.prototype.overPlanClick = function(b) {
			switch (b.target.name) {
				case "ScorePlan":
					this.dispatchEvent(new egret.Event("SharePlan", !1, !1));
					break;
				case "HouseBtnBig":
					this.distory();
					this.overPlan.remove();
					this.dispatchEvent(new egret.Event("SharePlanClose", !1, !1));
					this.dispatchEvent(new egret.Event("GoBackHouse", !1, !1));
					this.overPlan.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.StopViewClick, this);
					break;
				case "RstartBtnBig":
					this.overPlan.remove(),
					this.distory(), this.dispatchEvent(new egret.Event("SharePlanClose", !1, !1)), this.overPlan.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.overPlanClick, this), this.createEelement(), this.next()
			}
			// Settings.MusicBtnBool && this.BtnSound.play()
		};
		d.prototype.onGameStopClick = function(b) {
			// Settings.MusicBtnBool && this.BtnSound.play();
			this.removeChild(this.StopView);
			this.addChild(this.StopView);
			this.StopView.add();
			this.StopView.addEventListener(egret.TouchEvent.TOUCH_TAP,
				this.StopViewClick, this)
		};
		d.prototype.StopViewClick = function(b) {
			switch (b.target.name) {
				case "HouseBtnMini":
					this.distory();
					this.StopView.remove();
					this.dispatchEvent(new egret.Event("GoBackHouse", !1, !1));
					this.StopView.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.StopViewClick, this);
					break;
				case "RstartBtnMini":
					this.distory();
					this.StopView.remove();
					this.StopView.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.StopViewClick, this);
					this.createEelement();
					this.next();
					break;
				case "MusicStopBtn":
					this.StopView.MusicBtnChange();
					break;
				case "PlayBtn":
					this.StopView.remove(), this.StopView.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.StopViewClick, this)
			}
			// Settings.MusicBtnBool && this.BtnSound.play()
		};
		d.prototype.stop = function() {
			this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.ElementUP, this);
			this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.ElementMove, this)
		};
		d.prototype.next = function() {
			this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.ElementUP, this);
			this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,
				this.ElementMove, this)
		};
		d.prototype.distory = function() {
			this.stop();
			for (var b = 0; b < this.ElementArr.length; b++) null != this.ElementArr[b] && (this.removeChild(this.ElementArr[b]), this.ElementArr[b] = null);
			this.ElementArr = [];
			for (b = 0; b < this.destory.length; b++) this.destory[b].visible = !1, this.destory[b] = null;
			this.destory = [];
			Settings.CurrentScore = 0;
			this.CurrentScorePlan.text = Settings.CurrentScore.toString();
			this.map.MapNumberInit()
		};
		return d
	}(egret.DisplayObjectContainer);
GameControl.prototype.__class__ = "GameControl";
var __extends = this.__extends || function(c, d) {
		function b() {
			this.constructor = c
		}
		for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
		b.prototype = d.prototype;
		c.prototype = new b
	}, UIControl = function(c) {
		function d() {
			c.call(this);
			this.BtnSound = utils.createSoundByName("button_click");
			this.bitmap_music_off = utils.createBitmapByName("MusicBtn_off");
			this.bitmap_music_on = utils.createBitmapByName("MusicBtn_on");
			this.initSprite()
		}
		__extends(d, c);
		d.prototype.initSprite = function() {
			this.SharePlan = new ShareGamePlan;
			this.addChild(this.SharePlan);
			this.H5Plan = new Html5GamePlan;
			this.addChild(this.H5Plan);
			this.StartBtn = utils.createSpriteByName("StartGameBtn");
			this.SettingsBtn = new egret.Sprite;
			this.Html5GameBtn = utils.createSpriteByName("WebGameBtn");
			this.Logo = utils.createSpriteByName("logo");
			this.MyBestScoreLogo = utils.createSpriteByName("bestScoreLogo");
			this.ShareBtn = utils.createSpriteByName("ShareGameBtn");
			this.bitmap_music_off.width = this.bitmap_music_off.height = 100;
			this.bitmap_music_on.width = this.bitmap_music_on.height = 100;
			this.SettingsBtn.addChild(this.bitmap_music_off);
			this.SettingsBtn.addChild(this.bitmap_music_on);
			this.Bg = utils.createRectangular(0, 0, 480, 800, 1, 16777215);
			this.uiBestScorePlan = utils.createTextLabel(this.uiBestScorePlan, 6077923, "center", Settings.TotalScore.toString(), 40, 140)
		};
		d.prototype.view_start = function(b) {
			b ? (this.addChild(this.Bg), this.addChild(this.Logo), this.Logo.y = 70, this.Logo.x = (Settings.Stage_width - this.Logo.width) / 2, this.MyBestScoreLogo.y = 215, this.MyBestScoreLogo.x = (Settings.Stage_width - this.MyBestScoreLogo.width) / 2, this.addChild(this.MyBestScoreLogo),
				this.uiBestScorePlan.x = 170, this.uiBestScorePlan.y = 295, this.addChild(this.uiBestScorePlan), this.uiBestScorePlan.text = Settings.TotalScore.toString(), this.StartBtn.y = 346, this.StartBtn.x = (Settings.Stage_width - this.StartBtn.width) / 2, this.addChild(this.StartBtn), this.StartBtn.touchEnabled = !0, this.StartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.StartBtnClick, this), this.SettingsBtn.x = 87, this.SettingsBtn.y = 487, this.SettingsBtn.touchEnabled = !0, this.addChild(this.SettingsBtn), this.SettingsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,
					this.SettingsBtnClick, this), this.ShareBtn.x = 190, this.ShareBtn.y = 487, this.ShareBtn.touchEnabled = !0, this.addChild(this.ShareBtn), this.ShareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ShareBtnClick, this), this.Html5GameBtn.x = 294, this.Html5GameBtn.y = 487, this.Html5GameBtn.touchEnabled = !0, this.addChild(this.Html5GameBtn), this.Html5GameBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Html5GameBtnClick, this)) : (this.removeChild(this.SettingsBtn), this.removeChild(this.StartBtn), this.removeChild(this.ShareBtn),
				this.removeChild(this.Html5GameBtn), this.removeChild(this.Logo), this.removeChild(this.MyBestScoreLogo), this.removeChild(this.Bg), this.removeChild(this.uiBestScorePlan), this.StartBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.StartBtnClick, this), this.SettingsBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.SettingsBtnClick, this), this.ShareBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.ShareBtnClick, this), this.Html5GameBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.Html5GameBtnClick,
					this))
            that = this;
		};
		d.prototype.MusicBtnChange = function() {
			Settings.MusicBtnBool = !Settings.MusicBtnBool;
			Settings.MusicBtnBool ? (this.bitmap_music_off.alpha = 0, this.bitmap_music_on.alpha = 1) : (this.bitmap_music_off.alpha = 1, this.bitmap_music_on.alpha = 0)
		};
		d.prototype.StartBtnClick = function(b) {
			document.getElementById("games").style.display = "none";
			this.dispatchEvent(new egret.Event("GameStartClick", !1, !1));
			// Settings.MusicBtnBool && this.BtnSound.play();
			this.H5Plan.bool && this.H5Plan.remove();
			this.SharePlan.bool && this.SharePlan.remove()
		};
		d.prototype.SettingsBtnClick = function(b) {
			// this.MusicBtnChange();
			// Settings.MusicBtnBool && this.BtnSound.play()
		};
		d.prototype.ShareBtnClick = function(b) {
			// Settings.MusicBtnBool && this.BtnSound.play();
			this.H5Plan.bool && this.H5Plan.remove();
			this.SharePlan.bool || (this.removeChild(this.SharePlan), this.addChild(this.SharePlan), this.SharePlan.add())
		};
		d.prototype.Html5GameBtnClick = function(b) {
			// Settings.MusicBtnBool && this.BtnSound.play();
			this.SharePlan.bool && this.SharePlan.remove();
			this.H5Plan.bool || (this.removeChild(this.H5Plan), this.addChild(this.H5Plan), this.H5Plan.add())
		};
		return d
	}(egret.Sprite);
UIControl.prototype.__class__ = "UIControl";
var __extends = this.__extends || function(c, d) {
		function b() {
			this.constructor = c
		}
		for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
		b.prototype = d.prototype;
		c.prototype = new b
	}, LoadingUI = function(c) {
		function d() {
			c.call(this);
			this.allWidth = 394;
			this.createView()
		}
		__extends(d, c);
		d.prototype.createView = function() {
			this.loadbar_bg = utils.createRectangular(0, 0, 400, 50, 1, 8228564);
			this.addChild(this.loadbar_bg);
			this.loadbar_bg.x = 40;
			this.loadbar_bg.y = 394;
			this.loadbar_bg_2 = utils.createRectangular(0, 0, 394, 44, 1, 16777215);
			this.loadbar_bg_2.x = this.loadbar_bg_2.x = 43;
			this.loadbar_bg_2.y = this.loadbar_bg_2.y = 397;
			this.addChild(this.loadbar_bg_2);
			this.loadbar = utils.createRectangular(0, 0, 394, 44, 1, 10017877);
			this.loadbar.x = 43;
			this.loadbar.y = 397;
			this.addChild(this.loadbar);
			this.Mask = new egret.Rectangle(-394, 0, 394, 394);
			this.loadbar.mask = this.Mask;
			this.textField = utils.createTextLabel(this.textField, 10017877, "center", "\u6b63\u5728\u73a9\u547d\u52a0\u8f7d\u7d20\u6750\u6587\u4ef6", 22, 480);
			this.addChild(this.textField);
			this.textField.y =
				488;
			this.textField2 = utils.createTextLabel(this.textField2, 6584521, "center", "\u5c0f\u63d0\u793a\uff1a\u4ec5\u4ec5\u5728\u7b2c\u4e00\u6b21\u8fdb\u5165\u6e38\u620f\u65f6\u624d\u4f1a\u6d88\u8017\u6781\u5c11\u7684\u6d41\u91cf", 18, 480);
			this.addChild(this.textField2);
			this.textField2.y = 602
		};
		d.prototype.addLogo = function() {
			var b = utils.createBitmapByName("logo");
			this.addChild(b);
			b.x = 63;
			b.y = 120
		};
		d.prototype.setProgress = function(b, a) {
			this.Mask.x = -394 + b / a * 394
		};
		return d
	}(egret.Sprite);
LoadingUI.prototype.__class__ = "LoadingUI";
var __extends = this.__extends || function(c, d) {
		function b() {
			this.constructor = c
		}
		for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
		b.prototype = d.prototype;
		c.prototype = new b
	}, Games = function(c) {
		function d() {
			c.call(this);
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
		}
		__extends(d, c);
		d.prototype.onAddToStage = function(b) {
			b = egret.localStorage.getItem("BestScore");
			null != b && (Settings.TotalScore = Number(b));
			this.ui = new UIControl;
			this.ColorSpriteSheet = RES.getRes("colorBox_json");
			this.game =
				new GameControl(this.ColorSpriteSheet);
			this.bg = utils.createRectangular(0, 0, 480, 800, 1, 16777215);
			b = new egret.TextField;
			b = utils.createTextLabel(b, 0, "center", "\u70b9\u51fb\u53f3\u4e0a\u89d2\u7684\u6309\u94ae\u9009\u62e9\u5206\u4eab\u5230\u670b\u53cb\u5708", 18, 480);
			this.bg.addChild(b);
			b.y = 400;
			this.addChild(this.game);
			this.game.x = this.game.y = 0;
			this.addChild(this.ui);
			this.ui.view_start(!0);
			this.EventCentent()
		};
		d.prototype.EventCentent = function() {
			this.ui.addEventListener("GameStartClick", this.GameStart, this);
			this.game.addEventListener("GoBackHouse", this.GoBackHouse, this);
			this.game.addEventListener("SharePlan", this.SharePlan, this);
			this.game.addEventListener("SharePlanClose", this.SharePlanClose, this)
		};
		d.prototype.GoBackHouse = function(b) {
			this.ui.view_start(!0)
		};
		d.prototype.SharePlan = function(b) {
			this.ui.ShareBtnClick();
			utils.isWeiXin() && (WeixinApi.ready(function(a) {
				var b = new WeixinShareInfo;
				b.title = "1010\u597d\u73a9\u7684\u5c0f\u6e38\u620f";
				b.desc = "\u6211\u5728\u5168\u7403\u6392\u884c\u524d\u5341\u7684\u70ed\u95e8\u5c0f\u6e38\u620f1010\u91cc\u62ff\u4e86" +
					Settings.TotalScore.toString() + "\u5206,\u4e0d\u670d\u6765\u6218\uff01";
				b.link = Settings.ShareUrl;
				b.imgUrl = Settings.ShareImageUrl;
				a.shareToFriend(b);
				a.shareToTimeline(b)
			}), this.addChild(this.bg), this.bg.alpha = 0.6, this.bg.touchEnabled = !0, this.bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ShareWXTap, this))
		};
		d.prototype.ShareWXTap = function() {
			this.removeChild(this.bg)
		};
		d.prototype.SharePlanClose = function(b) {
			this.ui.SharePlan.bool && this.ui.SharePlan.remove()
		};
		d.prototype.GameStart = function(b) {
			this.ui.view_start(!1);
			Settings.RunBool ? (this.game.createEelement(), this.game.next()) : (this.game.start(), Settings.RunBool = !0)
		};
		return d
	}(egret.DisplayObjectContainer);
Games.prototype.__class__ = "Games";
var __extends = this.__extends || function(c, d) {
		function b() {
			this.constructor = c
		}
		for (var a in d) d.hasOwnProperty(a) && (c[a] = d[a]);
		b.prototype = d.prototype;
		c.prototype = new b
	}, Main = function(c) {
		function d() {
			c.call(this);
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
		}
		__extends(d, c);
		d.prototype.GameControlStart = function() {
			this.MyGame = new Games;
			this.addChild(this.MyGame)
		};
		d.prototype.onAddToStage = function(b) {
			b = utils.createRectangular(0, 0, 480, 800, 1, 16777215);
			this.addChild(b);
			this.loadingView =
				new LoadingUI;
			this.stage.addChild(this.loadingView);
			RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
			RES.loadConfig("resource/resource.json", "resource/")
		};
		d.prototype.onConfigComplete = function(b) {
			RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
			RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
			RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
			RES.loadGroup("preload",
				1);
			RES.loadGroup("loading", 99)
		};
		d.prototype.onResourceLoadComplete = function(b) {
			"preload" == b.groupName && (this.stage.removeChild(this.loadingView), RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this), RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this), this.GameControlStart());
			"loading" == b.groupName && (this.loadingView.addLogo())
		};
		d.prototype.onResourceProgress = function(b) {
			"preload" == b.groupName && (this.loadingView.setProgress(b.itemsLoaded,
				b.itemsTotal))
		};
		return d
	}(egret.DisplayObjectContainer);
Main.prototype.__class__ = "Main";