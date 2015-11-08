var ref = new Firebase("https://brilliant-fire-4087.firebaseio.com/");
function search_user(authData)
{
	ref.child("Users").orderByKey().equalTo(authData.uid).once("value", function(snapshot){
		return true;
	}, function(error){
		return false;
	});
}

function createWalkEvent(eventData){						//Event details from front end
	ref.child("WalkEvent").push({
		"UID" : ref.getAuth().uid,
		"Source" : {
			"Latitude" : eventData.Source.Latitude,
			"Longitude" : eventData.Source.Longitude},
		"Destination" : {
			"Latitude" : eventData.Destination.Latitude,
			"Longitude" : eventData.Destination.Longitude},
		"ArrivingTime" : eventData.ArrivingTime,
		"Recurring" : eventData.Recurring
	});
}

function createWalkRequest(myEventId, inviteeEventID){		//Requester event ID, Invitee Event ID
	var inviteeUID;
	
	ref.child("WalkEvent").orderByKey().equalTo(inviteeEventID).once("value", function(snapshot){
		inviteeUID = snapshot.val().UID
	});
	
	ref.child("WalkEvent/$myEventId/Invitee").update({
			"$inviteeUID" : "false"
	});
	
	ref.child("WalkRequest").push({
		"UID" : inviteeUID,
		"WalkEventID" : myEventId,
		"InviteeWalkEventID" : inviteeEventID,
		"Accepted" : "false"
	});
}

function updateAcceptance(requestID){						//Request ID accepted by the user
	ref.child("WalkRequest/$requestID").update({
		"Accepted" : "true"
	});
	
	inviteeUID = ref.getAuth().uid;
	
	ref.child("WalkRequest/$requestID/Invitee").update({
		"$inviteeUID" : "true"
	});
}

function getRequest() {
	var requestData = [];
	
	ref.child("WalkRequest").orderByChild("UID").equalTo(req.getAuth().uid).once("value", function(requestList) {
		
		requestList.forEach(function(request) {
			ref.child("WalkEvent").orderByKey().equalTo(request.val().WalkEventID).once("value",function(eventSnap){
				var FName;
				var requestID = request.key();
				ref.child("Users").orderByKey().equalTo(eventSnap.UID).once("value", function(userSnap){
					FName = userSnap.val().FirstName;
				});
				
				requestData.push({
						"RequestID" : "$requestID",
						"FirstName" : "$FName",
						"Source": {"Latitude": "$eventSnap.Source.Latitude", "Longitude": "$eventSnap.Source.Longitude"},
						"Destination": {"Latitude": "$eventSnap.Destination.Latitude", "Longitude": "$eventSnap.Destination.Longitude"},
						"ArrivingTime": "$eventSnap.ArrivingTime",
						"Recurring": "$eventSnap.Recurring"});
			});
		});
	});
	
	return requestData;
}

function getAcceptance() {
	var acceptanceData = [];
	ref.child("WalkEvent").orderByChild("UID").equalTo(req.getAuth().uid).once("value", function(eventList) {
		
		eventList.forEach(function(eventSnap) {
			var eventID = eventSnap.key();
			ref.child("WalkEvent/$eventID/Invitee").orderByKey().once("value", function(inviteeList){
				inviteeList.forEach(function(invitee){
					 if (invitee.val() == "true") {
						 ref.child("Users").orderByKey().equalTo(invitee.key()).once("value",function(userDataSnap){
							 var userFName = userDataSnap.FirstName;
							 acceptanceData.push({
									 "FirstName" : "$userFName",
									 "Source": {"Latitude": "$eventSnap.Source.Latitude", "Longitude": "$eventSnap.Source.Longitude"},
									 "Destination": {"Latitude": "$eventSnap.Destination.Latitude", "Longitude": "$eventSnap.Destination.Longitude"},
									 "ArrivingTime": "$eventSnap.ArrivingTime",
									 "Recurring": "$eventSnap.Recurring"});
						});
					 }
				});
			});
		});
	});	
}

function getAllEvents() {
	var allEvents[];
	ref.child("WalkEvent").once("value", function(eventList){
		eventList.forEach(function(eventSnap) {
			var eventID = eventSnap.key();
			ref.child("Users").orderByKey().equalTo(eventSnap.val().UID).once("value",function(userDataSnap){
				 var userFName = userDataSnap.FirstName;
				 acceptanceData.push({
					 	 "EventID" : "$eventID",
						 "FirstName" : "$userFName",
						 "Source": {"Latitude": "$eventSnap.Source.Latitude", "Longitude": "$eventSnap.Source.Longitude"},
						 "Destination": {"Latitude": "$eventSnap.Destination.Latitude", "Longitude": "$eventSnap.Destination.Longitude"},
						 "ArrivingTime": "$eventSnap.ArrivingTime",
						 "Recurring": "$eventSnap.Recurring"});
				});
		});
	});
}

function read_user(){
	var users = ref.child("Users");
	users.on("child_added",function(snapshot,prevChildKey){
		return snapshot.val();
	});
}
