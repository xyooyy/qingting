<?php
/**
 * @group Model
 */
class TongJiTest extends CIUnit_TestCase {
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
    /**
     * // * @dataProvider ip_data_provider
     */

    public function test_send_post($url,$expend){
        $area = $this->_pcm->send_post('http://ip.taobao.com/service/getIpInfo.php?ip=' . $url);
        $this->assertEquals($expend, json_decode($area,true)['data']['region']);

    }
    public function ip_data_provider()
    {
        return array(
            array('27.184.34.157', '河北省'),

        );
    }



}
