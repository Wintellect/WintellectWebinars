using DataTableStorageSample.Model;
using Microsoft.WindowsAzure;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Microsoft.Azure;

namespace DataTableStorageSample
{
    public class Program
    {
        internal const string TableName = "customer";

        public static void Main(string[] args)
        {
            CloudTable table = CreateTableAsync().Result;

            BasicTableOperationsAsync(table).Wait();
        }

        private static async Task<CloudTable> CreateTableAsync()
        {
            CloudStorageAccount storageAccount = CreateStorageAccountFromConnectionString("DefaultEndpointsProtocol=https;AccountName=");

            CloudTableClient tableClient = storageAccount.CreateCloudTableClient();

            CloudTable table = tableClient.GetTableReference(TableName);
            table.CreateIfNotExistsAsync().Wait();

            return table;
        }
        private static async Task BasicTableOperationsAsync(CloudTable table)
        {
            CustomerEntity customer = new CustomerEntity("Archer", "Sterling")
            {
                Email = "SArcher@ISIS.com",
                PhoneNumber = "425-555-0101"
            };

            customer.PhoneNumber = "425-555-0105";
            customer = await InsertOrMergeEntityAsync(table, customer);

            customer = await RetrieveEntityUsingPointQueryAsync(table, "Archer", "Sterling");

            await DeleteEntityAsync(table, customer);
        }

        
        private static CloudStorageAccount CreateStorageAccountFromConnectionString(string storageConnectionString)
        {
            CloudStorageAccount storageAccount;
            storageAccount = CloudStorageAccount.Parse(storageConnectionString);
            return storageAccount;
        }
        private static async Task<CustomerEntity> InsertOrMergeEntityAsync(CloudTable table, CustomerEntity entity)
        {
            TableOperation insertOrMergeOperation = TableOperation.InsertOrMerge(entity);

            TableResult result = await table.ExecuteAsync(insertOrMergeOperation);
            CustomerEntity insertedCustomer = result.Result as CustomerEntity;
            return insertedCustomer;
        }

        private static async Task<CustomerEntity> RetrieveEntityUsingPointQueryAsync(CloudTable table, string partitionKey, string rowKey)
        {
            TableOperation retrieveOperation = TableOperation.Retrieve<CustomerEntity>(partitionKey, rowKey);
            TableResult result = await table.ExecuteAsync(retrieveOperation);
            CustomerEntity customer = result.Result as CustomerEntity;

            return customer;
        }
        private static async Task DeleteEntityAsync(CloudTable table, CustomerEntity deleteEntity)
        {
            TableOperation deleteOperation = TableOperation.Delete(deleteEntity);
            await table.ExecuteAsync(deleteOperation);
        }

        private static async Task DeleteTableAsync(CloudTable table)
        {
            await table.DeleteIfExistsAsync();
        }
    }
}
