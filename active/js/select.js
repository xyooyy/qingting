/*! select 0.5.0 */
/*! tether 0.5.0 */
(function () {
    var Evented, addClass, defer, deferred, extend, flush, getBounds, getOffsetParent, getOrigin, getScrollParent, hasClass, node, removeClass, uniqueId, updateClasses, zeroPosCache,
        __hasProp = {}.hasOwnProperty,
        __indexOf = [].indexOf || function (item) {
                for (var i = 0, l = this.length; i < l; i++) {
                    if (i in this && this[i] === item) return i;
                }
                return -1;
            },
        __slice = [].slice;

    if (window.Tether == null) {
        window.Tether = {};
    }

    getScrollParent = function (el) {
        var parent, position, scrollParent, style, _ref;
        position = getComputedStyle(el).position;
        if (position === 'fixed') {
            return el;
        }
        scrollParent = void 0;
        parent = el;
        while (parent = parent.parentNode) {
            try {
                style = getComputedStyle(parent);
            } catch (_error) {
            }
            if (style == null) {
                return parent;
            }
            if (/(auto|scroll)/.test(style['overflow'] + style['overflow-y'] + style['overflow-x'])) {
                if (position !== 'absolute' || ((_ref = style['position']) === 'relative' || _ref === 'absolute' || _ref === 'fixed')) {
                    return parent;
                }
            }
        }
        return document.body;
    };

    uniqueId = (function () {
        var id;
        id = 0;
        return function () {
            return id++;
        };
    })();

    zeroPosCache = {};

    getOrigin = function (doc) {
        var id, k, node, v, _ref;
        node = doc._tetherZeroElement;
        if (node == null) {
            node = doc.createElement('div');
            node.setAttribute('data-tether-id', uniqueId());
            extend(node.style, {
                top: 0,
                left: 0,
                position: 'absolute'
            });
            doc.body.appendChild(node);
            doc._tetherZeroElement = node;
        }
        id = node.getAttribute('data-tether-id');
        if (zeroPosCache[id] == null) {
            zeroPosCache[id] = {};
            _ref = node.getBoundingClientRect();
            for (k in _ref) {
                v = _ref[k];
                zeroPosCache[id][k] = v;
            }
            defer(function () {
                return zeroPosCache[id] = void 0;
            });
        }
        return zeroPosCache[id];
    };

    node = null;

    getBounds = function (el) {
        var box, doc, docEl, k, origin, v, _ref;
        if (el === document) {
            doc = document;
            el = document.documentElement;
        } else {
            doc = el.ownerDocument;
        }
        docEl = doc.documentElement;
        box = {};
        _ref = el.getBoundingClientRect();
        for (k in _ref) {
            v = _ref[k];
            box[k] = v;
        }
        origin = getOrigin(doc);
        box.top -= origin.top;
        box.left -= origin.left;
        if (box.width == null) {
            box.width = document.body.scrollWidth - box.left - box.right;
        }
        if (box.height == null) {
            box.height = document.body.scrollHeight - box.top - box.bottom;
        }
        box.top = box.top - docEl.clientTop;
        box.left = box.left - docEl.clientLeft;
        box.right = doc.body.clientWidth - box.width - box.left;
        box.bottom = doc.body.clientHeight - box.height - box.top;
        return box;
    };

    getOffsetParent = function (el) {
        return el.offsetParent || document.documentElement;
    };

    extend = function (out) {
        var args, key, obj, val, _i, _len, _ref;
        if (out == null) {
            out = {};
        }
        args = [];
        Array.prototype.push.apply(args, arguments);
        _ref = args.slice(1);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            obj = _ref[_i];
            if (obj) {
                for (key in obj) {
                    if (!__hasProp.call(obj, key)) continue;
                    val = obj[key];
                    out[key] = val;
                }
            }
        }
        return out;
    };

    removeClass = function (el, name) {
        var cls, _i, _len, _ref, _results;
        if (el.classList != null) {
            _ref = name.split(' ');
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                cls = _ref[_i];
                _results.push(el.classList.remove(cls));
            }
            return _results;
        } else {
            return el.className = el.className.replace(new RegExp("(^| )" + (name.split(' ').join('|')) + "( |$)", 'gi'), ' ');
        }
    };

    addClass = function (el, name) {
        var cls, _i, _len, _ref, _results;
        if (el.classList != null) {
            _ref = name.split(' ');
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                cls = _ref[_i];
                _results.push(el.classList.add(cls));
            }
            return _results;
        } else {
            removeClass(el, name);
            return el.className += " " + name;
        }
    };

    hasClass = function (el, name) {
        if (el.classList != null) {
            return el.classList.contains(name);
        } else {
            return new RegExp("(^| )" + name + "( |$)", 'gi').test(el.className);
        }
    };

    updateClasses = function (el, add, all) {
        var cls, _i, _j, _len, _len1, _results;
        for (_i = 0, _len = all.length; _i < _len; _i++) {
            cls = all[_i];
            if (__indexOf.call(add, cls) < 0) {
                if (hasClass(el, cls)) {
                    removeClass(el, cls);
                }
            }
        }
        _results = [];
        for (_j = 0, _len1 = add.length; _j < _len1; _j++) {
            cls = add[_j];
            if (!hasClass(el, cls)) {
                _results.push(addClass(el, cls));
            } else {
                _results.push(void 0);
            }
        }
        return _results;
    };

    deferred = [];

    defer = function (fn) {
        return deferred.push(fn);
    };

    flush = function () {
        var fn, _results;
        _results = [];
        while (fn = deferred.pop()) {
            _results.push(fn());
        }
        return _results;
    };

    Evented = (function () {
        function Evented() {
        }

        Evented.prototype.on = function (event, handler, ctx, once) {
            var _base;
            if (once == null) {
                once = false;
            }
            if (this.bindings == null) {
                this.bindings = {};
            }
            if ((_base = this.bindings)[event] == null) {
                _base[event] = [];
            }
            return this.bindings[event].push({
                handler: handler,
                ctx: ctx,
                once: once
            });
        };

        Evented.prototype.once = function (event, handler, ctx) {
            return this.on(event, handler, ctx, true);
        };

        Evented.prototype.off = function (event, handler) {
            var i, _ref, _results;
            if (((_ref = this.bindings) != null ? _ref[event] : void 0) == null) {
                return;
            }
            if (handler == null) {
                return delete this.bindings[event];
            } else {
                i = 0;
                _results = [];
                while (i < this.bindings[event].length) {
                    if (this.bindings[event][i].handler === handler) {
                        _results.push(this.bindings[event].splice(i, 1));
                    } else {
                        _results.push(i++);
                    }
                }
                return _results;
            }
        };

        Evented.prototype.trigger = function () {
            var args, ctx, event, handler, i, once, _ref, _ref1, _results;
            event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
            if ((_ref = this.bindings) != null ? _ref[event] : void 0) {
                i = 0;
                _results = [];
                while (i < this.bindings[event].length) {
                    _ref1 = this.bindings[event][i], handler = _ref1.handler, ctx = _ref1.ctx, once = _ref1.once;
                    handler.apply(ctx != null ? ctx : this, args);
                    if (once) {
                        _results.push(this.bindings[event].splice(i, 1));
                    } else {
                        _results.push(i++);
                    }
                }
                return _results;
            }
        };

        return Evented;

    })();

    Tether.Utils = {
        getScrollParent: getScrollParent,
        getBounds: getBounds,
        getOffsetParent: getOffsetParent,
        extend: extend,
        addClass: addClass,
        removeClass: removeClass,
        hasClass: hasClass,
        updateClasses: updateClasses,
        defer: defer,
        flush: flush,
        uniqueId: uniqueId,
        Evented: Evented
    };

}).call(this);

