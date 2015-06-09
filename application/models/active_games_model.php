<?php

class Active_games_model extends CI_Model
{
    function __construct()
    {
        parent::__construct();
    }

    public $table = 'active_games';

    /**
     * 获取信息
     * @return array
     */
    public function where($gid)
    {
        $where[] = 'gid > 0';
        if ($gid) $where[] = "gid=" . $gid;
        return $where;
    }

    public function all($gid, $order, $start = 0, $end = 15)
    {
        $where = " where " . implode(" and ", $this->where($gid));
        //排序方式,默认id排序
        $order = $order > 0 ? $order : 'gid ';
        $sql = "select * from " . $this->table . $where . " order by " . $order . " limit " . $start . "," . $end;
        $query = $this->db->query($sql);
        $row = $query->result_array();
        return $row;
    }

    //获取总数量
    public function con($gid)
    {
        $where = $this->where($gid);
        $where[] = " 1=1 ";
        $sql = "select count(*) from " . $this->table . " where " . implode(' and ', $where);
        $query = $this->db->query($sql);
        $row = $query->result_array();
        return $row[0]["count(*)"];
    }

    //添加信息
    public function ins($data)
    {
        $this->db->insert($this->table, $data);
        $status = $this->db->insert_id();
        return $status;
    }

    //获取单个信息
    public function info($tfrom, $tval)
    {
        $sql = "select * from " . $this->table . " where " . $tfrom . "='" . $tval . "' limit 1";
        $query = $this->db->query($sql);
        $row = $query->result_array();
        return $row[0];
    }

    //获取单个信息的单个属性
    public function get_field($field, $tfrom, $tval)
    {
        $sql = "select " . $field . "  from " . $this->table . " where " . $tfrom . "='" . $tval . "' limit 1";
        $query = $this->db->query($sql);
        $row = $query->result_array();
        return $row[0];
    }

    //删除信息
    public function del($id)
    {
        $this->db->where_in("gid", $id);
        $this->db->delete($this->table);
    }

    //修改信息
    public function edit($data, $gid)
    {
        $where = array('gid' => $gid);
        $this->db->where($where);
        $status = $this->db->update($this->table, $data);
        return $status;
    }

}

?>
