//server/webapp.js

var connectHandler = WebApp.connectHandlers; // get meteor-core's connect-implementation

Meteor.startup(function () {

	//TEST security policies
	// Listen to incoming HTTP requests, can only be used on the server
	connectHandler.use("/public", function(req, res, next) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader("Access-Control-Allow-Methods", "GET");
		//res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type, X-Requested-With, Origin');
		return next();
	});

	BrowserPolicy.content.allowInlineStyles();
	BrowserPolicy.content.allowFontDataUrl();
	BrowserPolicy.content.allowMediaSameOrigin();
	//BrowserPolicy.content.allowSameOriginForAll();
//allows permissions to get external resources, but not working as well for specific content types
//i.e. allowFontOrigin(origin) is not working whereas allowOriginForAll(origin) does work
	BrowserPolicy.content.allowOriginForAll('*.meteor.com');
	BrowserPolicy.content.allowOriginForAll('ajax.googleapis.com');
	BrowserPolicy.content.allowOriginForAll('code.jquery.com');
	BrowserPolicy.content.allowOriginForAll('fonts.googleapis.com');
	BrowserPolicy.content.allowOriginForAll('https://maxcdn.bootstrapcdn.com');
	BrowserPolicy.content.allowOriginForAll('fonts.gstatic.com');
	BrowserPolicy.content.allowMediaOrigin('chc_machina_musica2.meteor.com');
	BrowserPolicy.content.allowConnectOrigin("*.meteor.com");

	//END TEST SECURITY

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


});

// // attach connect-style middleware for response header injection
// Meteor.startup(function () {
//   connectHandler.use(function (req, res, next) {
//     res.setHeader('Strict-Transport-Security', 'max-age=2592000; includeSubDomains'); // 2592000s / 30 days
//     return next();
//   })
// })