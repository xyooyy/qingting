<?php require('common/gameHeader.php')?>
  <div class="con">
        <div class="qt_menu">
          <span class="span_fang"></span><span class="span_jian"></span><span>游戏列表</span>
        </div>
        <div class="game_link">
            <div class="link_head"><input type="button" class="del_button" value="删除" /><input type="button" class="add_button" value="新增投放点" /></div>
            <table class="link_table">
              <!--<tr>
                <Th><input type="checkbox"  name="del_id[]"/></Th>
                <th>二维码</th>
                <th>链接</th>
                <th>名称</th>
                <th>操作</th>
                
              </tr>-->
              <tr>
                <Td width="3%"><input type="checkbox"  name="del_id[]" value=""/></Td>
                <td width="7%"><img src="/public/images/erweima.jpg" width="40" height="40" /><img src="/public/images/21.png"  style="margin-left:1em;"/></td>
                <Td width="70%">http://www.huosu.com?uid=123123&usd=12321312i&jd=1237182Hhjds</Td>
                <td width="15%">寻找逆天邪神</td>
                <Td width="5%"><input type="button" class="del_button" value="删除" /></Td>
              </tr>
              <tr>
                <Td width="3%"><input type="checkbox"  name="del_id[]" value=""/></Td>
                <td width="7%"><img src="/public/images/erweima.jpg" width="40" height="40" /><img src="/public/images/21.png"  style="margin-left:1em;"/></td>
                <Td width="70%">http://www.huosu.com?uid=123123&usd=12321312i&jd=1237182Hhjds</Td>
                <td width="15%">寻找逆天邪神</td>
                <Td width="5%"><input type="button" class="del_button" value="删除" /></Td>
              </tr>
              <tr>
                <Td width="3%"><input type="checkbox"  name="del_id[]" value=""/></Td>
                <td width="7%"><img src="/public/images/erweima.jpg" width="40" height="40" /><img src="/public/images/21.png"  style="margin-left:1em;"/></td>
                <Td width="70%">http://www.huosu.com?uid=123123&usd=12321312i&jd=1237182Hhjds</Td>
                <td width="15%">寻找逆天邪神</td>
                <Td width="5%"><input type="button" class="del_button" value="删除" /></Td>
              </tr>
              
            </table>
        </div>
        <div class="clear"></div>
  </div>
  <?php require('common/gamefooter.php')?>