using Funcionarius.Entity;
using Funcionarius.Services;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Funcionarius.Repository
{
    public class FuncionariusRepository : IFuncionariusRepository
    {
        private readonly FuncionariusContext _context;

        public FuncionariusRepository(FuncionariusContext context)
        {
            _context = context;
        }
        //Gerais
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }
        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }
        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }
        public void DeleteRange<T>(T[] entityArray) where T : class
        {
            _context.RemoveRange(entityArray);
        }
        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }

        public async Task<List<CargoFuncionario>> GetAll()
        {
            IQueryable<CargoFuncionario> query = _context.CargoFuncionario;
            query = query.AsNoTracking().OrderBy(c => c.Id);
            return await query.ToListAsync();
        }

        public async Task<CargoFuncionario> GetCargoFuncionarioAsyncById(Guid Id)
        {
            IQueryable<CargoFuncionario> query = _context.CargoFuncionario;
            query = query.AsNoTracking().OrderBy(c => c.Id)
            .Where(c => c.Id == Id);
            return await query.FirstOrDefaultAsync();
        }

        public async Task<List<Funcionario>> GetAllFuncionarioAsync()
        {
            IQueryable<Funcionario> query = _context.Funcionario;
            query = query.AsNoTracking().OrderBy(c => c.Id);
            return await query.ToListAsync();
        }
        public async Task<Funcionario> GetFuncionarioAsyncById(Guid Id)
        {
            IQueryable<Funcionario> query = _context.Funcionario;
            query = query.AsNoTracking().OrderBy(c => c.Id)
            .Where(c => c.Id == Id);
            return await query.FirstOrDefaultAsync();
        }

        public async Task<List<Funcionario>> GetFuncionariosAsyncByCargo(Guid IdCargoFuncionario)
        {
            IQueryable<Funcionario> query = _context.Funcionario;
            query = query.AsNoTracking().OrderBy(c => c.IdCargoFuncionario);
            return await query.ToListAsync(); 
        }
        public async Task<Funcionario> GetFuncionariosAsyncByCpf(String cpf)
        {
            IQueryable<Funcionario> query = _context.Funcionario;
            query = query.AsNoTracking().OrderBy(c => c.Id)
            .Where(c => c.CPF == cpf);
            return await query.FirstOrDefaultAsync();
        }
        public async Task<List<FolhaSalarial>> GetFolhaSalarialByFuncionarioId(Guid IdFuncionario)
        {
            IQueryable<FolhaSalarial> query = _context.FolhaSalarial;
            query = query.AsNoTracking().OrderBy(c => c.Id)
            .Where(c => c.FuncionarioID == IdFuncionario);
            return await query.ToListAsync();
        }
        public async Task<FolhaSalarial[]> GetAllFolhaSalarialAsync()
        {
            IQueryable<FolhaSalarial> query = _context.FolhaSalarial;
            query = query.AsNoTracking().OrderBy(c => c.Id);
            return await query.ToArrayAsync();
        }
        public async Task<FolhaSalarial> GetFolhaSalarialAsyncById(Guid Id)
        {
            IQueryable<FolhaSalarial> query = _context.FolhaSalarial;
            query = query.AsNoTracking().OrderBy(c => c.Id)
            .Where(c => c.Id == Id);
            return await query.FirstOrDefaultAsync();
        }

        public async Task<FolhaSalarial> CalcularFolhaSalarial(string cpf, int horasTrabalhadas)
        {
            FolhaSalarialService folha = new FolhaSalarialService();
            return await folha.CalcularFolhaSalarialFuncionario(horasTrabalhadas, GetFuncionariosAsyncByCpf(cpf).Result);
        }

        public async Task<FolhaSalarial> CalcularFolhaSalarialFuncionarioById(Guid FuncionarioId, int horasTrabalhadas)
        {
            FolhaSalarialService folha = new FolhaSalarialService();
            return await folha.CalcularFolhaSalarialFuncionario(horasTrabalhadas, GetFuncionarioAsyncById(FuncionarioId).Result);
        }
    }
}
