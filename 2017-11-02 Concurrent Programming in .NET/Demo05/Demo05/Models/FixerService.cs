using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Threading;
using System.Net;

namespace Demo05
{
    /// <summary>
    /// Service available at http://fixer.io/
    /// </summary>
    class FixerService : ICurrencyService
    {
        public async Task<double> GetRate(string currencyCode, CancellationToken token)
        {
            // throw new Exception("BAD");

            var client = new HttpClient();
            var r = await client.GetAsync($"https://api.fixer.io/latest?base=USD&symbols={currencyCode}", token);

            var o = JObject.Parse(await r.Content.ReadAsStringAsync());
            double rate = (double)o.SelectToken($"rates.{currencyCode}");

            return rate;
        }
    }
}
