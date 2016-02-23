//var bodyParser = require('body-parser');
//var GeoJSON = require('mongodb-geojson-normalize');

function initialize() {
  var mapOptions = {
    zoom: 15,
    center: {lat: 60.1876061, lng: 24.8316287},
    mapTypeId: google.maps.MapTypeId.TERRAIN
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  var infowindow = new google.maps.InfoWindow();

  // Create a <script> tag and set the USGS URL as the source.
  var script = document.createElement('script');
  
  //Add data from database to map
  map.data.loadGeoJson('http://localhost:8080/api/nerds');

  document.getElementsByTagName('head')[0].appendChild(script);

  map.data.addListener('click', function(event) {
      var circle_condition = event.feature.getProperty("condition");
      var circle_name = event.feature.getProperty("name");
      infowindow.setContent("<div style='width:150px; text-align: center;'>"+circle_condition+"</div>" + "<div style='width:150px; text-align: center;'>"+circle_name+"</div>");
      infowindow.setPosition(event.feature.getGeometry().get());
      infowindow.setOptions({pixelOffset: new google.maps.Size(0,-10)});
      infowindow.open(map);
  });

  map.data.setStyle(function(feature) {
    var condition = feature.getProperty('condition');
    return {
      icon: getCircle(condition)
    };
  });
}

function getCircle(condition) {
  var color = 'red';
  if (condition == 'ice') {
    color = 'red';
  }else if (condition == 'wet') {
    color = 'yellow';
  }else if (condition == 'dry') {
    color = 'green';
  }

  var circle = {
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: color,
    fillOpacity: .5,
    scale: Math.pow(2, 5) / 2,
    strokeColor: 'white',
    strokeWeight: .5
  };
  return circle;
}

function eqfeed_callback(results) {
  map.data.addGeoJson(results);
}

google.maps.event.addDomListener(window, 'load', initialize);