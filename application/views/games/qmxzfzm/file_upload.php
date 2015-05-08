<?php
function uoload_img($file_name, $destination_folder)
{
    $max_file_size = 2000000;     //上传文件大小限制, 单位BYTE
    $destination_folder = $destination_folder; //上传文件路径
    $imgpreview = 0;      //是否生成预览图(1为生成,其他为不生成);
    $imgpreviewsize = 1 / 1;    //缩略图比例

    if (!is_uploaded_file($_FILES[$file_name][tmp_name])) //是否存在文件
    {
        echo "文件不存在或内容过大";
        exit;
    }

    $file = $_FILES[$file_name];
    if ($max_file_size < $file["size"]) //检查文件大小
    {
        echo "文件太大!";
        exit;
    }
    /*
      if(!in_array($file["type"], $uptypes))
      //检查文件类型
      {
          echo "文件类型不符!".$file["type"];
          exit;
      }
    */
    if (!file_exists($destination_folder)) {
        mkdir($destination_folder);
    }

    $filename = $file["tmp_name"];
    $image_size = getimagesize($filename);
    $pinfo = pathinfo($file["name"]);
    $ftype = $pinfo['extension'];
    $destination = $destination_folder . time() . rand(1, 9999) . "." . $ftype;
    if (file_exists($destination) && $overwrite != true) {
        echo "同名文件已经存在了";
        exit;
    }

    if (!move_uploaded_file($filename, $destination)) {
        echo "移动文件出错";
        exit;
    }

    $pinfo = pathinfo($destination);
    $fname = $pinfo[basename];
    echo " <font color=red>已经成功上传</font><br>";

    if ($imgpreview == 1) {
        echo "<br>图片预览:<br>";
        echo "<img src=\"" . $destination . "\" width=" . ($image_size[0] * $imgpreviewsize) . " height=" . ($image_size[1] * $imgpreviewsize);
        echo " alt=\"图片预览:\r文件名:" . $destination . "\r上传时间:\">";
    }
    return $destination;
}

?>
