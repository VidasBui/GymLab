using GymLab.Data.Dtos;
using GymLab.Data.Entities;
using GymLab.Data.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace GymLab.Controllers
{
    [ApiController]
    [Route("api/categories/{categoryName}/sportPrograms/{programId}/ratings")]
    public class RatingController : ControllerBase
    {
        private readonly IRatingsRepository _ratingsRepository;
        public RatingController(IRatingsRepository ratingsRepository)
        {
            _ratingsRepository = ratingsRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<RatingDto>> GetMany(int programId)
        {
            var ratings = await _ratingsRepository.GetManyAsync(programId);

            return ratings.Select(x => new RatingDto(x.Id, x.Comment, x.Evaluation));
        }

        [HttpGet("{ratingId}")]
        public async Task<IActionResult> Get(int ratingId)
        {
            var rating = await _ratingsRepository.GetAsync(ratingId);

            if (rating == null)
                return NotFound();//404

            var ratingDto = new RatingDto(rating.Id, rating.Comment, rating.Evaluation);

            return Ok(new { Resource = ratingDto/*, Links = links */});
        }

        [HttpPost]
        public async Task<ActionResult<RatingDto>> Create(RatingDto dto, int programId)
        {

            var rating = new Rating { Comment = dto.Comment, Evaluation = dto.Evaluation};

            if (rating.Evaluation > 5 || rating.Evaluation < 1) return BadRequest();//400

           await _ratingsRepository.CreateAsync(rating, programId);

            //201
            return Created("201", new RatingDto(rating.Id, rating.Comment, rating.Evaluation));
        }

        [HttpPut("{ratingId}")]
        public async Task<ActionResult<RatingDto>> Update(int ratingId, UpdateRatingDto dto)
        {
            var rating = await _ratingsRepository.GetAsync(ratingId);

            if (rating == null)
                return NotFound();//404

            rating.Comment = dto.Comment;
            rating.Evaluation = dto.Evaluation;
            await _ratingsRepository.UpdateAsync(rating);

            return Ok(new RatingDto(rating.Id, rating.Comment, rating.Evaluation));
        }

        [HttpDelete("{ratingId}")]
        public async Task<ActionResult> Remove(int ratingId)
        {
            var rating = await _ratingsRepository.GetAsync(ratingId);

            if (rating == null)
                return NotFound();//404

            await _ratingsRepository.DeleteAsync(rating);

            return NoContent();//204
        }
    }
}
