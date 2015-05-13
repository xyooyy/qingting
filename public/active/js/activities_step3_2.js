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

    function next(){
        window.location.href = rootUrl + '/index.php/active/begame3_3?id=' + hdpUrl.get("id");
    }

    function saveConfig(success) {
        var html = $('.phone').clone();
        var url = rootUrl+"/index.php/active/active_submit3_2";
        $.ajax(url, {
            data: {
                id: hdpUrl.get("id"),
                html: html.html()
            },
            type: "post",
            success: function (data, text) {
                if (data > 0) {
                    success();
                    // window.location.href = './begame3_3?id=' + data;
                } else {
                    window.modal.showAlert(data);
                }
            }
        });
    }


    $('.phone-simulation').on('click', '.hdp-btn,.hdp-textarea,.hdp-img,.hdp-widget-group,.hdp-input-text', function (ev) {
        sb(ev);
        if (window.bgposition) {
            window.bgposition.disable();

        }
    });


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
