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