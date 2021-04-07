using System;
using System.ComponentModel.DataAnnotations;

namespace TreasAPI.Dto
{
    public class CheckeDto
    {
        public int Id { get; set; }
        [Required] public string PayTo { get; set; }
        [Required] public string CheckNumber { get; set; }
        [Required] public string Amount { get; set; }
        [Required] public DateTime DateIssued { get; set; }
        public DateTime DateCreated { get; set; }
        public bool IsReceived { get; set; }
        public string ReceivedBy { get; set; }
    }
}