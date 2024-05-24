using Microsoft.AspNetCore.Mvc;
using SkillAssessment.Interface.Service;
using SkillAssessment.Model.CoreModel;
using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Controllers
{
    [Route("UserEntityTable")]
    [ApiController]
    [ExcludeFromCodeCoverage]
    public class UserController : ControllerBase
    {
        #region Properties
        private readonly IUserService _userService;
        private readonly ILogger<UserController> _logger;
        #endregion
        #region Constructor
        /// <summary>
        /// Parameterized Constructor
        /// </summary>
        /// <param name="userService"></param>
        /// <param name="logger"></param>
        public UserController(IUserService userService, ILogger<UserController> logger)
        {
            _userService = userService;
            _logger = logger;
        }
        #endregion
        #region GetAllUsers
        [HttpGet("GetAllUsers")]
        public async Task<ActionResult<List<User>>> GetAllUser()
        {
            _logger.LogInformation("Executing Getting All Users");
            var obj = await _userService.GetAllUser();
            _logger.LogInformation("Getting Users returned: {obj}", obj);
            return Ok(obj);
        }
        #endregion
        #region PostNewUsers
        [HttpPost("PostingNewUsers")]
        public async Task<ActionResult<Object>> PostUser(User user)
        {
            _logger.LogInformation("Executing Getting All Users");
            var item = await _userService.PostUser(user);
            _logger.LogInformation("Posting Users returned: {item}", item);
            return item;
        }
        #endregion
    }
}
