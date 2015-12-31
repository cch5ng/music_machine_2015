
//This code is for everyone. Could go in common.js
MusicMachine = new Mongo.Collection("musicMachine");


if (Meteor.isClient) {

  Meteor.startup(function () {
    //google web font
    WebFontConfig = {
      google: { families: [ 'Megrim::latin' ] }
    };
    (function() {
      var wf = document.createElement('script');
      wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
      wf.type = 'text/javascript';
      wf.async = 'true';
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(wf, s);
    })();
  }); //end startup

  //global helper functions
  // var fixSliderVal = function(value) {
  //   var fixedVal;
  //   fixedVal = Math.round(100 - value);

  //   return fixedVal;
  // };

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
    }
  }); //end navigation helpers

  Template.navigation.events({

    "click button.startButton": function () {
      var val = MusicMachine.findOne({});

      if (val.start === 1) {
        Session.set('startdac', 0);
//reset start and all volume sliders
        MusicMachine.update({ _id: val._id }, {$set: {start: 0, sliderVolume1: 0, sliderVolume2: 0, sliderVolume3: 0, sliderVolume4: 0, sliderVolume5: 0, sliderVolume6: 0, sliderVolume7: 0, sliderVolume8: 0}});
//reset all volume slider displays
        $('#sliderVol1').slider('value', 0);
        $('#sliderVol2').slider('value', 0);
        $('#sliderVol3').slider('value', 0);
        $('#sliderVol4').slider('value', 0);
        $('#sliderVol5').slider('value', 0);
        $('#sliderVol6').slider('value', 0);
        $('#sliderVol7').slider('value', 0);
        $('#sliderVol8').slider('value', 0);
      } else if (val.start === 0) {
        Session.set('startdac', 1);
//reset start and all volume sliders
        MusicMachine.update({ _id: val._id }, {$set: {start: 1, sliderVolume1: 1, sliderVolume2: 1, sliderVolume3: 1, sliderVolume4: 1, sliderVolume5: 1, sliderVolume6: 1, sliderVolume7: 1, sliderVolume8: 1}});
//reset all volume slider displays
        $('#sliderVol1').slider('value', 1);
        $('#sliderVol2').slider('value', 1);
        $('#sliderVol3').slider('value', 1);
        $('#sliderVol4').slider('value', 1);
        $('#sliderVol5').slider('value', 1);
        $('#sliderVol6').slider('value', 1);
        $('#sliderVol7').slider('value', 1);
        $('#sliderVol8').slider('value', 1);
      }
    }

  }); //end navigation events

  Template.navigation.onRendered(function() {
    // var player = MusicMachine.findOne();
    // var handler = _.throttle(function(event, ui) {
    //     var val = MusicMachine.findOne({});
    //     MusicMachine.update({ _id: val._id }, {$set: {slide: ui.value}});
    // }, 50, { leading: false });

    // if (player) {
    //   console.log('slide from mongo: ', player.slide);
    //   Session.set('uiSlider', player.slide);
    // }

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

    "snaredrum": function () {
      var starter = MusicMachine.findOne();
      if (starter) {
        if (starter.snaredrum == 1) {
          playSnaredrum();
        } else if (starter.snaredrum === 0) {
          stopSnaredrum();
        }
      }
      return Session.get('snaredrum');
    },

    "chords": function () {
      var starter = MusicMachine.findOne();
      if (starter) {
        if (starter.chords == 1) {
          playChords();
        } else if (starter.chords === 0) {
          stopChords();
        }
      }
      return Session.get('chords');
    },

    "drum2": function () {
      var starter = MusicMachine.findOne();
      if (starter) {
        if (starter.drum2 == 1) {
          playDrum2();
        } else if (starter.drum2 === 0) {
          stopDrum2();
        }
      }
      return Session.get('drum2');
    },

    "cymbal": function () {
      var starter = MusicMachine.findOne();
      if (starter) {
        if (starter.cymbal == 1) {
          playCymbal();
        } else if (starter.cymbal === 0) {
          stopCymbal();
        }
      }
      return Session.get('cymbal');
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

    //for track1 speed slider
    'sliderSpeed1':  function() {
      var slider = MusicMachine.findOne();
      if (slider) {
        setDrumSpeed(slider.sliderSpeed1/50);
        if (Session.get('sliderSpeed1')) {
          Session.set('sliderSpeed1', slider.sliderSpeed1);
        }
      }

      return slider.sliderSpeed1;
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

    //for track2 speed slider
    'sliderSpeed2':  function() {
      var slider = MusicMachine.findOne();
      if (slider) {
        setBassSpeed(slider.sliderSpeed2/50);
        if (Session.get('sliderSpeed2')) {
          Session.set('sliderSpeed2', slider.sliderSpeed2);
        }
      }

      return slider.sliderSpeed2;
    }, //end sliderSpeed2

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

    //for track3 speed slider
    'sliderSpeed3':  function() {
      var slider = MusicMachine.findOne();
      if (slider) {
        setArpSpeed(slider.sliderSpeed3/50);
        if (Session.get('sliderSpeed3')) {
          Session.set('sliderSpeed3', slider.sliderSpeed3);
        }
      }

      return slider.sliderSpeed3;
    }, //end sliderSpeed3


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
    }, //end sliderVolume4

    //for track4 speed slider
    'sliderSpeed4':  function() {
      var slider = MusicMachine.findOne();
      if (slider) {
        setVibesSpeed(slider.sliderSpeed4/50);
        if (Session.get('sliderSpeed4')) {
          Session.set('sliderSpeed4', slider.sliderSpeed4);
        }
      }

      return slider.sliderSpeed4;
    }, //end sliderSpeed4

    //for track5 volume slider
    'sliderVolume5': function() {
      var slider = MusicMachine.findOne();
      if (slider) {
        setSnaredrumVolume(slider.sliderVolume5);
        if (Session.get('sliderVolume5')) {
          Session.set('sliderVolume5', slider.sliderVolume5);
        }
      }

      return slider.sliderVolume5;
    }, //end sliderVolume5

    //for track5 speed slider
    'sliderSpeed5':  function() {
      var slider = MusicMachine.findOne();
      if (slider) {
        setSnaredrumSpeed(slider.sliderSpeed5/50);
        if (Session.get('sliderSpeed5')) {
          Session.set('sliderSpeed5', slider.sliderSpeed5);
        }
      }

      return slider.sliderSpeed5;
    }, //end sliderSpeed5

    //for track6 volume slider
    'sliderVolume6': function() {
      var slider = MusicMachine.findOne();
      if (slider) {
        setChordsVolume(slider.sliderVolume6);
        if (Session.get('sliderVolume6')) {
          Session.set('sliderVolume6', slider.sliderVolume6);
        }
      }

      return slider.sliderVolume6;
    }, //end sliderVolume6

    //for track6 speed slider
    'sliderSpeed6':  function() {
      var slider = MusicMachine.findOne();
      if (slider) {
        setChordsSpeed(slider.sliderSpeed6/50);
        if (Session.get('sliderSpeed6')) {
          Session.set('sliderSpeed6', slider.sliderSpeed6);
        }
      }

      return slider.sliderSpeed6;
    }, //end sliderSpeed6

    //for track7 volume slider
    'sliderVolume7': function() {
      var slider = MusicMachine.findOne();
      if (slider) {
        setDrum2Volume(slider.sliderVolume7);
        if (Session.get('sliderVolume7')) {
          Session.set('sliderVolume7', slider.sliderVolume7);
        }
      }

      return slider.sliderVolume7;
    }, //end sliderVolume7

    //for track7 speed slider
    'sliderSpeed7':  function() {
      var slider = MusicMachine.findOne();
      if (slider) {
        setDrum2Speed(slider.sliderSpeed7/50);
        if (Session.get('sliderSpeed7')) {
          Session.set('sliderSpeed7', slider.sliderSpeed7);
        }
      }

      return slider.sliderSpeed7;
    }, //end sliderSpeed7

    //for track8 volume slider
    'sliderVolume8': function() {
      var slider = MusicMachine.findOne();
      if (slider) {
        setCymbalVolume(slider.sliderVolume8);
        if (Session.get('sliderVolume8')) {
          Session.set('sliderVolume8', slider.sliderVolume8);
        }
      }

      return slider.sliderVolume8;
    }, //end sliderVolume8

    //for track8 speed slider
    'sliderSpeed8':  function() {
      var slider = MusicMachine.findOne();
      if (slider) {
        setCymbalSpeed(slider.sliderSpeed8/15);
        if (Session.get('sliderSpeed8')) {
          Session.set('sliderSpeed8', slider.sliderSpeed8);
        }
      }

      return slider.sliderSpeed8;
    } //end sliderSpeed8

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
      $('#sliderVol3').slider('value', 0);
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
      $('#sliderVol4').slider('value', 0);
    },

      "click button.btn5On": function () {
      Session.set('snaredrum', 1);
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {snaredrum: 1, sliderVolume5: 1}});
      $('#sliderVol5').slider('value', 1);
    },

      "click button.btn5Off": function () {
      Session.set('vibes', 0);
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {snaredrum: 0, sliderVolume5: 0}});
      $('#sliderVol5').slider('value', 0);
    },

      "click button.btn6On": function () {
      Session.set('chords', 1);
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {chords: 1, sliderVolume6: 1}});
      $('#sliderVol6').slider('value', 1);
    },

      "click button.btn6Off": function () {
      Session.set('chords', 0);
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {chords: 0, sliderVolume6: 0}});
      $('#sliderVol6').slider('value', 0);
    },

      "click button.btn7On": function () {
      Session.set('drum2', 1);
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {drum2: 1, sliderVolume7: 1}});
      $('#sliderVol7').slider('value', 1);
    },

      "click button.btn7Off": function () {
      Session.set('drum2', 0);
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {drum2: 0, sliderVolume7: 0}});
      $('#sliderVol7').slider('value', 0);
    },

      "click button.btn8On": function () {
      Session.set('cymbal', 1);
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {cymbal: 1, sliderVolume8: 1}});
      $('#sliderVol8').slider('value', 1);
    },

      "click button.btn8Off": function () {
      Session.set('cymbal', 0);
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {cymbal: 0, sliderVolume8: 0}});
      $('#sliderVol8').slider('value', 0);
    }//,


  });

  Template.playground.onRendered(function() {
    $('h2').hide();

//TEST nouislider
    var testDb = MusicMachine.findOne();
    var startSpeed1,
        startSpeed2,
        startSpeed3,
        startSpeed4,
        startSpeed5,
        startSpeed6,
        startSpeed7,
        startSpeed8;

    //if (testDb) {
      if (testDb.sliderSpeed1) {
        startSpeed1 = testDb.sliderSpeed1;
      } else {
        startSpeed1 = 50;
      }

      if (testDb.sliderSpeed1) {
        startSpeed2 = testDb.sliderSpeed2;
      } else {
        startSpeed2 = 50;
      }

      if (testDb.sliderSpeed1) {
        startSpeed3 = testDb.sliderSpeed3;
      } else {
        startSpeed3 = 50;
      }

      if (testDb.sliderSpeed1) {
        startSpeed4 = testDb.sliderSpeed4;
      } else {
        startSpeed4 = 50;
      }

      if (testDb.sliderSpeed5) {
        startSpeed5 = testDb.sliderSpeed5;
      } else {
        startSpeed1 = 50;
      }

      if (testDb.sliderSpeed1) {
        startSpeed6 = testDb.sliderSpeed6;
      } else {
        startSpeed6 = 50;
      }

      if (testDb.sliderSpeed1) {
        startSpeed7 = testDb.sliderSpeed7;
      } else {
        startSpeed7 = 50;
      }

      if (testDb.sliderSpeed8) {
        startSpeed8 = testDb.sliderSpeed8;
      } else {
        startSpeed8 = 50;
      }
    //}

    var slider = MusicMachine.findOne();

//track 1 speed slider
    this.$("#nouiSpeed1").noUiSlider({
      start: startSpeed1,
      orientation: 'vertical',
      direction: 'rtl',
      range: {
        'min': 0,
        'max': 100
      }
    }).on('slide', function (ev, val) {
      // set real values on 'slide' event
      var fixedVal = Math.round(val);
      setDrumSpeed(fixedVal/50);
      Session.set('sliderSpeed1', fixedVal);
      MusicMachine.update(slider._id, {$set: {sliderSpeed1: fixedVal}});
    }).on('change', function (ev, val) {
      // round off values on 'change' event
      var fixedVal2 = Math.round(val);
      setDrumSpeed(fixedVal2/50);
      Session.set('sliderSpeed1', fixedVal2);
      MusicMachine.update(slider._id, {$set: {sliderSpeed1: fixedVal2}});
    });

//track 2 speed slider
    this.$("#nouiSpeed2").noUiSlider({
      start: startSpeed2,
      orientation: 'vertical',
      direction: 'rtl',
      range: {
        'min': 0,
        'max': 100
      }
    }).on('slide', function (ev, val) {
      // set real values on 'slide' event
      var fixedVal = Math.round(val);
      setBassSpeed(fixedVal/50);
      Session.set('sliderSpeed2', fixedVal);
      MusicMachine.update(slider._id, {$set: {sliderSpeed2: fixedVal}});
    }).on('change', function (ev, val) {
      // round off values on 'change' event
      var fixedVal2 = Math.round(val);
      setBassSpeed(fixedVal2/50);
      Session.set('sliderSpeed2', fixedVal2);
      MusicMachine.update(slider._id, {$set: {sliderSpeed2: fixedVal2}});
    });

//track 3 speed slider
    this.$("#nouiSpeed3").noUiSlider({
      start: startSpeed3,
      orientation: 'vertical',
      direction: 'rtl',
      range: {
        'min': 0,
        'max': 100
      }
    }).on('slide', function (ev, val) {
      // set real values on 'slide' event
      var fixedVal = Math.round(val);
      setArpSpeed(fixedVal/50);
      Session.set('sliderSpeed3', fixedVal);
      MusicMachine.update(slider._id, {$set: {sliderSpeed3: fixedVal}});
    }).on('change', function (ev, val) {
      // round off values on 'change' event
      var fixedVal2 = Math.round(val);
      setArpSpeed(fixedVal2/50);
      Session.set('sliderSpeed3', fixedVal2);
      MusicMachine.update(slider._id, {$set: {sliderSpeed3: fixedVal2}});
    });

//END TEST

    // var player = MusicMachine.findOne();

    // var handlerVol1 = _.throttle(function(event, ui) {
    //     var val = MusicMachine.findOne({});
    //     MusicMachine.update({ _id: val._id }, {$set: {sliderVolume1: ui.value}});
    //     Template.instance().$('#sliderVol1').data('uiSlider').value(player.sliderVolume1);
    // }, 1, { leading: false });

    // var handlerSpeed1 = _.throttle(function(event, ui) {
    //     var val = MusicMachine.findOne({});
    //     MusicMachine.update({ _id: val._id }, {$set: {sliderSpeed1: ui.value}});
    //     Template.instance().$('#sliderSpeed1').data('uiSlider').value(player.sliderSpeed1);
    // }, 50, { leading: false });

    // var handlerVol2 = _.throttle(function(event, ui) {
    //     var val = MusicMachine.findOne({});
    //     MusicMachine.update({ _id: val._id }, {$set: {sliderVolume2: ui.value}});
    //     Template.instance().$('#sliderVol2').data('uiSlider').value(player.sliderVolume2);
    // }, 1, { leading: false });

    // var handlerSpeed2 = _.throttle(function(event, ui) {
    //     var val = MusicMachine.findOne({});
    //     MusicMachine.update({ _id: val._id }, {$set: {sliderSpeed2: ui.value}});
    //     Template.instance().$('#sliderSpeed2').data('uiSlider').value(player.sliderSpeed2);
    // }, 50, { leading: false });

    // var handlerVol3 = _.throttle(function(event, ui) {
    //     var val = MusicMachine.findOne({});
    //     MusicMachine.update({ _id: val._id }, {$set: {sliderVolume3: ui.value}});
    //     Template.instance().$('#sliderVol3').data('uiSlider').value(player.sliderVolume3);
    // }, 1, { leading: false });

    // var handlerSpeed3 = _.throttle(function(event, ui) {
    //     var val = MusicMachine.findOne({});
    //     MusicMachine.update({ _id: val._id }, {$set: {sliderSpeed3: ui.value}});
    //     Template.instance().$('#sliderSpeed3').data('uiSlider').value(player.sliderSpeed3);
    // }, 50, { leading: false });

//     var handlerVol4 = _.throttle(function(event, ui) {
//         var val = MusicMachine.findOne({});
//         MusicMachine.update({ _id: val._id }, {$set: {sliderVolume4: ui.value}});
//         Template.instance().$('#sliderVol4').data('uiSlider').value(player.sliderVolume4);
//     }, 1, { leading: false });

//     var handlerSpeed4 = _.throttle(function(event, ui) {
//         var val = MusicMachine.findOne({});
//         MusicMachine.update({ _id: val._id }, {$set: {sliderSpeed4: ui.value}});
//         Template.instance().$('#sliderSpeed4').data('uiSlider').value(player.sliderSpeed4);
//     }, 50, { leading: false });

//     var handlerVol5 = _.throttle(function(event, ui) {
//         var val = MusicMachine.findOne({});
//         MusicMachine.update({ _id: val._id }, {$set: {sliderVolume5: ui.value}});
//         Template.instance().$('#sliderVol5').data('uiSlider').value(player.sliderVolume5);
//     }, 1, { leading: false });

//     var handlerSpeed5 = _.throttle(function(event, ui) {
//         var val = MusicMachine.findOne({});
//         MusicMachine.update({ _id: val._id }, {$set: {sliderSpeed5: ui.value}});
//         Template.instance().$('#sliderSpeed5').data('uiSlider').value(player.sliderSpeed5);
//     }, 50, { leading: false });

//     var handlerVol6 = _.throttle(function(event, ui) {
//         var val = MusicMachine.findOne({});
//         MusicMachine.update({ _id: val._id }, {$set: {sliderVolume6: ui.value}});
//         Template.instance().$('#sliderVol6').data('uiSlider').value(player.sliderVolume6);
//     }, 1, { leading: false });

//     var handlerSpeed6 = _.throttle(function(event, ui) {
//         var val = MusicMachine.findOne({});
//         MusicMachine.update({ _id: val._id }, {$set: {sliderSpeed6: ui.value}});
//         Template.instance().$('#sliderSpeed6').data('uiSlider').value(player.sliderSpeed6);
//     }, 50, { leading: false });

//     var handlerVol7 = _.throttle(function(event, ui) {
//         var val = MusicMachine.findOne({});
//         MusicMachine.update({ _id: val._id }, {$set: {sliderVolume7: ui.value}});
// //Error when moving slider
//         Template.instance().$('#sliderVol7').data('uiSlider').value(player.sliderVolume7);
//     }, 1, { leading: false });

//     var handlerSpeed7 = _.throttle(function(event, ui) {
//         var val = MusicMachine.findOne({});
//         MusicMachine.update({ _id: val._id }, {$set: {sliderSpeed7: ui.value}});
//         Template.instance().$('#sliderSpeed7').data('uiSlider').value(player.sliderSpeed7);
//     }, 50, { leading: false });

//     var handlerVol8 = _.throttle(function(event, ui) {
//         var val = MusicMachine.findOne({});
//         MusicMachine.update({ _id: val._id }, {$set: {sliderVolume8: ui.value}});
// //Error when moving slider
//         Template.instance().$('#sliderVol8').data('uiSlider').value(player.sliderVolume8);
//     }, 1, { leading: false });

//     var handlerSpeed8 = _.throttle(function(event, ui) {
//         var val = MusicMachine.findOne({});
//         MusicMachine.update({ _id: val._id }, {$set: {sliderSpeed8: ui.value}});
//         Template.instance().$('#sliderSpeed8').data('uiSlider').value(player.sliderSpeed8);
//     }, 50, { leading: false });

//     if (player) {
//       console.log('slide from mongo: ', player.slide);
//       Session.set('sliderVolume1', player.sliderVolume1);
//       //Session.set('sliderSpeed1', player.sliderSpeed1);
//       Session.set('sliderVolume2', player.sliderVolume2);
//       //Session.set('sliderSpeed2', player.sliderSpeed2);
//       Session.set('sliderVolume3', player.sliderVolume3);
//       // Session.set('sliderSpeed3', player.sliderSpeed3);
//       Session.set('sliderVolume4', player.sliderVolume4);
//       Session.set('sliderSpeed4', player.sliderSpeed4);
//       Session.set('sliderVolume5', player.sliderVolume5);
//       Session.set('sliderSpeed5', player.sliderSpeed5);
//       Session.set('sliderVolume6', player.sliderVolume6);
//       Session.set('sliderSpeed6', player.sliderSpeed6);
//       Session.set('sliderVolume7', player.sliderVolume7);
//       Session.set('sliderSpeed7', player.sliderSpeed7);
//       Session.set('sliderVolume8', player.sliderVolume8);
//       Session.set('sliderSpeed8', player.sliderSpeed8);
//     }

//     //track 1 volume slider, initial render
//     if (!Template.instance().$('#sliderVol1').data('uiSlider')) {
//       $("#sliderVol1").slider({
//         slide: handlerVol1,
//         value: player.sliderVolume1,
//         min: 0,
//         max: 10,
//         orientation: 'vertical'
//       });
//     } else {
//       console.log('vol1 slide value: ' + player.sliderVolume1);
//       Template.instance().$('#sliderVol1').slider('value', player.sliderVolume1);
//     }

    //track 1 speed slider, initial render
    // if (!Template.instance().$('#sliderSpeed1').data('uiSlider')) {
    //   $("#sliderSpeed1").slider({
    //     slide: handlerSpeed1,
    //     value: player.sliderSpeed1,
    //     min: 0,
    //     max: 100,
    //     orientation: 'vertical'
    //   });
    // } else {
    //   console.log('speed1 slide value: ' + player.sliderSpeed1);
    //   Template.instance().$('#sliderSpeed1').slider('value', player.sliderSpeed1);
    // }

    // //track 2 volume slider, initial render
    // if (!Template.instance().$('#sliderVol2').data('uiSlider')) {
    //   $("#sliderVol2").slider({
    //     slide: handlerVol2,
    //     value: player.sliderVolume2,
    //     min: 0,
    //     max: 10,
    //     orientation: 'vertical'
    //   });
    // } else {
    //   console.log('vol2 slide value: ' + player.sliderVolume2);
    //   Template.instance().$('#sliderVol2').slide('value', player.sliderVolume2);
    // }

    //track 2 speed slider, initial render
    // if (!Template.instance().$('#sliderSpeed2').data('uiSlider')) {
    //   $("#sliderSpeed2").slider({
    //     slide: handlerSpeed2,
    //     value: player.sliderSpeed2,
    //     min: 0,
    //     max: 100,
    //     orientation: 'vertical'
    //   });
    // } else {
    //   console.log('speed2 slide value: ' + player.sliderSpeed2);
    //   Template.instance().$('#sliderSpeed2').slider('value', player.sliderSpeed2);
    // }

    // //track 3 volume slider, initial render
    // if (!Template.instance().$('#sliderVol3').data('uiSlider')) {
    //   $("#sliderVol3").slider({
    //     slide: handlerVol3,
    //     value: player.sliderVolume3,
    //     min: 0,
    //     max: 10,
    //     orientation: 'vertical'
    //   });
    // } else {
    //   console.log('vol3 slide value: ' + player.sliderVolume3);
    //   Template.instance().$('#sliderVol3').slide('value', player.sliderVolume3);
    // }

    //track 3 speed slider, initial render
    // if (!Template.instance().$('#sliderSpeed3').data('uiSlider')) {
    //   $("#sliderSpeed3").slider({
    //     slide: handlerSpeed3,
    //     value: player.sliderSpeed3,
    //     min: 0,
    //     max: 100,
    //     orientation: 'vertical'
    //   });
    // } else {
    //   console.log('speed3 slide value: ' + player.sliderSpeed3);
    //   Template.instance().$('#sliderSpeed3').slider('value', player.sliderSpeed3);
    // }

    // //track 4 volume slider, initial render
    // if (!Template.instance().$('#sliderVol4').data('uiSlider')) {
    //   $("#sliderVol4").slider({
    //     slide: handlerVol4,
    //     value: player.sliderVolume4,
    //     min: 0,
    //     max: 10,
    //     orientation: 'vertical'
    //   });
    // } else {
    //   console.log('vol4 slide value: ' + player.sliderVolume4);
    //   Template.instance().$('#sliderVol4').slide('value', player.sliderVolume4);
    // }

    // //track 4 speed slider, initial render
    // if (!Template.instance().$('#sliderSpeed4').data('uiSlider')) {
    //   $("#sliderSpeed4").slider({
    //     slide: handlerSpeed4,
    //     value: player.sliderSpeed4,
    //     min: 0,
    //     max: 100,
    //     orientation: 'vertical'
    //   });
    // } else {
    //   console.log('speed4 slide value: ' + player.sliderSpeed4);
    //   Template.instance().$('#sliderSpeed4').slider('value', player.sliderSpeed4);
    // }

    // //track 5 volume slider, initial render
    // if (!Template.instance().$('#sliderVol5').data('uiSlider')) {
    //   $("#sliderVol5").slider({
    //     slide: handlerVol5,
    //     value: player.sliderVolume5,
    //     min: 0,
    //     max: 10,
    //     orientation: 'vertical'
    //   });
    // } else {
    //   console.log('vol5 slide value: ' + player.sliderVolume5);
    //   Template.instance().$('#sliderVol5').slide('value', player.sliderVolume5);
    // }

    // //track 5 speed slider, initial render
    // if (!Template.instance().$('#sliderSpeed5').data('uiSlider')) {
    //   $("#sliderSpeed5").slider({
    //     slide: handlerSpeed5,
    //     value: player.sliderSpeed5,
    //     min: 0,
    //     max: 100,
    //     orientation: 'vertical'
    //   });
    // } else {
    //   console.log('speed5 slide value: ' + player.sliderSpeed5);
    //   Template.instance().$('#sliderSpeed5').slider('value', player.sliderSpeed5);
    // }

    // //track 6 volume slider, initial render
    // if (!Template.instance().$('#sliderVol6').data('uiSlider')) {
    //   $("#sliderVol6").slider({
    //     slide: handlerVol6,
    //     value: player.sliderVolume6,
    //     min: 0,
    //     max: 10,
    //     orientation: 'vertical'
    //   });
    // } else {
    //   console.log('vol6 slide value: ' + player.sliderVolume6);
    //   Template.instance().$('#sliderVol6').slide('value', player.sliderVolume6);
    // }

    // //track 6 speed slider, initial render
    // if (!Template.instance().$('#sliderSpeed6').data('uiSlider')) {
    //   $("#sliderSpeed6").slider({
    //     slide: handlerSpeed6,
    //     value: player.sliderSpeed6,
    //     min: 0,
    //     max: 100,
    //     orientation: 'vertical'
    //   });
    // } else {
    //   console.log('speed6 slide value: ' + player.sliderSpeed6);
    //   Template.instance().$('#sliderSpeed6').slider('value', player.sliderSpeed6);
    // }

    // //track 7 volume slider, initial render
    // if (!Template.instance().$('#sliderVol7').data('uiSlider')) {
    //   $("#sliderVol7").slider({
    //     slide: handlerVol7,
    //     value: player.sliderVolume7,
    //     min: 0,
    //     max: 10,
    //     orientation: 'vertical'
    //   });
    // } else {
    //   console.log('vol7 slide value: ' + player.sliderVolume7);
    //   Template.instance().$('#sliderVol7').slide('value', player.sliderVolume7);
    // }

    // //track 7 speed slider, initial render
    // if (!Template.instance().$('#sliderSpeed7').data('uiSlider')) {
    //   $("#sliderSpeed7").slider({
    //     slide: handlerSpeed7,
    //     value: player.sliderSpeed7,
    //     min: 0,
    //     max: 100,
    //     orientation: 'vertical'
    //   });
    // } else {
    //   console.log('speed7 slide value: ' + player.sliderSpeed7);
    //   Template.instance().$('#sliderSpeed7').slider('value', player.sliderSpeed7);
    // }

    // //track 8 volume slider, initial render
    // if (!Template.instance().$('#sliderVol8').data('uiSlider')) {
    //   $("#sliderVol8").slider({
    //     slide: handlerVol8,
    //     value: player.sliderVolume8,
    //     min: 0,
    //     max: 10,
    //     orientation: 'vertical'
    //   });
    // } else {
    //   console.log('vol8 slide value: ' + player.sliderVolume8);
    //   Template.instance().$('#sliderVol8').slide('value', player.sliderVolume8);
    // }

    // //track 8 speed slider, initial render
    // if (!Template.instance().$('#sliderSpeed8').data('uiSlider')) {
    //   $("#sliderSpeed8").slider({
    //     slide: handlerSpeed8,
    //     value: player.sliderSpeed8,
    //     min: 0,
    //     max: 100,
    //     orientation: 'vertical'
    //   });
    // } else {
    //   console.log('speed8 slide value: ' + player.sliderSpeed8);
    //   Template.instance().$('#sliderSpeed8').slider('value', player.sliderSpeed8);
    // }

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

  Template.playground.created = function() {
    Tracker.autorun(function() {
      console.log('sliderVolume1: ' + MusicMachine.find().fetch());
    });
  };

} //end isClient

if (Meteor.isServer) {
//use remove() to clear mongo for testing purposes
  //MusicMachine.remove({});
  if (MusicMachine.find().count() === 0) {
//set initial start value to make sure dac button click would result in allplay initially
//also initializing all volume settings so there is something to display
    MusicMachine.insert({slide: 50, start: 0, sliderVolume1: 1, sliderVolume2: 1, sliderVolume3: 1, sliderVolume4: 1, sliderVolume5: 1, sliderVolume6: 1, sliderVolume7: 1, sliderVolume8: 1, sliderSpeed1: 50, sliderSpeed2: 50, sliderSpeed3: 50, sliderSpeed4: 50, sliderSpeed5: 50, sliderSpeed6: 50, sliderSpeed7: 50, sliderSpeed8: 50});
  }
}

