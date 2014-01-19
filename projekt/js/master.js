//weater object
var weather = Object.create(weather);
//userLocation object
var ul = Object.create(userLocation);
ul.getCoords();
//make sure latitude and longitude is set before moving on
checkGeoState = function() {
	if (ul.ready()) {
		ul.getCityName(ul.longitude, ul.latitude);
		weather.getWeatherData(ul.latitude, ul.longitude);
	}
	else{
		window.setTimeout(function(){checkGeoState()}, 300);
	}
}
checkGeoState();
renderError = function(err) {
	if ($("#error").length == 0) {
		$(".footer-bar").before("<div id='error' class='jumbotron red'><p>"+err+"</p></div>");	
	}
	else{
		$("#error").append("<p>"+err+"</p>");
	}
}