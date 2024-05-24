using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata;
using SkillAssessment.Interface.Service;
using SkillAssessment.Model.View_Model;
using SkillAssessment.Model.ViewModel;
using System.Data;

namespace SkillAssessment.Controllers
{
    [Route("allocatedassessment")]
    [ApiController]
    [Authorize(Roles = "Employee")]
    public class AllocatedAssessmentController:ControllerBase
    {
        #region Properties
        private readonly IAllottedAssessmentService _allottedAssessmentService;
        private readonly ILogger<AllocatedAssessmentController> _logger;
        #endregion

        #region Constructor
        /// <summary>
        /// Parameterized Constructor
        /// </summary>
        /// <param name="allottedAssessmentService"></param>
        /// <param name="logger"></param>

        public AllocatedAssessmentController(IAllottedAssessmentService allottedAssessmentService, ILogger<AllocatedAssessmentController> logger)
        {
            _logger = logger;
            _allottedAssessmentService = allottedAssessmentService;
        }
        #endregion

        #region Get All Allocated Assessment for an Employee ID
        /// <summary>
        /// Retrieves an Employee profile by ID
        /// </summary>
        /// <returns>An Employee profile by ID details of objects.</returns>
        [HttpGet("assessments")]
        public async Task<ActionResult<List<AllottedTestDTO>>> GetAllottedTest(string UserId)
        {
            _logger.LogInformation("Get all users by userid:{userid}", UserId);
            var get = await _allottedAssessmentService.GetAllottedTest(UserId);
            _logger.LogInformation("Returned values: {get}", get);
            return Ok(get);
        }
        #endregion
    }
}
