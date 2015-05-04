$(function () {
    //单选，多选化
    $('.btn-all input, .check input, .me-form input[type="radio"]').iCheck({
        checkboxClass: 'icheckbox_polaris',
        radioClass: 'iradio_polaris'
    });
    //select美化
    Select.init({selector: 'select'});

    //模拟提示
    $('.pop-mod').on('click', '.pm-close, .close', function () {
        $('#pop-overlay').hide();
        $('.pop-mod').hide();
        return false;
    });
    
    //删除奖品提示
    $(".usage").change(function(){
	  $('body').pop({
			msg : '检测到你的商业模式发生变化，如果已有中奖名单，为确保在活动预览页面中的奖品统计准确，请对奖品删除后再添加！',
			btns : [ {
				text : '确定',
				red : true,
				handler : 'close'
			}]
		});
	});

    //时间控件选择器调用和初始化
    $('.date-picker').datetimepicker({
        lang: 'ch',
        timepicker: false,
        format: 'Y-m-d',
		scrollMonth:false,
		scrollTime:false,
		scrollInput:false,
        onChangeDateTime: function (dp, $input) {}
    });
    
    $('#check-all').on('ifChecked', function (event) {
        $('.table-advert').find('input:checkbox').iCheck('check');
    }).on('ifUnchecked', function (event) {
        $('.table-advert').find('input:checkbox').iCheck('uncheck');
    });

    //create\edit {
    //选择游戏
    $('.btn-games, .btn-gamelist').on('click', function () {
        $(window).scrollTop(100);
        var $pop = $('#pop-game-select');
        $('#activity_pop_overlay').show();
        var t = $('.active-warp').offset().top;
        $('#pop-game-select').css({
            'top': t
        });
        $pop.show().find('.ifr').attr('scr', rootUrl + '/games');
        setTimeout(function () {
            $pop.find('.pm-bd').removeClass('loading');
        }, 500);
        return false;
    });
    $('#pop-game-select').on('click', '.pm-close', function () {
        $('#activity_pop_overlay').hide();
        $('#pop-game-select').hide();
        return false;
    });
    //删除已选
    $('.game-select').on('click', 'li .btn-del', function () {
        $(this).parents('li').remove();
        refreshNum();
        return false;
    });

    //弹出层内，下拉切换内容
    $('#pop-game-select').on('change', '.pm-hd select', function () {
        var $pop = $('#pop-game-select'),
            val = $(this).val();
        $pop.find('.pm-bd').addClass('loading');
        $pop.find('.ifr').attr('src', rootUrl + '/games?type=' + encodeURI(val));
        setTimeout(function () {
            $pop.find('.pm-bd').removeClass('loading');
        }, 500);
    });

    //单图片上传组件
    $('.form-single-upload').each(function () {
        var $ts = $(this),
            $fileupload = $ts.find('.form-fileupload');
        //上传
        var uploader = WebUploader.create({
            swf: '/assets/js/lib/webuploader/Uploader.swf',
            server: rootUrl + '/upload',
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
                $ts.find('.inner').addClass('bg');
                $ts.find('img').attr('src', src);
            }, 288, 240);
        });
        //上传成功
        uploader.on('uploadSuccess', function (file, res) {
            $ts.addClass('upload-state-done');
            $ts.find('input:hidden').val(res.content);
        });
    });

    //多图片上传组件
    $('.form-multiple-upload').each(function () {
        var $ts = $(this),
            $preview = $ts.find('.image-upload-preview'),
            $control = $ts.find('.control'),
            numLimit = $ts.data('numlimit'),//6
            name = $ts.data('name');//abc

        //上传
        var uploader = WebUploader.create({
            swf: '/assets/js/lib/webuploader/Uploader.swf',
            server: rootUrl + '/upload',
            pick: {
                id: $ts.find('.picker'),
                multiple: true
            },
            fileNumLimit : numLimit || 6, //验证文件总数量, 超出则不允许加入队列
            resize: false,
            auto: true,
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            }
        });
        if(typeof pageType !== 'undefined' && pageType === 'edit'){
            $ts.on('click', '.picker', function () {
                $ts.find('.image-upload-preview').html('');
            });
        }
        // 创建缩略图
        uploader.on( 'fileQueued', function( file ) {
            // 如果为非图片文件，可以不用调用此方法。
            // thumbnailWidth x thumbnailHeight 为 100 x 100
            uploader.makeThumb( file, function( error, src ) {
                if ( error ) {
                    $img.replaceWith('<span>不能预览</span>');
                    return;
                }
                $preview.append('<div id="'+file.id+'" class="image-item"> <img src="'+src+'" alt="" /> <input type="checkbox" name="" /> <input type="hidden" name="'+name+'[]" value="" /> </div>')
                $ts.find('#'+file.id+' input[type="checkbox"]').iCheck({
                    checkboxClass: 'icheckbox_polaris',
                    radioClass: 'iradio_polaris'
                });
                $ts.find('.control').show();
            }, 320, 520 );
        });
        //上传成功
        uploader.on('uploadSuccess', function(file, res) {
            $ts.find('#'+file.id).addClass('upload-state-done').find('input[type="hidden"]').val(res.content);
        });

        //全选
        $control.find('.check-all').on('ifChecked', function(event){
            $preview.find('input:checkbox').iCheck('check');
        }).on('ifUnchecked', function(event){
            $preview.find('input:checkbox').iCheck('uncheck');
        });

        //删除
        $control.on('click', '.btn-del', function () {
            var $label = $preview.find('.image-item'),
                len = $label.size();
            for (var i = 0; i < len; i++) {
                if($label.eq(i).find('.icheckbox_polaris').hasClass('checked')){
                    var id = $label.eq(i).attr('id');
                    uploader.cancelFile(id);
                    $label.eq(i).remove();
                }
            }
            if($preview.find('.image-item').size() <= 0){
                $control.hide();
            }
        });
    });

    //奖品设置
    var $formPizze = $('.form-pizze');
    var setFormPizze = function (opt) {
        if (typeof opt === 'undefined') {
            //清内容
            $formPizze.find('.input-pizze-id').val(uuid());
            $formPizze.find('.input-pizze-name, .input-pizze-url, .input-pizze-con, .input-pizze-num, .input-probability').val('');
            $formPizze.find('.createImg').attr('src','../assets/images/s.png');
        } else {
            //写内容
            $formPizze.find('.input-pizze-id').val(opt.id || '');
            $formPizze.find('.input-pizze-name').val(opt.name || '');
            $formPizze.find('.input-pizze-url').val(opt.url || '');
            $formPizze.find('.input-pizze-con').val(opt.con || '');
            $formPizze.find('.input-pizze-num').val(opt.num || '');
            $formPizze.find('.input-probability').val(opt.probability || '');
            $formPizze.find('input[name="single-pic"]').val(opt.pic || '');
            $formPizze.find('img').attr('src', rootUrl + opt.pic || '../assets/images/s.png');
        }
    };
    //记录操作
    $('.list-pizze').on('click', '.btn-del', function () {
        var $li = $(this).parents('li'),
            id = $li.data('id');
        $.ajax({
            url: rootUrl + '/present/remove',
            data: {'id': id},
            type: "POST"
        }).done(function (responseData) {
            $li.remove(); // 删除
        });
        return false;
    }).on('click', '.btn-edit', function () {
        //修改
        var $li = $(this).parents('li'),
            id = $li.data('id'),
            name = $li.data('name'),
            url = $li.data('url'),
            con = $li.data('con'),
            num = $li.data('num'),
            probability = $li.data('probability'),
            pic = $li.data('pic');

        setFormPizze({
            id: id,
            name: name,
            url: url,
            con: con,
            num: num,
            probability: probability,
            pic: pic
        });
        $formPizze.slideDown();
        return false;
    });

    //添加一条记录
    var setPizee = function (opt) {
    	console.debug(opt);
        var $list = $('.list-pizze'),
            html = '<li data-id="' + opt.id + '" data-name="' + opt.name + '" data-url="' + opt.url + '" data-con="' + opt.con + '" data-num="' + opt.num + '" data-pic="' + opt.pic + '" data-probability="' + opt.probability + '"> <span class="p-name"> ' + opt.name + ' </span> <span class="p-con"> ' + opt.con + '</span>&nbsp;<span class="p-num">' + opt.num + '份</span> <span class="p-probability"> ' + opt.probability + ' </span>  <span class="op"> <a class="btn-edit" href="#"><i></i>修改</a> <em>|</em> <a class="btn-del" href="#"><i></i>删除</a> </span> <input type="hidden" name="pizze[]" value="' + opt.id + '" /> </li>';

        if ($list.find('li[data-id="' + opt.id + '"]').size() > 0) {
            //已存在，修改
        	$list.find('li[data-id="' + opt.id + '"]').replaceWith(html);
        } else {
            //新增
            $list.find('ul').append(html);
        }

    };
    //添加奖品
    $('.add-pizze').click(function () {
        setFormPizze();
        $formPizze.slideDown();
        return;
    });
    $formPizze.on('click', '.btn-cancal', function () {
        //取消
        setFormPizze();
        $formPizze.slideUp();
        return false;
    }).on('click', '.btn', function () {
        //保存
        var id = $formPizze.find('.input-pizze-id').val();
        var name = $formPizze.find('.input-pizze-name').val();
        var url = $formPizze.find('.input-pizze-url').val();
        var con = $formPizze.find('.input-pizze-con').val();
        var num = $formPizze.find('.input-pizze-num').val();
        var probability = $formPizze.find('.input-probability').val();
        var pic = $formPizze.find('input[name="single-pic"]').val();
        if(id == "" || name == "" || con == "" || num == "" || probability == ""){
            //alert('params can not be empty!');
            //alert
            $('body').pop({
                msg : '全部为必填选项！'
            });
            return false;
        }
        //TODO ajax提交到服务器，成功后，写入页面
        //模拟提交
//        setTimeout(function () {
//            setPizee({
//                id: id,
//                name: name,
//                con: con,
//                num: num,
//                pic: pic
//            });
//            setFormPizze();
//            $formPizze.slideUp();
//        }, 500);

        if(id == "" || name == "" || con == "" || num == ""){
            alert("选项不能为空，请您填写。");
            return false;
        }

        $.ajax({
            url: rootUrl + '/present/save',
            data: {'dataId': id, 'name': name, 'url': url, 'quota': num, 'avatar': pic, 'presentName': con, 'probability': probability},
            type: "POST"
        }).done(function (responseData) {
            setPizee({
                id: id,
                name: name,
                url: url,
                con: con,
                num: num,
                probability: probability,
                pic: pic
            });
            setFormPizze();
            $formPizze.slideUp();
        });
        return false;
    });
    //}create\edit
    
    //list {
    //多条记录删除
    $('#multiDel').on('click', function () {
        //判断选项是否为空
        var items = '';
        $('.table-advert input:checked').each(function () {
            if (items == '') {
                items = $(this).parents('tr').attr("data-id");
            } else {
                items += "," + $(this).parents('tr').attr("data-id");
            }
        });

        //提示
        if (items != '') {

            $('body').pop({
                msg : '删除活动会同时删除活动关联的获奖人信息,兑奖券和奖品信息,确定要删除选中的活动吗？',
                btns : [{
                    text : '取消',
                    gray : true,
                    handler : 'close'
                },{
                    text : '确定',
                    handler : function(thisPop, $pop){
                        //点了确定后，执行ajax
                        $.ajax({
                            url: rootUrl + '/batchRemove',
                            data: {ids: items},
                            type: 'POST'
                        }).done(function (response) {
                            if (response.success) {
                                //suc
                                if(pageType === 'off') {
                                    window.location.href = rootUrl + "/offline/";
                                }else{
                                    window.location.href = rootUrl + "/";
                                }

                            } else {
                                //faile
                                $('body').pop({
                                    msg : '删除活动失败,请重试！',
                                    btns : [{
                                        text : '确定',
                                        handler : 'close'
                                    }]
                                });
                            }
                        });
                    }
                }]
            });

        } else {
            $('body').pop({
                msg: '请选择要删除的活动！'
            });
        }
    });

    //单条记录删除
