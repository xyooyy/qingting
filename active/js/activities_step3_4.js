$(function () {

    var id = hdpUrl.get("id");
    //if (id) {
    //    var url = rootUrl + "/prize/list.json";
    //    $.ajax(url, {
    //        data: {
    //            id: id
    //        },
    //        dataType: "json",
    //        type: "post",
    //        success: function (data, text) {
    //            if (data.success) {
    //                setData(data);
    //                $(".prize-input").hide();
    //                $(".prize-table").show();
    //            }else{
    //
    //                modal.showAlert(data.msg);
    //            }
    //        },
    //        error: function (data, text) {
    //
    //            modal.showAlert('网络访问异常');
    //        }
    //    });
    //}
    //单选，多选化
    $('.btn-all input, .check input, .comm-form input[type="radio"]').iCheck({
        checkboxClass: 'icheckbox_polaris',
        radioClass: 'iradio_polaris'
    });

    /**
     * 检测图片宽高，并进行一些操作   kiner-tang
     * @type {*|HTMLElement}
     */
    var checkImageWH = function (img) {
        var result = true;
        if (img.size > 102400) {
            modal.showAlert('建议图片大小不要超过100k');
            result = false;
        }
        return result;
    }

    var uploader, myImg;
    //单图片上传组件
    $('.form-single-upload,.form-single-modify').each(function () {
        var $ts = $(this),
            $fileupload = $ts.find('.form-fileupload');
        //上传
        uploader = WebUploader.create({
            swf: rootUrl + '/assets/js/lib/webuploader/Uploader.swf',
            server: rootUrl + '/upload.json',//必须全路径
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
        uploader.on('fileQueued', function (file) {
            // 如果为非图片文件，可以不用调用此方法。
            // thumbnailWidth x thumbnailHeight 为 100 x 100
            uploader.makeThumb(file, function (error, src) {
                if (error) {
                    $img.replaceWith('<span>不能预览</span>');
                    return;
                }

                //进行图片宽高的判断
                var shold = checkImageWH(file);
                myImg = file;
                if (shold) {
                    $ts.find('.inner').addClass('bg');
                    $ts.find('img').attr('src', src);
                } else {
                    file.setStatus('cancelled');
                }

                return shold;
            }, 288, 240);
        });
        //上传成功
        uploader.on('uploadSuccess', function (file, res) {
            $ts.addClass('upload-state-done');
            if(res.content){
                $ts.find('input:hidden').val(res.content);
            }
        });

        $(".prize-set").show();
        $('.prize-info').show();

        //添加奖品
        $(".add-btn a").click(function () {
            $(".prize-input").show();
            $(".add-btn a").click(function () {
                $(".prize-input").find('input').val('');
                $(".prize-input").find('.form-fileupload img').attr('src', rootUrl + '/assets/images/s.png');
                if (myImg) {
                    uploader.removeFile(myImg);
                    $(".prize-input").find('.form-fileupload img').attr('src', rootUrl + '/assets/images/s.png');
                }
                if ($(".prize-input").is(":hidden")) {
                    $(".prize-input").show();
                } else {
                    $(".prize-input").hide();
                }
            });
        });

        //保存设置
        $(".save-set").click(function () {
            saveConfig(function(){
                   $(".prize-input").hide();
                   $(".prize-table").show();
            });
        });
        $(".next").click(function () {
            var url = rootUrl + "/prizeInfo/save.json";
            $.ajax(url, {
                data: {
                    'id': hdpUrl.get("id"),
                    'convertCodePrefix': $('input[name="convertCodePrefix"]').val(),
                    'lotteryTotal': $('input[name="lotteryTotal"]').val(),
                    'todayLotteryTotal': $('input[name="todayLotteryTotal"]').val(),
                    'enableShare': $('input[name="enableShare"]:checked').val()
                },
                dataType: "json",
                type: "post",
                success: function (data, text) {
                    if (data.success) {
                        next();
                    } else {
                        modal.showAlert(data.msg);
                    }
                },
                error: function (data, text) {
                    //modal.showAlert('网络访问异常');
                }
            });
        });
        $(".pre").click(function () {
            saveConfig();
            pre();
        });

        /**
         * 上一步
         */
        function pre() {
            window.location.href = hdpUrl.set(rootUrl + "/share", {"id": hdpUrl.get("id"), "ispre": true});//设置跳转网页及网页参数
        }

        /**
         * 下一步
         */
        function next() {
            window.location.href = hdpUrl.set(rootUrl + "/prizeResult", "id", hdpUrl.get("id"));//设置跳转网页及网页参数
        }

        function saveConfig(success) {

            var url = rootUrl + "/prize/save.json";

            $.ajax(url, {
                data: $('form').serialize() + '&activity.id=' + hdpUrl.get("id"),
                dataType: "json",
                type: "post",
                success: function (data, text) {
                    //console.log(data);
                    if (data.success) {
                        setData(data);
                        if(success){
                            success(data);
                        }
                    } else {
                        modal.showAlert(data.msg);
                    }
                },
                error: function (data, text) {

                    //modal.showAlert('网络访问异常');
                }
            });
        }
    });

    function setData(data) {
        //console.log(data);
        //next();
        $(".prize-input").hide();
        $('.prize-table').show();
        $('.prize-table tbody').empty();
        for (var d in data.content) {
            var res = data.content[d];
            $('.prize-table tbody').append(' <tr>' +
            '<td class="title">' +
            res.title +
            '</td>' +
            '<td class="name">' +
            res.name +
            '</td>' +
            '<td class="number">' +
            res.quota + '份' +
            '</td>' +
            '<td class="probability">' +
            res.probability + '%' +
            '</td>' +
            '<td class="control">' +
            '<a href="javascript:;" class="update" data-id="' + res.id + '">' +
            '<i class="icon icon-edit"></i>' +
            '修改' +
            '</a>' +
            '|' +
            '<a href="javascript:;" class="del" data-id="' + res.id + '">' +
            '<i class="icon icon-del"></i>' +
            '删除' +
            '</a>' +
            '</td>' +
            '</tr>');
        }
    }

    $('.prize-table').on('click', '.del', function () {
        //modal.showA//alert($(this).attr('data-id'));
        var $this = $(this);
        $.ajax(rootUrl + '/prize/remove.json', {
            data: {
                id: $(this).attr('data-id')
            },
            dataType: "json",
            type: "post",
            success: function (data, text) {
                if (data.success) {
                    setData(data);
                    if ($('.prize-table tbody tr').length == 0) {
                        $('.prize-table').hide();
                    }
                } else {
                    modal.showAlert(data.msg);
                }
            },
            error: function () {
            }
        });
    });
    $('.prize-table').on('click', '.update', function () {
        $(".prize-input").show();
        $.ajax(rootUrl + '/prize/get.json', {
            data: {
                id: $(this).attr('data-id')
            },
            dataType: "json",
            type: "post",
            success: function (data, text) {
                $('input[name="id"]').val(data.content.id);
                $('input[name="title"]').val(data.content.title);
                $('input[name="name"]').val(data.content.name);
                $('input[name="quota"]').val(data.content.quota);
                $('input[name="avatar"]').val(data.content.avatar);
                $('input[name="probability"]').val(data.content.probability);
                $('input[name="url"]').val(data.content.url);

                $('.form-fileupload img').attr('src', data.content.avatar);
            }
        });
        //alert($(this).attr('data-id'));
    });
});
