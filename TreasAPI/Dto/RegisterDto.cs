using System.ComponentModel.DataAnnotations;

namespace TreasAPI.Dto
{
    public class RegisterDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}