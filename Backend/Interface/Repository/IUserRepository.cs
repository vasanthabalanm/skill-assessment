using SkillAssessment.Model.CoreModel;

namespace SkillAssessment.Interface.Repository
{
    public interface IUserRepository
    {
        Task<List<User>> GetAllUser();
        Task<object> PostUser(User user);
        Task<User> GettingAdminDetails();
        Task<User> UpdatingAdminDetails(string id, User user);
    }
}
