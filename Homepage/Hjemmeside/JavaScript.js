function usernameValidation() {
    var x = document.getElementById("name").value;
    document.getElementById("demo").innerHTML = x;
}
﻿//----------------------------------------------------------------------------------------------------//
// GPS coordinates //

var coordinates = document.getElementById("Coordinates");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        coordinates.innerHTML = "Geolocation er ikke supporteret i denne browser.";
    }
}

function showPosition(position) {
    coordinates.innerHTML = "Bredtegrader: " + position.coords.latitude +
        "<br>Længdegrader: " + position.coords.longitude;
}

//----------------------------------------------------------------------------------------------------//
// GPS coordinates - Error handling //

//function showError(error) {
//    switch (error.code) {
//        case error.PERMISSION_DENIED:
//            x.innerHTML = "Du fik ikke lov til at bruge GPS location."
//            break;
//        case error.POSITION_UNAVAILABLE:
//            x.innerHTML = "Lokation er udenfor service."
//            break;
//        case error.TIMEOUT:
//            x.innerHTML = "Du timede ud desvære, prøv igen."
//            break;
//        case error.UNKNOWN_ERROR:
//            x.innerHTML = "Ukendt fejl, prøv igen."
//            break;
//    }
//}

//----------------------------------------------------------------------------------------------------//
// GPS coordinates - Map API //

//function showPosition(position) {
//    var latlon = position.coords.latitude + "," + position.coords.longitude;
//    console.log(latlon);

//    var img_url = "https://maps.googleapis.com/maps/api/staticmap?center=" +latlon+ " & zoom=14 & size=400x300 & sensor=false & key=AIzaSyC1E93o7wTpK9vlthyjemYCm7I2wCg44Cc";

//    document.getElementById("MapHolder").innerHTML = "<img src='"+img_url+"'>";
//}

//----------------------------------------------------------------------------------------------------//