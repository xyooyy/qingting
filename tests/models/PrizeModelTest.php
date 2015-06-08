<?php

/**
 * Created by PhpStorm.
 * User: liyang
 * Date: 15/6/5
 * Time: 下午1:24
 */
class PrizeModelTest extends CIUnit_TestCase
{


    private $_pcm;

    public function __construct($name = NULL, array $data = array(), $dataName = '')
    {
        parent::__construct($name, $data, $dataName);
    }

    public function setUp()
    {
        parent::setUp();

        $this->CI->load->model('prize_model');
        $this->_pcm = $this->CI->prize_model;
        $this->data =  array(
            'id' => '1',
            'aid' => '1',
            'p_title' => '一等奖',
            'p_name' => 'test',
            'p_count' => '121',
            'p_size' => '15.00',
            'p_href' => 'http://ddd.cn',
            'p_img' => 'http://ssaa.cn',
            'p_count_s' => 0
        );

    }

    public function tearDown()
    {
        $clear_data_sql = "truncate table " . $this->_pcm->table;
        $this->_pcm->db->query($clear_data_sql);

    }

    /**
     * // * @dataProvider where_provider
     */

    public function test_where($aid, $expend)
    {
        $sql = $this->_pcm->where($aid);
        $this->assertEquals($expend, $sql);
    }

    public function where_provider()
    {
        return array(
            array('1', array('id > 0','aid=1')),
            array('', array('id > 0'))

        );
    }

    public function test_all_before_insert_data()
    {

        $get_data = $this->_pcm->all('1','', '', '');
        $expend = 0;
        $this->assertEquals($expend, count($get_data));
    }

    public function test_insert()
    {
        $expend_active_id = 1;

        $get_data = $this->_pcm->ins($this->data);
        $this->assertEquals($expend_active_id, $get_data);
    }

    public function test_all_after_insert_data()
    {
        $expend_all_count = 1;

        $this->_pcm->ins($this->data);
        $get_data = $this->_pcm->all('1','', '', '');
        $this->assertEquals($expend_all_count, count($get_data));
    }

    public function test_count(){
        $expend_all_count = 1;
        $this->_pcm->ins($this->data);
        $get_data = $this->_pcm->con('1');
        $this->assertEquals($expend_all_count, count($get_data));

    }

    /**
     * // * @dataProvider info_provider
     */

    public function test_info($tfrom,$tval,$expend){
        $this->_pcm->ins($this->data);
        $get_data = $this->_pcm->info($tfrom,$tval);
        $this->assertEquals($expend,$get_data);
    }

    public function info_provider(){
        return array(
            array('aid','1',array(
                'id' => '1',
                'aid' => '1',
                'p_title' => '一等奖',
                'p_name' => 'test',
                'p_count' => '121',
                'p_size' => '15.00',
                'p_href' => 'http://ddd.cn',
                'p_img' => 'http://ssaa.cn',
                'p_count_s' => 0
            )),
            array('id','1',array(
                'id' => '1',
                'aid' => '1',
                'p_title' => '一等奖',
                'p_name' => 'test',
                'p_count' => '121',
                'p_size' => '15.00',
                'p_href' => 'http://ddd.cn',
                'p_img' => 'http://ssaa.cn',
                'p_count_s' => 0
            ))
        );
    }

    public function test_del(){
        $this->_pcm->ins($this->data);
        $expend = $this->_pcm->con('1') - 1 ;
        $this->_pcm->del('1');
        $data = $this->_pcm->con('1');
        $this->assertEquals($expend,$data);
    }

    public function test_edit(){
        $this->_pcm->ins($this->data);
        $data =  array(
            'id' => '1',
            'aid' => '2',
            'p_title' => '2等奖',
            'p_name' => 'test',
            'p_count' => '121',
            'p_size' => '15.00',
            'p_href' => 'http://ddd.cn',
            'p_img' => 'http://ssaa.cn',
            'p_count_s' => 0
        );
        $this->_pcm->edit($data,'1');
        $expend = $this->_pcm->info('id','1');
        $this->assertEquals($expend,$data);
    }

}
