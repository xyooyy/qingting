/**
 * Created by Administrator on 2015/1/5.
 */

/**
 * 背景移动
 */
function bg_position(options) {
    //console.log(options);

    this.opt = options;
    this.obj = this.opt["target"].get(0);
    this.isMove = this.opt["isMove"] || true;

    this.points = {x: 0, y: 0};
    this.helper = this.opt["helper"] || $(this.obj);
    this.size = {
        width: parseInt($(this.obj).css('background-size').split(' ')[0]),
        height: parseInt($(this.obj).css('background-size').split(' ')[1])
    };
    //console.log(bp0.css('background-size'));
    this.islimit = this.opt["islimit"] || false;
    this.limits = this.opt["limits"] || {
        top: 0,
        right: -(this.size.width - $(this.obj).width()),
        bottom: -(this.size.height - $(this.obj).height()),
        left: 0
    };////是否限制移动,如上分别代表上和左不能小于0,下左分别不能大于其高度和宽度，不给对应值则表示不限制

    this.data = {

        startX: 0,

        startY: 0,

        currentX: 0,

        currentY: 0,

        locked: false //是否设值完成, 用于完美控制不同浏览器事件解析差异

    };

    this.init();

}

bg_position.prototype.updateConfig = function () {
    this.size = {
        width: parseInt($(this.obj).css('background-size').split(' ')[0]),
        height: parseInt($(this.obj).css('background-size').split(' ')[1])
    };
    this.limits = this.opt["limits"] || {
        top: 0,
        right: -(this.size.width - $(this.obj).width()),
        bottom: -(this.size.height - $(this.obj).height()),
        left: 0
    };////是否限制移动,如上分别代表上和左不能小于0,下左分别不能大于其高度和宽度，不给对应值则表示不限制

};

/**
 * 背景拖动功能初始化
 */
bg_position.prototype.init = function () {


    var helper = this.helper;
    var bp0 = $(this.obj);
    var bp = this.obj;
    var $this = this;


    this.helper.on("mousedown", function (e) {
        if ($this.isMove && bp !== e.target && !$.contains(bp, e.target)) {

            $this.data.startX = e.pageX - $this.data.currentX;

            $this.data.startY = e.pageY - $this.data.currentY;

            $this.data.locked = true;

            $(document).on("mousemove", function (e) {
                if ($this.data.locked != true) {
                    return false;
                }

                $this.data.currentX = (e.pageX - $this.data.startX);

                $this.data.currentY = (e.pageY - $this.data.startY);


                bp0.css({
                    'transition': 'background-position 0ms',
                    '-moz-transition': 'background-position 0ms', /* Firefox 4 */
                    '-webkit-transition': 'background-position 0ms', /* Safari 和 Chrome */
                    '-o-transition': 'background-position 0ms', /* Opera */
                    'background-repeat': 'no-repeat',
                    'background-position': $this.data.currentX + 'px ' + $this.data.currentY + 'px',
                    '-moz-background-position': $this.data.currentX + 'px ' + $this.data.currentY + 'px',
                    '-webkit-background-position': $this.data.currentX + 'px ' + $this.data.currentY + 'px',
                    '-o-background-position': $this.data.currentX + 'px ' + $this.data.currentY + 'px',
                    '-ms-background-position-x': $this.data.currentX,
                    '-ms-background-position-y': $this.data.currentY
                });

            });
            $(document).on("mouseup", function (ev) {
                $(document).unbind('mousemove');
                $(document).unbind('mouseup');
                if ($this.data.locked != true) {
                    return false;
                }
                if ($this.islimit) {
                    if ($this.limits.left != undefined) {
                        if ($this.data.currentX > $this.limits.left) {
                            $this.data.currentX = $this.limits.left;
                        }
                    }
                    if ($this.limits.right != undefined) {
                        if ($this.data.currentX < $this.limits.right) {
                            $this.data.currentX = $this.limits.right;
                        }
                    }
                    if ($this.limits.top != undefined) {
                        if ($this.data.currentY > $this.limits.top) {
                            $this.data.currentY = $this.limits.top;
                        }
                    }
                    if ($this.limits.bottom != undefined) {
                        if ($this.data.currentY < $this.limits.bottom) {
                            $this.data.currentY = $this.limits.bottom
                        }
                    }
                    bp0.css({
                        'transition': 'background-position 500ms',
                        '-moz-transition': 'background-position 500ms', /* Firefox 4 */
                        '-webkit-transition': 'background-position 500ms', /* Safari 和 Chrome */
                        '-o-transition': 'background-position 500ms', /* Opera */
                        'background-position': $this.data.currentX + 'px ' + $this.data.currentY + 'px',
                        '-moz-background-position': $this.data.currentX + 'px ' + $this.data.currentY + 'px',
                        '-webkit-background-position': $this.data.currentX + 'px ' + $this.data.currentY + 'px',
                        '-o-background-position': $this.data.currentX + 'px ' + $this.data.currentY + 'px',
                        '-ms-background-position-x': $this.data.currentX,
                        '-ms-background-position-y': $this.data.currentY
                    });
                }
            });
        }
    });


};
/**
 * 禁用背景拖动功能
 */
bg_position.prototype.disable = function () {
    this.isMove = false;
    this.data.locked = false;
};
/**
 * 启用背景拖动功能
 */
bg_position.prototype.enable = function () {
    this.isMove = true;
    this.data.locked = true;
};
