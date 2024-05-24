using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Model.ViewModel;
[ExcludeFromCodeCoverage]
public class AccessoriesDTO
{
    public int UserAssessmentId { get; set; }
    public string? AssessmentId { get; set; }
    public string? Department { get; set; }
    public string? Skills { get; set; }
    public string? Name { get; set; }
    public string? UserEmail { get; set; }
    public string? TopicName { get; set; }
    public int NumberOfTopics { get; set; }
    public int NumberOfQuestion { get; set; }
    [Column(TypeName = "Date")]
    public DateTime DateOfCompletion { get; set; }
    public string? Description { get; set; }
}
