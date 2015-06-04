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

        /*
        * this is an example of how you would load a product model,
        * load fixture data into the test database (assuming you have the fixture yaml files filled with data for your tables),
        * and use the fixture instance variable

        $this->CI->load->model('Product_model', 'pm');
        $this->pm=$this->CI->pm;
        $this->dbfixt('users', 'products');

        the fixtures are now available in the database and so:
        $this->users_fixt;
        $this->products_fixt;

        */

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
        array('121.42.24.76','山东省')

        );
    }



}
