<?php

/**
* Called from AJAX to add stuff to DB
*/
function addToDB($name, $message, $pid) {
	$db = null;
	$name = htmlentities($name);
	$message = htmlentities($message);
	$pid = htmlentities($pid);

	try {
		$db = new PDO("sqlite:db.db");
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	}
	catch(PDOEception $e) {
		die("Something went wrong -> " .$e->getMessage());
	}

	$stmt = $db->prepare("INSERT INTO messages (message, name, pid) VALUES (:message, :name, :pid)");	

	try {
		if(!$stmt->execute(array('message' => $message, 'name' => $name, 'pid' => $pid))) {
			die("Fel vid insert");
		}
	}
	catch(PDOException $e) {
		die("Something went wrong -> " .$e->getMessage());
	}
}
