using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Model.ViewModel
{
    [ExcludeFromCodeCoverage]
    public class AvailableAssessmentDTO
    {
        public string? AssessmentID { get; set; }
        public string? Department { get; set; }
        public string? Skills { get; set; }
        public int[]? TopicID { get; set; }
        public string[]? TopicName { get; set; }
    }
}
