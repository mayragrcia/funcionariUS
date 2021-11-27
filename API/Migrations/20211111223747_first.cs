using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Funcionarius.Migrations
{
    public partial class first : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CargoFuncionario",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NomeCargo = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CargoFuncionario", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FolhaSalarial",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FuncionarioID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Competencia = table.Column<DateTime>(type: "datetime2", nullable: false),
                    NomeFuncionario = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HorasTrabalhadas = table.Column<int>(type: "int", nullable: false),
                    IdCargoFuncionario = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SalarioBruto = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    SalarioLiquido = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    INSS = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    IRRF = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FolhaSalarial", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Funcionario",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NomeCompleto = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CPF = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SalarioBruto = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    IdCargoFuncionario = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Funcionario", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CargoFuncionario");

            migrationBuilder.DropTable(
                name: "FolhaSalarial");

            migrationBuilder.DropTable(
                name: "Funcionario");
        }
    }
}
