/**
 * @author Suker
 * jsGame引擎UI组件 - 标签页容器控件
 * 面板主要处理多个便签页同屏切换功能
 * 对jsGame.ui命名空间进行扩展
 * 注：不能直接对jsGame.ui赋予一个对象，只能对jsGame.ui附加属性、方法
 * 版本1.6
 * LeiYoo
 */
(function($) {
	$.ui.tab = function(param) {
		var _props = $.objExtend({
			id: '',
			width: 300,
			height: 200,
			x: -1,
			y: -1,
			padding: 5,
			panel: null,
			vessel: [],
			changed: function(tab, index, target) { },
			selectedButton: 0,
			appendTo: '',
			position: '',
			border: 0,
			hided: false,
			create: true,
			menuCoverPanel: false, //为true的话菜单条会在最外层显示
			data: null
		}, param || {});
		
		$.ui.core.call(this, _props.id, _props.x, _props.y, _props.width, _props.height, _props.hided);
		this.padding = _props.padding;
		this.border = _props.border;
		this.panel = _props.panel;
		this.menuCoverPanel = _props.menuCoverPanel;
		this.data = _props.data;
		if (this.panel)
			this.panel.parent = this;
		this.type = 'tab';
		this.vessel = _props.vessel; //标签页的容器集合
		this.changed = _props.changed; //绑定更新标签事件
		var _cssStyle = { width: this.width + 'px', height: this.height + 'px', padding: this.padding + 'px', border: this.border + 'px solid #CCCCCC', display: this.hided ? 'none' : 'block' };
		if (_props.position == 'absolute') {
			_cssStyle.position = 'absolute';
			_cssStyle.left = this.x + 'px';
			_cssStyle.top = this.y + 'px';
		}
		else {
			_cssStyle.marginLeft = this.x + 'px';
			_cssStyle.marginTop = this.y + 'px';
		}
		this.dom = this.makeDom('div', { id: this.id }, _cssStyle, null);
		this.dom.that = this;
		this.dom.selectedButton = _props.selectedButton;
		
		if (_props.appendTo != '') {
			this.appendTo(_props.appendTo); //如果指定父节点则直接添加
			if (_props.create) 
				this.initItems();
			this.makeScroll();
		}
		
		_props = null;
	};
	$.extend($.ui.tab, $.ui.core);
	/**
	 * 初始化
	 */
	$.ui.tab.prototype.initItems = function() {
		var _panelDom = this.panel.dom, _item, _vessel, _len;
//		_panelDom.style.marginLeft = '0px';
//		_panelDom.style.marginTop = '0px';
//		_panelDom.style.border = '0px solid #CCCCCC';
//		_panelDom.style.padding = '0px';
//		_panelDom.style.width = (this.width - this.panel.padding * 2 - this.panel.border * 2) + 'px';
		this.panel.initItems();
		//设置tab事件
		_len = this.panel.items.length;
		for (var _t = 0; _t < _len; _t++) {
			_item = this.panel.items[_t];
			_item.dom.indexid = _t;
			
			_item.dom.disabled = false;
			if (_t == this.dom.selectedButton) {
				_item.disable(true, true);
			}
			_item.dom.onmouseup = null;
			_item.dom.onmouseup = function(e) {
				if (e.target.that.disabled)
					return false;
				var _parent = e.target.parentNode, _tab = _parent.parentNode.that.parent, _tabDom = _tab.dom,  _selectedButton = _tabDom.selectedButton,
				_beforeTab = _tabDom.children[0].children[0].children[_selectedButton].that,
                _beforeVessel, 
				_afterTab = _tabDom.children[0].children[0].children[e.target.indexid].that,
                _afterVessel;
				if (e.target.indexid <= _parent.children.length - 1 && e.target.indexid != _selectedButton) {
					//处理显示样式
					_beforeTab.disable(false, true);
                    _beforeVessel = _tabDom.children[_selectedButton + 1];
                    if (_beforeVessel)
					    _beforeVessel.style.display = 'none';
					//处理灰暗样式
					_afterTab.disable(true, true);
                    _afterVessel = _tabDom.children[e.target.indexid + 1];
                    if (_afterVessel)
					    _afterVessel.style.display = 'block';
					_tabDom.selectedButton = e.target.indexid;
					
					var _getVessel = _tab.vessel[_tabDom.selectedButton];
					if (_getVessel && _getVessel.type == 'panel') {//惰性初始化滚动条
						if (!_getVessel.iScroller)
							_getVessel.makeScroll();
					}
					//执行切换标签事件
					_tab.changed(_tab, _tabDom.selectedButton, _getVessel);
					_getVessel = null;
				}
				_afterTab = _beforeVessel = _afterVessel = _beforeTab = _selectedButton = _tabDom = _tab = _parent = null;
			};
			_item.dom.ontouchend = null;
			_item.dom.ontouchend = _item.dom.onmouseup;
		}
		if (this.menuCoverPanel)
			_panelDom.style.zIndex = 1000;
		this.append(_panelDom);
		_len = this.vessel.length;
		for (var _v = 0; _v < _len; _v++) {
			_vessel = this.vessel[_v];
			_vessel.dom.style.display = _v == this.dom.selectedButton ? 'block' : 'none';
//			_vessel.dom.style.width = (this.width - this.panel.padding * 2 - this.panel.border * 2) + 'px';
			_vessel.initItems();
			this.append(_vessel.dom);
		}
		_len = null;
		_vessel = null;
		_item = null;
		_panelDom = null;
		return this;
	};
	/**
	 * 标签切换
	 * @param {number} index
	 */
	$.ui.tab.prototype.change = function(index) {
		if (this.panel && this.panel.type == 'panel') {
			var _itemsLen = this.panel.items.length, _btn;
            if (index < 0)
                index = 0;
            else if (index >= _itemsLen)
                index = _itemsLen - 1;
            _btn = this.panel.items[index];
            if (!_btn.disabled && _btn.dom) {
                if (_btn.dom.onmouseup)
                    _btn.dom.onmouseup({ target: _btn.dom });
                else if (_btn.dom.ontouchend)
                    _btn.dom.ontouchend({ target: _btn.dom });
            }
            else
                this.changed(this, index, this.vessel[index]);
			_itemsLen = _btn = null;
		}
		return this;
	};
})(jsGame);
