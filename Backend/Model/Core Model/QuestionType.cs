using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Model.CoreModel
{
    [ExcludeFromCodeCoverage]
    public class QuestionType
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [StringLength(30, ErrorMessage = "QuestionType cannot exceed 30 characters.")]
        public string QuestionTypes { get; set; } = string.Empty;
        public ICollection<AddQuestion>? AddQuestions { get; set; }
    }
}
