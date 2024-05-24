using SkillAssessment.Model.ViewModel;

namespace SkillAssessment.Interface.Repository
{
    public interface IViewProfileDetailsRepository
    {
        Task<EmployeeProfileDetailsViewDTO> GetUserProfile(string UserId);

    }
}
