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
                    success();
                    // window.location.href = './begame4?id=' + data;
                } else {
                    data = data.replace('ischou', '');
                    success();
                    // window.location.href = './begame3_4?id=' + data;
                    return false;

                    window.modal.showAlert(data);
                }
            }
        });
    }

    /**
     * 下一步
     */
    function next() {
        window.location.href =rootUrl + "/index.php/active/begame3_4?id="+ hdpUrl.get("id");
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

        initHdpTextarea($this);
    });

});
