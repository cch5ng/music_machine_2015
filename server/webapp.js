//server/webapp.js

//var connectHandler = WebApp.connectHandlers; // get meteor-core's connect-implementation

if (Meteor.isServer) {
	Meteor.startup(function () {

		//TEST security policies

		WebApp.connectHandlers.use(function(req, res, next) {
			res.setHeader("Access-Control-Allow-Origin", "*");
			//res.setHeader("access-control-allow-origin", "*.meteor.com");
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
	});
}





// // attach connect-style middleware for response header injection
// Meteor.startup(function () {
//   connectHandler.use(function (req, res, next) {
//     res.setHeader('Strict-Transport-Security', 'max-age=2592000; includeSubDomains'); // 2592000s / 30 days
//     return next();
//   })
// })