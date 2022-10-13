using GymLab.Data;
using GymLab.Data.Dtos;
using GymLab.Data.Entities;
using GymLab.Data.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace GymLab.Controllers
{
    [ApiController]
    [Route("api/categories")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoriesRepository _categoriesRepository;

        public CategoryController(ICategoriesRepository categoriesRepository)
        {
            _categoriesRepository = categoriesRepository;
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
        public async Task<ActionResult<CategoryDto>> Create(CreateCategoryDto dto)
        {
            var c = await _categoriesRepository.GetAsync(dto.Name);
            if (c != null) return BadRequest();//400

            var category = new Category { Name = dto.Name, Describtion = dto.Description };
            await _categoriesRepository.CreateAsync(category);

            //201
            return Created ("", new CategoryDto(category.Name, category.Describtion));
        }

        [HttpPut]
        [Route("{categoryName}")]
        public async Task<ActionResult<CategoryDto>> Update(string categoryName, UpdateCategoryDto dto)
        {
            var category = await _categoriesRepository.GetAsync(categoryName);

            if (category == null)
                return NotFound();//404

            category.Describtion = dto.Description;
            await _categoriesRepository.UpdateAsync(category);

            return Ok(new CategoryDto(category.Name, category.Describtion));
        }

        [HttpDelete("{categoryName}"/*, Name = "DeleteCategory"*/)]
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
