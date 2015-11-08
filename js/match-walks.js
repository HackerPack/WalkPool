var authData = ref.getAuth();
var myFirstName = authData.UID;
function isNear(ASrc,ADest,BSrc,BDest) {
  var bounds = new google.maps.LatLngBounds;
  //var markersArray = [];

  /*var ASrc = {lat: 55.93, lng: -3.118};
  var BSrc = {lat: 55.93, lng: -3.118};
  var ADest = {lat: 55.93, lng: -3.118};
  var BDest = {lat: 55.93, lng: -3.118};*/
  //var origin2 = 'Greenwich, England';
  //var destinationA = 'Stockholm, Sweden';
  //var destinationB = {lat: 50.087, lng: 14.421};

  //var destinationIcon = 'https://chart.googleapis.com/chart?' +
      //'chst=d_map_pin_letter&chld=D|FF0000|000000';
  //var originIcon = 'https://chart.googlseapis.com/chart?' +
      //'chst=d_map_pin_letter&chld=O|FFFF00|000000';
  //var map = new google.maps.Map(document.getElementById('map'), {
    //center: {lat: 55.53, lng: 9.4},
    //zoom: 10
  //});
  var geocoder = new google.maps.Geocoder;

  var service = new google.maps.DistanceMatrixService;
  service.getDistanceMatrix({
    origins: [ASrc, ADest],
    destinations: [BSrc, BDest],
    travelMode: google.maps.TravelMode.WALKING,
    unitSystem: google.maps.UnitSystem.METRIC,
    avoidHighways: true,
    avoidTolls: true
  }, function(response, status) {
    if (status !== google.maps.DistanceMatrixStatus.OK) {
      alert('Error was: ' + status);
    } else {
      var originList = response.originAddresses;
      var destinationList = response.destinationAddresses;
      var outputDiv = document.getElementById('output');
      //outputDiv.innerHTML = '';
      //deleteMarkers(markersArray);

     /* var showGeocodedAddressOnMap = function(asDestination) {
        var icon = asDestination ? destinationIcon : originIcon;
        return function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            map.fitBounds(bounds.extend(results[0].geometry.location));
            markersArray.push(new google.maps.Marker({
              map: map,
              position: results[0].geometry.location,
              icon: icon
            }));
          } else {
            alert('Geocode was not successful due to: ' + status);
          }
        };
      };*/
      if(results[0][0]<5 && results[1][1]<5)
      	return true;
      else 
      	return false;
    }
  });
}

function deleteMarkers(markersArray) {
  for (var i = 0; i < markersArray.length; i++) {
    markersArray[i].setMap(null);
  }
  markersArray = [];
}
/*function isNear(ASrc,ADest,BSrc,BDest){
	return true;
}*/

function findClosestWalks(walk_res){
	//var walk_obj = JSON.parse(walk_res);
	//var myFirstName = getFName();
	//console.log(walk_res);
	var closeWalks =[];
	var mywalks =[];
	for(var i=0;i<walk_res.length;i++){
		if(walk_res[i].FirstName === myFirstName){
			mywalks.push(walk_res[i]);
		}
	}
	/*walk_res.forEach(function (value){
		if(value.FirstName === myFirstName){
			mywalks.push(value);
			$("#abc").html("got my walk");
		}
	})*/
	console.log(myFirstName);
	console.log(mywalks);
	for(var i=0;i<mywalks.length;i++){
		for(var j=0;j<walk_res.length;j++){
			if(walk_res[j].UID == myFirstName){
				continue;
			}
			else{
				//var todayDate = new Date();
				//var objectDate = new Date(walk_res[j].Date);
				//${#abc}.html(todayDate);
				//${#abc}.html(objectDate);
				if(//todayDate === objectDate &to& 
					isNear(mywalks[i].Source,mywalks[i].Destination,
													  walk_res[j].Source,walk_res[j].Destination)){
					closeWalks.push(walk_res[j]);
					//$("#abc").html("got my close walk");
				}
			}
		}
	}
	console.log(closeWalks);
	/*mywalks.forEach( function (value){
		for(key in walk_res){
			if(key.FirstName===myFirstName){
				$("#abc").html("got my walk again");
				continue;
			}
			else{
				var todayDate = new Date();
				var objectDate = new Date(key.Date);
				//${#abc}.html(todayDate);
				//${#abc}.html(objectDate);
				if(todayDate === objectDate &to& isNear(value.Source,value.Destination,
													  key.Source,key.Destination)){
					closeWalks.push(key);
					$("#abc").html("got my close walk");
				}
			}
		}
	})*/
	return closeWalks;
}