(function () {
    var MIRROR_LR, MIRROR_TB, OFFSET_MAP, addClass, addOffset, attachmentToOffset, autoToFixedAttachment, defer, extend, flush, getBounds, getOffsetParent, getOuterSize, getScrollParent, getSize, now, offsetToPx, parseAttachment, parseOffset, position, removeClass, tethers, transformKey, updateClasses, within, _Tether, _ref,
        __slice = [].slice,
        __bind = function (fn, me) {
            return function () {
                return fn.apply(me, arguments);
            };
        };

    if (typeof Tether === "undefined" || Tether === null) {
        throw new Error("You must include the utils.js file before tether.js");
    }

    _ref = Tether.Utils, getScrollParent = _ref.getScrollParent, getSize = _ref.getSize, getOuterSize = _ref.getOuterSize, getBounds = _ref.getBounds, getOffsetParent = _ref.getOffsetParent, extend = _ref.extend, addClass = _ref.addClass, removeClass = _ref.removeClass, updateClasses = _ref.updateClasses, defer = _ref.defer, flush = _ref.flush;

    within = function (a, b, diff) {
        if (diff == null) {
            diff = 1;
        }
        return (a + diff >= b && b >= a - diff);
    };

    transformKey = (function () {
        var el, key, _i, _len, _ref1;
        el = document.createElement('div');
        _ref1 = ['transform', 'webkitTransform', 'OTransform', 'MozTransform', 'msTransform'];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            key = _ref1[_i];
            if (el.style[key] !== void 0) {
                return key;
            }
        }
    })();

    tethers = [];

    position = function () {
        var tether, _i, _len;
        for (_i = 0, _len = tethers.length; _i < _len; _i++) {
            tether = tethers[_i];
            tether.position(false);
        }
        return flush();
    };

    now = function () {
        var _ref1;
        return (_ref1 = typeof performance !== "undefined" && performance !== null ? typeof performance.now === "function" ? performance.now() : void 0 : void 0) != null ? _ref1 : +(new Date);
    };

    (function () {
        var event, lastCall, lastDuration, pendingTimeout, tick, _i, _len, _ref1, _results;
        lastCall = null;
        lastDuration = null;
        pendingTimeout = null;
        tick = function () {
            if ((lastDuration != null) && lastDuration > 16) {
                lastDuration = Math.min(lastDuration - 16, 250);
                pendingTimeout = setTimeout(tick, 250);
                return;
            }
            if ((lastCall != null) && (now() - lastCall) < 10) {
                return;
            }
            if (pendingTimeout != null) {
                clearTimeout(pendingTimeout);
                pendingTimeout = null;
            }
            lastCall = now();
            position();
            return lastDuration = now() - lastCall;
        };
        _ref1 = ['resize', 'scroll', 'touchmove'];
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            event = _ref1[_i];
            _results.push(window.addEventListener(event, tick));
        }
        return _results;
    })();

    MIRROR_LR = {
        center: 'center',
        left: 'right',
        right: 'left'
    };

    MIRROR_TB = {
        middle: 'middle',
        top: 'bottom',
        bottom: 'top'
    };

    OFFSET_MAP = {
        top: 0,
        left: 0,
        middle: '50%',
        center: '50%',
        bottom: '100%',
        right: '100%'
    };

    autoToFixedAttachment = function (attachment, relativeToAttachment) {
        var left, top;
        left = attachment.left, top = attachment.top;
        if (left === 'auto') {
            left = MIRROR_LR[relativeToAttachment.left];
        }
        if (top === 'auto') {
            top = MIRROR_TB[relativeToAttachment.top];
        }
        return {
            left: left,
            top: top
        };
    };

    attachmentToOffset = function (attachment) {
        var _ref1, _ref2;
        return {
            left: (_ref1 = OFFSET_MAP[attachment.left]) != null ? _ref1 : attachment.left,
            top: (_ref2 = OFFSET_MAP[attachment.top]) != null ? _ref2 : attachment.top
        };
    };

    addOffset = function () {
        var left, offsets, out, top, _i, _len, _ref1;
        offsets = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        out = {
            top: 0,
            left: 0
        };
        for (_i = 0, _len = offsets.length; _i < _len; _i++) {
            _ref1 = offsets[_i], top = _ref1.top, left = _ref1.left;
            if (typeof top === 'string') {
                top = parseFloat(top, 10);
            }
            if (typeof left === 'string') {
                left = parseFloat(left, 10);
            }
            out.top += top;
            out.left += left;
        }
        return out;
    };

    offsetToPx = function (offset, size) {
        if (typeof offset.left === 'string' && offset.left.indexOf('%') !== -1) {
            offset.left = parseFloat(offset.left, 10) / 100 * size.width;
        }
        if (typeof offset.top === 'string' && offset.top.indexOf('%') !== -1) {
            offset.top = parseFloat(offset.top, 10) / 100 * size.height;
        }
        return offset;
    };

    parseAttachment = parseOffset = function (value) {
        var left, top, _ref1;
        _ref1 = value.split(' '), top = _ref1[0], left = _ref1[1];
        return {
            top: top,
            left: left
        };
    };

    _Tether = (function () {
        _Tether.modules = [];

        function _Tether(options) {
            this.position = __bind(this.position, this);
            var module, _i, _len, _ref1, _ref2;
            tethers.push(this);
            this.history = [];
            this.setOptions(options, false);
            _ref1 = Tether.modules;
            for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                module = _ref1[_i];
                if ((_ref2 = module.initialize) != null) {
                    _ref2.call(this);
                }
            }
            this.position();
        }

        _Tether.prototype.getClass = function (key) {
            var _ref1, _ref2;
            if ((_ref1 = this.options.classes) != null ? _ref1[key] : void 0) {
                return this.options.classes[key];
            } else if (((_ref2 = this.options.classes) != null ? _ref2[key] : void 0) !== false) {
                if (this.options.classPrefix) {
                    return "" + this.options.classPrefix + "-" + key;
                } else {
                    return key;
                }
            } else {
                return '';
            }
        };

        _Tether.prototype.setOptions = function (options, position) {
            var defaults, key, _i, _len, _ref1, _ref2;
            this.options = options;
            if (position == null) {
                position = true;
            }
            defaults = {
                offset: '0 0',
                targetOffset: '0 0',
                targetAttachment: 'auto auto',
                classPrefix: 'tether'
            };
            this.options = extend(defaults, this.options);
            _ref1 = this.options, this.element = _ref1.element, this.target = _ref1.target, this.targetModifier = _ref1.targetModifier;
            if (this.target === 'viewport') {
                this.target = document.body;
                this.targetModifier = 'visible';
            } else if (this.target === 'scroll-handle') {
                this.target = document.body;
                this.targetModifier = 'scroll-handle';
            }
            _ref2 = ['element', 'target'];
            for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
                key = _ref2[_i];
                if (this[key] == null) {
                    throw new Error("Tether Error: Both element and target must be defined");
                }
                if (this[key].jquery != null) {
                    this[key] = this[key][0];
                } else if (typeof this[key] === 'string') {
                    this[key] = document.querySelector(this[key]);
                }
            }
            addClass(this.element, this.getClass('element'));
            addClass(this.target, this.getClass('target'));
            if (!this.options.attachment) {
                throw new Error("Tether Error: You must provide an attachment");
            }
            this.targetAttachment = parseAttachment(this.options.targetAttachment);
            this.attachment = parseAttachment(this.options.attachment);
            this.offset = parseOffset(this.options.offset);
            this.targetOffset = parseOffset(this.options.targetOffset);
            if (this.scrollParent != null) {
                this.disable();
            }
            if (this.targetModifier === 'scroll-handle') {
                this.scrollParent = this.target;
            } else {
                this.scrollParent = getScrollParent(this.target);
            }
            if (this.options.enabled !== false) {
                return this.enable(position);
            }
        };

        _Tether.prototype.getTargetBounds = function () {
            var bounds, fitAdj, hasBottomScroll, height, out, scrollBottom, scrollPercentage, style, target;
            if (this.targetModifier != null) {
                switch (this.targetModifier) {
                    case 'visible':
                        if (this.target === document.body) {
                            return {
                                top: pageYOffset,
                                left: pageXOffset,
                                height: innerHeight,
                                width: innerWidth
                            };
                        } else {
                            bounds = getBounds(this.target);
                            out = {
                                height: bounds.height,
                                width: bounds.width,
                                top: bounds.top,
                                left: bounds.left
                            };
                            out.height = Math.min(out.height, bounds.height - (pageYOffset - bounds.top));
                            out.height = Math.min(out.height, bounds.height - ((bounds.top + bounds.height) - (pageYOffset + innerHeight)));
                            out.height = Math.min(innerHeight, out.height);
                            out.height -= 2;
                            out.width = Math.min(out.width, bounds.width - (pageXOffset - bounds.left));
                            out.width = Math.min(out.width, bounds.width - ((bounds.left + bounds.width) - (pageXOffset + innerWidth)));
                            out.width = Math.min(innerWidth, out.width);
                            out.width -= 2;
                            if (out.top < pageYOffset) {
                                out.top = pageYOffset;
                            }
                            if (out.left < pageXOffset) {
                                out.left = pageXOffset;
                            }
                            return out;
                        }
                        break;
                    case 'scroll-handle':
                        target = this.target;
                        if (target === document.body) {
                            target = document.documentElement;
                            bounds = {
                                left: pageXOffset,
                                top: pageYOffset,
                                height: innerHeight,
                                width: innerWidth
                            };
                        } else {
                            bounds = getBounds(target);
                        }
                        style = getComputedStyle(target);
                        hasBottomScroll = target.scrollWidth > target.clientWidth || 'scroll' === [style.overflow, style.overflowX] || this.target !== document.body;
                        scrollBottom = 0;
                        if (hasBottomScroll) {
                            scrollBottom = 15;
                        }
                        height = bounds.height - parseFloat(style.borderTopWidth) - parseFloat(style.borderBottomWidth) - scrollBottom;
                        out = {
                            width: 15,
                            height: height * 0.975 * (height / target.scrollHeight),
                            left: bounds.left + bounds.width - parseFloat(style.borderLeftWidth) - 15
                        };
                        fitAdj = 0;
                        if (height < 408 && this.target === document.body) {
                            fitAdj = -0.00011 * Math.pow(height, 2) - 0.00727 * height + 22.58;
                        }
                        if (this.target !== document.body) {
                            out.height = Math.max(out.height, 24);
                        }
                        scrollPercentage = target.scrollTop / (target.scrollHeight - height);
                        out.top = scrollPercentage * (height - out.height - fitAdj) + bounds.top + parseFloat(style.borderTopWidth);
                        if (this.target === document.body) {
                            out.height = Math.max(out.height, 24);
                        }
                        return out;
                }
            } else {
                return getBounds(this.target);
            }
        };

        _Tether.prototype.clearCache = function () {
            return this._cache = {};
        };

        _Tether.prototype.cache = function (k, getter) {
            if (this._cache == null) {
                this._cache = {};
            }
            if (this._cache[k] == null) {
                this._cache[k] = getter.call(this);
            }
            return this._cache[k];
        };

        _Tether.prototype.enable = function (position) {
            if (position == null) {
                position = true;
            }
            addClass(this.target, this.getClass('enabled'));
            addClass(this.element, this.getClass('enabled'));
            this.enabled = true;
            if (this.scrollParent !== document) {
                this.scrollParent.addEventListener('scroll', this.position);
            }
            if (position) {
                return this.position();
            }
        };

        _Tether.prototype.disable = function () {
            removeClass(this.target, this.getClass('enabled'));
            removeClass(this.element, this.getClass('enabled'));
            this.enabled = false;
            if (this.scrollParent != null) {
                return this.scrollParent.removeEventListener('scroll', this.position);
            }
        };

        _Tether.prototype.destroy = function () {
            var i, tether, _i, _len, _results;
            this.disable();
            _results = [];
            for (i = _i = 0, _len = tethers.length; _i < _len; i = ++_i) {
                tether = tethers[i];
                if (tether === this) {
                    tethers.splice(i, 1);
                    break;
                } else {
                    _results.push(void 0);
                }
            }
            return _results;
        };

        _Tether.prototype.updateAttachClasses = function (elementAttach, targetAttach) {
            var add, all, side, sides, _i, _j, _len, _len1, _ref1,
                _this = this;
            if (elementAttach == null) {
                elementAttach = this.attachment;
            }
            if (targetAttach == null) {
                targetAttach = this.targetAttachment;
            }
            sides = ['left', 'top', 'bottom', 'right', 'middle', 'center'];
            if ((_ref1 = this._addAttachClasses) != null ? _ref1.length : void 0) {
                this._addAttachClasses.splice(0, this._addAttachClasses.length);
            }
            add = this._addAttachClasses != null ? this._addAttachClasses : this._addAttachClasses = [];
            if (elementAttach.top) {
                add.push("" + (this.getClass('element-attached')) + "-" + elementAttach.top);
            }
            if (elementAttach.left) {
                add.push("" + (this.getClass('element-attached')) + "-" + elementAttach.left);
            }
            if (targetAttach.top) {
                add.push("" + (this.getClass('target-attached')) + "-" + targetAttach.top);
            }
            if (targetAttach.left) {
                add.push("" + (this.getClass('target-attached')) + "-" + targetAttach.left);
            }
            all = [];
            for (_i = 0, _len = sides.length; _i < _len; _i++) {
                side = sides[_i];
                all.push("" + (this.getClass('element-attached')) + "-" + side);
            }
            for (_j = 0, _len1 = sides.length; _j < _len1; _j++) {
                side = sides[_j];
                all.push("" + (this.getClass('target-attached')) + "-" + side);
            }
            return defer(function () {
                if (_this._addAttachClasses == null) {
                    return;
                }
                updateClasses(_this.element, _this._addAttachClasses, all);
                updateClasses(_this.target, _this._addAttachClasses, all);
                return _this._addAttachClasses = void 0;
            });
        };

        _Tether.prototype.position = function (flushChanges) {
            var elementPos, elementStyle, height, left, manualOffset, manualTargetOffset, module, next, offset, offsetBorder, offsetParent, offsetParentSize, offsetParentStyle, offsetPosition, ret, scrollLeft, scrollTop, side, targetAttachment, targetOffset, targetPos, targetSize, top, width, _i, _j, _len, _len1, _ref1, _ref2, _ref3, _ref4,
                _this = this;
            if (flushChanges == null) {
                flushChanges = true;
            }
            if (!this.enabled) {
                return;
            }
            this.clearCache();
            targetAttachment = autoToFixedAttachment(this.targetAttachment, this.attachment);
            this.updateAttachClasses(this.attachment, targetAttachment);
            elementPos = this.cache('element-bounds', function () {
                return getBounds(_this.element);
            });
            width = elementPos.width, height = elementPos.height;
            if (width === 0 && height === 0 && (this.lastSize != null)) {
                _ref1 = this.lastSize, width = _ref1.width, height = _ref1.height;
            } else {
                this.lastSize = {
                    width: width,
                    height: height
                };
            }
            targetSize = targetPos = this.cache('target-bounds', function () {
                return _this.getTargetBounds();
            });
            offset = offsetToPx(attachmentToOffset(this.attachment), {
                width: width,
                height: height
            });
            targetOffset = offsetToPx(attachmentToOffset(targetAttachment), targetSize);
            manualOffset = offsetToPx(this.offset, {
                width: width,
                height: height
            });
            manualTargetOffset = offsetToPx(this.targetOffset, targetSize);
            offset = addOffset(offset, manualOffset);
            targetOffset = addOffset(targetOffset, manualTargetOffset);
            left = targetPos.left + targetOffset.left - offset.left;
            top = targetPos.top + targetOffset.top - offset.top;
            _ref2 = Tether.modules;
            for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
                module = _ref2[_i];
                ret = module.position.call(this, {
                    left: left,
                    top: top,
                    targetAttachment: targetAttachment,
                    targetPos: targetPos,
                    elementPos: elementPos,
                    offset: offset,
                    targetOffset: targetOffset,
                    manualOffset: manualOffset,
                    manualTargetOffset: manualTargetOffset
                });
                if ((ret == null) || typeof ret !== 'object') {
                    continue;
                } else if (ret === false) {
                    return false;
                } else {
                    top = ret.top, left = ret.left;
                }
            }
            next = {
                page: {
                    top: top,
                    bottom: document.body.scrollHeight - top - height,
                    left: left,
                    right: document.body.scrollWidth - left - width
                },
                viewport: {
                    top: top - pageYOffset,
                    bottom: pageYOffset - top - height + innerHeight,
                    left: left - pageXOffset,
                    right: pageXOffset - left - width + innerWidth
                }
            };
            if (((_ref3 = this.options.optimizations) != null ? _ref3.moveElement : void 0) !== false && (this.targetModifier == null)) {
                offsetParent = this.cache('target-offsetparent', function () {
                    return getOffsetParent(_this.target);
                });
                offsetPosition = this.cache('target-offsetparent-bounds', function () {
                    return getBounds(offsetParent);
                });
                offsetParentStyle = getComputedStyle(offsetParent);
                elementStyle = getComputedStyle(this.element);
                offsetParentSize = offsetPosition;
                offsetBorder = {};
                _ref4 = ['Top', 'Left', 'Bottom', 'Right'];
                for (_j = 0, _len1 = _ref4.length; _j < _len1; _j++) {
                    side = _ref4[_j];
                    offsetBorder[side] = parseFloat(offsetParentStyle["border" + side + "Width"]);
                }
                offsetPosition.right = document.body.scrollWidth - offsetPosition.left - offsetParentSize.width + offsetBorder.right;
                offsetPosition.bottom = document.body.scrollHeight - offsetPosition.top - offsetParentSize.height + offsetBorder.bottom;
                if (next.page.top >= (offsetPosition.top + offsetBorder.top) && next.page.bottom >= offsetPosition.bottom) {
                    if (next.page.left >= (offsetPosition.left + offsetBorder.left) && next.page.right >= offsetPosition.right) {
                        scrollTop = offsetParent.scrollTop;
                        scrollLeft = offsetParent.scrollLeft;
                        next.offset = {
                            top: next.page.top - offsetPosition.top + scrollTop - offsetBorder.top,
                            left: next.page.left - offsetPosition.left + scrollLeft - offsetBorder.left
                        };
                    }
                }
            }
            this.move(next);
            this.history.unshift(next);
            if (this.history.length > 3) {
                this.history.pop();
            }
            if (flushChanges) {
                flush();
            }
            return true;
        };

        _Tether.prototype.move = function (position) {
            var css, elVal, found, key, moved, offsetParent, point, same, transcribe, type, val, write, writeCSS, _i, _len, _ref1, _ref2,
                _this = this;
            if (this.element.parentNode == null) {
                return;
            }
            same = {};
            for (type in position) {
                same[type] = {};
                for (key in position[type]) {
                    found = false;
                    _ref1 = this.history;
                    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                        point = _ref1[_i];
                        if (!within((_ref2 = point[type]) != null ? _ref2[key] : void 0, position[type][key])) {
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        same[type][key] = true;
                    }
                }
            }
            css = {
                top: '',
                left: '',
                right: '',
                bottom: ''
            };
            transcribe = function (same, pos) {
                var xPos, yPos, _ref3;
                if (((_ref3 = _this.options.optimizations) != null ? _ref3.gpu : void 0) !== false) {
                    if (same.top) {
                        css.top = 0;
                        yPos = pos.top;
                    } else {
                        css.bottom = 0;
                        yPos = -pos.bottom;
                    }
                    if (same.left) {
                        css.left = 0;
                        xPos = pos.left;
                    } else {
                        css.right = 0;
                        xPos = -pos.right;
                    }
                    css[transformKey] = "translateX(" + (Math.round(xPos)) + "px) translateY(" + (Math.round(yPos)) + "px)";
                    if (transformKey !== 'msTransform') {
                        return css[transformKey] += " translateZ(0)";
                    }
                } else {
                    if (same.top) {
                        css.top = "" + pos.top + "px";
                    } else {
                        css.bottom = "" + pos.bottom + "px";
                    }
                    if (same.left) {
                        return css.left = "" + pos.left + "px";
                    } else {
                        return css.right = "" + pos.right + "px";
                    }
                }
            };
            moved = false;
            if ((same.page.top || same.page.bottom) && (same.page.left || same.page.right)) {
                css.position = 'absolute';
                transcribe(same.page, position.page);
            } else if ((same.viewport.top || same.viewport.bottom) && (same.viewport.left || same.viewport.right)) {
                css.position = 'fixed';
                transcribe(same.viewport, position.viewport);
            } else if ((same.offset != null) && same.offset.top && same.offset.left) {
                css.position = 'absolute';
                offsetParent = this.cache('target-offsetparent', function () {
                    return getOffsetParent(_this.target);
                });
                if (getOffsetParent(this.element) !== offsetParent) {
                    defer(function () {
                        _this.element.parentNode.removeChild(_this.element);
                        return offsetParent.appendChild(_this.element);
                    });
                }
                transcribe(same.offset, position.offset);
                moved = true;
            } else {
                css.position = 'absolute';
                transcribe({
                    top: true,
                    left: true
                }, position.page);
            }
            if (!moved && this.element.parentNode.tagName !== 'BODY') {
                this.element.parentNode.removeChild(this.element);
                document.body.appendChild(this.element);
            }
            writeCSS = {};
            write = false;
            for (key in css) {
                val = css[key];
                elVal = this.element.style[key];
                if (elVal !== '' && val !== '' && (key === 'top' || key === 'left' || key === 'bottom' || key === 'right')) {
                    elVal = parseFloat(elVal);
                    val = parseFloat(val);
                }
                if (elVal !== val) {
                    write = true;
                    writeCSS[key] = css[key];
                }
            }
            if (write) {
                return defer(function () {
                    return extend(_this.element.style, writeCSS);
                });
            }
        };

        return _Tether;

    })();

    Tether.position = position;

    window.Tether = extend(_Tether, Tether);

}).call(this);

