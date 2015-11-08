ref.onAuth(function(authData) {
  if (authData && isNewUser) {
    // save the user's profile into the database so we can list users,
    // use them in Security and Firebase Rules, and show profiles
    ref.child("Users").child(authData.uid).set({
      fname: getFName(authData),
      lname: getLName(authData)
    });
  }
});

function getFName(authData){
	return authData.facebook.cachedUserProfile.first_name;
}

function getLName(authData){
	return authData.facebook.cachedUserProfile.last_name;
}

function login(){

	ref.authWithOAuthPopup("facebook", function(error, authData) {
  		if (error) {
   			console.log("Login Failed!", error);
  		} else {
  			console.log("Authenticated successfully with payload:", authData.facebook.cachedUserProfile.first_name);
  			checkSession();
  		}
	}, {
  		remember: "sessionOnly"
	});
}

function logout(){
	ref.unauth();
	window.location.href = "index.html";
}

function checkSession(){
	authData = ref.getAuth();
	console.log(authData);
	if(authData){
		window.location.href = "index.html";
	}
	else
	{
		login();
	}
}

function checkSessionLogin(){
	authData = ref.getAuth();
	console.log(authData);
	if(authData == null){
		window.location.href = "index.html";
	}
}

$("#logout_anchor").click(function(){
    logout();
})