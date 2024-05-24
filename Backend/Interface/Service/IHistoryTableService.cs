using SkillAssessment.Model.CoreModel;
using SkillAssessment.Model.ViewModel;

namespace SkillAssessment.Interface.Service
{
    public interface IHistoryTableService
    {
        public Task<List<HistoryDTO>> GetHistory(string historyName);
        public Task<List<string>> GetTopicsByDepartment(string[] deptlist);
        public Task<List<Skill>> GetAllSkill();
        public Task<List<QuestionType>> GetAllQnType();
        public Task<List<HistoryDTO>> FilterByTopic(string[] topiclist, string skillLevel, string roleName);
        public Task<UserAssessment> DeleteAssessment(int UserAssessId);
        public Task<List<AssessmentHistory>> DeleteAssessmentHistory(int HistId);

    }
}
