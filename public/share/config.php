<?php
require_once('function.php');
$thisTime = time();
$appid = "wxb264a87f19469ddd";
$appSecret = "c35e27ad7b06c3883fee8998a3cdce2f";

$nonceStr = md5( $thisTime );

//获取access
if( isset( $_COOKIE['access_token']) ){
	$access_token = $_COOKIE['access_token'];
}else{
	$url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=".$appid."&secret=".$appSecret;
	$response = getHttpResponseGET( $url );
	$json = json_decode( $response ,true);
	if( isset( $json['errcode'])){
		echo "获取access失败";
		exit;
	}
	$access_token = $json['access_token'];
	setcookie('access_token',$access_token,time()+7200,'/');
}
//获取jsapi_tickets
if( isset( $_COOKIE['jsapi_tickets']) ){
	$jsapi_tickets = $_COOKIE['jsapi_tickets'];
}else{
	$jsapiUrl = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=".$access_token."&type=jsapi";
	$jsapiResponse = getHttpsResponseGet( $jsapiUrl );
	$jsapiJson = json_decode( $jsapiResponse , true );
	if( isset( $jsapiJson['errcode']) && $jsapiJson['errcode'] != '0'){
		echo "获取jsapi 失败";
		exit;
	}	
	$jsapi_tickets = $jsapiJson['ticket'];
	setcookie('jsapi_tickets',$jsapi_tickets,time()+7200,'/');
}

$param = array();
$param['noncestr'] = $nonceStr;
$param['timestamp'] = $thisTime;
$param['jsapi_ticket'] = $jsapi_tickets;
$param['url'] = $_GET['url'];

$sortParam = argSort( $param );

$string = createLinkstringUrlencode( $sortParam );
$signature = sha1( $string );
