using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Model.ViewModel
{
    [ExcludeFromCodeCoverage]

    public class EmployeeProfileDetailsViewDTO
    {
        public string? UsersId { get; set; }
        public string? Name { get; set; }
        public string? Designation { get; set; }
        public string? Department { get; set; }
        public int? EarnedPoints { get; set; }
        public int? TestTaken { get; set; }
        public string? Location { get; set; }
        public string? Phone { get; set; }
        public string? UserEmail { get; set; }
        public string? EmployeeImage { get; set; }
    }
}
