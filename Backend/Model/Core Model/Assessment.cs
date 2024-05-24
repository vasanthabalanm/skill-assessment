using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Model.CoreModel
{
    [ExcludeFromCodeCoverage]
    public class Assessment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Id { get; set; } = string.Empty;

        public ICollection<QuestionPage>? QuestionPages { get; set; }
        public ICollection<UserAssessment>? UserAssessments { get; set; }
        public ICollection<EmailHistory>? EmailHistorys { get; set; }
        public ICollection<UserRequest>? UserRequests { get; set; }
    }
}
