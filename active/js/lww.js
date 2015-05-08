$(function () {

    // 单选，多选美化
    $('input[type="radio"],input[type="checkbox"]').iCheck({
        checkboxClass: 'icheckbox_polaris',
        radioClass: 'iradio_polaris'
    });
    // select美化
    Select.init({
        selector: 'select'
    });

    // 模拟全选
    $('#check-all').on('ifChecked', function (event) {
        $('.form-group').find('input:checkbox').iCheck('check');
    }).on('ifUnchecked', function (event) {
        $('.form-group').find('input:checkbox').iCheck('uncheck');
    });

    // 获取多选框的值
    function get_checkbox_val() {
        items = '';
        $('.item--name input[name="child"]:checked').each(function () { // 多选按钮，每条记录选项都被包含在同一个父层容器请使用此语法排除掉check-all自身
            if (items == '') {
                items = $(this).attr("data-id");
            } else {
                items += "," + $(this).attr("data-id");
            }
        });
        return items;
    }

    // 创建最新索引 (把index/game下的所有文件deleted，在对新索引创建)
    $('.btn-delIndex').on('click', function () {
        $('body').pop({
            msg: '此功能为矫正搜索信息，操作需谨慎，是否真的清空现有索引，创建最新索引？',
            btns: [{
                text: '取消',
                gray: true,
                handler: 'close'
            }, {
                text: '确定',
                handler: function () {
                    // 点了确定后，执行ajax
                    $.ajax({
                        url: root_url + '/game/delIndex'
                    }).done(function (response) {
                        if (response.success) {
                            // suc
                            window.location.reload();
                        } else {
                            // faile
                            $('body').pop({
                                msg: response.msg,
                                btns: [{
                                    text: '确定',
                                    handler: 'close'
                                }]
                            });
                        }
                    });
                }
            }]
        });
    });

    // 多条记录删除事件触发
    $('.btn-del').on('click', function () {
        var ids = get_checkbox_val();
        if (ids !== '') {
            $('body').pop({
                msg: '是否删除选中游戏？',
                btns: [{
                    text: '取消',
                    gray: true,
                    handler: 'close'
                }, {
                    text: '确定',
                    handler: function () {
                        // 点了确定后，执行ajax
                        $.ajax({
                            url: root_url + '/game/' + ids + '/delete'
                        }).done(function (response) {
                            if (response.success) {
                                // suc
                                window.location.reload();
                            } else {
                                // faile
                                $('body').pop({
                                    msg: response.msg,
                                    btns: [{
                                        text: '确定',
                                        handler: 'close'
                                    }]
                                });
                            }
                        });
                    }
                }]
            });
        } else {
            $('body').pop({
                msg: '请选择要删除的游戏！'
            });
        }
    });

    // 单条记录删除事件触发
    $('.del').on('click', function () {
        var ids = $(this).attr("data-id");
        $('body').pop({
            msg: '是否删除选中游戏？',
            btns: [{
                text: '取消',
                gray: true,
                handler: 'close'
            }, {
                text: '确定',
                handler: function () {
                    // 点了确定后，执行ajax
                    $.ajax({
                        url: root_url + '/game/' + ids + '/delete'
                    }).done(function (response) {
                        if (response.success) {
                            // suc
                            window.location.reload();
                        } else {
                            // faile
                            $('body').pop({
                                msg: response.msg,
                                btns: [{
                                    text: '确定',
                                    handler: 'close'
                                }]
                            });
                        }
                    });
                }
            }]
        });
    });

    // 设置为热门
    $('.btn-reMen').on('click', function () {
        var ids = get_checkbox_val();
        if (ids == '') {
            $('body').pop({
                msg: '请选择游戏！'
            });
            return;
        }
        $.ajax({
            url: root_url + '/game/' + ids + '/hot',
            type: 'GET',
            success: function () {
                $('body').pop({
                    msg: '操作成功！'
                });
                window.location.reload();
                $('#hot').removeClass('hide');
            }
        });
    });

    // 设置为推荐
    $('.btn-tuiJian').on('click', function () {
        var ids = get_checkbox_val();
        if (ids == '') {
            $('body').pop({
                msg: '请选择游戏！'
            });
            return;
        }
        $.ajax({
            url: root_url + '/game/' + ids + '/tuiJian',
            success: function () {
                $('body').pop({
                    msg: '操作成功！'
                });
                window.location.reload();
                $('#recommend').show();
            }
        });
    });

    // 设置为收藏
    $('.btn-collect').on('click', function () {
        var ids = get_checkbox_val();
        if (ids == '') {
            $('body').pop({
                msg: '请选择游戏！'
            });
            return;
        }
        $.ajax({
            url: root_url + '/game/' + ids + '/collect',
            type: 'GET',
            success: function () {
                $('body').pop({
                    msg: '操作成功，请到收藏中心查看'
                });
                //window.location.reload();
            }
        });
    });

    // 取消收藏
    $('.btn-unCollect').on('click', function () {
        var ids = get_checkbox_val();
        if (ids == '') {
            $('body').pop({
                msg: '请选择游戏！'
            });
            return;
        }
        $.ajax({
            url: root_url + '/game/' + ids + '/unCollect',
            type: 'GET',
            success: function () {
                $('body').pop({
                    msg: '操作成功！'
                });
                window.location.reload();
            }
        });
    });

    // 游戏预览页设置为收藏
    $('.details-collect').on('click', function () {
        var ids = $('.collect').val();
        if (ids == '') {
            alert("	请选择游戏");
            return;
        }
        $.ajax({
            url: root_url + '/game/' + ids + '/collect',
            type: 'GET',
            success: function () {
                alert('操作成功');
                window.location.reload();
            }
        });
    });

    $('.img').mouseover(function () {
        // console.debug($(this).parent('.item').find('.area'));
        $(this).parent('.item').find('.area').slideDown(300);
    });

    $('.qr').mouseout(function () {
        $('.area').slideUp(300);
    });

    // 单，多条记录删除缓存事件触发
    $('.btn-delCache').on('click', function () {
        var ids = get_checkbox_val();
        if (ids !== '') {
            $('body').pop({
                msg: '是否删除选中游戏缓存？',
                btns: [{
                    text: '取消',
                    gray: true,
                    handler: 'close'
                }, {
                    text: '确定',
                    handler: function () {
                        // 点了确定后，执行ajax
                        $.ajax({
                            url: root_url + '/game/' + ids + '/deleteCache'
                        }).done(function (response) {
                            if (response.success) {
                                // suc
                                window.location.reload();
                            } else {
                                // faile
                                $('body').pop({
                                    msg: response.msg,
                                    btns: [{
                                        text: '确定',
                                        handler: 'close'
                                    }]
                                });
                            }
                        });
                    }
                }]
            });
        } else {
            $('body').pop({
                msg: '请选择要清除缓存的游戏！'
            });
        }
    });

    // 删除全部游戏缓存事件触发
    $('.btn-delAllCache').on('click', function () {
        $('body').pop({
            msg: '是否删除全部游戏缓存？',
            btns: [{
                text: '取消',
                gray: true,
                handler: 'close'
            }, {
                text: '确定',
                handler: function () {
                    // 点了确定后，执行ajax
                    $.ajax({
                        url: root_url + '/game/delAllCache'
                    }).done(function (response) {
                        if (response.success) {
                            // suc
                            window.location.reload();
                        } else {
                            // faile
                            $('body').pop({
                                msg: response.msg,
                                btns: [{
                                    text: '确定',
                                    handler: 'close'
                                }]
                            });
                        }
                    });
                }
            }]
        });
    });

    $('.img').mouseover(function () {
        console.debug("进入");
        // console.debug($(this).parent('.item').find('.area'));
        $(this).parent('.item').find('.area').slideDown(300);
    });

    $('.manager_name').change(function () {

    });
});
