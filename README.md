# Music Machine 2015

* A collaborative music making application using the meteor framework

* Coursera: Responsive Website Tutorials and Examples

* Package dependencies
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
  * (TODO) need 8 more sliders
    * (DONE) added speed update functions to playground.js
    * probably make the speed slider in to a per track slider
  * (DONE) just got through volume and track 5
  * (DONE) need 3 more tracks
