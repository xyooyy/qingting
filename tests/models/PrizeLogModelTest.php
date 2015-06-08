<?php
class PrizeLogModelTest extends CIUnit_TestCase
{


    private $_pcm;

    public function __construct($name = NULL, array $data = array(), $dataName = '')
    {
        parent::__construct($name, $data, $dataName);
    }

    public function setUp()
    {
        parent::setUp();

        $this->CI->load->model('prize_log_model');
        $this->_pcm = $this->CI->prize_log_model;
        $this->data =  array(
            'id' => 1,
            'aid' => 1,
            'prizeid' => '1',
            'tm' => '1430075522',
            'prize_t' => 'qt14532134589',
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

    public function test_where($aid,$prizeid, $expend)
    {
        $sql = $this->_pcm->where($aid,$prizeid);
        $this->assertEquals($expend, $sql);
    }

    public function where_provider()
    {
        return array(
            array('','', array('a.id > 0')),
            array('1','', array('a.id > 0','a.aid=1')),
            array('1','1', array('a.id > 0','a.aid=1','a.prizeid=1'))


        );
    }

    public function test_con_before_insert_data()
    {

        $get_data = $this->_pcm->con('1');
        $expend = 0;
        $this->assertEquals($expend, $get_data);
    }

    public function test_insert()
    {
        $expend_active_id = 1;

        $get_data = $this->_pcm->ins($this->data);
        $this->assertEquals($expend_active_id, $get_data);
    }

    public function test_con_after_insert_data()
    {
        $expend_all_count = 1;

        $this->_pcm->ins($this->data);
        $get_data = $this->_pcm->con('1');
        $this->assertEquals($expend_all_count, $get_data);
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
                'id' => 1,
                'aid' => 1,
                'prizeid' => '1',
                'tm' => '1430075522',
                'prize_t' => 'qt14532134589',
            )),
            array('id','1',array(
                'id' => 1,
                'aid' => 1,
                'prizeid' => '1',
                'tm' => '1430075522',
                'prize_t' => 'qt14532134589',
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
            'id' => 1,
            'aid' => 2,
            'prizeid' => '5',
            'tm' => '1430075522',
            'prize_t' => 'qt14532134589',
        );
        $this->_pcm->edit($data,'1');
        $expend = $this->_pcm->info('id','1');
        $this->assertEquals($expend,$data);
    }

}
