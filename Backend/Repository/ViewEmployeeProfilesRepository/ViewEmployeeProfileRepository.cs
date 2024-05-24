using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using SkillAssessment.Data;
using SkillAssessment.GlobalException;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Model.ViewModel;

namespace SkillAssessment.Repository.ViewEmployeeProfilesRepository
{
    public class ViewEmployeeProfileRepository : IViewProfileDetailsRepository
    {
        #region Properities
        private readonly SkillAssessmentDbContext _context;
        #endregion

        #region Constructor
        /// <summary>
        /// Parameterized Constructor
        /// </summary>
        /// <param name="context"></param>
        public ViewEmployeeProfileRepository(SkillAssessmentDbContext context)
        {
            _context = context;
        }
        #endregion

        #region Get Employee profile by ID Repository
        /// <summary>
        /// Retrieves an Employee profile by ID
        /// </summary>
        /// <returns>An Employee profile by ID details of objects.</returns>
        public async Task<EmployeeProfileDetailsViewDTO> GetUserProfile(string UserId)
        {
            try
            {
                var employeeID = new SqlParameter("@UserId", UserId);
                var employeeDetail = await _context.Set<EmployeeProfileDetailsViewDTO>().FromSqlRaw("exec [dbo].[Procedure_GetViewProfileDetails] @UserId ", employeeID).ToListAsync();
                return employeeDetail.FirstOrDefault() ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new EmployeeProfileDetailsViewDTO();
            }
        }
        #endregion
    }
}
