using GymLab.Data.Dtos;
using GymLab.Data.Entities;
using GymLab.Helpers;
using Microsoft.EntityFrameworkCore;
using System.Runtime.InteropServices;

namespace GymLab.Data.Repositories
{
    public interface IRatingsRepository
    {
        Task<Rating?> GetAsync(int ratingId);
        Task<IReadOnlyList<Rating>> GetManyAsync(int programId);
        Task CreateAsync(Rating rating, int programId);
        Task UpdateAsync(Rating rating);
        Task DeleteAsync(Rating rating);
    }

    public class RatingsRepository : IRatingsRepository
    {
        private readonly ForumDbContext _forumDbContext;

        public RatingsRepository(ForumDbContext forumDbContext)
        {
            _forumDbContext = forumDbContext;
        }

        public async Task<Rating?> GetAsync(int ratingId)
        {
            return await _forumDbContext.Ratings.FirstOrDefaultAsync(x => x.Id == ratingId);
        }

        public async Task<IReadOnlyList<Rating>> GetManyAsync(int programId)
        {
            return await _forumDbContext.Ratings.Where(x => x.SportProgram.Id == programId).ToListAsync();
        }

        public async Task CreateAsync(Rating rating, int programId)
        {
            var program = _forumDbContext.SportPrograms.FirstOrDefault(x => x.Id == programId);
            
            if (program != null){
                var total_rating_count = _forumDbContext.Ratings.Where(x => x.SportProgram.Id == program.Id).Count();
                var score = ((total_rating_count * program.Score) + rating.Evaluation) / (total_rating_count + 1);
                program.Score = score;
                rating.SportProgram = program;
            }

            _forumDbContext.Ratings.Add(rating);
            await _forumDbContext.SaveChangesAsync();
        }
        
        public async Task UpdateAsync(Rating rating)
        {
            _forumDbContext.Ratings.Update(rating);
            await _forumDbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(Rating rating)
        {
            _forumDbContext.Ratings.Remove(rating);
            await _forumDbContext.SaveChangesAsync();
        }
    }
}
