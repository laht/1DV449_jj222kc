var map = {
	map: null,
	markers: [],
	infoWindow: null,

	createMap: function() {	
		var that = this;	
		var mapOptions = {
		    zoom: 5,
		    center: new google.maps.LatLng(60, 18)
	  	}
		that.map = new google.maps.Map($("#map-canvas")[0], mapOptions);
	},

	setMarker: function(lat, lng, content) {
		var that = this;
		var myLatLng = new google.maps.LatLng(lat,lng);
		if (that.infoWindow == null) {
			this.infoWindow = new google.maps.InfoWindow();	
		}
		var marker = new google.maps.Marker({
			position: myLatLng,
			map: that.map,
		});
		that.markers.push(marker);
		var myOptions = {
			content: content
		}
		google.maps.event.addListener(marker, 'click', function() {
			that.infoWindow.setOptions(myOptions);
			that.infoWindow.open(this.map, marker);
		});
	},

	deleteMarkers: function() {
		for (var i = 0; i < this.markers.length; i++) {
			this.markers[i].setMap(null);
		}
	},
}