<?php

/**
 * @group Model
 */
class ActiveGamesModelTest extends CIUnit_TestCase
{
//	protected $tables = array(
//		'phone_carrier' => 'phone_carrier'
//	);

    private $_pcm;

    public function __construct($name = NULL, array $data = array(), $dataName = '')
    {
        parent::__construct($name, $data, $dataName);
    }

    public function setUp()
    {
        parent::setUp();

        $this->CI->load->model('active_games_model');
        $this->_pcm = $this->CI->active_games_model;
        $this->data = array(
            'gid' => 1,
            'title' => 'test',
            'href' => 'test',
            'info' => '我就是来测试的，不要想太多',
            'img' => '/upload/test.png',
            'img1' => '/upload/test.png1',
            'img2' => '/upload/test.png2'
        );
    }

    public function tearDown()
    {
        $clear_data_sql = "truncate table " . $this->_pcm->table;
        $this->_pcm->db->query($clear_data_sql);
    }

    // ------------------------------------------------------------------------
    /**
     * // * @dataProvider where_provider
     */


    public function test_where($gid, $expend)
    {

        $sql = $this->_pcm->where($gid);
        $this->assertEquals($expend, $sql);
    }

    public function where_provider()
    {
        return array(
            array('1', array('gid > 0', 'gid=1')),
            array('', array('gid > 0')),
            array('4', array('gid > 0', 'gid=4'))
        );
    }

    /**
     * // * @dataProvider all_provider
     */


    public function test_all($gid, $order, $p_start, $p_end, $expend)
    {

        $this->_pcm->ins($this->data);
        $active_games_data = $this->_pcm->all($gid, $order, $p_start, $p_end);
        $this->assertEquals($expend, count($active_games_data));
    }

    public function all_provider()
    {
        return array(
            array(1, '', 0, 15, 1)
        );
    }

    /**
     * // * @dataProvider con_provider
     */

    public function test_con( $gid, $expend)
    {
        $this->_pcm->ins($this->data);
        $con = $this->_pcm->con( $gid);
        $this->assertEquals($expend, $con);
    }

    public function con_provider()
    {
        return array(
            array('1', 1),
        );
    }

    /**
     * // * @dataProvider info_provider
     */

    public function test_info($gid, $gid_id, $expend)
    {
        $this->_pcm->ins($this->data);
        $get_data = $this->_pcm->info($gid, $gid_id);
        $this->assertEquals($expend, $get_data);
    }

    public function info_provider()
    {
        return array(
            array('gid', 1, array(
                'gid' => 1,
                'title' => 'test',
                'href' => 'test',
                'info' => '我就是来测试的，不要想太多',
                'img' => '/upload/test.png',
                'img1' => '/upload/test.png1',
                'img2' => '/upload/test.png2'
            ))

        );
    }

    /**
     * // * @dataProvider get_field_provider
     */


    public function test_get_field($field, $tfrom, $tval, $expend)
    {
        $this->_pcm->ins($this->data);
        $actual = $this->_pcm->get_field($field, $tfrom, $tval);
        $this->assertEquals($expend, $actual[$field]);
    }

    public function get_field_provider()
    {
        return array(
            array('title', 'gid', '1', 'test'),
            array('href', 'gid', '1', 'test')
        );
    }

    /**
     * // * @dataProvider edit_provider
     */

    public function test_edit($val, $new_data, $gid)
    {
        $this->_pcm->ins($this->data);
        $data[$val] = $new_data;
        $this->_pcm->edit($data, $gid);
        $update_data = $this->_pcm->info('gid', $gid);
        $this->assertEquals($new_data, $update_data[$val]);
    }

    public function edit_provider()
    {
        return array(
            array('title', 'test', '1'),
            array('href', 'test1', '1')

        );
    }

    public function test_insert()
    {
        $expend = count($this->_pcm->all('', '', 0, 20)) + 1;
        $this->_pcm->ins($this->data);
        $get_data = count($this->_pcm->all('', '', 0, 20));
        $this->assertEquals($expend, $get_data);

    }

    public function test_del()
    {
        $this->_pcm->ins($this->data);
        $expend = count($this->_pcm->all('', '', 0, 20)) - 1;
        $this->_pcm->del(1);
        $get_data = count($this->_pcm->all('', '', 0, 20));
        $this->assertEquals($expend, $get_data);

    }

    // ------------------------------------------------------------------------

}
