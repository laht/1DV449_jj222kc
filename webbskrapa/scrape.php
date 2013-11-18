<?php

curl_cookie_handling("http://vhost3.lnu.se:20080/~1dv449/scrape/index.php");

function curl_cookie_handling($url) {
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_REUTRNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_POST, 1);

	$post_arr = array("username" => "admin", "password" => "admin");

	curl_setopt($ch, CURLOPT_POSTFIELDS, $post_arr);
	$data = curl_exec($ch);

	curl_close($ch);
	var_dump($data);
}