(function () {
    var BOUNDS_FORMAT, MIRROR_ATTACH, defer, extend, getBoundingRect, getBounds, getOuterSize, getSize, updateClasses, _ref,
        __indexOf = [].indexOf || function (item) {
                for (var i = 0, l = this.length; i < l; i++) {
                    if (i in this && this[i] === item) return i;
                }
                return -1;
            };

    _ref = Tether.Utils, getOuterSize = _ref.getOuterSize, getBounds = _ref.getBounds, getSize = _ref.getSize, extend = _ref.extend, updateClasses = _ref.updateClasses, defer = _ref.defer;

    MIRROR_ATTACH = {
        left: 'right',
        right: 'left',
        top: 'bottom',
        bottom: 'top',
        middle: 'middle'
    };

    BOUNDS_FORMAT = ['left', 'top', 'right', 'bottom'];

    getBoundingRect = function (tether, to) {
        var i, pos, side, size, style, _i, _len;
        if (to === 'scrollParent') {
            to = tether.scrollParent;
        } else if (to === 'window') {
            to = [pageXOffset, pageYOffset, innerWidth + pageXOffset, innerHeight + pageYOffset];
        }
        if (to === document) {
            to = to.documentElement;
        }
        if (to.nodeType != null) {
            pos = size = getBounds(to);
            style = getComputedStyle(to);
            to = [pos.left, pos.top, size.width + pos.left, size.height + pos.top];
            for (i = _i = 0, _len = BOUNDS_FORMAT.length; _i < _len; i = ++_i) {
                side = BOUNDS_FORMAT[i];
                side = side[0].toUpperCase() + side.substr(1);
                if (side === 'Top' || side === 'Left') {
                    to[i] += parseFloat(style["border" + side + "Width"]);
                } else {
                    to[i] -= parseFloat(style["border" + side + "Width"]);
                }
            }
        }
        return to;
    };

    Tether.modules.push({
        position: function (_arg) {
            var addClasses, allClasses, attachment, bounds, changeAttachX, changeAttachY, cls, constraint, eAttachment, height, left, oob, oobClass, p, pin, pinned, pinnedClass, removeClass, side, tAttachment, targetAttachment, targetHeight, targetSize, targetWidth, to, top, width, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _len5, _m, _n, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8,
                _this = this;
            top = _arg.top, left = _arg.left, targetAttachment = _arg.targetAttachment;
            if (!this.options.constraints) {
                return true;
            }
            removeClass = function (prefix) {
                var side, _i, _len, _results;
                _this.removeClass(prefix);
                _results = [];
                for (_i = 0, _len = BOUNDS_FORMAT.length; _i < _len; _i++) {
                    side = BOUNDS_FORMAT[_i];
                    _results.push(_this.removeClass("" + prefix + "-" + side));
                }
                return _results;
            };
            _ref1 = this.cache('element-bounds', function () {
                return getBounds(_this.element);
            }), height = _ref1.height, width = _ref1.width;
            if (width === 0 && height === 0 && (this.lastSize != null)) {
                _ref2 = this.lastSize, width = _ref2.width, height = _ref2.height;
            }
            targetSize = this.cache('target-bounds', function () {
                return _this.getTargetBounds();
            });
            targetHeight = targetSize.height;
            targetWidth = targetSize.width;
            tAttachment = {};
            eAttachment = {};
            allClasses = [this.getClass('pinned'), this.getClass('out-of-bounds')];
            _ref3 = this.options.constraints;
            for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
                constraint = _ref3[_i];
                if (constraint.outOfBoundsClass) {
                    allClasses.push(constraint.outOfBoundsClass);
                }
                if (constraint.pinnedClass) {
                    allClasses.push(constraint.pinnedClass);
                }
            }
            for (_j = 0, _len1 = allClasses.length; _j < _len1; _j++) {
                cls = allClasses[_j];
                _ref4 = ['left', 'top', 'right', 'bottom'];
                for (_k = 0, _len2 = _ref4.length; _k < _len2; _k++) {
                    side = _ref4[_k];
                    allClasses.push("" + cls + "-" + side);
                }
            }
            addClasses = [];
            tAttachment = extend({}, targetAttachment);
            eAttachment = extend({}, this.attachment);
            _ref5 = this.options.constraints;
            for (_l = 0, _len3 = _ref5.length; _l < _len3; _l++) {
                constraint = _ref5[_l];
                to = constraint.to, attachment = constraint.attachment, pin = constraint.pin;
                if (attachment == null) {
                    attachment = '';
                }
                if (__indexOf.call(attachment, ' ') >= 0) {
                    _ref6 = attachment.split(' '), changeAttachY = _ref6[0], changeAttachX = _ref6[1];
                } else {
                    changeAttachX = changeAttachY = attachment;
                }
                bounds = getBoundingRect(this, to);
                if (changeAttachY === 'target' || changeAttachY === 'both') {
                    if (top < bounds[1] && tAttachment.top === 'top') {
                        top += targetHeight;
                        tAttachment.top = 'bottom';
                    }
                    if (top + height > bounds[3] && tAttachment.top === 'bottom') {
                        top -= targetHeight;
                        tAttachment.top = 'top';
                    }
                }
                if (changeAttachY === 'together') {
                    if (top < bounds[1] && tAttachment.top === 'top') {
                        if (eAttachment.top === 'bottom') {
                            top += targetHeight;
                            tAttachment.top = 'bottom';
                            top += height;
                            eAttachment.top = 'top';
                        } else if (eAttachment.top === 'top') {
                            top += targetHeight;
                            tAttachment.top = 'bottom';
                            top -= height;
                            eAttachment.top = 'bottom';
                        }
                    }
                    if (top + height > bounds[3] && tAttachment.top === 'bottom') {
                        if (eAttachment.top === 'top') {
                            top -= targetHeight;
                            tAttachment.top = 'top';
                            top -= height;
                            eAttachment.top = 'bottom';
                        } else if (eAttachment.top === 'bottom') {
                            top -= targetHeight;
                            tAttachment.top = 'top';
                            top += height;
                            eAttachment.top = 'top';
                        }
                    }
                }
                if (changeAttachX === 'target' || changeAttachX === 'both') {
                    if (left < bounds[0] && tAttachment.left === 'left') {
                        left += targetWidth;
                        tAttachment.left = 'right';
                    }
                    if (left + width > bounds[2] && tAttachment.left === 'right') {
                        left -= targetWidth;
                        tAttachment.left = 'left';
                    }
                }
                if (changeAttachX === 'together') {
                    if (left < bounds[0] && tAttachment.left === 'left') {
                        if (eAttachment.left === 'right') {
                            left += targetWidth;
                            tAttachment.left = 'right';
                            left += width;
                            eAttachment.left = 'left';
                        } else if (eAttachment.left === 'left') {
                            left += targetWidth;
                            tAttachment.left = 'right';
                            left -= width;
                            eAttachment.left = 'right';
                        }
                    } else if (left + width > bounds[2] && tAttachment.left === 'right') {
                        if (eAttachment.left === 'left') {
                            left -= targetWidth;
                            tAttachment.left = 'left';
                            left -= width;
                            eAttachment.left = 'right';
                        } else if (eAttachment.left === 'right') {
                            left -= targetWidth;
                            tAttachment.left = 'left';
                            left += width;
                            eAttachment.left = 'left';
                        }
                    }
                }
                if (changeAttachY === 'element' || changeAttachY === 'both') {
                    if (top < bounds[1] && eAttachment.top === 'bottom') {
                        top += height;
                        eAttachment.top = 'top';
                    }
                    if (top + height > bounds[3] && eAttachment.top === 'top') {
                        top -= height;
                        eAttachment.top = 'bottom';
                    }
                }
                if (changeAttachX === 'element' || changeAttachX === 'both') {
                    if (left < bounds[0] && eAttachment.left === 'right') {
                        left += width;
                        eAttachment.left = 'left';
                    }
                    if (left + width > bounds[2] && eAttachment.left === 'left') {
                        left -= width;
                        eAttachment.left = 'right';
                    }
                }
                if (typeof pin === 'string') {
                    pin = (function () {
                        var _len4, _m, _ref7, _results;
                        _ref7 = pin.split(',');
                        _results = [];
                        for (_m = 0, _len4 = _ref7.length; _m < _len4; _m++) {
                            p = _ref7[_m];
                            _results.push(p.trim());
                        }
                        return _results;
                    })();
                } else if (pin === true) {
                    pin = ['top', 'left', 'right', 'bottom'];
                }
                pin || (pin = []);
                pinned = [];
                oob = [];
                if (top < bounds[1]) {
                    if (__indexOf.call(pin, 'top') >= 0) {
                        top = bounds[1];
                        pinned.push('top');
                    } else {
                        oob.push('top');
                    }
                }
                if (top + height > bounds[3]) {
                    if (__indexOf.call(pin, 'bottom') >= 0) {
                        top = bounds[3] - height;
                        pinned.push('bottom');
                    } else {
                        oob.push('bottom');
                    }
                }
                if (left < bounds[0]) {
                    if (__indexOf.call(pin, 'left') >= 0) {
                        left = bounds[0];
                        pinned.push('left');
                    } else {
                        oob.push('left');
                    }
                }
                if (left + width > bounds[2]) {
                    if (__indexOf.call(pin, 'right') >= 0) {
                        left = bounds[2] - width;
                        pinned.push('right');
                    } else {
                        oob.push('right');
                    }
                }
                if (pinned.length) {
                    pinnedClass = (_ref7 = this.options.pinnedClass) != null ? _ref7 : this.getClass('pinned');
                    addClasses.push(pinnedClass);
                    for (_m = 0, _len4 = pinned.length; _m < _len4; _m++) {
                        side = pinned[_m];
                        addClasses.push("" + pinnedClass + "-" + side);
                    }
                }
                if (oob.length) {
                    oobClass = (_ref8 = this.options.outOfBoundsClass) != null ? _ref8 : this.getClass('out-of-bounds');
                    addClasses.push(oobClass);
                    for (_n = 0, _len5 = oob.length; _n < _len5; _n++) {
                        side = oob[_n];
                        addClasses.push("" + oobClass + "-" + side);
                    }
                }
                if (__indexOf.call(pinned, 'left') >= 0 || __indexOf.call(pinned, 'right') >= 0) {
                    eAttachment.left = tAttachment.left = false;
                }
                if (__indexOf.call(pinned, 'top') >= 0 || __indexOf.call(pinned, 'bottom') >= 0) {
                    eAttachment.top = tAttachment.top = false;
                }
                if (tAttachment.top !== targetAttachment.top || tAttachment.left !== targetAttachment.left || eAttachment.top !== this.attachment.top || eAttachment.left !== this.attachment.left) {
                    this.updateAttachClasses(eAttachment, tAttachment);
                }
            }
            defer(function () {
                updateClasses(_this.target, addClasses, allClasses);
                return updateClasses(_this.element, addClasses, allClasses);
            });
            return {
                top: top,
                left: left
            };
        }
    });

}).call(this);

