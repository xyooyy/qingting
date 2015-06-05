<?php

class Userlogin_model extends CI_Model
{
    function __construct()
    {
        parent::__construct();
    }

    public $table = 'user';

    /**
     * 获取信息
     * @return array
     */

    public function all($username, $password)
    {
        $sql = "select * from " . $this->table . " where username='" . $username . "' and password='" . $password . "'";
        $query = $this->db->query($sql);
        $row = $query->result_array();
        // var_dump($row);
        // exit;
        return $row[0];
    }

    //添加主题
    public function ins_tab($data)
    {
        $this->db->insert('tab', $data);
        $status = $this->db->insert_id();
        return $status;
    }

    //获取某用户下的主题
    public function tab($data)
    {
        $this->db->order_by('id', 'desc');
        $query = $this->db->get_where('tab', array("userid" => $data));
        $row = $query->result_array();
        return $row;
    }

    //删除主题
    public function del_tab($id)
    {
        $this->db->where('id', $id);
        $this->db->delete('tab');
        $this->db->query("delete from games_my where type=" . $id);
    }
}

?>
