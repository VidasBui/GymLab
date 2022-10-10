using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace GymLab.Data.Entities
{
    public class Category
    {
        [Key]
        public string Name { get; set; }
        public string Describtion { get; set; }
    }

}
