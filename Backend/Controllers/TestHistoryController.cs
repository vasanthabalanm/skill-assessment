using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkillAssessment.Interface.Service;
using SkillAssessment.Model.ViewModel;
using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Controllers
{
    [Route("TestHistory")]
    [ApiController]
    [ExcludeFromCodeCoverage]
    [Authorize(Roles = "Admin")]
    public class TestHistoryController : ControllerBase
    {
        #region Properties
        private readonly ITestHistoryService _historyService;
        private readonly ILogger<TestHistoryController> _logger;
        #endregion
        #region Constructor
        public TestHistoryController(ITestHistoryService historyService, ILogger<TestHistoryController> logger)
        {
            _historyService = historyService;
            _logger = logger;
        }
        #endregion
        #region GetTestDetails
        /// <summary>
        /// request to get the particular testDetails
        /// </summary>
        /// <param name="RequestId"></param>
        /// <returns>returns with the response of that testDetails</returns>
        [HttpGet("History")]
        public async Task<ActionResult<TestHistoryDTO>> GetHistory(int UserAssessmentId)
        {
            _logger.LogInformation("TestResult with UserAssessmentId:{UserAssessmentId}", UserAssessmentId);
            var item = await _historyService.GetHistory(UserAssessmentId);
            _logger.LogInformation("TestResult returned: {item}", item);
            return Ok(item);
        }
        #endregion
    }
}
