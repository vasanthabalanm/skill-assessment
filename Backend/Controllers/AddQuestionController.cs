using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkillAssessment.Interface.Service;
using SkillAssessment.Model.CoreModel;
using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Controllers
{
    [Route("api/")]
    [ApiController]
    [ExcludeFromCodeCoverage]
    [Authorize(Roles = "Admin")]
    public class AddQuestionsController : ControllerBase
    {
        #region Properties
        private readonly IAddQuestionService _addQuestionService;
        private readonly ILogger<AddQuestionsController> _logger;
        private readonly IDepartmentService _departmentService;
        private readonly ISkillService _skillService;
        #endregion
        #region Constructors
        /// <summary>
        /// Parameterized Constructor
        /// </summary>
        /// <param name="addQuestionService"></param>
        /// <param name="logger"></param>
        /// <param name="departmentService"></param>
        /// /// <param name="skillService"></param>
        public AddQuestionsController(IAddQuestionService addQuestionService,
                                        IDepartmentService departmentService,
                                        ISkillService skillService, ILogger<AddQuestionsController> logger)
        {
            _addQuestionService = addQuestionService;
            _logger = logger;
            _departmentService = departmentService;
            _skillService = skillService;
        }
        #endregion
        #region UpdateQuestion
        /// <summary>
        /// request to update a question by passing its id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="addQuestion"></param>
        /// <returns>returns a response of the updated question</returns>
        [HttpPut("UpdateQuestions")]
        public async Task<ActionResult<AddQuestion>> UpdateQuestions(int id, AddQuestion addQuestion)
        {
            _logger.LogInformation("Update the questions by Id:{id} and values:{addQuestion}", id, addQuestion);
            var update = await _addQuestionService.UpdateQuestion(id, addQuestion);
            _logger.LogInformation("Returned values: {update}", update);
            return Ok(update);
        }
        #endregion
        #region PostQuestion
        /// <summary>
        /// request to add a new question
        /// </summary>
        /// <param name="addQuestion"></param>
        /// <returns>returns a response of added question</returns>
        [HttpPost("AddNewQuestions")]
        public async Task<ActionResult<AddQuestion>> AddNewQuestion(AddQuestion addQuestion)
        {
            _logger.LogInformation("Add the questions :{addQuestions}", addQuestion);
            var add = await _addQuestionService.AddQuestion(addQuestion);
            _logger.LogInformation("Returned values: {add}", add);
            return Ok(add);
        }
        #endregion
        #region DeleteQuestion
        /// <summary>
        /// request to delete a question
        /// </summary>
        /// <param name="id"></param>
        /// <returns>returns a response of 200</returns>
        [HttpDelete("DeleteQuestionById")]
        public async Task<ActionResult> DeleteQuestionById(int id)
        {
            _logger.LogInformation("Delete the questions by Id:{id}", id);
            var delete = await _addQuestionService.DeleteQuestion(id);
            _logger.LogInformation("Returned values: {delete}", delete);
            return NoContent();
        }
        #endregion
        #region GetQuestionByTopicId
        /// <summary>
        /// request to get a list of questions based on the topic
        /// </summary>
        /// <param name="topicId"></param>
        /// <returns>returns a response  of list of questions on that topic</returns>
        [HttpGet("GetQuestionsByTopic")]
        public async Task<ActionResult<List<AddQuestion>>> GetQuestionsByTopic(int topicId)
        {
            _logger.LogInformation("Get Questions by TopicId:{topicId}", topicId);
            var available = await _addQuestionService.GetQuestionByTopic(topicId); ;
            _logger.LogInformation("Returned values: {available}", topicId);
            return Ok(available);
        }
        #endregion
        #region GetQuestionByTopicAndSkill
        /// <summary>
        /// request to get a list of questions based on the skills
        /// </summary>
        /// <param name="topicId"></param>
        /// <param name="skillId"></param>
        /// <returns>returns a response  of list of questions on that topic</returns>
        [HttpGet("GetQuestionsByTopicAndSkill")]
        public async Task<ActionResult<List<AddQuestion>>> GetQuestionsByTopicSkill(int topicId, int skillId)
        {
            _logger.LogInformation("Get Questions by TopicId:{TopicId}", topicId);
            var available = await _addQuestionService.GetQuestionsByTopicAndSkill(topicId, skillId);
            _logger.LogInformation("Returned values: {available}", topicId);
            return Ok(available);
        }
        #endregion
        #region GetAllDepartment
        /// <summary>
        /// request to get all departments
        /// </summary>
        /// <returns>returns a response  of list of all the departments</returns>
        [HttpGet("GetAllDepartment")]
        public async Task<ActionResult<List<Department>>> GetAllDepartment()
        {
            _logger.LogInformation("Get all department");
            var department = await _departmentService.GetAllDepartments();
            _logger.LogInformation("Returned values: {department}", department);
            return Ok(department);
        }
        #endregion
        #region GetAllSkillLevel
        /// <summary>
        /// request to get all skill level
        /// </summary>
        /// <returns>returns a response  of list of all the departments</returns>
        [HttpGet("GetAllSkillLevel")]
        public async Task<ActionResult<List<Skill>>> GetAllSkill()
        {
            _logger.LogInformation("Get all skill");
            var skill = await _skillService.GetAllSkillLevel();
            _logger.LogInformation("Returned values: {skill}", skill);
            return Ok(skill);
        }
        #endregion
    }
}
