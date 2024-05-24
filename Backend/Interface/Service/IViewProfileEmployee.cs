using SkillAssessment.Model.ViewModel;

namespace SkillAssessment.Interface.Service
{
    public interface IViewProfileEmployee
    {
        Task<EmployeeProfileDetailsViewDTO> GetUserProfile(string UserId);

    }
}
