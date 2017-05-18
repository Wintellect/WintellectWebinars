using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CosmosDBDemo.Models
{
    public class Session
    {
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public string Topic { get; set; }
        public Person Speaker { get; set; }
        public Person[] Attendees { get; set; }       
    }
}
