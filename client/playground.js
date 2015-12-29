//playground.js

acontext = new webkitAudioContext() || new AudioContext;  

//Now we can create an instance of our waveform generator and play it.
//only one Synth necessary
waveform = new Synth(acontext);

//new Maxim obj per track
maxim1 = new Maxim();
maxim2 = new Maxim();
maxim3 = new Maxim();
maxim4 = new Maxim();
maxim5 = new Maxim();
maxim6 = new Maxim();
maxim7 = new Maxim();
maxim8 = new Maxim();

//new player per Maxim obj
player1 = maxim1.loadFile("drums1.wav");
player1.loop;
player2 = maxim2.loadFile("bassline.wav");
player2.loop;
player3 = maxim3.loadFile("arp.wav");
player3.loop;
player4 = maxim4.loadFile("vibes.wav");
player4.loop;
player5 = maxim5.loadFile("snaredrum1.wav");
player5.loop;

playDrums = function(){
	player1.volume(1);
};

stopDrums = function(){
	player1.volume(0);
};

setDrumVolume = function(vol) {
	player1.volume(vol);
};

playBass = function(){
	player2.volume(1);
};

stopBass = function(){
	player2.volume(0);
};

setBassVolume = function(vol) {
	player2.volume(vol);
};

playArp = function(){
	player3.volume(1);
};

stopArp = function(){
	player3.volume(0);
};

setArpVolume = function(vol) {
	player3.volume(vol);
};

playVibes = function(){
	player4.volume(1);
};

stopVibes = function(){
	player4.volume(0);
};

setVibesVolume = function(vol) {
	player4.volume(vol);
};

playSnaredrum = function(){
	player5.volume(1);
};

stopSnaredrum = function(){
	player5.volume(0);
};

setSnaredrumVolume = function(vol) {
	player5.volume(vol);
};

playAll = function() {
	player1.play();
	player2.play();
	player3.play();
	player4.play();
	player5.play();
};

stopAll = function() {
	player1.stop();
	player2.stop();
	player3.stop();
	player4.stop();
	player5.stop();
};

setSpeed = function(speed) {
	player1.speed(speed);
	player2.speed(speed);
	player3.speed(speed);
	player4.speed(speed);
	player5.speed(speed);
};


