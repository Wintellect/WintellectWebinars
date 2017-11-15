using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Demo03
{
    class Program
    {
        static void Main(string[] args)
        {
            ICurrencyService svc;

            svc = new OerService();
            Console.WriteLine(svc.GetRate("EUR"));

            svc = new FixerService();
            Console.WriteLine(svc.GetRate("EUR"));

            //var svcs = new List<ICurrencyService> {
            //    new OerService(),
            //    new FixerService()
            //};

            //var tasks = new Task<double>[2];
            //tasks[0] = Task.Run<double>(() => svcs[0].GetRate("EUR"));
            //tasks[1] = Task.Run<double>(() => svcs[1].GetRate("EUR"));

            //int wr = Task.WaitAny(tasks, 5000);
            //if (wr == -1) {
            //    Console.WriteLine("Timeout!");
            //}
            //else {
            //    Console.WriteLine($"{tasks[wr].Result} ({svcs[wr].GetType().Name})");
            //}

            Console.WriteLine("====");
            Console.ReadKey();
        }
    }
}
