using AutoMapper;
using Funcionarius.DTO;
using Funcionarius.Entity;
using Funcionarius.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Funcionarius.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class FuncionarioController : ControllerBase
    {
        private readonly IFuncionariusRepository _repo;
        private readonly IMapper _mapper;
        public FuncionarioController(IFuncionariusRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }
        [HttpGet("")]
        public async Task<IActionResult> ObterTodosFuncionarios()
        {
            try
            {
                return Ok(_repo.GetAllFuncionarioAsync().Result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Banco Dados Falhou {ex.Message}");
            }
        }
        [HttpGet("GetFuncionarioByCargo{IdCargoFuncionario}")]
        public async Task<IActionResult> GetFuncionarioByCargo(Guid IdCargoFuncionario)
        {
            try
            {
                return Ok(_repo.GetFuncionariosAsyncByCargo(IdCargoFuncionario).Result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Banco Dados Falhou {ex.Message}");
            }
        }
        [HttpGet("GetFuncionarioByCPF")]
        public async Task<IActionResult> GetFuncionarioByCPF(String cpf)
        {
            try
            {
                return Ok(_repo.GetFuncionariosAsyncByCpf(cpf).Result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Banco Dados Falhou {ex.Message}");
            }
        }

        [HttpGet("{FuncionarioId}")]
        public async Task<IActionResult> GetFuncionarioById(Guid FuncionarioId)
        {
            try
            {

                return Ok(_repo.GetFuncionarioAsyncById(FuncionarioId).Result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Banco Dados Falhou " + ex.Message);
            }
        }

        [HttpPost("")]
        public async Task<IActionResult> InserirFuncionario(InserirFuncionarioDTO model)
        {
            try
            {
                if(await _repo.GetCargoFuncionarioAsyncById(model.IdCargoFuncionario) is null) return BadRequest("Cargo do Funcionário está inválido");
                var map = _mapper.Map<Funcionario>(model);
                _repo.Add(map);
                if (await _repo.SaveChangesAsync()) return Created($"/Funcionario/", map);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Banco Dados Falhou {ex.Message}");
            }

            return BadRequest();
        }

        [HttpPut]
        public async Task<IActionResult> Put(Funcionario model)
        {
            try
            {
                if (string.IsNullOrEmpty(model.Id.ToString())) return BadRequest("Please insert the Id in Json, to place the Put");
                var Funcionario = await _repo.GetFuncionarioAsyncById(model.Id);
                if (Funcionario == null) return NotFound();

                _repo.Update(model);

                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/Funcionario/{model.Id}", model);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Banco Dados Falhou " + ex.Message);
            }

            return BadRequest();
        }

        [HttpDelete("{FuncionarioId}")]
        public async Task<IActionResult> Delete(Guid FuncionarioId)
        {
            try
            {
                var Funcionario = await _repo.GetFuncionarioAsyncById(FuncionarioId);
                if (Funcionario == null) return NotFound();

                _repo.Delete(Funcionario);

                if (await _repo.SaveChangesAsync())
                {
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Banco Dados Falhou " + ex.Message);
            }

            return BadRequest();
        }
    }
}
