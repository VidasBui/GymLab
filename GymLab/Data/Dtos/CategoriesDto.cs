namespace GymLab.Data.Dtos
{
    public record CategoryDto(string Name, string Description);
    public record CreateCategoryDto(string Name, string Description);
    public record UpdateCategoryDto(string Description);
}
