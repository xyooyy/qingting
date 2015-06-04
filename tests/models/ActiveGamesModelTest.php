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
    }

	public function tearDown()
	{
		parent::tearDown();
	}

    // ------------------------------------------------------------------------
    /**
     * // * @dataProvider where_provider
     */


    public function test_where($type, $gid, $expend)
    {

        $sql = $this->_pcm->where($type, $gid);
        $this->assertEquals($expend, $sql);
    }

    public function where_provider()
    {
        return array(
            array('', '1', array('gid > 0', 'gid=1')),
            array('', '', array('gid > 0')),
            array('', '4', array('gid > 0', 'gid=4'))
        );
    }

    /**
     * // * @dataProvider all_provider
     */


    public function test_all($type, $gid, $order, $p_start, $p_end, $expend)
    {
        $active_games_data = $this->_pcm->all($type, $gid, $order, $p_start, $p_end);
        $this->assertEquals($expend, count($active_games_data));
    }

    public function all_provider()
    {
        return array(
            array('', '', '', 1, 15, 15),
            array('', '', '', 1, 5, 5),
            array('', '1', '', 1, 15, 1)
        );
    }

    /**
     * // * @dataProvider con_provider
     */

    public function test_con($type, $gid, $expend)
    {
        $con = $this->_pcm->con($type, $gid);
        $this->assertEquals($expend, $con);
    }

    public function con_provider()
    {
        return array(
            array('', '1', 1),
            array('', '', 15)
        );
    }

    /**
     * // * @dataProvider info_provider
     */

    public function test_info($gid, $gid_id, $expend)
    {
        $get_data = $this->_pcm->info($gid, $gid_id);
        $this->assertEquals($expend, $get_data);
    }

    public function info_provider()
    {
        return array(
            array('gid', 3, array('gid' => '3', 'title' => '不给糖就捣蛋', 'href' => 'bugeitang', 'info' => '简单易懂且具有挑战性的游戏，快来测测是不是手残者！', 'img' => '/active_games/images/bugeitang1.jpg', 'img1' => '/active_games/images/bugeitang1.jpg', 'img2' => '/active_games/images/bugeitang2.jpg'))

        );
    }

    /**
     * // * @dataProvider get_field_provider
     */


    public function test_get_field($field,$tfrom, $tval,$expend)
    {
        $actual = $this->_pcm->get_field($field, $tfrom, $tval);
        $this->assertEquals($expend, $actual[$field]);
    }

    public function get_field_provider(){
        return array(
            array('title','gid','1','1010'),
            array('href','gid','3','bugeitang')
        );
    }
    /**
     * // * @dataProvider edit_provider
     */

    public function test_edit($val,$new_data,$gid)
    {
        $data[$val] = $new_data;
        $this->_pcm->edit($data, $gid);
        $update_data = $this->_pcm->info('gid',$gid);
        $this->assertEquals($new_data, $update_data[$val]);
    }

    public function edit_provider(){
        return array(
            array('title','test','2'),
            array('href','test1','2')

        );
    }



    // ------------------------------------------------------------------------

}
