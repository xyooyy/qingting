<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
header("Content-type:text/html;charset=utf-8");
error_reporting(0);
session_start();

class Admin extends CI_Controller
{
    //轻应用列表后台
    public function index()
    {
        $username = $this->session->userdata('username');
        $userid = $this->session->userdata('userid');
        if($username != '' || $userid !=''){
            header("Location:/index.php/active/index");
        }else{
            $this->load->view('login');
        }
    }

    //后台登陆
    public function login()
    {
        $this->load->Model('userlogin_model');
        if ($this->input->post()) {
            if ($_POST["reg_rand"] == $_SESSION["login_check_num"]) {
                if ($re = $this->userlogin_model->all($this->input->post('username'), $this->input->post('password'))) {
                    $array = array("username" => $re['username'], "admin" => $re['admin'], "userid" => $re['id']);

                    $this->session->set_userdata($array);

                    header("Location:/index.php/active/index");
                } else {
                    echo "<script>alert('用户名或密码错误');location.href='./index?username=" . $_POST['username'] . "';</script>";
                }
            } else {
                echo "<script>alert('验证码错误');location.href='./index?username=" . $_POST['username'] . "';</script>";
            }
        }
    }
    //后台退出
    public function logout()
    {
        $this->session->unser_userdata(array("username" => '', "admin" => '', "userid" => ''));
        echo "<script>top.location='./index';</script>";
    }

    //后台ifarme
    public function main()
    {
        $this->load->view('main');
    }

    //后台左侧
    public function main_left($d)
    {
        $this->load->Model('userlogin_model');
        $data['list'] = $this->userlogin_model->tab();

        $data['now_left'] = $d;
        $this->load->view('common/left', $data);
    }

    //后台左侧
    public function main_header()
    {
        $this->load->view('common/header');
    }

    //添加主题
    public function    ins_tab()
    {
        if (isset($_SESSION['userid'])) {
            $this->load->Model('userlogin_model');
            $data['name'] = $this->input->post('name');
            $data['tm'] = time();
            $data['userid'] = $_SESSION['userid'];
            $this->userlogin_model->ins_tab($data);
            $this->main_left(2);
        } else {
            $this->logout();
        }
    }

    //删除主题
    public function    del_tab()
    {
        if (isset($_SESSION['userid'])) {
            $this->load->Model('userlogin_model');
            $this->userlogin_model->del_tab($data);
            $this->main_left(2);
        } else {
            $this->logout();
        }
    }

    public function sendmail()
    {

        if ($this->input->post()) {

            $this->load->library('Email');//加载邮件类

            $config['protocol'] = 'smtp';//邮件发送协议

            $config['smtp_host'] = 'smtp.163.com';//SMTP服务器地址
            $config['smtp_user'] = 'Huosuqingyy';//smtp用户账号
            $config['smtp_pass'] = 'Huosu888';//smtp密码
            $this->email->initialize($config);
            //for($i=0;$i<5;$i++){
            $this->email->clear();
            $this->email->from('Huosuqingyy@163.com');//来自什么邮箱
            $this->email->to($_POST['mail']);//发到什么邮箱
            $this->email->subject('火速轻应用提交审核结果');//邮件主题
            $this->email->message($_POST['content']);//邮件内容
            $this->email->print_debugger();//返回包含邮件内容的字符串，包括EMAIL正文。用于调试
            if ($this->email->send()) {//发送email，根据发送结果，成功返回true,失败返回false,就可以用它判断局域
                echo '发送成功';
            } else {
                echo '发送失败';
            }
        }
        //}
    }

    //验证码图片生成
    public function rand_create()
    {

        //通知浏览器将要输出PNG图片
        Header("Content-type: image/PNG");
        //准备好随机数发生器种子
        srand((double)microtime() * 1000000);
        //准备图片的相关参数
        $im = imagecreate(62, 20);
        $black = ImageColorAllocate($im, 0, 0, 0);  //RGB黑色标识符
        $white = ImageColorAllocate($im, 255, 255, 255); //RGB白色标识符
        $gray = ImageColorAllocate($im, 200, 200, 200); //RGB灰色标识符
        //开始作图
        imagefill($im, 0, 0, $gray);
        printf('11111111');
        while (($randval = rand() % 100000) < 10000) ;
        {
            $_SESSION["login_check_num"] = $randval;
            //将四位整数验证码绘入图片
            imagestring($im, 5, 10, 3, $randval, $black);
        }
        //加入干扰象素
        for ($i = 0; $i < 200; $i++) {
            $randcolor = ImageColorallocate($im, rand(0, 255), rand(0, 255), rand(0, 255));
            imagesetpixel($im, rand() % 70, rand() % 30, $randcolor);
        }
        //输出验证图片

        ImagePNG($im);
        //销毁图像标识符
        ImageDestroy($im);
    }


}
