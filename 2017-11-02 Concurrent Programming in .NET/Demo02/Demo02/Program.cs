using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Demo02
{
    class Program
    {
        static void Main(string[] args)
        {
            Task t = new Task(DoWork);
            t.Start();
            Console.WriteLine("Hello from main thread");

            /*
            var actions = new List<Func<int>>();

            int variable = 0;

            while (variable < 5) {
                actions.Add(() => variable * 2);
                ++variable;
            }

            foreach (var act in actions) {
                Console.WriteLine(act.Invoke());
            }
            */
            
            Console.ReadKey();
        }

        static void DoWork()
        {
            Console.WriteLine("Hello from Task");
        }
    }
}
