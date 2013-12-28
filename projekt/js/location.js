//object to fetch users geographical location 
var userLocation = {
	//users longitude
	longitude: 0,
	//users latitude
	latitude: 0,

	//fetch users position
	getCoords: function() {
		//base object
		var that = this;
		//geolocation options
		var options = {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0
		}
		//if successful set base latitude and longitude
		function success(pos) {
			var crd = pos.coords;
			that.longitude = that.correctedCoords(crd.longitude);
			that.latitude = that.correctedCoords(crd.latitude);
		}
		//if unsuccessful log error
		function error(err) {
			//render error
			console.warn('ERROR(' + err.code + '): ' + err.message);
		}
		//initiate geolocation 
		navigator.geolocation.getCurrentPosition(success, error, options);
	},

	//get city name from coordinates
	getCityName: function(lng, lat) {
		//base object
		var that = this;		
		$.ajax({
		type: "GET",
		url: "http://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&sensor=true",
		error: function() {renderError("Det gick inte att hämta din position");}
		}).done(function(data) {
			//check status code
			that.checkStatusCode(data);
		})
	},

	//validate status code
	checkStatusCode: function(data) {
		//if status is ok
		if (data.status === "OK") {
			this.renderName(data.results[0].address_components[data.results[0].address_components.length-1].long_name);	
		}
		//else show error
		else {
			renderError("Det gick inte att hämta din position");
		}
	},
	//append users city to dom
	renderName: function(name) {
		$(".jumbotron").append(name + "?");
	},
	//reduce coords to 2 decimal float
	correctedCoords: function(c) {
		return parseFloat(c).toFixed(2);
	},

	//geolocation is only ready if lng and lat is actual coordinates
	ready: function() {
		var that = this;
		if (that.longitude === 0 || that.latitude === 0) {
			return false;
		}
		else{
			return true;
		}
	}
}





