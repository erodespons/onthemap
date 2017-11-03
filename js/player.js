// Player constructor function - used to create new players

var Player = function(name) {
  this.name = name;
  this.color = colors[Math.floor(Math.random() * colors.length)];
  this.route = new Route();
  this.itinerary = {
    stops: [],
    stopCooridnates: []
  };
  this.stopsLeft = 9;
  for (i = 0; i < this.route.length; i++) {
    this.itinerary.stops.push(" " + this.route[i].properties.airport_name);
    this.itinerary.stopCooridnates.push(this.route[i].geometry.coordinates);
  };
  console.log("Welcome " + this.name + ". You will have to stop in the following airports:" + this.itinerary.stops);
};
