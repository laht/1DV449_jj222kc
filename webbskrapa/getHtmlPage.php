<?php

class getHtmlPage {
	
	public function renderPage($data) {

		$html = "<html>
		<head>
			 <meta http-equiv='Content-Type' content='text/html'; charset='UTF-8' />
			<title>Scraper-jj22kc</title>
		</head>
		<body>
			<div id='main'>
				<div id='scraped-data'>";
				foreach ($data as $producer) {
					$html .= $this->producerBox($producer);
				}
				$html.="</div>
			</div>
		</body>
		</html>";

		return $html;
	}

	private function producerBox($producer) {
		$html = "<h2>$producer->name</h2>
				 <div class='url'>$producer->url</div>
				 <div class='city'>$producer->city</div>
				 <div class='id'>$producer->id</div>";

		return $html;
	}
}