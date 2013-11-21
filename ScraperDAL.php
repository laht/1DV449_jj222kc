<?php

require_once("producerModel.php");

class scraperDAL {

	private $dbConnection;
	const dbPath = 'db.sqlite';

	public function __construct() {
		$this->initiateDb();
	}

	//Establish database connection 
	private function initiateDb() {
		try {
			$this->dbConnection = new \PDO('sqlite:'.self::dbPath);
			$this->dbConnection->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}

	//Enter the scraped and configured data into the database
	public function insertProducers($producers) {
		$sql = 'DELETE FROM Producers';
		$this->runSql($sql);

		foreach ($producers as $producer) {
			$sql = "INSERT INTO Producers (id, name, url, city) 
					VALUES('$producer->id', '$producer->name', '$producer->url', '$producer->city')";
			$this->runSql($sql);
		}
	}

	//Grab all the producers from the database
	public function getAllProducers() {
		$producers = array();
		$sql = "SELECT * FROM Producers";
		$dbResult = $this->runSql($sql);

		foreach ($dbResult as $producer) {
			$producers[] = new producerModel($producer["id"],
											 $producer["name"],
											 $producer["url"],
											 $producer["city"]);
		}

		return $producers;
	}

	//Run given sql query 
	private function runSql($sql) {
		
		$sth = $this->dbConnection->prepare($sql);
		if ($sth->execute()) {
			return $sth->fetchAll();
		}
		else {
			die("Något fel skedde när sql-satsen kördes");
		}
		
	}
}