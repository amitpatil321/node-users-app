var db = require("../database/users.json");

// Show login screen
exports.loginHandler = function(req,res){
	res.render('login.jade',{uinfo:req.session});
}

// Submit button handler
exports.loginSubmitHandler = function(req,res){
	var username = req.body.username;
	var password = req.body.password;
	if(db.users[username] != undefined){
		if(db.users[username].username == username && db.users[username].password == password){
			// Store user id in session
			req.session.uid  = db.users[username].id;
			req.session.name = db.users[username].username;
			// Render home pahe
			res.render("home.jade",{uinfo:req.session, ulist:db.users});
		}else{
			// handle login failed
			res.render('login.jade',{msg : "Invalid username or password", msgclass :'alert alert-danger'});
		}
	}else{
		// handle login failed
		res.render('login.jade',{msg : "Invalid username or password", msgclass :'alert alert-danger'});
	}
	res.end()
}

exports.logout = function(req,res){
	req.session.destroy()
	res.redirect("./");
}

exports.home = function(req,res){
	if(req.session.uid)
		res.render('home.jade',{uinfo:req.session,ulist:db.users});
	else
		res.redirect("/");
}

exports.profile = function(req,res){
	// Assign default value to profile variable
	var profile = req.session.name;
	var keys = Object.keys(db.users);
	for(i=0; i < keys.length; i++){
		//console.log(parseInt(req.params.uid) === parseInt(db.users[keys[i]].id));
		if(parseInt(req.params.uid) == parseInt(db.users[keys[i]].id)){
		 profile = db.users[keys[i]].username;
		}
	}
	//All set now render profile page
	res.render('profile.jade',{profile:db.users[profile],uinfo:req.session});
}