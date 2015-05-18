$(function () {
    /**
     * 判断抽奖结果页面哪个没设置
     */
    var tag = 0;

    initStep();

    /**
     * 根据网页参数判断当前出于第几步
     */
    function initStep() {
        var p = hdpUrl.get('page');
        $('.link1 a,.link2 a,.link3 a').removeClass('active').removeClass('current');

        $('.uploadBtn').attr('data-step', p);
        if (!p) {
            $('.link1 a').addClass('current');
        } else if (p == "1") {
            $('.link1 a').addClass('current');
        } else if (p == "2") {
            $('.link1 a').addClass('active');
            $('.link2 a').addClass('current');
        } else if (p == "3") {
            $('.link1 a').addClass('active');
            $('.link2 a').addClass('active');
            $('.link3 a').addClass('current');
        } else {
            $('.link1 a').addClass('active');
            $('.link2 a').addClass('active');
            $('.link3 a').addClass('active');
        }
    }


    $('.pre').click(function () {
        pre();
    });
    $('.next').click(function () {
        var type = $('.step.current').parent().clone().attr('data-name');

        var html = $('.phone').clone();
        //html.find('.btn-current').remove();
        saveHtml(type, html.html(), function () {
            next();
        });
    });

    /**
     * 上一步
     */
    function pre() {
        var id =  hdpUrl.get("id") || 1;
        var page = hdpUrl.get("page") || 1;

        if(page == 1){
            window.location.href = rootUrl + '/active/begame3_4?id=' + id;
        }else{
            window.location.href = rootUrl + '/active/begame3_5?id=' + id + '&page=' +  (parseInt(page) - 1);
        }
    }

    /**
     * 下一步
     */
    function next() {
        var id =  hdpUrl.get("id");
        var page = hdpUrl.get("page") || 1;

        if(page == 3){
            window.location.href = rootUrl + '/active/begame4?id=' + id
        }else{
            window.location.href = rootUrl + '/active/begame3_5?id=' + id + '&page=' +  (parseInt(page) + 1);
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

        if (window.bgposition) {
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

        initHdpInputText($this);

    });

    /**
     * 图片样式编辑
     */
    $('.phone-simulation').on('click', '.hdp-img', function (ev) {

        sb(ev);
        var $this = $(this).find('img');

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

        initHdpBtn($this);

    });


    $('.phone-simulation').on('click', '.layoutbox', function (ev) {

        if (window.bgposition) {
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


    /**
     * 文本编辑项
     */
    $('.phone-simulation').on('click', '.hdp-textarea', function (ev) {

        sb(ev);

        var canInput = $(this).attr('data-input');

        $('a[href="#profile"]').parent().addClass('active').siblings().removeClass('active');
        $('#profile').addClass('active').siblings().removeClass('active');
        var $this = $(this);

        initHdpTextarea($this);

        if (canInput == "false") {
            $('#a_text').prop('disabled', 'disabled').val('注意:根据礼品信息动态修改，无法手动修改');
            $('.input-lable').html($('.input-lable').html() + '<p>(注意:根据礼品信息动态修改，无法手动修改)</p>')
        }
    });


    $('.uploadBtn').click(function () {

        save($(this));

    });

    //提交
    function save($this, sub, success) {
        if (!sub) {//是否直接提交
            var current_page = $this.attr("data-step") ? $this.attr("data-step") : (hdpUrl.get("page") ? hdpUrl.get("page") : '1');
            var type = $('.step.current').parent().clone().attr('data-name');

            var html = $('.phone').clone();
            html.find('.btn-current').remove();
            if (current_page == "1") {
                saveHtml(type, html.html(), function () {
                    location.href = "/active/begame3_5?id=" + hdpUrl.get("id") + "&page=2" ;
                });

            } else if (current_page == "2") {
                saveHtml(type, html.html(), function () {
                    location.href = "/active/begame3_5?id=" + hdpUrl.get("id") + "&page=3";
                });
            } else if (current_page == "3") {
                saveHtml(type, html.html(), function () {
                    location.href = "/active/begame3_5?id=" + hdpUrl.get("id") + "&page=" + $('.link3').attr('data-hash');
                });
            }
        }
    }

    function saveHtml(type, html, success) {
        var url = rootUrl+"/index.php/active/active_submit3_5";
        var html = $('.phone').clone();
        $.ajax(url, {
            data: {
                'type': type,
                id: hdpUrl.get("id"),
                html: html.html()
            },
            type: "post",

            success: function (data, textStatus) {
                if (data > 0) {
                    success();
                    // window.location.href = './begame4?id=' + data;
                } else {
                    window.modal.showAlert(data);
                }
            }
        });
    }



    $('.link1,.link2,.link3').click(function () {
        var type;
        initStep();
        var _this = $(this);
        type = $('.step.current').parent().clone().attr('data-name');



        var myhtml = $('.phone').clone();
        myhtml.find('.btn-current').remove();
        saveHtml(type, myhtml.html(), function (data) {
            window.location.href = rootUrl + "/active/begame3_5?id=" + hdpUrl.get('id') + "&page=" + _this.attr('data-hash');
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
