/*jslint browser: true*/
/*global $, jQuery, alert*/

$(document).ready(function () {

  "use strict";
  (function () {

    var api_key = "573488375e184564967130158161607";

    function getLocation(callback) {
      if (!navigator.geolocation) {
        $("#location").text("Geolocation is not supported by your browser.");
        return;
      }
      function success(position) {
        callback(position);
      }
      function error() {
        $("#location").text("Unable to retrieve your location.");
      }
      navigator.geolocation.getCurrentPosition(success, error);
    }

    function getWeather(position, callback) {
      $.getJSON("https://api.apixu.com/v1/current.json?key=" + api_key + "&q=" + position.coords.latitude + ',' + position.coords.longitude, function (weather) {
        callback(weather);
      });
    }

    function displayWeather(weather) {
      $("#location").text(weather.location.name + ", " + weather.location.region);
      $("#description").text(weather.current.condition.text);
      var img = new Image();
      img.src = weather.current.condition.icon;
      img.alt = "Weather status icon";
      $("#description-icon").append(img);
      $("#temperature").html(weather.current.temp_f + " &deg;F");
      $("#temperature-feelslike").html("Feels like: " + weather.current.feelslike_f + " &deg;F");
      $("#humidity").text("Humidity: " + weather.current.humidity + " %");
    }

    getLocation(function (position) {
      getWeather(position, function (weather) {
        displayWeather(weather);
      });
    });

  }());

});