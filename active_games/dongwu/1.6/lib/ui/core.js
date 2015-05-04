/**
 * @author Suker
 * jsGame引擎UI组件 - 核心方法接口
 * 对jsGame.ui命名空间进行扩展
 * 注：不能直接对jsGame.ui赋予一个对象，只能对jsGame.ui附加属性、方法
 * 版本1.6
 * LeiYoo
 */
var uiCoreArgs;
(function($) {
	//计算UI资源目录对于项目主页面的相对路径
	$.ui.libPath = '';
	var _getScriptDoms = document.getElementsByTagName('script'), _len = _getScriptDoms.length, _scriptDom;
	for (var i = 0; i < _len; i++) {
		_scriptDom = _getScriptDoms[i];
		if (_scriptDom.src.indexOf('core.js') != -1) {
			$.ui.libPath = _scriptDom.src.replace('core.js', '');
			break;
		}
		else if (_scriptDom.src.indexOf('coremin.js') != -1) {
			$.ui.libPath = _scriptDom.src.replace('coremin.js', '');
			break;
		}
	}
	_scriptDom = null;
	_len = null;
	_getScriptDoms = null;
	$.pushImage([
		{ id: 'frame3corner', src: $.ui.libPath + 'res/frame3corner.png' },
		{ id: 'frame3side', src: $.ui.libPath + 'res/frame3side.png' }
	]);
	
	uiCoreArgs = {
		dx: 0, //UI整体偏移量
		dy: 0,
		deviceType: -1,
		enums: {
			//设备类型枚举
			deviceType: {
				keyboard: 0,
				touch: 1,
				pc: 2
			},
			//UI布局类型枚举
			floatType: {
				left: 0,
				right: 1,
				center: 2,
				top: 3,
				bottom: 4
			},
			//渲染类型
			renderType: {
				show: 0,
				hide: 1,
				hover: 2,
				disable: 3,
				add: 4,
				sub: 5
			}
		},
		init: function(dx, dy) {
			this.dx = dx || 0;
			this.dy = dy || 0;
		}
	};
	//静态私有变量
	var _args = {
		dataURLs: {}
	};
	
	//设备分类
	if ($.canvas.screen.getDevice() == 'jeme' || $.canvas.screen.getDevice().indexOf('symbian') >= 0) 
		uiCoreArgs.deviceType = uiCoreArgs.enums.deviceType.keyboard;
	else if ($.canvas.screen.getTouch())
		uiCoreArgs.deviceType = uiCoreArgs.enums.deviceType.touch;
	else
		uiCoreArgs.deviceType = uiCoreArgs.enums.deviceType.pc;
		
	if (uiCoreArgs.deviceType == uiCoreArgs.enums.deviceType.touch) {
		//禁用系统事件
		document.addEventListener('touchstart', function(e) { 
            //禁用系统事件会影响到click事件，所以不能在有click事件的事件体系中禁用系统事件
            if (e.target.tagName != 'CANVAS' && e.touches.length == 1 &&
            (!e.target.that || 
            (e.target.that.type != 'button' && e.target.that.type != 'textBox'))) {
			    e.preventDefault(); //在ontouchstart中禁用系统事件可以防止出现选中文字框
                window.scrollTo(0, 1);                
            }
		}, false)
		document.addEventListener('touchend', function(e) { 
            if (!e.target.that || e.target.that.type != 'textBox')
			    e.preventDefault(); 
		}, false)
		document.addEventListener('touchmove', function(e) { 
			if (e.touches.length == 1) 
				e.preventDefault(); 
		}, false)
	}
	//继承方法集合预留(日后prototype实现后可用)
	$.ui.core = function(id, x, y, width, height, hided) { 
		this.id = id;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.hided = hided;
	};
	$.ui.core.prototype = {
		/**
		 * 获取屏幕宽
		 */
		getScreenWidth: function() {
			return window.innerWidth;
		},
		/**
		 * 获取屏幕高
		 */
		getScreenHeight: function() {
			return window.innerHeight;
		},
		/**
		 * 创建dom通用方法
		 * @param {string} tag
		 * @param {array} attributes
		 * @param {array} styles
		 * @param {function} events
		 */
		makeDom: function(tag, attributes, styles, events) {
			var _attributes = attributes || {},
			_styles = styles || {},
			_events = events || {},
			_dom = document.createElement(tag), _a;
			for (_a in _attributes)
				_dom[_a] = _attributes[_a];
			for (_a in  _styles) 
				_dom.style[_a] = _styles[_a];
			for (_a in _events)
				_dom['on' + _a] = _events[_a];
			_a = null;
			_dom.style['float'] = 'left';
			_dom.style['cssFloat'] = 'left';
			_dom.style['styleFloat'] = 'left';
            _events = _styles = _attributes = null;
			return _dom;
		},
		/**
		 * 创建框架
		 * @param {Object} param
		 */
		makeFrame: function(param) {
			var _props = $.objExtend({
				id: '',
				width: 600,
				height: 400,
				x: 0,
				y: 0,
				bgColor: '#F9ECC2',
				bgStyle: 'frameStyle', //优化dataURL创建机制
				hided: false,
				tiles: [
					{ id: 'frame3corner', sx: 0, sy: 0, sw: 40, sh: 40, w: 40, h: 40 },
					{ id: 'frame3corner', sx: 0, sy: 40, sw: 40, sh: 40, w: -1, h: 40 },
					{ id: 'frame3corner', sx: 0, sy: 80, sw: 40, sh: 40, w: 40, h: 40 },
					{ id: 'frame3side', sx: 0, sy: 0, sw: 40, sh: 40, w: 40, h: -1 },
					{ id: '', sx: 0, sy: 0, w: -1, h: -1 },
					{ id: 'frame3side', sx: 40, sy: 0, sw: 40, sh: 40, w: 40, h: -1 },
					{ id: 'frame3corner', sx: 0, sy: 120, sw: 40, sh: 40, w: 40, h: 40 },
					{ id: 'frame3corner', sx: 0, sy: 160, sw: 40, sh: 40, w: -1, h: 40 },
					{ id: 'frame3corner', sx: 0, sy: 200, sw: 40, sh: 40, w: 40, h: 40 }
				],
                background: '',
			}, param), _frame, _a, _len = _props.tiles.length, _tile, _sonStyles;
			//创建父节点
			_frame = this.makeDom('div', { attr: 'id', value: _props.id }, {
				position: 'absolute',
				left: _props.x + 'px',
				top: _props.y + 'px',
				width: _props.width + 'px',
				height: _props.height + 'px',
                background: _props.background,
				backgroundColor: _props.bgColor,
				display: _props.hided ? 'none' : 'block'
			}, null);
			if (_props.tiles[0] && _props.tiles[0].id != '') {
				//校对子节点样式
				_props.tiles[1].w = parseInt(_props.width - _props.tiles[0].w - _props.tiles[2].w);
				_props.tiles[7].w = _props.tiles[1].w;
				_props.tiles[3].h = parseInt(_props.height - _props.tiles[0].h - _props.tiles[6].h);
				_props.tiles[5].h = _props.tiles[3].h;
				_props.tiles[4].w = _props.tiles[1].w;
				_props.tiles[4].h = _props.tiles[3].h;
				_props.tiles[4].bgc = _props.bgColor
					
				var _getTouch = $.canvas.screen.getTouch(), _getDevice = $.canvas.screen.getDevice();
				if (_getDevice == 'iphone' || _getDevice == 'ipad' || _getDevice == 'opera' || (!_getTouch && _getDevice != 'firefox')) {
					if (!_args.dataURLs[_props.bgStyle]) {
						$.canvas.pass('frameBg', _props.width, _props.height)
						.drawImage(_props.tiles[0].id, _props.tiles[0].sx, _props.tiles[0].sy, _props.tiles[0].sw, _props.tiles[0].sh, 0, 0, _props.tiles[0].w, _props.tiles[0].h)
						.drawImage(_props.tiles[1].id, _props.tiles[1].sx, _props.tiles[1].sy, _props.tiles[1].sw, _props.tiles[1].sh, _props.tiles[0].w, 0, _props.tiles[1].w, _props.tiles[1].h)
						.drawImage(_props.tiles[2].id, _props.tiles[2].sx, _props.tiles[2].sy, _props.tiles[2].sw, _props.tiles[2].sh, _props.tiles[0].w + _props.tiles[1].w, 0, _props.tiles[2].w, _props.tiles[2].h)
						.drawImage(_props.tiles[3].id, _props.tiles[3].sx, _props.tiles[3].sy, _props.tiles[3].sw, _props.tiles[3].sh, 0, _props.tiles[0].h, _props.tiles[3].w, _props.tiles[3].h)
						.fillStyle(_props.bgColor).fillRect(_props.tiles[0].w, _props.tiles[0].h, _props.tiles[4].w, _props.tiles[4].h)
						.drawImage(_props.tiles[5].id, _props.tiles[5].sx, _props.tiles[5].sy, _props.tiles[5].sw, _props.tiles[5].sh, _props.tiles[0].w + _props.tiles[1].w, _props.tiles[0].h, _props.tiles[5].w, _props.tiles[5].h)
						.drawImage(_props.tiles[6].id, _props.tiles[6].sx, _props.tiles[6].sy, _props.tiles[6].sw, _props.tiles[6].sh, 0, _props.tiles[0].h + _props.tiles[3].h, _props.tiles[6].w, _props.tiles[6].h)
						.drawImage(_props.tiles[7].id, _props.tiles[7].sx, _props.tiles[7].sy, _props.tiles[7].sw, _props.tiles[7].sh, _props.tiles[0].w, _props.tiles[0].h + _props.tiles[3].h, _props.tiles[7].w, _props.tiles[7].h)
						.drawImage(_props.tiles[8].id, _props.tiles[8].sx, _props.tiles[8].sy, _props.tiles[8].sw, _props.tiles[8].sh, _props.tiles[0].w + _props.tiles[1].w, _props.tiles[0].h + _props.tiles[3].h, _props.tiles[8].w, _props.tiles[8].h);
						var _bgImage64 = $.canvas.getContext().canvas.toDataURL();
						$.canvas.del('frameBg').pass();
						_args.dataURLs[_props.bgStyle] = 'url(' + _bgImage64 + ')';
						_bgImage64 = null;
					}
					_frame.style.background = _args.dataURLs[_props.bgStyle];
				}
				else {
					//添加子节点
					for (_a = 0; _a < _len; _a++) {
						_tile = _props.tiles[_a];
						_sonStyles = {
							width: _tile.w + 'px',
							height: _tile.h + 'px',
							backgroundColor: _tile.bgc
						};
						if (_tile.id != '')
							_sonStyles.background = 'url(' + $.getImage(_tile.id).url + ') -' + _tile.sx + 'px -' + _tile.sy + 'px';
						_frame.appendChild(this.makeDom('div', null, _sonStyles, null));
					}
				}
			}
			
//			_frame.appendChild(this.makeDom('div', null, { position: 'absolute', left: '0px', top: '0px', width: _props.tiles[0].w + 'px', height: _props.tiles[0].h + 'px', background: 'url(' + $.getImage(_props.tiles[0].id).url + ') ' + _props.tiles[0].sx + 'px ' + _props.tiles[0].sy + 'px',  }, null));
//			_frame.appendChild(this.makeDom('div', null, { position: 'absolute', left: _props.tiles[0].w + 'px', top: '0px', width: _props.tiles[1].w + 'px', height: _props.tiles[1].h + 'px', background: 'url(' + $.getImage(_props.tiles[1].id).url + ') ' + _props.tiles[1].sx + 'px ' + _props.tiles[1].sy + 'px' }, null));
//			_frame.appendChild(this.makeDom('div', null, { position: 'absolute', left: _props.tiles[0].w + _props.tiles[1].w + 'px', top: '0px', width: _props.tiles[2].w + 'px', height: _props.tiles[2].h + 'px', background: 'url(' + $.getImage(_props.tiles[2].id).url + ') ' + _props.tiles[2].sx + 'px ' + _props.tiles[2].sy + 'px' }, null));
//			_frame.appendChild(this.makeDom('div', null, { position: 'absolute', left: '0px', top: _props.tiles[0].h + 'px', width: _props.tiles[3].w + 'px', height: _props.tiles[3].h + 'px', background: 'url(' + $.getImage(_props.tiles[3].id).url + ') ' + _props.tiles[3].sx + 'px ' + _props.tiles[3].sy + 'px' }, null));
//			_frame.appendChild(this.makeDom('div', null, { position: 'absolute', left: _props.tiles[0].w + 'px', top: _props.tiles[0].h + 'px', width: _props.tiles[4].w + 'px', height: _props.tiles[4].h + 'px', backgroundColor: _props.tiles[4].bgc }, null));
//			_frame.appendChild(this.makeDom('div', null, { position: 'absolute', left: _props.tiles[0].w + _props.tiles[1].w + 'px', top: _props.tiles[0].h + 'px', width: _props.tiles[5].w + 'px', height: _props.tiles[5].h + 'px', background: 'url(' + $.getImage(_props.tiles[5].id).url + ') ' + _props.tiles[5].sx + 'px ' + _props.tiles[5].sy + 'px' }, null));
//			_frame.appendChild(this.makeDom('div', null, { position: 'absolute', left: '0px', top: _props.tiles[0].h + _props.tiles[3].h + 'px', width: _props.tiles[6].w + 'px', height: _props.tiles[6].h + 'px', background: 'url(' + $.getImage(_props.tiles[6].id).url + ') ' + _props.tiles[6].sx + 'px ' + _props.tiles[6].sy + 'px' }, null));
//			_frame.appendChild(this.makeDom('div', null, { position: 'absolute', left: _props.tiles[0].w + 'px', top: _props.tiles[0].h + _props.tiles[3].h + 'px', width: _props.tiles[7].w + 'px', height: _props.tiles[7].h + 'px', background: 'url(' + $.getImage(_props.tiles[7].id).url + ') ' + _props.tiles[7].sx + 'px ' + _props.tiles[7].sy + 'px' }, null));
//			_frame.appendChild(this.makeDom('div', null, { position: 'absolute', left: _props.tiles[0].w + _props.tiles[1].w + 'px', top: _props.tiles[0].h + _props.tiles[3].h + 'px', width: _props.tiles[8].w + 'px', height: _props.tiles[8].h + 'px', background: 'url(' + $.getImage(_props.tiles[8].id).url + ') ' + _props.tiles[8].sx + 'px ' + _props.tiles[8].sy + 'px' }, null));
			
			_sonStyles = null;
			_tile = null;
			_len = null;
			_a = null;
			_props = null;
			return _frame;
		},
		/**
		 * 添加一个dom节点
		 * @param {object} dom
		 */
		append: function(dom) {
			if (!dom)
				return this;
			var _parent;
			if (this.type == 'panel')
				_parent = this.dom.children[0];
			else
				_parent = this.dom;
			_parent.appendChild(dom);
			_parent = null;
			return this;
		},
		/**
		 * 添加一个dom到节点
		 * @param {string} domid
		 */
		appendTo: function(domid) {
			var _dom = domid == 'body' ? document.body : $.getDom(domid);
			_dom.appendChild(this.dom);
			_dom = null;
			return this;
		},
		/**
		 * 移除一个dom节点
		 * @param {object} dom
		 */
		remove: function(dom) {
			if (!dom)
				return this;
			var _parent;
			if (this.type == 'panel')
				_parent = this.dom.children[0];
			else
				_parent = this.dom;
			_parent.removeChild(dom);
			_parent = null;
			return this;
		},
		/**
		 * 控件显示
		 */
		show: function() {
			this.hided = false;
			this.hovered = false;
			if (!this.dom)
				return this;
			if (this.x < 0) {
				this.x = parseInt((this.getScreenWidth() - this.width) >> 1);
				this.dom.style.left = this.x + 'px';
			}
			if (this.y < 0) {
				this.y = parseInt((this.getScreenHeight() - this.height) >> 1);
				this.dom.style.top = this.y + 'px';
			}
			this.dom.style.display = 'block';
			if (this.blockContext) {
				this.blockContext.style.width = this.getScreenWidth() + 'px';
				this.blockContext.style.height = this.getScreenHeight() + 'px';
				this.blockContext.style.display = 'block';
			}
			return this;
		},
		/**
		 * 创建滚动条
		 */
		makeScroll: function() {
			if (this.type == 'panel') {
				if (this.scroll == 'auto' || this.scroll == 'scroll') {
					if (this.iScroller) {
						this.iScroller.destroy();
						this.iScroller = null;
					}
					this.iScroller = new iScroll(this.id, {
						useTransform: true,
                        bounce: this.bounce,
						hScrollbar: this.hScrollbar,
						vScrollbar: this.vScrollbar,
						onBeforeScrollStart: function (e) {
							var target = e.target;
							while (target.nodeType != 1) target = target.parentNode;
				
							if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
								e.preventDefault();
							target = null;
						}
					});
				}		
			}
			else if (this.type == 'window') { //窗体子对象下拉框初始化
				if (this.context) { //context容器和items对象集合不能共存
					if (this.context.type == 'panel' || this.context.type == 'tab')
						this.context.makeScroll();
				}
				else if (this.items && this.items.length > 0) {
					var _len = this.items.length, _item;
					for (var i = 0; i < _len; i++) {
						_item = this.items[i];
						_item.makeScroll();
					}
					_item = null;	
					_len = null;
				}
			}
			else if (this.type == 'tab') {
				var _getVessel = this.vessel[this.dom.selectedButton];
				if (_getVessel)
					_getVessel.makeScroll();
				if (this.panel && this.panel.type == 'panel') {				
					this.panel.makeScroll();
				}
				_getVessel = null;
			}
			return this;
		},
		/**
		 * 控件隐藏
		 */
		hide: function() {
			this.hided = true;
			if (!this.dom)
				return this;
			this.dom.style.display = 'none';
			if (this.blockContext)
				this.blockContext.style.display = 'none';
			return this;
		},
		/**
		 * 移除控件
		 */
		destroy: function() {
			if (this.dom) {
				//如果有滚动条控件的话销毁之
				if (this.type == 'panel' && this.iScroller) {
					this.iScroller.destroy();
				}
				else if (this.type == 'tab') {
					if (this.panel && this.panel.iScroller) {
						this.panel.iScroller.destroy();
					}
					for (var i = this.vessel.length - 1; i >= 0; i--) {
						if (this.vessel[i].iScroller) {
							this.vessel[i].iScroller.destroy();
						}
					}
				}
				else if (this.type == 'window') {
					if (this.context && (this.context.type == 'panel' || this.context.type == 'tab'))
						this.context.destroy();
					if (this.blockContext)
						document.body.removeChild(this.blockContext);
				}
				//通过当前dom节点的父节点移除对应的dom
				if (this.dom.parentNode)
					this.dom.parentNode.removeChild(this.dom);
				this.dom = null;
			}
			return this;
		},
        /**
         * 显示、隐藏切换
         */
        toggle: function() {
            if (this.hided)
                return this.show();
            else 
                return this.hide();
        },
		/**
		 * 使控件不可用
		 * @param {Object} dis
		 * @param {bool} notCtrlDom //为true的话disabled不会影响到dom，防止IOS上disabled的dom会自动变灰，影响美术，不过暂时只在tab标签中使用
		 */
		disable: function(dis, notCtrlDom) {
			this.disabled = dis;
			if (!this.dom)
				return this;
			if (!notCtrlDom)
				this.dom.disabled = this.disabled;
			if (this.bgUrl != '' && this.ui) {
				if (this.disabled && this.ui.dex >= 0 && this.ui.dey >= 0)
					this.dom.style.background = 'url(' + this.bgUrl + ') -' + this.ui.dex + 'px -' + this.ui.dey + 'px'; //修改禁用状态背景图
				else
					this.dom.style.background = 'url(' + this.bgUrl + ') -' + this.ui.sx + 'px -' + this.ui.sy + 'px'; //修改背景图
			}
			
			return this;
		},
		/**
		 * 设置x坐标
		 * @param {number} x
		 */
		setX: function(x) {
			this.x = x;
			if (this.dom.style.position == 'absolute')
				this.dom.style.left = this.x + 'px';
			else
				this.dom.style.marginLeft = this.x + 'px';
			return this;
		},
		/**
		 * 设置y坐标
		 * @param {number} y
		 */
		setY: function(y) {
			this.y = y;
			if (this.dom.style.position == 'absolute')
				this.dom.style.top = this.y + 'px';
			else
				this.dom.style.marginTop = this.y + 'px';
			return this;
		},
		/**
		 * 初始化对象集合接口
		 */
		initItems: function() {
			return this;
		},
		/**
		 * 往父控件内添加一个子空间
		 * @param {object} ui
		 */
		addItem: function(ui) {
			if (!this.items)
				return this;
			if (ui && ui.type) {
				this.items.push(ui);
				if (ui.dom) {
					ui.dom.that.parent = this;
					this.dom.append(ui.dom);
				}
			}
			return this;
		},
		/**
		 * 移除第n个子对象
		 * @param {number} index
		 */
		removeItem: function(index) {
			if (!this.items)
				return this;
			var _item = this.items[index];
			if (_item) {
				if (_item.dom) {
					this.remove(_item.dom);
					_item.dom = null;
				}
				this.items.splice(index, 1);
			}
			_item = null;
			return this;
		},
		/**
		 * 清空子对象
		 */
		clearItems: function() {
			if (!this.items)
				return this;
			for (var i = this.items.length - 1; i >= 0; i--) {
				if (this.items[i].dom) {
					//校正自对象坐标
					this.remove(this.items[i].dom);
					this.items[i].dom = null;
				}
			}
			this.items = [];
			return this;
		},
		/**
		 * 重置子对象
		 * @param {array} items
		 */
		setItems: function(items) {
			if (!this.items)
				return this;
			if (items && items.length > 0) {
				this.clearItems();
				this.items = items;
				this.initItems();
			}
			return this;
		},
        /**
         * 设置innerHTML
         * @param {string} html
         * @param {bool} scrollToTop
         */
        setHtml: function(html, scrollToTop) {
            if (this.type == 'panel') {
                this.dom.children[0].innerHTML = html;
                if (this.iScroller) {
                    //处理滚动条
                    this.iScroller.refresh();
                    if (scrollToTop)
                        this.iScroller.scrollTo(0, 0); //滚动条置于顶部
                }
            }
            else
                this.dom.innerHTML = html;
            return this;
        },
        /**
         * 设置CSS样式
         * @param {string} key
         * @param {string} value
         */
        style: function(key, value) {
            if (!this.dom)
                return false;
            if (value) {
                this.dom.style[key] = value;
                return this;
            }
            else if (key)
                return this.dom.style[key];
        },
        /**
         * 设置属性
         * @param {string} key
         * @param {string} value
         */
        attr: function(key, value) {
            if (!this.dom)
                return false;
            if (value) {
                this.dom[key] = value;
                return this;
            }
            else if (key)
                this.dom[key];
        },
        /**
         * 绑定事件
         * @param {string} eveName
         * @param {Function} callBack
         */
        bind: function(eveName, callBack) {
            if (!this.dom)
                return false;
            //绑定前先取消绑定
            this.unbind(eveName);
            //按钮有一个灵敏点击模式所以绑定click事件时必须特殊处理
            if (this.type == 'button' && this.fastClick && eveName == 'click') {
                this._click = callBack;
            }
            else {
                this.dom['on' + eveName] = callBack;
            }
            return this;
        },
        /**
         * 取消绑定事件
         * @param {string} eveName
         */
        unbind: function(eveName) {
            if (!this.dom)
                return false;
            //按钮有一个灵敏点击模式所以取消绑定click事件时必须特殊处理
            if (this.type == 'button' && this.fastClick && eveName == 'click') {
                this._click = null;
            }
            else {
                this.dom['on' + eveName] = null;
            }
            return this;
        },
        /**
         * 获取子对象dom集合
         */
        getChildren: function() {
            if (!this.dom)
                return null;
            if (this.type != 'panel')
                return this.dom.children;
            else
                return this.dom.children[0].children;
        }
	};
	////还原构造器
	$.ui.core.prototype.constructor = $.ui.core;
	//禁止选择
	document.onselectstart = function(e) {
		return false; 
	};
})(jsGame);
