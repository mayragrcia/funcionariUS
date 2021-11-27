using Newtonsoft.Json;
using System;

namespace Funcionarius.Entity
{
    public class Funcionario
    {
        public Guid Id { get; set; }
        public string NomeCompleto { get; set; }
        public string CPF { get; set; }
        public decimal SalarioBruto { get; set; }
        public Guid IdCargoFuncionario { get; set; }
        [JsonIgnore]
        public readonly CargoFuncionario CargoFuncionario;
    }
}