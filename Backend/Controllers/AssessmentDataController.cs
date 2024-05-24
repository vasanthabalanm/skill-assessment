using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkillAssessment.Interface.Service;
using SkillAssessment.Model.CoreModel;
using SkillAssessment.Model.ViewModel;
using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ExcludeFromCodeCoverage]
    [Authorize(Roles = "Admin")]
    public class AssessmentDataController : ControllerBase
    {
        #region Properties
        private readonly IAssessmentDataServices _service;
        private readonly ILogger<AssessmentDataController> _logger;
        #endregion

        #region Constructor
        public AssessmentDataController(IAssessmentDataServices service, ILogger<AssessmentDataController> logger)
        {
            _service = service;
            _logger = logger;
        }
        #endregion

        #region Get Admin Details
        /// <summary>
        /// Getting Admin Details
        /// </summary>
        /// <returns></returns>
        [HttpGet("AdminDetails")]
        public async Task<ActionResult<User?>> GetAdminDetails()
        {
            _logger.LogInformation("Executing GetUsers");
            var item = await _service.GetAdminDetails();
            _logger.LogInformation("GetAdmin Details {item}", item);
            return Ok(item);
        }
        #endregion

        #region Updating Admin Data
        /// <summary>
        /// Updating Admin Data
        /// </summary>
        /// <param name="id"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        [HttpPut("UpdatingAdminValues")]
        public async Task<ActionResult<User?>> UpdateAdminDetails(string id, User user)
        {
            _logger.LogInformation("Executing Update Admin");
            var item = await _service.UpdateAdminDetails(id, user);
            _logger.LogInformation("Updated Values {item}", item);
            return Ok(item);
        }
        #endregion

        #region Get Selected Items
        /// <summary>
        /// Get Selected Items By User
        /// </summary>
        /// <param name="item"></param>
        /// <param name="rolename"></param>
        /// <returns></returns>
        [HttpPost("GetSelectedItems")]
        public async Task<ActionResult<List<AvailableAssessmentDTO>>> GetSelectedItems(SelectedItemsDTO item, string rolename)
        {
            _logger.LogInformation("Executing Get Selected Items for Employee ");
            if (item.topicid == null)
            {
                return BadRequest(item.topicid);
            }
            var items = await _service.GetSelectedItems(item.deptid, item.topicid, item.skillid, rolename);
            _logger.LogInformation("Returned Values : {items}", items);
            return Ok(items);
        }
        #endregion

        #region EmailPost
        [HttpPost("EmailPost")]
        public async Task<ActionResult<List<EmailHistory>>> PostEmail(EmailHistory emailHistory)
        {
            _logger.LogInformation("Posting Email");
            var item = await _service.PostEmail(emailHistory);
            _logger.LogInformation("Returned Values : {item}", item);
            return Ok(item);
        }
        #endregion

        #region Get All Assessments 
        /// <summary>
        /// Getting All Assessments For Employee and Jobseeker
        /// </summary>
        /// <param name="rolename"></param>
        /// <returns></returns>
        [HttpGet("AllAssessments")]
        public async Task<ActionResult<List<AvailableAssessmentDTO>?>> GetAllAssessmentDetails(string rolename)
        {
            _logger.LogInformation("Executing Get All Assessment Details for Employee");
            var item = await _service.GetAllAssessmentDetails(rolename);
            _logger.LogInformation("Returned : {item}", item);
            return Ok(item);
        }
        #endregion

        #region Get Side Bar Details
        /// <summary>
        /// Side Bar Details
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("GetSideBarDetails")]
        public async Task<ActionResult<SideBarDTO?>> GetEditSideBar(string id)
        {
            _logger.LogInformation("Executing GetEditSideBar with id: {id}", id);
            var item = await _service.GetEditSideBar(id);
            _logger.LogInformation("GetEditSideBar returned: {item}", item);
            return Ok(item);
        }
        #endregion
    }
}