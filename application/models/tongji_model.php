<?php

class Tongji_model extends CI_Model
{
    function __construct()
    {
        parent::__construct();
    }

    public $table = 'tongji';

    /**
     * 获取信息
     * @return array
     */
    public function where()
    {
        $where[] = 'id > 0';
        if ($this->input->get('aid')) $where[] = "aid=" . $this->input->get('aid');
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
        $end = $_GET['end'] ? $_GET['end'] : 20;
        $sql = "select * from " . $this->table . $where . " order by " . $order . " limit " . $start . "," . $end;

        $query = $this->db->query($sql);
        $row = $query->result_array();
        return $row;
    }

    //获取总数量
    public function con()
    {
        $where = $this->where();
        $where[] = "1 = 1 ";
        $sql = "select count(*) from " . $this->table . " where " . implode(' and ', $where);
        $query = $this->db->query($sql);
        $row = $query->result_array();
        return $row[0]["count(*)"];
    }

    //根据条件获取con
    public function key_con($tfrom, $tval)
    {
        $ti = $_GET['time'] ? $_GET['time'] : time();
        $sql = "select count(*) from " . $this->table . " where aid = " . $this->input->get('id') . " and tm < " . $ti . " and " . $tfrom . " = '" . $tval . " '";
        $query = $this->db->query($sql);
        $row = $query->result_array();
        return $row[0]["count(*)"];
    }

    //活动停留时间段
    public function active_stay()
    {
//        $ti = $_GET['time'] ? $_GET['time'] : time();
//        $sql =
        $time1 = strtotime(date('Y-m-d 00:00:00'));
        $time2 = strtotime(date('Y-m-d 04:00:00'));
        $time3 = strtotime(date('Y-m-d 08:00:00'));
        $time4 = strtotime(date('Y-m-d 12:00:00'));
        $time5 = strtotime(date('Y-m-d 16:00:00'));
        $time6 = strtotime(date('Y-m-d 20:00:00'));
        $time7 = strtotime(date('Y-m-d 24:00:00'));
//        $ti = $_GET['time'] ? $_GET['time'] : time();
        $stay_data = [];
        $stay_data[] = $this->time_sql($time1,$time2)[0]['count'] == '' ? '0' : $this->time_sql($time1,$time2)[0]['count'];
        $stay_data[] = $this->time_sql($time2,$time3)[0]['count']  == '' ? '0' : $this->time_sql($time2,$time3)[0]['count'];
        $stay_data[] = $this->time_sql($time3,$time4)[0]['count'] == '' ? '0' : $this->time_sql($time3,$time4)[0]['count'];
        $stay_data[] = $this->time_sql($time4,$time5)[0]['count'] == '' ? '0' : $this->time_sql($time4,$time5)[0]['count'];
        $stay_data[] = $this->time_sql($time5,$time6)[0]['count'] == '' ? '0' : $this->time_sql($time5,$time6)[0]['count'];
        $stay_data[] = $this->time_sql($time6,$time7)[0]['count'] == '' ? '0' : $this->time_sql($time6,$time7)[0]['count'];

        return $stay_data;

    }



    public function time_sql($start,$end){
        $sql = "select  count(distinct  ip )  as count from " . $this->table . " where aid = " . $this->input->get('id') .
            " and tm > " . $start . " and tm <  " . $end .
            " and " . 'type' . " = '" . 'start' . " ' " .
            " group by ip ";
        $query = $this->db->query($sql);
        $row = $query->result_array();
        return $row;
    }
    //去重
    public function dis_con()
    {
        $ti = $_GET['time'] ? $_GET['time'] : time();
        $sql = "select *, count(distinct ip) from " . $this->table . " where aid = " . $this->input->get('id') . " and tm < " . $ti . " group by ip";
        $query = $this->db->query($sql);
        $row = $query->result_array();
        return $row;

    }

    //去重计数因为转换不了要的指定格式，所以拼得字符串
    public function con_area()
    {
        $sql = "select area, count(*) from " . $this->table . " where aid = " . $this->input->get('id') . " group by area";
        $query = $this->db->query($sql);
        $row = $query->result_array();
        $test = '';
        $count = $this->key_con('type', 'start');
        foreach ($row as $a) {
            $a['count(*)'] = $a['count(*)'] / $count;
            $a['area'] = "'" . $a['area'] . "'";
            $test .= '[' . $a['area'] . ',' . $a['count(*)'] . '],';
        };
        $result .= '[' . $test . ']';
        return $result;

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

    //根据ip请求淘宝地域信息
    public function send_post($url)
    {


//        $postdata = http_build_query($post_data);

        $options = array(
            'http' => array(
                'method' => 'GET',

                'header' => 'Content-type:application/x-www-form-urlencoded',
//                'content' => $postdata,
                'timeout' => 15 * 60 // 超时时间（单位:s）
            )
        );
        $context = stream_context_create($options);
        $result = file_get_contents($url, false, $context);

        return $result;
    }

}

?>
