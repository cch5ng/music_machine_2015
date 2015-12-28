
//This code is for everyone. Could go in common.js
MusicMachine = new Mongo.Collection("musicMachine");


if (Meteor.isClient) {

  Meteor.startup(function () {

  });

  Template.playground.helpers({

    "startdac": function () {
      var starter = MusicMachine.findOne();
      if (starter ) {
        if (starter.start==1) {
          playAll();
        } else if (starter.start == 0) {
          stopAll();
        }
      }
      return Session.get('startdac');
    },

    "drums": function () {
      var starter = MusicMachine.findOne();
      if (starter) {
        if (starter.drums==1) {
          playDrums();
        } else if (starter.drums == 0) {
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
        } else if (starter.bassline==0) {
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

  //don't forget the commas between each function
  //the last one doesn't have to have one!

    'sliderVal1':  function() {
      var slider = MusicMachine.findOne();
      if (slider) {
        setSpeed(slider.slide/50);
        if (Session.get('uiSlider')) {
          Session.set('uiSlider', slider.slide);
        }
      }

//      if (slider && Session.get('uiSlider')) {
          //Template.playground.onRendered(function() {
          //associating {uiSlider: slider.slide} with this slider instance
          
          //Template.instance().$('#slider1').value(slider.slide);
          //var value = slider.slide;
          //Template.instance().$('#slider1').slider('option', 'value', slider.slide);
          //Template.instance().$('#slider1').data('uiSlider').value(slider.slide);
          //});
//      }
      return slider.slide;
    },//end sliderVal1

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

      // if (slide)
      //   Template.instance().$('#sliderVol1').data('uiSlider').value(slider.sliderVolume1);
      //   return slider.sliderVolume1;
      // }
    }//end sliderVolume1

  });//end playground helpers


  Template.playground.events({

     "click button.startButton": function () {
//TODO test
      console.log(Session.get('startdac'));
      var val = MusicMachine.findOne({});
      console.log('val: ' + val);

      if (val.start === 1) {
        Session.set('startdac', 0);
        MusicMachine.update({ _id: val._id }, {$set: {start: 0}});
      } else if (val.start === 0) {
        Session.set('startdac', 1);
        MusicMachine.update({ _id: val._id }, {$set: {start: 1}});
      }
    },

     "click button.myButton1": function () {
      Session.set('drums', 1);
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {drums: 1}});

    },
      "click button.myButton2": function () {
      Session.set('drums', 0);
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {drums: 0}});
    },

      "click button.myButton3": function () {
      Session.set('bass', 1);
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {bassline: 1}});

    },

      "click button.myButton4": function () {
      Session.set('bass', 0);
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {bassline: 0}});

    },
      "click button.myButton5": function () {
      Session.set('arp', 1);
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {arp: 1}});

    },

      "click button.myButton6": function () {
      Session.set('arp', 0);
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {arp: 0}});

    }//,

    // 'click #sliderVol1': function() {
    //   $( ".selector" ).on( "slidechange", function( event, ui ) {
    //     Session.set('sliderVolume1', ui.value);
    //     var val = MusicMachine.findOne({});
    //     MusicMachine.update({ _id: val._id }, {$set: {sliderVolume1: ui.value}});
    //   });
    // }

  });

  Template.playground.onRendered(function() {
    $('h2').hide();
    var player = MusicMachine.findOne();
    var handler = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {slide: ui.value}});
    }, 50, { leading: false });

    var handlerVol1 = _.throttle(function(event, ui) {
        var valV1 = MusicMachine.findOne({});
        MusicMachine.update({ _id: valV1._id }, {$set: {sliderVolume1: ui.value}});
    }, 1, { leading: false });

    if (player) {
      console.log('slide from mongo: ', player.slide);
      Session.set('uiSlider', player.slide);
      Session.set('sliderVolume1', player.sliderVolume1);
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
      Template.instance().$('#slider1').slide('value', player.slide);
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
      Template.instance().$('#sliderVol1').slide('value', player.sliderVolume1);
    }

//copying from above
//    var slider = MusicMachine.findOne();

    // if (player) {
    //   console.log('gets here');
    //   //Template.instance().$('#slider1').data('uiSlider').value(slider.slide);
    //   Template.instance().$('#slider1').slider('option', 'value', player.slide);
    //   setSpeed(slider.slide/50);
    //   // Template.instance().$('#sliderVol1').data('sliderVol1').value(slider.sliderVolume1);
    //   // setDrumVolume(slider.sliderVolume1);

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
        console.log(calculateCount(counter));
        counter++;
      }
    }, displayInterval);
} //end isClient

if (Meteor.isServer) {
//use remove() to clear mongo for testing purposes
//      MusicMachine.remove({});
      if (MusicMachine.find().count() === 0) {
//set initial start value to make sure dac button click would result in allplay initially
      MusicMachine.insert({slide: 50, start: 0, sliderVolume1: 1});
    }

}