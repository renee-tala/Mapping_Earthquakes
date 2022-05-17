// Add console.log to check to see if our code is working.
console.log("working");

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    Street: streets,
    Dark: dark
  };

  // Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [30, 30],
    zoom: 2,
    layers: [streets]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);


  
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map); 


//15.5.3 section

// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/renee-tala/Mapping_Earthquakes/main/majorAirports.json";


//This shows just the points on the map of airports
// Grabbing our GeoJSON data. 
//d3.json(airportData).then(function(data) {
   //console.log(data);
  //Creating a GeoJSON layer with the retrieved data.
  //L.geoJSON(data).addTo(map);
//});


//This shows the points on the map PLUS the airpot name and code when you click the point
d3.json(airportData).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
      pointToLayer: function(feature, layer) {
          console.log(feature);
          return L.marker(layer)
          .bindPopup("<h3>" + "Airport Code: " + feature.properties.faa + "</h3>" + "<br>" + "<h3>" + "Airport Name: " + feature.properties.name + "</h3>");
     }
  })
  
  .addTo(map);
});
