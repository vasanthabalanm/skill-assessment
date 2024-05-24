using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using SkillAssessment.Data;
using SkillAssessment.GlobalException;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Model.View_Model;

namespace SkillAssessment.Repository.EmployeesTestDetailsHistory
{
    public class EmployeeTestHistoryRepository : IEmployeeTestHistoryRepository
    {
        #region Properities
        private readonly SkillAssessmentDbContext _context;
        #endregion

        #region Constructor
        /// <summary>
        /// Parameterized Constructor
        /// </summary>
        /// <param name="context"></param>
        public EmployeeTestHistoryRepository(SkillAssessmentDbContext context)
        {
            _context = context;
        }
        #endregion

        #region Get Employees Completed test details Repository
        /// <summary>
        /// Retrieves Get Employees Completed test details
        /// </summary>
        /// <returns>Get Employees Completed test details of objects.</returns>
        public async Task<List<EmployeesTestHistoryDTO>> CompletedUserTest(string UserId)
        {
            try
            {
                var employeeID = new SqlParameter("@UserId", UserId);
                var employeeDetail = await _context.Set<EmployeesTestHistoryDTO>().FromSqlRaw("EXEC [dbo].[Procedure_CompletedUserAssessment] @UserId", employeeID).ToListAsync();
                return employeeDetail ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<EmployeesTestHistoryDTO>();
            }
        }
        #endregion

        #region Get Employees Ongoing test details Repository
        /// <summary>
        /// Retrieves Get Employees Ongoing test details
        /// </summary>
        /// <returns> Get Employees Ongoing test details of objects.</returns>
        public async Task<List<EmployeesTestHistoryDTO>> OngoingUserTest(string userid)
        {
            try
            {
                var employeeID = new SqlParameter("@userid", userid);
                var employeeDetail = await _context.Set<EmployeesTestHistoryDTO>().FromSqlRaw("exec [dbo].[Procedure_GetOngoingUserTest] @userid", employeeID).ToListAsync();
                return employeeDetail ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<EmployeesTestHistoryDTO>();
            }
        }
        #endregion
    }
}
