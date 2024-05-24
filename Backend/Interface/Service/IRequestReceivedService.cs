using SkillAssessment.Model.CoreModel;
using SkillAssessment.Model.ViewModel;

namespace SkillAssessment.Interface.Service
{
    public interface IRequestReceivedService
    {
        public Task<List<RequestDTO>> GetRequest();
        public Task<UserRequest> UpdateUserRequest(int RequestId, UserRequest userRequest);
        public Task<UserRequest> UpdateUserRequestDate(int RequestId, UserRequest userRequest);
        public Task<List<UserRequest>> DeleteRequest(int RequestId);
    }
}
