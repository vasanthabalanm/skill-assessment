using SkillAssessment.Model.DTO;
using SkillAssessment.Model.View_Model;

namespace SkillAssessment.Interface.Service
{
    public interface IAuthService
    {
        Task<UserDTO?> Register(UserRegisterDTO userRegisterDTO);
        Task<UserDTO?> Login(UserDTO userDTO);
        Task<UserDTO?> Update(UserRegisterDTO user);
        Task<bool> UpdatePassword(UserDTO userDTO);
    }
}
