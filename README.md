# Music Machine 2015

* A collaborative music making application using the meteor framework

## Known Issue

* Sometimes, the jquery-ui sliders do not display. Typically refreshing the browser several times will resolve this issue.
** The browser console shows an error like:
** Exception from Tracker afterFlush function: debug.js:41 TypeError: Cannot read property 'sliderVolume1' of undefined at null
** This issue will prevent the sliders from being rendered but I don't know the code resolution. 

## About

* Coursera: Responsive Website Tutorials and Examples

## Package dependencies
  * mizzao:jquery-ui
  * twbs:bootstrap
  * fortawesome:fontawesome

## Adding Slider for track
  * Requires template handler to display mongo value for the slider (for ex volume)
  * Requires update to the template onRender() function
    * Requires slider instantiation (jquery ui) and corresponding handler
  * Requires update to the startdac global play/stop button (client handler)
  * Requires update to the respective track's on/off buttons (click handler
  * Requires update to the playground.js file, new function to set the track's volume (maxim object) based on slider browser value
  * Requires update to the template

## Background image
  * http://subtlepatterns.com/one-in-a-million-s/

### Status
  * (TODO) would like to refactor: currently a lot of redundancy so would like to be able to add new tracks more easily
  * (TODO) need 7 more speed sliders
    * (DONE) added speed update functions to playground.js
    * (DONE - proof of concept) probably make the speed slider in to a per track slider
  * (DONE) just got through volume and track 5
  * (DONE) need 3 more tracks
