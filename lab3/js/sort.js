var sort = {

	sr: null,

	sortMarkers: function() {
		this.sr = Object.create(sr);
		var filter = [];
		if ($("#roadtraffic").prop("checked")) {
			filter.push(0);
		}
		if ($("#publictransport").prop("checked")) {
			filter.push(1);
		}
		if ($("#planneddisturbance").prop("checked")) {
			filter.push(2);
		}
		if ($("#misc").prop("checked")) {
			filter.push(3);
		}
		this.sr.filteredMarkers(filter);
	}	
}