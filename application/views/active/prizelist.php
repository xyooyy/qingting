   <table>
                                            <thead>
                                            <tr>
                                                <td class="title">
                                                    奖项标题
                                                </td>
                                                <td class="name">
                                                    奖品名称
                                                </td>
                                                <td class="number">
                                                    奖品数量
                                                </td>
                                                <td class="probability">
                                                    中奖概率
                                                </td>
                                                <td class="control">
                                                    操作
                                                </td>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <?php foreach($list as $v){?>
                                            
                                            <tr id="p_<?php echo $v['id']?>"><td class="title"><?php echo  $v['p_title']?></td><td class="name"><?php echo  $v['p_name']?></td><td class="number"><?php echo  $v['p_count']?>份</td><td class="probability"><?php echo  $v['p_size']?>%</td><td class="control"><a href="javascript:;" class="update"  onclick="prize_edit('<?php echo  $v['p_title']?>','<?php echo  $v['p_name']?>','<?php echo  $v['p_count']?>','<?php echo  $v['p_size']?>','<?php echo  $v['p_img']?>','<?php echo  $v['id']?>','<?php echo $v['p_href']?>')"><i class="icon icon-edit"></i>修改</a>|<a href="javascript:;" class="del"  onclick="prize_del(<?php echo $v['id']?>)"><i class="icon icon-del"></i>删除</a></td></tr>
                                            <?php  } ?>
                                            </tbody>
                                        </table>
                                        <script>
                                         function prize_edit(p_title,p_name,p_count,p_size,p_img,pid,p_href){
											  $("#p_title").val(p_title);
											  $("#p_name").val(p_name);
											  $("#p_count").val(p_count);
											  $("#p_size").val(p_size);
											  $("#p_href").val(p_href);
											  $("#pid").val(pid);
											  $("#jiangpin_img").attr('src',p_img);
										  }
										 function prize_del(id){
											   //$.get("/index.php/prize/del", { pid: id} );
											   $.get("/index.php/prize/del?pid="+id,function(data){ $("#p_"+id).hide();} );
											     
											   
											 }
                                        </script>