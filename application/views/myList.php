<?php require('common/gameHeader.php')?>
  <div class="con">
        <div class="qt_menu">
          <span class="span_fang"></span><span class="span_jian"></span><span>游戏列表</span>
        </div>
        <div class="my_game">
            <?php 
       foreach($list as $v){
	       ?>
            <a href="./gameinfo?mid=<?php echo $v['mid']?>"><dl>
              <dt><img src="<?php echo $v['icon']?>" /></dt>
              <dd><?php echo $v['title']?></dd>
            </dl></a>
            <?php }?>
            
        </div>
        <div class="clear"></div>
  </div>
  <?php require('common/gamefooter.php')?>