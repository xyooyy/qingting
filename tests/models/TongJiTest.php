<?php

/**
 * @group Model
 */
class TongJiTest extends CIUnit_TestCase
{
    private $_pcm;

    public function __construct($name = NULL, array $data = array(), $dataName = '')
    {
        parent::__construct($name, $data, $dataName);
    }

    public function setUp()
    {
        parent::setUp();


        $this->CI->load->model('tongji_model');
        $this->_pcm = $this->CI->tongji_model;
    }

    public function tearDown()
    {
        $clear_data_sql = "truncate table " . $this->_pcm->table;
        $this->_pcm->db->query($clear_data_sql);
    }


    public function test_where()
    {
        $aid = '1';
        $sql = $this->_pcm->where($aid);
        $expend = array('aid=1');
        $this->assertEquals($expend, $sql);
    }

    public function test_all()
    {
        $expend_all_count = 0;
        $order = '';
        $p_start = 0;
        $p_end = 10;
        $aid = 12202;

        $get_data = $this->_pcm->all($order, $p_start, $p_end, $aid);

        $this->assertEquals($expend_all_count, count($get_data));

    }

    public function test_ins()
    {
        $data = array(
            'tm' => time(),
            'type' => 'start',
            'aid' => '12200',
            'pid' => '0',
            'ip' => '121.42.24.76',
            'area' => '山东省',
            'basic_info' => '设备信息',
        );
        $expend = count($this->_pcm->all('', 0, 20, 12200)) + 1;
        $this->_pcm->ins($data);
        $get_data = count($this->_pcm->all('', 0, 20, 12200));
        $this->assertEquals($expend, $get_data);
    }

    public function test_del()
    {
        $data = array(
            'tm' => time(),
            'type' => 'start',
            'aid' => '12200',
            'pid' => '0',
            'ip' => '121.42.24.76',
            'area' => '山东省',
            'basic_info' => '设备信息',
        );
        $this->_pcm->ins($data);
        $expend = count($this->_pcm->all('', 0, 20, 12200)) - 1;
        $this->_pcm->del(12200);
        $get_data = count($this->_pcm->all('', 0, 20, 12200));
        $this->assertEquals($expend, $get_data);
    }

    public function test_basic_info()
    {
        $data = array(
            'tm' => time(),
            'type' => 'start',
            'aid' => '12200',
            'pid' => '0',
            'ip' => '121.42.24.76',
            'area' => '山东省',
            'basic_info' => '设备信息',
        );
        $this->_pcm->ins($data);
        $return_data = count($this->_pcm->basic_info(12200));
        $this->assertEquals(1, $return_data);
    }

    public function test_basic_con()
    {
        $data = array(
            array('tm' => time(),
                'type' => 'start',
                'aid' => '12200',
                'pid' => '0',
                'ip' => '121.42.24.76',
                'area' => '山东省',
                'basic_info' => '设备信息',),
            array('tm' => time(),
                'type' => 'start',
                'aid' => '12200',
                'pid' => '0',
                'ip' => '121.42.24.76',
                'area' => '山东省',
                'basic_info' => '设备信息',)
        );
        foreach($data as $i){
            $this->_pcm->ins($i);
        }
        $return_data = $this->_pcm->con(12200);
        $this->assertEquals(2, $return_data);
    }

    public function  test_today_ip(){
        $data = array(
            array('tm' => time() ,
                'type' => 'start',
                'aid' => '12200',
                'pid' => '0',
                'ip' => '121.42.24.74',
                'area' => '山东省',
                'basic_info' => '设备信息',),
            array('tm' => time() ,
                'type' => 'start',
                'aid' => '12200',
                'pid' => '0',
                'ip' => '121.42.24.74',
                'area' => '山东省',
                'basic_info' => '设备信息',),
            array('tm' => time(),
                'type' => 'start',
                'aid' => '12200',
                'pid' => '0',
                'ip' => '121.42.24.76',
                'area' => '山东省',
                'basic_info' => '设备信息',)
        );
        foreach($data as $i){
            $this->_pcm->ins($i);
        }
        $expend = 2;
        $return_data = $this->_pcm->today_ip(strtotime(date('Y-m-d 00:00:00', time())),12200);
        $this->assertEquals($expend,$return_data);
    }

