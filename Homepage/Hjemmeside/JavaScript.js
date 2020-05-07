//----------------------------------------------------------------------------------------------------//
// Login //

function ProcessData(x) {
    var x2 = document.getElementById(x).value;

    PageMethods.ProcessData(x2, onsuccess, onfailed);
    function onsuccess() {
        $("#Login").hide();
        $("#Canvas").show();

        document.getElementById('username').innerHTML = x2;
    }
    function onfailed() {
        alert("Retard alert");
    }
}

//----------------------------------------------------------------------------------------------------//
// GPS coordinates //

var Longitude = document.getElementById("Longitude");
var Latitude = document.getElementById("Latitude");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        Longitude.innerHTML = "Geolocation er ikke supporteret i denne browser.";
    }
}

function showPosition(position) {
    Longitude.innerHTML = "Longitude: " + position.coords.longitude;
    Latitude.innerHTML = "Latitude: " + position.coords.latitude;
}


//----------------------------------------------------------------------------------------------------//
// WEBMETHOD PASSING //

function peoplePassing(ProcessPeople) {
    $.ajax({
        type: 'POST',
        url: 'default.aspx/Create',
        data: ProcessPeople,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (data, status) {
            alert(status)
        },
        error: alert("error!")
    });
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