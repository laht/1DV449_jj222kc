<?php
require_once("sec.php");

// check tha POST parameters
$u = $_POST['username'];
$p = $_POST['password'];

// Check if user is OK
if(isUser($u, $p)) {
	// set the session
	sec_session_start();
	$_SESSION['login_string'] = hash('sha512', "Come_On_You_Spurs" +$u); 
	$_SESSION['user'] = $u;
	$_SESSION['userAgent'] = $_SERVER['HTTP_USER_AGENT'];
	$_SESSION['remoteAddr'] = $_SERVER['REMOTE_ADDR'];
	header("Location: mess.php");
}
else {
	// Too bad
	header('HTTP/1.1 401 Unauthorized');
}
