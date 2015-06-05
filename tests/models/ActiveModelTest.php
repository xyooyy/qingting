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
        $this->session_user_id = 10;
        $session = array('userid' => $this->session_user_id);
        $this->_pcm->session->set_userdata($session);

        $this->data= array(
                'title' => '吃饭了',
                'info' => '你妈妈叫你回家吃饭',
                'href' => 'zhangfortune.com',
                'type' => 1,
                'icon'=>'zhangfortune.com/public/icon.png',
                'fenxiangt'=>'饭好了#score#吃不吃吧',
                'fenxiangc'=>'听见没',
                'fenxiangi'=>'./upload/active/20150430-14303909187754.jpg',
                'starttime'=>'1430390820',
                'endtime'=>'1430995620',
                'html_start'=>'hello start',
                'html_start1'=>'hello start1',
                'html_end' => 'hello end',
                'html_end1' => 'hello end1',
                'html_fenxiang'=> 'hello html_fenxiang',
                'html_fenxiang1'=> ' hello html_fenxiang1',
                'html_prize'=>'hello html_prize',
                'html_prize1'=>'hello html_prize1',
                'html_prize_not_win' => 'hello html_prize_not_win',
                'html_prize_not_win1' => 'hello html_prize_not_win1',
                'html_prize_delete_chance' => 'hello html_prize_delete_chance',
                'html_prize_delete_chance1' => 'hello html_prize_delete_chance1',
                'erweima'=> 'active/20150430-14303909381220.png',
                'gid'=>3,
                'ischou'=>1,
                'prize_t'=>'qt',
                'prize_c'=>3,
                'prize_c1'=>100,
                'prize_s'=>0,
                'userid'=>$this->session_user_id
            );

    }

    public function tearDown()
    {
        $clear_data_sql = "truncate table " . $this->_pcm->table;
        $this->_pcm->db->query($clear_data_sql);
    }

    public function test_where()
    {
        $expend = array('id > 0', 'userid=' . $this->session_user_id);
        $get_data = null;

        $get_data = $this->_pcm->where();

        $this->assertEquals($expend, $get_data);
    }

    public function test_all_before_insert_data()
    {
        $expend_all_count = 0;
        $get_data = null;
        $order = 'id';
        $start = 0;
        $end = 10;

        $get_data = $this->_pcm->all($order, $start, $end);

        $this->assertEquals($expend_all_count, count($get_data));
    }

    public function test_insert()
    {
        $expend_active_id = 1;
        $get_data = null;

        $get_data = $this->_pcm->ins($this->data);

        $this->assertEquals($expend_active_id, $get_data);
    }

    public function test_all_after_insert_data()
    {
        $expend_all_count = 1;
        $get_data = null;
        $order = 'id';
        $start = 0;
        $end = 10;

        $this->_pcm->ins($this->data);
        $get_data = $this->_pcm->all($order, $start, $end);

        $this->assertEquals($expend_all_count, count($get_data));
    }


    public function test_del()
    {
        $expend_all_count = 0;
        $get_data = null;
        $order = 'id';
        $start = 0;
        $end = 10;
        $this->_pcm->ins($this->data);
        $exist_active_list = $this->_pcm->all($order, $start, $end);
        $this->assertEquals(1, count($exist_active_list));

        $this->_pcm->del($exist_active_list[0]['id']);
        $get_data = $this->_pcm->all($order, $start, $end);
        $this->assertEquals($expend_all_count, count($get_data));
    }

    /**
        *@dataProvider test_info_provider
    */
    public function test_info($tfrom, $tvalue, $expend){
        
        $get_data=null;
        $order = 'id';
        $start = 0;
        $end = 10;
        $this->_pcm -> ins($this->data);
        
        $get_data = $this->_pcm->info($tfrom, $tvalue);

        $this->assertEquals($expend, $get_data);
    }
    public function test_info_provider(){
        return array(
                array('title', $this->data['title'], $this->data),
                array('gid', $this->data['gid'], $this->data),
            );
    }



}
