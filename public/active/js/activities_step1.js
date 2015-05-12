$(function () {


    //模态框自定义按钮组
    var confirmBtn = [
        {
            id: "ok",
            name: "确定并完成下一步",
            listener: function () {
                next(1);
            }
        },

        {
            id: "close",
            name: "关闭",
            classes: ['window.modalClose'],
            listener: function (modal) {
                modal.hide();
            }
        }
    ];

    var $sceneVal = $('input[name="scene"]:checked');
    if ($sceneVal.val() == 1) {
        $('input[name="hasPrize"]').iCheck('disable');
    }
    if ($sceneVal.val() == 7) { // 商业场景7不需要微信分享，另外还会增加"奖品缩略图"
        $(".wx-share").hide();
        $('.new-eggs-info').show();
        $('.has-prize').hide();
    } else {
        $(".wx-share").show();
        $('.new-eggs-info').hide();
        $('.has-prize').show();
    }
    $('input[name="scene"]').on("ifChanged", function () {
        if ($(this).val() == "1") {
            $('input[name="hasPrize"]').eq(1).iCheck('check');
            $('input[name="hasPrize"]').iCheck('disable');
        } else {
            $('input[name="hasPrize"]').iCheck('enable');
        }
        if ($(this).val() == "7") {
            $(".wx-share").hide();
            $('.new-eggs-info').show();
            $('.has-prize').hide();
        } else {
            $(".wx-share").show();
            $('.new-eggs-info').hide();
            $('.has-prize').show();
        }
    });

    //时间控件选择器调用和初始化
    $('.date-picker').datetimepicker({
        lang: 'ch',
        step: 10,
        format: "Y-m-d H:i",
        timepicker: true,
        showSecond: false,
        scrollMonth: false,
        scrollTime: false,
        scrollInput: false,
        minDate: new Date(),
        beforeShow: getCurrentTime,
        onChangeDateTime: function (dp, $input) {
            $(".xdsoft_datetimepicker").hide();
        }
    });
    getCurrentTime();
    function getCurrentTime() {
        $(".ui-datepicker-current").click();
    }

    //单选，多选化
    $('.btn-all input, .check input, .comm-form input[type="radio"]').iCheck({
        checkboxClass: 'icheckbox_polaris',
        radioClass: 'iradio_polaris'
    });

    //活动名称帮助提示点击触发
    $(".icon-prompt").click(function () {
        $(this).hide();
        $(".prompt-text").show();
    });

    //选择商业场景
    $('input[name="scene"]').on("ifChanged", function () {
        var c = parseInt($(this).val());
        switch (c) {
            case 1:

                $(".commercial-content h3").text("品牌传播");
                $(".commercial-content p").text("在品牌宣传的同时加入游戏，令传播更生动有趣，后续不设置奖励实现销售转化。");
                $(".code img").attr('src', rootUrl + '/assets/images/scene-demo/1.jpg');
                break;
            case 2:
                $(".commercial-content h3").text("微信关注");
                $(".commercial-content p").text("商家撰写微信关注的引导性文章，并在官微中设置【我要兑奖】的链接。用户通过文章关注官微，并在官微中进行兑换操作，以便达成吸粉目的，建议月度或季度执行一次。");
                $(".code img").attr('src', rootUrl + '/assets/images/scene-demo/2.jpg');
                break;
            case 3:
                $(".commercial-content h3").text("商城引流");
                $(".commercial-content p").text("适合电商购物平台及电商卖家派发优惠券，把微信用户引流到商城，实现电商销售转化。建议商家通过网上受认证的软件生成优惠券链接，并在活动中奖页面中做好优惠券兑换的操作指引。");
                $(".code img").attr('src', rootUrl + '/assets/images/scene-demo/3.jpg');
                break;
            case 4:
                $(".commercial-content h3").text("线下引流");
                $(".commercial-content p").text("适合实体店、连锁店使用，商家多以代金券、优惠券作为活动奖励，在中奖页面中显示实体店具体位置信息，最终引流到店，实现消费。");
                $(".code img").attr('src', rootUrl + '/assets/images/scene-demo/5.jpg');
                break;
            case 5:
                $(".commercial-content h3").text("展会活动");
                $(".commercial-content p").text("针对展会特点，该场景设有两种兑奖方式，供商家选用，第一种是用户分享活动到朋友圈即可兑奖，第二种是用户关注官微进行兑奖操作。");
                $(".code img").attr('src', rootUrl + '/assets/images/scene-demo/5.jpg');
                break;
            case 6:
                $(".commercial-content h3").text("销售线索收集");
                $(".commercial-content p").text("用户体验最佳的商业场景，玩游戏填写姓名、手机及地址，坐等商家邮寄礼品到家。最终帮助商家收集销售线索，其中以汽车、保险等传统行业尤为适用。");
                $(".code img").attr('src', rootUrl + '/assets/images/scene-demo/6.jpg');
                break;
        }
    });

    //获取表单的值
    var $formActivity = $('.comm-form');
    $formActivity.on('click', '.next', function () {


        //保存
        var name = $formActivity.find("input[name='actName']").val();
        if (name == "") {
            window.modal.showAlert("活动名称不能为空，请您填写。");
            return false;
        }
        var name = $formActivity.find("input[name='wxTitle']").val();
        if (name == "") {
            window.modal.showAlert("微信分享标题不能为空，请您填写。");
            return false;
        }
        var name = $formActivity.find("textarea[name='wxDesc']").val();
        if (name == "") {
            window.modal.showAlert("微信分享描述不能为空，请您填写。");
            return false;
        }
        var startTime = $formActivity.find("input[name='startTime']").val() + ':00';
        var endTime = $formActivity.find("input[name='endTime']").val() + ':00';
        var start = new Date(startTime.replace(/\-/g,'/'));
        var end = new Date(endTime.replace(/\-/g,'/'));
        if(end.getTime() - start.getTime() < 86400000){
            window.modal.showAlert("您选得时间区域为无效时间，请重新填写");
            return false;
        }        /* var name = $formActivity.find("input[name='wxImg']").val();
         if (name == "") {
         window.modal.showAlert("微信分享缩图不能为空，请您上传图片。");
         return false;
         }*/

        else {
            //window.modal.showAlert($('form').serialize());
            submitForm($('form').serialize());//提交数据    kiner
        }
    });

    var timer;
    if ($('.wx-avatar-upload').find('img').attr('src').length != 0) {

        $('.wx-avatar-upload').find('.inner').addClass('bg');
        $('.wx-avatar-upload').find('.inner').hide();
    }
    $('.wx-avatar-upload').on("mouseover", "img,.inner", function () {
        clearInterval(timer);
        $('.wx-avatar-upload').find('.inner').show();
    });
    $('.wx-avatar-upload').on("mouseout", "img,.inner", function () {
        timer = setInterval(function () {
            $('.wx-avatar-upload').find('.inner').hide();
        }, 30);
    });

    /**
     * kiner
     * 数据提交
     */
    function submitForm(data) {

        var url = rootUrl + "/index.php/active/active_submit";

        $.ajax(url, {
            data: data + '&step=1',
            type: "post",
            success: function (data) {
                if (data > 0) {
                    window.location.href = './begame2?id=' + data;
                } else {
                    window.modal.showAlert(data);
                }
            }
        });
    }

    /**
     * kiner
     * 跳转到下一页
     */
    function next(id) {
        var scene = $("input[name='scene']:checked").val();
        //活动的商业场景和所选的场景不一，并且有需要奖品
        var hasPrize = $("input[name='hasPrize']:checked").val();
        if (activityScene == '' || activityScene == scene) {
            window.location.href = hdpUrl.set("./gameChoose", "id", id);//设置跳转网页及网页参数
        }
        //活动场景发生变化
        if (activityScene != '' && activityScene != scene) {
            //重置【中奖结果页面】
            $.ajax({
                url: rootUrl + "/prizeResult/save.json",
                dataType: "json",
                type: "post",
                data: {
                    id: hdpUrl.get("id"),
                    html: "",
                    alreadyWinningHtml: "",
                    depleteChanceHtml: "",
                    notWinningHtml: ""
                },
                success: function (data) {
                    if (data.success) {
                        //活动下线
                        $.ajax({
                            url: rootUrl + "/offline.json",
                            dataType: "json",
                            type: "post",
                            data: {
                                id: hdpUrl.get("id")
                            },
                            success: function (data) {
                                if (data.success) {
                                    //活动场景发生变化并且需要奖品
                                    if (activityScene != scene && hasPrize == 1) {
                                        var btn = [
                                            {
                                                id: "ok",
                                                name: "前往设置",
                                                listener: function (modal) {
                                                    window.location.href = hdpUrl.set("./prizeResult", "id", id);
                                                }
                                            },
                                            {
                                                id: "close",
                                                name: "下一步",
                                                classes: ['modalClose'],
                                                listener: function (modal) {
                                                    modal.hide();
                                                    window.location.href = hdpUrl.set("./gameChoose", "id", id);
                                                }
                                            }
                                        ];
                                        window.modal.resetBtns(btn);
                                        window.modal.showWithTitle("检测到活动的商业场景有更变，我们已重置了【中奖结果】页的选项!");
                                    } else {
                                        window.location.href = hdpUrl.set("./gameChoose", "id", id);//设置跳转网页及网页参数
                                    }
                                }
                            },
                            error: function (data) {
                                modal.showAlert('系统给活动下线失败，请手动下线！');
                            }
                        });
                    }
                },
                error: function (data, textStatus) {
                    modal.showAlert('系统重置【中奖结果页面】失败，请手动重置！');
                }
            });

        }
    }

    imageUpload();
    $(".prize-add").click(function () { // 添加一行
        var $this = $(this);
        var prizeAreaLength = $this.parents(".new-eggs-info").find(".new-eggs-prize").length;
        if (5 <= prizeAreaLength) {
            window.modal.showAlert("最多添加5个奖品!");
            return;
        }
        var $prizeArea = $(this).parents(".new-eggs-prize");
        var $newPrizeArea = $prizeArea.clone(true);
        $newPrizeArea.find(".form-fileupload img").attr("src", root_url + '/assets/images/s.png');
        $newPrizeArea.find("input[name='prize_title']").val('');
        $(this).parents(".new-eggs-prize").after($newPrizeArea);
        imageUpload(); // 奖品图片上传
    });

    $(".prize-remove").click(function () { // 移除记录
        if (confirm("您确定要删除本行记录？")) {
            var $this = $(this);
            var prizeAreaLength = $this.parents(".new-eggs-info").find(".new-eggs-prize").length;
            var $currentArea = $this.parents(".new-eggs-prize");
            if (1 == prizeAreaLength) {
                $currentArea.find("input[name='prize_title']").val('');
                $currentArea.find(".form-fileupload img").attr("src", root_url + '/assets/images/s.png');
                $currentArea.find("input[name='prize_avatar']").val("");
            } else {
                $currentArea.remove();
            }
        }
        imageUpload(); // 奖品图片上传
    });
    $('.form-fileupload').hover(function () {
        $(this).find('.inner').show();
    });
});

