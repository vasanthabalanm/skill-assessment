using SkillAssessment.Model.ViewModel;

namespace SkillAssessment.Interface.Repository
{
    public interface IAssessmentDataRepository
    {
        Task<List<AvailableAssessmentDTO>> GetAllAssessmentDetailsByRole(string rolename);
    }
}
