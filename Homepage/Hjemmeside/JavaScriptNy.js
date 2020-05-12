//----------------------------------------------------------------------------------------------------//
// Login //

var clientID = ""; // ID from backend
var username = document.getElementById("username").innerHTML;

function ProcessPerson() {
    var usernameInput = document.getElementById("UserNameInput").value;

    var dataValue = {
        name: usernameInput
    };

    $.ajax({
        type: "POST",
        url: "index.aspx/ProcessPerson",
        data: JSON.stringify(dataValue),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
        },
        success: function (result) {
            console.log("Du er nu oprettet.")

            clientID = result.d;  // ID fra backend

            $("#Login").hide();
            $("#Canvas").show();

            document.getElementById('username').innerHTML = usernameInput;
        }
    });
}

//----------------------------------------------------------------------------------------------------//
// Get People //

function GetPeople() {
    var dataValue = {
        id: clientID
    };

    $.ajax({
        type: "POST",
        url: "index.aspx/ProcessPeople",
        data: JSON.stringify(dataValue),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
        },
        success: function (result) {
            console.log("We returned: " + result.d);
            document.getElementById('Person').innerHTML = result.d;
        }
    });
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
    var dataValue = {
        id: clientID,
        name: username,
        longitude: position.coords.longitude,
        latitude: position.coords.latitude
    };

    Longitude.innerHTML = "Longitude: " + dataValue.longitude;
    Latitude.innerHTML = "Latitude: " + dataValue.latitude;

    $.ajax({
        type: "POST",
        url: "index.aspx/UpdatePerson",
        data: JSON.stringify(dataValue),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
        },
        success: function () {
            console.log("GPS kordinaterne er nu opdateret.")
        }
    });
}

//----------------------------------------------------------------------------------------------------//
// GPS coordinates //