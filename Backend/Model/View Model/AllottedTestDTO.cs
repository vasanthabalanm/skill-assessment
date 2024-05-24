using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace SkillAssessment.Model.View_Model
{
    public class AllottedTestDTO
    {
        public string? AssessmentId { get; set; }
        public string? ReportedBy { get; set; }
        public int NumberOfQuestion { get; set; }
        [Column(TypeName = "Date")]
        public DateTime DateOfCompletion { get; set; }

        [Column(TypeName = "Date")]
        public DateTime DateOfCreation { get; set; }
        public int? TotalTime { get; set; }
    }
}
