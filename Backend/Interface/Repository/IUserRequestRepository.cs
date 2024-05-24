using SkillAssessment.Model.CoreModel;

namespace SkillAssessment.Interface.Repository
{
    public interface IUserRequestRepository
    {
        Task<UserRequest> UpdateUserRequest(int RequestId, UserRequest userRequest);
        Task<UserRequest> UpdateUserRequestDate(int RequestId, UserRequest userRequest);
        Task<List<UserRequest>> DeleteRequest(int RequestId);
    }
}
