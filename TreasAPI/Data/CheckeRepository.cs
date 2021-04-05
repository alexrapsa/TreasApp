using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TreasAPI.Entities;
using TreasAPI.Interfaces;

namespace TreasAPI.Data
{
    public class CheckeRepository : ICheckeRepository
    {
        private readonly DataContext _context;
        public CheckeRepository(DataContext context)
        {
            _context = context;

        }
        public async Task<Checke> GetCheckeByCheckeNumberAsync(string checkeNumber)
        {
            return await _context.Checkes.SingleOrDefaultAsync(x => x.CheckNumber == checkeNumber);
        }

        public async Task<Checke> GetCheckeByIdAsync(int id)
        {
            return await _context.Checkes.FindAsync(id);
        }

        public async Task<IEnumerable<Checke>> GetCheckesAsync()
        {
            return await _context.Checkes.ToListAsync();
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