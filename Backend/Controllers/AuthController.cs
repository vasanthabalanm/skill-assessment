using Microsoft.AspNetCore.Mvc;
using SkillAssessment.Interface.Service;
using SkillAssessment.Model.CoreModel;
using SkillAssessment.Model.DTO;
using SkillAssessment.Model.View_Model;
using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [ExcludeFromCodeCoverage]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _userService;
        public AuthController(IAuthService userService)
        {
            _userService = userService;
        }
        [ProducesResponseType(typeof(User), StatusCodes.Status200OK)]//Success Response
        [ProducesResponseType(StatusCodes.Status404NotFound)]//Failure Response
        [HttpPost]
        public async Task<ActionResult<UserDTO?>> Register([FromForm] UserRegisterDTO userRegisterDTO)
        {
            try
            {

                UserDTO? user = await _userService.Register(userRegisterDTO);
                if (user == null)
                    return BadRequest();
                return Created("User Registered", user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [ProducesResponseType(typeof(User), StatusCodes.Status200OK)]//Success Response
        [ProducesResponseType(StatusCodes.Status404NotFound)]//Failure Response
        [HttpPost]
        public async Task<ActionResult<UserDTO?>> LogIN(UserDTO userDTO)
        {
            try
            {
                UserDTO? user = await _userService.Login(userDTO);
                if (user == null)
                    return BadRequest();
                return Ok(user);
            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [ProducesResponseType(typeof(UserDTO), StatusCodes.Status200OK)]//Success Response
        [ProducesResponseType(StatusCodes.Status404NotFound)]//Failure Response
        [HttpPut]
        public async Task<ActionResult<UserDTO?>> Update(UserRegisterDTO user)
        {
            try
            {
                var myUser = await _userService.Update(user);
                if (myUser == null)
                    return NotFound();
                return Created("User Updated Successfully", myUser);
            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut]
        public async Task<ActionResult<string>> Update_Password(UserDTO user)
        {
            try
            {
                bool? myUser = await _userService.UpdatePassword(user);
                if (myUser == null)
                    return NotFound();
                return Ok("Password Updated Successfully");
            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}