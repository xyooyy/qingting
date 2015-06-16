<?php

/**
 * @group Controller
 */
class ActiveControllerTest extends CIUnit_TestCase
{
    protected $tables = array(
        'active' => 'active',
        'active_games' => 'active_games',
        'tongji' => 'tongji',
        'prize' => 'prize'
    );

    private $_pcm;

    public function setUp()
    {
        parent::setUp();

        // Set the tested controller
        $this->CI = set_controller('active');


    }

    public function testGetIp()
    {
        $ip = $this->CI->get_ip();
        $this->assertEquals('127.0.0.1', $ip);

    }

    public function testDataReport()

    {
        $_GET['id'] = '1';
        $expend = array(
            'active' => array('title' => 'test', 'gid' => '3'),
            'game' => array('img' => '/active/test.png'),
            'count' => array('fenxiang' => 1, 'click' => 5, 'uv' => 1),
            'area' => "[['',1.8],]",
            'stay' => '[0,0,0,0,0,0]',
            'basic_info' => array(),
            'return_visit' => array('today' => 0, 'yestday' => 0),
        );
        $return_data = $this->CI->get_data_report_data();
        $this->assertEquals($expend, $return_data);
    }

    public function testDateInfo()
    {
        $_GET['id'] = '1';
        $this->CI->date_info();
        $expend = '{"success":true,"fenxiang":"1","click_count":"5","players_count":1,"date":"1970-01-01"}';
        $this->expectOutputString($expend);
    }

    public function testActivityCountVisit()
    {
        $_GET['id'] = '1';
        $this->CI->activity_count_visit();
        $expend = '{"count_visit":[],"stay_time":"[0,0,0,0,0,0]"}';
        $this->expectOutputString($expend);
    }

    public function testActiveSubmitUpdate()
    {
        $_POST['actName'] = 'test';
        $_POST['scene'] = '品牌传播';
        $_POST['wxTitle'] = 'fenxiang';
        $_POST['wxDesc'] = '分享描述';
        $_POST['ischou'] = '1';
        $_POST['id'] = '1';
        $this->CI->active_submit();
        $this->expectOutputString('1');

    }

    public function testActiveSubmitNew()
    {
        $_POST['actName'] = 'test';
        $_POST['scene'] = '品牌传播';
        $_POST['wxTitle'] = 'fenxiang';
        $_POST['wxDesc'] = '分享描述';
        $_POST['ischou'] = '1';
        $this->CI->active_submit();
        $this->expectOutputString('3');

    }

    public function testActiveSubmit3_2(){
        $_POST['html'] = 'end_html';
        $_POST['id'] = '1';
        $this->CI->active_submit3_2();
        $this->expectOutputString('1');

    }

    public function testActiveSubmit3_3_chou(){
        $_POST['html'] = 'fenxiang_html';
        $_POST['id'] = '1';
        $this->CI->active_submit3_3();
        $this->expectOutputString('ischou1');
    }
    public function testActiveSubmit3_3_not(){
        $_POST['html'] = 'fenxiang_html';
        $_POST['id'] = '2';
        $this->CI->active_submit3_3();
        $this->expectOutputString('2');
    }

    public function testActiveSubmit3_5(){
        $_POST['id'] = '1';
        $_POST['html'] = 'prize_end_html';
        $_POST['type'] = 'alreadyWinningHtml';
        $this->CI->active_submit3_5();
        $this->expectOutputString('1');
    }

    public function testDel(){
        $_GET['id'] = '1';
        $this->CI->del();
        $this->CI->load->model('active_model');
        $this->_pcm = $this->CI->active_model;
        $return_data = $this->_pcm->info('id','1');
        $expend = NULL;
        $this->assertEquals($expend,$return_data);
    }

    public function testTongJi(){
        $this->CI->load->model('tongji_model');
        $this->_pcm = $this->CI->tongji_model;
        $this->CI->tongji('fenxiang','2','0');
        $return_data = $this->_pcm->info('aid','2');
        $expend = array(
            'tm' => time(),
            'type' => 'fenxiang',
            'aid' => '2',
            'pid' => '0',
            'ip' => '127.0.0.1',
            'area' => '',
            'basic_info' => NULL
        );
        $this->assertEquals($expend,$return_data);
    }

    public function testIndex(){
        $this->CI->load->model('active_model');
        $this->_pcm = $this->CI->active_model;
        $this->session_user_id = 1;
        $session = array('userid' => $this->session_user_id);
        $this->_pcm->session->set_userdata($session);
        $data = $this->CI->index();
        $out = output();
        preg_match_all("/<td>(.*)<\/td>/",$out,$arr);
        $this->assertEquals('测试',$arr[1][0]);
        $this->assertEquals('test',$arr[1][4]);
    }

    public function testDataCenterNoSearch(){
        $this->CI->data_center();
        $out = output();
        preg_match_all("/<b>(.*)<\/b>/",$out,$arr);
        $expend = '2条';
        $this->assertEquals($expend,$arr[1][0]);
    }

    public function testDataCenterSearch(){
        $_GET['keyword'] = 'test';
        $this->CI->data_center();
        $out = output();
        preg_match_all("/<b>(.*)<\/b>/",$out,$arr);
        $expend = '1条';
        $this->assertEquals($expend,$arr[1][0]);

    }

    

}

