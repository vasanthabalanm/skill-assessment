using Microsoft.EntityFrameworkCore.Metadata.Internal;
using SkillAssessment.Helper;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Model.CoreModel
{
    [ExcludeFromCodeCoverage]
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string? Id { get; set; }

        [StringLength(20, ErrorMessage = "First Name cannot exceed 20 characters.")]
        public string FirstName { get; set; } = string.Empty;
        [StringLength(20, ErrorMessage = "Last Name cannot exceed 20 characters.")]
        public string LastName { get; set; } = string.Empty;
        public string? EmployeeImage { get; set; }

        [NotMapped]
        [AllowedExtensions(new string[] { ".jpg", ".jpeg", ".png", ".gif" }, ErrorMessage = "Invalid file format. Only .jpg, .jpeg, .png, and .gif are allowed.")]
        [MaxFileSize(10 * 1024 * 1024, ErrorMessage = "Maximum file size allowed is 10MB.")]
        public IFormFile? ImageFileFormat { get; set; }

        [NotMapped]
        public string? ImageSrc { get; set; }

        [Column(TypeName = "Date")]
        public DateTime DateOfBirth { get; set; }
        [StringLength(10, ErrorMessage = "Gender cannot exceed 10 characters.")]
        public string Gender { get; set; } = string.Empty;

        [ForeignKey("Department")]
        public int? DepartmentId { get; set; }
        public string EducationLevel { get; set; } = string.Empty;

        [StringLength(15, ErrorMessage = "Role cannot exceed 15 characters.")]
        public string Role { get; set; } = string.Empty;
        [StringLength(25, ErrorMessage = "First Name cannot exceed 25 characters.")]
        public string Designation { get; set; } = string.Empty;

        [StringLength(10, MinimumLength = 6, ErrorMessage = "PhoneNumber must be between 6 and 10 digits.")]
        public string? PhoneNumber { get; set; }
        [StringLength(200, ErrorMessage = "Location cannot exceed 200 characters.")]
        public string Location { get; set; } = string.Empty;
        [StringLength(200, ErrorMessage = "Address cannot exceed 200 characters.")]
        public string Address { get; set; } = string.Empty;

        public byte[]? Hashkey { get; set; }

        public byte[]? Password { get; set; }
        public string? Email { get; set; }


        public ICollection<UserAssessment>? UserAssessments { get; set; }
        public ICollection<EmailHistory>? EmailHistorys { get; set; }
        public ICollection<QuestionPage>? QuestionPages { get; set; }
        public ICollection<UserRequest>? UserRequests { get; set; }
    }
}
