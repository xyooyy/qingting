<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <link href="/public/css/admin.css" rel="stylesheet" type="text/css">
    <script type="text/javascript" src="/public/js/jquery-1.7.2.min.js"></script>
</head>

<body>
<div class="content">
    <div class="con">
        <ul class="con_ul">
            <?php
            foreach ($list as $v) {
                ?>
                <li>
                    <div class="con_d1">
                        <img src="<?php echo $v['icon']?>" width="114" height="114">
                    </div>
                    <div class="con_d2">
                        <h2><?php echo $v['title']?></h2>

                        <p><?php echo $v['info']?></p>
                    </div>
                    <div class="con_d3">
                        <a href="http://qingting.huosu.com/games/<?php echo $v['keyname']?>/?id=<?php echo $v['id']?>"><input
                                type="button" value="打开" class="clie con_d3_i"></a>
                        <a href="/index.php/game/make?id=<?php echo $v['id']?>"><input type="button" value="生成游戏"
                                                                                       class="clie con_d3_i"></a>
                    </div>
                </li>
            <?php
            }
            ?>
        </ul>
        <div class="clear"></div>
    </div>
    <div class="pag">
        <ul class="pag_ul">
            <?php
            require("./public/page_class.php");
            $nums = $num;
            $subPages = new SubPages(15, $nums, $this->input->get('p'), 5, "./my?w=" . $this->input->get('w') . "&p=", 2);
            ?>
        </ul>
    </div>
</div>
</body>
</html>
