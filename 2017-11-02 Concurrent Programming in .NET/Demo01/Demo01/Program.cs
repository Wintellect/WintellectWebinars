using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Demo01
{
    class Program
    {
        private static int i = 1;

        static void Main(string[] args)
        {
            var t = new Thread(DoWork);
            t.Start();
            Console.WriteLine($"Main thread ({i++})");
            t.Join();
            Console.WriteLine($"Main thread after join ({i++})");
            Console.ReadKey();
        }

        static void DoWork()
        {
            Console.WriteLine($"Other thread before sleep ({i++})");
            Thread.Sleep(5000);
            Console.WriteLine($"Other thread after sleep ({i++})");
        }
    }
}
