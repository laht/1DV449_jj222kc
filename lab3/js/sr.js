var sr = {
	nop: 100,
	format: "json",
	map: null,

	getTrafficMessages: function() {
		var that = this;
		var url = "http://api.sr.se/api/v2/traffic/messages?indent=true&format="+that.format+"&size="+that.nop+"";
		$.ajax({
		type: "GET",
		url: url,		
	    dataType: 'jsonp'
		}).done(function(data) {
			that.setMarkers(data.messages);
			console.log(data.messages);
		})
	},

	setMarkers: function(messages) {
		for (var i = 0; i < messages.length; i++) {
			var lat = messages[i].latitude;
			var lng = messages[i].longitude;
			var content = this.assembleContent(messages[i]);
			this.map.setMarker(lat, lng, content);
		}
	},

	filteredMarkers: function(filter) {		
		var that = this;
		var url = "http://api.sr.se/api/v2/traffic/messages?indent=true&format="+that.format+"&size="+that.nop+"";
		that.map.deleteMarkers();
		$.ajax({
		type: "GET",
		url: url,		
	    dataType: 'jsonp'
		}).done(function(data) {
			that.filterMarks(data.messages, filter);
		})
	},

	filterMarks: function(data, filter) {
		console.log(filter);
		var filteredMessages = [];		
		for (var i = 0; i < data.length; i++) {			
			for (var s = 0; s < filter.length; s++) {				
				if (data[i].category == filter[s]) {
					filteredMessages.push(data[i]);					
				}
			}
		}
		if (filter.length === 0) {
			this.setMarkers(data);
			return;
		}
		this.setMarkers(filteredMessages);
	},

	assembleContent: function(message) {
		var content = '<div class="message-info">'+
			'<h2>'+
				message.title+
			'</h2>'+
			'<p>'+
				this.messageDate(message.createddate)+
			'</p>'+
			'<p>'+
				message.description+
			'</p>'+
			'<p>'+
				message.subcategory+
			'</p>'+
			'</div>';		
		return content;
	},

	messageDate: function(date) {		
		var n = date.match(/\d+/g)[0];
		var d = new Date(parseInt(n));
		var day = d.getDay();
		var month = d.getMonth()+1;
		var year = d.getFullYear();
		var hour = d.getHours();
		var minute = d.getMinutes();
		var cd = day+"-"+month+"-"+year+" "+hour+":"+minute;
		return cd;
	}
}