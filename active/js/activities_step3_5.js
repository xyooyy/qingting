$(function () {
    /**
     * 判断抽奖结果页面哪个没设置
     */
	var tag = 0;
	
    initStep();

    /**
     * 根据网页参数判断当前出于第几步
     */
    function initStep(){
        var p = hdpUrl.get('page');
        $('.link1 a,.link2 a,.link3 a').removeClass('active').removeClass('current');

        $('.uploadBtn').attr('data-step',p);
        if(!p){
            $('.link1 a').addClass('current');
        }else if(p=="1"){
            $('.link1 a').addClass('current');
        }else if(p=="2"){
            $('.link1 a').addClass('active');
            $('.link2 a').addClass('current');
        }else if(p=="3"){
            $('.link1 a').addClass('active');
            $('.link2 a').addClass('active');
            $('.link3 a').addClass('current');
        }else{
            $('.link1 a').addClass('active');
            $('.link2 a').addClass('active');
            $('.link3 a').addClass('active');
        }
    }



    //当用户由第4步时选上一步进入此页面是进行页面初始化
    //var aid = hdpUrl.get("aid");
    //var isPre = hdpUrl.get("ispre");
    //if (aid&&isPre) {
    //    var url = "";
    //    $.ajax(url, {
    //        data: {
    //            action: "",
    //            aid: aid
    //        },
    //        dataType: "json",
    //        type: "post",
    //        success: function (data, text) {
    //            $('.phone').html(data.html);
    //        },
    //        error: function (data, text) {
    //
    //        }
    //    });
    //}

    $('.pre').click(function () {
        pre();
    });
    $('.next').click(function () {
        var type = $('.step.current').parent().clone().attr('data-name');

        var html = $('.phone').clone();
        //html.find('.btn-current').remove();
        saveHtml(type,html.html(),function(){
            next();
        });
    });

    /**
     * 上一步
     */
    function pre() {
        window.location.href = hdpUrl.set(rootUrl + "/prize", {"id": hdpUrl.get("id"), "ispre": true});//设置跳转网页及网页参数
    }

    /**
     * 下一步
     */
    function next() {
    	if(tag==0){
    		window.location.href = hdpUrl.set(rootUrl + "/confirm", "id", hdpUrl.get("id"));//设置跳转网页及网页参数
    	}else if(tag==1){
    		modal.showWithTitle("奖页面未设置");
    	}else if(tag==2){
    		modal.showWithTitle("未中奖页面未设置");
    	}else if(tag==3){
    		modal.showWithTitle("次数用完页面未设置");
    	}
    }

    //$('.hdp-btn,.layoutArea .hdp-textarea,.hdp-img').changeLayout();

    //为控件绑定移动插件
    $('.phone-simulation').on('mouseover', '.hdp-btn,.hdp-textarea,.hdp-img,.hdp-widget-group,.hdp-input-text', function (ev) {

        var $this = $(this);
        if ($(".phone-simulation").hasClass("lay-custom")) {
            if ($('select[name="set-way"]').val() == "1") {
                $this.draggable('disable')
            } else {
                $this.draggable({
                    containment: ".layoutAuto",
                    //cursorAt: { top: -12, left: -20 },
                    cancel: ".close",

                    zIndex: 99999,
                    grid: [$this.width() + 10, $this.height() + 10],
                    handler: $this.find(".drag"),
                    start: function (ev, ui) {
                        sb(ev);
                        //$this.append('<div class="custom-menu"><ul><li class="drag"><span><i class="icon-drag"></i>拖动</span></li><li><span><i class="icon-close"></i>删除</span></li></ul></div>');
                    },
                    drag: function (ev, ui) {
                        //$(this).remove();
                        //$(this).css({
                        //    'top': ui.position.top,
                        //    'left': ui.position.left,
                        //    'position': 'absolute',
                        //    'cursor': 'move'
                        //});
                    },
                    stop: function (event, ui) {

                        $this.css({
                            'height': 'auto'
                        });
                        //$(this).remove();
                        //$this.children(".custom-menu").remove();
                        //$(this).css({
                        //    'top': ui.position.top,
                        //    'left': ui.position.left,
                        //    'position': 'absolute',
                        //    'cursor': 'auto',
                        //    'z-index':'auto'
                        //});
                    }
                });
                $this.draggable("enable");
                //console.log($this.html());
                $this.find('.close').click(function () {
                    $this.remove();
                });

            }
        } else {
            try {
                //console.log($this.children(".custom-menu").html());
                $this.draggable('disable');

            } catch (Exception) {
                //console.log("无法解除绑定");
            }
        }
    });

    $('.phone-simulation').on('click', '.hdp-btn,.hdp-textarea,.hdp-img,.hdp-widget-group,.hdp-input-text', function (ev) {
        sb(ev);

        if(window.bgposition){
            window.bgposition.disable();
        }
    });

    /**
     * 文本框样式编辑
     */
    $('.phone-simulation').on('click', '.hdp-input-text', function (ev) {
        sb(ev);
        $('a[href="#profile"]').parent().addClass('active').siblings().removeClass('active');
        $('#profile').addClass('active').siblings().removeClass('active');

        var $this = $(this);

        /*//背景色取色器
         var bgpicker = new colorpicker(null, {color: $this.css('background-color')}, function (color) {
         $this.css({'background-color': color});
         });
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
         pre: true
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
         pre: true
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
         pre: true
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
         val: $this.width(),
         max: $this.width() * 3
         }, function (data, val) {
         step4.update(val);
         $this.toCenter();
         });
         var step4 = new steper({
         target: $this,
         css: 'size',
         default: $this.width(),
         max: $this.width() * 3,
         unit: 'px',
         isval:true
         }, function (data, val) {
         pro4.update(val);
         $this.toCenter();
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
         $('.img-set').hide();

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
         *
         * 调节层级关系

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
         });*/

        initHdpInputText($this);

    });

    /**
     * 图片样式编辑
     */
    $('.phone-simulation').on('click', '.hdp-img', function (ev) {

        sb(ev);
        var $this = $(this).find('img');


        /*var bgpicker = new colorpicker(null, {color: $this.parent().css('background-color')}, function (color) {
         $this.parent().css({'background-color': color});
         });

         //修改图片尺寸
         var step = new steper({
         target: $this,
         css: 'size',
         default: $this.width(),
         max: $this.width() * 3,
         unit: 'px',
         isval:true
         }, function (data, val) {
         pro.update(val);
         });
         var pro = new progressbar({
         target: $this,
         css: 'size',
         val: $this.width(),
         max: $this.width() * 3
         }, function (data, val) {
         step.update(val);
         });
         //旋转角度
         var step2 = new steper({
         target: $this,
         css: 'rotation',
         default: $this.attr('rotation-val') ? $this.attr('rotation-val') : 0,
         max: 100,
         unit: '%'
         }, function (data, val) {
         pro2.update(val);
         });
         var pro2 = new progressbar({
         target: $this,
         css: 'rotation',
         val: $this.attr('rotation-val') ? $this.attr('rotation-val') : 0,
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

         *//**
         * 调节层级关系
         *//*
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


         //创建图片上传控件
         var uploader = WebUploader.create({

         // swf文件路径
         swf: '/js/Uploader.swf',

         // 文件接收服务端。
         server: 'http://115.28.140.9/tangwenhui/testPHP/uploadImages.php',

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
         //console.log(src);
         $this.attr('src', src);
         }, 1, 1);
         });*/


        initHdpImage($this);

    });

    /**
     * 显示按钮编辑项
     */
    $('.phone-simulation').on('click', '.hdp-btn', function (ev) {

        sb(ev);
        $('a[href="#profile"]').parent().addClass('active').siblings().removeClass('active');
        $('#profile').addClass('active').siblings().removeClass('active');
        var $this = $(this);
        //modal.showAlert('显示按钮编辑项');
        //背景色取色器
        /*var bgpicker = new colorpicker(null, {color: $this.css('background-color')}, function (color) {
         $this.css({'background-color': color});
         });
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
         pre: true
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
         pre: true
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
         pre: true
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
         var pro4 = new progressbar({target: $this, css: 'size', val: $this.width(), max: 1000}, function (data, val) {
         step4.update(val);
         $this.toCenter();
         });
         var step4 = new steper({
         target: $this,
         css: 'size',
         default: $this.width(),
         max: 1000,
         unit: 'px',
         isval:true
         }, function (data, val) {
         pro4.update(val);
         $this.toCenter();
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


         $('.title').text('按钮样式设置');
         $('#target2').empty();
         $('#target3').empty();
         $('#target4').empty();
         $('.img-set').hide();

         $('.tab').show();
         $('.stitle').hide();

         var att = $this.attr('data-id');

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
         $('#target3').append('<div class="content-set"> <input type="text" maxlength="100" value="' + $this.attr('data-url') + '" placeholder="按钮链接" id="btn_url"></div>');
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
         *//**
         * 调节层级关系
         *//*
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

         //按钮链接文本框失去焦点时赋值
         $('#btn_url').blur(function () {
         if ($.trim($(this).val()) == 0) {
         $this.attr('href', 'javascript:;');
         } else {
         var url = $.trim($(this).val());
         url = url.indexOf("http://") != -1 ? url : "http://" + url;
         $this.attr('data-url', url);
         }

         })


         //按钮文字输入文本框
         var text = $.trim($this.text());
         $('#btn_text').val(text);
         $('#btn_text').keyup(function () {
         //modal.showAlert($.trim($(this).val()).length);
         $this.text($(this).val());

         $(this).attr('placeholder', text);
         });
         $('#btn_text').blur(function () {
         //modal.showAlert($.trim($(this).val()).length);
         if ($.trim($(this).val()).length == 0) {
         $this.text(text);
         $(this).val(text);
         } else {
         $this.text($(this).val());
         }
         });*/

        initHdpBtn($this);

    });


    $('.phone-simulation').on('click', '.layoutbox', function (ev) {

        if(window.bgposition){
            window.bgposition.enable();
        }

        //让背景层出于激活状态
        $(".mid").find(".active").removeClass("active");
        $(this).parents(".phone").addClass("active");

        initHdpeditBg($('.layoutBg'));
    });


    $('.layoutBg').height('100%');
    //$('.layoutBg').draggable();
    initHdpeditBg($('.layoutBg'));

    //$('.phone-simulation').on('click', '.layoutBg', function () {
    //    initHdpeditBg($(this));
    //});

    /*function initHdpeditBg($this) {
     var bgpicker = new colorpicker(null, {color: $this.css('background-color')}, function (color) {
     $this.css({'background-color': color});
     });

     //修改图片尺寸
     var step = new steper({
     target: $this,
     css: 'background-size',
     default: $this.attr("bgsize-val")||50,
     max: $this.width() * 2,
     unit: '%',
     step:1
     }, function (data, val) {
     pro.update(data);
     if(window.bgposition){
     window.bgposition.updateConfig();
     }
     });
     var pro = new progressbar({
     target: $this,
     css: 'background-size',
     val:  ($this.attr("bgsize-val")/100)||0.5,
     max: $this.width() * 2
     }, function (data, val) {

     step.update(data);
     if(window.bgposition){
     window.bgposition.updateConfig();
     }
     });
     //旋转角度
     var step2 = new steper({
     target: $this,
     css: 'rotation',
     default: $this.attr('rotation-val') ? $this.attr('rotation-val')*100 : 0,
     max: 100,
     unit: '%'
     }, function (data, val) {
     pro2.update(val);
     });
     var pro2 = new progressbar({
     target: $this,
     css: 'rotation',
     val: $this.attr('rotation-val') ? $this.attr('rotation-val')*100 : 0,
     max: 100,
     pre: true
     }, function (data, val) {
     step2.update(val);
     });
     //模糊程度
     var step3 = new steper({
     target: $this,
     css: 'blur',
     default: $this.attr('blur-val') ? Math.round(15*($this.attr('blur-val')/100)) : 0,
     max: 15,
     unit: '级'
     }, function (data, val) {
     pro3.update(val);
     });
     var pro3 = new progressbar({
     target: $this,
     css: 'blur',
     val: $this.attr('blur-val') ? $this.attr('blur-val')/100 : 0,
     max: 15
     }, function (data, val) {
     step3.update(val);
     });


     $('.stitle').text('背景设置');

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
     $('#target2').append(bgpicker.getInputArea());

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

     //创建图片上传控件
     var uploader = WebUploader.create({

     // swf文件路径
     swf: '/js/Uploader.swf',

     // 文件接收服务端。
     server: 'http://115.28.140.9/tangwenhui/testPHP/uploadImages.php',

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
     $this.css({'background-image': 'url(' + src + ')','background-size':file._info.width+'px '+file._info.height+'px'});
     window.bgposition = new bg_position({target: $this, helper: $('.layoutbox'),islimit:true});//绑定背景移动组件

     }, 1, 1);
     });
     }*/

    /**
     * 文本编辑项
     */
    $('.phone-simulation').on('click', '.hdp-textarea', function (ev) {

        sb(ev);

        var canInput = $(this).attr('data-input');

        $('a[href="#profile"]').parent().addClass('active').siblings().removeClass('active');
        $('#profile').addClass('active').siblings().removeClass('active');
        var $this = $(this);

        //modal.showAlert('文本编辑项');

        /*var bgpicker = new colorpicker(null, {color: $this.css('background-color')}, function (color) {
         $this.css({'background-color': color});
         });
         var color = new colorpicker(null, {color: $this.css('color')}, function (color) {
         $this.css({'color': color});
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

         $('.title').text('文本样式设置');
         $('#target2').empty();
         $('#target3').empty();
         $('#target4').empty();
         $('.img-set').hide();

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
         $('#target3').append('<div class="setComn-label input-lable" >文本内容：</div>');
         $('#target3').append('<br/>');
         $('#target3').append('<div class="content-set"> <textarea cols="20" maxlength="300" placeholder="文本内容" id="a_text"></textarea></div>');
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

         if (canInput == "false") {
         $('#a_text').prop('disabled', 'disabled').val('注意:根据礼品信息动态修改，无法手动修改');
         $('.input-lable').html($('.input-lable').html() + '<p>(注意:根据礼品信息动态修改，无法手动修改)</p>')
         }

         *//**
         * 调节层级关系
         *//*
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


         //按钮文字输入文本框
         //var text = $.trim($this.text());
         //$('#btn_text').val(text);
         //$('#btn_text').keyup(function () {
         //    //modal.showAlert($.trim($(this).val()).length);
         //    $this.text($(this).val());
         //
         //    $(this).attr('placeholder',text);
         //});
         //$('#btn_text').blur(function () {
         //    //modal.showAlert($.trim($(this).val()).length);
         //    if($.trim($(this).val()).length==0){
         //        $this.text(text);
         //        $(this).val(text);
         //    }else{
         //        $this.text($(this).val());
         //    }
         //});

         //按钮文字输入文本框
         var text = $.trim($this.find('.text-main').text());
         $('#a_text').val($.trim($this.find('.text-main').text()));
         $('#a_text').keyup(function () {
         $this.find('.text-main').text($.trim($(this).val()));
         });
         $('#a_text').blur(function () {
         //modal.showAlert($.trim($(this).val()).length);
         if ($.trim($(this).val()).length == 0) {
         $this.text(text);
         $(this).val(text);
         } else {
         $this.text($(this).val());
         }
         });
         style($this);*/

        initHdpTextarea($this);

        if (canInput == "false") {
            $('#a_text').prop('disabled', 'disabled').val('注意:根据礼品信息动态修改，无法手动修改');
            $('.input-lable').html($('.input-lable').html() + '<p>(注意:根据礼品信息动态修改，无法手动修改)</p>')
        }
    });

    var url = "";
    $('.uploadBtn').click(function () {

        save($(this));

    });

    //提交
    function save($this, sub, success) {


        if (!sub) {//是否直接提交
            var p =$this.attr("data-step")?$this.attr("data-step"):hdpUrl.get("page") ;
            var type = $('.step.current').parent().clone().attr('data-name');
            if ( p != "4") {
//                $('.link1 a,.link2 a,.link3 a').removeClass('active').removeClass('current');
            }
            var html = $('.phone').clone();
            html.find('.btn-current').remove();
            if (!p) {

                $this.attr("data-step", 1);
//                $('.link1 a').addClass('active');
//                $('.link2 a').addClass('current');
//                $('.link3 a').removeClass('active');
                saveHtml(type, html.html(), function () {
                    // location.href = "/html/activities_step3_5.html?id=" + hdpUrl.get("id") + "&page=" + $('.link1').attr('data-hash');
                    modal.resetBtns([{
                        id:"edit",
                        name : "确定",
                        listener:function(modal){
                        	window.location.href = rootUrl +"/prizeResult?id="+hdpUrl.get("id")+"&page=2";
                        }
                    }]);
                    modal.showWithTitle("保存成功");
                });

            } else if (p == "1") {
                $this.attr("data-step", 2);
//                $('.link1 a').addClass('active');
//                $('.link2 a').addClass('current');
                saveHtml(type, html.html(), function () {
                    //location.href = "/html/activities_step3_5.html?id=" + hdpUrl.get("id") + "&page=" + $('.link2').attr('data-hash');
                    modal.resetBtns([{
                        id:"edit",
                        name : "确定",
                        listener:function(modal){
                        	window.location.href = rootUrl +"/prizeResult?id="+hdpUrl.get("id")+"&page=2";
                        }
                    }]);
                    modal.showWithTitle("保存成功");
                });

            } else if (p == "2") {
                $this.attr("data-step", 3);
//                $('.link1 a').addClass('active');
//                $('.link2 a').addClass('active');
//                $('.link3 a').addClass('current');
                saveHtml(type, html.html(), function () {
                    //location.href = "/html/activities_step3_5.html?id=" + hdpUrl.get("id") + "&page=" + $('.link3').attr('data-hash');
                    modal.resetBtns([{
                        id:"edit",
                        name : "确定",
                        listener:function(modal){
                        	window.location.href = rootUrl +"/prizeResult?id="+hdpUrl.get("id")+"&page=3";
                        }
                    }]);
                    modal.showWithTitle("保存成功");
                });
            }else if(p=="3"){
                $this.attr("data-step", 3);
//                $('.link1 a').addClass('active');
//                $('.link2 a').addClass('active');
//                $('.link3 a').addClass('current');
                saveHtml(type, html.html(), function () {
                    //location.href = "/html/activities_step3_5.html?id=" + hdpUrl.get("id") + "&page=" + $('.link3').attr('data-hash');

                    modal.showAlert("保存成功");
                });
            }
        }
        //var myhtml = $('.phone').clone();
        //myhtml.find('.btn-current').remove();
        //if(!$this.attr("data-step")){
        //    if(!p){
        //
        //        steps["step1"] = myhtml.html();
        //    }else{
        //        alert(p);
        //        steps["step"+p] = myhtml.html();
        //    }
        //}
        //if($this.attr("data-step")!="completed"){
        //
        //    steps["step"+$this.attr('data-step')] = myhtml.html();
        //}
        //
        //console.log(steps);
        //submitHtml(steps,success);
    }
    function saveHtml(type, html, success) {
        var url =   "http://qingting.huosu.com/index.php/active/active_submit3_5";
        var html = $('.phone').clone();
        $.ajax(url,{
            data: {
                id: hdpUrl.get("id"),
                html: html.html()
            }, 
            type: "post",
            
            success: function (data, textStatus) {
                 if (data>0) { 
                    window.location.href='./begame4?id='+data;
                } else { 
                    window.modal.showAlert(data);
                } 
            } 
        });
    }
    //function submitHtml(steps,success){
    //    var url = rootUrl + "/prizeResult/save.json";
    //    console.log(steps);
    //    $.ajax(url, {
    //        data: $.extend({
    //            id: hdpUrl.get('id')
    //        }, steps),
    //        dataType: "json",
    //        type: "post",
    //        success: function (data, textStatus) {
    //            //next();
    //            if (success)
    //                success();
    //        },
    //        error: function (data, textStatus) {
    //            // next();
    //        }
    //    });
    //}

    var type;
    $('.link1,.link2,.link3').click(function () {
        initStep();
        var _this = $(this);
        type = $('.step.current').parent().clone().attr('data-name');

        $(this).find('a').addClass('current').end().siblings().find('a').not('.completed').removeClass('current');
        //$(this).find('a').removeClass('active');
        //$('.current').addClass('active').removeClass('current');
        //$(this).find('a').addClass('current').end().siblings().find('a').not('.completed').removeClass('current');
        //$('.uploadBtn').attr('data-step',$(this).attr('data-hash'));

        var myhtml = $('.phone').clone();
        myhtml.find('.btn-current').remove();
        saveHtml(type, myhtml.html(), function (data) {
            window.location.href = rootUrl + "/prizeResult?id=" + hdpUrl.get('id') + "&page=" + _this.attr('data-hash');
        });
    });


    //自定义组建的拖放
    $('.custom-set .hdp-btn').draggable({
        "helper": "clone",
        "revert": true,
        "zIndex": 9999
    });
    $('.phone .lay-common').droppable({
        drop: function (ev, ui) {
            var bBtn = true;
            $('.phone .lay-common').find('.hdp-btn').each(function () {
                if ($(this).hasClass($.trim(ui.draggable.attr('data-id')))) {
                    bBtn = false;
                    return false;
                }
            });
            if (bBtn) {//可以添加
                var tool = ui.draggable.clone().find('a');
                tool.addClass('btn3 hdp-btn ' + ui.draggable.attr('data-id'));
                tool.insertAfter($('.hdp-btn:last'));
            } else {

                //modal.resetBtns();
                modal.showAlert('每种类型按钮只可以添加一个');
            }
        }
    });

});