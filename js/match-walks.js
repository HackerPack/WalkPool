var myFirstName = 'shivani';
function isNear(ASrc,ADest,BSrc,BDest){
	return true;
}
function trigger()
{
	var walks = getAllEvents();
    findClosestWalks(walks);
}

function findClosestWalks(walk_res){
	//var walk_obj = JSON.parse(walk_res);
	//var myFirstName = getFName();
	var closeWalks =[];
	var mywalks =[];
	for(var i=0;i<walk_res.length;i++){
		if(walk_res[i].FirstName === myFirstName){
			mywalks.push(walk_res[i]);
			$("#abc").html("got my walk");
		}
	}
	/*walk_res.forEach(function (value){
		if(value.FirstName === myFirstName){
			mywalks.push(value);
			$("#abc").html("got my walk");
		}
	})*/
	for(var i=0;i<mywalks.length;i++){
		for(var j=0;j<walk_res.length;j++){
			if(walk_res[j].FirstName===myFirstName){
				$("#abc").html("got my walk again");
				continue;
			}
			else{
				var todayDate = new Date();
				var objectDate = new Date(key.Date);
				//${#abc}.html(todayDate);
				//${#abc}.html(objectDate);
				if(todayDate === objectDate &to& isNear(mywalks[i].Source,mywalks[i].Destination,
													  walk_res[j].Source,walk_res[j].Destination)){
					closeWalks.push(key);
					$("#abc").html("got my close walk");
				}
			}
		}
	}
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
}
