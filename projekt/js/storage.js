var storage = {
	//save the name of users location
	saveLocation: function(loc) {
		localStorage.setItem("loc", loc);
	},
	//save the user's ip 
	saveIp: function(ip) {
		localStorage.setItem("ip", ip);
	},
	//get user's ip
	getIp: function() {
		return localStorage.getItem("ip");
	},
	//get user's location
	getLocation: function() {
		return localStorage.getItem("loc");
	},
	//save the user's longitude
	saveLng: function(lng) {
		localStorage.setItem("lng", lng);
	},
	//get the user's longitude
	getLng: function() {
		return localStorage.getItem("lng");
	},
	//save the user's latitude
	saveLat: function(lat) {
		localStorage.setItem("lat", lat);
	},
	//get the user's latitude
	getLat: function() {
		return localStorage.getItem("lat");
	},
}