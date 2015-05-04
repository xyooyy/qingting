/**
 * Created by kiner on 2015/1/14.
 */
$(function () {


    $('.uploadBtn').click(function () {
        saveConfig(function () {
            modal.showAlert("保存成功");
        });
    });
    $('.next').click(function () {
        saveConfig(function () {
            next();
        });
    });

    function saveConfig(success) {
        var html = $('.phone').clone();
        //html.find('.btn-current').remove();
        var url =   "http://qingting.huosu.com/index.php/active/active_submit3_2";
        //alert(html.html());
        $.ajax(url, {
            data: {
                id: hdpUrl.get("id"),
                html: html.html()
            }, 
            type: "post",
            success: function (data, text) {
                if (data>0) {
                    window.location.href='./begame3_3?id='+data;
                } else {
                    window.modal.showAlert(data);
                } 
            } 
        });
    }

    $('.pre').click(function () {
        pre();
    });

    $('.phone-simulation').on('click', '.hdp-btn,.hdp-textarea,.hdp-img,.hdp-widget-group,.hdp-input-text', function (ev) {
        sb(ev);
        if (window.bgposition) {
            window.bgposition.disable();

        }
    });
    /**
     * 上一步
     */
    function pre() {
        window.location.href = hdpUrl.set(rootUrl + "/begin", {"id": hdpUrl.get("id"), "ispre": true});//设置跳转网页及网页参数
    }

    /**
     * 下一步
     */
    function next() {
        window.location.href = hdpUrl.set(rootUrl + "/share", "id", hdpUrl.get("id"));//设置跳转网页及网页参数
    }


    //为控件绑定移动插件
    $('.phone .lay-common').on('mouseover', '.hdp-btn,.hdp-textarea', function () {
        var $this = $(this);
        if ($(".phone-simulation").hasClass("lay-custom")) {
            if ($('select[name="set-way"]').val() == "1") {
                $this.draggable('disable')
            } else {
                $this.draggable({
                    containment: ".phone",
                    //cursorAt: { top: -12, left: -20 },
                    cancel: ".close",
                    grid: [$this.width() + 10, $this.height() + 10],
                    handler: $this.find(".drag"),
                    zIndex: 99999,
                    start: function (ev, ui) {
                    },
                    drag: function (ev, ui) {

                    },
                    stop: function (event, ui) {
                        //强制将控件的高度设为auto，防止器高度改变
                        $this.css({
                            'height': 'auto'
                        });


                    }
                });
                $this.draggable("enable");
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

    $('.layoutBg').height('100%');
    initHdpeditBg($('.layoutBg'));
    $('.phone-simulation').on('click', '.layoutbox', function (ev) {
        if (window.bgposition) {
            window.bgposition.enable();
        }

        //让背景层出于激活状态
        $(".mid").find(".active").removeClass("active");
        $(this).parents(".phone").addClass("active");

        initHdpeditBg($('.layoutBg'));

        sb(ev);
    });

    //禁止预览区的文本选中事件
    setSelectable($('.phone'), false);


    /**
     * 显示按钮编辑项
     */
    $('.phone .lay-common').on('click', '.hdp-btn', function (ev) {
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
         pre:true
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
         pre:true
         }, function (data, val) {
         step2.update(data);
         });
         var step2 = new steper({
         target: $this,
         css: 'border-radius',
         default: $this.attr('radius-val') ? $this.attr('radius-val') : 0,
         max: 100,
         step:1,
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
         pre:true
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

         var att = $this.attr('data-id');//判断按钮是否为关注我们按钮，以便进行特殊操作

         $('.title').text('按钮样式设置');
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
         if(att=="url"){
         $('#target3').append('<div class="setComn-label">按钮链接：</div>');
         $('#target3').append('<br/>');
         $('#target3').append('<div class="content-set"> <input type="text" maxlength="100" value="'+$this.attr('href')+'" placeholder="按钮链接" id="btn_url"></div>');
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
         $('#target4').append('<br/><br/><div class="setComm-label">顺序</div>'+
         '<div class="sequence-btn">'+
         '<div class="trimming">'+
         '<a href="javascript:;" class="up-1">'+
         '前移'+
         '</a>'+
         '<a href="javascript:;"class="down-1">'+
         '后移'+
         '</a>'+
         '</div>'+
         '<div class="control">'+
         '<a href="javascript:;"class="up-all">'+
         '顶层'+
         '</a>'+
         '<a href="javascript:;"class="down-all">'+
         '底层'+
         '</a>'+
         '</div>'+
         '</div><br/><br/>');

         if($this.hasClass('f-bold')){
         $('.bold').addClass('active');
         }
         if($this.hasClass('f-italic')){
         $('.italic').addClass('active');
         }
         if($this.hasClass('f-underline')){
         $('.underline').addClass('active');

         }
         */
        /**
         * 调节层级关系
         */
        /*
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
         $('#btn_url').blur(function(){
         if($.trim($(this).val())==0){
         $this.attr('href','javascript:;');
         }else{
         $this.attr('url',$.trim($(this).val()));
         }

         })

         //按钮文字输入文本框
         var text = $.trim($this.text());
         $('#btn_text').val(text);
         $(this).attr('placeholder',text);
         $('#btn_text').keyup(function () {
         //modal.showAlert($.trim($(this).val()).length);
         $this.text($(this).val());

         });
         $('#btn_text').blur(function () {
         //modal.showAlert($.trim($(this).val()).length);
         if($.trim($(this).val()).length==0){
         $this.text(text);
         $(this).val(text);
         }else{
         $this.text($(this).val());
         }
         });*/


        initHdpBtn($this);
    });


    /**
     * 文本编辑项
     */
    $('.phone .lay-common').on('click', '.hdp-textarea', function (ev) {

        sb(ev);

        $('a[href="#profile"]').parent().addClass('active').siblings().removeClass('active');
        $('#profile').addClass('active').siblings().removeClass('active');

        var $this = $(this);

        //modal.showAlert('文本编辑项');
        initHdpTextarea($this);

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
                tool.css('margin-left', '10px');
                tool.insertAfter($('.hdp-btn:last'));
            } else {

                //modal.resetBtns();
                modal.showAlert('每种类型按钮只可以添加一个');
            }
        }
    });

});