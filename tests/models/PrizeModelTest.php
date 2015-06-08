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




}
