using GymLab.Auth.Model;
using System.ComponentModel.DataAnnotations;

namespace GymLab.Data.Entities
{
    public class Rating : IUserOwnedResource
    { 
        public int Id { get; set; }
        public string? Comment { get; set; }
        public int Evaluation { get; set; }
        public SportProgram SportProgram { get; set; }
        [Required]
        public string UserId { get; set; }
        public ForumRestUser User { get; set; }
    }
}
