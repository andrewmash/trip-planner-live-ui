$('#addHotelButton').on('click', function() {
	// var hotelName = $('.panel-body:first select:first')[0].value;
	if ($('#hotelOutput').has("div").length) alert("You already have a hotel for this day.");
	else {
		var hotelName = $('#hotelSelector')[0].value;
		var hotel = getHotel(hotelName);

		var itineraryStr = '<div class="itinerary-item"><span class="title">';
		itineraryStr += hotelName;
	    itineraryStr += '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>';

	    var $itinElem = $(itineraryStr).data('hotel', hotel);
		$('#hotelOutput').append($itinElem);

		redraw_gmaps();
	}
});

$('#addRestaurantButton').on('click', function() {
	var restaurantName = $('#restaurantSelector')[0].value;

	var existingNames = [];
	var $restList = $('#restaurantOutput > div');
	for (var i = 0; i < $restList.length; i++) {
  		existingNames.push($($restList[i]).data('restaurant').name);
  	}

  	if  (existingNames.indexOf(restaurantName) === -1) {
		var restaurant = getRestaurant(restaurantName);

		var itineraryStr = '<div class="itinerary-item"><span class="title">';
		itineraryStr += restaurantName;
	    itineraryStr += '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>';

		var $itinElem = $(itineraryStr).data('restaurant', restaurant);
		$('#restaurantOutput').append($itinElem);

		redraw_gmaps();
	}
});

$('#addActivitiesButton').on('click', function() {
	var activityName = $('#activitySelector')[0].value;
	
	var existingNames = [];
	var $actList = $('#activityOutput > div');
	for (var i = 0; i < $actList.length; i++) {
  		existingNames.push($($actList[i]).data('activity').name);
  	}

  	if (existingNames.indexOf(activityName) === -1) {
		var activity = getActivity(activityName);

		var itineraryStr = '<div class="itinerary-item"><span class="title">';
		itineraryStr += activityName;
	    itineraryStr += '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>';

		var $itinElem = $(itineraryStr).data('activity', activity);
		$('#activityOutput').append($itinElem);

		redraw_gmaps();
	}
});

$('#addDay').on('click', function() {
	var dayCount = $('.day-buttons').children().length - 1;
	var newDay = '<button class="btn btn-circle day-btn"';
	newDay += ' id=' + (dayCount + 1) + '>';
	newDay += +(dayCount + 1) + '</button>';
	$(this).before(newDay);
});



$('#output').on('click', 'button', function() {
	$(this).parent().remove();
	redraw_gmaps();
});

function redraw_gmaps() {

  var hotelLocation;
  var restaurantLocations = [];
  var activityLocations = [];

  var hotel = $('#hotelOutput > div');
  if (hotel.data('hotel')) {
  	hotelLocation = hotel.data('hotel').place[0].location;
  }
  
  var $restList = $('#restaurantOutput > div');
  var $activityList = $('#activityOutput > div');

  for (var i = 0; i < $restList.length; i++) {
  	restaurantLocations.push($($restList[i]).data('restaurant').place[0].location);
  }

  for (var j = 0; j < $activityList.length; j++) {
  	activityLocations.push($($activityList[j]).data('activity').place[0].location);
  }

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
  if (hotel.data('hotel')) {
	  drawLocation(hotelLocation, {
	    icon: '/images/lodging_0star.png'
	  });
	}
  restaurantLocations.forEach(function(loc) {
    drawLocation(loc, {
      icon: '/images/restaurant.png'
    });
  });
  activityLocations.forEach(function(loc) {
    drawLocation(loc, {
      icon: '/images/star-3.png'
    });
  });
}

function getHotel(name) {
	var output;
	hotels.forEach(function(hotel) {
		if (hotel.name === name) {
			output = hotel;
		}
	});
	return output;
}

function getRestaurant(name) {
	var output;
	restaurants.forEach(function(restaurant) {
		if (restaurant.name === name) {
			output = restaurant;
		}
	});
	return output;
}

function getActivity(name) {
	var output;
	activities.forEach(function(activity) {
		if (activity.name === name) {
			output = activity;
		}
	});
	return output;
}

$(document).ready(function() {
  $(body).data("0", $('.panel-body:last').clone());
  $(body).data("activeDay", 1);
});