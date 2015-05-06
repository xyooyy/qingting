/**
 * Created by Administrator on 2015/1/14.
 */
$(function () {


    $('.start-btn').css('position', 'absolute');

    /**
     * 控制开始页面开始按钮的显示控制
     * all 所有幻灯片都显示
     * theEnd 只在最后一个幻灯片图片显示
     */
    startBtnInit();
    /**
     * 手指滑动效果
     */


    var mySwiper = new Swiper('.swiper-container', {

        // 分页容器
        pagination: '.pagination',

        // 如果为true则点击按钮会翻页动画
        // paginationClickable: true,

        // vertical 垂直翻页 horizontal 水平滚动
        mode: 'horizontal',
        activeIndex: 0

    });
    var initPage = function () {

        mySwiper.reInit();

    };

    mySwiper.swipeTo(0);

    var tempStartBtn = $('.btn-area').clone(true);

    function startBtnInit() {
        var value = $('.phone-simulation').attr('data-start');
        $("select[name='set-start-show'] option[value='" + value + "']").attr("selected", true);
    }

    $("select[name='set-start-show']").change(function () {
        $('.phone-simulation').attr('data-start', $(this).val());
    });

    /*******************************    kiner start     **************************************/


    window.canSubmit = true;
    window.canSave = true;

    $('.back').click(function () {
        $('.btn-set').hide();
        $('.img-load').show();
    });

    $('.save-config').unbind('click').click(function () {
        if (window.canSave) {
            save(function () {
                modal.showAlert("保存成功");
            });
        } else {
            modal.showAlert("请先上传图片后再保存设置");
        }
    });

    doUploader();


    //单击上一步
    $('.pre').click(function () {
        pre();
    });
    //单击下一步
    $('.next').click(function () {
        if (window.canSubmit) {
            save(function () {
                next();
            });
        } else {
            modal.showAlert('文件正在上传，请稍候...');
        }
    });

    $('select[name="screen"]').change(function () {
        mySwiper.reInit();

        mySwiper.swipeTo(0);
    });

    function save(success) {
        var url = "http://qingting.huosu.com/index.php/active/active_submit3_1";
        var html = $('.phone').clone();
        //html.find('.btn-current').remove();
        console.log(html.html());
        $.ajax(url, {
            data: {
                id: hdpUrl.get("id"),
                html: html.html(),
                step: "3_1"
            },
            type: "post",
            success: function (data) {
                if (data > 0) {
                    window.location.href = './begame3_2?id=' + data;
                } else {
                    window.modal.showAlert(data);
                }
            }
        });
    }


    /**
     * 上一步
     */
    function pre() {
        window.location.href = hdpUrl.set(rootUrl + "/gameChoose", {"id": hdpUrl.get("id"), "ispre": true});//设置跳转网页及网页参数
    }

    /**
     * 下一步
     */
    function next() {
        //alert(hdpUrl.get("aid"));
        window.location.href = hdpUrl.set(rootUrl + "/end", "id", hdpUrl.get("id"));//设置跳转网页及网页参数

        //window.location.href = hdpUrl.set("./activities_step3_2.html", "aid", a);//设置跳转网页及网页参数
    }

    if ($('.swiper-wrapper').find('img').length > 0) {

        $('.uploadBtn').text('开始上传').hide();
        $('.swiper-wrapper').find('img').each(function (index, ele) {

            var $li = $('<li>' +
            '<p class="imgWrap"><img src="' + $(this).attr('src') + '"></p>' +
            '</li>');
            if (!$('.tempRead').get(0)) {
                $('<ul class="tempRead"></ul>').insertBefore($('.queueList'));
            }

            $('.img-load ul').append($li);
            //
            //    $btns = $('<div class="file-panel">' +
            //    '<span class="del" del-id="' + file.id + '">x</span></div>').appendTo($li)

        });


    }


    $('.btns').on('click', '.state-pedding', function () {
        modal.showAlert('请先添加图片再进行上传');
    });

    /**
     * 显示按钮编辑项
     */
    $('.phone .lay-common').on('click', '.hdp-btn', function () {
        var $this = $(this);
        hdpBtnEditor($this);
    });

    $('.footerArea').css('button');

    /**
     * 操作按钮工具栏初始化
     * @param $this
     */
    function hdpBtnEditor($this) {

        $('.btn-set').show();
        $('.img-load').hide();

        initHdpBtn($this);

    }

    //$('.start-btn').css({'left':$('.start-btn').offset().left-$('.phone-simulation').offset().left,'top':$('.start-btn').offset().top-$('.phone-simulation').offset().top,'position':'absolute'});


    $('select[name="set-start-show"]').change(function () {
        tochange();
    });

    /**
     *   根据参数判断是否仅在最后一页显示开始游戏按钮
     */
    function tochange() {
        if ($('select[name="set-start-show"]').val() == "theEnd") {
            $('.btn-area').appendTo($('.swiper-slide:last'));
        } else {
            $('.btn-area').appendTo($('.swiper-container'));
        }
    }

    /**
     * 按钮编辑
     */
    $(".phone-simulation").on('mouseover', '.hdp-btn', function (event) {
        //调用阻止事件冒泡方法，阻止事件冒泡
        sb(event);
        var $this = $(this);

        if ($(".phone-simulation").hasClass("lay-custom")) {

            if ($('select[name="set-way"]').val() == "1") {//当选择一件设置时，禁止用户拖动组件
                try {
                    $this.draggable("disable");
                } catch (Expection) {

                }
            } else {//当选择了自定义设置时显示操作菜单，并赋予拖动与删除等高级操作

                $this.draggable({
                    cancel: ".close",
                    handler: ".drag",
                    zIndex: 99999,
                    containment: ".phone",

                    drag: function (ev, ui) {

                        //alert("1:"+($this.offset().left-$('.phone-simulation').offset().left));
                        //$this.css({'right':0});

                    },
                    start: function (event, ui) {


                        //$this.css({"left":$this.offset().left-$('.phone-simulation').offset().left});
                        //$this.css({'margin':'0'});

                        //alert("2:"+($this.offset().left-$('.phone-simulation').offset().left));
                    },
                    stop: function (event, ui) {

                        //alert("3:"+($this.offset().left-$('.phone-simulation').offset().left));
//                        var l = $this.offset().left - $this.parent().offset().left;
//                        var al = $('.phone').width();
//                        var pre = Math.round((l / al) * 100);
//                        var t = $this.offset().top - $this.parent().offset().top;
//                        var at = $('.phone').height();
//                        var pre2 = Math.round((t / at) * 100);
////
//                        $this.css({'left': pre + '%', 'top': pre2 + '%'});

                        //显示操作栏
                        hdpBtnEditor($this);
                        //$(this).remove();
                        //$(this).css({
                        //    'top': ui.position.top,
                        //    'left': ui.position.left,
                        //    'position': 'absolute',
                        //    'cursor': 'auto'
                        //});
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


    function doUploader(completeCallback) {
        (function ($) {
            // 当domReady的时候开始初始化
            $(function () {


                initPage();


                /**
                 * 检测图片宽高，并进行一些操作   kiner-tang
                 * @type {*|HTMLElement}
                 */
                var checkImageWH = function (img) {

                    var result = true;
                    if (img.size > 200 * 1024) {
                        modal.showAlert('建议图片大小不要超过' + (200) + 'k');
                        result = false;
                    }
                    return result;
                }

                /**
                 * 图片生成缩略图后的回调
                 * @param base64
                 * @param id
                 */
                var afterMakeThumb = function (base64, id) {

                    $('.swiper-wrapper').append('<div class="swiper-slide" id="' + id + '" style="width:100%;" >' +
                    '<img src="' + base64 + '">' +
                    '</div>');
                    mySwiper.reInit();
                };


                var $wrap = $('#uploader'),

                // 图片容器
                    $queue = $('<ul></ul>')
                        .prependTo($wrap.find('.right .img-load')),

                // 状态栏，包括进度和控制按钮
                    $statusBar = $wrap.find('.statusBar'),

                // 文件总体选择信息。
                    $info = $statusBar.find('.info'),

                // 上传按钮
                    $upload = $wrap.find('.uploadBtn'),

                // 没选择文件之前的内容。
                    $placeHolder = $wrap.find('.placeholder'),

                    $progress = $statusBar.find('.progress').hide(),

                // 添加的文件数量
                    fileCount = 0,

                // 添加的文件总大小
                    fileSize = 0,

                // 优化retina, 在retina下这个值是2
                    ratio = window.devicePixelRatio || 1,

                // 缩略图大小
                    thumbnailWidth = 1,
                    thumbnailHeight = 1,

                // 可能有pedding, ready, uploading, confirm, done.
                    state = 'pedding',

                // 所有文件的进度信息，key为file id
                    percentages = {},
                // 判断浏览器是否支持图片的base64
                    isSupportBase64 = (function () {
                        var data = new Image();
                        var support = true;
                        data.onload = data.onerror = function () {
                            if (this.width != 1 || this.height != 1) {
                                support = false;
                            }
                        }
                        data.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
                        return support;
                    })(),

                // 检测是否已经安装flash，检测flash的版本
                    flashVersion = (function () {
                        var version;

                        try {
                            version = navigator.plugins['Shockwave Flash'];
                            version = version.description;
                        } catch (ex) {
                            try {
                                version = new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
                                    .GetVariable('$version');
                            } catch (ex2) {
                                version = '0.0';
                            }
                        }
                        version = version.match(/\d+/g);
                        return parseFloat(version[0] + '.' + version[1], 10);
                    })(),

                    supportTransition = (function () {
                        var s = document.createElement('p').style,
                            r = 'transition' in s ||
                                'WebkitTransition' in s ||
                                'MozTransition' in s ||
                                'msTransition' in s ||
                                'OTransition' in s;
                        s = null;
                        return r;
                    })(),

                // WebUploader实例
                    uploader;

                if (!WebUploader.Uploader.support('flash') && WebUploader.browser.ie) {

                    // flash 安装了但是版本过低。
                    if (flashVersion) {
                        (function (container) {
                            window['expressinstallcallback'] = function (state) {
                                switch (state) {
                                    case 'Download.Cancelled':
                                        modal.showAlert('您取消了更新！');
                                        break;

                                    case 'Download.Failed':
                                        modal.showAlert('安装失败')
                                        break;

                                    default:
                                        modal.showAlert('安装已成功，请刷新！');
                                        break;
                                }
                                delete window['expressinstallcallback'];
                            };

                            var swf = './expressInstall.swf';
                            // insert flash object
                            var html = '<object type="application/' +
                                'x-shockwave-flash" data="' + swf + '" ';

                            if (WebUploader.browser.ie) {
                                html += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ';
                            }

                            html += 'width="100%" height="100%" style="outline:0">' +
                            '<param name="movie" value="' + swf + '" />' +
                            '<param name="wmode" value="transparent" />' +
                            '<param name="allowscriptaccess" value="always" />' +
                            '</object>';

                            container.html(html);

                        })($wrap);

                        // 压根就没有安转。
                    } else {
                        $wrap.html('<a href="http://www.adobe.com/go/getflashplayer" target="_blank" border="0"><img alt="get flash player" src="http://www.adobe.com/macromedia/style_guide/images/160x41_Get_Flash_Player.jpg" /></a>');
                    }

                    return;
                } else if (!WebUploader.Uploader.support()) {
                    modal.showAlert('Web Uploader 不支持您的浏览器！');
                    return;
                }

                var label = "";
                if ($('.tempRead').get(0)) {
                    label = "重新添加";
                } else {
                    label = "添加图片";
                }

                // 实例化
                uploader = WebUploader.create({
                    pick: {
                        id: '#filePicker',
                        label: label
                    },
                    formData: {
                        uid: 123
                    },
                    dnd: '#dndArea',
                    paste: '#uploader',
                    swf: 'http://qingting.huosu.com/public/active/js/Uploader.swf',
                    chunked: false,
                    chunkSize: 512 * 1024,
                    server: root_url + '/upload.json',
                    // runtimeOrder: 'flash',

                    // accept: {
                    //     title: 'Images',
                    //     extensions: 'gif,jpg,jpeg,bmp,png',
                    //     mimeTypes: 'image/*'
                    // },

                    // 禁掉全局的拖拽功能。这样不会出现图片拖进页面的时候，把图片打开。
                    disableGlobalDnd: true,
                    fileNumLimit: 5,
                    fileSizeLimit: 200 * 1024 * 1024,    // 200 M
                    fileSingleSizeLimit: 50 * 1024 * 1024    // 50 M
                });


                // 拖拽时不接受 js, txt 文件。
                uploader.on('dndAccept', function (items) {
                    var denied = false,
                        len = items.length,
                        i = 0,
                    // 修改js类型
                        unAllowed = 'text/plain;application/javascript ';

                    for (; i < len; i++) {
                        // 如果在列表里面
                        if (~unAllowed.indexOf(items[i].type)) {
                            denied = true;
                            break;
                        }
                    }

                    return !denied;
                });
                var imgurls = [];
                uploader.on("uploadSuccess", function (file, response) {
                    imgurls.push(response);
                });
                uploader.on("uploadComplete", function () {
                    //$('.uploadBtn').remove();
                    if (completeCallback) {
                        completeCallback();
                    }


                    imgurls.sort(compare("time", "up"));
                    for (var i = 0; i < imgurls.length; i++) {
                        $('.swiper-wrapper').find('.swiper-slide').eq(i).find('img').attr('src', imgurls[i].content);
                        $('.swiper-wrapper').find('.swiper-slide').eq(i).attr('data-id', 'swiper-img');
                    }


                    //$('.swiper-wrapper').find('.swiper-slide').each(function(){
                    //    if($(this).attr('data-id')!="swiper-img"){
                    //        $(this).remove();
                    //    }
                    //});
                    $('.tempRead').remove();
                    mySwiper.reInit();

                });
                uploader.on("uploadBeforeSend", function (block, data) {

                    var time = new Date().getTime();
                    data._time = time;
                    window.canSubmit = false;
                    //console.log(block);
                });

                // uploader.on('filesQueued', function() {
                //     uploader.sort(function( a, b ) {
                //         if ( a.name < b.name )
                //           return -1;
                //         if ( a.name > b.name )
                //           return 1;
                //         return 0;
                //     });
                // });

                // 添加“添加文件”的按钮，
                //uploader.addButton({
                //    id: '#filePicker2',
                //    label: '继续添加'
                //});

                uploader.on('ready', function () {
                    window.uploader = uploader;
                });

                // 当有文件添加进来时执行，负责view的创建
                function addFile(file) {

                    /*  for(var o in my["_events"][1]["ctx2"]){

                     console.log(o);
                     console.log(my["_events"][1]["ctx2"][o]);
                     console.log("====================================");
                     }*/


//                for(var i in file){
//                    console.log(i);
//                    //console.log(file["_events"]);
//                }
                    var $li = $('<li id="' + file.id + '" data-id="preview-img">' +
                        '<p class="title">' + file.name + '</p>' +
                        '<p class="imgWrap"></p>' +
                        '</li>'),

                        $btns = $('<div class="file-panel">' +
                        '<span class="del" del-id="' + file.id + '">x</span></div>').appendTo($li),
                        $prgress = $li.find('p.progress span'),
                        $wrap = $li.find('p.imgWrap'),
                        $info = $('<p class="error"></p>'),

                        showError = function (code) {
                            switch (code) {
                                case 'exceed_size':
                                    text = '文件大小超出';
                                    break;

                                case 'interrupt':
                                    text = '上传暂停';
                                    break;

                                default:
                                    text = '上传失败，请重试';
                                    break;
                            }

                            $info.text(text).appendTo($li);
                        };

                    $('.uploadBtn').show();
                    if (file.getStatus() === 'invalid') {
                        showError(file.statusText);
                    } else {
                        // @todo lazyload
                        $wrap.text('预览中');
                        uploader.makeThumb(file, function (error, src) {

                            //进行图片宽高的判断
                            var shold = checkImageWH(file);
                            if (!shold) {
                                uploader.removeFile(file);

                            } else {

                                if ($('.tempRead').get(0)) {
                                    /*$('.tempRead').find('img').each(function(index,ele){
                                     */
                                    //$('.swiper-slide').remove();
                                    $('.tempRead').remove();
                                    $('.swiper-wrapper').empty();
                                    $('.webuploader-pick').text('继续添加');
                                    //$('.tempRead').find('img').each(function(index,ele){
                                    //    var src = $(this).attr('src');
                                    //    if(src.indexOf('http://')!=-1){
                                    //        $('.swiper-wrapper').find('.swiper-slide').each(function(){
                                    //            if($(this).find('img').attr('src')==src){
                                    //                $(this).remove();
                                    //            }
                                    //        });
                                    //    }
                                    //});
                                    ////$('.swiper-wrapper').empty()
                                    ////$('.swiper-slide').remove();
                                    //$('.swiper-wrapper').css('-webkit-transform', 'translate3d(-00px, 0px, 0px)');
                                }
                                afterMakeThumb(src, file.id);
                                //是否将开始按钮放在最后一页
                                tochange();
                                if ($('select[name="set-start-show"]').val() == 'theEnd') {
                                    tempStartBtn.appendTo($('.swiper-slide:last'));
                                }

                                var img;

                                if (error) {
                                    $wrap.text('不能预览');
                                    return;
                                }
                                if (isSupportBase64) {
                                    img = $('<img src="' + src + '">');
                                    $wrap.empty().append(img);
                                } else {
                                    $.ajax(root_url + '/upload.json', {
                                        method: 'POST',
                                        data: src,
                                        dataType: 'json'
                                    }).done(function (response) {
                                        if (response.result) {
                                            img = $('<img src="' + response.result + '">');
                                            $wrap.empty().append(img);
                                        } else {
                                            $wrap.text("预览出错");
                                        }
                                    });
                                }
                            }


                        }, thumbnailWidth, thumbnailHeight);

                        percentages[file.id] = [file.size, 0];
                        file.rotation = 0;
                    }

                    file.on('statuschange', function (cur, prev) {
                        if (prev === 'progress') {
                            $prgress.hide().width(0);
                        } else if (prev === 'queued') {
                            $li.off('mouseenter mouseleave');
                            $btns.remove();
                        }

                        // 成功
                        if (cur === 'error' || cur === 'invalid') {
                            console.log(file.statusText);
                            showError(file.statusText);
                            percentages[file.id][1] = 1;
                        } else if (cur === 'interrupt') {
                            showError('interrupt');
                        } else if (cur === 'queued') {
                            percentages[file.id][1] = 0;
                        } else if (cur === 'progress') {
                            $info.remove();
                            $prgress.css('display', 'block');
                        } else if (cur === 'complete') {
                            $li.append('<span class="success"></span>');
                        }

                        $li.removeClass('state-' + prev).addClass('state-' + cur);
                    });

                    //$li.on( 'mouseenter', function() {
                    //    $btns.stop().animate({height: 30});
                    //});
                    //
                    //$li.on( 'mouseleave', function() {
                    //    $btns.stop().animate({height: 0});
                    //});

                    $btns.on('click', 'span', function () {
                        uploader.removeFile(file);
                        $('#' + $(this).attr('del-id')).remove();
                        mySwiper.reInit();
                    });

                    $li.appendTo($queue);
                }

                // 负责view的销毁
                function removeFile(file) {
                    var $li = $('#' + file.id);

                    delete percentages[file.id];
                    updateTotalProgress();
                    $li.off().find('.file-panel').off().end().remove();
                }

                function updateTotalProgress() {
                    var loaded = 0,
                        total = 0,
                        spans = $progress.children(),
                        percent;

                    $.each(percentages, function (k, v) {
                        total += v[0];
                        loaded += v[0] * v[1];
                    });

                    percent = total ? loaded / total : 0;


                    spans.eq(0).text(Math.round(percent * 100) + '%');
                    spans.eq(1).css('width', Math.round(percent * 100) + '%');
                    updateStatus();
                }

                function updateStatus() {
                    var text = '', stats;

                    if (state === 'ready') {
                        text = '选中' + fileCount + '张图片，共' +
                        WebUploader.formatSize(fileSize) + '。';
                    } else if (state === 'confirm') {
                        stats = uploader.getStats();
                        if (stats.uploadFailNum) {
                            text = '已成功上传' + stats.successNum + '张照片至XX相册，' +
                            stats.uploadFailNum + '张照片上传失败，<a class="retry" href="#">重新上传</a>失败图片或<a class="ignore" href="#">忽略</a>'
                        }

                    } else {
                        stats = uploader.getStats();
                        text = '共' + fileCount + '张（' +
                        WebUploader.formatSize(fileSize) +
                        '），已上传' + stats.successNum + '张';

                        if (stats.uploadFailNum) {
                            text += '，失败' + stats.uploadFailNum + '张';
                        }
                    }

                    $info.html(text);
                }

                function setState(val) {
                    var file, stats;

                    if (val === state) {
                        return;
                    }

                    $upload.removeClass('state-' + state);
                    $upload.addClass('state-' + val);
                    state = val;

                    switch (state) {
                        case 'pedding':
                            $placeHolder.removeClass('element-invisible');
                            $queue.hide();
                            $statusBar.addClass('element-invisible');
                            uploader.refresh();
                            break;

                        case 'ready':
                            $placeHolder.addClass('element-invisible');
                            $('#filePicker2').removeClass('element-invisible');
                            $queue.show();
                            $statusBar.removeClass('element-invisible');
                            uploader.refresh();
                            break;

                        case 'uploading':
                            $('#filePicker2').addClass('element-invisible');
                            $progress.show();
                            $upload.text('暂停上传');
                            break;

                        case 'paused':
                            $progress.show();
                            $upload.text('继续上传');
                            break;

                        case 'confirm':
                            $progress.hide();
                            $('#filePicker2').removeClass('element-invisible');
                            $upload.text('重新上传');

                            stats = uploader.getStats();
                            if (stats.successNum && !stats.uploadFailNum) {
                                setState('finish');
                                return;
                            }
                            break;
                        case 'finish':
                            stats = uploader.getStats();
                            if (stats.successNum) {
                                modal.showAlert('上传成功');
                                window.canSubmit = true;
                                window.canSave = true;
                            } else {
                                // 没有成功的图片，重设
                                state = 'done';
                                location.reload();
                            }
                            break;
                    }

                    updateStatus();
                }

                uploader.onUploadProgress = function (file, percentage) {
                    var $li = $('#' + file.id),
                        $percent = $li.find('.progress span');

                    $percent.css('width', percentage * 100 + '%');
                    percentages[file.id][1] = percentage;
                    updateTotalProgress();
                };

                uploader.onFileQueued = function (file) {
                    window.canSave = false;
                    fileCount++;
                    fileSize += file.size;

                    if (fileCount === 1) {
                        $placeHolder.addClass('element-invisible');
                        $statusBar.show();
                    }

                    addFile(file);
                    setState('ready');
                    updateTotalProgress();
                };

                uploader.onFileDequeued = function (file) {
                    fileCount--;
                    fileSize -= file.size;

                    if (!fileCount) {
                        setState('pedding');
                    }

                    removeFile(file);
                    updateTotalProgress();

                };

                uploader.on('all', function (type) {
                    var stats;
                    switch (type) {
                        case 'uploadFinished':
                            setState('confirm');
                            break;

                        case 'startUpload':
                            setState('uploading');
                            break;

                        case 'stopUpload':
                            setState('paused');
                            break;

                    }
                });

                uploader.onError = function (code) {
                    modal.showAlert('错误:' + code);
                };

                $upload.on('click', function () {
                    if ($(this).hasClass('disabled')) {
                        return false;
                    }

                    if (state === 'ready') {
                        uploader.upload();
                    } else if (state === 'paused') {
                        uploader.upload();
                    } else if (state === 'uploading') {
                        uploader.stop();
                    }
                });

                $info.on('click', '.retry', function () {
                    uploader.retry();
                });

                $info.on('click', '.ignore', function () {
                    modal.showAlert('todo');
                });

                $upload.addClass('state-' + state);
                updateTotalProgress();
            });

        })(jQuery);
    }

    /*******************************    kiner end       **************************************/


});
