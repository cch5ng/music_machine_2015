
//This code is for everyone. Could go in common.js
MusicMachine = new Mongo.Collection("musicMachine");


if (Meteor.isClient) {

  Meteor.startup(function () {

  });

  Template.navigation.helpers({

    "startdac": function () {
      var starter = MusicMachine.findOne();
      if (starter ) {
        if (starter.start==1) {
          playAll();
        } else if (starter.start === 0) {
          stopAll();
        }
      }
      return Session.get('startdac');
    },

      //each slider has a template helper function which gets the last set mongo value and displays it as text
    'sliderVal1':  function() {
      var slider = MusicMachine.findOne();
      if (slider) {
        setSpeed(slider.slide/50);
        if (Session.get('uiSlider')) {
          Session.set('uiSlider', slider.slide);
        }
      }

      return slider.slide;
    },//end sliderVal1
  }); //end navigation helpers

  Template.navigation.events({

     "click button.startButton": function () {
//TODO test
      console.log(Session.get('startdac'));
      var val = MusicMachine.findOne({});
      console.log('val: ' + val);

      if (val.start === 1) {
        Session.set('startdac', 0);
//reset start and all volume sliders
        MusicMachine.update({ _id: val._id }, {$set: {start: 0, sliderVolume1: 0, sliderVolume2: 0, sliderVolume3: 0, sliderVolume4: 0}});
//reset all volume slider displays
        $('#sliderVol1').slider('value', 0);
        $('#sliderVol2').slider('value', 0);
        $('#sliderVol3').slider('value', 0);
        $('#sliderVol4').slider('value', 0);
      } else if (val.start === 0) {
        Session.set('startdac', 1);
//reset start and all volume sliders
        MusicMachine.update({ _id: val._id }, {$set: {start: 1, sliderVolume1: 1, sliderVolume2: 1, sliderVolume3: 1, sliderVolume4: 1}});
//reset all volume slider displays
        $('#sliderVol1').slider('value', 1);
        $('#sliderVol2').slider('value', 1);
        $('#sliderVol3').slider('value', 1);
        $('#sliderVol4').slider('value', 1);
      }
    }

  }); //end navigation events

  Template.navigation.onRendered(function() {
    var player = MusicMachine.findOne();
    var handler = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {slide: ui.value}});
    }, 50, { leading: false });

    if (player) {
      console.log('slide from mongo: ', player.slide);
      Session.set('uiSlider', player.slide);
    }
    //global speed slider, initial render
    if (!Template.instance().$('#slider1').data('uiSlider')) {
      $("#slider1").slider({
        slide: handler,
        value: player.slide,
        min: 0,
        max: 100
      });
    } else {
      console.log('slider.slide: ' + player.slide);
      Template.instance().$('#slider1').slider('value', player.slide);
    }
  }); //end navigation onRender

  Template.playground.helpers({

    "drums": function () {
      var starter = MusicMachine.findOne();
      if (starter) {
        if (starter.drums == 1) {
          playDrums();
        } else if (starter.drums === 0) {
          stopDrums();
        }
      }
      return Session.get('drums');
    },

    "bass": function () {
      var starter = MusicMachine.findOne();
      if (starter) {
        if (starter.bassline==1) {
          playBass();
        } else if (starter.bassline === 0) {
          stopBass();
        }
      }
      return Session.get('bass');
    },

    "arp": function () {
      var starter = MusicMachine.findOne();
      if (starter) {
        if (starter.arp==1) {
          playArp();
        } else if (starter.arp === 0) {
          stopArp();
        }
      }
      return Session.get('arp');
    },

    "vibes": function () {
      var starter = MusicMachine.findOne();
      if (starter) {
        if (starter.vibes == 1) {
          playVibes();
        } else if (starter.vibes === 0) {
          stopVibes();
        }
      }
      return Session.get('vibes');
    },

  //don't forget the commas between each function
  //the last one doesn't have to have one!

    //for track1 volume slider
    'sliderVolume1':  function() {
      var slider = MusicMachine.findOne();
      if (slider) {
        setDrumVolume(slider.sliderVolume1);
        if (Session.get('sliderVolume1')) {
          Session.set('sliderVolume1', slider.sliderVolume1);
        }
      }

      return slider.sliderVolume1;
    }, //end sliderVolume1

    //for track2 volume slider
    'sliderVolume2': function() {
      var slider = MusicMachine.findOne();
      if (slider) {
        setBassVolume(slider.sliderVolume2);
        if (Session.get('sliderVolume2')) {
          Session.set('sliderVolume2', slider.sliderVolume2);
        }
      }

      return slider.sliderVolume2;
    }, //end sliderVolume2

    //for track3 volume slider
    'sliderVolume3': function() {
      var slider = MusicMachine.findOne();
      if (slider) {
        setArpVolume(slider.sliderVolume3);
        if (Session.get('sliderVolume3')) {
          Session.set('sliderVolume3', slider.sliderVolume3);
        }
      }

      return slider.sliderVolume3;
    }, //end sliderVolume3

    //for track4 volume slider
    'sliderVolume4': function() {
      var slider = MusicMachine.findOne();
      if (slider) {
        setVibesVolume(slider.sliderVolume4);
        if (Session.get('sliderVolume4')) {
          Session.set('sliderVolume4', slider.sliderVolume4);
        }
      }

      return slider.sliderVolume4;
    }//end sliderVolume4

  });//end playground helpers


  Template.playground.events({

     "click button.myButton1": function () {
      Session.set('drums', 1);
      var val = MusicMachine.findOne({});
//because of volume slider per track, the volume mongo field must be updated
      MusicMachine.update({ _id: val._id }, {$set: {drums: 1, sliderVolume1: 1}});
//just updating the slider view so the user is clear
      $('#sliderVol1').slider('value', 1);
    },
      "click button.myButton2": function () {
      Session.set('drums', 0);
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {drums: 0, sliderVolume1: 0}});
      $('#sliderVol1').slider('value', 0);
    },

      "click button.myButton3": function () {
      Session.set('bass', 1);
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {bassline: 1, sliderVolume2: 1}});
      $('#sliderVol2').slider('value', 1);
    },

      "click button.myButton4": function () {
      Session.set('bass', 0);
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {bassline: 0, sliderVolume2: 0}});
      $('#sliderVol2').slider('value', 0);
    },

      "click button.myButton5": function () {
      Session.set('arp', 1);
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {arp: 1, sliderVolume3: 1}});
      $('#sliderVol3').slider('value', 1);
    },

      "click button.myButton6": function () {
      Session.set('arp', 0);
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {arp: 0, sliderVolume3: 0}});
      $('#sliderVol3').slider('value', 1);
    },

      "click button.btn4On": function () {
      Session.set('vibes', 1);
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {vibes: 1, sliderVolume4: 1}});
      $('#sliderVol4').slider('value', 1);
    },

      "click button.btn4Off": function () {
      Session.set('vibes', 0);
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {vibes: 0, sliderVolume4: 0}});
      $('#sliderVol4').slider('value', 1);
    }//,

  });

  Template.playground.onRendered(function() {
    $('h2').hide();
    var player = MusicMachine.findOne();

    var handlerVol1 = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {sliderVolume1: ui.value}});
        Template.instance().$('#sliderVol1').data('uiSlider').value(player.sliderVolume1);
    }, 1, { leading: false });

    var handlerVol2 = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {sliderVolume2: ui.value}});
        Template.instance().$('#sliderVol2').data('uiSlider').value(player.sliderVolume2);
    }, 1, { leading: false });

    var handlerVol3 = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {sliderVolume3: ui.value}});
        Template.instance().$('#sliderVol3').data('uiSlider').value(player.sliderVolume3);
    }, 1, { leading: false });

    var handlerVol4 = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {sliderVolume4: ui.value}});
        Template.instance().$('#sliderVol4').data('uiSlider').value(player.sliderVolume4);
    }, 1, { leading: false });

    if (player) {
      console.log('slide from mongo: ', player.slide);
      Session.set('sliderVolume1', player.sliderVolume1);
      Session.set('sliderVolume2', player.sliderVolume2);
      Session.set('sliderVolume3', player.sliderVolume3);
      Session.set('sliderVolume4', player.sliderVolume4);
    }

    //track 1 volume slider, initial render
    if (!Template.instance().$('#sliderVol1').data('uiSlider')) {
      $("#sliderVol1").slider({
        slide: handlerVol1,
        value: player.sliderVolume1,
        min: 0,
        max: 10
      });
    } else {
      console.log('vol1 slide value: ' + player.sliderVolume1);
      Template.instance().$('#sliderVol1').slider('value', player.sliderVolume1);
    }

    //track 2 volume slider, initial render
    if (!Template.instance().$('#sliderVol2').data('uiSlider')) {
      $("#sliderVol2").slider({
        slide: handlerVol2,
        value: player.sliderVolume2,
        min: 0,
        max: 10
      });
    } else {
      console.log('vol2 slide value: ' + player.sliderVolume2);
      Template.instance().$('#sliderVol2').slide('value', player.sliderVolume2);
    }

    //track 3 volume slider, initial render
    if (!Template.instance().$('#sliderVol3').data('uiSlider')) {
      $("#sliderVol3").slider({
        slide: handlerVol3,
        value: player.sliderVolume3,
        min: 0,
        max: 10
      });
    } else {
      console.log('vol3 slide value: ' + player.sliderVolume3);
      Template.instance().$('#sliderVol3').slide('value', player.sliderVolume3);
    }

    //track 4 volume slider, initial render
    if (!Template.instance().$('#sliderVol4').data('uiSlider')) {
      $("#sliderVol4").slider({
        slide: handlerVol4,
        value: player.sliderVolume4,
        min: 0,
        max: 10
      });
    } else {
      console.log('vol4 slide value: ' + player.sliderVolume4);
      Template.instance().$('#sliderVol4').slide('value', player.sliderVolume4);
    }

  }); //end Template.onRendered

  console.log($('.sequencer-display').length);

  counter = 0;
  displayInterval = 200;

  function calculateCount(count) {
    var result;
    //adding 1 so the 8th dot will change colors
    result = ((count) % 8) + 1;
    return result;
  }

  function toggle(count) {
    $('div i:eq(' + calculateCount(counter) +     ')').toggleClass('pink');
  }

  setInterval(function() {
    if (Session.get('startdac') === 1) {
      toggle(counter);
      //console.log(calculateCount(counter));
      counter++;
    }
  }, displayInterval);

} //end isClient

if (Meteor.isServer) {
//use remove() to clear mongo for testing purposes
//      MusicMachine.remove({});
      if (MusicMachine.find().count() === 0) {
//set initial start value to make sure dac button click would result in allplay initially
//also initializing all volume settings so there is something to display
      MusicMachine.insert({slide: 50, start: 0, sliderVolume1: 1, sliderVolume2: 1, sliderVolume3: 1, sliderVolume4: 1});
    }

}