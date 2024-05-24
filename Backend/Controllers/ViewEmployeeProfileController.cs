using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkillAssessment.Interface.Service;
using SkillAssessment.Model.View_Model;
using SkillAssessment.Model.ViewModel;

namespace SkillAssessment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class ViewEmployeeProfileController : ControllerBase
    {
        #region Properties
        private readonly IViewProfileEmployee _profileEmployee;
        private readonly IEmployeeTestHistory _employeeTestHistory;
        private readonly ILogger<ViewEmployeeProfileController> _logger;
        #endregion

        #region Constructor
        /// <summary>
        /// Parameterized Constructor
        /// </summary>
        /// <param name="profileEmployee"></param>
        /// <param name="employeeTestHistory"></param>

        public ViewEmployeeProfileController(IViewProfileEmployee profileEmployee, ILogger<ViewEmployeeProfileController> logger, IEmployeeTestHistory employeeTestHistory)
        {
            _profileEmployee = profileEmployee;
            _logger = logger;
            _employeeTestHistory = employeeTestHistory;
        }
        #endregion

        #region Get employee details by Employee ID
        /// <summary>
        /// Retrieves an Employee profile by ID
        /// </summary>
        /// <returns>An Employee profile by ID details of objects.</returns>
        [HttpGet("getparticularuser")]
        public async Task<ActionResult<EmployeeProfileDetailsViewDTO>> GetUserProfile(string UserId)
        {
            _logger.LogInformation("Get all users by userid:{userid}", UserId);
            var get = await _profileEmployee.GetUserProfile(UserId);
            _logger.LogInformation("Returned values: {get}", get);
            return Ok(get);
        }
        #endregion

        #region Get Employees Completed test details
        /// <summary>
        /// Retrieves Get Employees Completed test details
        /// </summary>
        /// <returns>Get Employees Completed test details of objects.</returns>
        [HttpGet("completedtest")]
        public async Task<ActionResult<List<EmployeesTestHistoryDTO>>> CompletedUserTest(string UserId)
        {
            _logger.LogInformation("Get all users by userid:{userid}", UserId);
            var get = await _employeeTestHistory.CompletedUserTest(UserId);
            _logger.LogInformation("Returned values: {get}", get);
            var var1 = new MemoryStream();
            return Ok(get);
        }
        #endregion

        #region Get Employees Ongoing test details
        /// <summary>
        /// Retrieves Get Employees Ongoing test details
        /// </summary>
        /// <returns> Get Employees Ongoing test details of objects.</returns>
        [HttpGet("ongoingtest")]
        public async Task<ActionResult<EmployeesTestHistoryDTO>> OngoingUserTest(string userid)
        {
            _logger.LogInformation("Get all users by userid:{userid}", userid);
            var get = await _employeeTestHistory.OngoingUserTest(userid);
            _logger.LogInformation("Returned values: {get}", get);
            return Ok(get);
        }
        #endregion
    }
}
