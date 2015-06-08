<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
header("Content-type:text/html;charset=utf-8");
error_reporting(0);
session_start();  
class Tongji extends CI_Controller {
	 public function index(){
		 //echo $_GET['id'];
		 $this->load->model('tongji_model');
		  
		 $list=$this->tongji_model->all();
		$type=array('choujiang'=>'抽奖','start'=>'开始','fenxiang'=>'分享');
		for($i=0;$i<count($list);$i++){
			if($i!=0)$a.=',';
			$a.='{"label":"'.$type[$list[$i]['type']].'","value":'.$list[$i]['count(*)'].'}';
			}
		$data['jdata']='{"chart":{"formatNumberScale":"0"},"data":['.$a.']}'; 
		 $this->load->view('active/tongji',$data);
	 }
	 
	//删除数据
	public function del(){ 
	  $this->load->Model('prize_log_model'); 
	  
	  if($this->input->get('id')){
		   //echo $_GET['pid'];
		   $this->prize_log_model->del($this->input->get('id')); 
	  } 
	  $_GET['pid']=''; 
	}
	 
}



