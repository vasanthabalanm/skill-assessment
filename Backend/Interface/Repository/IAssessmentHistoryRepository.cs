using SkillAssessment.Model.CoreModel;

namespace SkillAssessment.Interface.Repository
{
    public interface IAssessmentHistoryRepository
    {
        Task<List<AssessmentHistory>> GetAll();
        Task<List<AssessmentHistory>> DeleteAssessmentHistory(int HistId);
    }
}
