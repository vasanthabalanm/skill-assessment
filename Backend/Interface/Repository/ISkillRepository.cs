using SkillAssessment.Model.CoreModel;

namespace SkillAssessment.Interface.Repository
{
    public interface ISkillRepository
    {
        Task<List<Skill>> GetSkills();
    }
}
