using SkillAssessment.Model.CoreModel;
using SkillAssessment.Model.ViewModel;

namespace SkillAssessment.Interface.Service
{
    public interface IPostAssessmentService
    {
        public Task<UserAssessment> PostExistingAssessment(UserAssessment userAssessment);
        public Task<List<User>> GetAllEmployee();
        public Task<AccessoriesDTO> GetEditSideBar(int id);
        public Task<AccessoriesDTO> GetEditSideBarForRequest(int id);
        public Task<UserAssessment> PutDate(int userassessId, UserAssessment userAssess);
        public Task<List<QuestionPage>?> CreateQuestionPages(string assessId, RandomQuestionsRequestDTO requestDto, string[] names);
    }
}