(function () {
    var defer, getBounds, updateClasses, _ref;

    _ref = Tether.Utils, getBounds = _ref.getBounds, updateClasses = _ref.updateClasses, defer = _ref.defer;

    Tether.modules.push({
        position: function (_arg) {
            var abutted, addClasses, allClasses, bottom, height, left, right, side, sides, targetPos, top, width, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref1, _ref2, _ref3, _ref4, _ref5,
                _this = this;
            top = _arg.top, left = _arg.left;
            _ref1 = this.cache('element-bounds', function () {
                return getBounds(_this.element);
            }), height = _ref1.height, width = _ref1.width;
            targetPos = this.getTargetBounds();
            bottom = top + height;
            right = left + width;
            abutted = [];
            if (top <= targetPos.bottom && bottom >= targetPos.top) {
                _ref2 = ['left', 'right'];
                for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
                    side = _ref2[_i];
                    if ((_ref3 = targetPos[side]) === left || _ref3 === right) {
                        abutted.push(side);
                    }
                }
            }
            if (left <= targetPos.right && right >= targetPos.left) {
                _ref4 = ['top', 'bottom'];
                for (_j = 0, _len1 = _ref4.length; _j < _len1; _j++) {
                    side = _ref4[_j];
                    if ((_ref5 = targetPos[side]) === top || _ref5 === bottom) {
                        abutted.push(side);
                    }
                }
            }
            allClasses = [];
            addClasses = [];
            sides = ['left', 'top', 'right', 'bottom'];
            allClasses.push(this.getClass('abutted'));
            for (_k = 0, _len2 = sides.length; _k < _len2; _k++) {
                side = sides[_k];
                allClasses.push("" + (this.getClass('abutted')) + "-" + side);
            }
            if (abutted.length) {
                addClasses.push(this.getClass('abutted'));
            }
            for (_l = 0, _len3 = abutted.length; _l < _len3; _l++) {
                side = abutted[_l];
                addClasses.push("" + (this.getClass('abutted')) + "-" + side);
            }
            defer(function () {
                updateClasses(_this.target, addClasses, allClasses);
                return updateClasses(_this.element, addClasses, allClasses);
            });
            return true;
        }
    });

}).call(this);

