<?php require('common/gameHeader.php') ?>
    <div class="con">
        <div class="qt_menu">
            <span class="span_fang"></span><span class="span_jian"></span><span>游戏列表</span>
        </div>
        <div class="con_info">
            <div class="left_info">
                <img src="<?php echo $icon ?>" class="info_img"/>

                <div class="clear"></div>
            </div>
            <div class="right_info">
                <div class="info">
                    <a href="./edit_my?mid=<?php echo $mid ?>">
                        <dl>
                            <dt><img src="/public/images/info1.jpg"/></dt>
                            <dd>编辑应用</dd>
                        </dl>
                    </a>
                    <a href="/games/<?php echo $keyname ?>?mid=<?php echo $mid ?>">
                        <dl>
                            <dt><img src="/public/images/info2.jpg"/></dt>
                            <dd>打开链接</dd>
                        </dl>
                    </a>
                    <a href="#">
                        <dl>
                            <dt><img src="/public/images/info3.jpg"/></dt>
                            <dd>美化二维码</dd>
                        </dl>
                    </a>
                    <a href="./game_link">
                        <dl>
                            <dt><img src="/public/images/info4.jpg"/></dt>
                            <dd>多点投放</dd>
                        </dl>
                    </a>
                    <a href="#">
                        <dl>
                            <dt><img src="/public/images/info5.jpg"/></dt>
                            <dd>数据统计</dd>
                        </dl>
                    </a>
                    <a href="#" onclick="if(confirm('删除后不可恢复')){location.href='./del_my?mid=<?php echo $mid ?>'}">
                        <dl>
                            <dt><img src="/public/images/info6.jpg"/></dt>
                            <dd>删除应用（不可恢复）</dd>
                        </dl>
                    </a>
                </div>
            </div>
        </div>
        <div class="clear"></div>
    </div>
    <div class="clear"></div>
<?php require('common/gamefooter.php') ?>
