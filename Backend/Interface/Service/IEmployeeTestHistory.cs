using SkillAssessment.Model.View_Model;

namespace SkillAssessment.Interface.Service
{
    public interface IEmployeeTestHistory
    {
        Task<List<EmployeesTestHistoryDTO>> CompletedUserTest(string UserId);
        Task<List<EmployeesTestHistoryDTO>> OngoingUserTest(string userid);

    }
}
