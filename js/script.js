/*jslint browser: true*/
/*global $, jQuery, alert*/

$(document).ready(function () {

  "use strict";
  (function () {

    var api_key = "d52ae78a8e49c1d33ed0f903d278b4bb";

    function getLocation(callback) {
      $.getJSON("http://ip-api.com/json", function (data) {
        callback(data);
      });
    }

    function displayLocation(data) {
      $("#location").text(data.city + ", " + data.regionName);
    }

    function getWeather(zip, callback) {
      $.getJSON("http://api.openweathermap.org/data/2.5/weather?zip=" + zip + ",us&units=imperial&appid=" + api_key, function (weather) {
        callback(weather);
      });
    }

    function displayWeather(weather) {
      $("#description").text(weather.weather[0].main + ", " + weather.weather[0].description);
      $("#temperature").html(weather.main.temp.toFixed(0) + " &deg;F");
      $("#temperature-lh").text("Low " + weather.main.temp_min.toFixed(0) + " - High " + weather.main.temp_max.toFixed(0));
      $("#humidity").text("Humidity: " + weather.main.humidity + " %");
    }

    getLocation(function (data) {
      displayLocation(data);
      getWeather(data.zip, function (weather) {
        displayWeather(weather);
      });
    });

  }());

});