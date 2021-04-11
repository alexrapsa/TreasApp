using System.Collections.Generic;
using System.Threading.Tasks;
using TreasAPI.Dto;
using TreasAPI.Entities;
using TreasAPI.Helpers;

namespace TreasAPI.Interfaces
{
    public interface ICheckeRepository
    {
        
        void Update(Checke checke);
        Task<bool> SaveAllAsync();
        Task<PageList<CheckeDto>> GetCheckesAsync(CheckParams checkParams);
        Task<Checke> GetCheckeByIdAsync(int id);
        Task<Checke> GetCheckeByCheckeNumberAsync(string checkeNumber);
        Task<Checke> AddCheckeAsync(Checke checke);
    }
}