using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkillAssessment.Interface.Service;
using SkillAssessment.Model.ViewModel;
using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Controllers
{
    [Route("HistoryTable")]
    [ApiController]
    [ExcludeFromCodeCoverage]
    [Authorize(Roles = "Admin")]
    public class RequestUserDetailsController : ControllerBase
    {
        #region Properties
        private readonly IRequestUserDetailsService _requestUserDetailsService;
        private readonly ILogger<RequestUserDetailsController> _logger;
        #endregion
        #region Constructor
        public RequestUserDetailsController(IRequestUserDetailsService requestUserDetailsService, ILogger<RequestUserDetailsController> logger)
        {
            _requestUserDetailsService = requestUserDetailsService;
            _logger = logger;
        }
        #endregion
        #region GetEmployeeRequestDetails
        /// <summary>
        /// request to get the particular employeeRequestDetails
        /// </summary>
        /// <param name="RequestId"></param>
        /// <returns>returns with the response of that employeeRequestDetails</returns>
        [HttpGet("GetUserRequestDetails")]
        public async Task<ActionResult<RequestUserDTO>> GetRequestUser(int RequestId)
        {
            _logger.LogInformation("GetDetailsOfUserRequest with the RequestId:{RequestId}", RequestId);
            var item = await _requestUserDetailsService.GetRequestUser(RequestId);
            _logger.LogInformation("GetDetailsOfUserRequest returned: {item}", item);
            return Ok(item);
        }
        #endregion
    }
}
