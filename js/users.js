var db_ref = new Firebase("https://brilliant-fire-4087.firebaseio.com");
function add_user(authData){
	
	var users = db_ref.child("Users");
	users.child(authData.uid).set({
		First Name: authData.facebook.first_name;
	});
}

function search_user(authData)
{
	db_ref.child("Users").equalTo(authData.uid).once("value", function(snapshot){
		return true;
	}, function(error){
		return false;
	});
}

function read_user(){
	
	
}