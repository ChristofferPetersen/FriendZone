<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="victor.aspx.cs" Inherits="Hjemmeside.victor" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="https://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
</head>
<body>
      <button onclick="SendToCodeBehind('ole', 'false', 'jensen')">Click me</button>
    <script>

        function SendToCodeBehind(person, isAttending, returnEmail)
        {
            var dataValue = "{ name: '"+person+"', isGoing: '"+isAttending+"', returnAddress: '"+returnEmail+"' }";
            $.ajax({
                type: "POST",
                url: "victor.aspx/OnSubmit",
                data: dataValue,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " +   
                    errorThrown);
                },
                success: function (result) {
                    alert("We returned: " + result.d);
                }
            });
        }
    </script>

    <form id="form1" runat="server">
        <div>
        </div>
    </form>
</body>
</html>
