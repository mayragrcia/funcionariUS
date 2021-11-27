using System;

namespace Funcionarius.DTO
{
    public class FolhaSalariaDTO
    {
        public Guid? Id { get; set; }
        public Guid FuncionarioID { get; set; }
        public DateTime Competencia { get; set; }
        public int HorasTrabalhadas { get; set; }
    }
}
