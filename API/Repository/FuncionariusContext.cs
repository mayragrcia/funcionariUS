using Funcionarius.Entity;
using Microsoft.EntityFrameworkCore;

namespace Funcionarius.Repository
{
    public class FuncionariusContext : DbContext
    {
        public FuncionariusContext(DbContextOptions<FuncionariusContext> options) : base(options) { }

        public DbSet<Funcionario> Funcionario { get; set; }
        public DbSet<CargoFuncionario> CargoFuncionario { get; set;}
        public DbSet<FolhaSalarial> FolhaSalarial { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
