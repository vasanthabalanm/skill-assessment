using SkillAssessment.Model.View_Model;
using SkillAssessment.Model.ViewModel;

namespace SkillAssessment.Interface.Repository
{
    public interface IStoredProcedureRepository
    {
        Task<List<HistoryDTO>> GetHistory(string roleName);
        Task<TestHistoryDTO> GetTestResult(int UserAssessmentId);
        Task<List<RequestDTO>> GetRequest();
        Task<RequestUserDTO> GetRequestUser(int RequestId);
        Task<AccessoriesDTO> GetEditSideBar(int id);
        Task<AccessoriesDTO> GetEditSideBarForRequest(int id);
        Task<List<AllottedTestDTO>> GetAllottedTest(string UserId);
    }
}
