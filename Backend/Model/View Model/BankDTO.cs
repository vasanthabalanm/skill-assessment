using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Model.View_Model
{
    [ExcludeFromCodeCoverage]
    public class BankDTO
    {
        public int Id { get; set; }
        public int QuestionType { get; set; }
        public string Question { get; set; } = string.Empty;
        public string Opt1 { get; set; } = string.Empty;
        public string Opt2 { get; set; } = string.Empty;
        public string Opt3 { get; set; } = string.Empty;
        public string Opt4 { get; set; } = string.Empty;
        public string Answer { get; set; } = string.Empty;
        public int SkillId { get; set; }
        public int TypeId { get; set; }
        public string Explanations { get; set; } = string.Empty;

    }
}
