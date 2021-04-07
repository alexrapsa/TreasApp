using AutoMapper;
using TreasAPI.Dto;
using TreasAPI.Entities;

namespace TreasAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>();
            CreateMap<Checke, CheckeDto>();
            CreateMap<CheckeDto, Checke>();
        }
    }
}