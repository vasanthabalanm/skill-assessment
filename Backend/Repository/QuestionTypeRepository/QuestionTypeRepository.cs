using Microsoft.EntityFrameworkCore;
using SkillAssessment.Data;
using SkillAssessment.GlobalException;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Model.CoreModel;
using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Repository.QuestionTypeRepository
{
    [ExcludeFromCodeCoverage]
    public class QuestionTypeRepository : IQuestionTypeRepository
    {
        #region Property
        private readonly SkillAssessmentDbContext _context;
        #endregion
        #region Constructor
        /// <summary>
        /// Parameterized Constructor
        /// </summary>
        /// <param name="context"></param>
        public QuestionTypeRepository(SkillAssessmentDbContext context)
        {
            _context = context;
        }
        #endregion
        #region GetAll QuestionTypes Repository
        public async Task<List<QuestionType>?> GetAll()
        {
            try
            {
                var item = await _context.QuestionTypes.ToListAsync();
                if (item == null)
                {
                    throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
                }
                return item;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }
        #endregion
    }
}
