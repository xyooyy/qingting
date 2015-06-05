<?php

/**
 * Created by PhpStorm.
 * User: liyang
 * Date: 15/6/5
 * Time: 下午1:24
 */
class Userlogin_modelTest extends CIUnit_TestCase
{


    private $_pcm;

    public function __construct($name = NULL, array $data = array(), $dataName = '')
    {
        parent::__construct($name, $data, $dataName);
    }

    public function setUp()
    {
        parent::setUp();

        $this->CI->load->model('userlogin_model');
        $this->_pcm = $this->CI->userlogin_model;
    }

    public function tearDown()
    {
        parent::tearDown();
    }

    public function test_login_all()
    {
        $user = 'weichen';
        $password = 'weichen123';
        $if_login = $this->_pcm->all($user, $password);
        $this->assertEquals($user, $if_login['username']);

    }

    public function test_tab()
    {
        $data = '1';
        $tab = $this->_pcm->tab($data);
        $this->assertEquals(5, count($tab));
    }


    public function test_insert_tab(){
        $data= array(
            'name' => '我是测试',
            'tm' => time(),
            'userid'=>1,
            'id' => 55
        );
        $expend = count($this->_pcm->tab('1')) + 1;
        $this->_pcm->ins_tab($data);
        $ins_count = count($this->_pcm->tab('1'));
        $this->assertEquals($expend,$ins_count);
    }

    public function test_del_tab(){
        $expend = count($this->_pcm->tab('1')) - 1;
        $this->_pcm->del_tab(55);
        $del_count = count($this->_pcm->tab('1'));
        $this->assertEquals($expend,$del_count);
    }




}
