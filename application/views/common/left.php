<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <link href="/public/css/admin.css" rel="stylesheet" type="text/css">
    <script type="text/javascript" src="/public/js/jquery-1.7.2.min.js"></script>
</head>

<body>
<div class="left">
    <div class="l_top">
        <span class="l_top_span"><a href="/index.php/game/index" class="l_top_a" target="if_r">游戏列表</a></span><b
            class="l_top_span1">|</b><span class="l_top_span2"><a href="/index.php/game/my"
                                                                  target="if_r">我的游戏</a></span>
        <ul style="display:<?php echo $now_left ? 'none' : 'block'; ?>;">
            <a href="/index.php/game/index" target="if_r">
                <li id="li_now">全部游戏</li>
            </a>
            <li>男生游戏</li>
            <li>体育游戏</li>
            <li>射击游戏</li>
            <li>动作酷跑</li>
            <li>攻防大战</li>
            <!--<a href="/index.php/game/index" target="if_r"><li>男生游戏</li></a>
            <a href="/index.php/game/index" target="if_r"><li>女生游戏</li></a> -->
        </ul>
        <ul></ul>
        <ul style="display:<?php echo $now_left ? 'block' : 'none'; ?>">
            <li><input type="button" class="my_c clie sub_c_s" value="创建主题"></li>
            <li class="sub_c">
                <form action="./ins_tab" method="post" id="form1"><input type="text" name="name" class="my_t input">
                </form>
            </li>
            <li class="sub_c"><input type="button" class="my_b1 clie sub_c_s2" value="保存"><input type="button"
                                                                                                 class="my_b2 clie sub_c_s1"
                                                                                                 value="取消"></li>
            <?php
            foreach ($list as $v) {
                ?>
                <a href="/index.php/game/my?type=<?php echo $v['id']?>" target="if_r">
                    <li><?php echo $v['name']?><b
                            onClick="if(confirm('确定删除主题？ ')){location.href='./del_tab?id=<?php echo $v['id']?>';}">[删除]</b>
                    </li>
                </a>
            <?php
            }
            ?>
        </ul>
    </div>
</div>
<script>
    $(".l_top span a").click(function () {
        $(".l_top span a").attr('class', '');
        $(".l_top ul").css('display', 'none');
        $(this).attr('class', 'l_top_a');
        $('.l_top ul').eq($(this).parent().index()).show();
    })
    $(".sub_c_s").click(
        function () {
            $(".sub_c").show();
        }
    )
    $(".sub_c_s1").click(
        function () {
            $(".sub_c").hide();
        }
    )
    $(".sub_c_s2").click(function () {
        if ($(".my_t").val().length > 0)$("#form1").submit();
    })

    $(".l_top ul").children('a').click(function () {

        $(".l_top ul").children().children().attr('id', '');
        $(this).children().attr('id', 'li_now');
    })
</script>
</body>
</html>
