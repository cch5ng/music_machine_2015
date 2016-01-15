//server/main.js


Meteor.startup(function() {
	//use remove() to clear mongo for testing purposes
	//MusicMachine.remove({});

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

	if (MusicMachine.find().count() === 0) {

	// //set initial start value to make sure dac button click would result in allplay initially
	// //also initializing all volume settings so there is something to display
		MusicMachine.insert({slide: 50, start: 0, sliderVolume1: 1, sliderVolume2: 1, sliderVolume3: 1, sliderVolume4: 1, sliderVolume5: 1, sliderVolume6: 1, sliderVolume7: 1, sliderVolume8: 1, sliderSpeed1: 50, sliderSpeed2: 50, sliderSpeed3: 50, sliderSpeed4: 50, sliderSpeed5: 50, sliderSpeed6: 50, sliderSpeed7: 50, sliderSpeed8: 50});
	}
});