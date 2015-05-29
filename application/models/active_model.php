<?php

class Active_model extends CI_Model
{
    function __construct()
    {
        parent::__construct();
    }

    public $table = 'active';
    public $game = 'active_games';
    /**
     * 获取信息
     * @return array
     */
    public function where($type,$id)
    {
        $where[] = 'id > 0';
        $where[] = "userid=" . $this->session->userdata('userid');
        $type ? $where[] = $type : '';
        $id ? $where[] = $id : '';
//        if ($this->input->get('type')) $where[] = "type like '%" . $this->input->get('type') . "%'";
//        if ($this->input->get('id')) $where[] = "id=" . $this->input->get('id');
        return $where;
    }

    public function all()
    {
        $where = " where " . implode(" and ", $this->where());
        //排序方式,默认id排序
        $order = $this->input->get('order') > 0 ? $this->input->get('order') : 'id ';
        //分页结束值
        $end = $_GET['end'] ? $_GET['end'] : 10;
        //分页开始值
        $start = $_GET['p'] ? ($_GET['p']) : 0;
        $sql = "select * from " . $this->table . $where . " order by " . $order  . " desc limit " . $start . "," . $end;

        $query = $this->db->query($sql);
        $row = $query->result_array();
        return $row;
    }
    //根据搜索条件筛选
    public function game_active(){
        $where = " where " . implode(" and ", $this->where());
        $where .= $_GET['keyword'] ?  " and  active.title='" . $_GET['keyword'] . "'" : '';
        //排序方式,默认id排序
        $order = $this->input->get('order') > 0 ? $this->input->get('order') : 'id ';
        //分页结束值
        $end = $_GET['end'] ? $_GET['end'] : 5;
        //分页开始值
        $start = $_GET['p'] ? ($_GET['p']) : 0;
        $sql = "select * from " . $this->game .  " JOIN "  . $this->table . " ON active.gid = active_games.gid " . $where . " order by " . $order . " limit " . $start . "," . $end;
        $query = $this->db->query($sql);
        $row = $query->result_array();
        return $row;
    }
    //根据条件keyword获取总数量
    public function key_con()
    {
        $where = " where " . implode(" and ", $this->where());
        $where .= $_GET['keyword'] ?  " and  title='" . $_GET['keyword'] . "'" : '';
        $sql = "select count(*) from " . $this->table . $where;
        $query = $this->db->query($sql);
        $row = $query->result_array();
        return $row[0]["count(*)"];
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
