using SkillAssessment.Model.CoreModel;

namespace SkillAssessment.Interface.Service
{
    public interface IUserService
    {
        Task<List<User>> GetAllUser();
        Task<object> PostUser(User user);
    }
}
