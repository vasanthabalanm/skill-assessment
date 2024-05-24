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
    [Authorize(Roles = "Admin")]
    [ExcludeFromCodeCoverage]
    public class HistoryTableController : ControllerBase
    {
        #region Properties
        private readonly IHistoryTableService _historyTableService;
        private readonly ILogger<HistoryTableController> _logger;
        #endregion
        #region Constructor
        public HistoryTableController(IHistoryTableService historyTableService, ILogger<HistoryTableController> logger)
        {
            _historyTableService = historyTableService;
            _logger = logger;
        }
        #endregion
        #region GetAllTestHistoryDetails
        /// <summary>
        /// request to get the list of testhistory for both employee and jobseeker
        /// </summary>
        /// <param name="roleName"></param>
        /// <returns>returns a response of list of testhistory</returns>
        [HttpGet("HistoryDetails")]
        public async Task<ActionResult<List<HistoryDTO>>> GetHistory(string roleName)
        {
            _logger.LogInformation("Executing GetTestHistoryDetails with roleName: {roleName}", roleName);
            var item = await _historyTableService.GetHistory(roleName);
            _logger.LogInformation("GetHistory returned: {item}", item);
            return Ok(item);
        }
        #endregion
        #region GetTopicByDepartment
        /// <summary>
        /// request to get all the topics in the department
        /// </summary>
        /// <param name="deptlist"></param>
        /// <returns>returns a response of list of all topics in the department</returns>
        [HttpGet("GetTopicsByDepartment")]
        public async Task<ActionResult<List<string>>> GetTopicsByDepartment([FromQuery(Name = "deptlist")] string[] deptlist)
        {
            _logger.LogInformation("Executing GetTopicByDepartment Based on Department");
            var item = await _historyTableService.GetTopicsByDepartment(deptlist);
            _logger.LogInformation("GetTopicByDepartment returned: {item}", item);
            return Ok(item);
        }
        #endregion
        #region GetAllSkill
        /// <summary>
        /// request to get all the skills
        /// </summary>
        /// <returns>returns a response of list of skills</returns>
        [HttpGet("GetAllSkill")]
        public async Task<ActionResult<List<Skill>>> GetAllSkill()
        {
            _logger.LogInformation("Executing GetAllSkills");
            var item = await _historyTableService.GetAllSkill();
            _logger.LogInformation("GetAllSkills returned: {item}", item);
            return Ok(item);
        }
        #endregion
        #region GetAllQuestionType
        /// <summary>
        /// request to get all the question type
        /// </summary>
        /// <returns>returns a response of list of all question type</returns>
        [HttpGet("GetAllQuestionType")]
        public async Task<ActionResult<List<QuestionType>>> GetAllQnType()
        {
            _logger.LogInformation("Executing GetAllSkills");
            var item = await _historyTableService.GetAllQnType();
            _logger.LogInformation("GetAllSkills returned: {item}", item);
            return Ok(item);
        }
        #endregion
        #region FilterTestHistory
        /// <summary>
        /// request to get the filtered testhistory
        /// </summary>
        /// <param name="topiclist"></param>
        /// <param name="skillLevel"></param>
        /// <param name="roleName"></param>
        /// <returns>returns the list of testhistory</returns>
        [HttpGet("FilterByTopic")]
        public async Task<ActionResult<List<HistoryDTO>>> FilterByTopic([FromQuery(Name = "topiclist")] string[] topiclist, string skillLevel, string roleName)
        {
            var item = await _historyTableService.FilterByTopic(topiclist, skillLevel, roleName);
            _logger.LogInformation("FilterByTopic returned: {item}", item);
            return Ok(item);
        }
        #endregion
        #region DeleteAssessment
        /// <summary>
        /// request to delete a assessment
        /// </summary>
        /// <param name="UserAssessId"></param>
        /// <returns>returns with a response of deleted assessment</returns>
        [HttpDelete("DeleteAssessment")]
        public async Task<ActionResult<UserAssessment>> DeleteAssessment(int UserAssessId)
        {
            _logger.LogInformation("Executing DeleteAssessment with UserAssessId: {UserAssessId}", UserAssessId);
            var item = await _historyTableService.DeleteAssessment(UserAssessId);
            _logger.LogInformation("DeleteAssessment returned: {item}", item);
            return Ok(item);

        }
        #endregion
        #region DeleteAssessment
        /// <summary>
        /// request to delete a assessmentHistory
        /// </summary>
        /// <param name="UserAssessId"></param>
        /// <returns>returns with a response of deleted assessmentHistory</returns>
        [HttpDelete("DeleteAssessmentHistory")]
        public async Task<ActionResult<List<AssessmentHistory>>> DeleteAssessmentHistory(int HistId)
        {
            _logger.LogInformation("Executing DeleteAssessmentHistory with HistId: {HistId}", HistId);
            var item = await _historyTableService.DeleteAssessmentHistory(HistId);
            _logger.LogInformation("DeleteAssessmentHistory returned: {item}", item);
            return Ok(item);
        }
        #endregion
    }
}



