using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CosmosDBDemo.Models;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents.Linq;

namespace CosmosDBDemo
{
    class Program
    {
        private static readonly string docDbEndpoint = ConfigurationManager.AppSettings["docDbEndpoint"];
        private static readonly string dbKey = ConfigurationManager.AppSettings["docDbKey"];

        static void Main(string[] args)
        {
            using (var client = new DocumentClient(new Uri(docDbEndpoint), dbKey))
            {
                try
                {
                    RunCreateDemoAsync(client).Wait();
                    RunQueryDemoAsync(client).Wait();
                    RunUpdateDemoAsync(client).Wait();
                    RunDeleteDemoAsync(client).Wait();
                    RunSprocDemoAsync(client).Wait();
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Sometihng went wrong.");
                    Console.ReadKey();
                }
                finally
                {
                    //RunCleanEverythingAsnyc(client).Wait();
                }
            }
        }

        private static async Task RunCreateDemoAsync(DocumentClient client)
        {
            var CosmosDBUtils = new CosmosDBUtils(client);

            var conferenceDb = await CosmosDBUtils.GetOrCreateDatabaseAsync("Conferences");

            var conferenceCollection = await CosmosDBUtils.GetOrCreateDocumentCollectionAsync(conferenceDb, "FallConferences");

            await CosmosDBUtils.CreateDocumentAsync<Conference>(conferenceCollection, Conference.CreateConference(1, new DateTime(2014, 10, 18)));
            await CosmosDBUtils.CreateDocumentAsync<Conference>(conferenceCollection, Conference.CreateConference(2, new DateTime(2014, 11, 18)));
            await CosmosDBUtils.CreateDocumentAsync<Conference>(conferenceCollection, Conference.CreateConference(3, new DateTime(2014, 11, 22)));
        }

        private static async Task RunQueryDemoAsync(DocumentClient client)
        {
            var CosmosDBUtils = new CosmosDBUtils(client);

            var conferenceDb = await CosmosDBUtils.GetOrCreateDatabaseAsync("Conferences");

            var conferenceCollection = await CosmosDBUtils.GetOrCreateDocumentCollectionAsync(conferenceDb, "FallConferences");

            QueryAll(client, conferenceCollection.DocumentsLink);
            Console.ReadKey();

            QueryForConferenceName(client, conferenceCollection.DocumentsLink, "Conference 1");
            Console.ReadKey();

            QueryForConferenceSessions(client, conferenceCollection.DocumentsLink, new DateTime(2014, 11, 1));
            Console.ReadKey();
        }

        private static void QueryAll(DocumentClient client, string collectionLink)
        {
            var linqConferences = from c in client.CreateDocumentQuery<Conference>(collectionLink)
                                  select c;

            foreach (var conference in linqConferences)
            {
                Console.WriteLine("Found conference " + conference.Name);
            }
        }

        private static void QueryForConferenceName(DocumentClient client, string collectionLink, string name)
        {
            var conferences = client.CreateDocumentQuery<Conference>(collectionLink).Where(c => c.Name == name).ToList();

            foreach (var conf in conferences)
            {
                Console.WriteLine("Found " + conf.Name + " starting on " + conf.StartDate);
            }
        }

        private static void QueryForConferenceSessions(DocumentClient client, string collectionLink, DateTime startDate)
        {
            var conferences = client.CreateDocumentQuery<Conference>(collectionLink,
                "SELECT * FROM Conferences c WHERE c.StartDate > \"" + startDate + "\"");

            foreach (var conference in conferences)
            {
                Console.WriteLine("Conference " + conference.Name + " starts on " + conference.StartDate);
            }
        }

        private static async Task RunUpdateDemoAsync(DocumentClient client)
        {
            var CosmosDBUtils = new CosmosDBUtils(client);

            var conferenceDb = await CosmosDBUtils.GetOrCreateDatabaseAsync("Conferences");

            var conferenceCollection = await CosmosDBUtils.GetOrCreateDocumentCollectionAsync(conferenceDb, "FallConferences");

            var conference = client.CreateDocumentQuery<Conference>(conferenceCollection.DocumentsLink).Where(c => c.Name == "Conference 1").AsEnumerable().FirstOrDefault();

            conference.Name = "Conference 1 Edited";

            var conferenceDoc = client.CreateDocumentQuery(conferenceCollection.DocumentsLink).Where(d => d.Id == conference.id).AsEnumerable().FirstOrDefault();

            await client.ReplaceDocumentAsync(conferenceDoc.SelfLink, conference);

            var editedConference = client.CreateDocumentQuery<Conference>(conferenceCollection.DocumentsLink).Where(c => c.Name == "Conference 1 Edited").AsEnumerable().FirstOrDefault();

            Console.WriteLine("Found conference " + editedConference.Name);
            Console.ReadKey();
        }

