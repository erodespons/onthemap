var mymap;
var game;

$(document).ready(function() {

  // We create a map

  mymap = L.map('map', {
    center: [48, 10],
    zoom: 4,
    scrollWheelZoom: false
  });

  // Add basemap

  L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy;\<a href="https://carto.com/attribution"> CARTO</a>'
  }).addTo(mymap);

  // Add point layer

  var icon = new L.icon({
    iconUrl: "https://s3.amazonaws.com/com.cartodb.users-assets.production/maki-icons/airport-18.svg",
    iconSize: [20, 20]
  }); //create icon

  function playerIcon(feature, layer) {
    layer.bindPopup("<h1 class='infoHeader'>" + feature.properties.airport_name + "</h1>");
    layer.setIcon(icon);
  }; // icon + popup

  L.geoJSON(europeAirports, {
    onEachFeature: playerIcon
  }).addTo(mymap); // adds function playerIcon to each point

  // Start a game

  $(".btn-group > button.btn").on("click", function(){
    $("#number-of-players").slideDown(1000); //makes the start button appear
    var numberOfPlayers = this.innerHTML;
    console.log(numberOfPlayers);
    game = new OnTheMap(numberOfPlayers);
    $("#questionaire > btn-secondary").empty();
    game.createPlayers(); // Create players
    game.play(); // Play
});



    // create a red polyline from an array of LatLng points

    // var polyline = L.polyline(game.players[0].itinerary.stopCooridnates.reverse(), {
    //   color: 'red'
    // }).addTo(mymap);



});
