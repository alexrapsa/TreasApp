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
    public class CheckeController : BaseApiController
    {
        private readonly ICheckeRepository _checkeRepository;
        private readonly IMapper _mapper;

        public CheckeController(ICheckeRepository checkeRepository, IMapper mapper)
        {
            _mapper = mapper;
            _checkeRepository = checkeRepository;

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Checke>>> GetCheckes()
        {
            var checkes = await _checkeRepository.GetCheckesAsync();
            var checksToReturn = _mapper.Map<IEnumerable<CheckeDto>>(checkes);
            return Ok(checksToReturn);
        }
    }
}