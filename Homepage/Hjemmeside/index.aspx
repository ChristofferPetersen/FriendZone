<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="Hjemmeside.index" %>
    <script src="Script/jquery-1.9.1.min.js" type="text/javascript"></script> 

<!DOCTYPE html>

<script runat="server">
    // C# access
</script>

<html>
    <head runat="server">
        <!--Meta-->
        <meta charset="utf-8" />

        <!--Link-->
        <link href="StyleSheet.css" rel="stylesheet" />

        <!--JS CDN-->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

        <!--JQ Link-->
        <script src="https://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>

        <title>FriendZone</title>
    </head>
    <body>
         <section id="Login">
            <form id="form1" method="post" action="index.aspx" runat="server">
                <!--Stuff for login-->
                <div>
                    <img src="Images/logo.png" alt="Friendzone logo(placeholder)" height="250" class="center">
                    <h1 class="centerText">Please state your username</h1>
                    
                    <input id="UserNameInput" name="UserNameInput" runat="server" class="center" placeholder="State your name" />
                    <button type="submit" id="validateNameButton" onclick="ProcessPerson(); return false;">Log ind</button>
                </div>
            </form>
        </section>

        <section id="Canvas">
            <h1 id="username"></h1>
            <br />

            <!--Stuff for canvas-->
            <div id="CoordinatesBox">
                <button onclick="getLocation();">Show coordinates</button>
                <button id="gpsBtn" onclick="setInterval(function(){ getLocation(); GetPeople(); }, 5000);">Show people</button>
                <br />

                <!--Location-->
                <p id="Longitude"></p>
                <p id="Latitude"></p>
                <br />

                <!--Zoom control-->
                <p id="writtenValue">Zoom level: 2</p>
                <input type="range" id="scale" min="1" max="3" step="0.1" oninput="showVal(this.value)" onchange="showVal(this.value)">
                <br />

                <!--The map-->
                <canvas id="MapHolder" width="600" height="300"></canvas>
                <br />

                <!--List of people-->
                <p id="Person"></p>
            </div>
        </section>
        <script src="JavaScriptNy.js"></script>
    </body>
</html>
