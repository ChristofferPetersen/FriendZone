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
        protected void Page_Load(object sender, EventArgs e)
        {
           
        }

        public static List<Person> people = new List<Person>();

        [WebMethod]
        public static string ProcessPeople()
        {
            string a = "";
            foreach (Person person in people)
            {
                a += person + " ";
            }
            return a;
        }

        [WebMethod]
        public static bool ProcessData(string name)
        {
            Console.WriteLine(name);
            people.Add(new Person(people.Count, name, "", ""));
            return name != null;
        }

        [WebMethod]
        public static bool UpdatePerson(string name, string longitude, string latitude)
        {
            for (int i = 0; i < people.Count; i++)
            {
                if (people[i].name == name)
                {
                    people[i].longitude = longitude;
                    people[i].latitude = latitude;
                }
            }
            return name != null;
        }
    }

    public class Person
    {
        int id;
        public string name;
        public string latitude;
        public string longitude;

        public Person(int id, string name, string latitude, string longitude)
        {
            this.id = id;
            this.name = name;
            this.latitude = latitude;
            this.longitude = longitude;
        }
    }
}