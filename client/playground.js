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

//TODO add functions for speed (new slider)
player2 = maxim2.loadFile("bassline.wav");
player2.loop;
player3 = maxim3.loadFile("arp.wav");
player3.loop;
player4 = maxim4.loadFile("vibes.wav");
player4.loop;
player5 = maxim5.loadFile("snaredrum1.wav");
player5.loop;
player6 = maxim6.loadFile("chords.wav");
player6.loop;
player7 = maxim7.loadFile("808drum.wav");
player7.loop;
player8 = maxim8.loadFile("cymbal1.wav");
player8.loop;

playDrums = function(){
	player1.volume(1);
};

stopDrums = function(){
	player1.volume(0);
};

setDrumVolume = function(vol) {
	player1.volume(vol);
};

setDrumSpeed = function(speed) {
	player1.speed(speed);
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

setBassSpeed = function(speed) {
	player2.speed(speed);
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

setArpSpeed = function(speed) {
	player3.speed(speed);
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

setVibesSpeed = function(speed) {
	player4.speed(speed);
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

setSnaredrumSpeed = function(speed) {
	player5.speed(speed);
};

playChords = function(){
	player6.volume(1);
};

stopChords = function(){
	player6.volume(0);
};

setChordsVolume = function(vol) {
	player6.volume(vol);
};

setChordsSpeed = function(speed) {
	player6.speed(speed);
};

playDrum2 = function(){
	player7.volume(1);
};

stopDrum2 = function(){
	player7.volume(0);
};

setDrum2Volume = function(vol) {
	player7.volume(vol);
};

setDrum2Speed = function(speed) {
	player7.speed(speed);
};

playCymbal = function(){
	player8.volume(1);
};

stopCymbal = function(){
	player8.volume(0);
};

setCymbalVolume = function(vol) {
	player8.volume(vol);
};

setCymbalSpeed = function(speed) {
	player8.speed(speed);
};

playAll = function() {
	player1.play();
	player2.play();
	player3.play();
	player4.play();
	player5.play();
	player6.play();
	player7.play();
	player8.play();
};

stopAll = function() {
	player1.stop();
	player2.stop();
	player3.stop();
	player4.stop();
	player5.stop();
	player6.stop();
	player7.stop();
	player8.stop();
};

// setSpeed = function(speed) {
// 	player1.speed(speed);
// 	player2.speed(speed);
// 	player3.speed(speed);
// 	player4.speed(speed);
// 	player5.speed(speed);
// };