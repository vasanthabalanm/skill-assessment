using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Model.View_Model
{
    [ExcludeFromCodeCoverage]
    public class EmployeesTestHistoryDTO
    {
        public int UserAssessmentId { get; set; }
        public string? TopicNames { get; set; }

        [Column(TypeName = "Date")]
        public DateTime DateOfCreation { get; set; }

        [Column(TypeName = "Date")]
        public DateTime? DateOfSubmission { get; set; }

        public int? Score { get; set; }
    }
}
