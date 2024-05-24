using SkillAssessment.GlobalException;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Interface.Service;
using SkillAssessment.Model.CoreModel;
using SkillAssessment.Model.ViewModel;

namespace SkillAssessment.Services.HistoryTableService
{
    public class HistoryTableService : IHistoryTableService
    {
        #region Properties
        private readonly IUserAssessmentRepository _userAssessmentRepository;
        private readonly IAssessmentHistoryRepository _assessmentHistoryRepository;
        private readonly IQuestionTypeRepository _questionTypeRepository;
        private readonly ITopicRepository _topicRepository;
        private readonly ISkillRepository _skillRepository;
        private readonly IFilterTestHistoryRepository _filterTestHistoryRepository;
        private readonly IStoredProcedureRepository _storedProcedureRepository;
        #endregion
        #region Constructors
        /// <summary>
        /// Parameterized Constructor
        /// </summary>
        /// <param name="assessmentHistoryRepository"></param>
        /// <param name="userAssessmentRepository"></param>
        /// <param name="questionTypeRepository"></param>
        /// <param name="topicRepository"></param>
        /// <param name="skillRepository"></param>
        /// <param name="storedProcedureRepository"></param>
        /// <param name="filterTestHistoryRepository"></param>
        public HistoryTableService(IUserAssessmentRepository userAssessmentRepository, IAssessmentHistoryRepository assessmentHistoryRepository, IQuestionTypeRepository questionTypeRepository, ITopicRepository topicRepository, ISkillRepository skillRepository, IStoredProcedureRepository storedProcedureRepository, IFilterTestHistoryRepository filterTestHistoryRepository)
        {
            _assessmentHistoryRepository = assessmentHistoryRepository;
            _userAssessmentRepository = userAssessmentRepository;
            _questionTypeRepository = questionTypeRepository;
            _topicRepository = topicRepository;
            _skillRepository = skillRepository;
            _storedProcedureRepository = storedProcedureRepository;
            _filterTestHistoryRepository = filterTestHistoryRepository;
        }
        #endregion
        #region Get All TestHistory Service
        /// <summary>
        /// Retrieves a list of all test history for both employee and jobseeker
        /// </summary>
        /// <returns>A list of test history objects.</returns>
        public async Task<List<HistoryDTO>> GetHistory(string roleName)
        {
            try
            {
                var items = await _storedProcedureRepository.GetHistory(roleName);
                return items ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); return new List<HistoryDTO>(); }
        }
        #endregion
        #region Get All QuestionTypes Service
        /// <summary>
        /// Retrieves a list of all questionTypes.
        /// </summary>
        /// <returns>A list of all questionTypes.</returns>
        public async Task<List<QuestionType>> GetAllQnType()
        {
            try
            {
                var item = await _questionTypeRepository.GetAll() ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
                return item;
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); return new List<QuestionType>(); }
        }
        #endregion
        #region Get Topics Based on Department Service
        /// <summary>
        /// Retrieves a list of topics based on department
        /// </summary>
        /// <returns>A list of topics.</returns>
        public async Task<List<string>> GetTopicsByDepartment(string[] deptlist)
        {
            try
            {
                var topics = await _topicRepository.GetTopicsByDepartmentArray(deptlist);
                return topics ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); return new List<string>(); }
        }
        #endregion
        #region Get All Skills Service
        /// <summary>
        /// Retrieves a list of all skills.
        /// </summary>
        /// <returns>A list of all skills.</returns>
        public async Task<List<Skill>> GetAllSkill()
        {
            try
            {
                var item = await _skillRepository.GetSkills() ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
                return item;
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); return new List<Skill>(); }
        }
        #endregion
        #region Filter TestHistory Service
        /// <summary>
        /// Retrieves a list of testHistory.
        /// </summary>
        /// <returns>A list of testHistory.</returns>
        public async Task<List<HistoryDTO>> FilterByTopic(string[] topiclist, string skillLevel, string roleName)
        {
            try
            {
                var result = await _filterTestHistoryRepository.FilterByTopic(topiclist, skillLevel, roleName) ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]); ;
                return result;
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); return new List<HistoryDTO>(); }
        }
        #endregion
        #region Delete UserAssessment Service
        /// <summary>
        /// Delete a UserAssessment.
        /// </summary>
        /// <returns>Deleted UserAssessment.</returns>
        public async Task<UserAssessment> DeleteAssessment(int UserAssessId)
        {
            try
            {
                var item = await _userAssessmentRepository.Delete(UserAssessId) ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
                return item;
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); return new UserAssessment(); }
        }
        #endregion
        #region Delete AssessmentHistory Service
        /// <summary>
        /// Delete a AssessmentHistory.
        /// </summary>
        /// <returns>Deleted AssessmentHistory.</returns>
        public async Task<List<AssessmentHistory>> DeleteAssessmentHistory(int HistId)
        {
            try
            {
                var item = await _assessmentHistoryRepository.DeleteAssessmentHistory(HistId) ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
                return item;
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); return new List<AssessmentHistory>(); }
        }
        #endregion
    }
}