(function () {
    Tether.modules.push({
        position: function (_arg) {
            var left, result, shift, shiftLeft, shiftTop, top, _ref;
            top = _arg.top, left = _arg.left;
            if (!this.options.shift) {
                return;
            }
            result = function (val) {
                if (typeof val === 'function') {
                    return val.call(this, {
                        top: top,
                        left: left
                    });
                } else {
                    return val;
                }
            };
            shift = result(this.options.shift);
            if (typeof shift === 'string') {
                shift = shift.split(' ');
                shift[1] || (shift[1] = shift[0]);
                shiftTop = shift[0], shiftLeft = shift[1];
                shiftTop = parseFloat(shiftTop, 10);
                shiftLeft = parseFloat(shiftLeft, 10);
            } else {
                _ref = [shift.top, shift.left], shiftTop = _ref[0], shiftLeft = _ref[1];
            }
            top += shiftTop;
            left += shiftLeft;
            return {
                top: top,
                left: left
            };
        }
    });

}).call(this);

(function () {
    var DOWN, ENTER, ESCAPE, Evented, SPACE, Select, UP, addClass, clickEvent, extend, getBounds, getFocusedSelect, hasClass, isRepeatedChar, lastCharacter, removeClass, searchText, searchTextTimeout, touchDevice, useNative, _ref,
        __bind = function (fn, me) {
            return function () {
                return fn.apply(me, arguments);
            };
        },
        __hasProp = {}.hasOwnProperty,
        __extends = function (child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key)) child[key] = parent[key];
            }
            function ctor() {
                this.constructor = child;
            }

            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        };

    _ref = Tether.Utils, extend = _ref.extend, addClass = _ref.addClass, removeClass = _ref.removeClass, hasClass = _ref.hasClass, getBounds = _ref.getBounds, Evented = _ref.Evented;

    ENTER = 13;

    ESCAPE = 27;

    SPACE = 32;

    UP = 38;

    DOWN = 40;

    touchDevice = 'ontouchstart' in document.documentElement;

    clickEvent = touchDevice ? 'touchstart' : 'click';

    useNative = function () {
        return touchDevice && (innerWidth <= 640 || innerHeight <= 640);
    };

    isRepeatedChar = function (str) {
        return Array.prototype.reduce.call(str, function (a, b) {
            if (a === b) {
                return b;
            } else {
                return false;
            }
        });
    };

    getFocusedSelect = function () {
        var _ref1;
        return (_ref1 = document.querySelector('.select-target-focused')) != null ? _ref1.selectInstance : void 0;
    };

    searchText = '';

    searchTextTimeout = void 0;

    lastCharacter = void 0;

    document.addEventListener('keypress', function (e) {
        var options, repeatedOptions, select, selected;
        if (!(select = getFocusedSelect())) {
            return;
        }
        if (e.charCode === 0) {
            return;
        }
        if (e.keyCode === SPACE) {
            e.preventDefault();
        }
        clearTimeout(searchTextTimeout);
        searchTextTimeout = setTimeout(function () {
            return searchText = '';
        }, 500);
        searchText += String.fromCharCode(e.charCode);
        options = select.findOptionsByPrefix(searchText);
        if (options.length === 1) {
            select.selectOption(options[0]);
            return;
        }
        if (searchText.length > 1 && isRepeatedChar(searchText)) {
            repeatedOptions = select.findOptionsByPrefix(searchText[0]);
            if (repeatedOptions.length) {
                selected = repeatedOptions.indexOf(select.getChosen());
                selected += 1;
                selected = selected % repeatedOptions.length;
                select.selectOption(repeatedOptions[selected]);
                return;
            }
        }
        if (options.length) {
            select.selectOption(options[0]);
        }
    });

    document.addEventListener('keydown', function (e) {
        var select, _ref1, _ref2;
        if (!(select = getFocusedSelect())) {
            return;
        }
        if ((_ref1 = e.keyCode) === UP || _ref1 === DOWN || _ref1 === ESCAPE) {
            e.preventDefault();
        }
        if (select.isOpen()) {
            switch (e.keyCode) {
                case UP:
                case DOWN:
                    return select.moveHighlight(e.keyCode);
                case ENTER:
                    return select.selectHighlightedOption();
                case ESCAPE:
                    select.close();
                    return select.target.focus();
            }
        } else {
            if ((_ref2 = e.keyCode) === UP || _ref2 === DOWN || _ref2 === SPACE) {
                return select.open();
            }
        }
    });

    Select = (function (_super) {
        __extends(Select, _super);

        Select.defaults = {
            alignToHighlighed: 'auto',
            className: 'select-theme-default'
        };

        function Select(options) {
            this.options = options;
            this.update = __bind(this.update, this);
            this.options = extend({}, Select.defaults, this.options);
            this.select = this.options.el;
            if (this.select.selectInstance != null) {
                throw new Error("This element has already been turned into a Select");
            }
            this.setupTarget();
            this.renderTarget();
            this.setupDrop();
            this.renderDrop();
            this.setupSelect();
            this.setupTether();
            this.bindClick();
            this.bindMutationEvents();
            this.value = this.select.value;
        }

        Select.prototype.useNative = function () {
            return this.options.useNative === true || (useNative() && this.options.useNative !== false);
        };

        Select.prototype.setupTarget = function () {
            var tabIndex,
                _this = this;
            this.target = document.createElement('a');
            this.target.href = 'javascript:;';
            addClass(this.target, 'select-target');
            tabIndex = this.select.getAttribute('tabindex') || 0;
            this.target.setAttribute('tabindex', tabIndex);
            if (this.options.className) {
                addClass(this.target, this.options.className);
            }
            this.target.selectInstance = this;
            this.target.addEventListener('click', function () {
                if (!_this.isOpen()) {
                    return _this.target.focus();
                } else {
                    return _this.target.blur();
                }
            });
            this.target.addEventListener('focus', function () {
                return addClass(_this.target, 'select-target-focused');
            });
            this.target.addEventListener('blur', function (e) {
                if (_this.isOpen()) {
                    if (e.relatedTarget && !_this.drop.contains(e.relatedTarget)) {
                        _this.close();
                    }
                }
                return removeClass(_this.target, 'select-target-focused');
            });
            return this.select.parentNode.insertBefore(this.target, this.select.nextSibling);
        };

        Select.prototype.setupDrop = function () {
            var _this = this;
            this.drop = document.createElement('div');
            addClass(this.drop, 'select');
            if (this.options.className) {
                addClass(this.drop, this.options.className);
            }
            document.body.appendChild(this.drop);
            this.drop.addEventListener('click', function (e) {
                if (hasClass(e.target, 'select-option')) {
                    return _this.pickOption(e.target);
                }
            });
            this.drop.addEventListener('mousemove', function (e) {
                if (hasClass(e.target, 'select-option')) {
                    return _this.highlightOption(e.target);
                }
            });
            this.content = document.createElement('div');
            addClass(this.content, 'select-content');
            return this.drop.appendChild(this.content);
        };

        Select.prototype.open = function () {
            var positionSelectStyle, selectedOption,
                _this = this;
            addClass(this.target, 'select-open');
            if (this.useNative()) {
                this.select.style.display = 'block';
                setTimeout(function () {
                    var event;
                    event = document.createEvent("MouseEvents");
                    event.initEvent("mousedown", true, true);
                    return _this.select.dispatchEvent(event);
                });
                return;
            }
            addClass(this.drop, 'select-open');
            setTimeout(function () {
                return _this.tether.enable();
            });
            selectedOption = this.drop.querySelector('.select-option-selected');
            if (!selectedOption) {
                return;
            }
            this.highlightOption(selectedOption);
            this.scrollDropContentToOption(selectedOption);
            positionSelectStyle = function () {
                var dropBounds, offset, optionBounds;
                if (hasClass(_this.drop, 'tether-abutted-left') || hasClass(_this.drop, 'tether-abutted-bottom')) {
                    dropBounds = getBounds(_this.drop);
                    optionBounds = getBounds(selectedOption);
                    offset = dropBounds.top - (optionBounds.top + optionBounds.height);
                    return _this.drop.style.top = (parseFloat(_this.drop.style.top) || 0) + offset + 'px';
                }
            };
            if (this.options.alignToHighlighted === 'always' || (this.options.alignToHighlighted === 'auto' && this.content.scrollHeight <= this.content.clientHeight)) {
                setTimeout(positionSelectStyle);
            }
            return this.trigger('open');
        };

        Select.prototype.close = function () {
            removeClass(this.target, 'select-open');
            if (this.useNative()) {
                this.select.style.display = 'none';
                return;
            }
            this.tether.disable();
            removeClass(this.drop, 'select-open');
            return this.trigger('close');
        };

        Select.prototype.toggle = function () {
            if (this.isOpen()) {
                return this.close();
            } else {
                return this.open();
            }
        };

        Select.prototype.isOpen = function () {
            return hasClass(this.drop, 'select-open');
        };

        Select.prototype.bindClick = function () {
            var _this = this;
            this.target.addEventListener(clickEvent, function (e) {
                e.preventDefault();
                return _this.toggle();
            });
            return document.addEventListener(clickEvent, function (event) {
                if (!_this.isOpen()) {
                    return;
                }
                if (event.target === _this.drop || _this.drop.contains(event.target)) {
                    return;
                }
                if (event.target === _this.target || _this.target.contains(event.target)) {
                    return;
                }
                return _this.close();
            });
        };

        Select.prototype.setupTether = function () {
            return this.tether = new Tether({
                element: this.drop,
                target: this.target,
                attachment: 'top left',
                targetAttachment: 'bottom left',
                classPrefix: 'select',
                constraints: [
                    {
                        to: 'window',
                        attachment: 'together'
                    }
                ]
            });
        };

        Select.prototype.renderTarget = function () {
            var option, _i, _len, _ref1;
            this.target.innerHTML = '';
            _ref1 = this.select.querySelectorAll('option');
            for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                option = _ref1[_i];
                if (option.selected) {
                    this.target.innerHTML = option.innerHTML;
                    break;
                }
            }
            return this.target.appendChild(document.createElement('b'));
        };

        Select.prototype.renderDrop = function () {
            var el, option, optionList, _i, _len, _ref1;
            optionList = document.createElement('ul');
            addClass(optionList, 'select-options');
            _ref1 = this.select.querySelectorAll('option');
            for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                el = _ref1[_i];
                option = document.createElement('li');
                addClass(option, 'select-option');
                option.setAttribute('data-value', el.value);
                option.innerHTML = el.innerHTML;
                if (el.selected) {
                    addClass(option, 'select-option-selected');
                }
                optionList.appendChild(option);
            }
            this.content.innerHTML = '';
            return this.content.appendChild(optionList);
        };

        Select.prototype.update = function () {
            this.renderDrop();
            return this.renderTarget();
        };

        Select.prototype.setupSelect = function () {
            this.select.selectInstance = this;
            addClass(this.select, 'select-select');
            return this.select.addEventListener('change', this.update);
        };

        Select.prototype.bindMutationEvents = function () {
            if (window.MutationObserver != null) {
                this.observer = new MutationObserver(this.update);
                return this.observer.observe(this.select, {
                    childList: true,
                    attributes: true,
                    characterData: true,
                    subtree: true
                });
            } else {
                return this.select.addEventListener('DOMSubtreeModified', this.update);
            }
        };

        Select.prototype.findOptionsByPrefix = function (text) {
            var options;
            options = this.drop.querySelectorAll('.select-option');
            text = text.toLowerCase();
            return Array.prototype.filter.call(options, function (option) {
                return option.innerHTML.toLowerCase().substr(0, text.length) === text;
            });
        };

        Select.prototype.findOptionsByValue = function (val) {
            var options;
            options = this.drop.querySelectorAll('.select-option');
            return Array.prototype.filter.call(options, function (option) {
                return option.getAttribute('data-value') === val;
            });
        };

        Select.prototype.getChosen = function () {
            if (this.isOpen()) {
                return this.drop.querySelector('.select-option-highlight');
            } else {
                return this.drop.querySelector('.select-option-selected');
            }
        };

        Select.prototype.selectOption = function (option) {
            if (this.isOpen()) {
                this.highlightOption(option);
                return this.scrollDropContentToOption(option);
            } else {
                return this.pickOption(option, false);
            }
        };

        Select.prototype.resetSelection = function () {
            return this.selectOption(this.drop.querySelector('.select-option'));
        };

        Select.prototype.highlightOption = function (option) {
            var highlighted;
            highlighted = this.drop.querySelector('.select-option-highlight');
            if (highlighted != null) {
                removeClass(highlighted, 'select-option-highlight');
            }
            addClass(option, 'select-option-highlight');
            return this.trigger('highlight', {
                option: option
            });
        };

        Select.prototype.moveHighlight = function (directionKeyCode) {
            var highlighted, highlightedIndex, newHighlight, options;
            if (!(highlighted = this.drop.querySelector('.select-option-highlight'))) {
                this.highlightOption(this.drop.querySelector('.select-option'));
                return;
            }
            options = this.drop.querySelectorAll('.select-option');
            highlightedIndex = Array.prototype.indexOf.call(options, highlighted);
            if (!(highlightedIndex >= 0)) {
                return;
            }
            if (directionKeyCode === UP) {
                highlightedIndex -= 1;
            } else {
                highlightedIndex += 1;
            }
            if (highlightedIndex < 0 || highlightedIndex >= options.length) {
                return;
            }
            newHighlight = options[highlightedIndex];
            this.highlightOption(newHighlight);
            return this.scrollDropContentToOption(newHighlight);
        };

        Select.prototype.scrollDropContentToOption = function (option) {
            var contentBounds, optionBounds;
            if (this.content.scrollHeight > this.content.clientHeight) {
                contentBounds = getBounds(this.content);
                optionBounds = getBounds(option);
                return this.content.scrollTop = optionBounds.top - (contentBounds.top - this.content.scrollTop);
            }
        };

        Select.prototype.selectHighlightedOption = function () {
            return this.pickOption(this.drop.querySelector('.select-option-highlight'));
        };

        Select.prototype.pickOption = function (option, close) {
            var _this = this;
            if (close == null) {
                close = true;
            }
            this.value = this.select.value = option.getAttribute('data-value');
            this.triggerChange();
            if (close) {
                return setTimeout(function () {
                    _this.close();
                    return _this.target.focus();
                });
            }
        };

        Select.prototype.triggerChange = function () {
            var event;
            event = document.createEvent("HTMLEvents");
            event.initEvent("change", true, false);
            this.select.dispatchEvent(event);
            return this.trigger('change', {
                value: this.select.value
            });
        };

        Select.prototype.change = function (val) {
            var options;
            options = this.findOptionsByValue(val);
            if (!options.length) {
                throw new Error("Select Error: An option with the value \"" + val + "\" doesn't exist");
            }
            return this.pickOption(options[0], false);
        };

        return Select;

    })(Evented);

    Select.init = function (options) {
        var el, _i, _len, _ref1, _results;
        if (options == null) {
            options = {};
        }
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function () {
                return Select.init(options);
            });
            return;
        }
        if (options.selector == null) {
            options.selector = 'select';
        }
        _ref1 = document.querySelectorAll(options.selector);
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            el = _ref1[_i];
            if (!el.selectInstance) {
                _results.push(new Select(extend({
                    el: el
                }, options)));
            } else {
                _results.push(void 0);
            }
        }
        return _results;
    };

    window.Select = Select;

}).call(this);
