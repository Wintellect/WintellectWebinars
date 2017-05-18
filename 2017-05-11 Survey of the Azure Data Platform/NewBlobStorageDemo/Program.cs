using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.WindowsAzure;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Azure;

namespace NewBlobStorageDemo
{
    class Program
    {
        static void Main(string[] args)
        {
            BasicStorageBlockBlobOperationsAsync().Wait();
            Console.ReadKey();

        }

        private static async Task BasicStorageBlockBlobOperationsAsync()
        {
            const string ImageToUpload = "HelloWorld.png";

            CloudStorageAccount storageAccount = CreateStorageAccountFromConnectionString("DefaultEndpointsProtocol=https;AccountName=;AccountKey=");
            // Create a blob client for interacting with the blob service.
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();

            // Create a container for organizing blobs within the storage account.
            Console.WriteLine("1. Creating Container");
            CloudBlobContainer container = blobClient.GetContainerReference("democontainerblockblob");
            try
            {
                await container.CreateIfNotExistsAsync();
            }
            catch (StorageException)
            {
                Console.WriteLine("If you are running with the default configuration please make sure you have started the storage emulator. Press the Windows key and type Azure Storage to select and run it from the list of applications - then restart the sample.");
                Console.ReadLine();
                throw;
            }

            
            CloudBlockBlob blockBlob = container.GetBlockBlobReference(ImageToUpload);
            await blockBlob.UploadFromFileAsync(ImageToUpload, FileMode.Open);

           
            foreach (IListBlobItem blob in container.ListBlobs())
            {
                Console.WriteLine("- {0} (type: {1})", blob.Uri, blob.GetType());
            }

            // Download a blob to your file system
            Console.WriteLine("4. Download Blob from {0}", blockBlob.Uri.AbsoluteUri);
            await blockBlob.DownloadToFileAsync(string.Format("./CopyOf{0}", ImageToUpload), FileMode.Create);

            // Clean up after the demo 
            Console.WriteLine("5. Delete block Blob");
            await blockBlob.DeleteAsync();
        }
        private static CloudStorageAccount CreateStorageAccountFromConnectionString(string storageConnectionString)
        {
            CloudStorageAccount storageAccount;
          
            storageAccount = CloudStorageAccount.Parse(storageConnectionString);

            return storageAccount;
        }
    }
}
