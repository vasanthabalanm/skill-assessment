using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using SkillAssessment.Data;
using SkillAssessment.GlobalException;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Model.View_Model;
using SkillAssessment.Model.ViewModel;
using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Repository.StoredProcedureRepository
{
    [ExcludeFromCodeCoverage]
    public class StoredProcedureRepository : IStoredProcedureRepository
    {
        #region Properties
        private readonly SkillAssessmentDbContext _context;
        #endregion
        #region Constructor
        /// <summary>
        /// Parameterized Constructor
        /// </summary>
        /// <param name="context"></param>
        public StoredProcedureRepository(SkillAssessmentDbContext context)
        {
            _context = context;
        }
        #endregion
        #region Get All TestHistory Repository
        /// <summary>
        /// Retrieves a list of all test history for both employee and jobseeker
        /// </summary>
        /// <returns>A list of test history objects.</returns>
        public async Task<List<HistoryDTO>> GetHistory(string roleName)
        {
            try
            {
                var roleNameParam = new SqlParameter("@RoleName", roleName);
                var items = await _context.Set<HistoryDTO>()
                    .FromSqlRaw("EXEC USP_GetHistoryDTO @RoleName", roleNameParam)
                    .ToListAsync();
                return items ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<HistoryDTO>();
            }
        }
        #endregion
        #region Get Test Result Repository
        /// <summary>
        /// Retrieves a test result for both employee and jobseeker
        /// </summary>
        /// <returns>A test result objects.</returns>
        public async Task<TestHistoryDTO> GetTestResult(int UserAssessmentId)
        {
            try
            {
                var userAssessmentIdParam = new SqlParameter("@UserAssessmentId", UserAssessmentId);
                var items = await _context.Set<TestHistoryDTO>()
                    .FromSqlRaw("EXEC [dbo].[GetParticularTestData] @UserAssessmentId", UserAssessmentId).ToListAsync();
                return items.FirstOrDefault() ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); return new TestHistoryDTO(); }
        }
        #endregion
        #region Get All Request Repository
        /// <summary>
        /// Retrieves all the request done by employee
        /// </summary>
        /// <returns>list of request.</returns>
        public async Task<List<RequestDTO>> GetRequest()
        {
            try
            {
                var items = await _context.Set<RequestDTO>()
                    .FromSqlRaw("EXEC USP_GetUnprocessedRequests").ToListAsync();
                return items ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); return new List<RequestDTO>(); }
        }
        #endregion
        #region Employee Request Details Repository
        /// <summary>
        /// Retrieves particular employee request details
        /// </summary>
        /// <returns>A request details of employee.</returns>
        public async Task<RequestUserDTO> GetRequestUser(int RequestId)
        {
            try
            {
                var requestIdParam = new SqlParameter("@RequestId", RequestId);
                var items = await _context.Set<RequestUserDTO>()
                    .FromSqlRaw("EXEC USP_GetUserRequestDetails @RequestId", requestIdParam).ToListAsync();
                return items.FirstOrDefault() ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); return new RequestUserDTO(); }
        }
        #endregion
        #region Getting Sidebar Details Repository
        /// <summary>
        /// Retrieves sidebar details of both employee and jobseeker
        /// </summary>
        /// <returns>The details for the Id.</returns>
        public async Task<AccessoriesDTO> GetEditSideBar(int id)
        {
            try
            {
                var userAssessIdParam = new SqlParameter("@UserAssessmentId", id);
                var items = await _context.Set<AccessoriesDTO>()
                    .FromSqlRaw("EXEC USP_GetUserAssessmentDetails @UserAssessmentId", userAssessIdParam).ToListAsync();
                return items.FirstOrDefault() ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); return new AccessoriesDTO(); }
        }
        #endregion
        #region Get Request Sidebar Details Repository
        /// <summary>
        /// Retrieves request sidebar details for employee
        /// </summary>
        /// <returns>The details for the Id.</returns>
        public async Task<AccessoriesDTO> GetEditSideBarForRequest(int id)
        {
            try
            {
                var requestIdParam = new SqlParameter("@RequestId", id);
                var items = await _context.Set<AccessoriesDTO>()
                    .FromSqlRaw("EXEC USP_GetUserRequestSidebarDetails @RequestId", requestIdParam).ToListAsync();
                return items.FirstOrDefault() ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); return new AccessoriesDTO(); }
        }
        #endregion
        #region Get All Allocatted Assessment
        /// <summary>
        /// Retrieves all the allocated assessment for an employee
        /// </summary>
        /// <returns>list of request.</returns>
        public async Task<List<AllottedTestDTO>> GetAllottedTest(string id)
        {
            try
            {
                var userIdParam = new SqlParameter("@userid", id);
                var items = await _context.Set<AllottedTestDTO>()
                    .FromSqlRaw("EXEC USP_AllocatedAssessment @userid", userIdParam).ToListAsync();
                return items ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); return new List<AllottedTestDTO>(); }
        }
        #endregion
    }
}
