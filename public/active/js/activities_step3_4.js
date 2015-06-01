$(function () {

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
            swf: rootUrl + '/public/active/js/Uploader.swf',
            server: rootUrl + '/active/accept_img',//必须全路径
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
            setTimeout(function () {
                if (file._info.width != 200 || file._info.height != 200) {
                    window.modal.showAlert("图片大小不为最佳的150×150");
                }
            }, 100)
            if (file.size > 80000) {
                window.modal.showAlert("图片大小应为30k以内");

            }
        })

        uploader.on('fileQueued', function (file) {
            // 如果为非图片文件，可以不用调用此方法。
            // thumbnailWidth x thumbnailHeight 为 100 x 100
            uploader.makeThumb(file, function (error, src) {
                if (error) {
                    $img.replaceWith('<span>不能预览</span>');
                    return;
                }

                //进行图片宽高的判断
                //var shold = checkImageWH(file);
                //alert(shold);
                myImg = file;
                //if (shold) {
                    $ts.find('.inner').addClass('bg');
                    $ts.find('img').attr('src', src);
                //} else {
                //    file.setStatus('cancelled');
                //}

                //return shold;
            }, 288, 240);
        });
        //上传成功
        uploader.on('uploadSuccess', function (file, res) {
            $ts.addClass('upload-state-done');
            if (res.content) {
                $ts.find('input:hidden').val(res.content);
            }
        });
    });

    $('.save_settings').on('click',function(){
        if($('#p_title').val().trim() == ''){
            window.modal.showAlert('请输入奖项标题');
            return false;
        }

        if($('#p_name').val().trim() == ''){
            window.modal.showAlert('请输入奖品名称');
            return false;
        }

        if($('#p_count').val().trim() == ''){
            window.modal.showAlert('请输入奖品数量');
            return false;
        }

        if($('#p_size').val().trim() == ''){
            window.modal.showAlert('请输入中奖概率');
            return false;
        }

        if($('#p_href').val().trim() == ''){
            window.modal.showAlert('请输入奖品链接');
            return false;
        }

        $('#fimg').val($('#jiangpin_img').attr('src'));
        $('#prize_form').submit();
        $('#p_title').val('');
        setTimeout(load_prize,100);

    })


    function load_prize(){
        setTimeout(function(){
            var timestamp = (new Date()).valueOf();
            $(".prize-table").load('/index.php/prize/index?tm=' + timestamp + '&id=' + hdpUrl.get('id'));
        }, 1000);
    }
    load_prize();

    $("#addchou").click(function () {
         $('.prize-input').toggle();
    })

    function is_can_over_set_prize(){
        var prize_size = $('.prize-table tbody tr').length;
        if(prize_size == 0){
            window.modal.showAlert("奖项信息不能为空，请添加奖项");
        }
        return prize_size != 0;
    }

    $('.checked_status_for_next').on('click',function(){
        return is_can_over_set_prize();
    })

    $('.next').on('click',function(){
        if(is_can_over_set_prize()){
            $('#prize_form1').submit();
        }
    })
});
