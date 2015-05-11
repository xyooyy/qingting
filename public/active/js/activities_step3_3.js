/**
 * Created by kiner on 2015/1/15.
 */
$(function () {

    /**
     * 将页面上的一些小图标转换成base64格式，方便存储
     */
    convertImgToBase64($('.arrow-img img').attr('src'), function (base64) {
        $('.arrow-img img').attr('src', base64);
        $(document).ready(function () {
            $('.phone-simulation').find('.share-content').changeLayout();
        });
    });


    $('.pre').click(function () {
        pre();
    });
    $('.next').click(function () {
        saveConfig(function () {
            next();
        });
    });


    $('.uploadBtn').click(function () {
        saveConfig(function () {
            modal.showAlert("保存成功");
        });
    });

    function saveConfig(success) {
        var html = $('.mid').clone();
        //html.find('.btn-current').remove();
        var url = rootUrl+"/index.php/active/active_submit3_3";
        ids = hdpUrl.get("id");

        $.ajax(url, {
            data: {
                id: ids,
                html: html.html()
            },
            type: "post",
            success: function (data, text) {
                // alert(id);
                if (data > 0) {
                    window.location.href = './begame4?id=' + data;
                } else {
                    data = data.replace('ischou', '');

                    window.location.href = './begame3_4?id=' + data;
                    return false;

                    window.modal.showAlert(data);
                }
            }
        });
    }

    /**
     * 上一步
     */
    function pre() {
        window.location.href = hdpUrl.set(rootUrl + "/end", {"id": hdpUrl.get("id"), "ispre": true});//设置跳转网页及网页参数
    }

    /**
     * 下一步
     */
    function next() {
        window.location.href = hdpUrl.set(rootUrl + "/prize", "id", hdpUrl.get("id"));//设置跳转网页及网页参数
    }


    //为控件绑定移动插件
    $('.share-page').on('mouseover', '.hdp-btn,.hdp-textarea,.hdp-img', function () {
        var $this = $(this);
        if ($(".phone-simulation").hasClass("lay-custom")) {
            if ($('select[name="set-way"]').val() == "1") {
                $this.draggable('disable')
            } else {
                $this.draggable({
                    containment: ".phone",
                    //cursorAt: { top: -12, left: -20 },
                    cancel: ".close",

                    zIndex: 'auto',
                    zIndex: 99999,
                    //grid: [ $this.width(), $this.height() ],
                    handler: $this.find(".drag"),
                    start: function (ev, ui) {
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
    /**
     * 图片样式编辑
     */
    $('.phone-simulation').on('click', '.hdp-img', function () {
        var $this = $(this).find('img');


        initHdpImage($this, null, null, 100);//限制图片在100k以内

    });
    initHdpMask($('.mask'));//初始化显示编辑遮罩层的控件

    /**
     * 遮罩层样式编辑
     */
    $('.phone-simulation').on('click', '.mask', function () {
        var $this = $(this);
        initHdpMask($this);
    });


    /**
     * 文本样式编辑
     */
    $('.phone-simulation').on('click', '.hdp-textarea', function () {

        $('a[href="#profile"]').parent().addClass('active').siblings().removeClass('active');
        $('#profile').addClass('active').siblings().removeClass('active');
        var $this = $(this);
        /*console.log($this.html());

         //modal.showAlert('文本编辑项');

         var bgpicker = new colorpicker(null, {color: $this.css('background-color')}, function (color) {
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

         $('.title').text('文本设置');
         $('.tab').show();
         $('.stitle').hide();
         $('#target2').empty();
         $('#target3').empty();
         $('#target4').empty();
         $('.img-set').hide();
         $('#target3').append('<br/>');
         $('#target3').append('<br/>');
         $('#target3').append('<div class="setComn-label">文本内容：</div>');
         $('#target3').append('<br/>');
         $('#target3').append('<div class="content-set"> <textarea cols="20" maxlength="30" placeholder="文本内容" id="a_text"></textarea></div>');
         $('#target3').append('<hr/>');
         $('#target3').append('<div class="setComn-label">字体大小：</div>');
         $('#target3').append(pro5.getbody());
         $('#target3').append(step5.getbody());
         $('#target3').append('<br/>');
         $('#target3').append('<hr/>');
         $('#target2').append('<br/>');
         $('#target2').append('<br/>');
         $('#target2').append('<div class="setColor-label">背景颜色：</div>');
         $('#target2').append(bgpicker.getInputArea());
         $('#target2').append('<br/>');
         $('#target2').append('<hr/>');
         $('#target3').append('<div class="setColor-label">字体颜色：</div>');
         $('#target3').append(color.getInputArea());
         $('#target3').append('<br/>');
         $('#target3').append('<hr/>');
         $('#target3').append(' <div class="font-style">' +
         '<a class="bold" href="#1">' +
         ' B' +
         '</a>' +
         '<a class="italic" href="#1">' +
         ' I' +
         '</a>' +
         '<a class="underline" href="#1">' +
         ' U' +
         '</a>' +
         '</div>');


         $('#target4').append('<br/><br/><div class="setComm-label">顺序</div>'+
         '<div class="sequence-btn">'+
         '<div class="trimming">'+
         '<a href="#1" class="up-1">'+
         '前移'+
         '</a>'+
         '<a href="#1"class="down-1">'+
         '后移'+
         '</a>'+
         '</div>'+
         '<div class="control">'+
         '<a href="#1"class="up-all">'+
         '顶层'+
         '</a>'+
         '<a href="#1"class="down-all">'+
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


         //按钮文字输入文本框
         var text = $.trim($this.find('.text-main').text());
         $('#a_text').val($.trim($this.find('.text-main').text()));
         $(this).attr('placeholder',text);
         $('#a_text').keyup(function () {
         $this.find('.text-main').text($(this).val());

         });
         $('#a_text').blur(function () {
         if($.trim($(this).val()).length==0){
         $(this).val(text);
         $this.find('.text-main').text(text);
         }else{
         $this.find('.text-main').text($.trim($(this).val()));
         }
         });
         style($this);*/

        initHdpTextarea($this);
    });

});
