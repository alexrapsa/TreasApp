using System;

namespace TreasAPI.Dto
{
    public class CheckeDto
    {
        public int Id { get; set; }
        public string Payto { get; set; }
        public string CheckNumber { get; set; }
        public decimal Amount { get; set; }
        public DateTime DateIssued { get; set; }
        public DateTime DateCreated { get; set; }
        public bool IsReceived { get; set; }
        public string ReceivedBy { get; set; }
    }
}