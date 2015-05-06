<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
header("Content-type:text/html;charset=utf-8");
error_reporting(0);
session_start();

class Prize extends CI_Controller
{
    public function index()
    {
        //echo $_GET['id'];
        $this->load->model('prize_model');
        $_GET['aid'] = $_GET['id'];
        $data['list'] = $this->prize_model->all();
        $this->load->view('active/prizelist', $data);
    }

    public function add()
    {
        //$this->load->model('active_model');
        $this->load->model('prize_model');
        $f = $_POST['fimg'];

        if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $f, $result)) {
            $type = $result[2];
            if ($type = 'jpeg') $type = 'jpg';
            $new_file = './upload/active/' . date("Ymd-") . time() . rand(1, 9999) . '.' . $type;
            if (file_put_contents($new_file, base64_decode(str_replace($result[1], '', $f)))) {
                $wximg = $new_file;
            };
        }
        if ($wximg) $data['p_img'] = 'http://qingting.huosu.com' . $wximg;
        $data['p_title'] = $this->input->post('p_title');
        $data['p_count'] = $this->input->post('p_count');
        $data['p_size'] = $this->input->post('p_size');
        $data['p_href'] = $this->input->post('p_href');
        $data['p_name'] = $this->input->post('p_name');
        $data['aid'] = $this->input->post('aid');
        if ($this->input->post('id')) {
            $this->prize_model->edit($data, $this->input->post('id'));
        } else {
            $this->prize_model->ins($data);
        }
    }

    //删除数据
    public function del()
    {
        $this->load->Model('prize_model');

        if ($this->input->get('pid')) {
            //echo $_GET['pid'];
            $this->prize_model->del($this->input->get('pid'));
        }
        $_GET['pid'] = '';
    }

}
