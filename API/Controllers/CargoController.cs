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
    public class CargoController : ControllerBase
    {
        private readonly IFuncionariusRepository _repo;
        private readonly IMapper _mapper;
        public CargoController(IFuncionariusRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet("")]
        public async Task<IActionResult> ObterTodosOsCargos()
        {
            try
            {
                return Ok(_repo.GetAll().Result);
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, $"Banco Dados Falhou {ex.Message}");
            }
            return BadRequest();
        }
        [HttpGet("{Id}")]
        public async Task<IActionResult> ObterCargoById(Guid Id)
        {
            try
            {
                return Ok(_repo.GetCargoFuncionarioAsyncById(Id).Result);
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, $"Banco Dados Falhou {ex.Message}");
            }
            return BadRequest();
        }
        [HttpPost("")]
        public async Task<IActionResult> InserirNovoCargo(CargoFuncionarioDTO cargo)
        {
            try
            {
                var map = _mapper.Map<CargoFuncionario>(cargo);
                _repo.Add(map);
                if (await _repo.SaveChangesAsync()) return Created($"/Cargo/", map);
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, $"Banco Dados Falhou {ex.Message}");
            }
            return BadRequest();
        }

        [HttpPut("")]
        public async Task<IActionResult> AlterarCargo(CargoFuncionario cargo)
        {
            try
            {
                if (string.IsNullOrEmpty(cargo.Id.ToString())) return BadRequest("Please insert the Id in Json, to place the Put");
                var cargoFuncionario = await _repo.GetCargoFuncionarioAsyncById(cargo.Id);
                if (cargoFuncionario is null) return NotFound();

                _repo.Update(cargo);

                if (await _repo.SaveChangesAsync()) return Created($"/api/Cargo/", cargo);
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, $"Banco Dados Falhou {ex.Message}");
            }
            return BadRequest();
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> Delete(Guid Id)
        {
            try
            {
                var cargo = await _repo.GetCargoFuncionarioAsyncById(Id);
                if (cargo is null) return NotFound();

                _repo.Delete(cargo);

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
