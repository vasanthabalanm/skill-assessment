using SkillAssessment.Model.CoreModel;

namespace SkillAssessment.Interface.Service
{
    public interface ISkillService
    {
        Task<List<Skill>> GetAllSkillLevel();
    }
}
