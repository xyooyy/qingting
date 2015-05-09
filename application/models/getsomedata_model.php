<?php

class Getsomedata_model extends CI_Model
{
    function __construct()
    {
        parent::__construct();
    }

    public $table = 'news';

    /**
     * 获取信息
     * @return array
     */
    public function where()
    {
        //$where[]='id > 0';

        //if($_GET['system']=='ios')$where[]=" id in(583,326,327,670,754,939,877,366,917,357,332,671,905,977,322,895,896,747,904)";
        if ($this->input->get('id')) $where[] = " id='" . $this->input->get('id') . "'";
        if ($this->input->get('ids')) $where[] = " id in(" . $this->input->get('ids') . ")";
        //类别
        if ($this->input->get('category')) $where[] = " type like '%" . $this->input->get('category') . "%'";
        if ($this->input->get('toptc')) $where[] = " keyword like '%" . $this->input->get('toptc') . "%'";
        //分类统计
        if (isset($_GET['category']) && $_GET['category']) {
            $data_t['type'] = $this->input->get('category');
            $data_t['user'] = $this->input->get('user');
            $data_t['tm'] = time();
            $this->tocount('news_count_type', $data_t);
        }
        //小类别
        if ($this->input->get('type')) $where[] = " type_show like '%" . $this->input->get('type') . "%'";
        if ($this->input->get('w')) $where[] = " (title like '%" . $this->input->get('w') . "%' or id = '" . $this->input->get('w') . "' or keyword like '%" . $this->input->get('w') . "%')";
        return $where;
    }

    public function all($w1)
    {
        $where = $this->where();
        if ($w1) $where[] = $w1;
        $where = empty($where) ? ' where 1<1 ' : " where " . implode(" and ", $where);
        if ($this->input->get('p') > 0) $_GET['start'] = ($this->input->get('p') - 1) * 15;
        //排序方式,默认id排序
        $order = $this->input->get('order') > 0 ? $this->input->get('order') : 'ding desc,sort desc,id desc';
        $tp = $this->input->get('type');
        if ($tp == 'nowuser') {
            $end = 4;
            $order = "rand()";
        } else {
            $end = 15;
        }
        if ($_GET['end'] > 0) $end = $_GET['end'];
        //分页开始值
        $start = ($this->input->get('start') > 0 ? $this->input->get('start') / $end : '0') * $end;
        $sql = "select * from " . $this->table . $where . " order by " . $order . " limit " . $start . "," . $end;

        //echo $sql;
        //exit;
        $query = $this->db->query($sql);
        $row = $query->result_array();

        return $row;
    }

    public function thecard()
    {
        $where[] = " type like '%" . $this->input->get('cardtp') . "%'";
        $where = " where " . implode(' and ', $where);
        $end = 4;
        $order = " id desc ";
        $sql = "select * from " . $this->table . $where . " order by " . $order . " limit  " . $end;
        $re = $this->db->query($sql);
        $row = $re->result_array();
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

    //判断是否为快捷方式打开
    public function info($key)
    {
        //$where=$this->where();
        $sql = "select bekey from bekey where bekey='" . $key . "'";
        $query = $this->db->query($sql);
        $row = $query->result_array();
        if ($row) return $row[0];
    }

    //获取创建次数
    public function info_id($id)
    {

        $query = $this->db->get_where($this->table, array('id' => $id));
        $row = $query->result_array();
        if ($row) return $row[0]['addnum'];
    }

    //添加到桌面标识
    public function addkey($tab, $data2)
    {
        $this->db->insert($tab, $data2);
        $status = $this->db->insert_id();
        return $status;
    }

    public function ins($data)
    {
        $this->db->insert($this->table, $data);
        $status = $this->db->insert_id();
        return $status;
    }

    //添加统计
    public function tocount($tab, $data)
    {
        $this->db->insert($tab, $data);
        return true;
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

    public function info_w($tab, $w)
    {
        $sql = "select count,tm,keywordid from " . $tab . " where w='" . $w . "' order by tm desc limit 1";
        $query = $this->db->query($sql);
        $row = $query->result_array();
        if ($row) return $row[0];
    }

    //修改统计搜索关键字
    public function edit_w($tab, $data, $w)
    {
        $where = array('w' => $data['w'], 'tm' => $data['tm']);
        $this->db->where($where);
        $this->db->limit(1);
        $status = $this->db->update($tab, $data);
        return true;
    }

    //添加搜索统计关键字
    public function ins_w($tab, $data)
    {
        $this->db->insert($tab, $data);
        $status = $this->db->insert_id();
        //return true;
        return $status;
    }

    /**
     * 获取单条app数据
     */
    public function  get_one($appid)
    {
        $query = $this->db->get_where($this->table, array("id" => $appid));
        $row = $query->row_array();
        return $row;
    }

    /**
     * 更新scores字段的信息
     */
    public function update_scores($appid, $nums, $scores)
    {
        $newScore = ceil($scores / $nums);
        if ($newScore > 5) {
            $newScore = 5;
        }
        $this->db->where("id", $appid);
        $this->db->set("scores", $newScore);
        $this->db->set("scorenum", "scorenum+1", false);
        $this->db->update($this->table);
        return true;
    }

    /**
     * 获取传递来的可用的appid
     */
    public function get_realappid()
    {
        $ids = $this->input->get("ids");
        if (!$ids) return '';
        $idsArray = explode(",", $ids);
        $this->db->where_in("id", $idsArray);
        $query = $this->db->get($this->table);
        $rows = $query->result_array();
        $newIds = array();
        if (is_array($rows)) {
            foreach ($rows as $row) {
                $newIds[] = $row['id'];
            }
        }
        return implode(",", $newIds);
    }
}

?>
