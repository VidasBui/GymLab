using GymLab.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace GymLab.Data
{
    public class ForumDbContext : DbContext
    {
        public DbSet<Category> Categories { get; set; }
        public DbSet<SportProgram> SportPrograms { get; set; }
        public DbSet<Rating> Ratings { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB; Initial Catalog=ForumDb2");
        }
    }
}