    public function test_return_ip(){
        $data = array(
            array('tm' => time() ,
                'type' => 'start',
                'aid' => '12200',
                'pid' => '0',
                'ip' => '121.42.24.74',
                'area' => '山东省',
                'basic_info' => '设备信息',),
            array('tm' => time() -24*60*60,
                'type' => 'start',
                'aid' => '12200',
                'pid' => '0',
                'ip' => '121.42.24.74',
                'area' => '山东省',
                'basic_info' => '设备信息',),
            array('tm' => time(),
                'type' => 'start',
                'aid' => '12200',
                'pid' => '0',
                'ip' => '121.42.24.76',
                'area' => '山东省',
                'basic_info' => '设备信息',)
        );
        foreach($data as $i){
            $this->_pcm->ins($i);
        }
        $return = $this->_pcm->return_ip(strtotime(date('Y-m-d 00:00:00', time())),12200);
        $this->assertEquals(0.5,$return);
    }

    public function test_key_con(){
        $data = array(
            'tm' => time()-24*60*60,
            'type' => 'start',
            'aid' => '12200',
            'pid' => '0',
            'ip' => '121.42.24.76',
            'area' => '山东省',
            'basic_info' => '设备信息',
        );
        $this->_pcm->ins($data);
        $return_data = $this->_pcm->key_con('type','start','12200');
        $this->assertEquals('1',$return_data);
    }

    public function test_active_stay_time_sql(){
        $data = array(
            array('tm' => strtotime(date('Y-m-d 01:00:00',  time())) ,
                'type' => 'start',
                'aid' => '12200',
                'pid' => '0',
                'ip' => '121.42.24.74',
                'area' => '山东省',
                'basic_info' => '设备信息',),
            array('tm' => strtotime(date('Y-m-d 05:00:00',  time())) ,
                'type' => 'start',
                'aid' => '12200',
                'pid' => '0',
                'ip' => '121.42.24.75',
                'area' => '山东省',
                'basic_info' => '设备信息',),
            array('tm' => strtotime(date('Y-m-d 09:00:00',  time())),
                'type' => 'start',
                'aid' => '12200',
                'pid' => '0',
                'ip' => '121.42.24.76',
                'area' => '山东省',
                'basic_info' => '设备信息',)
        );
        foreach($data as $i){
            $this->_pcm->ins($i);
        };
        $return_data = $this->_pcm->active_stay('12200');
        $expend = array(1,1,1,0,0,0);
        $this->assertEquals($expend,$return_data);

    }

    public function test_dis_con(){
        $data = array(
            array('tm' => strtotime(date('Y-m-d 01:00:00',  time())) ,
                'type' => 'start',
                'aid' => '12200',
                'pid' => '0',
                'ip' => '121.42.24.74',
                'area' => '山东省',
                'basic_info' => '设备信息',),
            array('tm' => strtotime(date('Y-m-d 05:00:00',  time())) ,
                'type' => 'start',
                'aid' => '12200',
                'pid' => '0',
                'ip' => '121.42.24.74',
                'area' => '山东省',
                'basic_info' => '设备信息',),
        );
        foreach($data as $i){
            $this->_pcm->ins($i);
        };
        $return_data = count($this->_pcm->dis_con('','12200'));
        $expend = 1;
        $this->assertEquals($expend,$return_data);
    }



    public function test_con_area(){
        $data = array(
            array('tm' => time()-24*60*60 ,
                'type' => 'start',
                'aid' => '12200',
                'pid' => '0',
                'ip' => '121.42.24.74',
                'area' => '河北省',
                'basic_info' => '设备信息',),
            array('tm' => time() -24*60*60,
                'type' => 'start',
                'aid' => '12200',
                'pid' => '0',
                'ip' => '121.42.24.75',
                'area' => '河北省',
                'basic_info' => '设备信息',),
            array('tm' => time() -24*60*60,
                'type' => 'start',
                'aid' => '12200',
                'pid' => '0',
                'ip' => '221.42.24.74',
                'area' => '山东省',
                'basic_info' => '设备信息',),
            array('tm' => time()-24*60*60,
                'type' => 'start',
                'aid' => '12200',
                'pid' => '0',
                'ip' => '221.42.24.76',
                'area' => '山东省',
                'basic_info' => '设备信息',)
        );
        foreach($data as $i){
            $this->_pcm->ins($i);
        };
        $return_data = $this->_pcm->con_area('12200');
        $expend = "[['山东省',0.5],['河北省',0.5],]";
        $this->assertEquals($expend,$return_data);

    }
    /**
     * // * @dataProvider ip_data_provider
     */

    public function test_send_post($url, $expend)
    {
        $area = $this->_pcm->send_post('http://ip.taobao.com/service/getIpInfo.php?ip=' . $url);
        $this->assertEquals($expend, json_decode($area, true)['data']['region']);

    }

    public function ip_data_provider()
    {
        return array(
            array('27.184.34.157', '河北省'),

        );
    }


}
