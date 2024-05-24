namespace SkillAssessment.Interface.Service
{
    public interface IQuestionBankService
    {
        Task<int> GetQuestionCountBySkillIdAndTopicId(int skillId, int topicId);
        Task<int> GetAvailableQuestionCount(int topicId);
    }
}
