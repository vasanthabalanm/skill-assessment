using SkillAssessment.GlobalException;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Interface.Service;
using SkillAssessment.Model.CoreModel;
using SkillAssessment.Model.ViewModel;

namespace SkillAssessment.Repository.PostAssessmentRepository
{
    public class PostAssessmentService : IPostAssessmentService
    {
        #region Properties
        private readonly IUserAssessmentRepository _userAssessmentRepository;
        private readonly IUserRepository _userRepository;
        private readonly IRandomQuestionRepository _randomQuestionRepository;
        private readonly IStoredProcedureRepository _storedProcedureRepository;
        #endregion
        #region Constructor
        /// <summary>
        /// Parameterized Constructor
        /// </summary>
        /// <param name="userAssessmentRepository"></param>
        /// <param name="userRepository"></param>
        /// <param name="randomQuestionRepository"></param>
        /// <param name="storedProcedureRepository"></param>
        public PostAssessmentService(IUserAssessmentRepository userAssessmentRepository, IUserRepository userRepository, IRandomQuestionRepository randomQuestionRepository, IStoredProcedureRepository storedProcedureRepository)
        {
            _userAssessmentRepository = userAssessmentRepository;
            _userRepository = userRepository;
            _randomQuestionRepository = randomQuestionRepository;
            _storedProcedureRepository = storedProcedureRepository;
        }
        #endregion
        #region Post UserAssessment Service
        /// <summary>
        /// Post new UserAssessment
        /// </summary>
        /// <returns>newly posted UserAssessment.</returns>
        public async Task<UserAssessment> PostExistingAssessment(UserAssessment userAssessment)
        {
            try
            {
                var item = await _userAssessmentRepository.Add(userAssessment) ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
                return item;
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); return new UserAssessment(); }
        }
        #endregion
        #region User Retrieval Service
        /// <summary>
        /// Retrieves a list of all Users, including both Employees and Jobseekers.
        /// </summary>
        /// <returns>A list of User objects representing Employees and Jobseekers, or an empty list if no users are found.</returns>
        public async Task<List<User>> GetAllEmployee()
        {
            try
            {
                var item = await _userRepository.GetAllUser() ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
                return item;
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); return new List<User>(); }
        }
        #endregion
        #region Getting Sidebar Details Service
        /// <summary>
        /// Retrieves sidebar details of both employee and jobseeker
        /// </summary>
        /// <returns>The details for the Id.</returns>
        public async Task<AccessoriesDTO> GetEditSideBar(int id)
        {
            try
            {
                var item = await _storedProcedureRepository.GetEditSideBar(id) ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
                return item;
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); return new AccessoriesDTO(); }
        }
        #endregion
        #region Get Request Sidebar Details Service
        /// <summary>
        /// Retrieves request sidebar details for employee
        /// </summary>
        /// <returns>The details for the Id.</returns>
        public async Task<AccessoriesDTO> GetEditSideBarForRequest(int id)
        {
            try
            {
                var item = await _storedProcedureRepository.GetEditSideBarForRequest(id) ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
                return item;
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); return new AccessoriesDTO(); }
        }
        #endregion
        #region Put DateOfCompletion Service
        /// <summary>
        /// Update DateOfCompletion of the particular UserAssessment
        /// </summary>
        /// <returns>The details for the Updated Id.</returns>
        public async Task<UserAssessment> PutDate(int userassessId, UserAssessment userAssess)
        {
            try
            {
                var item = await _userAssessmentRepository.PutDate(userassessId, userAssess) ?? throw new Exception(CustomException.ExceptionMessages["NoUpdate"]);
                return item;
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); return new UserAssessment(); }
        }
        #endregion
        #region Generating Random Questions Service
        /// <summary>
        /// Generates Random Question baes on number of users and number of questions
        /// </summary>
        /// <returns>TList of Questions that are randomly genearted.</returns>
        public async Task<List<QuestionPage>?> CreateQuestionPages(string assessId, RandomQuestionsRequestDTO requestDto, string[] names)
        {
            try
            {
                var questions = await _randomQuestionRepository.CreateQuestionPages(assessId, requestDto, names) ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
                return questions;
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); return null; }
        }
        #endregion
    }
}
