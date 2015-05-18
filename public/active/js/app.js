(function ($, window) {

    $(document).scrollTop($('.step-show').offset().top + 28);
    /**
     * 模态框定义
     */

        //实例化模态框
    window.modal = new hdpModal({
        box: $('body')
    });

    /**
     * 按钮初始化
     * @param $this
     */
    window.initHdpBtn = function ($this) {
        //modal.showAlert('显示按钮编辑项');
        //背景色取色器
        var bgpicker = new colorpicker(null, {color: $this.css('background-color')}, function (color) {
            $this.css({'background-color': color});
        });
        //字体颜色取色器
        var color = new colorpicker(null, {color: $this.get(0).tempColor || $this.css('color')}, function (color) {
            $this.css({'color': color});
        });
        //盒子阴影选择器
        var pro = new progressbar({
            target: $this,
            css: 'box-shadow',
            val: $this.attr('shadow-val') ? $this.attr('shadow-val') : 0,
            max: 100,
            ispre: true
        }, function (data, val) {
            //console.log(val);
            step.update(val);
        });
        var step = new steper({
            target: $this,
            css: 'box-shadow',
            default: $this.attr('shadow-val') ? $this.attr('shadow-val') : 0,
            max: 100,
            unit: 'px'
        }, function (data, val) {
            pro.update(val);
        });
        //圆角选择器
        var pro2 = new progressbar({
            target: $this,
            css: 'border-radius',
            val: $this.attr('radius-val') ? $this.attr('radius-val') : 0,
            max: 100,
            sc: 1,
            ispre: true
        }, function (data, val) {
            step2.update(data);
        });
        var step2 = new steper({
            target: $this,
            css: 'border-radius',
            default: $this.attr('radius-val') ? $this.attr('radius-val') : 0,
            max: 100,
            step: 1,
            unit: '%'
        }, function (data, val) {
            pro2.update(val);
        });
        //透明度选择器
        var pro3 = new progressbar({
            target: $this,
            css: 'opacity',
            val: $this.attr('opacity-val') ? $this.attr('opacity-val') : 100,
            max: 100,
            ispre: true
        }, function (data, val) {
            //console.log(val);
            step3.update(val);
        });
        var step3 = new steper({
            target: $this,
            css: 'opacity',
            default: $this.attr('opacity-val') ? $this.attr('opacity-val') : 100,
            max: 100,
            fix: 0,
            step: 1,
            unit: '%'
        }, function (data, val) {
//                console.log(val);
            pro3.update(val);
        });
        //尺寸选择器
        var pro4 = new progressbar({
            target: $this,
            css: 'size',
            val: ($this.attr('size-val') / 3) || parseFloat(1 / 3),
            max: 3,
            sc: '0.1',
            min: 0.1
        }, function (data, val) {
            console.log(data + "  " + val);
            step4.update(val);
        });
        var step4 = new steper({
            target: $this,
            css: 'size',
            default: $this.attr('size-val') || 1.0,
            max: 3,
            unit: '倍',
            step: '0.1',
            fix: 1,
            min: 0.1
        }, function (data, val) {
            pro4.update(val);
            console.log(data + "  " + val);
        });

        //字体大小选择器
        var pro5 = new progressbar({
            target: $this,
            css: 'font-size',
            val: $this.css('font-size'),
            max: 72
        }, function (data, val) {
            //console.log(val);
            step5.update(val);
        });

        var step5 = new steper({
            target: $this,
            css: 'font-size',
            default: $this.css('font-size'),
            max: 72,
            unit: 'px'
        }, function (data, val) {
            pro5.update(val);
        });

        //宽度选择器
        var pro6 = new progressbar({
            target: $this,
            css: 'width',
            val: $this.width(),
            max: $this.width() * 3
        }, function (data, val) {
            //console.log(val);
            step6.update(val);
        });

        var step6 = new steper({
            target: $this,
            css: 'width',
            default: $this.width(),
            max: $this.width() * 3,
            unit: 'px',
            isval: true
        }, function (data, val) {
            pro6.update(val);
        });

        //高度大小选择器
        var pro7 = new progressbar({
            target: $this,
            css: 'height',
            val: $this.height(),
            max: $this.height() * 3
        }, function (data, val) {
            //console.log(val);
            step7.update(val);
            $this.css('line-height', val + "px");
        });

        var step7 = new steper({
            target: $this,
            css: 'height',
            default: $this.height(),
            max: $this.height() * 3,
            unit: 'px'
        }, function (data, val) {
            console.log(data);
            console.log(val);
            pro7.update(val);
        });

        //if(pro8){
        //
        //}else{
        //    //水平位置选择器
        //    var pro8 = new progressbar({
        //        target: $this,
        //        css: 'left',
        //        val: 50,
        //        max: 100,
        //        isHalf : true,
        //        ispre: true
        //    }, function (data, val) {
        //        //console.log(val);
        //        step8.update(parseInt(val));
        //    });
        //
        //    var step8 = new steper({
        //        target: $this,
        //        css: 'left',
        //        default: 50,
        //        max: 100,
        //        unit: '%'
        //    }, function (data, val) {
        //        pro8.update(parseInt(val));
        //    });
        //}


        var axisXBtn = $('<a class="axis axis-x">横向</a>');
        var axisYBtn = $('<a class="axis axis-y">纵向</a>');
        var axisAllBtn = $('<a class="axis axis-all">双向</a>');


        axisXBtn.click(function () {
            $this.draggable({"axis": "x"});
        });
        axisYBtn.click(function () {
            $this.draggable({"axis": "y"});
        });
        axisAllBtn.click(function () {
            $this.draggable({"axis": ""});
        });


        $('.title').text('按钮样式设置');
        $('#target2').empty();
        $('#target3').empty();
        $('#target4').empty();
        $('.img-set').addClass('.img-uplodbtn-hide');
        ;

        //显示选项卡风格，隐藏标题风格
        $('.tab').show();
        $('.stitle').hide();
        var att = $this.attr('data-id');//判断按钮是否为关注我们按钮，以便进行特殊操作

        $('#target2').append('<br/>');
        $('#target2').append('<br/>');
        $('#target2').append('<div class="setColor-label">背景颜色：</div>');
        $('#target2').append(bgpicker.getInputArea());
        $('#target2').append('<br/>');
        $('#target2').append('<hr/>');
        $('#target2').append('<div class="setComn-label">阴影：</div>');
        $('#target2').append(pro.getbody());
        $('#target2').append(step.getbody());
        $('#target2').append('<br/>');
        $('#target2').append('<hr/>');
        $('#target2').append('<div class="setComn-label">宽度：</div>');
        $('#target2').append(pro6.getbody());
        $('#target2').append(step6.getbody());
        $('#target2').append('<br/>');
        $('#target2').append('<hr/>');
        $('#target2').append('<div class="setComn-label">高度：</div>');
        $('#target2').append(pro7.getbody());
        $('#target2').append(step7.getbody());
        $('#target2').append('<br/>');
        $('#target2').append('<hr/>');
        $('#target2').append('<div class="setComn-label">圆角：</div>');
        $('#target2').append(pro2.getbody());
        $('#target2').append(step2.getbody());
        $('#target2').append('<br/>');
        $('#target2').append('<hr/>');
        $('#target2').append('<div class="setComn-label">透明度：</div>');
        $('#target2').append(pro3.getbody());
        $('#target2').append(step3.getbody());
        $('#target2').append('<br/>');
        $('#target2').append('<hr/>');
        $('#target2').append('<div class="setComn-label">尺寸：</div>');
        $('#target2').append(pro4.getbody());
        $('#target2').append(step4.getbody());
        $('#target2').append('<br/>');
        $('#target2').append('<hr/>');
        $('#target3').append('<br/>');
        $('#target3').append('<br/>');
        $('#target3').append('<div class="setComn-label">按钮文本：</div>');
        $('#target3').append('<br/>');
        $('#target3').append('<div class="content-set"> <input type="text" maxlength="8" placeholder="按钮文本" id="btn_text"></div>');
        $('#target3').append('<hr/>');
        if (att == "url") {
            $('#target3').append('<div class="setComn-label">按钮链接：</div>');
            $('#target3').append('<br/>');
            $('#target3').append('<div class="content-set"> <input type="text" value="' + $this.attr('data-url') + '" placeholder="按钮链接" id="btn_url"></div>');
            $('#target3').append('<hr/>');
        }
        $('#target3').append('<div class="setColor-label">字体颜色：</div>');
        $('#target3').append(color.getInputArea());
        $('#target3').append('<br/>');
        $('#target3').append('<hr/>');
        $('#target3').append('<div class="setComn-label">字体大小：</div>');
        $('#target3').append(pro5.getbody());
        $('#target3').append(step5.getbody());
        $('#target3').append('<br/>');
        $('#target3').append('<hr/>');
        $('#target2').append('<div class="setComn-label">移动方向：</div>');
        $('#target2').append(axisXBtn);
        $('#target2').append(axisYBtn);
        $('#target2').append(axisAllBtn);
        $('#target2').append('<br/>');
        $('#target2').append('<hr/>');
        //$('#target3').append('<div class="setComn-label">水平微调：</div>');
        //$('#target3').append(pro8.getbody());
        //$('#target3').append(step8.getbody());
        //$('#target3').append('<br/>');
        //$('#target3').append('<hr/>');
        $('#target3').append(' <div class="font-style">' +
        '<a class="bold" href="javascript:;">' +
        ' B' +
        '</a>' +
        '<a class="italic" href="javascript:;">' +
        ' I' +
        '</a>' +
        '<a class="underline" href="javascript:;">' +
        ' U' +
        '</a>' +
        '</div>');
        $('#target4').append('<br/><br/><div class="setComm-label">顺序</div>' +
        '<div class="sequence-btn">' +
        '<div class="trimming">' +
        '<a href="javascript:;" class="up-1">' +
        '前移' +
        '</a>' +
        '<a href="javascript:;"class="down-1">' +
        '后移' +
        '</a>' +
        '</div>' +
        '<div class="control">' +
        '<a href="javascript:;"class="up-all">' +
        '顶层' +
        '</a>' +
        '<a href="javascript:;"class="down-all">' +
        '底层' +
        '</a>' +
        '</div>' +
        '</div><br/><br/>');

        /**
         * 如果字体样式已经有所改变，则让对应的操作按钮出于激活状态，如字体已经是粗体，那么B按钮出于激活状态
         */
        if ($this.hasClass('f-bold')) {
            $('.bold').addClass('active');
        }
        if ($this.hasClass('f-italic')) {
            $('.italic').addClass('active');
        }
        if ($this.hasClass('f-underline')) {
            $('.underline').addClass('active');

        }
        /**
         * 未改变字体样式按钮绑定事件
         */
        style($this);


        $('.axis').click(function () {
            $(this).addClass('active').siblings().removeClass('active');
        });

        //按钮链接文本框失去焦点时赋值
        var dataUrl = $this.attr('data-url');
        $('#btn_url').blur(function () {
            if ($.trim($(this).val()) == 0) {
                $this.attr('data-url', dataUrl);
            } else {
                $this.attr('data-url', $.trim($(this).val()));
            }

        })


        /**
         * 调节层级关系
         */
        $('.up-1').click(function () {
            zIndex($('.hdp-btn[data-id="hdp-start-btn"]'), "up-1");
        });
        $('.down-1').click(function () {
            zIndex($('.hdp-btn[data-id="hdp-start-btn"]'), "down-1");
        });
        $('.up-all').click(function () {
            zIndex($('.hdp-btn[data-id="hdp-start-btn"]'), "up-all");
        });
        $('.down-all').click(function () {
            zIndex($('.hdp-btn[data-id="hdp-start-btn"]'), "down-all");
        });


        //按钮文字输入文本框
        var clone = $this.clone();
        clone.find('.custom-menu').remove();
        var text = $.trim(clone.text());
        $('#btn_text').val(text);
        $('#btn_text').keyup(function () {
            //modal.showAlert($.trim($(this).val()).length);
            $this.text($.trim($(this).val()));

            $(this).attr('placeholder', text);
        });
        $('#btn_text').blur(function () {
            //modal.showAlert($.trim($(this).val()).length);
            if ($.trim($(this).val()).length == 0) {
                $this.text(text);
                $(this).val(text);
            } else {
                $this.text($.trim($(this).val()));
            }
        });
    }


    window.bgposition;

    /**
     * 背景编辑
     * @param $this
     */
    window.initHdpeditBg = function ($this) {

        var that = $this.get(0);

        //window.bgposition = new bg_position({target: $this, helper: $('.layoutbox'), islimit: true});//绑定背景移动组件
        //
        //    window.bgposition.disable();
        //if(that.bgpicker){
        //    that.bgpicker.setColor($this.css('background-color'));
        //}else{
        //    that.bgpicker = new colorpicker(null, {color: ''}, function (color) {
        //        $this.css({'background-color': color});
        //    });
        //}
        that.bgpicker = new colorpicker(null, null, function (color) {
            $this.css({'background-color': color});
        });
        that.bgpicker.setColor(that.bgpicker.getValue());

        //修改图片尺寸
        //var step = new steper({
        //    target: $this,
        //    css: 'background-size',
        //    default: Math.round($this.attr("bgsize-val")) || 50,
        //    max: $this.width() * 2,
        //    unit: '%',
        //    step: 1,
        //    fix : 0
        //}, function (data, val) {
        //    pro.update(data);
        //    if (bgposition) {
        //        bgposition.updateConfig();
        //    }
        //});
        //var pro = new progressbar({
        //    target: $this,
        //    css: 'background-size',
        //    val: ($this.attr("bgsize-val") / 100) || 0.5,
        //    max: $this.width() * 2
        //}, function (data, val) {
        //
        //    step.update(data);
        //    if (bgposition) {
        //        bgposition.updateConfig();
        //    }
        //});
        //旋转角度
        var step2 = new steper({
            target: $this,
            css: 'rotation',
            default: $this.attr('rotation-val') ? Math.round($this.attr('rotation-val') * 100) : 0,
            max: 100,
            unit: '%',
            fix: 0
        }, function (data, val) {
            pro2.update(data);
        });
        var pro2 = new progressbar({
            target: $this,
            css: 'rotation',
            val: $this.attr('rotation-val') ? $this.attr('rotation-val') * 100 : 0,
            max: 100,
            ispre: true
        }, function (data, val) {
            step2.update(data);
        });
        //模糊程度
        var step3 = new steper({
            target: $this,
            css: 'blur',
            default: $this.attr('blur-val') ? Math.round(15 * ($this.attr('blur-val') / 100)) : 0,
            max: 15,
            unit: '级',
            fix: 0
        }, function (data, val) {
            pro3.update(val);
        });
        var pro3 = new progressbar({
            target: $this,
            css: 'blur',
            val: $this.attr('blur-val') ? $this.attr('blur-val') / 100 : 0,
            max: 15
        }, function (data, val) {
            step3.update(val);
        });


        $('.stitle').text('背景设置');
        $('.img-set').removeClass('.img-uplodbtn-hide');
        ;

        $('.img-set').removeClass('.img-uplodbtn-hide');
        ;

        $('.tab-pane').removeClass('active');
        $('#home').addClass('active');
        $('#target2').html('');
        $('#target3').html('');
        $('#target4').html('');
        $('.tab').hide();
        $('.stitle').show();
        $('#target2').append('<br/>');
        $('#target2').append('<br/>');
        $('#target2').append('<div class="img-set"></div>');
        $('#target2').append('<hr/>');
        $('#target2').append('<div class="setColor-label">背景颜色：</div>');
        $('#target2').append(that.bgpicker.getInputArea());

        //$('#target2').append('<br/>');
        //$('#target2').append('<hr/>');
        //$('#target2').append('<div class="setComn-label">图片尺寸：</div>');
        //$('#target2').append(pro.getbody());
        //$('#target2').append(step.getbody());
        $('#target2').append('<br/>');
        $('#target2').append('<hr/>');
        $('#target2').append('<div class="setComn-label">旋转角度：</div>');
        $('#target2').append(pro2.getbody());
        $('#target2').append(step2.getbody());
        $('#target2').append('<br/>');
        $('#target2').append('<hr/>');
        $('#target2').append('<div class="setComn-label">模糊程度：</div>');
        $('#target2').append(pro3.getbody());
        $('#target2').append(step3.getbody());
        $('#target2').append('<br/>');
        $('#target2').append('<hr/>');

        //创建图片上传控件
        var uploader = WebUploader.create({

            // swf文件路径

            swf: rootUrl + '/public/active/js/Uploader.swf',
            auto: true,

            // 文件接收服务端。
            server: rootUrl + '/active/up_img',

            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: {
                id: '.img-set',
                label: "上传图片",
                multiple: false
            },

            // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
            resize: false
        });
        //console.log(uploader);
        // 当有文件添加进来的时候
        uploader.on('fileQueued', function (file) {
            // 创建缩略图
            // 如果为非图片文件，可以不用调用此方法。
            // thumbnailWidth x thumbnailHeight 为 100 x 100

            uploader.makeThumb(file, function (error, src) {
                if (error) {
                    $('.hdp-layoutBg').replaceWith('<span>不能预览</span>');
                    return;
                }
                //console.log(file._info);


            }, 1, 1);
        });
        uploader.on("uploadSuccess", function (file, response) {
            $this.css({
                'background-image': 'url(' + rootUrl + '/active/' + response.content + ')',
                'background-size': '100% auto'
            });
            //window.bgposition = new bg_position({target: $this, helper: $('.layoutbox'), islimit: true});//绑定背景移动组件
            //
            //if(window.bgposition)
            //    window.bgposition.disable();
            //console.log(response);
        });
    }
    //if(window.bgposition)
    //window.bgposition.disable();

    /**
     * 文本编辑项
     * @param $this
     */
    window.initHdpTextarea = function ($this) {
        var bgpicker = new colorpicker(null, {color: $this.css('background-color')}, function (color) {
            if (color == "none") {

                $this.css({'background': 'none'});
            } else {

                $this.css({'background-color': color});
            }
        });
        var color = new colorpicker(null, {color: $this.css('color')}, function (color) {
            $this.css({'color': color});
        });

        //字体大小选择器
        var pro5 = new progressbar({
            target: $this,
            css: 'font-size',
            val: $this.attr("val") ? Math.round($this.attr("val")) : $this.css('font-size'),
            max: 72
        }, function (data, val) {
            //console.log(val);
            step5.update(val);
        });

        var step5 = new steper({
            target: $this,
            css: 'font-size',
            default: $this.attr("val") ? Math.round($this.attr("val")) : $this.css('font-size'),
            max: 72,
            unit: 'px'
        }, function (data, val) {
            pro5.update(val);
        });

        var tip = $this.attr('data-tip');
        var stip = tip ? "<b style='color: #990000'>(注意:#score#为后台预留字段，请保留此字段)</b>" : "";

        $('.title').text('文本样式设置');
        $('#target2').empty();
        $('#target3').empty();
        $('#target4').empty();
        $('.img-set').addClass('.img-uplodbtn-hide');
        ;

        $('.tab').show();
        $('.stitle').hide();

        $('#target2').append('<br/>');
        $('#target2').append('<br/>');
        $('#target2').append('<div class="setColor-label">背景颜色：</div>');
        $('#target2').append(bgpicker.getInputArea());
        $('#target2').append('<br/>');
        $('#target2').append('<hr/>');

        $('#target3').append('<br/>');
        $('#target3').append('<br/>');
        $('#target3').append('<div class="setComn-label input-lable">文本内容：' + stip + '</div>');
        $('#target3').append('<br/>');
        $('#target3').append('<div class="content-set"> <textarea cols="20" placeholder="文本内容" id="a_text"></textarea></div>');
        $('#target3').append('<hr/>');
        $('#target3').append('<div class="setComn-label">字体大小：</div>');
        $('#target3').append(pro5.getbody());
        $('#target3').append(step5.getbody());
        $('#target3').append('<br/>');
        $('#target3').append('<hr/>');
        $('#target3').append('<div class="setColor-label">字体颜色：</div>');
        $('#target3').append(color.getInputArea());
        $('#target3').append('<br/>');
        $('#target3').append('<hr/>');
        $('#target3').append(' <div class="font-style">' +
        '<a class="bold" href="javascript:;">' +
        ' B' +
        '</a>' +
        '<a class="italic" href="javascript:;">' +
        ' I' +
        '</a>' +
        '<a class="underline" href="javascript:;">' +
        ' U' +
        '</a>' +
        '</div>');

        $('#target4').append('<br/><br/><div class="setComm-label">顺序</div>' +
        '<div class="sequence-btn">' +
        '<div class="trimming">' +
        '<a href="javascript:;" class="up-1">' +
        '前移' +
        '</a>' +
        '<a href="javascript:;"class="down-1">' +
        '后移' +
        '</a>' +
        '</div>' +
        '<div class="control">' +
        '<a href="javascript:;"class="up-all">' +
        '顶层' +
        '</a>' +
        '<a href="javascript:;"class="down-all">' +
        '底层' +
        '</a>' +
        '</div>' +
        '</div><br/><br/>');

        if ($this.hasClass('f-bold')) {
            $('.bold').addClass('active');
        }
        if ($this.hasClass('f-italic')) {
            $('.italic').addClass('active');
        }
        if ($this.hasClass('f-underline')) {
            $('.underline').addClass('active');

        }

        /**
         * 调节层级关系
         */
        $('.up-1').click(function () {
            zIndex($this, "up-1");
        });
        $('.down-1').click(function () {
            zIndex($this, "down-1");
        });
        $('.up-all').click(function () {
            zIndex($this, "up-all");
        });
        $('.down-all').click(function () {
            zIndex($this, "down-all");
        });


        var text = $.trim($this.find('.text-main').text());
        $('#a_text').val(text);
        $(this).attr('placeholder', text);
        $('#a_text').keyup(function () {
            $this.find('.text-main').text($(this).val());
        });
        $('#a_text').blur(function () {
            //modal.showAlert($.trim($(this).val()).length);
            if ($.trim($(this).val()).length == 0) {
                $(this).val(text);
                $this.find('.text-main').text(text);
            } else {
                $this.find('.text-main').text($.trim($(this).val()));
            }

        });
        style($this);
    }
    /**
     * 文本框初始化
     * @param $this
     */
    window.initHdpInputText = function ($this) {
        //背景色取色器
        var bgpicker = new colorpicker(null, null, function (color) {
            if (color == "none") {

                $this.css({'background': 'none'});
            } else {

                $this.css({'background-color': color});
            }
        });
        bgpicker.setColor($this.css('background-color'));
        //字体颜色取色器
        var color = new colorpicker(null, {color: $this.css('color')}, function (color) {
            $this.css({'color': color});
        });
        //盒子阴影选择器
        var pro = new progressbar({
            target: $this,
            css: 'box-shadow',
            val: $this.attr('shadow-val') ? $this.attr('shadow-val') : 0,
            max: 100,
            ispre: true
        }, function (data, val) {
            //console.log(val);
            step.update(val);
        });
        var step = new steper({
            target: $this,
            css: 'box-shadow',
            default: $this.attr('shadow-val') ? $this.attr('shadow-val') : 0,
            max: 100,
            unit: 'px'
        }, function (data, val) {
            pro.update(val);
        });
        //圆角选择器
        var pro2 = new progressbar({
            target: $this,
            css: 'border-radius',
            val: $this.attr('radius-val') ? $this.attr('radius-val') : 0,
            max: 100,
            ispre: true
        }, function (data, val) {
            step2.update(val);
        });
        var step2 = new steper({
            target: $this,
            css: 'border-radius',
            default: $this.attr('radius-val') ? $this.attr('radius-val') : 0,
            max: 100,
            unit: 'px'
        }, function (data, val) {
            pro2.update(val);
        });
        //透明度选择器
        var pro3 = new progressbar({
            target: $this,
            css: 'opacity',
            val: $this.attr('opacity-val') ? $this.attr('opacity-val') : 100,
            max: 100,
            ispre: true
        }, function (data, val) {
            //console.log(val);
            step3.update(val);
        });
        var step3 = new steper({
            target: $this,
            css: 'opacity',
            default: $this.attr('opacity-val') ? $this.attr('opacity-val') : 100,
            max: 100,
            fix: 0,
            step: 1,
            unit: '%'
        }, function (data, val) {
//                console.log(val);
            pro3.update(val);
        });
        //尺寸选择器
        var pro4 = new progressbar({
            target: $this,
            css: 'size',
            val: ($this.attr('size-val') / 3) || parseFloat(1 / 3),
            max: 3,
            sc: '0.1',
            min: 0.1
        }, function (data, val) {
            console.log(data + "  " + val);
            step4.update(val);
        });
        var step4 = new steper({
            target: $this,
            css: 'size',
            default: $this.attr('size-val') || 1.0,
            max: 3,
            unit: '倍',
            step: '0.1',
            fix: 1,
            min: 0.1
        }, function (data, val) {
            pro4.update(val);
            console.log(data + "  " + val);
        });

        //字体大小选择器
        var pro5 = new progressbar({
            target: $this,
            css: 'font-size',
            val: $this.css('font-size'),
            max: 72
        }, function (data, val) {
            //console.log(val);
            step5.update(val);
        });

        var step5 = new steper({
            target: $this,
            css: 'font-size',
            default: $this.css('font-size'),
            max: 72,
            unit: 'px'
        }, function (data, val) {
            pro5.update(val);
        });
        //左内边距选择器
        var pro6 = new progressbar({
            target: $this,
            css: 'padding-left',
            val: $this.css('padding-left'),
            max: 72
        }, function (data, val) {
            //console.log(val);
            step6.update(val);
        });

        var step6 = new steper({
            target: $this,
            css: 'padding-left',
            default: $this.css('padding-left'),
            max: 72,
            unit: 'px'
        }, function (data, val) {
            pro6.update(val);
        });


        $('.title').text('文本框样式设置');
        $('#target2').empty();
        $('#target3').empty();
        $('#target4').empty();
        $('.img-set').addClass('.img-uplodbtn-hide');

        $('.tab').show();
        $('.stitle').hide();


        $('#target2').append('<br/>');
        $('#target2').append('<br/>');
        $('#target2').append('<div class="setColor-label">背景颜色：</div>');
        $('#target2').append(bgpicker.getInputArea());
        $('#target2').append('<br/>');
        $('#target2').append('<hr/>');
        $('#target2').append('<div class="setComn-label">阴影：</div>');
        $('#target2').append(pro.getbody());
        $('#target2').append(step.getbody());
        $('#target2').append('<br/>');
        $('#target2').append('<hr/>');
        $('#target2').append('<div class="setComn-label">圆角：</div>');
        $('#target2').append(pro2.getbody());
        $('#target2').append(step2.getbody());
        $('#target2').append('<br/>');
        $('#target2').append('<hr/>');
        $('#target2').append('<div class="setComn-label">透明度：</div>');
        $('#target2').append(pro3.getbody());
        $('#target2').append(step3.getbody());
        $('#target2').append('<br/>');
        $('#target2').append('<hr/>');
        $('#target2').append('<div class="setComn-label">左内边距：</div>');
        $('#target2').append(pro6.getbody());
        $('#target2').append(step6.getbody());
        $('#target2').append('<br/>');
        $('#target2').append('<hr/>');
        $('#target2').append('<div class="setComn-label">尺寸：</div>');
        $('#target2').append(pro4.getbody());
        $('#target2').append(step4.getbody());
        $('#target2').append('<br/>');
        $('#target2').append('<hr/>');
        $('#target3').append('<br/>');
        $('#target3').append('<br/>');
        $('#target3').append('<div class="setComn-label">文本：</div>');
        $('#target3').append('<br/>');
        $('#target3').append('<div class="content-set"> <input type="text" maxlength="50" placeholder="按钮文本" id="btn_text"></div>');
        $('#target3').append('<hr/>');

        $('#target3').append('<div class="setColor-label">字体颜色：</div>');
        $('#target3').append(color.getInputArea());
        $('#target3').append('<br/>');
        $('#target3').append('<hr/>');
        $('#target3').append('<div class="setComn-label">字体大小：</div>');
        $('#target3').append(pro5.getbody());
        $('#target3').append(step5.getbody());
        $('#target3').append('<br/>');
        $('#target3').append('<hr/>');
        $('#target3').append(' <div class="font-style">' +
        '<a class="bold" href="javascript:;">' +
        ' B' +
        '</a>' +
        '<a class="italic" href="javascript:;">' +
        ' I' +
        '</a>' +
        '<a class="underline" href="javascript:;">' +
        ' U' +
        '</a>' +
        '</div>');
        $('#target4').append('<br/><br/><div class="setComm-label">顺序</div>' +
        '<div class="sequence-btn">' +
        '<div class="trimming">' +
        '<a href="javascript:;" class="up-1">' +
        '前移' +
        '</a>' +
        '<a href="javascript:;"class="down-1">' +
        '后移' +
        '</a>' +
        '</div>' +
        '<div class="control">' +
        '<a href="javascript:;"class="up-all">' +
        '顶层' +
        '</a>' +
        '<a href="javascript:;"class="down-all">' +
        '底层' +
        '</a>' +
        '</div>' +
        '</div><br/><br/>');
        if ($this.hasClass('f-bold')) {
            $('.bold').addClass('active');
        }
        if ($this.hasClass('f-italic')) {
            $('.italic').addClass('active');
        }
        if ($this.hasClass('f-underline')) {
            $('.underline').addClass('active');

        }
        // 调节层级关系

        $('.up-1').click(function () {
            zIndex($this, "up-1");
        });
        $('.down-1').click(function () {
            zIndex($this, "down-1");
        });
        $('.up-all').click(function () {
            zIndex($this, "up-all");
        });
        $('.down-all').click(function () {
            zIndex($this, "down-all");
        });

        style($this);

        //文本文字输入文本框
        var text = $.trim($this.val());
        $('#btn_text').val(text);
        $('#btn_text').keyup(function () {
            //modal.showAlert($.trim($(this).val()).length);
            $this.val($(this).val());

            $(this).attr('placeholder', text);
        });
        $('#btn_text').blur(function () {
            //modal.showAlert($.trim($(this).val()).length);
            if ($.trim($(this).val()).length == 0) {
                $this.val(text);
                $(this).val(text);
            } else {
                $this.val($(this).val());
            }
        });
    }

    /**
     * 图片初始化
     * @param $this
     */
    window.initHdpImage = function ($this, limitW, limitH, limitS) {

        var bgpicker = new colorpicker(null, null, function (color) {
            if (color == "none") {

                $this.parent('.hdp-img').css({'background': 'none'});
            } else {

                $this.parent('.hdp-img').css({'background-color': color});
            }
        });
        bgpicker.setColor(bgpicker.getValue());

        //尺寸选择器
        var pro4 = new progressbar({
            target: $this,
            css: 'size',
            val: ($this.attr('size-val') / 3) || parseFloat(1 / 3),
            max: 3,
            sc: '0.1',
            min: 0.1
        }, function (data, val) {
            console.log(data + "  " + val);
            step4.update(val);
        });
        var step4 = new steper({
            target: $this,
            css: 'size',
            default: $this.attr('size-val') || 1.0,
            max: 3,
            unit: '倍',
            step: '0.1',
            fix: 1,
            min: 0.1
        }, function (data, val) {
            pro4.update(val);
            console.log(data + "  " + val);
        });
        //旋转角度
        var step2 = new steper({
            target: $this,
            css: 'rotation',
            default: $this.attr('rotation-val') ? ($this.attr('rotation-val') * 100) : 0,
            max: 100,
            unit: '%',
            pre: true
        }, function (data, val) {
            pro2.update(val);
        });
        var pro2 = new progressbar({
            target: $this,
            css: 'rotation',
            val: $this.attr('rotation-val') ? ($this.attr('rotation-val') * 100) : 0,
            max: 100,
            pre: true
        }, function (data, val) {
            step2.update(val);
        });
        //模糊程度
        var step3 = new steper({
            target: $this,
            css: 'blur',
            default: $this.attr('blur-val') ? $this.attr('blur-val') : 0,
            max: 15,
            unit: '级'
        }, function (data, val) {
            pro3.update(val);
        });
        var pro3 = new progressbar({
            target: $this,
            css: 'blur',
            val: $this.attr('blur-val') ? $this.attr('blur-val') : 0,
            max: 15
        }, function (data, val) {
            step3.update(val);
        });


        $('.stitle').text('图片设置');


        $('.tab-pane').removeClass('active');
        $('#home').addClass('active');
        $('.tab').hide();
        $('.stitle').show();
        $('#target2').empty();
        $('#target3').empty();
        $('#target4').empty();


        $('#target2').append('<br/>');
        $('#target2').append('<br/>');
        $('#target2').append('<div class="img-set"></div>');
        $('#target2').append('<hr/>');
        $('#target2').append('<div class="setColor-label">背景颜色：</div>');
        $('#target2').append(bgpicker.getInputArea());


        var isUpload = $this.parent('.hdp-img').attr('data-tip');
        if (isUpload == "no-upload") {
            $('.img-set').html('<b>此图为奖品图片示例，由后台动态生成</b>');

        } else {
            $('.img-set').removeClass('.img-uplodbtn-hide');
        }

        $('#target2').append('<br/>');
        $('#target2').append('<hr/>');
        $('#target2').append('<div class="setComn-label">图片尺寸：</div>');
        $('#target2').append(pro.getbody());
        $('#target2').append(step.getbody());
        $('#target2').append('<br/>');
        $('#target2').append('<hr/>');
        $('#target2').append('<div class="setComn-label">旋转角度：</div>');
        $('#target2').append(pro2.getbody());
        $('#target2').append(step2.getbody());
        $('#target2').append('<br/>');
        $('#target2').append('<hr/>');
        $('#target2').append('<div class="setComn-label">模糊程度：</div>');
        $('#target2').append(pro3.getbody());
        $('#target2').append(step3.getbody());
        $('#target2').append('<br/>');
        $('#target2').append('<hr/>');
        $('#target2').append('<div class="setComm-label">顺序</div>' +
        '<div class="sequence-btn">' +
        '<div class="trimming">' +
        '<a href="javascript:;" class="up-1">' +
        '前移' +
        '</a>' +
        '<a href="javascript:;"class="down-1">' +
        '后移' +
        '</a>' +
        '</div>' +
        '<div class="control">' +
        '<a href="javascript:;"class="up-all">' +
        '顶层' +
        '</a>' +
        '<a href="javascript:;"class="down-all">' +
        '底层' +
        '</a>' +
        '</div>' +
        '</div><br/><br/>');


        /**
         * 调节层级关系
         */
        $('.up-1').click(function () {
            zIndex($this.parent(), "up-1");
        });
        $('.down-1').click(function () {
            zIndex($this.parent(), "down-1");
        });
        $('.up-all').click(function () {
            zIndex($this.parent(), "up-all");
        });
        $('.down-all').click(function () {
            zIndex($this.parent(), "down-all");
        });

        if (isUpload != "no-upload") {
            /**
             * 检测图片宽高，并进行一些操作   kiner-tang
             * @type {*|HTMLElement}
             */
            var checkImageWH = function (img) {
                var result = true;
                if (limitW || limitH) {
                    if (img.width > limitW || img.height > limitH) {
                        modal.showAlert('尺寸不符合要求(建议图片最大尺寸为:' + limitW + 'px * ' + limitH + 'px)');
                        result = false;
                    }
                }
                if (limitS) {//建议图片大小，单位为k
                    if (img.size > limitS * 1024) {
                        modal.showAlert('建议图片大小不要超过' + (limitS) + 'k');
                        result = false;
                    }
                }
                return result;
            }

            //创建图片上传控件
            var uploader = WebUploader.create({

                // swf文件路径
                swf: '/assets/js/lib/webuploader/Uploader.swf',
                auto: true,

                // 文件接收服务端。
                server: root_url + '/upload.json',

                // 选择文件的按钮。可选。
                // 内部根据当前运行是创建，可能是input元素，也可能是flash.
                pick: {
                    id: '.img-set',
                    label: "上传图片",
                    multiple: false
                },

                // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
                resize: false
            });
            //console.log(uploader);
            // 当有文件添加进来的时候
            uploader.on('fileQueued', function (file) {
                // 创建缩略图
                // 如果为非图片文件，可以不用调用此方法。
                // thumbnailWidth x thumbnailHeight 为 100 x 100

                uploader.makeThumb(file, function (error, src) {
                    if (error) {
                        $('.hdp-layoutBg').replaceWith('<span>不能预览</span>');
                        return;
                    }
                    var shold = checkImageWH(file);
                    if (shold) {
                        $this.attr('src', src);
                    } else {
                        file.setStatus('cancelled');
                    }
                }, 1, 1);
            });

            uploader.on("uploadSuccess", function (file, response) {
                $this.attr('src', response.content);
                //console.log(response);
            });
        }

    }

    /**
     * 设置文字样式
     * @param $this
     */
    window.style = function ($this) {
        if ($this.hasClass('f-bold')) {
            $(".bold").get(0).has = true;
        }
        if ($this.hasClass('f-italic')) {
            $('.italic').has = true;
        }
        if ($this.hasClass('f-underline')) {
            $('.underline').get(0).has = true;

        }
        //文字样式选中
        $(".font-style a").click(function () {
            var obj = $(this).get(0);
            if (obj.has) {
                obj.has = !obj.has;
            } else {
                obj.has = true;
            }
            if (!obj.has) {
                $(this).removeClass("active");
            } else {
                $(this).addClass("active");
            }
        });
        $('.bold').get(0).bBtn = true;
        $('.bold').click(function () {
            if ($(this).get(0).bBtn) {
                $this.addClass('f-bold');
            } else {
                $this.removeClass('f-bold');
            }
            $(this).get(0).bBtn = !$(this).get(0).bBtn;
        });
        $('.italic').get(0).bBtn = true;
        $('.italic').click(function () {
            if ($(this).get(0).bBtn) {
                $this.addClass('f-italic');
            } else {
                $this.removeClass('f-italic');
            }
            $(this).get(0).bBtn = !$(this).get(0).bBtn;
        });
        $('.underline').get(0).bBtn = true;
        $('.underline').click(function () {
            if ($(this).get(0).bBtn) {
                $this.addClass('f-underline');
            } else {
                $this.removeClass('f-underline');
            }
            $(this).get(0).bBtn = !$(this).get(0).bBtn;
        });
    }
    /**
     * 层级关系
     * @param obj
     * @param type
     */
    window.zIndex = function (obj, type) {
        var max = 10, min = 0;
        //$('.swiper-container').changeLayout();
        var index = $(obj).css('z-index');
        if (index == "auto") {
            $(obj).css('z-index', 0);
        }
        if (type == "up-1") {
            if (index == max) {
                return;
            }
            index++;
        } else if (type == "down-1") {
            if (index == min) {
                return;
            }
            index--;
        } else if (type == "up-all") {
            index = 10;
        } else if (type == "down-all") {
            index = 0;
        }
        $(obj).css('z-index', index);
    }

    /**
     * 分享页面遮罩层
     * @param $this
     */
    window.initHdpMask = function ($this) {
        //遮罩层透明度
        var step4 = new steper({
            target: $this,
            css: 'opacity',
            default: $this.attr('opacity-val') ? $this.attr('opacity-val') : 100,
            max: 100,
            unit: '%'
        }, function (data, val) {
            pro4.update(val);
        });
        var pro4 = new progressbar({
            target: $this,
            css: 'opacity',
            val: $this.attr('opacity-val') ? $this.attr('opacity-val') : 100,
            max: 100
        }, function (data, val) {
            step4.update(val);
        });
        $('.stitle').text('遮罩层设置');

        $('.tab-pane').removeClass('active');
        $('#home').addClass('active');
        $('.tab').hide();
        $('.stitle').show();
        $('#target2').empty();
        $('#target3').empty();
        $('#target4').empty();
        $('.img-set').addClass('.img-uplodbtn-hide');
        ;
        $('#target2').append('<br/>');
        $('#target2').append('<br/>');
        $('#target2').append('<div class="setComn-label">遮罩层透明度：</div>');
        $('#target2').append(pro4.getbody());
        $('#target2').append(step4.getbody());
        $('#target2').append('<br/>');
        $('#target2').append('<hr/>');
    }


})(jQuery, window);