function imageUpload() {
    $('.new-eggs-prize-upload, .wx-avatar-upload').each(function () {
        var $ts = $(this),
            $fileupload = $ts.find('.form-fileupload');
        if ($ts.find('.form-fileupload img').attr('src').indexOf('s.png') == -1) {
            //$ts.find('.inner').hide();
        }
        //上传
        uploader = WebUploader.create({
            swf: rootUrl + '/public/active/js/Uploader.swf',
            //server: rootUrl + '/upload.json',//必须全路径
            pick: {
                id: $ts.find('.picker'),
                multiple: false
            },
            resize: false,
            auto: true,
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            }
        });
        // 创建缩略图
        uploader.on('beforeFileQueued', function (file, res) {
        if(file.size > 80000){
            window.modal.showAlert("图片大小应为30k以内");

        }
        })
        uploader.on('fileQueued', function (file) {
            // thumbnailWidth x thumbnailHeight 为 100 x 100
            uploader.makeThumb(file, function (error, src) {
                if (error) {
                    $img.replaceWith('<span>不能预览</span>');
                    return;
                }
                myImg = file;
                $ts.find('.inner').addClass('bg');
                $ts.find('img').attr('src', src);
            }, 200, 200);
        });
        //上传成功
        uploader.on('uploadSuccess', function (file, res) {
            $ts.addClass('upload-state-done');
            $ts.find('input:hidden').val(res.content);
            //$ts.find('.inner').hide();
        });
    });
}
