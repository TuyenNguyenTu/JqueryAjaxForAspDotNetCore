using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using JqueryAjaxForAspDotNetCore.Models;
using JqueryAjaxForAspDotNetCore.Repository;
using Newtonsoft.Json;

namespace JqueryAjaxForAspDotNetCore.Controllers
{
    public class HomeController : Controller
    {
        public readonly ClassDbContext context;
        public HomeController(ClassDbContext _context)
        {
            context = _context;
        }
        public IActionResult Index()
        {
            return View();
        }
        public JsonResult LoadData(int page = 1, int pageSize = 5)
        {
            List<Employee> listEmp = context.Employees.Skip((page-1)*pageSize).Take(pageSize).ToList();
            var totalRow = listEmp.Count;
            return Json(new
            {
                data = listEmp,
                total = totalRow,
                status = true
            });
        }
        [HttpPost]
        public JsonResult Update(string strEmployee)
        {
            //Convert
            var data = JsonConvert.DeserializeObject<Employee>(strEmployee);
            var model = context.Employees.Find(data.Id);
            model.Age = data.Age;
            context.SaveChangesAsync();
            return Json(new
            {
                status = true
            });
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

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
