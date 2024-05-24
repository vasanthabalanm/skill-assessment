using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Model.ViewModel
{
    [ExcludeFromCodeCoverage]
    public class SelectedItemsDTO
    {
        public int deptid { get; set; }
        public int skillid { get; set; }
        public int[]? topicid { get; set; }
    }
}