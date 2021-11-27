using Funcionarius.Entity;
using System;
using System.Text.Json.Serialization;

namespace Funcionarius.DTO
{
    public class InserirFuncionarioDTO
    {
        public Guid? Id { get; set; }
        public string NomeCompleto { get; set; }
        public string CPF { get; set; }
        public decimal SalarioBruto { get; set; }
        public Guid IdCargoFuncionario { get; set; }
        [JsonIgnore]
        public readonly CargoFuncionario CargoFuncionario;
    }
}
