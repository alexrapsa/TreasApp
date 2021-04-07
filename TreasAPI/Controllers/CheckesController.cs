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
            return await _checkeRepository.GetCheckeByCheckeNumberAsync(checkeNumber);
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

            return new CheckeDto {
                CheckNumber = checke.CheckNumber,
                Amount =checke.Amount
            };
        }

        private async Task<bool> CheckeExist(string checkeNumber)
        {
            var checke = await _checkeRepository.GetCheckeByCheckeNumberAsync(checkeNumber);
            if (checke != null) return true;

            return false;
        }
    }
}