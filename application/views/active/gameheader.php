<?php
$username = $this->session->userdata('username');


if ($username == '') header('Location:http://' . $_SERVER['HTTP_HOST']);
?>
<div id="header_v2">
    <div class="inner">
        <div class="logo">
            <a href="#">
                <img src="/public/images/qtlogo.png">
            </a>
        </div>
        <div class="user-link" style="position:relative">
            <i class="icon icon-level"></i>
                <span class="user-level">
                    [体验用户] ,
                </span>
            <span class="user-name"><?php echo $username; ?>          </span>
            <a class="login-question" href="#">
                <i class="icon icon-question"></i>
            </a>
            <a class="logout" href="/admin/logout" >
                [退出]
            </a>
        </div>
    </div>
</div>
<script>
    var root_url = "http://" + "<?php echo $_SERVER['HTTP_HOST'];?>";
</script>
