using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Demo04
{
    class Program
    {
        static void Main(string[] args)
        {
            var svcs = new List<ICurrencyService> {
                new OerService(),
                new FixerService()
            };

            var cts = new CancellationTokenSource();

            foreach (var svc in svcs) {
                Task.Run(() => svc.GetRate("EUR", cts.Token))
                    .ContinueWith(t => {  ProcessResults(t); }, 
                    TaskContinuationOptions.OnlyOnRanToCompletion);
            }
            
            Console.WriteLine("====");
            Console.ReadKey();
        }

        static void ProcessResults(Task<double> task)
        {
            Console.WriteLine(task.Result);
        }
    }
}
