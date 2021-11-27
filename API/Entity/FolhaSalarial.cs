using Newtonsoft.Json;
using System;

namespace Funcionarius.Entity
{
    public class FolhaSalarial
    {
        public Guid Id { get; set; }
        public Guid FuncionarioID { get; set; }
        public DateTime Competencia { get; set; }
        public string NomeFuncionario { get; set; }
        public int HorasTrabalhadas { get; set; }
        public Guid IdCargoFuncionario { get; set; }
        [JsonIgnore]
        public readonly CargoFuncionario CargoFuncionario;
        public decimal SalarioBruto { get; set; }
        public decimal SalarioLiquido { get; set; }
        public decimal INSS { get; set; }
        public decimal IRRF { get; set; }
    }
}
