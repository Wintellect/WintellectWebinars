using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Demo05
{
    interface ICurrencyService
    {
        Task<double> GetRate(string currencyCode, CancellationToken token);
    }
}
