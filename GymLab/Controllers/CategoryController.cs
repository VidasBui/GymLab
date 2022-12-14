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

namespace GymLab.Controllers
{
    [ApiController]
    [Route("api/categories")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoriesRepository _categoriesRepository;
        private readonly IAuthorizationService _authorizationService;

        public CategoryController(ICategoriesRepository categoriesRepository, IAuthorizationService authorizationService)
        {
            _categoriesRepository = categoriesRepository;
            _authorizationService = authorizationService;
        }

        [HttpGet]
        public async Task<IEnumerable<CategoryDto>> GetMany() 
        {
            var categories = await _categoriesRepository.GetManyAsync();

            return categories.Select(x => new CategoryDto(x.Name, x.Describtion));
        }

        /*[HttpGet(Name = "GetCategories")]
        public async Task<IEnumerable<CategoryDto>> GetManyPaging([FromQuery] CategorySearchParameters searchParameters)
        {
            var categories = await _categoriesRepository.GetManyAsync(searchParameters);

            var previousPageLink = categories.HasPrevious ? 
                CreateCategoriesResourceUri(searchParameters, ResourceUriType.PreviousPage) :
                null;

            var nextPageLink = categories.HasNext ?
                CreateCategoriesResourceUri(searchParameters, ResourceUriType.NextPage) :
                null;

            var paginationMetadata = new
            {
                totalCount = categories.TotalCount,
                pageSize = categories.PageSize,
                currentPage = categories.CurrentPage,
                totalPages = categories.TotalPages,
                previousPageLink,
                nextPageLink
            };

            Response.Headers.Add("Pagination", JsonSerializer.Serialize(paginationMetadata));

            return categories.Select(x => new CategoryDto(x.Name, x.Describtion));
        }*/

        [HttpGet("{categoryName}"/*, Name = "GetCategory"*/)]
        public async Task<IActionResult> Get(string categoryName)
        {
            var category = await _categoriesRepository.GetAsync(categoryName);

            if (category == null)
                return NotFound();//404

            //var links = CreateLinksForCategory(categoryName);
            var categoryDto =  new CategoryDto(category.Name, category.Describtion);

            return Ok (new { Resource = categoryDto/*, Links = links */} );
        }

        [HttpPost]
        [Authorize(Roles = ForumRoles.Admin)]
        public async Task<ActionResult<CategoryDto>> Create(CreateCategoryDto dto)
        {
            try
            {
                var c = await _categoriesRepository.GetAsync(dto.Name);
                if (c != null) return BadRequest();//400

                var category = new Category
                {
                    Name = dto.Name,
                    Describtion = dto.Description,
                    UserId = User.FindFirstValue(JwtRegisteredClaimNames.Sub)
                    //UserId = "fb427401-aa95-46e0-9fe2-85b008da9b95"
                };
           

            await _categoriesRepository.CreateAsync(category);

            //201
            return Created ("", new CategoryDto(category.Name, category.Describtion));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message + e.InnerException.Message);
            }
        }

        [HttpPut]
        [Route("{categoryName}")]
        [Authorize(Roles = ForumRoles.Admin)]
        public async Task<ActionResult<CategoryDto>> Update(string categoryName, UpdateCategoryDto dto)
        {
            var category = await _categoriesRepository.GetAsync(categoryName);

            if (category == null)
                return NotFound();//404

            var authorizationResult = await _authorizationService.AuthorizeAsync(User, category, PolicyNames.ResourceOwner);
            if (!authorizationResult.Succeeded)
            {
                return Forbid();//403
            }

            category.Describtion = dto.Description;
            await _categoriesRepository.UpdateAsync(category);

            return Ok(new CategoryDto(category.Name, category.Describtion));
        }

        [HttpDelete("{categoryName}"/*, Name = "DeleteCategory"*/)]
        [Authorize(Roles = ForumRoles.Admin)]
        public async Task<ActionResult> Remove(string categoryName)
        {
   
                var category = await _categoriesRepository.GetAsync(categoryName);

                if (category == null)
                    return NotFound();//404

                await _categoriesRepository.DeleteAsync(category);

                return NoContent();//204
            
        }

        /*private string? CreateCategoriesResourceUri(CategorySearchParameters searchParameters, ResourceUriType type)
        {
            return type switch
            {
                ResourceUriType.PreviousPage => Url.Link("GetCategories", new
                {
                    pageNumber = searchParameters.PageNumber - 1,
                    pageSize = searchParameters.PageSize,
                }),
                ResourceUriType.NextPage => Url.Link("GetCategories", new
                {
                    pageNumber = searchParameters.PageNumber + 1,
                    pageSize = searchParameters.PageSize,
                }),
                _ => Url.Link("GetCategories", new
                {
                    pageNumber = searchParameters.PageNumber,
                    pageSize = searchParameters.PageSize,
                })
            };
        }

        private IEnumerable<LinkDto> CreateLinksForCategory(string categoryName)
        {
            yield return new LinkDto { Href = Url.Link("GetCategory", new { categoryName }), Rel = "self", Method = "GET" };
            yield return new LinkDto { Href = Url.Link("DeleteCategory", new { categoryName }), Rel = "delete_topic", Method = "DELETE" };
        }*/

    }
}
