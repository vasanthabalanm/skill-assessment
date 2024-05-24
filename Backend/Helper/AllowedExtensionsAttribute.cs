using System.ComponentModel.DataAnnotations;

namespace SkillAssessment.Helper
{
    [AttributeUsage(AttributeTargets.Property)]
    public class AllowedExtensionsAttribute : ValidationAttribute
    {
        #region Property
        private readonly string[] _extensions;
        #endregion

        #region Constructor
        public AllowedExtensionsAttribute(string[] extensions)
        {
            _extensions = extensions;
        }
        #endregion

        #region Validation Result
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value is IFormFile file && file.Length > 0)
            {
                var fileExtension = Path.GetExtension(file.FileName)?.ToLowerInvariant();
                if (fileExtension != null && Array.IndexOf(_extensions, fileExtension) == -1)
                {
                    return new ValidationResult(ErrorMessage);
                }
            }

            return ValidationResult.Success;
        }
        #endregion
    }
}