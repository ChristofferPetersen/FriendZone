using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Hjemmeside
{
    public partial class victor : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static string OnSubmit(string name, bool isGoing, string returnAddress)
        {
            return "it worked" + name +  isGoing + returnAddress;
        }

    }
}