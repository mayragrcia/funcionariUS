using AutoMapper;
using Funcionarius.DTO;
using Funcionarius.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Funcionarius.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class FolhaSalarialController : ControllerBase
    {
        private readonly IFuncionariusRepository _repo;
        private readonly IMapper _mapper;
        public FolhaSalarialController(IFuncionariusRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet("")]
        public async Task<IActionResult> GetFolhaSalarial()
        {
            try
            {
                return Ok(_repo.GetAllFolhaSalarialAsync().Result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Banco Dados Falhou {ex.Message}");
            }
        }
        [HttpGet("{IdFuncionario}")]
        public async Task<IActionResult> GetFolhaSalarialByFuncionarioId(Guid IdFuncionario)
        {
            try
            {
                return Ok(_repo.GetFolhaSalarialByFuncionarioId(IdFuncionario).Result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Banco Dados Falhou {ex.Message}");
            }
        }

        [HttpPost("CalcularFolha")]
        public async Task<IActionResult> CalcularFolhaSalarial(string cpf, int horasTrabalhadas)
        {
            try
            {
                var folhaSalarial = await _repo.CalcularFolhaSalarial(cpf, horasTrabalhadas);
                _repo.Add(folhaSalarial);
                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/FolhaSalarial/", folhaSalarial);
                }
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, $"Banco Dados Falhou {ex.Message}");
            }
            return BadRequest();
        }

        [HttpPost("CalcularFolhaById")]
        public async Task<IActionResult> CalcularFolhaSalarialId(Guid Id, int horasTrabalhadas)
        {
            try
            {
                var folhaSalarial = await _repo.CalcularFolhaSalarialFuncionarioById(Id, horasTrabalhadas);
                _repo.Add(folhaSalarial);
                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/FolhaSalarial/", folhaSalarial);
                }
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, $"Banco Dados Falhou {ex.Message}");
            }
            return BadRequest();
        }

        [HttpGet("ObterFolhaPorId/{FolhaSalarialId}")]
        public async Task<IActionResult> Get(Guid FolhaSalarialId)
        {
            try
            {
                var folhaSalarial = await _repo.GetFolhaSalarialAsyncById(FolhaSalarialId);
                return Ok(_mapper.Map<FolhaSalariaDTO>(folhaSalarial));
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Banco Dados Falhou");
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put(FolhaSalariaDTO model)
        {
            try
            {
                if (!model.Id.HasValue) return BadRequest("Por Favor Insira o Id");
                var folhaSalarialAntiga = await _repo.GetFolhaSalarialAsyncById(model.Id.Value);
                if (folhaSalarialAntiga == null) return NotFound();

                if (folhaSalarialAntiga.HorasTrabalhadas != model.HorasTrabalhadas)
                {
                    var folhaSalarial = await _repo.CalcularFolhaSalarialFuncionarioById(model.FuncionarioID, model.HorasTrabalhadas);
                    folhaSalarial.Id = model.Id.Value;

                    _repo.Update(folhaSalarial);

                    if (await _repo.SaveChangesAsync())
                    {
                        return Created($"/FolhaSalarial/{model.Id.Value}", _mapper.Map<FolhaSalariaDTO>(folhaSalarial));
                    }
                }

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Banco Dados Falhou " + ex.Message);
            }

            return BadRequest();
        }

        [HttpDelete("{FolhaSalarialId}")]
        public async Task<IActionResult> Delete(Guid FolhaSalarialId)
        {
            try
            {
                var FolhaSalarial = await _repo.GetFolhaSalarialAsyncById(FolhaSalarialId);
                if (FolhaSalarial == null) return NotFound();

                _repo.Delete(FolhaSalarial);

                if (await _repo.SaveChangesAsync())
                {
                    return Ok();
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Banco Dados Falhou");
            }

            return BadRequest();
        }
    }
}
