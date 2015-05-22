<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
header("Content-type:text/html;charset=utf-8");
error_reporting(0);
session_start();

class Prize_log extends CI_Controller
{
    public function index()
    {
        //echo $_GET['id'];
        $this->load->model('prize_log_model');

        $data['list'] = $this->prize_log_model->all();
        $this->load->view('active/prize_loglist', $data);
    }

    //删除数据
    public function del()
    {
        $this->load->Model('prize_log_model');

        if ($this->input->get('id')) {
            //echo $_GET['pid'];
            $this->prize_log_model->del($this->input->get('id'));
        }
        $_GET['pid'] = '';
    }

}
