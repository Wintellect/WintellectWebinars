using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CosmosDBDemo.Models
{
    public class Conference
    {        
        public string id { get; set; }
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Session[] Sessions { get; set; }

        public static Conference CreateConference(int num, DateTime startDate)
        {
            var attendee1 = new Person
            {
                Name = "Attendee One",
                Employer = "Good Employer"
            };

            var attendee2 = new Person
            {
                Name = "Attendee Two",
                Employer = "OK Employer"
            };

            var attendee3 = new Person
            {
                Name = "Attendee Three",
                Employer = "Bad Employer"
            };

            var speaker1 = new Person
            {
                Name = "Speaker One",
                Employer = "Good Employer"
            };

            var speaker2 = new Person
            {
                Name = "Speaker Two",
                Employer = "OK Employer"
            };

            var conference = new Conference
            {
                id = Guid.NewGuid().ToString(),
                StartDate = startDate.Date.AddHours(8), 
                EndDate = startDate.Date.AddHours(16),
                Name = "Conference " + num,
                Sessions = new Session[]
                                             {
                                                 new Session
                                                 {
                                                     Name = "Conference " + num + " Session 1",
                                                     StartDate = startDate.Date.AddHours(8),
                                                     Topic = "Conference 1 Topic 1",
                                                     Speaker = speaker1,
                                                     Attendees = new Person[]{attendee1, attendee2}
                                                 },
                                                 new Session
                                                 {
                                                     Name = "Conference " + num + " Session 2",
                                                     StartDate = startDate.Date.AddHours(10),
                                                     Topic = "Conference 1 Topic 2",
                                                     Speaker = speaker2,
                                                     Attendees = new Person[]{attendee2, attendee3}
                                                 },
                                                 new Session
                                                 {
                                                     Name = "Conference " + num + " Session 3",
                                                     StartDate = startDate.Date.AddHours(12),
                                                     Topic = "Conference 1 Topic 3",
                                                     Speaker = speaker1,
                                                     Attendees = new Person[]{attendee3}
                                                 }
                                             }
            };

            return conference;
        }
    }
}
