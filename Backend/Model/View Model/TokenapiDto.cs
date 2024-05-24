using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Model.DTO
{
    [ExcludeFromCodeCoverage]
    public class TokenApiDTO
    {
        public string AccessToken { get; set; } = string.Empty;
        public string RefreshToken { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public int UserId { get; set; }
    }
}