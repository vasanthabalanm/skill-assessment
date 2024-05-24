using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Model.CoreModel
{
    [ExcludeFromCodeCoverage]
    public class Skill
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [StringLength(20, ErrorMessage = "Skill cannot exceed 20 characters.")]
        public string SkillLevel { get; set; } = string.Empty;
        public ICollection<AddQuestion>? AddQuestions { get; set; }

    }
}
