using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Demo03
{
    interface ICurrencyService
    {
        double GetRate(string currencyCode);
    }
}
