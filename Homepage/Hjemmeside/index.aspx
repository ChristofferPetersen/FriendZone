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

            <!--Stuff for canvas-->
            <div id="CoordinatesBox">
                <!--Button shows the current gps location (Longitude / Latitude)-->
                <button onclick="getLocation();">Show coordinates</button>

                <!--Location given from button-->
                <p id="Longitude"></p>
                <p id="Latitude"></p>

                <!--The map-->
                <!--<canvas id="MapHolder"></canvas>-->

                <!--List of people-->
                <button id="gpsBtn" onclick="setInterval(function(){ getLocation(); GetPeople(); }, 5000);">Show people</button>
                <p id="Person"></p>
            </div>
        </section>
        <script src="JavaScriptNy.js"></script>
    </body>
</html>
