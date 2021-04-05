using System.Collections.Generic;
using System.Threading.Tasks;
using TreasAPI.Entities;

namespace TreasAPI.Interfaces
{
    public interface ICheckeRepository
    {
        
        void Update(Checke checke);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<Checke>> GetCheckesAsync();
        Task<Checke> GetCheckeByIdAsync(int id);
        Task<Checke> GetCheckeByCheckeNumberAsync(string checkeNumber);
    }
}