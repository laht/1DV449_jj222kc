//weater object
var weather = Object.create(weather);
//userLocation object
var ul = Object.create(userLocation);
ul.getCoords();

//localstorage repository object
var repo = Object.create(storage);
//make sure latitude and longitude is set before moving on
checkGeoState = function() {
	//if there are no coordinates in the localstorage
	if (repo.getLat()=== null || repo.getLng === null) {
		//check if userlocation is ready
		if (ul.ready()) {
			//get city name
			ul.getCityName(ul.longitude, ul.latitude);
			//get weather data
			weather.getWeatherData(ul.latitude, ul.longitude);
		}
		else{
			//geolocation needs to be ready
			window.setTimeout(function(){checkGeoState()}, 300);
		}
	}
	//else 
	else {
		//get city name with saved coordinates
		ul.getCityName(repo.getLat(), repo.getLng());
		//get weather data with saved coordinates
		weather.getWeatherData(repo.getLat(), repo.getLng());
	}
}
checkGeoState();
//If there are any errors use this function to render them
renderError = function(err) {
	if ($("#error").length == 0) {
		$(".footer-bar").before("<div id='error' class='jumbotron red'><p>"+err+"</p></div>");	
	}
	else{
		$("#error").append("<p>"+err+"</p>");
	}
}