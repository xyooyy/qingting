<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
header("Content-type:text/html;charset=utf-8");
error_reporting(0);
session_start();  
class Kuaizhan extends CI_Controller {
	 public $kuaizhanurl='https://api.kuaizhan.com';
	 public function login(){ 
	 
	      $this->load->Model('userlogin_model'); 
		  
	      $url=$this->kuaizhanurl;
		  $ul='/v1/passports/';
		  $header=$this->sign('POST',$ul);
		  
		  $body["email"]=$this->session->userdata('username');
		  $body["phone"]='';
		  $body["thirdpart_user_id"]='2';
		  $row=$this->_curl_request($url.$ul,$body,$header);
		  //var_dump($row);exit;
		  $row=json_decode($row,true);
		  
		  if($row['data']['user_id']>0){
			  $data['kzid']=$row['data']['user_id'];
			  $this->userlogin_model->edit($data,$this->session->userdata('userid'));
			  $this->getloginurl();
		  }
		  
		  //header("Location:".$url."/v1/passports/569882/login");
		  
	 }
	 public function getloginurl(){
		 $this->load->Model('userlogin_model'); 
		 $user=$this->userlogin_model->info('id',$this->session->userdata('userid'));
		 if($user['kzid']>0){
			 $url=$this->kuaizhanurl;
			 $ul='/v1/passports/'.$user['kzid'].'/login';
			 $header=$this->sign('GET',$ul);
			 $row=$this->_curl_request($url.$ul,$body,$header,'GET');
			 $row=json_decode($row,true); 
			 //var_dump($row);
			 header("Location:".$row['data']['redirect_url']."/site/");
		 }
		 else{
			 
		   $this->login();	 
		 }
		 //var_dump($row);
	 }
	 public function sign($me,$ul){
		 
		  
		  $date= gmdate(DATE_RFC822, time());
          
		  $app_key='huosu.com';
		  
		  $app_secret='c40b6ff28d86761df8d9ea388306498a';
		  $str=$me."\n".$date."\n".$ul; 
		  $encoded_binary = hash_hmac("sha1", $str, $app_secret, true);
		  $sign = base64_encode($encoded_binary);
		   
		  $header[]="Date:".$date;
		  $header[]="Authorization:".$app_key.":".$sign; 
		  return $header;
	 }
	 function _curl_request($url, $body, $header = array(), $method = "POST")
	{ 
	     
		 
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 60);
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		//curl_setopt($ch, $method, 1);
		
		switch ($method){ 
			case "GET" : 
				curl_setopt($ch, CURLOPT_HTTPGET, true);
			break; 
			case "POST": 
				curl_setopt($ch, CURLOPT_POST,true); 
			break; 
			case "PUT" : 
				curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT"); 
			break; 
			case "DELETE":
				curl_setopt ($ch, CURLOPT_CUSTOMREQUEST, "DELETE"); 
			break; 
		}
		
		curl_setopt($ch, CURLOPT_USERAGENT, 'SSTS Browser/1.0');
		curl_setopt($ch, CURLOPT_ENCODING, 'gzip');
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 1);
		if (count($body) > 0) {
			curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
		}
		if (count($header) > 0) {
			curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
		}
		$ret = curl_exec($ch);
		$err = curl_error($ch);
		curl_close($ch);
		//clear_object($ch);
		//clear_object($body);
		//clear_object($header);
		if ($err) {
			return $err;
		}
		return $ret; 
	}
}
