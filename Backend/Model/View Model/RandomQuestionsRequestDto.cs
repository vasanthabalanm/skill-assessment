using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Model.ViewModel
{
    [ExcludeFromCodeCoverage]
    public class RandomQuestionsRequestDTO
    {
        public List<int>? TopicIds { get; set; }
        public int? SkillId { get; set; }
        public int? QuestionCount { get; set; }

    }
}
