$('.panel-body:first button:first').on('click', function() {
	var hotelName = $('.panel-body:first select:first')[0].value;
	var hotel = getHotel(hotelName);

	var itineraryStr = '<div class="itinerary-item"><span class="title">';
	itineraryStr += hotelName;
    itineraryStr += '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>';

	$('.panel-body:last ul:first').append(itineraryStr);

	$('.panel-body:last ul:first div:first').data('hotel', hotel);

	console.log($('.panel-body:last ul:first div:first').data('hotel'));

	redraw_gmaps(hotel.place[0].location);
});

function redraw_gmaps(hotelLocation, restaurantLocations, activityLocations) {

  // initialize new google maps LatLng object
  var myLatlng = new google.maps.LatLng(40.705189, -74.009209);

  // set the map options hash
  var mapOptions = {
    center: myLatlng,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
    // styles: styleArr
  };

  // get the maps div's HTML obj
  var map_canvas_obj = document.getElementById('map-canvas');

  // initialize a new Google Map with the options
  var map = new google.maps.Map(map_canvas_obj, mapOptions);

  // add the marker to the map
  var marker = new google.maps.Marker({
    position: myLatlng,
    title: 'Hello World!'
  });

  // draw some locations on the map
  function drawLocation(location, opts) {
    if (typeof opts !== 'object') {
      opts = {};
    }
    opts.position = new google.maps.LatLng(location[0], location[1]);
    opts.map = map;
    var marker = new google.maps.Marker(opts);
  }

  drawLocation(hotelLocation, {
    icon: '/images/lodging_0star.png'
  });
  // restaurantLocations.forEach(function(loc) {
  //   drawLocation(loc, {
  //     icon: '/images/restaurant.png'
  //   });
  // });
  // activityLocations.forEach(function(loc) {
  //   drawLocation(loc, {
  //     icon: '/images/star-3.png'
  //   });
  // });
}

function getHotel(name) {
	var output;
	hotels.forEach(function(hotel) {
		if (hotel.name === name) {
			console.log("Found a match!");
			output = hotel;
		}
	});
	return output;
}