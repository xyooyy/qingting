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
    public function where($aid)
    {
        if ($aid) $where[] = "aid=" . $aid;
        return $where;
    }

    public function all($order,$p_start,$p_end,$aid)
    {
        $where = " where " . implode(" and ", $this->where($aid));
        //排序方式,默认id排序
        $order = $order > 0 ? $order : 'tm ';
        //分页结束值
        $end = $p_end ? $p_end : 20;
        //分页开始值
        $start = $p_start ? ($p_start - 1) * $end : 0;
        $sql = "select * from " . $this->table . $where . " order by " . $order . " limit " . $start . "," . $end;

        $query = $this->db->query($sql);
        $row = $query->result_array();
        return $row;
    }

    //获取basic_info
    public function basic_info($aid)
    {
        $time = strtotime(date('Y-m-d 24:00:00', $_GET['time'] ? $_GET['time'] : time()));
        $time0 = strtotime(date('Y-m-d 00:00:00', $_GET['time'] ? $_GET['time'] : time()));
        $sql = "select tm,ip,basic_info from " . $this->table . " where aid = " . $aid . " and tm< " . $time . " and tm > " . $time0 . " and type = 'start' ";
        $query = $this->db->query($sql);
        $info = $query->result_array();
        return $info;
    }

    //获取总数量
    public function con($aid)
    {
        $where = $this->where($aid);
        $where[] = "1 = 1 ";
        $sql = "select count(*) from " . $this->table . " where " . implode(' and ', $where);
        $query = $this->db->query($sql);
        $row = $query->result_array();
        return $row[0]["count(*)"];
    }

    //获取回访率
    public function return_ip($time,$aid)
    {
        $end_time = $time + 24*60*60;
        //当前时间之前的所有不重复ip
        $sql_array = "select ip, count(distinct  ip )  from " . $this->table . " where aid =  " . $aid . " and tm < " . $time . " group by ip";
        $query = $this->db->query($sql_array);
        $today_ip = $query->result_array();
        $array = "'127.0.0',";
        foreach ($today_ip as $i) {
            $array .= "'" . $i['ip'] . "',";
        }
        $array = substr($array, 0, -1);
        //找到大于当前时间小于当前时间24小时之后的不重复ip是否在 之前查找到的$sql_array中
        $sql = "select ip from " . $this->table . " where aid =  " . $aid . " and tm >  " . $time .  " and tm < " . $end_time  . " and ip in (  "  . $array . ')' ;
        $query_array = $this->db->query($sql);

        $result = count($query_array->result_array()) / $this->today_ip($time,$aid);
        return $result;
    }
    //今天不重复ip
    public function today_ip($time,$aid){
        $end_time = $time + 24*60*60;
        $sql_array = "select ip, count(distinct  ip )  from " . $this->table . " where aid =  " . $aid . " and tm > " . $time . " and tm < " . $end_time  . " group by ip";
        $query = $this->db->query($sql_array);
        $today_ip = count($query->result_array());
        return $today_ip;

    }

    //根据条件获取con
    public function key_con($tfrom, $tval,$aid)
    {
        $ti = $_GET['time'] ? $_GET['time'] : time();
        $sql = "select count(*) from " . $this->table . " where aid = " . $aid . " and tm < " . $ti . " and " . $tfrom . " = '" . $tval . " '";
        $query = $this->db->query($sql);
        $row = $query->result_array();
        return $row[0]["count(*)"];
    }

    //活动停留时间段
    public function active_stay($aid)
    {
        $time1 = strtotime(date('Y-m-d 00:00:00', $_GET['time'] ? $_GET['time'] : time()));
        $time2 = strtotime(date('Y-m-d 04:00:00', $_GET['time'] ? $_GET['time'] : time()));
        $time3 = strtotime(date('Y-m-d 08:00:00', $_GET['time'] ? $_GET['time'] : time()));
        $time4 = strtotime(date('Y-m-d 12:00:00', $_GET['time'] ? $_GET['time'] : time()));
        $time5 = strtotime(date('Y-m-d 16:00:00', $_GET['time'] ? $_GET['time'] : time()));
        $time6 = strtotime(date('Y-m-d 20:00:00', $_GET['time'] ? $_GET['time'] : time()));
        $time7 = strtotime(date('Y-m-d 24:00:00', $_GET['time'] ? $_GET['time'] : time()));
        $stay_data = [];
        $stay_data[] = count($this->time_sql($time1, $time2,$aid));
        $stay_data[] = count($this->time_sql($time2, $time3,$aid));
        $stay_data[] = count($this->time_sql($time3, $time4,$aid));
        $stay_data[] = count($this->time_sql($time4, $time5,$aid));
        $stay_data[] = count($this->time_sql($time5, $time6,$aid));
        $stay_data[] = count($this->time_sql($time6, $time7,$aid));
        return $stay_data;
    }


    public function time_sql($start, $end,$aid)
    {
        $sql = "select *, count(distinct  ip )   from " . $this->table . " where aid = " . $aid .
            " and tm > " . $start . " and tm <  " . $end .
            " group by ip ";
        $query = $this->db->query($sql);
        $row = $query->result_array();
        return $row;
    }

    //去重
    public function dis_con($url_time,$aid)
    {
        $ti = $url_time ? $url_time : time();
        $sql = "select *, count(distinct ip) from " . $this->table . " where aid = " . $aid . " and tm < " . $ti . " group by ip";
        $query = $this->db->query($sql);
        $row = $query->result_array();
        return $row;

    }

    //地区去重计数因为转换不了要的指定格式，所以拼得字符串
    public function con_area($aid)
    {
        $sql = "select area, count(*) from " . $this->table . " where aid = " . $aid . " group by area";
        $query = $this->db->query($sql);
        $row = $query->result_array();
        $test = '';
        $count = $this->key_con('type', 'start',$aid);
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
        $this->db->where_in("aid", $id);
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
