using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Model.CoreModel
{
    [ExcludeFromCodeCoverage]
    public class Department
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        public int Id { get; set; }

        [StringLength(35, ErrorMessage = "Department Name cannot exceed 35 characters.")]
        public string DepartmentName { get; set; } = string.Empty;
        public ICollection<User>? Users { get; set; }
        public ICollection<Topic>? Topics { get; set; }
    }
}
