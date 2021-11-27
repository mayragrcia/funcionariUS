using AutoMapper;
using Funcionarius.DTO;
using Funcionarius.Entity;

namespace Funcionarius.Helper
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<FolhaSalarial, FolhaSalariaDTO>().ReverseMap();
            CreateMap<Funcionario, InserirFuncionarioDTO>().ReverseMap();
            CreateMap<CargoFuncionario,CargoFuncionarioDTO>().ReverseMap();
        }
    }
}
