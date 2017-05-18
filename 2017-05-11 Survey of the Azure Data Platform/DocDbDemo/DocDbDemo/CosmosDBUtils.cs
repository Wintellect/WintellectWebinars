using System;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;
using CosmosDBDemo.Models;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents.Linq;

namespace CosmosDBDemo
{
    public class CosmosDBUtils
    {       
        private DocumentClient _client;

        public CosmosDBUtils(DocumentClient client)
        {
            _client = client;
        }

        public async Task<Database> GetOrCreateDatabaseAsync(string id)
        {
            var database = _client.CreateDatabaseQuery().Where(db => db.Id == id).AsEnumerable().FirstOrDefault();

            if (database == null)
            {
                return await _client.CreateDatabaseAsync(new Database { Id = id });    
            }

            return database;
        }

        public async Task<DocumentCollection> GetOrCreateDocumentCollectionAsync(Database db, string id)
        {
            var collection = _client.CreateDocumentCollectionQuery(db.CollectionsLink).Where(c => c.Id == id).AsEnumerable().FirstOrDefault();

            if (collection == null)
            {
                return await _client.CreateDocumentCollectionAsync(db.CollectionsLink, new DocumentCollection { Id = id });   
            }

            return collection;
        }

        public async Task CreateDocumentAsync<T>(DocumentCollection collection, T documentObj)
        {            
            await _client.CreateDocumentAsync(collection.DocumentsLink, documentObj);
        }
    }
}
