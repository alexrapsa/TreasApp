using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using TreasAPI.Dto;
using TreasAPI.Entities;
using TreasAPI.Helpers;
using TreasAPI.Interfaces;

namespace TreasAPI.Data
{
    public class CheckeRepository : ICheckeRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public CheckeRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }

        public async Task<Checke> AddCheckeAsync(Checke checke)
        {
            _context.Checkes.Add(checke);
            await _context.SaveChangesAsync();

            return new Checke
            {
                Amount = checke.Amount
            };
        }

        public async Task<Checke> GetCheckeByCheckeNumberAsync(string checkeNumber)
        {
            return await _context.Checkes
                .Where(x => x.CheckNumber == checkeNumber)
                .SingleOrDefaultAsync();
            //return await _context.Checkes.SingleOrDefaultAsync(x => x.CheckNumber == checkeNumber);
        }

        public async Task<Checke> GetCheckeByIdAsync(int id)
        {
            return await _context.Checkes.FindAsync(id);
        }

        public async Task<PageList<CheckeDto>> GetCheckesAsync(CheckParams checkParams)
        {
            var query = _context.Checkes   
                .ProjectTo<CheckeDto>(_mapper.ConfigurationProvider)
                .AsNoTracking()
                .OrderByDescending(x=>x.DateCreated)
                .Where(x=> x.DateCreated >= checkParams.MinDate && x.DateCreated <= checkParams.MaxDate);

                return await PageList<CheckeDto>.CreateAsync(query, checkParams.PageNumber, checkParams.PageSize);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Checke checke)
        {
            _context.Entry(checke).State = EntityState.Modified;
        }
    }
}