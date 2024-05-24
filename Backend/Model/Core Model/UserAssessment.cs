using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Model.CoreModel
{
    [ExcludeFromCodeCoverage]
    public class UserAssessment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [ForeignKey("User")]
        public string? UserId { get; set; }
        [ForeignKey("Assessment")]
        public string? AssessmentId { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Topics cannot be negative.")]
        public int NumberOfTopics { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "NumberOfQuestions cannot be negative.")]
        public int NumberOfQuestions { get; set; }
        public int? TotalTime { get; set; }
        [Column(TypeName = "Date")]
        public DateTime DateOfCreation { get; set; }
        [Column(TypeName = "Date")]
        public DateTime DateOfCompletion { get; set; }
        public string? Description { get; set; }
        [ForeignKey("AssessmentHistory")]
        public int? AssessmentHistoryId { get; set; }

    }
}
