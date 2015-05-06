<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
header("Content-type:text/html;charset=utf-8");
error_reporting(E_ALL);
session_start();

class Active2 extends CI_Controller
{
    public function index()
    {
        $this->load->model('active_model');
        $data['list'] = $this->active_model->all();

        $this->load->view('active/active', $data);
    }

    public function begame1()
    {
        $this->load->model('active_model');
        $data['val'] = $this->active_model->info('id', $this->input->get('id'));

        $this->load->view('active/begame1', $data);
    }

    public function begame2()
    {

        $this->load->model('active_games_model');
        $data['list'] = $this->active_games_model->all();
        $this->load->view('active/begame2', $data);
    }

    public function begame2_1()
    {
        $this->load->model('active_games_model');
        $data['val'] = $this->active_games_model->info('gid', $this->input->get('gid'));
        $this->load->view('active/begame2_1', $data);

    }

    public function begame3()
    {
        $this->load->model('active_model');

        if ($this->input->get('id') && $this->input->get('gid')) {

            $data['gid'] = $this->input->get('gid');
            //var_dump($data);
            $this->active_model->edit($data, $this->input->get('id'));
        }
        $row = $this->active_model->info('id', $this->input->get('id'));
        $data = array();

        if ($row['html_start1'] != '') $data['html'] = file_get_contents('http://qingting.huosu.com/' . $row['html_start1']);
        $data['ischou'] = $row['ischou'];
        $this->load->view('active/begame3_1', $data);
    }

    public function begame3_2()
    {
        $this->load->model('active_model');
        $row = $this->active_model->info('id', $this->input->get('id'));
        if ($row['html_end1'] != '') $data['html'] = file_get_contents('http://qingting.huosu.com/' . $row['html_end1']);
        $data['ischou'] = $row['ischou'];

        $this->load->view('active/begame3_2', $data);
    }

    public function begame3_3()
    {
        $this->load->model('active_model');
        $row = $this->active_model->info('id', $this->input->get('id'));
        if ($row['html_fenxiang1'] != '') $data['html'] = file_get_contents('http://qingting.huosu.com/' . $row['html_fenxiang1']);
        $data['ischou'] = $row['ischou'];
        $this->load->view('active/begame3_3', $data);
    }

    public function begame3_4()
    {
        $this->load->model('active_model');
        $data = $this->active_model->info('id', $this->input->get('id'));
        $this->load->view('active/begame3_4', $data);
    }

    public function begame3_5()
    {
        $data = array();
        $data['html'] = "";
        $this->load->model('active_model');
        $row = $this->active_model->info('id', $this->input->get('id'));
        if ($row['html_prize1'] != '') {
            //$data['html']=file_get_contents('http://qingting.huosu.com/'.$row['html_prize1']);
            $data['html'] = 'aaa';
        }
        $this->load->view('active/begame3_5', $data);
    }

    public function begame4()
    {
        $this->load->model('active_model');
        $this->load->model('active_games_model');
        $row = $this->active_model->info('id', $this->input->get('id'));
        $_GET['gid'] = $row['gid'];
        $games = $this->active_games_model->info('gid', $this->input->get('gid'));
        $data['val'] = $row;
        $data['val']['games'] = $games;
        $this->load->view('active/begame4', $data);
    }

    //游戏开始页
    public function games_info()
    {
        $this->load->model('active_model');
        $this->load->model('active_games_model');
        $row = $this->active_model->info('id', $this->input->get('id'));
        $_GET['gid'] = $row['gid'];
        $games = $this->active_games_model->info('gid', $this->input->get('gid'));
        $this->input->set_cookie("gamesid", $this->input->get('id'), 3600);
        //header("Location:./games_end".$games['href']);
        header("Location:http://qingting.huosu.com/active_games/" . $games['href']);
    }

    //游戏结束页
    public function games_end()
    {
        $this->load->model('active_model');
        $this->load->model('active_games_model');
        if ($this->input->get('score')) $this->input->set_cookie("score", $this->input->get('score'), 100);
        $row = $this->active_model->info('id', $_COOKIE['gamesid']);
        header("Location:http://qingting.huosu.com/" . $row['html_end']);
    }

    //游戏分享页
    public function games_fenxiang()
    {
        $this->load->model('active_model');
        $this->load->model('active_games_model');
        $row = $this->active_model->info('id', $this->input->get('id'));
        $this->input->set_cookie("choujiang", $this->input->get('id'), 10);
        header("Location:http://qingting.huosu.com/" . $row['html_fenxiang']);
    }

    //游戏结抽奖
    public function games_choujiang()
    {
        $this->load->model('active_model');
        $row = $this->active_model->info('id', $this->input->get('id'));
        header("Location:/" . $row['html_prize']);
    }

