//server/webapp.js

//Meteor.startup(function () {

//TEST
Meteor.methods({
  drum1: function (filename) {
	console.log('this should make xhr request to ' + filename);
	return "some return value";
  }//,
});

	// Listen to incoming HTTP requests, can only be used on the server
	WebApp.connectHandlers.use("/public", function(req, res, next) {
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader("Access-Control-Allow-Methods", "GET");
		res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type, X-Requested-With, Origin');
		//return next();
	});

//});