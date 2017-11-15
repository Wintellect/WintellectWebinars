using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Demo04
{
    /// <summary>
    /// Service available at https://openexchangerates.org/
    /// </summary>
    class OerService : ICurrencyService
    {
        private const string _app_id = "07c26258f52e4d13b359b60534164f28";

        public double GetRate(string currencyCode, CancellationToken token)
        {
            var client = new HttpClient();
            var r = client.GetStringAsync($"https://openexchangerates.org/api/latest.json?app_id={_app_id}&symbols={currencyCode}").Result;
            var o = JObject.Parse(r);

            double rate = (double)o.SelectToken($"rates.{currencyCode}");

            token.ThrowIfCancellationRequested();

            return rate;
        }
    }
}
