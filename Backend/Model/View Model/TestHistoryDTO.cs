using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Model.ViewModel
{
    [ExcludeFromCodeCoverage]
    public class TestHistoryDTO
    {
        public string? UserId { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string? AssessmentId { get; set; }
        public string? Department { get; set; }
        public string Designation { get; set; } = string.Empty;
        public string? Skill { get; set; }
        public int NumberOfQuestion { get; set; }
        public string? UserEmail { get; set; }
        public int NumberOfTopics { get; set; }
        [Column(TypeName = "Date")]
        public DateTime DateOfCreation { get; set; }
        [Column(TypeName = "Date")]
        public DateTime? CompletedOn { get; set; }
        public int? Score { get; set; }
        public int? CorrectAnswer { get; set; }
        public int? WrongAnswer { get; set; }
        public int? SkippedAnswer { get; set; }
        public int? Points { get; set; }
    }
}
