using GymLab.Data.Entities;
using Type = GymLab.Data.Entities.Type;

namespace GymLab.Data.Dtos
{
    public record RatingDto(int Id, string? Comment, int Evaluation);
    public record CreateRatingDto(string? Comment, int Evaluation);
    public record UpdateRatingDto(int Id, string? Comment, int Evaluation);
}
