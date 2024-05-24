using SkillAssessment.Model.CoreModel;
using SkillAssessment.Model.ViewModel;

namespace SkillAssessment.Interface.Repository
{
    public interface IRandomQuestionRepository
    {
        Task<List<QuestionPage>> CreateQuestionPages(string assessId, RandomQuestionsRequestDTO requestDto, string[] names);
        Task<List<AddQuestion>> RandomQuestions(RandomQuestionsRequestDTO requestDto);
    }
}
