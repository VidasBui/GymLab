using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GymLab.Migrations
{
    public partial class initialmigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Ratings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Evaluation = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ratings", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SportPrograms",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<int>(type: "int", nullable: false),
                    Duration = table.Column<int>(type: "int", nullable: false),
                    Intensity = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Workout = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Score = table.Column<double>(type: "float", nullable: false),
                    RatingId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SportPrograms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SportPrograms_Ratings_RatingId",
                        column: x => x.RatingId,
                        principalTable: "Ratings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Categories = table.Column<int>(type: "int", nullable: false),
                    Describtion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SportProgramId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Categories);
                    table.ForeignKey(
                        name: "FK_Categories_SportPrograms_SportProgramId",
                        column: x => x.SportProgramId,
                        principalTable: "SportPrograms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Categories_SportProgramId",
                table: "Categories",
                column: "SportProgramId");

            migrationBuilder.CreateIndex(
                name: "IX_SportPrograms_RatingId",
                table: "SportPrograms",
                column: "RatingId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "SportPrograms");

            migrationBuilder.DropTable(
                name: "Ratings");
        }
    }
}
