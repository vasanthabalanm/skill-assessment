using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Model.CoreModel
{
    [ExcludeFromCodeCoverage]
    public class UserRequest
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [ForeignKey("User")]
        public string UserId { get; set; } = string.Empty;

        [ForeignKey("Assessment")]
        public string? AssessmentId { get; set; }
        [Range(0, int.MaxValue, ErrorMessage = "NumberOfQuestions cannot be negative.")]
        public int NumberOfQuestions { get; set; }

        [Column(TypeName = "Date")]
        public DateTime DateOfCompletion { get; set; }

        [Column(TypeName = "Date")]
        public DateTime DateOfRequest { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "TotalTime cannot be negative.")]
        public int TotalTime { get; set; }
        public Boolean? IsChecked { get; set; }
    }
}
