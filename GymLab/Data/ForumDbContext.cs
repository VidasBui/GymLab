using GymLab.Auth.Model;
using GymLab.Data.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace GymLab.Data
{
    public class ForumDbContext : IdentityDbContext<ForumRestUser>
    {
        public DbSet<Category> Categories { get; set; }
        public DbSet<SportProgram> SportPrograms { get; set; }
        public DbSet<Rating> Ratings { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB; Initial Catalog=ForumDb2");
            optionsBuilder.UseSqlServer("Server=tcp:gymlabserver.database.windows.net,1433;Initial Catalog=ForumDatabase;Persist Security Info=False;User ID=vidbui;Password=Makendosas4;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
        }
    }
}
