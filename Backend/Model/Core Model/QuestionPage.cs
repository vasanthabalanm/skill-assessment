using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Model.CoreModel
{
    [ExcludeFromCodeCoverage]
    public class QuestionPage
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [ForeignKey("AddQuestion")]
        public int AddQuestionId { get; set; }
        [ForeignKey("Assessment")]
        public string? AssessmentId { get; set; }
        [ForeignKey("User")]
        public string? UserId { get; set; }
    }
}
