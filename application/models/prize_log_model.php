<?php

class Prize_log_model extends CI_Model
{
    function __construct()
    {
        parent::__construct();
    }

    public $table = 'prize_log';
    public $table_p = 'prize';

    /**
     * 获取信息
     * @return array
     */
    public function where($aid,$prizeid)
    {
        $where[] = 'a.id > 0';
        if ($aid) $where[] = "a.aid=" . $aid;
        if ($prizeid) $where[] = "a.prizeid=" . $prizeid;
        return $where;
    }

    public function all($aid,$prizeid,$order,$p_start,$p_end)
    {
        $where = " where " . implode(" and ", $this->where($aid,$prizeid));
        //排序方式,默认id排序
        $order = $order > 0 ? $order : 'a.id ';
        //分页开始值
        $start = $p_start ? ($p_start - 1) * $end : 0;
        //分页结束值
        $end = $p_end ? $p_end : 20;
        $sql = "select a.*,b.p_name from " . $this->table . " a left join " . $this->table_p . " b  on a.prizeid=b.id " . $where . " order by " . $order . " limit " . $start . "," . $end;

        $query = $this->db->query($sql);
        $row = $query->result_array();
        return $row;
    }

    //获取总数量
    public function con($aid)
    {
//        $where = $this->where();
//        $where[] = " 1=1 ";
        $where[] = "aid=" . $aid;
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

    //删除信息
    public function del($id)
    {
        //$this->db->where("id>0");
        $this->db->where_in("id", $id);
        $this->db->delete($this->table);
    }

    //修改信息
    public function edit($data, $id)
    {
        $where = array('id' => $id, 'id >' => 0);

        $this->db->where($where);
        $status = $this->db->update($this->table, $data);
        return $status;
    }

}

?>
