using Microsoft.EntityFrameworkCore;
using SkillAssessment.Data;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Model.CoreModel;

namespace SkillAssessment.Repository.PostEmailRespository
{
    public class PostEmailRepository : IPostEmailRepository
    {
        #region Properties
        private readonly SkillAssessmentDbContext _context;
        #endregion

        #region Constructor
        public PostEmailRepository(SkillAssessmentDbContext context)
        {
            _context = context;
        }
        #endregion

        #region PostEmail Repository
        /// <summary>
        /// Email will be sent to the user and the history will be saved in the EmailHistory Table
        /// </summary>
        /// <param name="emailHistory"></param>
        /// <returns></returns>
        public async Task<List<EmailHistory>> PostEmailRepo(EmailHistory emailHistory)
        {
            try
            {
                _context.EmailHistory.Add(emailHistory);
                await _context.SaveChangesAsync();
                return await _context.EmailHistory.ToListAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<EmailHistory>();
            }
        }
        #endregion
    }

}
