using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Demo05.Models;
using System.Threading;

namespace Demo05.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public async Task<IActionResult> CurrencyRate()
        {
            var svcs = new List<ICurrencyService> {
                new FixerService(),
                new OerService()
            };
            var cts = new CancellationTokenSource(5000);
            var tasks = svcs.Select(svc => svc.GetRate("EUR", cts.Token)).ToList();
            double retVal = 0;

            while (tasks.Count > 0) {
                var t = await Task.WhenAny(tasks);
                if (t.IsCompletedSuccessfully) {
                    retVal = t.Result;
                    cts.Cancel();
                    break;
                }
                tasks.Remove(t);
            }            
            return Content(retVal == 0 ? "Unable to get data" : retVal.ToString());
        }
    }
}
