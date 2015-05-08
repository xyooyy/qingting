$(function () {
    $(document).scrollTop($('.step-show').offset().top + 28);
    //当用户由第三步时选上一步进入此页面是进行页面初始化
    var id = hdpUrl.get("id");
    if (id) {
        var url = rootUrl + "/game/choose.json";
        $.ajax(url, {
            data: {
                id: id
            },
            dataType: "json",
            type: "post",
            success: function (data, text) {
                if (data.success) {
                    $(".unChoice").hide();
                    $(".choice").attr('data-id', data.content).show();
                    //获取游戏详情
                    getDetail(data.content);
                }
            },
            error: function (data, text) {

            }
        });
    }


    //单选，多选化
    //$('.btn-all input, .check input, .comm-form input[type="radio"], .comm-form input[type="checkbox"]').iCheck({
    //    checkboxClass: 'icheckbox_polaris',
    //    radioClass: 'iradio_polaris'
    //});
    //select美化
    //Select.init({selector: 'select'});

    //其他游戏触发
    $(".other-game .other-game-btn .choice-btn").click(function () {
        $(".other-game-btn").hide();
        $(".other-game-main").show();
    });

    //展开游戏库
    //$(".choice-btn").click(function(){
    //    $(".other-game-btn").hide();
    //    $(".other-game-main").show();
    //});

    //游戏详细图片展示

    //var l = $(".scrollimg-main").children("img").length;
    //var w = 300 * l + 45 * l;
    //$(".scrollimg-main").css({"width":w + "px"});

    //选择游戏
    //$(".comm-form .unChoice .icheckbox_polaris ins").click(function(){
    //    $(".unChoice").hide();
    //    $(".choice").show();
    //});
    //删除重新选择
    //$(".comm-form .choice a.del").click(function(){
    //    $(".choice").hide();
    //    $(".unChoice").show();
    //});

    /**********************kiner**********************/

    init();//进行页面初始化操作  kiner

    /**
     * kiner
     * 页面数据初始化
     */
    function init() {

        //getStep(window);
        /**
         * 获取推荐游戏（6个）
         */
        getGame({
            target: $('.recommend .game-list'),
            page: 1,
            url: rootUrl + "/game/random",
            size: 6,
            total: 12,
            type: "all"
        });

        /**
         * 换一批推荐游戏
         */
        $('.kiner-game-6').click(function () {

            (!$(this).attr('page') || $(this).attr('page') == "1") ? $(this).attr('page', 2) : $(this).attr('page', 1);//

            getGame({
                target: $('.recommend .game-list'),
                page: $(this).attr('page'),//如果采用随机方式获取则无需提供此参数
                size: 6,//如果采用随机方式获取则无需提供此参数
                total: 12,//如果采用随机方式获取则无需提供此参数
                url: rootUrl + "/game/random",
                type: "all"
            });

        });

        /**
         * 获取其他游戏
         */

        $(".choice-btn").click(function () {
            $(".other-game-btn").hide();
            $(".other-game-main").show();

            getGame({
                target: $('.other-game-main .game-list'),
                page: 1,
                size: 12,
                total: 12,
                url: rootUrl + "/game/list",
                type: "all"
            });

        });

        /**
         * 分类选择
         */
        $('select[name="usage"]').change(function () {
            getGame({
                target: $('.other-game-main .game-list'),
                page: 1,
                url: rootUrl + "/game/list",
                size: 12,
                total: 12,
                type: $(this).val()
            });
        });

        $('.pre').click(function () {
            pre();
        });
        $('.next').click(function () {
            if (isnext) {
                submit();
            } else {
                window.modal.showAlert('至少选择一个游戏');
            }

        });

    }

    /**
     * 上一步
     */
    function pre() {
        //window.location.href = "./activities_step1.html";
        window.location.href = hdpUrl.set(rootUrl + "/index.php/active/begame1", "id", hdpUrl.get("id"));//设置跳转网页及网页参数
    }

    /**
     * 下一步
     */
    function next() {
        window.location.href = hdpUrl.set(rootUrl + "/index.php/active/begame3_1", "id", hdpUrl.get("id"));//设置跳转网页及网页参数
        //window.location.href = "./activities_step3.html";
    }


    /**
     * 返回数据data的格式:
     * {
     *      "success" : true|false,//返回结果，成功或失败
     *      "message" : "描述，如：获取数据成功；页数不能为空" ,
     *      "data"    : {}, //需要传回前端的数据，如:{ "name" : "kiner" , sex:"male" , hobit : [ "","","" ] },
     *      "total"   : 1200//如果分页获取，需要查询结果数据的总数量
     * }
     *
     */
    function submit() {
        var url = rootUrl + "/game/save.json";
        $.ajax(url, {
            data: {
                id: hdpUrl.get("id"),
                gid: $(".choice").attr('data-id'),//游戏id
                step: 3
            },
            dataType: "json",
            type: "post",
            success: function (data) {
                if (data.success) {
                    next();
                } else {
                    modal.showAlert(data.msg);
                }
            },
            error: function (data) {
                //modal.showAlert('网络访问异常');
            }
        });
    }

    /**
     * kiner
     * 获取游戏
     * @param   target  将获取的数据放到该元素中
     * @param   page    分页获取游戏的页数
     * @param   size    分页获取游戏一页显示游戏的个数
     * @param   total   总共有多少条数据
     * @param   type    游戏类型——用于分类筛选
     */
    function getGame(options) {

        var setting = {
            target: $(),
            page: 1,
            size: 6,
            total: 12,
            type: "all"
        };
        var opt = $.extend(setting, options);
        var target = opt["target"], page = opt["page"], size = opt["size"], total = opt["total"], type = opt["type"];

//        var num = page * size;
//        if (num > total) {
//            alert("翻那么快干嘛！都没数据啦！");
//            return;
//        }

        var url = opt.url;
        $.ajax(url, {
            data: {
                action: "step2_games",  //动作
                page: page || 1,   //分页获取数据的页数
                size: size || 6,    //一页显示多少条
                type: type
            },
            dataType: "json",
            type: "post",
            success: function (data) {

                console.log(data);
                if (data.success) {//是否成功获取预期数据
                    //$('.recommend .game-list').empty();
                    var list = data.content.infoToMap;
                    target.empty();
                    for (var i = 0; i < list.length; i++) {
                        var item = list[i];
                        target.append('<li id="' + item.id + '">' +
                        '<div class="litpic">' +
                        '<img src="' + item.src + '">' +
                        '</div>' +
                        '<div class="item-name">' +
                        '<input class="kiner-choice-game" type="radio" name="child" data-id="' + item.id + '">' +
                        '<span>' +
                        item.name +
                        '</span>' +
                        '</div>' +
                        '</li>');

                        //单选，多选化
                        $('.btn-all input, .check input, .comm-form input[type="radio"], .comm-form input[type="checkbox"]').iCheck({
                            radioClass: 'icheckbox_polaris'
                        });
                        //select美化
                        Select.init({selector: 'select'});

                        var paginationMap = data.content.paginationMap;
                        if (typeof(paginationMap) != "undefined") {
                            var currPageNO = paginationMap.paginationData.pageNumber;
                            var pagesAvailable = paginationMap.paginationData.pagesAvailable;
                            $("#page_pre_a").val(currPageNO - 1 > 0 ? currPageNO - 1 : currPageNO);//上一页
                            $("#page_next_a").val(currPageNO + 1 <= pagesAvailable ? currPageNO + 1 : pagesAvailable);//下一页
                            $("#page_current_a").html(paginationMap.paginationData.pageNumber);//当前页面
                            $("#allRecordNO").html(paginationMap.paginationData.pagesAvailable);//总页数
                            if (currPageNO - 1 > 0) {
                                $("#page_current_pre").show();
                                $("#page_current_pre_a").html(currPageNO - 1);
                            } else {
                                $("#page_current_pre").hide();
                            }
                            if (currPageNO + 1 <= pagesAvailable) {
                                $("#page_current_next").show();
                                $("#page_current_next_a").html(currPageNO + 1);
                            } else {
                                $("#page_current_next").hide();
                            }
//                        	$("#home_page_a").val(1);//首页
//                        	$("#end_page_a").val(paginationMap.paginationData.pagesAvailable);//尾页
                        }
                    }

                    //显示游戏详情页
                    $('.kiner-choice-game').on('ifChecked', function (event) {

                        //$(this).iCheck('check');
                        $(".unChoice").hide();
                        $(".choice").attr('data-id', $(this).attr('data-id')).show();

                        //获取游戏详情
                        getDetail($(this).attr('data-id'));

                    });
                    //删除重新选择
                    $(".comm-form .choice a.del").click(function () {
                        $(".choice").hide();
                        $(".unChoice").show();
                        $('.kiner-choice-game').iCheck('uncheck');
                        $('.choice').removeAttr('data-id');
                    });

                } else {
                    modal.showAlert(data.msg);
                }
            },
            error: function (data) {
                //modal.showAlert('网络访问异常');
            }
        });
    }

    var isnext = false;//是否可以进入下一步
    /**
     * kiner
     * 获取游戏详情
     * @param id
     */
    function getDetail(id) {
        var url = rootUrl + "/game/detail.json";
        $.ajax(url, {
            data: {
                id: id
            },
            beforeSend: function () {
                $('.choice .scrollimg-main').empty();
                $('.choice .litpic img').attr('src', rootUrl + '/assets/images/scroll-img.jpg');
                $('.choice .kiner-game-name').text('');
                $('.choice .text').text('');
            },
            dataType: "json",
            type: "post",
            success: function (data) {
                if (data.success) {
                    isnext = true;
                    $('.choice .litpic img').attr('src', data.content.mainpic);
                    $('.choice .kiner-game-name').text(data.content.name);
                    $('.choice .text').text(data.content.intro);
                    var pics = data.content.imgs;
                    for (var i = 0; i < pics.length; i++) {

                        $('.scrollimg-main').append('<img src="' + rootUrl + "/" + pics[i] + '">');

                    }

                    //游戏详细图片展示
                    var l = $(".scrollimg-main").children("img").length;
                    var w = 300 * l + 45 * l;
                    $(".scrollimg-main").css({"width": w + "px"});
                } else {
                    modal.showAlert(data.msg);
                }
            },
            error: function (data) {
                modal.showAlert('网络访问异常');
            }
        });

        //分页（下一页）
        $("#page_next").click(function () {
            getGame({
                target: $(".other-game-main .game-list"),
                page: parseInt($("#page_next_a").val()),
                url: rootUrl + "/game/list",
                size: 12,
                type: ($('select[name="usage"]').val())
            });
        });
        //分页（上一页）
        $("#page_pre").click(function () {
            getGame({
                target: $(".other-game-main .game-list"),
                page: parseInt($("#page_pre_a").val()),
                url: rootUrl + "/game/list",
                size: 12,
                type: ($('select[name="usage"]').val())
            });
        });

        //
        $("#page_current_pre").click(function () {
            getGame({
                target: $(".other-game-main .game-list"),
                page: parseInt($("#page_current_pre_a").html()),
                url: rootUrl + "/game/list",
                size: 12,
                type: ($('select[name="usage"]').val())
            });
        });
        $("#page_current_next").click(function () {
            getGame({
                target: $(".other-game-main .game-list"),
                page: parseInt($("#page_current_next_a").html()),
                url: rootUrl + "/game/list",
                size: 12,
                type: ($('select[name="usage"]').val())
            });
        });
//        //分页（尾页）
//        $("#end_page_a").click(function () {
//        	getGame({
//        		target: $(".other-game-main .game-list"),
//        		page: parseInt($("#end_page_a").val()),
//        		url : rootUrl + "/game/list",
//        		type: ($('select[name="usage"]').val())
//        	});
//        });
//        //分页（首页）
//        $("#home_page_a").click(function () {
//        	getGame({
//        		target: $(".other-game-main .game-list"),
//        		page: parseInt($("#home_page_a").val()),
//        		url : rootUrl + "/game/list",
//        		type: ($('select[name="usage"]').val())
//        	});
//        });
    }

    /**********************kiner**********************/


    $('.icheckbox_polaris').on('click',function(){
        var me = this;

        if(! $(me).hasClass('checked')){
            $('.icheckbox_polaris').removeClass('checked');
            $(".kiner-choice-game").prop('checked',false);
            $(me).addClass('checked');
            $(me).children('.kiner-choice-game').prop('checked',true);
            $('.next').attr('href', $(me).next().attr('href'));
            console.log($('.next').attr('href'))

        }else{
            $(me).removeClass('checked');
            $(me).children('.kiner-choice-game').prop('checked',false);
        }


    });
});
