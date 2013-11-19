<?php

const baseURL = "http://vhost3.lnu.se:20080/~1dv449/scrape/";
const cookieFile = "/cookie.txt";

$data = curl_cookie_handling(baseURL."check");


function curl_cookie_handling($url) {
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_POST, 1);

	$post_arr = array("username" => "admin", "password" => "admin");

	curl_setopt($ch, CURLOPT_POSTFIELDS, $post_arr);
	curl_setopt($ch, CURLOPT_COOKIEJAR, dirname(__FILE__).cookieFile);
	curl_setopt($ch, CURLOPT_COOKIEFILE, dirname(__FILE__).cookieFile);
	curl_setopt($ch, CURLOPT_HEADER, 1);
	$data = curl_exec($ch);
	curl_close($ch);

	if (preg_match('/Location: (.*)/', $data, $r)) {
		$l = trim($r[1]);
	}
	
	curl_get_request(baseURL.$l);
}

function curl_get_request($url, $page = "main") {
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_COOKIEFILE, dirname(__FILE__).cookieFile);

	$data = curl_exec($ch);
	getHtml($data, $page);
}


function extractFirstPageLinks($data) {
	$dom = new DomDocument();
	if ($dom->loadHTML($data)) {
		$xpath = new DOMXPath($dom);
		$items = $xpath->query('//tr/td/a');
	}

	foreach ($items as $item) {
		curl_get_request(baseURL."secure/".$item->getAttribute("href"), "sub");		
	}
}

function getHtml($data, $page) {
	if ($page == "sub") {
		extractSubPageData($data);
	}
	else {
		extractFirstPageLinks($data);
	}
}

function extractSubPageData($data) {
	$dom = new DomDocument();

	libxml_use_internal_errors(true);
	if ($dom->loadHTML($data)) {
		$xpath = new DOMXPath($dom);
		$items = $xpath->query('//span[@class="ort"]');
	}

	foreach ($items as $item) {
		echo $item->nodeValue."<br />";
	}	
}