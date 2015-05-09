/**
 步进选择器
 **/


function steper(option, callback) {

    this.option = option;
    this.width = (option && option['width']) ? option['width'] : 60;
    this.height = (option && option['height']) ? option['height'] : 30;
    this.max = (option && option['max']) ? option['max'] : 100.0;
    this.css = option && option['css'] ? option['css'] : 'border-radius';
    this.target = option && option['target'] ? option['target'] : $('');
    this.min = (option && option['min'] != undefined) ? option['min'] : 0.0;
    this.unit = (option && option['unit']) ? option['unit'] : '';//单位
    this.step = (option && option['step']) ? option['step'] : 1.0;
    this.val = option && parseFloat((option['default']) ? option['default'] : 0.0);
    this.isval = (option && option['isval'] != undefined) ? option['isval'] : false;//强制设值
    this.ispre = (option && option['ispre'] != undefined) ? option['ispre'] : false;//强制百分比
    this.init();
    this.callback = callback;

    this.fix = (option && option['fix']) ? option['fix'] : 0;//小数点后几位小数，默认0位



}


steper.prototype.update = function (data) {

    if (this.css == "opacity" && this.max == 1) {
        if (data > 1) {
            data /= 100;
        }
    }

    this.val = parseFloat(data);
    var temp = this.val.toFixed(this.fix);

    this.input.val(temp + this.unit);

}


steper.prototype.init = function () {
    this.body = $('<div style="margin-left:35px;display:inline-block;height:' + this.height + 'px"></div>');


    this.input = $('<input style="width:60px;height:30px;text-align:center;border:solid 1px #dad8d7;padding:0 2px; height:30px;width:60px" value="' + this.val + this.unit + '"></input>');

    this.btnarea = $('<div style="float:right;width:25px;height:' + this.height + 'px"></div>');
    this.upbtn = $('<div class="noselect" style="cursor:pointer;width:25px;text-align:center;line-height:' + (this.height / 2 - 1) + 'px;height:' + (this.height / 2 - 1) + 'px">+</div>');
    this.downbtn = $('<div class="noselect" style="cursor:pointer;width:25px;text-align:center;line-height:' + (this.height / 2 - 1) + 'px;height:' + (this.height / 2 - 1) + 'px">-</div>');
    this.btnarea.append(this.upbtn);
    this.btnarea.append(this.downbtn);
    this.body.append(this.input);
    this.body.append(this.btnarea);

    this.enablebtn();
};

steper.prototype.getbody = function () {
    return this.body;
}

steper.prototype.setStyle = function (newprogress) {
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
        pb.target.attr('shadow-val', newprogress);
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
        pb.target.attr('rotation-val', newprogress);
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

        pb.target.attr('size-val', newprogress.toFixed(pb.fix));
    } else {
        if(pb.isval){
            size = newprogress;
        }else{
            var pro = ((newprogress / 100) * pb.max) / pb.max;
            var size = pb.max * pro;
        }

        pb.target.css(pb.css, size + 'px');
        pb.target.attr('val', newprogress);
    }
}


steper.prototype.enablebtn = function () {
    var steper = this;
    steper.val = parseFloat(steper.val);
    steper.step = parseFloat(steper.step);
    this.upbtn.on('click', function () {


        steper.val = ((steper.val + steper.step) < steper.max) ? (steper.val + steper.step) : steper.max;


        steper.input.val(steper.val.toFixed(steper.fix) + steper.unit);
        steper.setStyle(steper.val);
        if (steper.callback)
            steper.callback.call(this, steper.val, (steper.val / steper.max) * 100);
    })

    this.downbtn.on('click', function () {
        steper.val = ((steper.val - steper.step) > steper.min) ? (steper.val - steper.step) : steper.min;
        steper.input.val(steper.val.toFixed(steper.fix) + steper.unit);

        steper.setStyle(steper.val);

        if (steper.callback)
            steper.callback.call(this, steper.val, (steper.val / steper.max) * 100);
    })

    steper.input.on('focus', function () {
        steper.input.val(steper.val.toFixed(steper.fix));
        delete_lock = true;

    })

    steper.input.on('change', function () {
        delete_lock = true;
        var val = parseFloat(steper.input.val());

        val = ((val) < steper.max) ? (val) : steper.max;
        val = ((val) > steper.min) ? (val) : steper.min;

        steper.val = val;
        steper.setStyle(val);
        steper.input.val(steper.val.toFixed(steper.fix) + steper.unit);
        if (steper.callback)
            steper.callback.call(this, steper.val, (steper.val / steper.max) * 100);
    })

    steper.input.on('blur', function () {
        delete_lock = false;
        steper.input.val(steper.val.toFixed(steper.fix) + steper.unit);

    })


}