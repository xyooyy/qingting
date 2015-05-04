<?php
class Game_my_info_model extends CI_Model{
	 function __construct()
    {
        parent::__construct();
    }

	public $table = 'games_my_info'; 
	 /**
     * 获取信息
     * @return array
     */
	public function where(){
		$where[]='gid > 0';  
		if($this->input->get('gid'))$where[]="gid=".$this->input->get('gid'); 
		if($this->input->get('tp'))$where[]="tp='".$this->input->get('tp')."'";
		return $where;
		}
	public function all(){
		$where=" where ".implode(" and ",$this->where()); 
		 
		$sql="select * from ".$this->table.$where; 
		 
		$query=$this->db->query($sql);
        $row= $query->result_array(); 
        return $row;
	}
	 
	//添加信息
	public function ins($data){
		 $this->db->insert($this->table,$data);
		 $status=$this->db->insert_id();
		 return $status;  
	}
	 
	//删除信息
	public function del($id){ 
		 $this->db->where_in("gid",$id);
		 $this->db->delete($this->table);		
	}
	//修改信息
	public function edit($where,$data){
		 //$where = array('id'=>$id,'id >'=>0);
		 $this->db->where($where);
		 $status=$this->db->update($this->table,$data);
		 return $status;  
	}
	 
}
?>