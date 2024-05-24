using SkillAssessment.Model.ViewModel;

namespace SkillAssessment.Interface.Service
{
    public interface IRequestUserDetailsService
    {
        public Task<RequestUserDTO> GetRequestUser(int RequestId);
    }
}
