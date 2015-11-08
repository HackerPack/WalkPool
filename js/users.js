function search_user(authData)
{
	ref.child("Users").equalTo(authData.uid).once("value", function(snapshot){
		return true;
	}, function(error){
		return false;
	});
}

function read_user(){
	var users = ref.child("Users");
	users.on("child_added",function(snapshot,prevChildKey){
		return snapshot.val();
	});
}
