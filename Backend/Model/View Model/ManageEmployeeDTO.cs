using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Model.ViewModel
{
    [ExcludeFromCodeCoverage]
    public class ManageEmployeeDTO
    {
        public string? EmpId { get; set; }
        public string? EmployeeImage { get; set; }
        public string? Name { get; set; }
        public string? Designation { get; set; }
        public string? Department { get; set; }
        public string? Email { get; set; }
        public int? Points { get; set; }
    }
}
