// Route constructor function - used to create new reoutes and print them on the map

var Route = function() {
  var route = [];
  for (var i = 1; route.length < 10; i++) {
    var stop = europeAirports.features[Math.floor(Math.random() * europeAirports.features.length)];
    if (routes.indexOf(stop) === -1) {
      route.push(stop);
      routes.push(stop);
    }

  };

  // TEST 2 START


  // TEST 2 END

  // TEST 1 START
  //   L.geoJSON(route,{
  //       style:function (feature) {
  //       return {color: supercolor};
  //       },
  //       onEachFeature: function (feature, layer) {
  //         layer.bindPopup('<h1>Airport of '+feature.properties.airport_name+'</h1><p>'+feature.properties.country_name+'</p>');
  //       }
  //     }
  //   ).addTo(mymap);
  // TEST 1 END

  return route;

};
