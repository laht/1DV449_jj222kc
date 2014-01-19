var weather = {
	//get weather from SMHI api
	getWeatherData: function(lat, lng) {
		var that = this;
		var url = "http://opendata-download-metfcst.smhi.se/api/category/pmp1g/version/1/geopoint/lat/"+lat+"/lon/"+lng+"/data.json"; 
		$.ajax({
			type: "GET",
			url: url,
			error: function() {renderError("Det gick inte att hämta väderdata");}
		}).done(function(data) {
			//analyze result
			that.getCurrentWeather(data);			
		}) 
	},
	//get weather for current time
	getCurrentWeather: function(weather) {
		var d = new Date();
		var h = d.getHours().toString();
		//make string compareable
		if (h.toString().length == 1) {
			h = "0"+h;
		}
		for (var i = 0; i < weather.timeseries.length; i++) {	
			var oh = this.getWeatherHours(weather, i);
			//if the current time matches the weather hour
			if (oh === h) {
				//check current time's weather and break
				this.renderWeather(weather.timeseries[i].pcat);
				break;
			}
		}
	},
	getWeatherHours: function(weather, i) {
		//find time and seperate date from time
		var t = weather.timeseries[i].validTime.split("T");
		//extract the time component
		var tc = t[1].split(":");
		return tc[0];
	},
	renderWeather: function(df) {
		//determine the current weather and append it		
		switch (df) {
			//1 is snow
			case 1:
				$(".footer-bar").before("<div id='result' class='jumbotron green'>Japp!</div>");
				break;
			//2 there might be snow
			case 2: 
				$(".footer-bar").before("<div id='result' class='jumbotron orange'>Kanske!</div>");
				break;
			//anything else is not snow
			default:
				$(".footer-bar").before("<div id='result' class='jumbotron red'>Tyvärr!</div>");
				break;
		}
	}
}


