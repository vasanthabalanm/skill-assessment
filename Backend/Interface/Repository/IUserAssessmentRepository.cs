using SkillAssessment.Model.CoreModel;

namespace SkillAssessment.Interface.Repository
{
    public interface IUserAssessmentRepository
    {
        Task<List<UserAssessment>> GetAll();
        Task<UserAssessment> Delete(int UserAssessId);
        Task<UserAssessment> Add(UserAssessment userAssessment);
        Task<UserAssessment> PutDate(int userassessId, UserAssessment userAssess);
    }
}
