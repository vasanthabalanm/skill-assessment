using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Model.CoreModel;

[ExcludeFromCodeCoverage]

public class AddQuestion
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    [ForeignKey("Topic")]
    public int TopicId { get; set; }
    [ForeignKey("Skill")]
    public int SkillId { get; set; }
    [ForeignKey("QuestionType")]
    public int QuestionTypeId { get; set; }
    [Required(ErrorMessage = "Question is required.")]
    public string Question { get; set; } = string.Empty;
    [StringLength(200, ErrorMessage = "Option 1 cannot exceed 200 characters.")]
    public string Option1 { get; set; } = string.Empty;
    [StringLength(200, ErrorMessage = "Option 2 cannot exceed 200 characters.")]
    public string Option2 { get; set; } = string.Empty;
    [StringLength(200, ErrorMessage = "Option 3 cannot exceed 200 characters.")]
    public string Option3 { get; set; } = string.Empty;
    [StringLength(200, ErrorMessage = "Option 4 cannot exceed 200 characters.")]
    public string Option4 { get; set; } = string.Empty;

    [StringLength(500, ErrorMessage = "Answer cannot exceed 500 characters.")]
    public string Answer { get; set; } = string.Empty;
    [StringLength(500, ErrorMessage = "Explanation cannot exceed 500 characters.")]
    public string Explanation { get; set; } = string.Empty;
    public ICollection<QuestionPage>? QuestionPages { get; set; }
}
