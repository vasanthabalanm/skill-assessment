using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Model.ViewModel
{
    [ExcludeFromCodeCoverage]
    public class RequestUserDTO
    {
        public int? RequestId { get; set; }
        public string? EmpId { get; set; }
        public string? Name { get; set; }
        public string? Designation { get; set; }
        public string? Department { get; set; }
        public string? AssessmentId { get; set; }
        [Column(TypeName = "Date")]
        public DateTime? CompletionOn { get; set; }
        public string? TopicName { get; set; }
        public int TimeAllotted { get; set; }
        public string? SkillLevel { get; set; }
        [Column(TypeName = "Date")]
        public DateTime? RequestedOn { get; set; }
        public int NumberOfTopic { get; set; }
    }
}
