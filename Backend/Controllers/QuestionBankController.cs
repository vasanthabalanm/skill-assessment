using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkillAssessment.Interface.Service;
using SkillAssessment.Model.CoreModel;
using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Controllers
{
    [Route("api/")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    [ExcludeFromCodeCoverage]
    public class QuestionBankController : ControllerBase
    {
        #region Properties
        private readonly IQuestionBankService _questionBankService;
        private readonly ILogger<QuestionBankController> _logger;
        private readonly ITopicService _topicService;
        #endregion
        #region Constructor
        /// <summary>
        /// Parameterized Constructor
        /// </summary>
        /// <param name="logger"></param>
        /// <param name="questionBankService"></param>
        /// /// <param name="topicService"></param>
        public QuestionBankController(ILogger<QuestionBankController> logger, IQuestionBankService questionBankService, ITopicService topicService)
        {
            _logger = logger;
            _questionBankService = questionBankService;
            _topicService = topicService;
        }
        #endregion
        #region GetParticularTopicName
        /// <summary>
        /// request to get particular topic name based on the topicId
        /// </summary>
        /// <returns>returns with the response of the topic</returns>
        [HttpGet("GetTopicName")]
        public async Task<ActionResult<string>> GetTopicNameById(int id)
        {
            _logger.LogInformation("Get topics");
            var available = await _topicService.GetTopicName(id);
            _logger.LogInformation("Returned value:{available}", available);
            return Ok(available);
        }
        #endregion
        #region GetQuestionCountBySkillIdAndTopicId
        /// <summary>
        /// request to get the count of questions for the topic and skill id
        /// </summary>
        /// <returns>returns with the response of the number of questions for the topic and skill id</returns>
        [HttpGet("GetQuestionCountBySkillIdAndTopicId")]
        public async Task<ActionResult<int>> GetCountFromTopicIdAndSkill(int skillId, int topicId)
        {
            _logger.LogInformation("Get question count by skillId:{skillId} topicId:{topicId}", skillId, topicId);
            var available = await _questionBankService.GetQuestionCountBySkillIdAndTopicId(skillId, topicId);
            _logger.LogInformation("Returned values: {available}", available);
            return Ok(available);
        }
        #endregion
        #region GetAllTopics
        /// <summary>
        /// request to get the list of topics
        /// </summary>
        /// <returns>returns with the response of list of topics</returns>
        [HttpGet("GetAllTopics")]
        public async Task<ActionResult<List<Topic>>> GetAllTopics()
        {
            _logger.LogInformation("Get all topics ");
            var available = await _topicService.GetTopic();
            _logger.LogInformation("Returned values: {available}", available);
            return Ok(available);
        }
        #endregion
        #region GetListOfTopicBasedOnDepartmentId
        /// <summary>
        /// request to get the list of topics for that departmentId
        /// </summary>
        /// <param name="departmentId"></param>
        /// <returns>returns with the response of list of topics for that departmentId</returns>
        [HttpGet("GetTopic")]
        public async Task<ActionResult<List<Topic>>> GetTopics(int departmentId)
        {
            _logger.LogInformation("Get topics by departmentId:{departmentId}", departmentId);
            var available = await _topicService.GetAllTopicsById(departmentId); ;
            _logger.LogInformation("Returned values: {available}", available);
            return Ok(available);
        }
        #endregion
        #region PostTopic
        /// <summary>
        /// request to post a topic
        /// </summary>
        /// <param name="departmentId"></param>
        /// <returns>returns with the response of the posted topic</returns>
        [HttpPost("AddTopicWithImage")]
        public async Task<ActionResult<Topic>> AddTopics([FromForm] Topic topic)
        {
            _logger.LogInformation("Add topics:{topic}", topic);
            var addTopic = await _topicService.PostTopics(topic);
            _logger.LogInformation("Returned value:{addTopic}", addTopic);
            return Ok(addTopic);
        }
        #endregion
        #region QuestionCountByTopicId
        /// <summary>
        /// request to get the count of questions for the topicId
        /// </summary>
        /// <param name="departmentId"></param>
        /// <returns>returns with the response of count</returns>
        [HttpGet("QuestionCountByTopicId")]
        public async Task<ActionResult<int>> GetQuestionCountByTopicId(int topicId)
        {
            _logger.LogInformation("Get count of the questions by topicId:{topicId}", topicId);
            var get = await _questionBankService.GetAvailableQuestionCount(topicId);
            _logger.LogInformation("Returned values: {get}", get);
            return Ok(get);
        }
        #endregion
    }
}
