using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TreasAPI.Data;
using TreasAPI.Dto;
using TreasAPI.Entities;
using TreasAPI.Interfaces;

namespace TreasAPI.Controllers
{
    [Authorize]
    public class CheckesController : BaseApiController
    {
        private readonly ICheckeRepository _checkeRepository;
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public CheckesController(DataContext context, ICheckeRepository checkeRepository, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
            _checkeRepository = checkeRepository;

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CheckeDto>>> GetCheckes()
        {
            var checkes = await _checkeRepository.GetCheckesAsync();
            return Ok(checkes);
        }
        [HttpGet("{checkeNumber}")]
        public async Task<ActionResult<CheckeDto>> GetChecke(string checkeNumber)
        {
            var checke = await _checkeRepository.GetCheckeByCheckeNumberAsync(checkeNumber);
            return _mapper.Map<CheckeDto>(checke);
        }

        [HttpPost("create")]
        public async Task<ActionResult<CheckeDto>> AddChecke(CheckeDto checkeDto)
        {
            if (await CheckeExist(checkeDto.CheckNumber)) return BadRequest("Checke exist");

            var checke = _mapper.Map<Checke>(checkeDto);

            checke.DateCreated = DateTime.UtcNow;
            checke.IsReceived = false;
            checke.ReceivedBy = "";

            _context.Checkes.Add(checke);
            await _context.SaveChangesAsync();

            return new CheckeDto
            {
                CheckNumber = checke.CheckNumber,
                Amount = checke.Amount
            };
        }

        [HttpPut("update")]
        public async Task<ActionResult> UpdateCheck(CheckeDto checkeDto)
        {
            if (!await CheckeExist(checkeDto.CheckNumber)) return NotFound("Check not found");

            var check = await _checkeRepository.GetCheckeByCheckeNumberAsync(checkeDto.CheckNumber);
            
             _mapper.Map(checkeDto, check);

            _checkeRepository.Update(check);

            if (await _checkeRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update user");
        }

        [HttpDelete("{checkeNumber}")]
        public async Task<ActionResult<string>> DeleteChecke(string checkeNumber)
        {
            var checkeDto = await _checkeRepository.GetCheckeByCheckeNumberAsync(checkeNumber);
            if (checkeDto != null)
            {
                var checke = _mapper.Map<Checke>(checkeDto);
                _context.Checkes.Remove(checke);
                await _context.SaveChangesAsync();

                return Ok();
            }
            
            return NotFound("Check not found");
        }

        private async Task<bool> CheckeExist(string checkeNumber)
        {
            var checke = await _checkeRepository.GetCheckeByCheckeNumberAsync(checkeNumber);
            if (checke != null) return true;

            return false;
        }
    }
}