/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */
/* =====================
  Lab 2, part 2 - application state

  Spatial applications aren't typically as simple as putting data on a map. In
  addition, you'll usually need to change the stored data in response to user
  input. This lab walks you through writing a set of functions that are capable
  of building an interactive application.

  First, we'll need to write a function for loading points onto the map. Choose
  any dataset from part1 and write a function here to download it, parse it,
  make it into markers, and plot it. You'll know you've succeeded when you can
  see markers on the map.

  NOTE 1: When we have added markers to the map in the past, we have used a line like:

       L.marker([50.5, 30.5]).addTo(map);

       This is accomplishing two goals. L.marker([50.5, 30.5]) makes a marker
       and .addTo(map) adds that marker to the map. This task differs in that,
       you are being asked to create separate functions: one to create markers
       and one to add them to the map.

  (IMPORTANT!)
  NOTE 2: These functions are being called for you. Look to the bottom of this file
       to see where and how the functions you are defining will be used. Remember
       that function calls (e.g. func();) which are equal to a value (i.e. you
       can set a var to it: var result = func();) must use the 'return' keyword.

       var justOne = function() {
         return 1;
       }
       var one = justOne();
===================== */

// We set this to HTTP to prevent 'CORS' issues

// $.ajax(phillyBikeCrashesDataUrl).done(function(data){
//   var parseddata = JSON.parse(data);
//   console.log(parseddata);
//   _.each(parseddata,function(point){
//     var lon = point.LNG;
//     var lat = point.LAT;
//     var veh = point.VEHICLE_CO;
//     var style = {'radius':veh*5, 'fillColor':'#cc5000'};
//     L.circleMarker([lat,lon],style).addTo(map);
//   });
// });

// console.log('downloaded');


//https://raw.githubusercontent.com/CPLN692-MUSA611/datasets/master/json/philadelphia-bike-crashes-snippet.json

/* ====================
  Define the function removeData so that it clears the markers you've written
  from the map. You'll know you've succeeded when the markers that were
  previously displayed are immediately removed from the map.

  In Leaflet, the syntax for removing one specific marker looks like this:

  map.removeLayer(marker);

  In real applications, this will typically happen in response to changes to the
  user's input.
===================== */

/* =====================
  Optional, stretch goal
  Write the necessary code (however you can) to plot a filtered down version of
  the downloaded and parsed data.

  Note: You can add or remove from the code at the bottom of this file.
===================== */



/* =====================
 Leaflet setup - feel free to ignore this
===================== */
var map = L.map('map', {
  center: [39.9522, -75.1639],
  zoom: 14
});
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);
/* =====================
 CODE EXECUTED HERE!
===================== */
var parseData = function(d) {
  return JSON.parse(d);
};

var ManyVehicle = function(data){
  return _.filter(data, function(item){
    return item.VEHICLE_CO > 3;
});
};

var makeMarkers = function(array, lat, long) {
  return _.map(array,function(p){
    var veh = p.VEHICLE_CO;
    var style = {'radius':veh*5, 'fillColor':'#cc5000'};
    return L.circleMarker([p[lat],p[long]],style);
  });
};

var plotMarkers = function(array) {
  _.each(array,function(m){
    m.addTo(map);
  });
  console.log('mapped');
};

var removeMarkers = function(array) {
  if(array.length){
    _.each(array,function(m){
      map.removeLayer(m);
      console.log('removed');
    });
  }
};

$(document).ready(function(){

  $('button').click(function(){
    console.log('clicked');
    var url = $('#text-input1').val();
    var lat = $('#text-input2').val();
    var long = $('#text-input3').val() ;

    $.ajax(url).done(function(data) {
      console.log(data);
      var parsed = parseData(data);
      console.log(parsed);
      var filterparsed = ManyVehicle(parsed);
      console.log(filterparsed);
      var markers = makeMarkers(filterparsed, lat, long);
      console.log(markers);
      plotMarkers(markers);
    // removeMarkers(markers);
    });
  });
});
