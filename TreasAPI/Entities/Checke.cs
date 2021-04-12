using System;

namespace TreasAPI.Entities
{
    public class Checke
    {
        public int Id { get; set; }
        public string Payto { get; set; }
        public string CheckNumber { get; set; }
        public string Amount { get; set; }
        public DateTime DateIssued { get; set; }
        public DateTime DateCreated { get; set; }
        public bool IsReceived { get; set; }
        public string ReceivedBy { get; set; }
        public DateTime DateReceived { get; set; }
    }
}