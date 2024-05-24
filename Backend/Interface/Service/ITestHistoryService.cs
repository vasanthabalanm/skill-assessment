using SkillAssessment.Model.ViewModel;

namespace SkillAssessment.Interface.Service
{
    public interface ITestHistoryService
    {
        public Task<TestHistoryDTO> GetHistory(int UserAssessmentId);
    }
}
