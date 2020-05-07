<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="Hjemmeside.index" %>
<script src="Script/jquery-1.9.1.min.js" type="text/javascript"></script> 

<!DOCTYPE html>
<html>
    <head runat="server">
        <!--Meta-->
        <meta charset="utf-8" />

        <!--Link-->
        <link href="StyleSheet.css" rel="stylesheet" />

        <!--JS CDN-->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

        <title>FriendZone</title>
    </head>
    <body>
        <section id="Login">
            <form id="form1" runat="server">
                <!--Stuff for login-->
                <div>
                    <img src="image/logo.png" alt="Friendzone logo(placeholder)" height="250" class="center">
                    <h1 class="centerText">Please state your username</h1>

                    <asp:ScriptManager ID="ScriptManager1" runat="server" EnablePageMethods="true"></asp:ScriptManager>
                    <asp:TextBox ID="TextBox1" runat="server" class="center"></asp:TextBox>
                    <asp:button id="validateNameButton" OnClientClick="ProcessData('TextBox1'); return false;" runat="server" Text="Enter"></asp:button>
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
            </div>
        </section>

        <script src="JavaScript.js"></script>
    </body>
</html>
