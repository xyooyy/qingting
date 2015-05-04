<?php
/*
数据库的连接信息
*/
error_reporting(0);
define("USERNAME","jutao");
define("PASSWORD","%%%132Bd80");
define("HOST","116.213.204.23");
define("DBNAME","qingting.huosu.com");
/*define("USERNAME","root");
define("PASSWORD","");
define("HOST","localhost");
define("DBNAME","qingting");*/

class db{
	private $host = HOST;
	private $user = USERNAME;
	private $password = PASSWORD;
	private $database = '';
	
	private $mysqli;
	public  $insert_id = 0;
	public  $affected_rows = 0;
	//private $result;


	public function __construct($database=DBNAME){
		$this->database=$database;	
		$this->mysqli = new MySqli($this->host,$this->user,$this->password,$this->database);
		$this->mysqli->query('set names utf8');
		
		$this->database=$database;
		
		$this->insert_id=0;
	}
	
	public function __destruct(){ 
		$this->mysqli->close();
  	} 
	
	public function query($sql){
	
		if(!$this->mysqli->ping())
		{
		//	echo('error');
			$this->mysqli->close();
			$this->__construct($this->database);
		}
		
		
	/*	{
			$this->mysqli->close();
			$this->mysqli = new MySqli($this->host,$this->user,$this->password,$this->database);
			$this->mysqli->query('set names utf8');			
		}*/
	
		$this->affected_rows=$this->insert_id=0;
		
		$this->result = $this->mysqli->query($sql);
		if($this->mysqli->error){
			return $this->mysqli->error;
		}
		if($this->mysqli->insert_id){
			$this->insert_id=$this->mysqli->insert_id;
		}else{
			$this->affected_rows=$this->mysqli->affected_rows;
		}
		
		
		return $this->result;				 
	}

	public function select_db($db){
	    $this->database=$db;
		$this->mysqli->select_db($this->database);
  	} 
	
	public function set_charset($cSet='utf8'){ 
		//$this->mysqli->query('set names '.$cSet);
		return false;
  	} 
	
	
	public function fillToAry($obj){
		$tmp=array();
		while($row = $obj->fetch_array()){
			$tmp[]=$row;
		}
		return $tmp;	
	}
}


/*
截取中文字符串
*/
function substring($string,$start,$length){

	preg_match('/.{'.$start.'}(.{0,'.$length.'})/u', $string, $tmpAry);
	return $tmpAry[1];	
}
/*
去除所有html代码
*/
function htmlReplace( $str ){
	return preg_replace("/<[^>]*?>/u","", $str); 
}

?>
