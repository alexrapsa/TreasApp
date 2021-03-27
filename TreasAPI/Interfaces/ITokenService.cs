using TreasAPI.Entities;

namespace TreasAPI.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}