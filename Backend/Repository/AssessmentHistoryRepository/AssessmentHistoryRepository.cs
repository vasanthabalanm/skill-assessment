using Microsoft.EntityFrameworkCore;
using SkillAssessment.Data;
using SkillAssessment.GlobalException;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Model.CoreModel;
using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Repository.AssessmentHistoryRepository
{
    [ExcludeFromCodeCoverage]
    public class AssessmentHistoryRepository : IAssessmentHistoryRepository
    {
        #region Property
        private readonly SkillAssessmentDbContext _context;
        #endregion
        #region Constructor
        /// <summary>
        /// Parameterized Constructor
        /// </summary>
        /// <param name="context"></param>
        public AssessmentHistoryRepository(SkillAssessmentDbContext context)
        {
            _context = context;
        }
        #endregion
        #region GetAll AssessmentHistory Repository
        /// <summary>
        /// Getting List of AssessmentHistory
        /// </summary>
        /// <returns>List Of AssessmentHistory</returns>
        public async Task<List<AssessmentHistory>> GetAll()
        {
            try
            {
                var item = await _context.AssessmentHistorys.ToListAsync() ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
                return item;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<AssessmentHistory>();
            }
        }
        #endregion
        #region DeleteAssessmentHistory Repository
        /// <summary>
        /// Delete a particular AssessmentHistory
        /// </summary>
        /// <param name="HistId"></param>
        /// <returns>List of AssessmentHistory</returns>
        public async Task<List<AssessmentHistory>> DeleteAssessmentHistory(int HistId)
        {

            try
            {
                var delHistItem = await _context.AssessmentHistorys.FindAsync(HistId) ?? throw new Exception(CustomException.ExceptionMessages["NoId"]);
                if (delHistItem != null)
                {
                    _context.AssessmentHistorys.Remove(delHistItem);
                }
                await _context.SaveChangesAsync();

                return await _context.AssessmentHistorys.ToListAsync();
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); return new List<AssessmentHistory>(); }
        }
        #endregion
    }
}
