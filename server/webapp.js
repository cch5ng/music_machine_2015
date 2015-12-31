//server/webapp.js

var connectHandler = WebApp.connectHandlers; // get meteor-core's connect-implementation

Meteor.startup(function () {

	//TEST
	Meteor.methods({
	  getAudio: function (filename) {
		console.log('this should make xhr request to ' + filename);

		var url = 'http://chc_machina_musica2.meteor.com/' + filename;
		console.log('url: ' + url);
		//var result = 
		HTTP.call("GET", url, {responseType: 'arraybuffer'}, function(error, result) {
			if (!error) {
				console.log('type of: ' + typeof result.content);
				return result;
			} else {
				console.log('error: ' + error);
			}

		});
		//return "some return value";
	  }//,
	});

		// Listen to incoming HTTP requests, can only be used on the server
		connectHandler.use("/public", function(req, res, next) {
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader("Access-Control-Allow-Methods", "GET");
			res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type, X-Requested-With, Origin');
			//return next();
		});

});

// // attach connect-style middleware for response header injection
// Meteor.startup(function () {
//   connectHandler.use(function (req, res, next) {
//     res.setHeader('Strict-Transport-Security', 'max-age=2592000; includeSubDomains'); // 2592000s / 30 days
//     return next();
//   })
// })