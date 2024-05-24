using SkillAssessment.Model.CoreModel;

namespace SkillAssessment.Interface.Repository
{
    public interface IQuestionBankRepository
    {
        Task<List<AddQuestion>> SortQuestionsBySkillIdAndTopicId(int skillId, int topicId);
        Task<List<AddQuestion>> GetCountByTopicId(int topicId);
    }
}
