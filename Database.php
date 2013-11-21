<?php 

class database {

	const dbPath = 'db.sqlite';
	private $dbConnection;

	//Initiate database connection and create table
	public function __construct() {
		$this->initiateDb();
		$this->createDb();
	}

	//Establish database connection 
	private function initiateDb() {
		try {
			$this->dbConnection = new PDO('sqlite:'.self::dbPath);
			$this->dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		} catch (Exception $e) {
			die("Det gick inte att ansluta till databasen");
		}
	}

	//Create Producers table if it does not exist
	public function createDb() {
		$sql = 'CREATE TABLE IF NOT EXISTS Producers ( id INTEGER PRIMARY KEY,
														 name TEXT,
														 url TEXT,
														 city TEXT )';
		$this->runSql($sql);
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