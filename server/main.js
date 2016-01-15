//server/main.js

//routes as workaround for cors
//TEST
Router.route('/drums1.wav', function () {
  var req = this.request;
  var res = this.response;
  res.setHeader('access-control-allow-origin', '*');
  res.end('audio result from the server\n');
}, {where: 'server'});

Meteor.startup(function() {
	//use remove() to clear mongo for testing purposes
	//MusicMachine.remove({});

	// if (MusicMachine.find().count() === 0) {

	// //set initial start value to make sure dac button click would result in allplay initially
	// //also initializing all volume settings so there is something to display
	// MusicMachine.insert({slide: 50, start: 0, sliderVolume1: 1, sliderVolume2: 1, sliderVolume3: 1, sliderVolume4: 1, sliderVolume5: 1, sliderVolume6: 1, sliderVolume7: 1, sliderVolume8: 1, sliderSpeed1: 50, sliderSpeed2: 50, sliderSpeed3: 50, sliderSpeed4: 50, sliderSpeed5: 50, sliderSpeed6: 50, sliderSpeed7: 50, sliderSpeed8: 50});
	// }
});