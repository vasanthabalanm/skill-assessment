using SkillAssessment.Model.View_Model;

namespace SkillAssessment.Interface.Repository
{
    public interface IEmployeeTestHistoryRepository
    {
        Task<List<EmployeesTestHistoryDTO>> CompletedUserTest(string UserId);
        Task<List<EmployeesTestHistoryDTO>> OngoingUserTest(string userid);

    }
}
