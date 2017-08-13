// Put your zillow.com API key here
var zwsid = "***********************";

var request = new XMLHttpRequest();
var add;
var address;
var city;
var statezip;
var latlng;
var fadd;
var map;
var marker;
var geocoder;
var cost=0



function initialize () {
document.getElementById("address").value="";
details="";
address="";
add="";
city="";
statezip="";
fadd="";
cost=0
initMap.call();
}



function initMap() {
geocoder = new google.maps.Geocoder();
map = new google.maps.Map(document.getElementById('map'), {
center: {lat: 32.75, lng: -97.13},zoom: 17
});
google.maps.event.addListener(map,'click',function(event){
var lat = event.latLng.lat();
var lng = event.latLng.lng();
geocoder.geocode({'location':{lat,lng}}, function(results, status) {
if (status == google.maps.GeocoderStatus.OK) {
add=results[0].formatted_address;
splitadd.call()
}});
});
}



function getpar(){
add = document.getElementById("address").value;
splitadd.call();
}


function splitadd(){
var addarr=add.split(", ");
address=addarr[0];
city=addarr[1];
statezip=addarr[2];
sendRequest.call();
}




function sendRequest () {
request.onreadystatechange = displayResult;
request.open("GET","proxy.php?zws-id="+zwsid+"&address="+address+"&citystatezip="+city+"+"+statezip);
request.withCredentials = "true";
request.send(null);
}



function displayResult () {
if (request.readyState == 4) {
if(typeof marker!= 'undefined')
      marker.setMap(null);
var xml = request.responseXML.documentElement;
cost = xml.getElementsByTagName("zestimate")[0].getElementsByTagName("amount")[0].innerHTML;
var div= document.getElementById("output");
details=address+", "+city+", "+statezip+", "+cost;
div.innerHTML =div.innerHTML+"</br>"+ details;
getlatlong.call();
 }
}



function getlatlong()
{var loc = address+", "+city+", "+statezip;
geocoder.geocode( { 'address': loc}, function(results, status) {
if (status == google.maps.GeocoderStatus.OK) {
latlng=results[0].geometry.location;
fadd=results[0].formatted_address;
mapMarker.call();}
else {alert("ERROR: " + status);}
});
}



function mapMarker() {
map.setCenter(latlng);
marker = new google.maps.Marker({
map: map, position: latlng});
google.maps.event.addListener(marker, 'click', function() {
var infowindow = new google.maps.InfoWindow();
infowindow.setContent('<div>' + fadd+', '+cost + '</div>');
infowindow.open(map, this);
      });

}
