using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace JqueryAjaxForAspDotNetCore.Models
{
    public class Employee
    {
        [Key]
        public long Id { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string Name { set; get; }
        public int Age { set; get; }
        public bool Status { set; get; }
    }
}
