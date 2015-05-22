/**
 * Created by Administrator on 2015/1/15.
 */
$(function () {

    $('.pre').click(function () {
        pre();
    });
    $('.next').click(function () {
        saveConfig(function(id){
        	next(id);
        });
    });

    $('.uploadBtn').click(function () {
        saveConfig();
    });

    var err_url = rootUrl+"/";

    function saveConfig(success) {
        var html = $('.share-page').clone();
        html.find('.btn-current').remove();
        var url = rootUrl + "/confirm/save.json";
        var err_msg;

        var btn2 = [
               {
                   id:"edit",
                   name : "前往修改",
                   listener:function(modal){
                   		matchUrl(err_msg);
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


        //window.modal.showAlert(html.html());
        $.ajax(url, {
            data: {
                id: hdpUrl.get("id")
            },
            dataType: "json",
            type: "post",
            success: function (data, text) {
                if (data.success) {
                	 var btn = [
                	            {
                	                id:"ok",
                	                name : "返回活动列表",
                	                listener:function(modal){
                	                    if(success){
                	                        success(data.code);
                	                    }
                	                }

                	            },
                	            {
                	                id:"close",
                	                name:"继续编辑",
                	                classes : ['modalClose'],
                	                listener:function(modal){
                	                    modal.hide();
                	                }
                	            }
                	        ];
                   modal.resetBtns(btn);
                   modal.showWithTitle("活动创建完成!");
                } else {
                	err_msg = data.msg;
                    modal.resetBtns(btn2);
                    modal.showWithTitle(data.msg);
                }
            },
            error: function (data, text) {
                modal.showAlert('网络访问异常');
            }
        });
    }

    /**
     * 上一步
     */
    function pre() {
        window.location.href = hdpUrl.set(rootUrl + "/prizeResult", {"id": hdpUrl.get("id")});//设置跳转网页及网页参数
    }

    /**
     * 下一步
     */
    function next(id) {
    	if(id==1){
    		window.location.href = rootUrl + "/draft/";
    	}else if(id==2){
    		window.location.href = rootUrl + "/";
    	}else{
    		window.location.href = rootUrl + "/offline/";//设置跳转网页及网页参数
    	}
    }

    //$('#myModal').on('hidden.bs.modal', function (e) {
    //    next();
    //    // do something...
    //});
    /**
     * 根据返回的信息错误信息内容拼url
     */
    function matchUrl(msg){
    	switch(msg)
    	{
    	case '您必须选择一款游戏':
    	  err_url+="gameChoose?id="+hdpUrl.get("id");
    	  break;
    	case '活动开始页设定不能为空':
    	  err_url+="begin?id="+hdpUrl.get("id");
    	  break;
    	case '活动结束页设定不能为空':
      	  err_url+="end?id="+hdpUrl.get("id");
      	  break;
      	case '活动分享页设定不能为空':
      	  err_url+="share?id="+hdpUrl.get("id");
      	  break;
    	case '活动已中奖设定不能为空':
          err_url+="prizeResult?id="+hdpUrl.get("id");
      	  break;
      	case '活动未中奖设定不能为空':
          err_url+="prizeResult?id="+hdpUrl.get("id")+"&page=2";
      	  break;
    	case '活动抽奖次数用完设定不能为空':
          err_url+="prizeResult?id="+hdpUrl.get("id")+"&page=3";
      	  break;
    	case '活动结束时间小于当前时间':
            err_url+="basic?id="+hdpUrl.get("id");
          break;
    	default:
    	  //to do
    	  break;
    	}
    }

});

$(document).scroll(function() {
    scrollHeight = $(document).scrollTop(),
        scrollHeight > 255 ? ($(".act-4-left").removeClass("less").addClass("big255")) : 255 > scrollHeight && ($(".act-4-left").removeClass("big255").addClass("less255"));
})
