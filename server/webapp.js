//server/webapp.js

//var connectHandler = WebApp.connectHandlers; // get meteor-core's connect-implementation

Meteor.startup(function () {

	//TEST security policies

	WebApp.connectHandlers.use(function(req, res, next) {
		res.setHeader("Access-Control-Allow-Origin", "*");
		return next();
	});

	BrowserPolicy.content.allowInlineScripts();
	BrowserPolicy.content.allowFontOrigin('chc_machina_musica.meteor.com');
	BrowserPolicy.content.allowScriptOrigin('chc_machina_musica.meteor.com');
	BrowserPolicy.content.allowMediaSameOrigin();
	BrowserPolicy.content.allowSameOriginForAll();
	BrowserPolicy.content.allowOriginForAll('*.meteor.com');
	BrowserPolicy.content.allowOriginForAll('ajax.googleapis.com');
	BrowserPolicy.content.allowOriginForAll('code.jquery.com');
	BrowserPolicy.content.allowOriginForAll('fonts.googleapis.com');
	BrowserPolicy.content.allowOriginForAll('https://maxcdn.bootstrapcdn.com');
	BrowserPolicy.content.allowOriginForAll('fonts.gstatic.com');
	BrowserPolicy.content.allowMediaOrigin('chc_machina_musica.meteor.com');

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