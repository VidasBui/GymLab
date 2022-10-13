using GymLab.Data;
using GymLab.Data.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Microsoft.EntityFrameworkCore.SqlServer
// Microsoft.EntityFrameworkCore.Tools
// dotnet tool install --global dotnet-ef
// dotnet ef migrations add
// dotnet ef database update

builder.Services.AddControllers();

builder.Services.AddDbContext<ForumDbContext>();//for sql generation
builder.Services.AddTransient<ICategoriesRepository, CategoriesRepository>();
builder.Services.AddTransient<ISportProgramsRepository, SportProgramsRepository>();
builder.Services.AddTransient<IRatingsRepository, RatingsRepository>();

var app = builder.Build();

app.UseRouting();
app.MapControllers();

app.Run();