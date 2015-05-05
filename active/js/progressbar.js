/**
 * 自定义进度条
 * @param option
 * @param callback
 */
function progressbar(option, callback) {
    this.callback = callback;

    this.width = option && option['width'] ? option['width'] : 100;
    this.height = option && option['height'] ? option['height'] : 6;
    this.val = option && option['val'] != undefined ? option['val'] : 100;
    this.color = option && option['color'] ? option['color'] : 'rgb(64,195,181)';
    this.css = option && option['css'] ? option['css'] : 'border-radius';
    this.target = option && option['target'] ? option['target'] : $('');
    this.max = option && option['max'] ? option['max'] : '100';
    this.min = option && option['min'] ? option['min'] : '0';
    this.ispre = (option && option['ispre']!=undefined) ? option['ispre'] : false;//是否强制使用百分比
    this.isval = (option && option['isval']!=undefined) ? option['isval'] : false;//是否强制使用百分比
    this.r = this.target.width()/this.target.height();
    this.half = (option && option['isHalf']!=undefined) ? option['isHalf'] : false;//是否在到达最大值的一半时改变方向


    if(this.ispre){
        this.val = this.val/100;
    }else{
        if (isNaN(Number(this.val))) {
            this.val = parseFloat(this.val);
            if (isNaN(this.val)) {
                this.val = 0;
            }
        } else {
            if (this.val > this.max) {
                this.val = 100;
            } else if (this.val > 100 && this.val < this.max) {
                this.val = (this.val / this.max) * 100;
            } else if (this.val > 1 && this.val < 100) {
                this.val = this.val;
            } else if (this.val > 0 && this.val < 1) {
                this.val = this.val * 100;
            } else if (this.val == 1) {
                this.val = 100;
            } else if (this.val < 0) {
                this.val = 0;
            }
        }
    }
    console.log(this.val);

    this.init();
    this.sc = option && option['sc'] ? option['sc'] : 1;//步长

}

/**
 * 更新进度条数据
 * @param data
 */
progressbar.prototype.update = function (data) {

    var newprogress = parseInt(data);

    newprogress = newprogress > 0 ? newprogress : 0;
    newprogress = newprogress < 100 ? newprogress : 100;
    this.val = newprogress;
    this.progress.css({'width': newprogress + '%'});


}

/**
 * 初始化进度条
 */
progressbar.prototype.init = function () {

    var pb = this;


    pb.bar = $('<div class="toolbar" style="border-radius:' + pb.height + 'px; background-color:#c5c5c5;display:inline-block;margin-top:7px;margin-left:0px;width:' + pb.width + 'px;height:' + pb.height + 'px;"></div>');

    var v = this.ispre?pb.val*100:pb.val;
    pb.val = v;

    pb.progress = $('<div class="toolprogress" style="cursor:pointer;border-radius:5px;top;0;left:-1px;height:100%;width:' + v + '%;"></div>');


    pb.point = $('<div  style="cursor:pointer;box-shadow: 0px 1px 4px #a0a0a0;float:right;box-shadow: 0px 1px 2px #a0a0a0;background:-webkit-gradient(linear, 0% 0%, 0% 80%, from(#FFFFFF), to(#F0F0F0));background:-moz-linear-gradient(top, #FFFFFF, #F0F0F0);background:-o-linear-gradient(top, #FFFFFF, #F0F0F0);background:-ms-linear-gradient(top, #FFFFFF, #F0F0F0); background:-webkit-gradient(linear, 0% 0%, 0% 80%,from(#FFFFFF), to(#F0F0F0)); border-radius:16px;height:' + (pb.height + 10) + 'px;margin-right:-12px;margin-top:-7px;width:' + (pb.height + 10) + 'px;top:50%;"></div>');


    pb.bar.append(pb.progress);
    pb.progress.append(pb.point);


    this.bar.each(function () {

        pb.hammer = this.hammer = new Hammer(this);

        var fullwidth = parseInt(pb.bar.css('width'));
        pb.hammer
            .on('panstart', function (ev) {

            }).on('pan', function (ev) {
                var newprogress = pb.val + 100 * (ev.deltaX / fullwidth) / pb.sc;

                newprogress = newprogress > 0 ? newprogress : 0;
                newprogress = newprogress < 100 ? newprogress : 100;
                pb.progress.css({'width': newprogress + '%'});

                pb.setStyle(newprogress);

                if (pb.callback) {
                    pb.callback.call(this, newprogress, (((newprogress / 100) * pb.max) / pb.max) * pb.max);
                }

            }).on('panend', function (ev) {
                pb.val = pb.val + 100 * ev.deltaX / fullwidth / pb.sc;
            })

    });


}

/**
 * 根据进度条数据设置样式
 * @param newprogress
 */
