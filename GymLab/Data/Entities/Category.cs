using GymLab.Auth.Model;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace GymLab.Data.Entities
{
    public class Category
    {
        [Key]
        public string Name { get; set; }
        public string Describtion { get; set; }

        [Required]
        public string UserId { get; set; }
        public ForumRestUser User { get; set; }
    }

}
