<?php

require_once('ScraperDAL.php');
require_once('producerModel.php');

class scraper {

	const baseURL = "http://vhost3.lnu.se:20080/~1dv449/scrape/";
	const cookieFile = "/cookie.txt";
	public $producers = array();

	//initiate $data member variable
	public function __construct() {
		$this->curl_cookie_handling(self::baseURL."check");	
	}
	
	//Call the login page and post with username and password
	//then save the sessionId to enter next page
	private function curl_cookie_handling($url) {
		//initiate and configure curl
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_POST, 1);

		//required postdata
		$post_arr = array("username" => "admin", "password" => "admin");

		curl_setopt($ch, CURLOPT_POSTFIELDS, $post_arr);
		curl_setopt($ch, CURLOPT_COOKIEJAR, dirname(__FILE__).self::cookieFile);
		curl_setopt($ch, CURLOPT_COOKIEFILE, dirname(__FILE__).self::cookieFile);
		curl_setopt($ch, CURLOPT_HEADER, 1);
		$data = curl_exec($ch);
		curl_close($ch);

		//fix the location string
		if (preg_match('/Location: (.*)/', $data, $r)) {
			$url = trim($r[1]);
		}
		
		$this->curl_get_request(self::baseURL.$url);
	}

	//Call the page and scrape content
	private function curl_get_request($url, $page = "main", $location = "") {
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_COOKIEFILE, dirname(__FILE__).self::cookieFile);

		$data = curl_exec($ch);
		$this->getHtml($data, $page, $location);
	}

	//Scrape the links of the first page after logging in
	private function extractFirstPageLinks($data) {
		$dom = new DomDocument();
		if ($dom->loadHTML($data)) {
			$xpath = new DOMXPath($dom);
			$items = $xpath->query('//tr/td/a');
		}
		foreach ($items as $item) {
			$this->curl_get_request(self::baseURL."secure/".$item->getAttribute("href"), "sub", $item->getAttribute("href"));
		}
	}

	//Call appropriate method to extract custom html
	private function getHtml($data, $page, $location = "") {
		if ($page == "sub") {
			 $this->extractSubPageData($data, $location);
		}
		else {
			$this->extractFirstPageLinks($data);
		}
	}
	//Scrape data from the sub page
	public function extractSubPageData($data, $location) {
		$dom = new DomDocument();

		libxml_use_internal_errors(true);
		if ($dom->loadHTML($data)) {
			$xpath = new DOMXPath($dom);
			$urls = $xpath->query('//div[@class="hero-unit"]/p/a');
			$names = $xpath->query('//div[@class="hero-unit"]/h1');
			$cities = $xpath->query('//span[@class="ort"]');
		}

		$producerName = "";
		$producerURL = "";
		$producerCity = "";
		foreach ($urls as $url) {
			$producerURL = $url->nodeValue;
		}
		foreach ($names as $name) {
			$producerName = $name->nodeValue;
		}
		foreach ($cities as $city) {
			$producerCity = $city->nodeValue;
		}

		if (!empty($producerCity)) {
			$producerCity = str_replace("Ort:", "", $producerCity);
		}

		$producerId = preg_replace( '/[^0-9]/', '', $location );

		$this->producers[] = new producerModel($producerId, $producerName, $producerURL, $producerCity);

		$this->addToDatabase();
	}

	//Add scraped information to the database
	private function addToDatabase() {
		$scraperDAL = new scraperDAL();

		$scraperDAL->insertProducers($this->producers);

	}
}
