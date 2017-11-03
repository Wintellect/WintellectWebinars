using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Threading;

namespace Demo03
{
    /// <summary>
    /// Service available at http://fixer.io/
    /// </summary>
    class FixerService : ICurrencyService
    {
        public double GetRate(string currencyCode)
        {
            var client = new HttpClient();
            var r = client.GetStringAsync($"https://api.fixer.io/latest?base=USD&symbols={currencyCode}").Result;
            var o = JObject.Parse(r);

            double rate = (double)o.SelectToken($"rates.{currencyCode}");

            //Thread.Sleep(5000);
            //Console.WriteLine("YO");

            return rate;
        }
    }
}
