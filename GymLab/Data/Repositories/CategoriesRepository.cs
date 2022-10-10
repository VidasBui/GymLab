using GymLab.Data.Dtos;
using GymLab.Data.Entities;
using GymLab.Helpers;
using Microsoft.EntityFrameworkCore;

namespace GymLab.Data.Repositories
{
    public interface ICategoriesRepository
    {
        Task<Category?> GetAsync(string categoryName);
        Task<IReadOnlyList<Category>> GetManyAsync();
        Task<PagedList<Category>> GetManyAsync(CategorySearchParameters searchParameters);
        Task CreateAsync(Category category);
        Task UpdateAsync(Category category);
        Task DeleteAsync(Category category);
    }

    public class CategoriesRepository : ICategoriesRepository
    {
        private readonly ForumDbContext _forumDbContext;

        public CategoriesRepository(ForumDbContext forumDbContext)
        {
            _forumDbContext = forumDbContext;
        }

        public async Task<Category?> GetAsync(string categoryName)
        {
            return await _forumDbContext.Categories.FirstOrDefaultAsync(x => x.Name == categoryName);
        }

        public async Task<IReadOnlyList<Category>> GetManyAsync()
        {
            return await _forumDbContext.Categories.ToListAsync();
        }

        public async Task<PagedList<Category>> GetManyAsync(CategorySearchParameters searchParameters) 
        {
            var queryable = _forumDbContext.Categories.AsQueryable().OrderBy(x => x.Name);
            return await PagedList<Category>.CreateAsync(queryable, searchParameters.PageNumber, searchParameters.PageSize);
        }

        public async Task CreateAsync(Category category)
        {
            _forumDbContext.Categories.Add(category);
            await _forumDbContext.SaveChangesAsync();
        }
        
        public async Task UpdateAsync(Category category)
        {
            _forumDbContext.Categories.Update(category);
            await _forumDbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(Category category)
        {
            _forumDbContext.Categories.Remove(category);
            await _forumDbContext.SaveChangesAsync();
        }
    }
}
