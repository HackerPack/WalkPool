var db_ref = new Firebase("https://brilliant-fire-4087.firebaseio.com");
function add_user(authData){
	
	var users = db_ref.child("Users");
	users.child(authData.uid).set({
		FirstName: authData.facebook.first_name;
	});
}

function read_user(){
	var users = db_ref.child("Users");
	users.on("child_added",function(snapshot,prevChildKey){
		return snapshot.val();
	});
}

function delete_user(){
	var users = db_ref.child("Users");
	users.on("child_removed", function(snapshot){
		return snapshot.val();
	});
}