    public function games_getprize()
    {
        $this->load->model('active_model');
        $this->load->model('prize_model');
        $row = $this->active_model->info('id', $this->input->get('id'));
        $_GET['aid'] = $this->input->get('id');
        $_GET['order'] = 'p_size';
        $data = $this->prize_model->all();
        //$return['title']=;
        for ($i = 0; $i < count($data); $i++) {
            $prize = rand(1, floor(100 / $data[$i]['p_size']));
            if ($prize == 1) {
                $return['pirze_t'] = $row['prize_t'] . date('d') . date('m') . date('s') . date('H') . rand(1, 999);
                $return['title'] = $data[$i]['p_name'];
                $return['img'] = $data[$i]['p_img'];
                break;
            } else {
                $return['pirze_t'] = '';
                $return['title'] = '很遗憾，木有中奖，不要灰心 再玩一次还能参与抽奖';
                $return['img'] = '';
            }
        }
        echo json_encode($return);
    }

    //基本资料提交
    public function active_submit()
    {
        $this->load->model('active_model');

        $f = $_POST['fimg'];
        if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $f, $result)) {
            $type = $result[2];
            if ($type = 'jpeg') $type = 'jpg';
            $new_file = './upload/active/' . date("Ymd-") . time() . rand(1, 9999) . '.' . $type;
            if (file_put_contents($new_file, base64_decode(str_replace($result[1], '', $f)))) {
                $wximg = $new_file;
            };
        }
        $data['title'] = $this->input->post('actName');
        $data['starttime'] = strtotime($this->input->post('startTime'));
        $data['endtime'] = strtotime($this->input->post('endTime'));
        $data['type'] = $this->input->post('scene');
        $data['fenxiangt'] = $this->input->post('wxTitle');
        $data['fenxiangc'] = $this->input->post('wxDesc');
        $data['ischou'] = $this->input->post('ischou');

        if ($wximg) $data['fenxiangi'] = $wximg;
        if ($this->input->post('id')) {
            $this->active_model->edit($data, $this->input->post('id'));
            echo $this->input->post('id');
        } else {
            if ($mid = $this->active_model->ins($data)) {
                echo $mid;
            }
        }

    }

    //开始页提交
    public function active_submit3_1()
    {
        if ($this->input->post('html')) {
            $this->load->model('active_model');
            $row = $this->active_model->info('id', $this->input->post('id'));
            $addtitle = "<script>  document.title = '" . $row['title'] . "'; </script>";
            $f = $this->input->post('html');

            $new_file = 'active/' . date("Ymd-") . time() . rand(1, 9999);
            $new_file1 = $new_file . '1' . '.html';
            $new_file .= '.html';
            file_put_contents($new_file1, $f);
            $f = str_replace('javascript:;', '/index.php/active/games_info?id=' . $_POST['id'], $f);

            $erweima = $this->erweima('http://qingting.huosu.com/' . $new_file);
            $str_start = file_get_contents('active/start.html');
            $str_end = file_get_contents('active/end.html');

            if (file_put_contents($new_file, $str_start . $f . $str_end . $addtitle)) {
                $data['html_start'] = $new_file;
                $data['html_start1'] = $new_file1;
                $data['erweima'] = $erweima;
                $this->active_model->edit($data, $this->input->post('id'));
            };
            echo $this->input->post('id');
        }

    }

    //结束页提交
    public function active_submit3_2()
    {
        if ($this->input->post('html')) {
            $this->load->model('active_model');

            $row = $this->active_model->info('id', $this->input->post('id'));
            $addtitle = "<script>  document.title = '" . $row['title'] . "'; </script>";
            $f = $this->input->post('html');
            $new_file = 'active/' . date("Ymd-") . time() . rand(1, 9999);
            $new_file1 = $new_file . '1' . '.html';
            $new_file .= '.html';
            file_put_contents($new_file1, $f);
            $f = str_replace('javascript:;fenxiang', '/index.php/active/games_fenxiang?id=' . $_POST['id'], $f);
            $f = str_replace('javascript:;', '/index.php/active/games_info?id=' . $_POST['id'], $f);


            $str_start = file_get_contents('active/start.html');
            $str_end = file_get_contents('active/end.html');
            $str_js1 = file_get_contents('active/addjs1.html');
            $str_js = file_get_contents('active/addjs.html');
            if (file_put_contents($new_file, $str_start . $f . $str_js1 . $str_js . $str_end . $addtitle)) {
                $data['html_end'] = $new_file;
                $data['html_end1'] = $new_file1;

                $this->active_model->edit($data, $this->input->post('id'));
            };
            echo $this->input->post('id');
        }

    }

    //分享页
    public function active_submit3_3()
    {
        if ($this->input->post('html')) {
            $this->load->model('active_model');
            $row = $this->active_model->info('id', $this->input->post('id'));
            $addtitle = "<script> if(getCookie('score')){ document.title = '" . $row['fenxiangt'] . "';var str=document.title; str=str.replace('#score#',score);document.title=str; delCookie('score'); }  else { window.location.href='http://qingting.huosu.com/" . $row['html_start'] . "';}</script>";
            $f = $this->input->post('html');

            $new_file = 'active/' . date("Ymd-") . time() . rand(1, 9999) . '.html';
            $str_start = file_get_contents('active/start.html');
            $str_end = file_get_contents('active/end.html');
            $str_fenxiang = file_get_contents('active/addjs_fenxiang.html');

            $fenxiangi = "<div style='display:none'><img src='http://qingting.huosu.com/" . $row['fenxiangi'] . "'></div>";
            if (file_put_contents($new_file, $str_fenxiang . $str_start . $fenxiangi . $f . $str_end . $addtitle)) {
                $data['html_fenxiang'] = $new_file;

                $this->active_model->edit($data, $this->input->post('id'));
            };

            if ($row['ischou'] == 1) echo 'ischou' . $this->input->post('id');
            else {
                echo $this->input->post('id');
            }
        }

    }

    //抽奖页面提交
    public function active_submit3_4()
    {
        $this->load->model('active_model');
        $data['prize_t'] = $this->input->post('convertCodePrefix');
        $data['prize_c'] = $this->input->post('lotteryTotal');
        $data['prize_c1'] = $this->input->post('todayLotteryTotal');
        $this->active_model->edit($data, $_POST['id']);
        header('Location:/active/begame3_5?id=' . $_POST['id']);
    }

    //抽奖结束页面提交
    public function active_submit3_5()
    {
        if ($this->input->post('html')) {
            $this->load->model('active_model');

            $row = $this->active_model->info('id', $this->input->post('id'));
            $addtitle = "<script>  document.title = '" . $row['title'] . "'; $('#layStyle').attr('href','../public/active/css/layout3.css');</script>";
            $f = $this->input->post('html');
            $new_file = 'active/' . date("Ymd-") . time() . rand(1, 9999);
            $new_file1 = $new_file . '1' . '.html';
            $new_file .= '.html';
            file_put_contents($new_file1, $f);
            $f = str_replace('javascript:;fenxiang', '/index.php/active/games_fenxiang?id=' . $_POST['id'], $f);
            $f = str_replace('javascript:;', '/index.php/active/games_info?id=' . $_POST['id'], $f);

            $prize_url = "<script>var pirze_url='http://qingting.huosu.com/active/games_getprize?id=" . $_POST['id'] . "';";
            $str_start = file_get_contents('active/start.html');
            $str_end = file_get_contents('active/end.html');
            $str_js = file_get_contents('active/addjs.html');
            $str_prize = file_get_contents('active/prize.html');
            if (file_put_contents($new_file, $str_start . $f . $str_end . $addtitle . $str_js . $prize_url . $str_prize)) {
                $data['html_prize'] = $new_file;
                $data['html_prize1'] = $new_file1;

                $this->active_model->edit($data, $this->input->post('id'));
            };
            echo $this->input->post('id');
        }

    }

    //游戏列表
    public function  games()
    {
        $this->load->model('active_games_model');
        $data['list'] = $this->active_games_model->all();
        $this->load->view('active/game', $data);
    }

    //生成二维码
    public function erweima($href)
    {
        include('public/phpqrcode.php');
        // 二维码数据
        $data = $href;
        // 生成的文件名
        $filename = 'active/' . date("Ymd-") . time() . rand(1, 9999) . '.png';
        // 纠错级别：L、M、Q、H
        $errorCorrectionLevel = 'L';
        // 点的大小：1到10
        $matrixPointSize = 4;
        //创建一个二维码文件
        QRcode::png($data, $filename, $errorCorrectionLevel, $matrixPointSize, 2);
        return $filename;
    }

    //图片上传
    public function up_img()
    {
        $config['upload_path'] = "active/";
        $config['allowed_types'] = "gif|jpg|png";
        $config['file_name'] = date("Ymd") . rand(1, 999);
        $config['max_size'] = "20000";
        $this->load->library('upload', $config);
        if ($this->upload->do_upload('file')) {
            $file = $this->upload->data();
            $file = $file['file_name'];
        }
        echo '{"content":"' . $file . '"}';
    }
}
