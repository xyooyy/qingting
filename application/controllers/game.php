<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
header("Content-type:text/html;charset=utf-8");
error_reporting(0);
session_start();

class Game extends CI_Controller
{
    //游戏列表
    public function index()
    {
        $this->load->Model('game_model');
        $data['list'] = $this->game_model->all();
        $data['num'] = $this->game_model->con();

        $this->input->set_cookie("now_header", 'index', 3600);
        $data['now_header'] = 'index';
        $this->load->view('gameList', $data);
    }

    //进入游戏
    public function info()
    {
        if ($_GET['mid']) $this->load->Model('game_my_model', 'game_model');
        else {
            $this->load->Model('game_model');
        }
        $data = $this->game_model->all();
        //var_dump($data);
        if ($data[0]['keyname'] != '') $this->load->view('games/' . $data[0]['keyname'] . '/index', $data['list'][0]);
        else {
            $this->err();
        }
    }

    //我的游戏列表
    public function my()
    {
        $this->load->Model('game_my_model', '', TRUE);
        $data['list'] = $this->game_my_model->all();
        $data['num'] = $this->game_my_model->con();
        $this->input->set_cookie("now_header", 'my', 3600);
        $data['now_header'] = 'my';
        $this->load->view('myList', $data);
    }

    //我的游戏内容页
    public function gameinfo()
    {
        $this->load->Model('game_my_model', 'game_model');
        $data = $this->game_model->all();
        $this->load->view('gameInfo', $data[0]);
    }

    public function err()
    {
        echo "信息错误，error";
    }

    //生成游戏页
    public function make()
    {
        if (isset($_GET['id'])) {
            $this->load->Model('game_model');
            $this->load->Model('game_info_model');
            $list = $this->game_model->all();
            $data['list'] = $list[0];
            $_GET['gid'] = $data['list']['id'];
            $_GET['tp'] = 'text';
            $data['list']['games_t'] = $this->game_info_model->all();
            $_GET['tp'] = 'img';
            $data['list']['games_i'] = $this->game_info_model->all();
            //var_dump($data['list']['games']);
            $this->load->view('begame', $data);
        }
    }

    public function tab_list()
    {
        //$this->load->Model('userlogin_model');
        //$tab=$this->userlogin_model->tab();
        return $tab;
    }

    //添加信息
    public function edit_my()
    {
        $data['tab'] = $this->tab_list();
        $this->load->Model('game_my_model');
        $this->load->Model('game_my_info_model');
        if ($this->input->get('mid')) {
            $rs = $this->game_my_model->all();
            $data['list'] = $rs[0];
            $_GET['gid'] = $data['list']['mid'];
            $_GET['tp'] = 'text';
            $data['list']['games_t'] = $this->game_my_info_model->all();
            $_GET['tp'] = 'img';
            $data['list']['games_i'] = $this->game_my_info_model->all();
        } else {
            $data = array();
        }

        $this->load->view('begame', $data);
    }

    public function ins_my()
    {
        $this->load->Model('game_my_model');
        $this->load->Model('game_my_info_model');

        //$data['id']=$this->input->post('id');
        $data['title'] = $this->input->post('title');
        $data['info'] = $this->input->post('info');
        $data['icon'] = $this->input->post('icon1');
        $data['keyname'] = $this->input->post('keyname');
        $data['fenxiang'] = $this->input->post('fenxiang');
        $data['fenxiangc'] = $this->input->post('fenxiangc');
        $data['fenxiangi'] = $this->input->post('fenxiangi1');
        $data['moregame'] = $this->input->post('moregame');
        $data['moregameh'] = $this->input->post('moregameh');
        $data['userid'] = $_SESSION['userid'];
        //var_dump($data);
        if ($this->input->post('mid')) {
            if ($this->game_my_model->edit($data, $this->input->post('mid'))) {
                for ($i = 1; $i < 11; $i++) {
                    $data_edit['gid'] = $this->input->post('mid');
                    $data_edit['key'] = 'text' . $i;
                    $data_info['val'] = $this->input->post('text' . $i);
                    if ($this->input->post('text' . $i)) $this->game_my_info_model->edit($data_edit, $data_info);
                }
                for ($i = 1; $i < 11; $i++) {
                    $data_edit['gid'] = $this->input->post('mid');
                    $data_edit['key'] = 'img' . $i;
                    $data_info['val'] = $this->input->post('img' . $i . "1");
                    if ($this->input->post('img' . $i . "1")) $this->game_my_info_model->edit($data_edit, $data_info);
                }
            }
        }

    }

    //删除数据
    public function del_my()
    {
        $this->load->Model('game_my_model');
        $this->load->Model('game_my_info_model');
        if ($this->input->get('mid')) {
            $this->game_my_model->del($this->input->get('mid'));
            $this->game_my_info_model->del($this->input->get('mid'));
        }
        $_GET['mid'] = '';
        $this->my();
    }

    //ajax上传图片
    public function img_ajax()
    {
        $this->load->Model('game_my_model');
        $config['upload_path'] = "upload/user/";
        $config['allowed_types'] = "gif|jpg|png";
        $config['file_name'] = date("Ymd") . rand(1, 999);
        $config['max_size'] = "20000";
        $this->load->library('upload', $config);
        if ($this->upload->do_upload($_POST['now_img'])) {
            $file = $this->upload->data();
            $file = $file['file_name'];
        }
        $this->load->library('image_lib');

        list($width, $height) = getimagesize("upload/123.jpg");
        $config['image_library'] = 'gd2';
        $config['source_image'] = 'upload/123.jpg';
        $config['maintain_ratio'] = TRUE;

        $config['width'] = 240;
        $config['height'] = 240;
        $this->image_lib->initialize($config);
        $this->image_lib->resize();

        $config['maintain_ratio'] = FALSE;

        $this->image_lib->initialize($config);
        $this->image_lib->crop();
        echo "<script>window.parent.uploadSuccess('/" . $config['upload_path'] . $file . "');</script>";
    }

    //ajax生成预览
    public function game_make()
    {

        $this->load->Model('game_my_model');
        $this->load->Model('game_my_info_model');

        $data['id'] = $this->input->post('id');
        if ($mid = $this->game_my_model->ins($data)) {
            for ($i = 1; $i < ($_POST['text_count'] + 1); $i++) {
                $data_info['gid'] = $mid;
                $data_info['key'] = 'text' . $i;
                $data_info['val'] = '';
                $data_info['tp'] = 'text';
                $this->game_my_info_model->ins($data_info);
            }
            for ($i = 1; $i < ($_POST['img_count'] + 1); $i++) {
                $data_info['gid'] = $mid;
                $data_info['key'] = 'img' . $i;
                $data_info['val'] = '';
                $data_info['tp'] = 'img';
                $this->game_my_info_model->ins($data_info);
            }
            echo $mid;
        }
    }


    //多点投放
    public function game_link()
    {
        $this->load->Model('game_link_model');
        $this->load->view('gameLink', $data);

    }
}
