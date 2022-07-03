const timeout = 5000;
var lat,lon,alt,hea,spe;
const route = [[51.46, 5.38],
    [51.40, 5.31],
    [51.36, 5.26],
    [51.35, 5.13],
    [51.43, 4.95],
    [51.55, 4.79],
    [51.65, 4.67],
    [51.74, 4.67],
    [51.91, 4.62],
    [52.01, 4.62],
    [52.17, 4.68],
    [52.20, 4.71],
    [52.22, 4.72],
    [52.28, 4.75],
    [52.30, 4.77]
];
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);
var icon = '../../images/dot.png'
var planeIcon = L.icon({
    iconUrl: icon,
    iconSize: [21, 21],
    iconAnchor: [10, 10],
});
var marker1 = L.marker([52.30, 4.77], {icon: planeIcon}).addTo(mymap);
L.polyline(route, {color: 'red', smoothfactor: 0.1}).addTo(mymap);
var route2 = [[52.30, 4.77],];
var poly2 = L.polyline(route2, {color: 'blue', smoothfactor: 0.1}).addTo(mymap);


function json(response) {
    return response.json()
}

function setFlightdata() {
    fetch('data.json').then(json).then(function (data) {
        var i = 0;
        setInterval(function () {
            lat = data[i].lat;
            lon = data[i].lon;
            alt = data[i].alt;
            hea = data[i].hea;
            spe = data[i].spe;
            document.getElementById("speed").textContent="The airspeed is: " + spe + " kmph.";
            document.getElementById("altitude").textContent="The altitude is: " + alt + " meters.";
            document.getElementById("heading").textContent="The heading is: " + hea + " degrees.";
            marker1.setLatLng([lat,lon]);
            poly2.addLatLng([lat,lon]);
            if (i < 15){
                i++;
            } else {
                i = 0;

                poly2.remove(mymap);
                poly2.addLatLng([51.45, 5.39]);
                poly2 = L.polyline(route2, {color: 'blue', smoothfactor: 0.1}).addTo(mymap);
            }

        }, timeout)
    })
}

document.onload = setFlightdata();