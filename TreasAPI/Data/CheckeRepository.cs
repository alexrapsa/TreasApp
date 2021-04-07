using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using TreasAPI.Dto;
using TreasAPI.Entities;
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

        public async Task<CheckeDto> GetCheckeByCheckeNumberAsync(string checkeNumber)
        {
            return await _context.Checkes
                .Where(x => x.CheckNumber == checkeNumber)
                .ProjectTo<CheckeDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
            //return await _context.Checkes.SingleOrDefaultAsync(x => x.CheckNumber == checkeNumber);
        }

        public async Task<Checke> GetCheckeByIdAsync(int id)
        {
            return await _context.Checkes.FindAsync(id);
        }

        public async Task<IEnumerable<CheckeDto>> GetCheckesAsync()
        {
            return await _context.Checkes   
                .ProjectTo<CheckeDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
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