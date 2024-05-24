using SkillAssessment.Model.CoreModel;

namespace SkillAssessment.Interface.Repository
{
    public interface IAddQuestionRepository
    {
        Task<List<AddQuestion>> UpdateQuestions(int id, AddQuestion addQuestion);
        Task<AddQuestion> AddNewQuestion(AddQuestion addQuestion);
        Task<AddQuestion> DeleteQuestionById(int id);
        Task<List<AddQuestion>> GetQuestionsByTopic(int topicId);
        Task<List<AddQuestion>> GetQuestionsByTopicSkill(int topicId, int skillId);
    }
}
