<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
header("Content-type:text/html;charset=utf-8");
error_reporting(0);
session_start();

class Active extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->host = 'http://' . $_SERVER['HTTP_HOST'] . '/';
    }

    public function _remap($method)
    {
        if ($method == 'dataCenter') {
            $this->data_center();
        } elseif ($method == 'dataReport') {
            $this->data_report();
        } else {
            $this->$method();
        }
    }

    public function data_report()
    {
        $data = $this->get_data_report_data();
        $this->load->view('active/data_center', $data);
    }

    public function get_data_report_data(){
        $this->load->model('active_model');
        $this->load->model('tongji_model');
        $this->load->model('active_games_model');
        $data['active'] = $this->active_model->get_field('title', 'gid', 'id', $this->input->get('id'));
        $data['game'] = $this->active_games_model->get_field('img', 'gid', $data['active']['gid']);
        $data['count']['fenxiang'] = $this->tongji_model->key_con('type', 'fenxiang', $this->input->get('id'));
        $data['count']['click'] = $this->tongji_model->key_con('type', 'start', $this->input->get('id'));
        $data['count']['uv'] = count($this->tongji_model->dis_con($_GET['time'], $this->input->get('id')));
        $data['area'] = $this->tongji_model->con_area($this->input->get('id'));
        $data['stay'] = '[' . implode(',', $this->tongji_model->active_stay($this->input->get('id'))) . ']';
        $data['basic_info'] = $this->tongji_model->basic_info($this->input->get('id'));
        $today = strtotime(date('Y-m-d 00:00:00', time()));
        $yestday = strtotime(date('Y-m-d 00:00:00', time() - 24 * 60 * 60));
        $data['return_visit']['today'] = $this->tongji_model->return_ip($today, $this->input->get('id')) * 100;
        $data['return_visit']['yestday'] = $this->tongji_model->return_ip($yestday, $this->input->get('id')) * 100;
        return $data;
    }

    public function date_info()
    {
        $this->load->model('tongji_model');
        $fenxiang = $this->tongji_model->key_con('type', 'fenxiang', $this->input->get('id'));
        $click = $this->tongji_model->key_con('type', 'start', $this->input->get('id'));
        $uv = count($this->tongji_model->dis_con($_GET['time'], $this->input->get('id')));

        echo json_encode(array('success' => true, 'fenxiang' => $fenxiang, 'click_count' => $click, 'players_count' => $uv, 'date' => date('Y-m-d', $_GET['time'])));

    }

    public function activity_count_visit()
    {
        $this->load->model('tongji_model');
        $info = '[' . implode(',', $this->tongji_model->active_stay($this->input->get('id'))) . ']';
        $count_visit = $this->tongji_model->basic_info($this->input->get('id'));
//        print_r($count_visit);
        echo json_encode(array('count_visit' => $count_visit, 'stay_time' => $info));
    }

    public function ticket()
    {
        $this->load->view('active/ticket');
    }

    public function index()
    {
        $order = $order = $this->input->get('order') > 0 ? $this->input->get('order') : 'id ';

        //分页开始值
        $start = $_GET['p'] ? ($_GET['p']) : 0;
        //分页结束值
        $end = $_GET['end'] ? $_GET['end'] : 10;

        $this->load->model('active_model');
        $data['list'] = $this->active_model->all($order, $start, $end);
        $this->load->library('pagination');
        $config['base_url'] = '/active/index?';
        $config['total_rows'] = $this->active_model->con();
        $config['page_query_string'] = TRUE;
        $config['query_string_segment'] = 'p';
        $this->pagination->initialize($config);
        $data['page'] = $this->pagination->create_links();
        $this->load->view('active/active', $data);
    }

    public function data_center()
    {
        $this->load->model('active_model');

        $data['active_games'] = $this->active_model->game_active();

        $this->load->library('pagination');
        $config['base_url'] = $_SERVER[PATH_INFO] . '?keyword=' . $_GET['keyword'];
        $config['total_rows'] = $this->active_model->key_con();
        $config['per_page'] = 5;
        $config['page_query_string'] = TRUE;
        $config['query_string_segment'] = 'p';
        $this->pagination->initialize($config);
        $data['page'] = $this->pagination->create_links();
        $data['count'] = $this->active_model->key_con();

        $this->load->view('active/data', $data);
    }

    public function begame1()
    {
        $this->load->model('active_model');
        $data['val'] = $this->active_model->info('id', $this->input->get('id'));

        $this->load->view('active/begame1', $data);
    }

    public function begame2()
    {
        $this->load->model('active_model');
        $this->load->model('active_games_model');
        $row = $this->active_model->info('id', $this->input->get('id'));
        $active_games = $this->active_games_model->all($this->input->get('gid'), $this->input->get('order'), '0', '15');
        foreach ($active_games as $index => $game) {
            $href = $this->host . 'active_games/' . $game['href'] . '/';
            $active_games[$index]['qrcode'] = $this->host . $this->erweima($href);
        }
        $data['active_games'] = $active_games;
        $data['gid'] = $row['gid'];
        $this->load->view('active/begame2', $data);
    }

    public function begame2_1()
    {
        $this->load->model('active_games_model');
        $data['val'] = $this->active_games_model->info('gid', $this->input->get('gid'));
        $this->load->view('active/begame2_1', $data);

    }

    public function begame3()
    {
        $this->load->model('active_model');

        if ($this->input->get('id') && $this->input->get('gid')) {

            $data['gid'] = $this->input->get('gid');
            //var_dump($data);
            $this->active_model->edit($data, $this->input->get('id'));
        }
        $row = $this->active_model->info('id', $this->input->get('id'));
        $data = array();

        if ($row['html_start1'] != '') $data['html'] = file_get_contents($this->host . $row['html_start1']);
        $data['ischou'] = $row['ischou'];
        $this->load->view('active/begame3_1', $data);
    }

    public function begame3_2()
    {
        $this->load->model('active_model');
        $row = $this->active_model->info('id', $this->input->get('id'));
        if ($row['html_end1'] != '') $data['html'] = file_get_contents($this->host . $row['html_end1']);
        $data['ischou'] = $row['ischou'];

        $this->load->view('active/begame3_2', $data);
    }

    public function begame3_3()
    {
        $this->load->model('active_model');
        $row = $this->active_model->info('id', $this->input->get('id'));
        if ($row['html_fenxiang1'] != '') $data['html'] = file_get_contents($this->host . $row['html_fenxiang1']);

        $data['ischou'] = $row['ischou'];
        $this->load->view('active/begame3_3', $data);
    }

    public function begame3_4()
    {
        $this->load->model('active_model');
        $data = $this->active_model->info('id', $this->input->get('id'));
        $this->load->view('active/begame3_4', $data);
    }

    public function begame3_5()
    {
        $this->load->model('active_model');
        $this->load->model('prize_model');
        $id = $this->input->get('id');
        $is_finish_set_prize = $this->active_model->is_finish_set_prize($id);
        if (!$is_finish_set_prize) {
            header('Location:/active/begame3_4?id=' . $id);
        }

        $row = $this->active_model->info('id', $this->input->get('id'));
        $data['prize'] = $this->prize_model->info('aid', $this->input->get('id'));
        $page = $this->input->get('page');
        if (!$page) {
            $page = '1';
        }
        if ($page == '1') {
            if ($row['html_prize1'] != '') {
                $data['html'] = file_get_contents($this->host . $row['html_prize1']);
            }
            $this->load->view('active/begame3_5', $data);
        } elseif ($page == '2') {
            if ($row['html_prize_not_win1'] != '') {
                $data['html'] = file_get_contents($this->host . $row['html_prize_not_win1']);
            }
            $this->load->view('active/begame3_5_not_winning', $data);
        } elseif ($page == '3') {
            if ($row['html_prize_delete_chance1'] != '') {
                $data['html'] = file_get_contents($this->host . $row['html_prize_delete_chance1']);
            }
            $this->load->view('active/begame3_5_deplete_chance', $data);
        } else {
            $this->load->view('active/begame3_5', $data);
        }
    }

    public function begame4()
    {
        $this->load->model('active_model');
        $this->load->model('active_games_model');
        $this->load->model('prize_model');
        $id = $this->input->get('id');
        $row = $this->active_model->info('id', $this->input->get('id'));
        $_GET['aid'] = $row['id'];
        $prize = $this->prize_model->info('aid', $this->input->get('aid'));
        $_GET['gid'] = $row['gid'];
        $games = $this->active_games_model->info('gid', $this->input->get('gid'));
        $data['val'] = $row;
        $data['val']['prize'] = $prize;
        $data['val']['games'] = $games;
        $data['is_finish_set_prize'] = $this->active_model->is_finish_set_prize($id) ? 1 : 0;
        $this->load->view('active/begame4', $data);
    }

    //游戏开始页
    public function games_info()
    {
        $this->load->model('active_model');
        $this->load->model('active_games_model');
        $row = $this->active_model->info('id', $this->input->get('id'));
        $_GET['gid'] = $row['gid'];
        $games = $this->active_games_model->info('gid', $this->input->get('gid'));
        $this->input->set_cookie("gamesid", $this->input->get('id'), 3600);
        $this->tongji('start', $this->input->get('id'));
        //header("Location:./games_end".$games['href']);
        header("Location:" . $this->host . "active_games/" . $games['href']);
    }

    //游戏结束页
    public function games_end()
    {
        $this->load->model('active_model');
        $this->load->model('active_games_model');
        if ($this->input->get('score')) $this->input->set_cookie("score", $this->input->get('score'), 100);
        $this->input->set_cookie("cookie3_2", '1', 100);
        $row = $this->active_model->info('id', $_COOKIE['gamesid']);
        header("Location:" . $this->host . $row['html_end']);
    }

    //游戏分享页
    public function games_fenxiang()
    {
        $this->load->model('active_model');
        $this->load->model('active_games_model');
        $row = $this->active_model->info('id', $this->input->get('id'));
        $this->input->set_cookie("cookie3_3", '1', 100);
        $this->tongji('fenxiang', $this->input->get('id'));
        //$this->input->set_cookie("choujiang",$this->input->get('id'),10);
        header("Location:" . $this->host . $row['html_fenxiang']);
    }

    //游戏结抽奖
    public function games_choujiang()
    {
        $this->load->model('active_model');
        $row = $this->active_model->info('id', $this->input->get('id'));
        $this->input->set_cookie("cookie3_5", '1', 100);
        $this->tongji('choujiang', $this->input->get('id'));
        header("Location:/" . $row['html_prize_not_win']);
    }

    public function games_getprize()
    {
        $this->load->model('active_model');
        $this->load->model('prize_model');
        $this->load->model('prize_log_model');

        $row = $this->active_model->info('id', $this->input->get('id'));
        $_GET['aid'] = $this->input->get('id');
        $_GET['order'] = 'p_size';
        $data = $this->prize_model->all($this->input->get('aid'), $this->input->get('order'), $_GET['p'], $_GET['end']);
        $con = $this->prize_log_model->con($this->input->get('aid'));

        if ($con > $row['prize_c1']) {
            $return['pirze_t'] = '';
            $return['title'] = '该抽奖已停止';
            $return['html'] = '';
        } else {
            if ($_COOKIE['prize_count'] < 1) $this->input->set_cookie("prize_count", 1, 84600);

            else {
                $this->input->set_cookie("prize_count", $_COOKIE['prize_count'] + 1, 84600);
            }
            // echo $_COOKIE['prize_count'];
            //抽奖次数用光
            if ($_COOKIE['prize_count'] > $row['prize_c']) {
                $return['pirze_t'] = '';
                $return['title'] = '';
//                $return['title'] = '你今日的抽奖次数已用光，请明日再来';
                $html = file_get_contents($row['html_prize_delete_chance1']);
                $html = str_replace('javascript:;fenxiang', '/index.php/active/games_fenxiang?id=' . $this->input->get('id'), $html);
                $html = str_replace('javascript:;', '/index.php/active/games_info?id=' . $this->input->get('id'), $html);
                $return['html'] = $html;
            } else {
                for ($i = 0; $i < count($data); $i++) {
                    $prize = rand(1, floor(100 / $data[$i]['p_size']));

                    if ($prize == 1) {
                        $con = $this->prize_log_model->con($this->input->get('aid'));
                        if ($con > $data[$i]['p_count']) {
                            continue;
                        }
                        $return['pirze_t'] = $row['prize_t'] . date('d') . date('m') . date('s') . date('H') . rand(1, 999);
                        $return['title'] = $data[$i]['p_name'];
                        $return['img'] = $data[$i]['p_img'];
                        $data_p['tm'] = time();
                        $data_p['aid'] = $this->input->get('id');
                        $data_p['prize_t'] = $return['pirze_t'];
                        $data_p['prizeid'] = $data[$i]['id'];
                        $this->prize_log_model->ins($data_p);
                        $phone_html = file_get_contents($row['html_prize1']);
                        $phone_html = str_replace('javascript:;prize_href', $this->prize_model->info('aid', $this->input->get('id'))['p_href'], $phone_html);
                        $phone_html = str_replace('javascript:;fenxiang', '/index.php/active/games_fenxiang?id=' . $this->input->get('id'), $phone_html);
                        $phone_html = str_replace('javascript:;', '/index.php/active/games_info?id=' . $this->input->get('id'), $phone_html);
                        $return['html'] = $phone_html;
                        break;
                    } else {
                        $return['pirze_t'] = '';
                        $return['title'] = '';
//                        $return['title'] = '很遗憾，木有中奖，不要灰心 再玩一次还能参与抽奖';
                        $return['img'] = '';
                        $return['html'] = '';

                    }

                }
            }
        }
        echo json_encode($return);
    }

    //基本资料提交
    public function active_submit()
    {
        $this->load->model('active_model');

        $f = $_POST['fimg'];
        if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $f, $result)) {
            $type = $result[2];
            if ($type = 'jpeg') $type = 'jpg';
            $new_file = './upload/active/u/' . date("Ymd-") . time() . rand(1, 9999) . '.' . $type;
            if (file_put_contents($new_file, base64_decode(str_replace($result[1], '', $f)))) {
                $wximg = $new_file;
            };
        }
        $data['title'] = $this->input->post('actName');
        $data['starttime'] = strtotime($this->input->post('startTime'));
        $data['endtime'] = strtotime($this->input->post('endTime'));
        $data['type'] = $this->input->post('scene');
        $data['fenxiangt'] = $this->input->post('wxTitle');
        $data['fenxiangc'] = $this->input->post('wxDesc');
        $data['ischou'] = $this->input->post('ischou');

        if ($wximg) $data['fenxiangi'] = $wximg;
        if ($this->input->post('id')) {
            $this->active_model->edit($data, $this->input->post('id'));
            echo $this->input->post('id');
        } else {
            $data['userid'] = $this->session->userdata('userid');
            if ($mid = $this->active_model->ins($data)) {
                echo $mid;
            }
        }

    }

    //开始页提交
    public function active_submit3_1()
    {
        $phone_html = $this->input->post('html');
        if ($phone_html) {
            $this->load->model('active_model');
            $current_active = $this->active_model->info('id', $this->input->post('id'));
            $page_title = "<script>  document.title = '" . $current_active['title'] . "'; </script>";

            $genereated_file = 'active/u/' . date("Ymd-") . time() . rand(1, 9999);
            $base_file = $genereated_file . '1' . '.html';
            $genereated_file .= '.html';
            file_put_contents($base_file, $phone_html);
            $phone_html = str_replace('javascript:;', '/index.php/active/games_info?id=' . $_POST['id'], $phone_html);

            $erweima = $this->erweima($this->host . $genereated_file);
            $str_start = file_get_contents('active/start.html');
            $str_start1 = file_get_contents('active/start_size.html');
            $str_end = file_get_contents('active/end.html');
            $share = "<script>var share_title='" . $current_active['title'] . "',share_link='" . $this->host . $genereated_file . "',share_imgUrl='" . $this->host . $current_active['fenxiangi'] . "',share_desc='" . $current_active['fenxiangc'] . "',end_time = '" . date('Y-m-d H:i:s', $current_active['endtime']) . "';</script>";
            $share1 = file_get_contents('active/share.html');
            if (file_put_contents($genereated_file, $str_start . $share . $phone_html . $str_end . $page_title . $str_start1 . $share1)) {
                $data['html_start'] = $genereated_file;
                $data['html_start1'] = $base_file;
                $data['erweima'] = $erweima;
                $this->active_model->edit($data, $this->input->post('id'));
            };
            echo $this->input->post('id');
        }

    }

    //结束页提交
    public function active_submit3_2()
    {
        if ($this->input->post('html')) {
            $this->load->model('active_model');

            $row = $this->active_model->info('id', $this->input->post('id'));
            $addtitle = "<script> if(getCookie('cookie3_2')){ document.title = '" . $row['title'] . "';var str=document.title; str=str.replace('#score#',score);share_title=share_title.replace('#score#',score);document.title=str; delCookie('cookie3_2'); }  else { window.location.href='" . $this->host . $row['html_start'] . "';}</script>";
            $f = $this->input->post('html');
            $new_file = 'active/u/' . date("Ymd-") . time() . rand(1, 9999);
            $new_file1 = $new_file . '1' . '.html';
            $new_file .= '.html';
            file_put_contents($new_file1, $f);
            $f = str_replace('javascript:;fenxiang', '/index.php/active/games_fenxiang?id=' . $_POST['id'], $f);
            $f = str_replace('javascript:;', '/index.php/active/games_info?id=' . $_POST['id'], $f);

            $str_start = file_get_contents('active/start.html');
            if (strpos($f, 'data-layout="symmetric"')) {
                $str_start = str_replace('/public/active/css/layout.css', '/public/active/css/symmetric/css/layout.css', $str_start);
            };
            if (strpos($f, 'data-layout="vertical"')) {
                $str_start = str_replace('/public/active/css/layout.css', '/public/active/css/vertical/css/layout.css', $str_start);
            };

            $str_end = file_get_contents('active/end.html');
            $str_js1 = file_get_contents('active/addjs_end.html');
            $str_js = file_get_contents('active/addjs.html');
            $share = "<script>var share_title='" . $row['fenxiangt'] . "',share_link='" . $this->host . $new_file . "',share_imgUrl='" . $this->host . $row['fenxiangi'] . "',share_desc='" . $row['fenxiangc'] . "';</script>";
            $share1 = file_get_contents('active/share.html');
            if (file_put_contents($new_file, $str_start . $share . $f . $str_js1 . $str_js . $str_end . $addtitle . $share1)) {
                $data['html_end'] = $new_file;
                $data['html_end1'] = $new_file1;

                $this->active_model->edit($data, $this->input->post('id'));
            };
            echo $this->input->post('id');
        }

    }

    //分享页
    public function active_submit3_3()
    {
        if ($this->input->post('html')) {
            $this->load->model('active_model');
            $row = $this->active_model->info('id', $this->input->post('id'));
            $addtitle = "<script> if(getCookie('cookie3_3')){ document.title = '" . $row['title'] . "';var str=document.title; str=str.replace('#score#',score);share_title=share_title.replace('#score#',score);document.title=str; delCookie('cookie3_3'); }  else { window.location.href='" . $this->host . $row['html_start'] . "';}</script>";
            $f = $this->input->post('html');
            $new_file = 'active/u/' . date("Ymd-") . time() . rand(1, 9999);
            $new_file1 = $new_file . '1' . '.html';
            $new_file .= '.html';
            file_put_contents($new_file1, $f);
            $str_start = file_get_contents('active/start.html');
            $str_end = file_get_contents('active/end.html');
            $str_fenxiang = file_get_contents('active/addjs_fenxiang.html');
            $share = "<script>var share_title='" . $row['fenxiangt'] . "',share_link='" . $this->host . $new_file . "',share_imgUrl='" . $this->host . $row['fenxiangi'] . "',share_desc='" . $row['fenxiangc'] . "';</script>";
            $share1 = file_get_contents('active/share.html');
            $fenxiangi = "<div style='display:none'><img src='" . $this->host . $row['fenxiangi'] . "'></div>";
            if (file_put_contents($new_file, $str_fenxiang . $str_start . $share . $fenxiangi . $f . $str_end . $addtitle . $share1)) {
                $data['html_fenxiang'] = $new_file;
                $data['html_fenxiang1'] = $new_file1;

                $this->active_model->edit($data, $this->input->post('id'));
            };

            if ($row['ischou'] == 1) echo 'ischou' . $this->input->post('id');
            else {
                echo $this->input->post('id');
            }
        }

    }

    //抽奖页面提交
    public function active_submit3_4()
    {
        $this->load->model('active_model');
        $data['prize_t'] = $this->input->post('convertCodePrefix');
        $data['prize_c'] = $this->input->post('lotteryTotal');
        $data['prize_c1'] = $this->input->post('todayLotteryTotal');
        $this->active_model->edit($data, $_POST['id']);
        header('Location:/active/begame3_5?id=' . $_POST['id']);
    }

    //抽奖结束页面提交
    public function active_submit3_5()
    {
        $id = $this->input->post('id');
        $phone_html = $this->input->post('html');
        $type = $this->input->post('type');

        if ($phone_html) {
            $this->load->model('prize_model');
            $this->load->model('active_model');
            $row = $this->active_model->info('id', $id);
            $addtitle = "<script> if(getCookie('cookie3_5')){ document.title = '" . $row['title'] . "';var str=document.title; str=str.replace('#score#',score);share_title=share_title.replace('#score#',score);document.title=str;$('#layStyle').attr('href','/public/active/css/layout3.css'); delCookie('cookie3_5'); }  else { window.location.href='" . $this->host . $row['html_start'] . "';}</script>";

            $generated_file = 'active/u/' . md5('active_' . $id . '_' . $type);
            $base_html = $generated_file . '1' . '.html';
            $generated_file .= '.html';
            file_put_contents($base_html, $phone_html);
            $phone_html = str_replace('javascript:;prize_href', $this->prize_model->info('aid', $_POST['id'])['p_href'], $phone_html);
            $phone_html = str_replace('javascript:;fenxiang', '/index.php/active/games_fenxiang?id=' . $_POST['id'], $phone_html);
            $phone_html = str_replace('javascript:;', '/index.php/active/games_info?id=' . $_POST['id'], $phone_html);

            $prize_url = "<script>var pirze_url='" . $this->host . "active/games_getprize?id=" . $_POST['id'] . "';";
            $str_start = file_get_contents('active/start.html');
            $str_start = file_get_contents('active/start.html');
            if (strpos($phone_html, 'data-layout="symmetric"')) {
                $str_start = str_replace('/public/active/css/layout.css', '/public/active/css/symmetric/css/layout.css', $str_start);
            };
            if (strpos($phone_html, 'data-layout="vertical"')) {
                $str_start = str_replace('/public/active/css/layout.css', '/public/active/css/vertical/css/layout.css', $str_start);
            };


            $str_end = file_get_contents('active/end.html');
            $str_js = file_get_contents('active/addjs.html');
            $str_js1 = file_get_contents('active/addjs_end.html');
            $str_prize = file_get_contents('active/prize.html');
            $share = "<script>var share_title='" . $row['fenxiangt'] . "',share_link='" . $this->host . $generated_file . "',share_imgUrl='" . $this->host . $row['fenxiangi'] . "',share_desc='" . $row['fenxiangc'] . "';</script>";
            $share1 = file_get_contents('active/share.html');
            if (file_put_contents($generated_file, $str_start . $share . $phone_html . $str_end . $str_js . $str_js1 . $prize_url . $str_prize . $addtitle . $share1)) {
                switch ($type) {
                    case 'alreadyWinningHtml':
                        $data['html_prize'] = $generated_file;
                        $data['html_prize1'] = $base_html;
                        break;
                    case 'notWinningHtml':
                        $data['html_prize_not_win'] = $generated_file;
                        $data['html_prize_not_win1'] = $base_html;
                        break;
                    case 'depleteChanceHtml':
                        $data['html_prize_delete_chance'] = $generated_file;
                        $data['html_prize_delete_chance1'] = $base_html;
                        break;
                    default:
                        break;
                }

                $this->active_model->edit($data, $this->input->post('id'));
            };
            echo $this->input->post('id');
        }

    }

    //游戏列表
    public function  games()
    {
        $this->load->model('active_games_model');
        $data['list'] = $this->active_games_model->all($this->input->get('gid'), $this->input->get('order'));
        $data['user_id'] = $this->session->userdata('userid');
        $this->load->view('active/game', $data);
    }

    //生成二维码
    public function erweima($href)
    {
        include_once('public/phpqrcode.php');
        // 二维码数据
        $data = $href;
        // 生成的文件名
        $filename = 'active/u/' . md5($href) . '.png';
        if (file_exists($filename)) {
            return $filename;
        }
        // 纠错级别：L、M、Q、H
        $errorCorrectionLevel = 'L';
        // 点的大小：1到10
        $matrixPointSize = 4;
        //创建一个二维码文件
        QRcode::png($data, $filename, $errorCorrectionLevel, $matrixPointSize, 2);
        return $filename;
    }

    //图片上传
    public function up_img()
    {
        $config['upload_path'] = "active/u/";
        $config['allowed_types'] = "gif|jpg|png";
        $config['file_name'] = date("Ymd") . rand(1, 999);
        $config['max_size'] = "20000";
        $this->load->library('upload', $config);
        if ($this->upload->do_upload('file')) {
            $file = $this->upload->data();
            $file = $file['file_name'];
        }
        echo '{"content":"' . $file . '"}';
    }

    //删除数据
    public function del()
    {

        $this->load->model('active_model');

        if ($this->input->get('id')) {
            //echo $_GET['pid'];
            $this->active_model->del($this->input->get('id'));
        }
        $_GET['id'] = '';
    }


    //统计数据
    public function tongji($tp, $id, $pid)
    {
        $ip = $this->get_ip();
        $domain = strpos($ip, ',');
        if ($domain) {
            $ip = substr($ip, 0, strpos($ip, ','));
        };
        $this->load->model('tongji_model');
        $area = json_decode($this->tongji_model->send_post('http://ip.taobao.com/service/getIpInfo.php?ip=' . $ip), true)['data']['region'];

        if ($id > 0 && $tp != '') {
            $data['aid'] = $id;
            $data['type'] = $tp;
            $data['pid'] = $pid ? $pid : 0;
            $data['ip'] = $ip;
            $data['area'] = $area;
            $data['basic_info'] = $_SERVER['HTTP_USER_AGENT'];
            $data['tm'] = time();
            $this->tongji_model->ins($data);
        }
    }
    public function get_ip(){
        if ($_SERVER["HTTP_X_FORWARDED_FOR"]) {
            return $_SERVER["HTTP_X_FORWARDED_FOR"];
        } else {
            if ($_SERVER["HTTP_CLIENT_IP"]) {
                return $_SERVER["HTTP_CLIENT_IP"];
            } else {
                return $_SERVER["REMOTE_ADDR"];
            }
        }
    }

    public function share()
    {
        require_once './public/share/config.php';
        echo '{"appId":"' . $appid . '","timestamp":"' . $thisTime . '","nonceStr":"' . $nonceStr . '","signature":"' . $signature . '"}';
    }

    public function accept_img()
    {
        $base_imgae_name = './upload/active/u/' . date("Ymd") . time();
        if (!empty($_FILES)) {
            if ($_FILES['file']['error'] > 0) {
                echo json_encode(array('success' => false, 'error_code' => $_FILES["file"]["error"], 'code' => -1, 'content' => null, 'msg' => null, 'resubmitToken' => null));
            }
            $img_name = $base_imgae_name . $_FILES['file']['name'];
            move_uploaded_file($_FILES['file']['tmp_name'], $img_name);
            echo json_encode(array('success' => true, 'code' => 0, 'content' => $this->host . $img_name, 'msg' => null, 'resubmitToken' => null));
        } else {
            $img_file = file_get_getcontents('php://input');
            file_put_contents($base_imgae_name . '.jpg', $img_file);
            echo json_encode(array('success' => true, 'code' => 0, 'content' => $this->host . $base_imgae_name . 'jpg', 'msg' => null, 'resubmitToken' => null));
        }

    }


}
