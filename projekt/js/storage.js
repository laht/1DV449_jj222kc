var storage = {

	saveLocation: function(loc) {
		localStorage.setItem("loc", loc);
	},

	saveIp: function(ip) {
		localStorage.setItem("ip", ip);
	},

	getIp: function() {
		return localStorage.getItem("ip");
	},

	getLocation: function() {
		return localStorage.getItem("loc");
	},
}