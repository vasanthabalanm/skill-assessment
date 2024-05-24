using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Model.DTO
{
    [ExcludeFromCodeCoverage]
    public class UserDTO
    {
        public string? Id { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string Role { get; set; } = string.Empty;
        public string? Token { get; set; }
    }
}