var db_ref = new Firebase("https://brilliant-fire-4087.firebaseio.com");
function add_user(authData){
	
	var users = db_ref.child("Users");
	users.child(authData.uid).set({
		First Name: authData.facebook.first_name;
	});
}

function read_user(){
	
	
}