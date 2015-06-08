<?php
class Userlogin_model extends CI_Model{
    function __construct()
    {
        parent::__construct();

    }

    public $table = 'user';
    public $table_y = 'cj_users';

    /**
     * 获取信息
     * @return array
     */

    public function all($username,$password){
        $sql="select * from ".$this->table." where username='".$username."' and password='".$password."'";
        $query=$this->db->query($sql);
        $row= $query->result_array();
        // var_dump($row);
        // exit;
        return $row[0];
    }
    //添加主题
    public function ins($data){
        $this->db->insert($this->table,$data);
        $status=$this->db->insert_id();
        return $status;
    }
    //获取某用户下的主题
    public function tab($data){
        $this->db->order_by('id','desc');
        $query=$this->db->get_where('tab',array("userid"=>$_SESSION['userid']));
        $row=$query->result_array();
        return $row;
    }
    //删除主题
    public function del_tab(){
        $id=$_GET['id'];
        $this->db->where('id',$id);
        $this->db->delete('tab');
        $this->db->query("delete from games_my where type=".$id);
    }
    //获取单个信息
    public function info($tfrom,$tval){
        $sql="select * from ".$this->table." where ".$tfrom."='".$tval."' limit 1";
        $query=$this->db->query($sql);
        $row=$query->result_array();
        return $row[0];
    }
    //获取单个信息
    public function info_yiqixiu($tfrom,$tval){
        $this->db1= $this->load->database('yiqixiu',TRUE);
        $sql="select * from ".$this->table_y." where ".$tfrom."='".$tval."' limit 1";
        $query=$this->db1->query($sql);
        $row=$query->result_array();
        return $row[0];
    }
    //添加主题
    public function ins_yiqixiu($data){
        $this->db1= $this->load->database('yiqixiu',TRUE);
        $this->db1->insert($this->table_y,$data);
        $status=$this->db1->insert_id();
        return $status;
    }
    //修改信息
    public function edit($data,$id){
        $where = array('id'=>$id,'id >'=>0);

        $this->db->where($where);
        $status=$this->db->update($this->table,$data);
        return $status;
    }
}
?>
