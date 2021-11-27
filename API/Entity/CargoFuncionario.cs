using System;
using Newtonsoft.Json;

namespace Funcionarius.Entity
{
    public class CargoFuncionario
    {
        public Guid Id { get; set; }
        public string NomeCargo { get; set; }
        [JsonIgnore]
        public readonly Funcionario funcionario;
    }
}
