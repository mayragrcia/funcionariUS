using Funcionarius.Entity;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Funcionarius.Repository
{
    public interface IFuncionariusRepository
    {
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        void DeleteRange<T>(T[] entity) where T : class;
        Task<bool> SaveChangesAsync();


        Task<List<CargoFuncionario>> GetAll();
        Task<CargoFuncionario> GetCargoFuncionarioAsyncById(Guid Id);


        Task<List<Funcionario>> GetAllFuncionarioAsync();
        Task<Funcionario> GetFuncionarioAsyncById(Guid Id);
        Task<List<Funcionario>> GetFuncionariosAsyncByCargo(Guid IdCargoFuncionario);
        Task<Funcionario> GetFuncionariosAsyncByCpf(String cpf);


        Task<FolhaSalarial[]> GetAllFolhaSalarialAsync();
        Task<FolhaSalarial> GetFolhaSalarialAsyncById(Guid Id);
        Task<List<FolhaSalarial>> GetFolhaSalarialByFuncionarioId(Guid IdFuncionario);
        Task<FolhaSalarial> CalcularFolhaSalarial(string cpf, int horasTrabalhadas);
        Task<FolhaSalarial> CalcularFolhaSalarialFuncionarioById(Guid FuncionarioId, int horasTrabalhadas);
    }
}

