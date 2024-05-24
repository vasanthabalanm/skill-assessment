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
    public class PostAssessmentController : ControllerBase
    {
        #region Properties
        private readonly IPostAssessmentService _postAssessmentService;
        private readonly ILogger<PostAssessmentController> _logger;
        #endregion
        #region Controller
        /// <summary>
        /// Parameterized Controller
        /// </summary>
        /// <param name="postAssessmentService"></param>
        /// <param name="logger"></param>
        public PostAssessmentController(IPostAssessmentService postAssessmentService, ILogger<PostAssessmentController> logger)
        {
            _postAssessmentService = postAssessmentService;
            _logger = logger;
        }
        #endregion
        #region PostExistingAssessment
        /// <summary>
        /// request to post an assessment
        /// </summary>
        /// <param name="userAssessment"></param>
        /// <returns>returns with the response of posted assessment value</returns>
        [HttpPost("PostExistingAssessment")]
        public async Task<ActionResult<UserAssessment>> PostExistingAssessment(UserAssessment userAssessment)
        {
            _logger.LogInformation("Executing PostExistingAssessment with userAssessment: {userAssessment}", userAssessment);
            var item = await _postAssessmentService.PostExistingAssessment(userAssessment);
            _logger.LogInformation("PostExistingAssessment returned: {item}", item);
            return Ok(item);
        }
        #endregion
        #region GetAllEmployee
        /// <summary>
        /// request to get all employee
        /// </summary>
        /// <returns>returns with a response of list of employees</returns>
        [HttpGet("GetAllEmployee")]
        public async Task<ActionResult<List<User>>> GetAllEmployee()
        {
            _logger.LogInformation("Executing GetAllEmployee");
            var item = await _postAssessmentService.GetAllEmployee();
            _logger.LogInformation("GetAllEmployee returned: {item}", item);
            return Ok(item);
        }
        #endregion
        #region GetSideBarDetails
        /// <summary>
        /// request to get the sidebar details of the particular userAssessmentId
        /// </summary>
        /// <param name="id"></param>
        /// <returns>returns a response with a values on that particular userAssessmentId</returns>
        [HttpGet("GetSideBarDetails")]
        public async Task<ActionResult<AccessoriesDTO>> GetEditSideBar(int id)
        {
            _logger.LogInformation("Executing GetEditSideBar with id: {id}", id);
            var item = await _postAssessmentService.GetEditSideBar(id);
            _logger.LogInformation("GetEditSideBar returned: {item}", item);
            return Ok(item);
        }
        #endregion
        #region GetSideBarDetailForRequest
        /// <summary>
        /// request to get the sidebar details of the particular reuestId
        /// </summary>
        /// <param name="id"></param>
        /// <returns>returns a response with a values on that particular requestId</returns>
        [HttpGet("GetSideBarDetailForRequest")]
        public async Task<ActionResult<AccessoriesDTO>> GetEditSideBarForRequest(int id)
        {
            _logger.LogInformation("Executing GetEditSideBarForRequest with id: {id}", id);
            var item = await _postAssessmentService.GetEditSideBarForRequest(id);
            _logger.LogInformation("GetEditSideBarForRequest returned: {item}", item);
            return Ok(item);
        }
        #endregion
        #region PutCompletionDate
        /// <summary>
        /// request to update completion date
        /// </summary>
        /// <param name="userAssessment"></param>
        /// <returns>returns with the response of updated userAssessment</returns>
        [HttpPut("PutCompletionDate")]
        public async Task<ActionResult<UserAssessment>> PutDate(int userassessId, UserAssessment userAssess)
        {
            _logger.LogInformation("Executing putDate with userassessId: {userassessId} and userAssess: {userAssess}", userassessId, userAssess);
            var item = await _postAssessmentService.PutDate(userassessId, userAssess);
            _logger.LogInformation("putDate returned: {item}", item);
            return Ok(item);
        }
        #endregion
        #region PostAssessmentDetails
        /// <summary>
        /// request to post an question by generating random question
        /// </summary>
        /// <param name="userAssessment"></param>
        /// <returns>returns with the response of posted question</returns>
        [HttpPost("PostingAssessmentDetails")]
        public async Task<ActionResult<QuestionPage>> CreateQuestionPages(string assessId, RandomQuestionsRequestDTO requestDto, [FromQuery(Name = "names")] string[] names)
        {
            _logger.LogInformation("Posting random Question in QuestionPage");
            var add = await _postAssessmentService.CreateQuestionPages(assessId, requestDto, names);
            return Ok(add);
        }
        #endregion
    }
}
