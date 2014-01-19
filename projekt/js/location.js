//TODO 
//save location to local storage on computers

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
			renderError("Det gick inte att hämta din position");
		}
		//initiate geolocation 
		navigator.geolocation.getCurrentPosition(success, error, options);
	},
	//get city name from coordinates
	getCityName: function(lng, lat) {
		//storage object
		var repo = Object.create(storage);
		//base object
		var that = this;
		//only get location if ip has changed
		if (that.validateLocation(repo)) {
			that.renderName(repo.getLocation());
		}
		else {
			$.ajax({
			type: "GET",
			url: "http://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&sensor=true",
			error: function() {renderError("Det gick inte att hämta din position");}
			}).done(function(data) {
				//check status code
				console.log(repo);
				that.checkStatusCode(data, repo);
			})
		}
	},
	//See if user's location is changed
	validateLocation: function(repo) {	
		//get ip from localstorage
		var lastIp = repo.getIp();
		//get current ip
		var currentIp = codehelper_ip.IP;
		if (lastIp === currentIp) {
			return true;
		}
		else {
			return false;
		}

	},
	//save current Ip and location to localstorage
	saveLocation: function(loc, repo) {
		repo.saveLocation(loc);
		repo.saveIp(codehelper_ip.IP);
	},
	//validate status code
	checkStatusCode: function(data, repo) {
		//if status is ok
		if (data.status === "OK") {
			var loc = data.results[0].address_components[2].long_name;
			this.renderName(loc);
			this.saveLocation(loc, repo);
		}
		//else show error
		else {
			renderError("Det gick inte att hämta din position");
		}
	},
	//append users city to dom
	renderName: function(name) {
		$("#city").html(name+"?");
	},
	//reduce coords to 2 decimal float
	correctedCoords: function(c) {
		return parseFloat(c).toFixed(2);
	},
	//geolocation is only ready if lng and lat is actual coordinates
	ready: function() {
		//base object
		var that = this;		
		if (that.longitude === 0 || that.latitude === 0) {
			return false;
		}
		else{
			return true;
		}
	}
}





