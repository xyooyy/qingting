$(function () {
    $(document).scrollTop($('.step-show').offset().top + 28);
    //当用户由第三步时选上一步进入此页面是进行页面初始化
    var id = hdpUrl.get("id");

    function handle_pre_and_next_click(){
        $('.pre').on('click',function(){
            window.location.href = hdpUrl.set(rootUrl + "/index.php/active/begame1", "id", hdpUrl.get("id"));//设置跳转网页及网页参数
        });

        $('.next').on('click',function(){
            //just for begame2_1
            if($(this).hasClass('no_validate')){
                return true;
            }
            else if($(".kiner-choice-game:checked").length == 0){
                window.modal.showAlert('至少选择一个游戏');
                return false;
            }
            return true;
        });
    }

    function init_active_games(){
        $('.icheckbox_polaris').on('click',function(){
            var me = this;

            if(! $(me).hasClass('checked')){
                $('.icheckbox_polaris').removeClass('checked');
                $(".kiner-choice-game").prop('checked',false);
                $(me).addClass('checked');
                $(me).children('.kiner-choice-game').prop('checked',true);
                $('.next').attr('href', $(me).next().attr('href'));

            }else{
                $(me).removeClass('checked');
                $(me).children('.kiner-choice-game').prop('checked',false);
                $('.next').attr('href', 'javascript:void(0);');
            }
        });

        $('.active_game_img').on('mouseover',function(){
            $(this).next().show();
            $(this).hide();
        });

        $('.active_game_qrcode').on('mouseleave',function(){
            $(this).prev().show();
            $(this).hide();
        });
    }

    handle_pre_and_next_click();
    init_active_games();

});
