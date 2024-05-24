using SkillAssessment.Model.CoreModel;

namespace SkillAssessment.Interface.Service
{
    public interface IAddQuestionService
    {
        Task<List<AddQuestion>> UpdateQuestion(int id, AddQuestion addQuestion);
        Task<AddQuestion> AddQuestion(AddQuestion addQuestion);
        Task<AddQuestion> DeleteQuestion(int id);
        Task<List<AddQuestion>> GetQuestionByTopic(int topicId);
        Task<List<AddQuestion>> GetQuestionsByTopicAndSkill(int topicId, int skillId);
    }
}
