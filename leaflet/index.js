var map = new L.Map('map');
map.setView([1.290270, 103.851959], 16, false);
new L.TileLayer('http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png', {
  attribution: 'Map tiles &copy; <a href="https://mapbox.com">MapBox</a>',
  maxZoom: 18,
  maxNativeZoom: 20
}).addTo(map);

var osmb = new OSMBuildings(map).load();

//********************************************************

function ajax(url, callback) {
  var req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (req.readyState !== 4) {
      return;
    }
    if (!req.status || req.status < 200 || req.status > 299) {
      return;
    }

    callback(JSON.parse(req.responseText));
  };
  req.open('GET', url);
  req.send(null);
}

function formatJSON(json) {
  var html = '';
  for (var key in json) {
    html += '<em>'+ key +'</em> '+ json[key] +'<br>';
  }
  return html;
}

var popup;
osmb.click(function(e) {
  popup = L.popup({ maxHeight:200, autoPanPaddingTopLeft:[50,50] })
    .setLatLng(L.latLng(e.lat, e.lon))
    .setContent('<b>OSM ID '+ e.feature +'</b>')
    .openOn(map);
  map.flyTo([e.lat, e.lon], 18, {animate: true});

  var url = 'https://data.osmbuildings.org/0.2/uejws863/feature/'+ e.feature +'.json';
  ajax(url, function(json) {
    alert(json);
    var content = '<b>OSM ID '+ e.feature +'</b>';
    for (var i = 0; i < json.features.length; i++) {
      content += '<br><em>OSM Part ID</em> '+ json.features[i].id;
      content += '<br>'+ formatJSON(json.features[i].properties.tags);
    }
    popup.setContent(content).openOn(map);
  });
});

osmb.style({ wallColor: 'rgba(0,0,255,170)', roofColor: 'rgba(0,0,255,170)', shadows: 'rgb(0,0,0)' });