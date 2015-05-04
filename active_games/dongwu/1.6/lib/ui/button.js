/**
 * @author Suker
 * jsGame引擎UI组件 - 按钮控件
 * 对jsGame.ui命名空间进行扩展
 * 注：不能直接对jsGame.ui赋予一个对象，只能对jsGame.ui附加属性、方法，否则将可能造成与menu.js组件不兼容
 * 版本1.6
 * LeiYoo
 */
(function($) {
	$.ui.button = function(param) {
		var _props = $.objExtend({
			id: '',
			value: '按钮',
			width: null,
			height: null,
			x: 0,
			y: 0,
			color: '#333333',
			bgColor: '',
			fontSize: '12px',
			fontWeight: 'normal',
			position: '',
			appendTo: '',
			hided: false,
			disabled: false,
            fastClick: true, //灵敏点击模式 true为开启，false为关闭 - 对pc无效
			textShadow: '',
			ui: { id: '', sx: 0, sy: 0, hx: 0, hy: 0, dex: 0, dey: 0, w: 50, h: 26 },
			click: function(e) { }, //点击后执行的逻辑[非事件回调]
			data: null
		}, param || {});
		$.ui.core.call(this, _props.id, _props.x, _props.y, _props.width, _props.height, _props.hided);
		this.disabled = _props.disabled;
        this.fastClick = _props.fastClick;
		this.ui = _props.ui;
		this.bgUrl = '';
		this.type = 'button';
        this._click = _props.click;
		this.data = _props.data;
		
		//判断UI资源图是否存在
		if (this.ui.id != '') {
			var _bgImage = $.getImage(this.ui.id);
			if (_bgImage)
				this.bgUrl = _bgImage.url;
			_bgImage = null;
		}
		var _cssStyle = { width: this.width + 'px', height: this.height + 'px', fontSize: _props.fontSize, fontWeight: _props.fontWeight, textShadow: _props.textShadow, display: this.hided ? 'none' : 'block' }, 
		_events = {};
        if (!this.fastClick)
            _events = { click: this._click };
		if (_props.position == 'absolute') {
			_cssStyle.position = 'absolute';
			_cssStyle.left = this.x + 'px';
			_cssStyle.top = this.y + 'px';
		}
		else {
			_cssStyle.marginLeft = this.x + 'px';
			_cssStyle.marginTop = this.y + 'px';
		}
		if (_props.bgColor != '')
			_cssStyle.backgroundColor = _props.bgColor;
		_cssStyle.color = _props.color;
		if (this.bgUrl != '') {
			if (!this.disabled)
				_cssStyle.background = 'url(' + this.bgUrl + ') -' + this.ui.sx + 'px -' + this.ui.sy + 'px'; //背景图
			else if (this.ui && this.ui.dex >= 0 && this.ui.dey >= 0)
				_cssStyle.background = 'url(' + this.bgUrl + ') -' + this.ui.dex + 'px -' + this.ui.dey + 'px'; //禁用状态背景图
			_cssStyle.border = '0px';
		}
		//PC上的默认事件绑定
		if (uiCoreArgs.deviceType == uiCoreArgs.enums.deviceType.pc) {
			_events.mouseover = function(e) {
				if (!e.target.that.disabled && e.target.that.bgUrl != '')
					e.target.style.background = 'url(' + e.target.that.bgUrl + ') -' + e.target.that.ui.hx + 'px -' + e.target.that.ui.hy + 'px'; //修改为高亮背景图
			};
			_events.mouseout = function(e) {
				if (!e.target.that.disabled && e.target.that.bgUrl != '')
					e.target.style.background = 'url(' + e.target.that.bgUrl + ') -' + e.target.that.ui.sx + 'px -' + e.target.that.ui.sy + 'px'; //修改背景图
			};
            if (this.fastClick)
    			_events.mouseup = function(e) {
                    var _that = e.target.that;
                    if (_that) {
                        if (!_that.disabled && _that.fastClick && _that._click != null)
        				    _that._click(e);
                    }
                    _that = null;
    			};
		}
		else if (uiCoreArgs.deviceType == uiCoreArgs.enums.deviceType.touch) {
			_events.touchstart = function(e) {
                var _that = e.target.that;
                if (_that) {
                    if (!_that.disabled && _that.bgUrl != '') 
                        e.target.style.background = 'url(' + _that.bgUrl + ') -' + _that.ui.hx + 'px -' + _that.ui.hy + 'px'; //修改为高亮背景图
                    if (_that.fastClick) //防止和按钮重叠的位子有别的控件也绑定了click事件造成事件触发冲突
                        e.preventDefault();
                }
                _that = null;
			};
			_events.touchend = function(e) {
                var _that = e.target.that;
                if (_that) {
                    if (!_that.disabled && _that.fastClick && _that._click != null)
    				    _that._click(e);
    				if (!_that.disabled && _that.bgUrl != '')
    					e.target.style.background = 'url(' + _that.bgUrl + ') -' + _that.ui.sx + 'px -' + _that.ui.sy + 'px'; //修改背景图
                }
                _that = null;
			};
		}
		this.dom = this.makeDom('input', { id: this.id, type: 'button', value: _props.value, disabled: this.disabled }, 
		_cssStyle, _events);
		
		this.dom.that = this;
		if (_props.appendTo != '')
			this.appendTo(_props.appendTo); //如果指定父节点则直接添加
		_events = null;
		_cssStyle = null;
		_props = null;
	};
	$.extend($.ui.button, $.ui.core);
	/**
	 * 点击按钮
	 * @param {event} e
	 */
	$.ui.button.prototype.click = function(e) {
		if (!this.dom)
			return false;
		var _e = e ? e : { target: this.dom };
        if (!this.disabled && this._click != null)
		    this._click(_e);
		_e = null;
		return this;
	};
})(jsGame);
