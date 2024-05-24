using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkillAssessment.Interface.Service;
using SkillAssessment.Model.CoreModel;
using SkillAssessment.Model.ViewModel;
using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Controllers
{
    [Route("HistoryTable")]
    [ApiController]
    [ExcludeFromCodeCoverage]
    [Authorize(Roles = "Admin")]
    public class RequestReceivedController : ControllerBase
    {
        #region Properties
        private readonly IRequestReceivedService _requestReceivedService;
        private readonly ILogger<RequestReceivedController> _logger;
        #endregion
        #region Constructor
        public RequestReceivedController(IRequestReceivedService requestReceivedService, ILogger<RequestReceivedController> logger)
        {
            _requestReceivedService = requestReceivedService;
            _logger = logger;
        }
        #endregion
        #region GetAllRequestReceived
        /// <summary>
        /// request to get the list of employee request details
        /// </summary>
        /// <returns>returns with the response of list of request details</returns>
        [HttpGet("GetAllRequestReceived")]
        public async Task<ActionResult<List<RequestDTO>>> GetRequest()
        {
            _logger.LogInformation("Executing GetAllRequestReceived");
            var item = await _requestReceivedService.GetRequest();
            _logger.LogInformation("GetAllRequestReceived returned: {item}", item);
            return Ok(item);
        }
        #endregion
        #region AcceptingRequest
        /// <summary>
        /// request to accept the request by updating isChecked to true
        /// </summary>
        /// <returns>returns with the response of updated request</returns>
        [HttpPut("UpdatingIsChecked")]
        public async Task<ActionResult<UserRequest>> UpdateUserRequest(int RequestId, UserRequest userRequest)
        {
            _logger.LogInformation("Executing UpdatingIsChecked with RequestId: {RequestId} and userRequest: {@userRequest}", RequestId, userRequest);
            var item = await _requestReceivedService.UpdateUserRequest(RequestId, userRequest);
            _logger.LogInformation("UpdatingIsChecked returned: {item}", item);
            return Ok(item);
        }
        #endregion
        #region UpdateDateOfCompletion
        /// <summary>
        /// request to update the date of completion
        /// </summary>
        /// <returns>returns with the response of updated request details</returns>
        [HttpPut("UpdatingDate")]
        public async Task<ActionResult<UserRequest>> UpdateUserRequestDate(int RequestId, UserRequest userRequest)
        {
            _logger.LogInformation("Executing UpdatingDate with RequestId: {RequestId} and userRequest: {@userRequest}", RequestId, userRequest);
            var item = await _requestReceivedService.UpdateUserRequestDate(RequestId, userRequest);
            _logger.LogInformation("UpdatingDate returned: {item}", item);
            return Ok(item);
        }
        #endregion
        #region RejectingRequest
        /// <summary>
        /// request to reject the employee test request
        /// </summary>
        /// <returns>returns with the response of list of request details</returns>
        [HttpDelete("AfterAdminDecision")]
        public async Task<ActionResult<List<UserRequest>>> DeleteRequest(int RequestId)
        {
            _logger.LogInformation("Executing AfterAdminDecision with RequestId: {RequestId}", RequestId);
            var item = await _requestReceivedService.DeleteRequest(RequestId);
            _logger.LogInformation("AfterAdminDecision returned: {item}", item);
            return Ok(item);
        }
        #endregion
    }
}
