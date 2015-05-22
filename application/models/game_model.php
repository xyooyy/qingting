<?php

class Game_model extends CI_Model
{
    function __construct()
    {
        parent::__construct();
    }

    public $table = 'games';
    public $table1 = 'games_my';

    /**
     * 获取信息
     * @return array
     */
    public function where()
    {
        $where[] = 'id > 0';
        if ($this->input->get('type')) $where[] = "type like '%" . $this->input->get('type') . "%'";
        if ($this->input->get('id')) $where[] = "id=" . $this->input->get('id');
        return $where;
    }

    public function all()
    {
        $where = " where " . implode(" and ", $this->where());
        //排序方式,默认id排序
        $order = $this->input->get('order') > 0 ? $this->input->get('order') : 'id ';
        //分页开始值
        $start = $_GET['p'] ? ($_GET['p'] - 1) * $end : 0;
        //分页结束值
        $end = $_GET['end'] ? $_GET['end'] : 12;
        $sql = "select * from " . $this->table . $where . " order by " . $order . " limit " . $start . "," . $end;

        $query = $this->db->query($sql);
        $row = $query->result_array();
        return $row;
    }

    //获取总数量
    public function con()
    {
        $where = $this->where();
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

    //删除信息
    public function del($id)
    {
        $this->db->where("id>0");
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
