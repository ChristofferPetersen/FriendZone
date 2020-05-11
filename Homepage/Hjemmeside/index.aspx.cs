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
        public static int thisIsMyID;

        [WebMethod]
        public static string ProcessPeople()
        {
            string a = "";
            foreach (Person person in people)
            {
                if(thisIsMyID == person.id)
                {
                    person.thisIsMe = "Me";
                }
                else
                {
                    person.thisIsMe = "Not me";
                }

                a += "ID: " + person.id + " - " + "Name: " + person.name + " - " + "Longitude: " + person.longitude + " - " + "Latitude: " + person.latitude + " - " + "Is this me?: " + person.thisIsMe + "<br>";
            }
            return a;
        }

        [WebMethod]
        public static bool ProcessPerson(string name)
        {
            Console.WriteLine(name);
            people.Add(new Person(people.Count + 1, name, "", "", ""));
            thisIsMyID = people.Count;

            return name != null;
        }

        [WebMethod]
        public static bool UpdatePerson(string name, string longitude, string latitude)
        {
            for (int i = 0; i < people.Count; i++)
            {
                if (people[i].id == thisIsMyID)
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
        public int id;
        public string name;
        public string latitude;
        public string longitude;
        public string thisIsMe;

        public Person(int id, string name, string latitude, string longitude, string thisIsMe)
        {
            this.id = id;
            this.name = name;
            this.latitude = latitude;
            this.longitude = longitude;
            this.thisIsMe = thisIsMe;
        }
    }
}