using System.ComponentModel.DataAnnotations;

namespace SkillAssessment.Helper
{

    public class MaxFileSizeAttribute : ValidationAttribute
    {
        #region Property
        private readonly long _maxFileSize;
        #endregion

        #region Constructor
        public MaxFileSizeAttribute(long maxFileSize)
        {
            _maxFileSize = maxFileSize;
        }
        #endregion

        #region Validation Result
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value is IFormFile file && file.Length > 0)
            {
                if (file.Length > _maxFileSize)
                {
                    return new ValidationResult(ErrorMessage);
                }
            }

            return ValidationResult.Success;
        }
        #endregion
    }

}