//    $('.singleDel').on('click', function () {
//        var $tr = $(this).parents('tr');
//        $.ajax({
//            url: root_url + '/activity/remove',
//            data: {id: $tr.attr('data-id')},
//            type: 'POST',
//            dataType: 'json',
//            async: false,
//            success: function (response) {
//                if (response.success) {
//                    $tr.remove();
//                    $('body').pop({msg: '删除成功！'});
//                }
//            },
//            error: function () {
//                $('body').pop({msg: '删除失败！'});
//            }
//        }).fail(function () {
//            //alert('删除失败！！！');
//            $('body').pop({
//                msg: '删除失败！'
//            });
//        });
//        return false;
//    });
    
    //单条记录删除
    $('.singleDel').on('click', function () {
        //判断选项是否为空
        var $tr = $(this).parents('tr');
            $('body').pop({
                msg : '删除活动会同时删除活动关联的获奖人信息,奖品信息,和兑奖券.确定要删除选中的活动吗？',
                btns : [{
                    text : '取消',
                    gray : true,
                    handler : 'close'
                },{
                    text : '确定',
                    handler : function(thisPop, $pop){
                        //点了确定后，执行ajax
                        $.ajax({
                            url: rootUrl + '/remove',
							data: {id: $tr.attr('data-id')},
							type: 'POST',
							dataType: 'json',
							async: false,
							success: function (response) {
								if (response.success) {
									$tr.remove();
									$('body').pop({msg: '删除成功！'});
								}
							},
							error: function () {
								$('body').pop({msg: '删除失败！'});
							}
                        }).fail(function () {
							//alert('删除失败！！！');
							$('body').pop({
								msg: '删除失败！'
							});
						});
                    }
                }]
            });
    });

    /**
     * 活动下线
     */
    $('.offline').on('click', function () {
        var $tr = $(this).parents('tr');
        $.ajax({
            url: rootUrl + '/offline',
            data: {id: $tr.attr('data-id')},
            type: 'POST'
        }).done(function (response) {
            if (response.success) {
                //alert('操作成功！');
                $('body').pop({
                    msg: '操作成功！'
                });
                $tr.remove();
            }
        }).fail(function () {
            //alert('操作失败！！！');
            $('body').pop({
                msg: '操作失败！'
            });
        });
        return false;
    });

	//构建模态框
	var modal = new hdpModal();
	var actid;
	var err_msg;
	var err_url = rootUrl+"/";
	
	var btn = [
	   {
		   id:"edit",
		   name : "前往修改",
		   listener:function(modal){
		   	   matchUrl(err_msg,actid);
			   window.location.href = err_url;
		   }

	   },
	   {
		   id:"cancel",
		   name:"取消",
		   classes : ['modalClose'],
		   listener:function(modal){
			   modal.hide();
		   }
	   }
   ]; 

	/**
	 * 根据返回的信息错误信息内容拼url
	 */
	function matchUrl(msg,id){
		switch(msg)
		{
		case '您必须选择一款游戏':
		  err_url+="gameChoose?id="+id;
		  break;
		case '活动开始页设定不能为空':
		  err_url+="begin?id="+id;
		  break;
		case '活动结束页设定不能为空':
		  err_url+="end?id="+id;
		  break;
		case '活动分享页设定不能为空':
		  err_url+="share?id="+id;
		  break;
		case '活动已中奖设定不能为空':
		  err_url+="prizeResult?id="+id;
		  break;
		case '活动未中奖设定不能为空':
		  err_url+="prizeResult?id="+id+"&page=2";
		  break;
		case '活动抽奖次数用完设定不能为空':
		  err_url+="prizeResult?id="+id+"&page=3";
		  break;
		case '活动结束时间小于当前时间':
		  err_url+="basic?id="+id;
		  break;  
		default:
		  //to do
		  break;
		}
	} 
	
    /**
     * 活动上线
     */
    $('.online').on('click', function () {
        var $tr = $(this).parents('tr');
        $.ajax({
            url: rootUrl + '/online',
            data: {id: $tr.attr('data-id')},
            type: 'POST'
        }).done(function (response) {
        	if(response.code == 1){
        		$('body').pop({
                    msg: response.msg
                });
        		return;
        	}
            if (response.success) {
                //alert('操作成功！');
                $('body').pop({
                    msg: '操作成功！'
                });
                $tr.remove();
            }else if(!response.success){
				//上线失败
				actid = $tr.attr('data-id');
				err_msg = response.msg;
				modal.resetBtns(btn);
				modal.showWithTitle(response.msg);
			}
        }).fail(function () {
            //alert('操作失败！！！');
            $('body').pop({
                msg: '操作失败！'
            });
        });
        return false;
    });
	
    /**
     * 批量上线
     */
    $('#batch_online').on('click', function () {
        //判断选项是否为空
        var items = '';
        $('.table-advert input:checked').each(function () {
            if (items == '') {
                items = $(this).parents('tr').attr("data-id");
            } else {
                items += "," + $(this).parents('tr').attr("data-id");
            }
        });
        if (items != '') {
            $('body').pop({
                msg : '是否要批量上线选中活动？',
                btns : [{
                    text : '取消',
                    gray : true,
                    handler : 'close'
                },{
                    text : '确定',
                    handler : function(thisPop, $pop){
                        $.ajax({
                            url: rootUrl + '/onlineBatch',
                            data: {ids: items},
                            type: 'POST'
                        }).done(function (response) {
                        	if(response.code == 1){
                        		$('body').pop({
                                    msg: response.msg
                                });
                        		return;
                        	}
                            if (response.success) {
                                //suc
                                if(pageType === 'off') {
                                    window.location.href = rootUrl + "/offline/";
                                }else{
                                    window.location.href = rootUrl + "/";
                                }
                            } else {
                                //faile
                                $('body').pop({
                                    msg: '批量上线失败，请重试'
                                });
                            }
                        });
                    }
                }]
            });

        } else {
            $('body').pop({
                msg: '请选择要上线的活动！'
            });
        }
    });

    /**
     * 批量下线
     */
    $('#batch_offline').on('click', function () {
        //判断选项是否为空
        var items = '';
        $('.table-advert .checked input:checkbox').each(function () {
            if (items == '') {
                items = $(this).parents('tr').attr("data-id");
            } else {
                items += "," + $(this).parents('tr').attr("data-id");
            }
        });
        if (items != '') {
            $('body').pop({
                msg : '是否要批量下线选中活动？',
                btns : [{
                    text : '取消',
                    gray : true,
                    handler : 'close'
                },{
                    text : '确定',
                    handler : function(thisPop, $pop){

                        $.ajax({
                            url: rootUrl + '/offlineBatch',
                            data: {ids: items},
                            type: 'POST'
                        }).done(function (response) {
                            if (response.success) {
                                //suc
                                if(pageType === 'off') {
                                    window.location.href = rootUrl + "/offline/";
                                }else{
                                    window.location.href = rootUrl + "/";
                                }
                            } else {
                                //faile
                                $('body').pop({
                                    msg: '批量下线失败，请重试'
                                });
                            }
                        });

                    }
                }]
            });

        } else {
            $('body').pop({
                msg: '请选择要下的活动！'
            });
        }
    });
    //}list
});

