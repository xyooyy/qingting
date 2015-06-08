<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
header("Content-type:text/html;charset=utf-8");
//error_reporting(0);
session_start();  
class Yiqixiu extends CI_Controller {
	  
	 public function index(){ 
	      $this->load->Model('userlogin_model');
		  $now_user= $this->userlogin_model->info('username',$this->session->userdata('username'));
	      $user=$this->userlogin_model->info_yiqixiu('email_varchar',$this->session->userdata('username'));
		  if($user['userid_int']>0){
			  header('location:http://qingting_test.huosu.com?userid='.$user['userid_int']);
			  }
		  else{
			  $data['email_varchar']=$this->session->userdata('username');
			  $data['password_varchar']=md5($now_user['password']);
			  $mid=$this->userlogin_model->ins_yiqixiu($data);
			  header('location:http://qingting_test.huosu.com?userid='.$mid);
			  }
	 }
	 
}
