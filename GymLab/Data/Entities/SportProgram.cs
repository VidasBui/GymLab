namespace GymLab.Data.Entities
{
    public class SportProgram
    {
        public int Id { get; set; }
        public Type Type { get; set; }
        public Duration Duration{ get; set; }
        public Intensity Intensity { get; set; }
        public string Description { get; set; }
        public string Workout { get; set; }
        public double Score { get; set; }
        public Rating Rating { get; set; }
    }
    public enum Type
    {
        begginer,
        intermediate,
        advanced
    }
    public enum Duration
    {
        week_1,
        weeks_2,
        weeks_3,
        weeks_4,
        weeks_5,
        weeks_6,
        weeks_7,
        weeks_8_and_more,
    }
    public enum Intensity
    {
        Low,
        Moderate,
        High
    }
}