progressbar.prototype.setStyle = function (newprogress) {
    var pb = this;
    if (pb.css == "border-radius") {//圆角
        pb.target.css({
            'border-radius': newprogress + '%',
            '-moz-border-radius': newprogress + '%',
            '-webkit-border-radius': newprogress + '%',
            '-o-border-radius': newprogress + '%'
        });
        pb.target.attr('radius-val', newprogress);
    } else if (pb.css == "opacity") {//透明度
        pb.target.css('opacity', newprogress / 100);
        pb.target.attr('opacity-val', newprogress);
    } else if (pb.css == "box-shadow") {//阴影
        if (newprogress == 0) {
            pb.target.get(0).style.boxShadow = 'none';
            pb.target.get(0).style.mozBoxShadow = 'none';
            pb.target.get(0).style.webkitBoxShadow = 'none';
            pb.target.get(0).style.oBoxShadow = 'none';
        } else {
            var val;
            if(pb.isval){
                val = newprogress;
            }else{
                val = pb.max * (newprogress / 100);
            }
            pb.target.css({
                'box-shadow': '#000 1px 1px ' + val + 'px',
                '-moz-box-shadow': '#000 1px 1px ' + val + 'px',
                '-webkit-box-shadow': '#000 1px 1px ' + val + 'px',
                '-o-box-shadow': '#000 1px 1px ' + val + 'px'
            });
        }
        pb.target.attr('shadow-val', val);
    } else if (pb.css == "rotation") {//旋转
        var pro = newprogress / 100;
        console.log(pro);
        /**
         * -webkit-transform:rotate(10deg);
         -moz-transform:rotate(10deg);
         transform:rotate(10deg);
         */
        pb.target.css({
            'transform': 'rotate(' + 360 * pro + 'deg)',
            '-webkit-transform': 'rotate(' + 360 * pro + 'deg)',
            '-moz-transform': 'rotate(' + 360 * pro + 'deg)',
            '-o-transform': 'rotate(' + 360 * pro + 'deg)'
        });
        pb.target.attr('rotation-val', pro);
    } else if (pb.css == "delay") {//延迟
        var pro = ((newprogress / 100) * pb.max) / pb.max;
        var delay = Math.round(pro * pb.max);
        //console.log(delay);
        pb.target.css({
            'transition-delay': delay + 'ms',
            '-webkit-transition-delay': delay + 'ms',
            '-moz-transition-delay': delay + 'ms',
            '-o-transition-delay': delay + 'ms'
        });

        pb.target.attr('delay-val', delay);
    } else if (pb.css == "duration") {//动画持续时间
        var pro = newprogress / 100;
        var duration = Math.round(pro * pb.max);
        console.log(delay);
        pb.target.css({
            'transition-duration': duration + 'ms',
            '-webkit-transition-duration': duration + 'ms',
            '-moz-transition-duration': duration + 'ms',
            '-o-transition-duration': duration + 'ms'
        });
        pb.target.attr('duration-val', duration);
    } else if (pb.css == "blur") {//模糊程度    注：图片模糊不兼容火狐浏览器
        var pro = ((newprogress / 100) * pb.max) / pb.max;
        var blur = Math.round(pro * pb.max);

        function set() {
            pb.target.css({
                '-webkit-filter': 'blur(' + blur + 'px)',
                '-moz-filter': 'blur(' + blur + 'px) grayscale(1)',
                '-o-filter': 'blur(' + blur + 'px)',
                '-ms-filter': 'blur(' + blur + 'px)',
                'filter': 'blur(' + blur + 'px)',
                //'filter': 'url(blur.svg#blur)', /* FireFox, Chrome, Opera */
                'filter': 'progid:DXImageTransform.Microsoft.Blur(PixelRadius=10, MakeShadow=false)' /* IE6~IE9 */
            });
        }

        set();
        pb.target.attr('blur-val', newprogress);
    } else if (pb.css == "background-size") {
        var pro = ((newprogress / 100) * pb.max) / pb.max;
        var size = Math.round(pro * pb.max);

        if(pb.isOnce==undefined){
            this.w = parseInt(this.target.css('background-size').split(' ')[0]);
            this.h = parseInt(this.target.css('background-size').split(' ')[1]);
            pb.isOnce = false;
        }

        if(size<=10){
            size=10;
        }
        var size2 = (pb.h*size)/pb.w;
        console.log("宽度:" + size + "  高度:" + size2);
        pb.target.css({
            'background-size': size + 'px '+size2+'px',
            '-webkit-background-size': size + 'px '+size2+'px',
            '-moz-background-size': size + 'px '+size2+'px',
            '-o-background-size': size + 'px '+size2+'px',
            'background-repeat': 'no-repeat',
            '-webkit-background-repeat': 'no-repeat',
            '-moz-background-repeat': 'no-repeat',
            '-o-background-repeat': 'no-repeat'
        });
        pb.target.attr('bgSize-val', pro*100);
    } else if (pb.css == "size") {

        pb.target.css({
            "-webkit-transform":"scale(" + newprogress + ")",
            "-moz-transform":"scale(" + newprogress + ")",
            "-o-transform":"scale(" + newprogress + ")",
            "transform":"scale(" + newprogress + ")"
        });

        pb.target.attr('size-val', newprogress);
    } else {

        var pro = ((newprogress / 100) * pb.max) / pb.max;
        var size = pb.max * pro;
        if(pb.half){

            if(newprogress>pb.max/2){
                size = -Math.abs(size);
            }else if(newprogress<pb.max/2){
                size = Math.abs(size);
            }
        }

        pb.target.css(pb.css, size + 'px');
        pb.target.attr('val', newprogress);
    }
}

/**
 * 获取进度条组件
 * @returns {*|jQuery|HTMLElement|progressbar.bar}
 */
progressbar.prototype.getbody = function () {
    return this.bar;
}

/**
 * 移除进度条
 */
progressbar.prototype.destroy = function () {
    this.bar.remove();
    this.hammer.remove();

}


