var weather = {

	//get weather from SMHI api
	getWeatherData: function(lng, lat) {
		var that = this;
		var url = "http://opendata-download-metfcst.smhi.se/api/category/pmp1g/version/1/geopoint/lat/"+lat+"/lon/"+lng+"/data.json"; 
		$.ajax({
			type: "GET",
			url: url,
			error: function() {renderError("Det gick inte att hämta väderdata");}
		}).done(function(data) {
			//analyze result
			that.getCurrentWeather(data);
			that.getNextDaysWeather(data);
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
				this.renderSnow(weather.timeseries[i].pcat);
				break;
			}
		}
	},
	getNextDaysWeather: function(weather) {
		var d = new Date();
		var weatherTimes = [];
		var nextDaysWeather = [];

		for (var i = 0; i < weather.timeseries.length; i++) {
			var time = new Date(weather.timeseries[i].validTime);
			if (time.getHours() == "13" && nextDaysWeather.length < 5) {
				weatherTimes.push(time);
				nextDaysWeather.push(weather.timeseries[i]);
			}
		}
		this.willItSnow(nextDaysWeather);
		this.renderWeather(nextDaysWeather);
	},
	getWeatherHours: function(weather, i) {
		//find time and seperate date from time
		var t = weather.timeseries[i].validTime.split("T");
		//extract the time component
		var tc = t[1].split(":");
		return tc[0];
	},
	getNameOfDay: function(day) {
		var days = [];
		days.push("Söndag");
		days.push("Måndag");
		days.push("Tisdag");
		days.push("Onsdag");
		days.push("Torsdag");
		days.push("Fredag");
		days.push("Lördag");		

		return days[day];
	},
	renderWeather: function(weathers) {
		for (var i = 0; i < weathers.length; i++) {
			var day = this.getNameOfDay(new Date(weathers[i].validTime).getDay());
			var weatherString = "<div class='weather'>"+
					"<div class='day'>"+
						day+
					"</div>"
					+
					"<div class='temp'>"+
						weathers[i].t+"°c"
					+"</div>"+
					"<div class='symbol'>"+
						"<img src='symbols/"+this.getSymbol(weathers[i])+".png'/>"+
					"</div>"+
					"<div class='clearfix'></div>"+
				"</div>";

			$("#weathers").append(weatherString);			
		}
	},
	getSymbol: function(weather) {
		
		if (weather.tcc != 0) {
			if (weather.tcc <= 3) {
				return 2;
			}
			else if (weather.tcc > 3 && weather.tcc <= 6) {
				return 3;
			}
			else if (weather.tcc > 6) {
				if (weather.pcat == 0) {
					return 4;
				}
				else if (weather.pcat == 1) {
					return 13;
				}
				else if (weather.pcat == 2) {
					return 7;
				}
				else if (weather.pcat == 3) {
					return 10;
				}
				else if (weather.pcat == 4) {
					return 9;
				}
				else if (weather.pcat == 5) {
					return 12;
				}
				else if (weather.pcat == 6) {
					return 7;
				}
			}
		}

		return 1;		
	},
	renderSnow: function(df) {
		//determine the current weather and append it		
		switch (df) {
			//1 is snow
			case 1:
				$("#main").append("<div id='result' class='jumbotron green'>Japp!</div>");
				break;
			//2 there might be snow
			case 2: 
				$("#main").append("<div id='result' class='jumbotron orange'>Kanske!</div>");
				break;
			//anything else is not snow
			default:
				$("#main").append("<div id='result' class='jumbotron red'>Tyvärr!</div>");
				break;
		}
	},
	willItSnow: function(weathers) {
		console.log(weathers);
		var snowDay;
		for (var i = 0; i < weathers.length; i++) {
			if (weathers[i].pcat == 1) {
				snowDay = new Date(weathers[i].validTime);
				break;
			}
		}
		if (snowDay != null) {
			if (snowDay.getDay() == new Date().getDay()) {
				$("#main").append("<div class='jumbotron green snow-day'>Japp det kommer snöa idag!</div>");
			}
			else {
				$("#main").append("<div class='jumbotron green snow-day'>Japp det kommer snöa på "+this.getNameOfDay(snowDay.getDay())+"</div>");	
			}			
		}
		else {
			$("#main").append("<div class='jumbotron orange snow-day'>Verkar inte som det kommer någon snö, kanske nästa vecka!</div>");
		}
	}
}


