<?php require('common/gameHeader.php')?>
  <div class="con">
        <div class="qt_menu">
          <span class="span_fang"></span><span class="span_jian"></span><span>游戏列表</span>
        </div>
        <div class="game_list">
            <div class="left">
              <ul>
                <a href="?type="><li class="now_tp">全部</li></a>
                <a href="?type=1"><li>分类一</li></a>
                <a href="?type=2"><li>分类二</li></a>
                <a href="?type=3"><li>分类三</li></a> 
              </ul>
              <div class="clear"></div>
            </div>
            <div class="right">
              <div class="game_con"><ul>
                 <ul>
					<?php 
					      $i=0;
                          foreach($list as $v){
						  $i++;
                    ?>
                   <li class="<?php echo $i%2==0?'no_b':''?>">
                     <img src="<?php echo $v['icon']?>" />
                     <span><?php echo $v['title']?></span>
                     <p><?php echo $v['info']?></p>
                     <p><a target="_blank" href="http://qingting.huosu.com/games/<?php echo $v['keyname']?>/?id=<?php echo $v['id']?>"><input type="button" class="b_l" value="浏览" /></a>
                        <a href="./make?id=<?php echo $v['id']?>"><input type="button" class="b_c" value="创作" /></a></p>
                   </li>
                   <?php  }?> 
                    
                 </ul>
              </ul>
                <div class="clear"></div>
              </div>
            </div>
        </div>
        <div class="clear"></div>
  </div>
  <div class="clear"></div>
  <?php require('common/gameFooter.php');?>