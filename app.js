// Includes modules
var express    = require('express');
var session    = require('express-session');
var bodyparser = require('body-parser');
//var jade = require('jade');
// Define routes exports file path
var routes     = require('./routes/routes.js');
var db = require(__dirname+"/database/users.json");

var app = express();

// Pretty print html output
if (app.get('env') === 'development') {
  app.locals.pretty = true;
}

// Middlewares
app.use(express.static(__dirname+"/public"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(session({secret: "xpm#sfr", resave : true, saveUninitialized: false}));

// Set templating engine
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get("/",routes.loginHandler);
app.post("/home",routes.loginSubmitHandler);
app.get("/home",routes.home);
app.get("/logout",routes.logout);
app.get("/profile",routes.profile);
app.get("/profile/:uid",routes.profile);

var port = process.env.PORT || 3000;
app.listen(port,function(){
	console.log("Server started at port : 3000");
});