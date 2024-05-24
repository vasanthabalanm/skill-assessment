using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Model.CoreModel;
[ExcludeFromCodeCoverage]
public class AssessmentHistory
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

    public int Id { get; set; }

    [Column(TypeName = "Date")]
    public DateTime? DateOfSubmission { get; set; }
    public string Status { get; set; } = string.Empty;
    [Range(0, 100, ErrorMessage = "Score cannot be negative.")]
    public int? Score { get; set; }
    [Range(0, int.MaxValue, ErrorMessage = "CorrectAnswer cannot be negative.")]
    public int? CorrectAnswer { get; set; }

    [Range(0, int.MaxValue, ErrorMessage = "WrongAnswer cannot be negative.")]
    public int? WrongAnswer { get; set; }

    [Range(0, int.MaxValue, ErrorMessage = "SkippedAnswer cannot be negative.")]
    public int? SkippedAnswer { get; set; }
    public int? Points { get; set; }
    public ICollection<UserAssessment>? UserAssessments { get; set; }
}