var refreshNum = function () {
    var $el = $('.game-select'),
        num = $el.find('li').size() || 0;

    //单选，固定为1
    num = 1;
    $('#select-games-num').html(num);
    if (num > 0) {
        $('.sg-tips').show();
    } else {
        $('.sg-tips').hide();
    }

};

var setGame = function (data) {
    //关闭弹出层
    $('#activity_pop_overlay').hide();
    $('#pop-game-select').hide();

    var $el = $('.game-select'),
        html = '';
    //因为是单选，直接替换游戏
    ////if ($el.find('li[data-gid="' + data.gid + '"]').size() <= 0) {
        html = '<li data-gid="' + data.gid + '"><a href="' + data.url + '"> <img src="' + data.logo + '" alt="' + data.gname + '"/> </a> <em class="btn-del">删除</em> <input type="hidden" name="games[]" value="' + data.gid + '" /> </li>';
        $el.find('ul').html(html);
    //}
    refreshNum();
};
var unSetGame = function (gid) {
    //var $el = $('.game-select');
    //$el.find('li[data-gid="' + gid + '"]').remove();
    //refreshNum();
};


var uuid = function () {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
};
$(document).ready(function(){
    var usage1 = "中奖后得到兑换号，关注公众平台后给入口验证此兑换号正确后再真正获得";
    var usage2 = "中奖后获得的优惠券，直接带有对应的商城链接，可直接点击跳转，具体链接在下方奖品处设置";
    var usage3 = "中奖后生成券号，中奖者凭券号给企业方，企业方登录该后台验证券号有效性，并使其作废";
    var usage4 = "以奖励的方式刺激用户分享，获取用户详细资料为主";
    var usage5 = "引导用户关注微信公众号，管理员现场微信扫描派奖";
    $("#usage-select").bind("change", function(){
        var selectValue = $(".usage-content .select-target").text();
        // var selectValue = $(this).children('option:selected').val();
        if("微信关注" == selectValue){
            $("#usage-select .help-inline").html(usage1);
            $(".usage-btn-link").show();
            $("#award").hide();
            $(".usage-prefix").show();
        }else if("线上引流" == selectValue){
            $(".usage-btn-link").hide();
            $("#award").show();
            $(".usage-prefix").hide();
            $("#usage-select .help-inline").html(usage2);
        }else if("线下引流" == selectValue){
            $("#usage-select .help-inline").html(usage3);
            $(".usage-btn-link").hide();
            $("#award").hide();
            $(".usage-prefix").show();
        }else if("线索收集" == selectValue){
            $("#usage-select .help-inline").html(usage4);
            $(".usage-btn-link").hide();
            $("#award").hide();
            $(".usage-prefix").hide();
        }else if("现场活动" == selectValue){
            $("#usage-select .help-inline").html(usage5);
            $("#award").hide();
            $(".usage-btn-link").show();
            $(".usage-prefix").show();
        }else if("现场扭蛋" == selectValue){
            window.location.href = rootUrl + '/liveErnie/create'
        }
    });
    $("#usage-select").trigger("change");
});
function activityFormHandler(){
    var name = $("input[name='name']").val();
    var gameCount = $(".game-select li").length;
	var weixin_title = $("input[name='weixin_title']").val();
	var weixin_descr = $("textarea[name='weixin_descr']").val();
	var weixin_imgurl = $("input[name='weixin_imgurl']").val();
	var weixin_mobile = $("input[name='contactPhone']").val();
	var weixin_qq = $("input[name='contactQq']").val();
	var regex = /^1\d{10}$/; 
    if(name == ""){
        alert("活动名称不能为空");
        return false;
    }else if(gameCount == 0){
        alert("你必须选择一款游戏");
        return false;
    }else if(weixin_title==""){
		alert("微信分享标题信息不为空");
        return false;
	}else if(weixin_descr==""){
		alert("微信分享描述信息不为空");
        return false;
	}else if(weixin_imgurl==""){
		alert("微信分享缩略图不为空");
        return false;
	}else if($(".form-pizze").is(":visible")){
        return !!window.confirm('奖品处于编辑状态，如果继续可能会丢失正在编辑的奖品。推荐做法是点击奖品下方的保存，而不是本按钮，你确定忽略提示并继续吗？');
    }else if(weixin_mobile.length==0){
    	alert("手机号码不能为空！");
    	return false;
    }else if(!regex.test(weixin_mobile)){
    	alert("请输入有效的手机号码！");
    	return false;
    }
}