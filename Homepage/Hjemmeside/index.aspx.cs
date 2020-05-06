using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Hjemmeside
{
    public partial class index : System.Web.UI.Page
    {
        public static List<Person> people = new List<Person>();
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static bool ProcessData(string name)
        {
            Console.WriteLine(name);
            people.Add(new Person(people.Count, name));
            return name != null;
        }
    }

    public class Person
    {
        int id;
        string name;
        string latitude;
        string longitude;

        public Person(int id, string name)
        {
            this.id = id;
            this.name = name;
        }
    }
}