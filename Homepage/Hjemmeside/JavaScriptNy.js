//----------------------------------------------------------------------------------------------------//
// Global variabler //

var clientID = ""; // ID from backend
var username = "";

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

            Stickfigure(ctx, width / 2, height / 2, scale, username);

            $("#Login").hide();
            $("#Canvas").show();
        }
    });
}

//----------------------------------------------------------------------------------------------------//
// Get People //

var personsArr = [];
var person = [];
var ID = parseInt(clientID, 10);

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

            //Fjerner alle personer og starter med at gentegne os selv.
            ctx.clearRect(0, 0, width, height);
            Stickfigure(ctx, width / 2, height / 2, scale, username);

            // Dele alle personer op i hver deres array index og fjerne os selv fra array
            personsArr = result.d.split('>');
            personsArr.splice(ID, 1);

            // Dele hver person op i hver deres array index indexer
            person = [];
            for (var i = 0; i < personsArr.length - 1; i++) {
                person = personsArr[i].split('-');

                var posY = person[2].substring(11).trim();
                var posX = person[3].substring(10).trim();

                // Laver en person for hver person i array
                Stickfigure(ctx, (width / 2) - posX, (height / 2) - posY, scale, person[1]);
            }
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
// Stickman canvas //

function Stickfigure(ctx, x, y, size, name) {
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

    console.log("I am alive. " + name);
}

function showVal(newVal) {
    document.getElementById("writtenValue").innerHTML = "Zoom level: " + newVal;
    scale = newVal;
    if (newVal > 2) {
        console.log("Zoom level: " + newVal + "Scale" + scale);
        // Zoom out
        //Fjerner alle personer og starter med at gentegne os selv.
        ctx.clearRect(0, 0, width, height);
        Stickfigure(ctx, width / 2, height / 2, newVal, username);

        if (personsArr.length != 0) {
            for (var i = 0; i < personsArr.length - 1; i++) {
                person = personsArr[i].split('-');

                var posY = person[2].substring(11).trim();
                var posX = person[3].substring(10).trim();

                // Laver en person for hver person i array
                Stickfigure(ctx, (width / 2) - posX, (height / 2) - posY, newVal, person[1]);
            }
        }
    }
    else {
        console.log("Zoom level: " + newVal);
        // Zoom in
        //Fjerner alle personer og starter med at gentegne os selv.
        ctx.clearRect(0, 0, width, height);
        Stickfigure(ctx, width / 2, height / 2, newVal, username);

        if(personsArr.length != 0) {
            for (var i = 0; i < personsArr.length - 1; i++) {
                person = personsArr[i].split('-');

                var posY = person[2].substring(11).trim();
                var posX = person[3].substring(10).trim();

                // Laver en person for hver person i array
                Stickfigure(ctx, (width / 2) - posX, (height / 2) - posY, newVal, person[1]);
            }
        }
    }
}

//// Zoom selve canvas størrelsen
//var scale = document.getElementById("scale");

//scale.addEventListener("change", function (e) {
//    c.style.transform = "scale(" + e.target.value / 2 + "," + e.target.value / 2 + ")";
//});