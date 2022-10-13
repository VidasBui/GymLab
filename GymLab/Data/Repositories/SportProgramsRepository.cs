using GymLab.Data.Dtos;
using GymLab.Data.Entities;
using GymLab.Helpers;
using Microsoft.EntityFrameworkCore;

namespace GymLab.Data.Repositories
{
    public interface ISportProgramsRepository
    {
        Task<SportProgram?> GetAsync(int programId, string categoryName);
        Task<IReadOnlyList<SportProgram>> GetManyAsync(string categoryName);
        Task<PagedList<SportProgram>> GetManyAsync(string categoryName, SportProgramSearchParameters searchParameters);
        Task CreateAsync(SportProgram program, string categoryName);
        Task UpdateAsync(SportProgram program);
        Task DeleteAsync(SportProgram program);
    }

    public class SportProgramsRepository : ISportProgramsRepository
    {
        private readonly ForumDbContext _forumDbContext;

        public SportProgramsRepository(ForumDbContext forumDbContext)
        {
            _forumDbContext = forumDbContext;
        }

        public async Task<SportProgram?> GetAsync(int programId, string categoryName)
        {
            return await _forumDbContext.SportPrograms.FirstOrDefaultAsync(x => x.Id == programId && x.Category.Name == categoryName);
        }

        public async Task<IReadOnlyList<SportProgram>> GetManyAsync(string categoryName)
        {
            return await _forumDbContext.SportPrograms.Where(x => x.Category.Name == categoryName).ToListAsync();
        }

        public async Task<PagedList<SportProgram>> GetManyAsync(string categoryName, SportProgramSearchParameters searchParameters) 
        {
            var queryable = _forumDbContext.SportPrograms.Where(x => x.Category.Name == categoryName).AsQueryable().OrderByDescending(x => x.Score);
            return await PagedList<SportProgram>.CreateAsync(queryable, searchParameters.PageNumber, searchParameters.PageSize);
        }

        public async Task CreateAsync(SportProgram program, string categoryName)
        {
            var category = _forumDbContext.Categories.FirstOrDefault(x => x.Name == categoryName);
            if(category != null) program.Category = category;
            _forumDbContext.SportPrograms.Add(program);
            await _forumDbContext.SaveChangesAsync();
        }
        
        public async Task UpdateAsync(SportProgram program)
        {
            _forumDbContext.SportPrograms.Update(program);
            await _forumDbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(SportProgram program)
        {
            _forumDbContext.SportPrograms.Remove(program);
            await _forumDbContext.SaveChangesAsync();
        }
    }
}
