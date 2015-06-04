<?php


class ActiveModelTest extends CIUnit_TestCase
{    
    private $_pcm;

    public function __construct($name = NULL, array $data = array(), $dataName = '')
    {
        parent::__construct($name, $data, $dataName);
    }

    public function setUp()
    {
        parent::setUp();
        $this->CI->load->model('active_model');
        $this->_pcm = $this->CI->active_model;
    }

    public function test_where(){
        $session_user_id = array('userid'=>'10');
        $expend = array('id > 0', 'userid=10');
        $get_data = '';
        $this->_pcm->session->set_userdata($session_user_id);

        $get_data = $this->_pcm ->where();

        $this->assertEquals($expend, $get_data);
    }

}