        private static async Task RunDeleteDemoAsync(DocumentClient client)
        {
            var CosmosDBUtils = new CosmosDBUtils(client);

            var conferenceDb = await CosmosDBUtils.GetOrCreateDatabaseAsync("Conferences");

            var conferenceCollection = await CosmosDBUtils.GetOrCreateDocumentCollectionAsync(conferenceDb, "FallConferences");

            var linqConferences = from c in client.CreateDocumentQuery(conferenceCollection.DocumentsLink)
                                  select c;

            foreach (var conference in linqConferences)
            {
                await client.DeleteDocumentAsync(conference.SelfLink);

                Console.WriteLine("Deleted Conference " + conference.Id);
            }

            Console.ReadKey();
        }

        private static async Task RunCleanEverythingAsnyc(DocumentClient client)
        {
            var CosmosDBUtils = new CosmosDBUtils(client);

            var conferenceDb = await CosmosDBUtils.GetOrCreateDatabaseAsync("Conferences");

            var conferenceCollection = await CosmosDBUtils.GetOrCreateDocumentCollectionAsync(conferenceDb, "FallConferences");

            var linqConferences = from c in client.CreateDocumentQuery(conferenceCollection.DocumentsLink)
                                  select c;

            foreach (var conference in linqConferences)
            {
                await client.DeleteDocumentAsync(conference.SelfLink);

                Console.WriteLine("Deleted Conference " + conference.Id);
            }

            var sprocs = client.CreateStoredProcedureQuery(conferenceCollection.StoredProceduresLink).Select(s => s).ToList();

            foreach (var sproc in sprocs)
            {
                await client.DeleteStoredProcedureAsync(sproc.SelfLink);

                Console.WriteLine("Deleted sproc " + sproc.Id);
            }

            Console.ReadKey();
        }

        private static async Task RunSprocDemoAsync(DocumentClient client)
        {
            var CosmosDBUtils = new CosmosDBUtils(client);

            var conferenceDb = await CosmosDBUtils.GetOrCreateDatabaseAsync("Conferences");

            var conferenceCollection = await CosmosDBUtils.GetOrCreateDocumentCollectionAsync(conferenceDb, "FallConferences");

            var mySproc = new StoredProcedure
            {
                Id = "createDocs",
                Body = "function(documentToCreate) {" +
                            "var context = getContext();" +
                            "var collection = context.getCollection();" +

                            "var accepted = collection.createDocument(collection.getSelfLink()," +
                                  "documentToCreate," +
                                "function (err, documentCreated) {" +
                                    "if (err) throw new Error('Error oh ' + documentToCreate.Name + '- ' + err.message);" +
                                    "context.getResponse().setBody(documentCreated.id)" +
                                "});" +
                            "if (!accepted) return;" +
                        "}"
            };

            var response = await client.CreateStoredProcedureAsync(conferenceCollection.SelfLink, mySproc);

            try
            {
                if (response.StatusCode == System.Net.HttpStatusCode.Created)
                {
                    dynamic conf = Conference.CreateConference(4, new DateTime(2014, 12, 1));                    

                    await client.ExecuteStoredProcedureAsync<string>(response.Resource.SelfLink, conf);

                    var linqConferences = from c in client.CreateDocumentQuery<Conference>(conferenceCollection.DocumentsLink)
                                          select c;

                    foreach (var conference in linqConferences)
                    {
                        Console.WriteLine("SPROC - Found Conference " + conference.Name + " on " + conference.StartDate);
                    }
                }
                else
                {
                    Console.WriteLine("The sproc didn't get added!");
                }
            }
            catch (Exception ex)
            {
                             
            }
            finally
            {
                client.DeleteStoredProcedureAsync(response.Resource.SelfLink).Wait();
                RunDeleteDemoAsync(client).Wait();
            }


            Console.ReadKey();
        }
    }
}
