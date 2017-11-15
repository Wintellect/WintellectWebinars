using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Demo05
{
    /// <summary>
    /// Service available at https://openexchangerates.org/
    /// </summary>
    class OerService : ICurrencyService
    {
        private const string _app_id = "07c26258f52e4d13b359b60534164f28";

        public async Task<double> GetRate(string currencyCode, CancellationToken token)
        {
            // throw new Exception("BAD");

            var client = new HttpClient();
            var r = await client.GetAsync($"https://openexchangerates.org/api/latest.json?app_id={_app_id}&symbols={currencyCode}", token);

            var o = JObject.Parse(await r.Content.ReadAsStringAsync());
            double rate = (double)o.SelectToken($"rates.{currencyCode}");

            return rate;
        }
    }
}
