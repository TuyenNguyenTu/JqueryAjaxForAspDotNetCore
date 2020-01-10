using JqueryAjaxForAspDotNetCore.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JqueryAjaxForAspDotNetCore.Repository
{
    public class ClassDbContext :DbContext
    {
        public ClassDbContext(DbContextOptions<ClassDbContext> options):base(options)
        {

        }
        public DbSet<Employee> Employees { set; get; }
    }
}
