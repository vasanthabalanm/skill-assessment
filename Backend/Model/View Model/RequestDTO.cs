using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Model.ViewModel
{
    [ExcludeFromCodeCoverage]
    public class RequestDTO
    {
        public int RequestId { get; set; }
        public string? AssessmentId { get; set; }
        public string? Department { get; set; }
        public string? EmployeeImage { get; set; }
        public string? Skills { get; set; }
        public string? EmpId { get; set; }
        public string? Name { get; set; }
        public int NumberOfTopic { get; set; }
        [Column(TypeName = "Date")]
        public DateTime? RequestedOn { get; set; }
        [Column(TypeName = "Date")]
        public DateTime? CompletionOn { get; set; }
        public int? NoOfQuestion { get; set; }
        public int TimeAllotted { get; set; }
    }
}
