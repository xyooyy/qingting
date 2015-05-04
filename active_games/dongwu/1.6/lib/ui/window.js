/**
 * @author Suker
 * jsGame引擎UI组件 - 窗体控件
 * 与$.ui.button控件耦合
 * 该控件的使用需要有严格的图片布局规则，否则将显示异常
 * 对jsGame.ui命名空间进行扩展
 * 注：不能直接对jsGame.ui赋予一个对象，只能对jsGame.ui附加属性、方法
 * 版本1.6
 * LeiYoo
 */
(function($) {
	$.ui.window = function(param) {
		var _props = $.objExtend({
			id: '',
			width: 400,
			height: 400,
			context: null,
			fontSize: '14px',
			color: '#333333',
			title: '窗体',
			x: -1,
			y: -1,
			items: [],
			hided: false,
			destroyed: true,
            showTool: true, //是否显示关闭按钮
			padding: 20,
			bgColor: '#F9ECC2',
			bgStyle: 'frameStyle',
			block: false,
			blockColor: 'rgba(0, 0, 0, 0.2)',
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
			], //背景拼图
			background: '',
			closeBtnUi: { id: 'btns1bg', sx: 0, sy: 0, hx: 20, hy: 0, w: 20, h: 20, dx: 0, dy: 0 }, //关闭按钮视图对象
			closed: function(target) { }, //关闭回调函数
			data: null
		}, param || {});
		this.id = _props.id;
		this.width = _props.width;
		this.height = _props.height;
		this.x = _props.x;
		this.y = _props.y;
		this.items = _props.items;
		this.hided = _props.hided;
		this.destroyed = _props.destroyed;
		this.padding = _props.padding;
		this.bgColor = _props.bgColor;
		this.bgStyle = _props.bgStyle;
		this.block = _props.block;
		this.blockColor = _props.blockColor;
		this.blockContext = null;
		this.data = _props.data;
		if (this.block) {
			this.blockContext = document.createElement('div');
			this.blockContext.style.position = 'absolute';
			this.blockContext.style.left = '0px';
			this.blockContext.style.top = '0px';
			this.blockContext.style.backgroundColor = this.blockColor;
		}
		this.tiles = _props.tiles;
		this.closeBtnUi = _props.closeBtnUi;
		this.closed = _props.closed;
		this.context = _props.context;
		
		this.type = 'window';
		//背景框架
		this.dom = this.makeFrame({ width: this.width, height: this.height, x: this.x, y: this.y, bgColor: this.bgColor, bgStyle: this.bgStyle, tiles: this.tiles, background: _props.background, hided: true });

		this.dom.that = this;
		//设置窗体顶部
		var _closeBtnX = this.closeBtnUi.x ? this.closeBtnUi.x : this.width - this.closeBtnUi.w - this.padding, 
		_closeBtnY = this.closeBtnUi.y ? this.closeBtnUi.y : this.padding;
		//关闭按钮
		this.closeBtn = new $.ui.button({ position: 'absolute', x: _closeBtnX + this.closeBtnUi.dx, y: _closeBtnY + this.closeBtnUi.dy, width: this.closeBtnUi.w, height: this.closeBtnUi.h, value: '', fontSize: '0px', ui: this.closeBtnUi, click: function(e) {
			if (e.target.that.parent.destroyed) 
				e.target.that.parent.destroy();
			else
				e.target.that.parent.hide();
			e.target.parentNode.that.closed(e.target.parentNode.that);
		} });
		this.closeBtn.parent = this;
		_closeBtnY = null;
		_closeBtnX = null;
        if (!_props.showTool) {
            this.closeBtn.hide();
        }
		//添加模态遮罩
		if (this.blockContext) {
			this.blockContext.style.display = this.hided ? 'none' : 'block';
			document.body.appendChild(this.blockContext);
		}
		//添加容器context
		if (this.context && this.context.dom) {
			this.context.parent = this;
			this.context.dom.style.position = 'absolute';
			this.context.dom.style.left = this.padding + 'px';
			this.context.dom.style.top = this.closeBtn.height + this.padding + 'px';
			this.context.dom.style.width = this.width - (this.padding * 2) - parseInt(this.context.dom.style.padding) * 2 + 'px';
			this.context.dom.style.height = this.height - (this.padding * 2) - parseInt(this.context.dom.style.padding) * 2 - this.closeBtn.height + 'px';
			this.context.dom.style.margin = '0px';
			this.context.initItems();
			this.dom.appendChild(this.context.dom);
		}
		else
			this.initItems();//context和items不能共存
		//title值
		this.dom.appendChild(this.makeDom('div', { innerHTML: _props.title }, { position: 'absolute', left: this.padding + 'px', top: this.padding + 'px', textAlign: 'left', width: parseInt(this.width - this.padding * 2) + 'px', fontSize: _props.fontSize, fontWeight: 'bold', color: _props.color }, null));
		//添加关闭按钮
		this.dom.appendChild(this.closeBtn.dom);
		this.appendTo('body');
		if (!this.hided)
			this.show().makeScroll();
		_props = null;
	};
	$.extend($.ui.window, $.ui.core);
	$.ui.window.prototype.initItems = function() {
		if (!this.items || this.items.length == 0)
			return this;
		var _len = this.items.length, _item;
		for (var i = 0; i < _len; i++) {
			_item = this.items[i];
			_item.parent = this;
			//窗体不是panel，不存在嵌套使用滚动条的问题，所有可以初始化item
			_item.initItems();
			if (_item.dom) {
				this.append(_item.dom);
			}
		}
		_item = null;
		_len = null;
		return this;
	};
})(jsGame);
