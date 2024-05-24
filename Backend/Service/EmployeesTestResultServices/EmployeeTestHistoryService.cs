using SkillAssessment.GlobalException;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Interface.Service;
using SkillAssessment.Model.View_Model;

namespace SkillAssessment.Service.EmployeesTestResultServices
{
    public class EmployeeTestHistoryService : IEmployeeTestHistory
    {
        #region Properities
        private readonly IEmployeeTestHistoryRepository _repo;
        #endregion

        #region Constructor
        /// <summary>
        /// Parameterized Constructor
        /// </summary>
        /// <param name="repo"></param>
        public EmployeeTestHistoryService(IEmployeeTestHistoryRepository repo)
        {
            _repo = repo;
        }

        #endregion

        #region Get Employees Completed test details Service
        /// <summary>
        /// Retrieves Get Employees Completed test details
        /// </summary>
        /// <returns>Get Employees Completed test details of objects.</returns>
        public async Task<List<EmployeesTestHistoryDTO>> CompletedUserTest(string UserId)
        {
            try
            {
                var employeeDetail = await _repo.CompletedUserTest(UserId);
                return employeeDetail ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<EmployeesTestHistoryDTO>();
            }
        }
        #endregion

        #region Get Employees Ongoing test details Service
        /// <summary>
        /// Retrieves Get Employees Ongoing test details
        /// </summary>
        /// <returns> Get Employees Ongoing test details of objects.</returns>
        public async Task<List<EmployeesTestHistoryDTO>> OngoingUserTest(string userid)
        {
            try
            {
                var employeeDetail = await _repo.OngoingUserTest(userid);
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