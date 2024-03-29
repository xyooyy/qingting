jsGame.ui.button = function (b) {
    return function (a) {
        a = b.objExtend({id: "", width: 80, height: 38, x: 0, y: 0, hided: false, disabled: false, hovered: false, touched: false, ui: {id: "", sx: 0, sy: 0, fid: "", fsx: 0, fsy: 0}, zindex: 0, shape: "rect", data: null, click: function () {
        }, drag: null, create: true, zoom: 1, value: "\u6309\u94ae", font: "16px \u5fae\u8f6f\u96c5\u9ed1", color: "#FFFFFF", strokeColor: "#000000", dx: 0, dy: 0}, a || {});
        this.id = a.id;
        this.width = a.width;
        this.height = a.height;
        this._ix = a.x;
        this._iy = a.y;
        this.x = this._ix;
        this.y = this._iy;
        this.hided =
            a.hided;
        this.disabled = a.disabled;
        this.hovered = a.hovered;
        this.touched = a.touched;
        this.zindex = a.zindex;
        this.shape = a.shape;
        this.type = "button";
        this.data = a.data;
        this.click = a.click;
        this._clickAtOnce = false;
        this.drag = a.drag;
        this.zoom = a.zoom;
        this.value = a.value;
        this.font = a.font;
        this.color = a.color;
        this.strokeColor = a.strokeColor;
        this.dx = a.dx;
        this.dy = a.dy;
        this.rendered = true;
        this.clicked = false;
        if (!b.getImage(a.ui.id))a.ui = {id: "", sx: 0, sy: 0};
        this.ui = a.ui;
        this.show = function () {
            b.ui.core.show(this)
        };
        this.hide = function () {
            b.ui.core.hide(this)
        };
        this.hover = function () {
            b.ui.core.hover(this)
        };
        this.touch = function () {
            b.ui.core.touch(this)
        };
        this.disable = function () {
            b.ui.core.disable(this)
        };
        this.disposed = function () {
            b.ui.core.disposed(this)
        };
        this.render = function () {
            b.ui.core.render(this)
        };
        this.__render__ = function (f) {
            a:{
                var c, e, d = b.ui.context;
                switch (f) {
                    case uiCoreArgs.enums.renderType.show:
                        c = this.ui.sx;
                        e = this.ui.fsx;
                        break;
                    case uiCoreArgs.enums.renderType.hide:
                        break a;
                    case uiCoreArgs.enums.renderType.hover:
                        c = this.ui.sx + this.width;
                        e = this.ui.fsx + this.width;
                        break;
                    case uiCoreArgs.enums.renderType.disable:
                        c = this.ui.sx + 2 * this.width;
                        e = this.ui.fsx + 2 * this.width;
                        break;
                    case uiCoreArgs.enums.renderType.touch:
                        c = this.ui.sx + this.width;
                        e = this.ui.fsx + this.width
                }
                if (this.ui.id != "") {
                    d.drawImage(b.getImage(this.ui.id), c, this.ui.sy, this.width, this.height, this.x, this.y, this.width, this.height);
                    this.ui.fid && d.drawImage(b.getImage(this.ui.fid), e, this.ui.fsy, this.width, this.height, this.x, this.y, this.width, this.height)
                }
                if (this.value != "") {
                    b.canvas.getContext().font = this.font;
                    c = b.canvas.measureText(this.value);
                    f = parseInt(this.width - c.width >> 1);
                    c = parseInt((this.height - c.height >> 1) + c.height * 0.8);
                    d.font = this.font;
                    d.fillStyle = this.strokeColor;
                    d.fillText(this.value, this.x + f + 1, this.y + c + 1);
                    d.fillStyle = this.color;
                    d.fillText(this.value, this.x + f, this.y + c)
                }
            }
        };
        this.__disposed__ = function () {
        };
        if (a.create) {
            b.events.addChild(this);
            this.render()
        }
        a = null
    }
}(jsGame);
