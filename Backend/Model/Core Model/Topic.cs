using SkillAssessment.Helper;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Model.CoreModel
{
    [ExcludeFromCodeCoverage]
    public class Topic
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [ForeignKey("Department")]
        public int DepartmentId { get; set; }
        public string? TopicImage { get; set; }

        [NotMapped]
        [Required(ErrorMessage = "Hotel image is required.")]
        [AllowedExtensions(new string[] { ".jpg", ".jpeg", ".png", ".gif" }, ErrorMessage = "Invalid file format. Only .jpg, .jpeg, .png, and .gif are allowed.")]
        [MaxFileSize(10 * 1024 * 1024, ErrorMessage = "Maximum file size allowed is 10MB.")]
        public IFormFile? ImageFileFormat { get; set; }

        [NotMapped]
        public string? ImageSrc { get; set; }

        [StringLength(40, ErrorMessage = "TopicName cannot exceed 40 characters.")]
        public string TopicName { get; set; } = string.Empty;

        public ICollection<AddQuestion>? AddQuestions { get; set; }
    }
}
