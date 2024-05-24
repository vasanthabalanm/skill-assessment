using SkillAssessment.Model.CoreModel;

namespace SkillAssessment.Interface.Repository
{
    public interface IQuestionTypeRepository
    {
        Task<List<QuestionType>?> GetAll();
    }
}
