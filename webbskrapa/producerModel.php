<?php

class producerModel {

	public $id;
	public $name;
	public $url;
	public $city;

	public function __construct($id, $name, $url, $city) {
		$this->id = $id;
		utf8_encode($this->name = $name);
		utf8_encode($this->url = $url);
		utf8_encode($this->city = $city);

		$this->validateFields();
	}

	//If there is a producer which was not able load data from set values to unknown 
	private function validateFields() {
		if ($this->id == "") {
			$this->id = 00;
		}
		if ($this->name == "") {
			$this->name = "Ingen uppgift tillgänglig";
		}
		if ($this->url == "") {
			$this->url = "Ingen uppgift tillgänglig";
		}
		if ($this->city == "") {
			$this->city = "Ingen uppgift tillgänglig";
		}
	}
}