$(function () {

    var v = $('.phone-simulation').attr('data-screen') ? $('.phone-simulation').attr('data-screen') : "1";
    v = v == 0 ? "1" : v;

    $('.phone-simulation').attr('data-screen', v);

    $('select[name="screen"]').val(v);

    //select美化
    Select.init({selector: 'select', value: v});


    $('.phone').css('width', $('.phone-simulation').width() + 4);


    changeLayout($('.phone-simulation').attr('data-screen'));

    //改变预览区分辨率
    $('select[name="screen"]').change(function () {
        var s = parseInt($('select[name = "screen"]').val());
        changeLayout(s);
    });

    footarea();

    function changeLayout(s) {
        var val = parseInt(s);

        switch (val) {
            case 1:
                $('.phone-simulation').attr('data-screen', 1);
                $(".phone,.share-page").css({"width": "320px", "height": (480) + "px"});

                break;
            case 2:

                $('.phone-simulation').attr('data-screen', 2);
                $(".phone,.share-page").css({"width": "320px", "height": (568) + "px"});
                break;
            case 3:
                $('.phone-simulation').attr('data-screen', 3);
                $(".phone,.share-page").css({"width": "375px", "height": (667) + "px"});
                break;

        }
        $('.start-btn').css({'right': '0px', 'left': ($('.phone').width() - $('.start-btn').width) / 2});
        footarea();
    }


    function footarea() {
        $('.footerArea').css({
            'position': 'absolute',
            'left': ($('.phone-simulation').width() - $('.footerArea').width()) / 2
        });

    }

    $('.phone-simulation[data-layout="common"]').find('.start-btn').css('right', 20);

    //滑动页面选择
    $("#swiper-choice li").click(function () {
        $(".choice-layout").find(".active").removeClass("active");
        $(this).addClass("active");
        if ($(this).hasClass("lay1")) {
            $(".swiper-container").find(".start-btn").removeClass("cc").removeClass("cb");
            $(".swiper-container").find(".start-btn").addClass("tr");
        }
        else if ($(this).hasClass("lay2")) {
            $(".swiper-container").find(".start-btn").removeClass("tr").removeClass("cb");

            $(".swiper-container").find(".start-btn").addClass("cc");
        }
        else {
            $(".swiper-container").find(".start-btn").removeClass("tr").removeClass("cc");

            $(".swiper-container").find(".start-btn").addClass("cb");
        }
    });
    //选择默认布局
    $(".choice-layout li").click(function () {
        $(".choice-layout").find(".active").removeClass("active");
        $(this).addClass("active");
        if ($(this).hasClass("lay1")) {
            $('.phone-simulation').attr('data-layout', 'common');
            $("#layStyle").attr("href", rootUrl + "/public/active/css/common/css/layout.css");
            $('#laySwiper').attr("href", rootUrl + "/public/active/css/common/css/swiper.css");
            //$('.hdp-btn,.hdp-textarea,.hdp-img').css({top: '', left: '', right: '0', bottom: ''});
            $('.start-btn').css('right', '20px');
        }
        else if ($(this).hasClass("lay2")) {
            $('.phone-simulation').attr('data-layout', 'symmetric');
            $("#layStyle").attr("href", rootUrl + "/public/active/css/symmetric/css/layout.css");
            $('#laySwiper').attr("href", rootUrl + "/public/active/css/symmetric/css/swiper.css");
            //$('.hdp-btn,.hdp-textarea,.hdp-img').css({top: '', left: '', right: '23%', bottom: ''});
            $('.start-btn').css({'right': '0px', 'left': ($('.phone').width() - $('.start-btn').width) / 2});
        }
        else {
            $('.phone-simulation').attr('data-layout', 'vertical');
            $("#layStyle").attr("href", rootUrl + "/public/active/css/vertical/css/layout.css");
            $('#laySwiper').attr("href", rootUrl + "/public/active/css/vertical/css/swiper.css");
            //$('.hdp-btn,.hdp-textarea,.hdp-img').css({top: '', left: '', right: '23%', bottom: ''});

            $('.start-btn').css({'right': '0px', 'left': ($('.phone').width() - $('.start-btn').width) / 2});
        }
    });


//    $('.hdp-btn').focus(function(){
//        $(this).get(0).tempColor = $.RGB2HEX($(this).css('color'));
//        $(this).css('color',$.oppositeColor($.RGB2HEX($(this).css('background-color'))));
//    }).blur(function(){
//        $(this).css('color',$(this).get(0).tempColor);
//    });

    //文字样式选中
    $(".font-style a").click(function () {
        $(".font-style a").removeClass("active");
        $(this).addClass("active");
    });

    //编辑滑动页面按钮
    $(".phone-simulation .swiper-slide img").click(function () {
        $(".right").children(".img-load").show();
        $(".right").children(".btn-set").hide();
        $(".mid").find(".active").removeClass("active");
        $(this).parents(".phone").addClass("active");
    });
    $(".phone-simulation .start-btn").click(function () {
        $(".right").children(".img-load").hide();
        $(".right").children(".btn-set").show();
        $(".mid").find(".active").removeClass("active");
        $(this).addClass("active");
    });

    //改变设定模式 自定义设置/一键设置
    $('select[name = "set-way"]').change(function () {
        var s = parseInt($('select[name = "set-way"]').val());
        switch (s) {
            case 1:
                $(".choice-layout").show();
                $(".custom-set").hide();
                $(".phone-simulation").removeClass("lay-custom");
                break;
            case 2:
                $(".choice-layout").not('#swiper-choice').hide()
                $(".custom-set").not('#swiper-choice').show();
                $(".phone-simulation").addClass("lay-custom");
                $('.left').append('&nbsp;');
                break;
        }
        ;
        initMenu();


    });


    function initMenu() {
        //鼠标移动上按钮出现设置菜单
        if ($(".phone-simulation").hasClass("lay-custom") && $('.custom-menu').length == 0) {
            //轮播图页面
            $('.phone .lay-common').on('mouseover', '.hdp-btn', function () {
                if ($(".phone-simulation").hasClass("lay-custom") && $('.custom-menu').length == 0) {
                    $(this).append('<div class="custom-menu"><ul><li class="drag" ><span><i class="icon-drag"></i>拖动</span></li><li class="close"><span><i class="icon-close"></i>删除</span></li></ul></div>');
                }
                //$(".lay-custom .hdp-btn[data-id='hdp-start-btn']").find('.close').click(function () {
                //    $(".lay-custom .hdp-btn[data-id='hdp-start-btn']").remove();
                //});
            });
            $('.phone .lay-common').on('mouseleave', '.hdp-btn', function () {
                $(this).children(".custom-menu").remove();
            });
            //文本区域
            $('.phone .lay-common').on('mouseover', '.textArea', function () {

                if ($(".phone-simulation").hasClass("lay-custom") && $('.custom-menu').length == 0) {
                    $(this).append('<div class="custom-menu"><ul><li class="drag"><span><i class="icon-drag"></i>拖动</span></li><li class="close"><span><i class="icon-close"></i>删除</span></li></ul></div>');
                }
            });
            $('.phone .lay-common').on('mouseleave', '.textArea', function () {
                $(this).children(".custom-menu").remove();
            });

            //按钮组
            $('.phone .lay-common').on('mouseover', '.btnArea a', function () {
                if ($(".phone-simulation").hasClass("lay-custom") && $('.custom-menu').length == 0) {
                    $(this).append('<div class="custom-menu"><ul><li class="drag"><span><i class="icon-drag"></i>拖动</span></li><li class="close"><span><i class="icon-close"></i>删除</span></li></ul></div>');
                }
            });
            $('.phone .lay-common').on('mouseleave', '.btnArea a', function () {
                $(this).children(".custom-menu").remove();
            });

            //版权区域
            $('.phone .lay-common').on('mouseover', '.footerArea .homepage', function () {

                if ($(".phone-simulation").hasClass("lay-custom") && $('.custom-menu').length == 0) {
                    $(this).append('<div class="custom-menu"><ul><li class="drag"><span ><i class="icon-drag"></i>拖动</span></li><li class="close"><span><i class="icon-close"></i>删除</span></li></ul></div>');
                }
            });
            $('.phone .lay-common').on('mouseleave', '.footerArea .homepage', function () {
                $(this).children(".custom-menu").remove();
            });
            $('.phone .lay-common').on('mouseover', '.footerArea .copyright', function () {

                if ($(".phone-simulation").hasClass("lay-custom") && $('.custom-menu').length == 0) {
                    $(this).append('<div class="custom-menu"><ul><li class="drag"><span><i class="icon-drag"></i>拖动</span></li><li class="close"><span><i class="icon-close"></i>删除</span></li></ul></div>');
                }
            });
            $('.phone .lay-common').on('mouseleave', '.footerArea .copyright', function () {
                $(this).children(".custom-menu").remove();
            });


            //分享页
            $('.share-page').on('mouseover', '.arrow-img', function () {
                if ($(".phone-simulation").hasClass("lay-custom") && $('.custom-menu').length == 0) {
                    $(this).append('<div class="custom-menu"><ul><li class="drag"><span><i class="icon-drag"></i>拖动</span></li><li class="close"><span><i class="icon-close"></i>删除</span></li></ul></div>');
                }
            });
            $('.share-page').on('mouseleave', '.arrow-img', function () {
                $(this).children(".custom-menu").remove();
            });
            $('.share-page').on('mouseover', '.share-text h3', function () {

                if ($(".phone-simulation").hasClass("lay-custom") && $('.custom-menu').length == 0) {
                    $(this).append('<div class="custom-menu"><ul><li class="drag"><span><i class="icon-drag"></i>拖动</span></li><li class="close"><span><i class="icon-close"></i>删除</span></li></ul></div>');
                }
            });
            $('.share-page').on('mouseleave', '.share-text h3', function () {
                $(this).children(".custom-menu").remove();
            });
            $('.share-page').on('mouseover', '.share-text p', function () {

                if ($(".phone-simulation").hasClass("lay-custom") && $('.custom-menu').length == 0 && $('.custom-menu').length == 0) {
                    $(this).append('<div class="custom-menu"><ul><li class="drag"><span><i class="icon-drag"></i>拖动</span></li><li class="close"><span><i class="icon-close"></i>删除</span></li></ul></div>');
                }
            });
            $('.share-page').on('mouseleave', '.share-text p', function () {
                $(this).children(".custom-menu").remove();
            });

            //奖品显示页
            $('.lay-common').on('mouseover', '.prize-show .prize-litpic', function () {

                if ($(".phone-simulation").hasClass("lay-custom") && $('.custom-menu').length == 0) {
                    $(this).append('<div class="custom-menu"><ul><li class="drag"><span><i class="icon-drag"></i>拖动</span></li><li class="close"><span><i class="icon-close"></i>删除</span></li></ul></div>');
                }
            });
            $('.lay-common').on('mouseleave', '.prize-show .prize-litpic', function () {
                $(this).children(".custom-menu").remove();
            });

            $('.lay-common').on('mouseover', '.prize-show p', function () {

                if ($(".phone-simulation").hasClass("lay-custom") && $('.custom-menu').length == 0) {
                    $(this).append('<div class="custom-menu"><ul><li class="drag"><span><i class="icon-drag"></i>拖动</span></li><li class="close"><span><i class="icon-close"></i>删除</span></li></ul></div>');
                }
            });
            $('.lay-common').on('mouseleave', '.prize-show p', function () {
                $(this).children(".custom-menu").remove();
            });

        }
        else {
            //轮播图页
            $(".hdp-btn[data-id='hdp-start-btn']").hover(function () {
                $(this).children(".custom-menu").remove();
            });
            $(".hdp-btn[data-id='hdp-start-btn']").mouseleave(function () {
                $(this).children(".custom-menu").remove();
            });
            //文本区域
            $(".textArea").hover(function () {
                $(this).children(".custom-menu").remove();
            });
            $(".textArea").mouseleave(function () {
                $(this).children(".custom-menu").remove();
            });
            //按钮组
            $(".btnArea a").hover(function () {
                $(this).children(".custom-menu").remove();
            });
            $(".btnArea a").mouseleave(function () {
                $(this).children(".custom-menu").remove();
            });
            //版权区域
            $(".footerArea .homepage").hover(function () {
                $(this).children(".custom-menu").remove();
            });
            $(".footerArea .homepage").mouseleave(function () {
                $(this).children(".custom-menu").remove();
            });
            $(".footerArea .copyright").hover(function () {
                $(this).children(".custom-menu").remove();
            });
            $(".footerArea .copyright").mouseleave(function () {
                $(this).children(".custom-menu").remove();
            });
            //分享区域
            $(".arrow-img").hover(function () {
                $(this).children(".custom-menu").remove();
            });
            $(".arrow-img").mouseleave(function () {
                $(this).children(".custom-menu").remove();
            });
            $(".share-text h3").hover(function () {
                $(this).children(".custom-menu").remove();
            });
            $(".share-text h3").mouseleave(function () {
                $(this).children(".custom-menu").remove();
            });
            $(".share-text p").hover(function () {
                $(this).children(".custom-menu").remove();
            });
            $(".share-text p").mouseleave(function () {
                $(this).children(".custom-menu").remove();
            });

            //奖品显示页
            $(".prize-show .prize-litpic").hover(function () {
                $(this).children(".custom-menu").remove();
            });
            $(".prize-show .prize-litpic").mouseleave(function () {
                $(this).children(".custom-menu").remove();
            });
            $(".prize-show p").hover(function () {
                $(this).children(".custom-menu").remove();
            });
            $(".prize-show p").mouseleave(function () {
                $(this).children(".custom-menu").remove();
            });

        }
    }


    //编辑页面内元素
    $(".layoutArea .textArea").click(function () {
        $(".mid").find(".active").removeClass("active");
        $(this).addClass("active");
    });

    $(".layoutArea .btnArea a").click(function () {
        $(".mid").find(".active").removeClass("active");
        $(this).addClass("active");
    });

    $(".layoutBg").click(function () {
        $(".mid").find(".active").removeClass("active");
        $(this).parents(".phone").addClass("active");
    });
    //奖品展示页面
    $(".prize-show .prize-litpic").click(function () {
        $(".mid").find(".active").removeClass("active");
        $(this).addClass("active");
    });

    $(".prize-show p").click(function () {
        $(".mid").find(".active").removeClass("active");
        $(this).addClass("active");
    });
    //版权区域选中
    $(".footerArea div").click(function () {
        $(".mid").find(".active").removeClass("active");
        $(this).addClass("active");
    });

    //分享页排版编辑
    $(".share-content .arrow-img").click(function () {
        $(".share-content").find(".active").removeClass("active");
        $(this).addClass("active");
    });
    $(".share-content .share-text h3").click(function () {
        $(".share-content").find(".active").removeClass("active");
        $(this).addClass("active");
    });
    $(".share-content .share-text p").click(function () {
        $(".share-content").find(".active").removeClass("active");
        $(this).addClass("active");
    });

    if ($('.lay-common').attr('data-layout')) {
        $('#layStyle').attr('href', rootUrl + '/public/active/css/' + $('.lay-common').attr('data-layout') + '/css/layout.css?ver=20150121161235');
        $('.' + $('.lay-common').attr('data-layout')).addClass('active').siblings().removeClass('active');
    }

    //页面初始化时，将选择操作方式置为默认，即一键设置
    $("select[name='set-way']").find('option:first').prop("selected", 'selected');

});
//禁止预览区的文本选中事件
setSelectable($('body'), false);

var confirmBtn = [
    {
        id: "ok",
        name: "确定",
        listener: function () {
            $.ajax($('.submit-group .reset').attr('data-url'), {
                data: {
                    id: hdpUrl.get("id"),
                    html: "",
                    alreadyWinningHtml: "",
                    depleteChanceHtml: "",
                    notWinningHtml: ""
                },
                dataType: "json",
                type: "post",
                success: function (data, textStatus) {
                    if (data.success) {
                        window.location.reload();
                    } else {

                        modal.showAlert(data.msg);
                    }
                },
                error: function (data, textStatus) {
                    modal.showAlert('网络访问异常');
                }
            });
            //此处写重置请求
            //modal.showWithTitle("重置成功",true);
            modal.hide();
        }
    },

    {
        id: "close",
        name: "取消",
        classes: ['modalClose'],
        listener: function (modal) {
            modal.hide();
        }
    }
];

$('.submit-group').on('click', '.reset', function () {
    modal.resetBtns(confirmBtn);
    modal.showWithTitle("确认后，本页面的所有设置将恢复至初始化状态，并且无法恢复，您确认继续吗？");
});
