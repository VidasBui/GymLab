using GymLab.Data.Entities;
using Type = GymLab.Data.Entities.Type;

namespace GymLab.Data.Dtos
{
    public record SportProgramDto(int Id, Type Type, Duration Duration, Intensity Intensity, string Description, string Workout, double Score);
    public record CreateSportProgramDto(Type Type, Duration Duration, Intensity Intensity, string Description, string Workout);
    public record UpdateSportProgramDto(int Id, Type Type, Duration Duration, Intensity Intensity, string Description, string Workout, double Score);
}
