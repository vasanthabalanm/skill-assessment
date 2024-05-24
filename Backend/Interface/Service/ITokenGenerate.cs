using SkillAssessment.Model.DTO;

namespace SkillAssessment.Interface.Service
{
    public interface ITokenGenerate
    {
        public string GenerateToken(UserDTO user);
    }
}
