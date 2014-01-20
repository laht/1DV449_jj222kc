var map = Object.create(map);
map.createMap();

var sr = Object.create(sr);
sr.map = map;
sr.getTrafficMessages();

var sort = Object.create(sort);

$("#filter-button").click(function() {
	sort.sortMarkers();
});