<?php

require_once("scrape.php");
require_once('ScraperDAL.php');
require_once("Database.php");
require_once("getHtmlPage.php");

$scraper = new scraper();
$db = new database();
$dal = new scraperDAL();
$pageView = new getHtmlPage();

$dbData = $dal->getAllProducers();
echo $pageView->renderPage($dbData);

