using GymLab.Data.Dtos;
using GymLab.Data.Entities;
using GymLab.Data.Repositories;
using Microsoft.AspNetCore.Mvc;

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

        [HttpGet]
        [Route("{categoryName}", Name = "GetCategory")]
        public async Task<ActionResult<CategoryDto>> Get(string categoryName)
        {
            var category = await _categoriesRepository.GetAsync(categoryName);

            if (category == null)
                return NotFound();//404
            return new CategoryDto(category.Name, category.Describtion);
        }

        [HttpPost]
        public async Task<ActionResult<CategoryDto>> Create(CreateCategoryDto dto)
        {
            var category = new Category { Name = dto.Name, Describtion = dto.Description };
            await _categoriesRepository.CreateAsync(category);

            //201
            return CreatedAtAction("GetCategory",
                new {categoryName = category.Name}, 
                new CategoryDto(category.Name, category.Describtion));
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

        [HttpDelete]
        [Route("{categoryName}")]
        public async Task<ActionResult> Remove(string categoryName)
        {
            var category = await _categoriesRepository.GetAsync(categoryName);

            if (category == null)
                return NotFound();//404

            await _categoriesRepository.DeleteAsync(category);

            return NoContent();//204
        }

    }
}
