using GymLab.Auth.Model;
using GymLab.Data;
using GymLab.Data.Dtos;
using GymLab.Data.Entities;
using GymLab.Data.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text.Json;
using System.Xml;

namespace GymLab.Controllers
{
    [ApiController]
    [Route("api/categories/{categoryName}/sportPrograms")]
    public class SportProgramController : ControllerBase
    {
        private readonly ISportProgramsRepository _programsRepository;
        private readonly IAuthorizationService _authorizationService;

        public SportProgramController(ISportProgramsRepository programsRepository, IAuthorizationService authorizationService)
        {
            _programsRepository = programsRepository;
            _authorizationService = authorizationService;
        }

        [HttpGet]
        public async Task<IEnumerable<SportProgramDto>> GetMany(string categoryName)
        {
            var categories = await _programsRepository.GetManyAsync(categoryName);

            return categories.Select(x => new SportProgramDto(x.Id, x.Type, x.Duration, x.Intensity, x.Description, x.Workout, x.Score));
        }

        /*[HttpGet(Name = "GetSportPrograms")]
        public async Task<IEnumerable<SportProgramDto>> GetManyPaging(string categoryName, [FromQuery] SportProgramSearchParameters searchParameters)
        {
            var programs = await _programsRepository.GetManyAsync(categoryName, searchParameters);

            var previousPageLink = programs.HasPrevious ?
                CreateSportProgramsResourceUri(searchParameters, ResourceUriType.PreviousPage) :
                null;

            var nextPageLink = programs.HasNext ?
                CreateSportProgramsResourceUri(searchParameters, ResourceUriType.NextPage) :
                null;

            var paginationMetadata = new
            {
                totalCount = programs.TotalCount,
                pageSize = programs.PageSize,
                currentPage = programs.CurrentPage,
                totalPages = programs.TotalPages,
                previousPageLink,
                nextPageLink
            };

            Response.Headers.Add("Pagination", JsonSerializer.Serialize(paginationMetadata));

            return programs.Select(x => new SportProgramDto(x.Id, x.Type, x.Duration, x.Intensity, x.Description, x.Workout, x.Score));
        }*/
        
        [HttpGet("{programId}"/*, Name = "GetSportPrograms"*/)]
        public async Task<IActionResult> Get(string categoryName, int programId)
        {
            var program = await _programsRepository.GetAsync(programId, categoryName);

            if (program == null)
                return NotFound();//404

            //var links = CreateLinksForSportProgram(programId);
            var programDto = new SportProgramDto(program.Id, program.Type, program.Duration, program.Intensity, program.Description, program.Workout, program.Score);

            return Ok(new { Resource = programDto/*, Links = links */});
        }

        [HttpPost]
        [Authorize(Roles = ForumRoles.ForumUser)]
        public async Task<ActionResult<SportProgramDto>> Create(SportProgramDto dto, string categoryName)
        {
            var program = new SportProgram {
                Type = dto.Type,
                Duration = dto.Duration,
                Intensity = dto.Intensity,
                Description = dto.Description,
                Workout = dto.Workout,
                Score = 0,
                UserId = User.FindFirstValue(JwtRegisteredClaimNames.Sub)
            };

            await _programsRepository.CreateAsync(program, categoryName);

            //201
            return Created("201", new SportProgramDto(program.Id, program.Type, program.Duration, program.Intensity, program.Description, program.Workout, program.Score));
        }

        [HttpPut("{programId}")]
        [Authorize(Roles = ForumRoles.ForumUser)]
        public async Task<ActionResult<SportProgramDto>> Update(int programId, string categoryName, UpdateSportProgramDto dto)
        {
            var program = await _programsRepository.GetAsync(programId, categoryName);

            if (program == null)
                return NotFound();//404

            var authorizationResult = await _authorizationService.AuthorizeAsync(User, program, PolicyNames.ResourceOwner);
            if (!authorizationResult.Succeeded)
            {
                return Forbid();//403
            }

            program.Type = dto.Type;
            program.Duration = dto.Duration;
            program.Intensity = dto.Intensity;
            program.Description = dto.Description;
            program.Workout = dto.Workout;
            program.Score = dto.Score;
            await _programsRepository.UpdateAsync(program);

            return Ok(new SportProgramDto(program.Id, program.Type, program.Duration, program.Intensity, program.Description, program.Workout, program.Score));
        }

        [HttpDelete("{programId}")]
        [Authorize(Roles = ForumRoles.ForumUser)]
        public async Task<ActionResult> Remove(int programId, string categoryName)
        {
            var program = await _programsRepository.GetAsync(programId, categoryName);

            if (program == null)
                return NotFound();//404

            var authorizationResult = await _authorizationService.AuthorizeAsync(User, program, PolicyNames.ResourceOwner);
            if (!authorizationResult.Succeeded)
            {
                return Forbid();//403
            }

            await _programsRepository.DeleteAsync(program);

            return NoContent();//204
        }

        /*private string? CreateSportProgramsResourceUri(SportProgramSearchParameters searchParameters, ResourceUriType type)
        {
            return type switch
            {
                ResourceUriType.PreviousPage => Url.Link("GetSportPrograms", new
                {
                    pageNumber = searchParameters.PageNumber - 1,
                    pageSize = searchParameters.PageSize,
                }),
                ResourceUriType.NextPage => Url.Link("GetSportPrograms", new
                {
                    pageNumber = searchParameters.PageNumber + 1,
                    pageSize = searchParameters.PageSize,
                }),
                _ => Url.Link("GetSportPrograms", new
                {
                    pageNumber = searchParameters.PageNumber,
                    pageSize = searchParameters.PageSize,
                })
            };
        }
        private IEnumerable<LinkDto> CreateLinksForSportProgram(int programId)
        {
            yield return new LinkDto { Href = Url.Link("GetSportProgram", new { programId }), Rel = "self", Method = "GET" };
            yield return new LinkDto { Href = Url.Link("DeleteSportProgram", new { programId }), Rel = "delete_sport_program", Method = "DELETE" };
        }*/
    }

}
