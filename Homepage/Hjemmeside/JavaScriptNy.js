//----------------------------------------------------------------------------------------------------//
// Global variabler //

var clientID = ""; // ID from backend
var username = "";
//console.log(clientID + " || " + username + " -On page load");

var c = document.getElementById("MapHolder");
var ctx = c.getContext("2d");
var width = c.width;
var height = c.height;
var scale = 2;

//----------------------------------------------------------------------------------------------------//
// Login //

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
            //console.log("Du er nu oprettet.")

            clientID = result.d;  // ID fra backend

            username = usernameInput;
            document.getElementById("username").innerHTML = usernameInput;

            //console.log(clientID + " || " + username + " -Us after creation");

            DrawStickFigure(ctx, width / 2, height / 2, scale, username);

            $("#Login").hide();
            $("#Canvas").show();
        }
    });
}

//----------------------------------------------------------------------------------------------------//
// Get People //

var personsArr = [];
var person = [];

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
            //console.log("We returned: " + result.d);
            document.getElementById('Person').innerHTML = result.d;

            // Dele alle personer op i hver deres array index og fjerne os selv fra array
            personsArr = result.d.split('>');
            var ID = parseInt(clientID, 10) - 1;

            personsArr.splice(ID, 1);
            //console.log(ID.toString() + " || " + personsArr[0].toString() + " -Our ID and first in array");

            // Dele hver person op i hver deres array index indexer
            person = [];
            for (var i = 0; i < personsArr.length - 1; i++) {
                person = personsArr[i].split('-');
            }

            UpdateDrawings();
        }
    });
}

//----------------------------------------------------------------------------------------------------//
// GPS coordinates //

var Longitude = document.getElementById("Longitude");
var Latitude = document.getElementById("Latitude");
var myPosX = Latitude.innerHTML.substring(10).trim();
var myPosY = Longitude.innerHTML.substring(10).trim();

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
    myPosY = Longitude.innerHTML;
    Latitude.innerHTML = "Latitude: " + dataValue.latitude;
    myPosX = Latitude.innerHTML;

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
            //console.log("GPS kordinaterne er nu opdateret.")
        }
    });
}

//----------------------------------------------------------------------------------------------------//
// Stickman canvas //

function DrawStickFigure(ctx, x, y, size, name) {
    // (x) venstre mod højre (0) - (500)
    // (y) op mod ned (0) - (300)
    // (0, 0) Øverste venstre hjørne
    
    // Head
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc(x, y, 12.5 / size, 0, Math.PI * 2, true);
    ctx.fill();

    // body
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + 40 / size);
    ctx.strokeStyle = "black";
    ctx.stroke();

    // Mini stick
    ctx.beginPath();
    ctx.moveTo(x, y + 40 / size);
    ctx.lineTo(x, y + 60 / size);
    ctx.strokeStyle = "black";
    ctx.stroke();

    // arms
    ctx.beginPath();
    ctx.strokeStyle = "black";

    ctx.moveTo(x, y + 25 / size); //arm 1
    ctx.lineTo(x + 25 / size, y);

    ctx.moveTo(x, y + 25 / size); //arm 2
    ctx.lineTo(x - 25 / size, y);
    ctx.stroke();

    // legs
    ctx.beginPath();
    ctx.strokeStyle = "black";

    ctx.moveTo(x, y + 40 / size); //ben 1
    ctx.lineTo(x + 12 / size, y + 85 / size);

    ctx.moveTo(x, y + 40 / size); //ben 2
    ctx.lineTo(x - 12 / size, y + 85 / size);
    ctx.stroke();

    // Text
    ctx.font = 15 / size + "px Garamond";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(name, x, y - 15 / size);

   //console.log("I am alive. " + name);
}

function UpdateDrawings() {
    //Fjerner alle personer og starter med at gentegne os selv.
    ctx.clearRect(0, 0, width, height);
    DrawStickFigure(ctx, width / 2, height / 2, scale, username);

    console.log(
        "Client: " + username +
        "\nCanvas center X: " + (width / 2) +
        "\nCanvas center Y: " + (height / 2) +
        "\nNew X: " + myPosX +
        "\nNew Y: " + myPosY
    );

    var AtoBinMeters = 0;
    if (personsArr.length != 0) {
        for (var i = 0; i < personsArr.length - 1; i++) {
            var name = person[1].substring(6).trim();
            var posY = person[2].substring(11).trim();
            var posX = person[3].substring(10).trim();

            //// Afstand i meter mellem client og næste person i loopet
            //AtoBinMeters = distance(parseFloat(myPosX.substring(10).trim()), parseFloat(myPosY.substring(10).trim()), parseFloat(posX), parseFloat(posY), "K") / 1000;

            //Calculationg new canvas location based on distance
            var calcNewX = (parseFloat(myPosX.substring(10).trim()) - parseFloat(posX)) * 0.00001;
            var calcNewY = (parseFloat(myPosY.substring(10).trim()) - parseFloat(posY)) * 0.00001;

            // Laver en person for hver person i array
            DrawStickFigure(ctx, calcNewX, calcNewY, scale, name);

            //"\nDistance to client: " + parseFloat(AtoBinMeters) +
            console.log(
                "Name: " + name +
                "\nNew X: " + calcNewX +
                "\nNew Y: " + calcNewY
            );

            //console.log(person[0] + " || " + person[1] + "- Other people");
        }
    }
}

function showValScale(newVal) {
    document.getElementById("writtenValueScale").innerHTML = "Zoom level: " + newVal;
    scale = newVal;
    if (newVal > 2) {
        //console.log("Zoom level: " + newVal + "Scale" + scale);
        // Zoom out
        UpdateDrawings();
    }
    else {
        //console.log("Zoom level: " + newVal);
        // Zoom in
        UpdateDrawings();
    }
}

//----------------------------------------------------------------------------------------------------//
// Distance //
function distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") { dist = dist * 1.609344 }
        if (unit == "N") { dist = dist * 0.8684 }
        return dist;
    }
} // Ikke i brug i øjeblikket