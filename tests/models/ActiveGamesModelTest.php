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

        $this->CI->load->model('active_games_model');
        $this->_pcm = $this->CI->active_games_model;
    }

//	public function tearDown()
//	{
//		parent::tearDown();
//	}

    // ------------------------------------------------------------------------

    public function test_get_field()
    {
        $actual = $this->_pcm->get_field('title', 'gid', '1');
        $this->assertEquals('1010', $actual['title']);
    }

    public function test_edit()
    {
        $data['title'] = 'test';
        $update_data = $this->_pcm->edit($data, '2');
        $this->assertEquals(true, $update_data);
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


    // ------------------------------------------------------------------------

}
