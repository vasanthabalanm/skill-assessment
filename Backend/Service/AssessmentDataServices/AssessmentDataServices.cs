using SkillAssessment.Interface.Repository;
using SkillAssessment.Interface.Service;
using SkillAssessment.Model.CoreModel;
using SkillAssessment.Model.ViewModel;

namespace SkillAssessment.Services.AssessmentDataServices
{
    public class AssessmentDataServices : IAssessmentDataServices
    {
        #region Properties
        private readonly IAssessmentDataRepository _repo;
        private readonly IUserRepository _user;
        private readonly ISelectedItemsByUser _select;
        private readonly IAvailableAssessmentSideBar _side;
        private readonly IPostEmailRepository _email;
        #endregion

        #region Constructors
        public AssessmentDataServices(IAssessmentDataRepository repo, IUserRepository user, ISelectedItemsByUser select, IAvailableAssessmentSideBar side, IPostEmailRepository email)
        {
            _repo = repo;
            _user = user;
            _select = select;
            _side = side;
            _email = email;
        }
        #endregion

        #region GetAllAssessment Details For Employee & Jobseeker Service
        /// <summary>
        /// Fetching all Assessments for Employee and Jobseeker
        /// </summary>
        /// <param name="rolename"></param>
        /// <returns></returns>
        public async Task<List<AvailableAssessmentDTO>?> GetAllAssessmentDetails(string rolename)
        {
            try
            {
                var assessmentDTos = await _repo.GetAllAssessmentDetailsByRole(rolename);
                return assessmentDTos;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<AvailableAssessmentDTO>();
            }
        }
        #endregion

        #region Getting Admin Details Service
        /// <summary>
        /// Fetching Admin Details
        /// </summary>
        /// <returns></returns>
        public async Task<User?> GetAdminDetails()
        {
            try
            {
                var users = await _user.GettingAdminDetails();
                return users;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new User();
            }
        }
        #endregion

        #region Update Admin Details Service
        /// <summary>
        /// Updating Admin Details 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public async Task<User?> UpdateAdminDetails(string id, User user)
        {
            try
            {
                var users = await _user.UpdatingAdminDetails(id, user);
                return users;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new User();
            }
        }
        #endregion

        #region Get Selected Items Service
        /// <summary>
        /// Sorting the assessments by Department, Topics and Skill Level
        /// </summary>
        /// <param name="DeptId"></param>
        /// <param name="TopicId"></param>
        /// <param name="SkillId"></param>
        /// <param name="rolename"></param>
        /// <returns></returns>
        public async Task<List<AvailableAssessmentDTO>?> GetSelectedItems(int DeptId, int[] TopicId, int SkillId, string rolename)
        {
            try
            {
                var items = await _select.GetSelectedItemsByUser(DeptId, TopicId, SkillId, rolename);
                return items;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<AvailableAssessmentDTO>();
            }
        }
        #endregion

        #region Side Bar Details Service
        /// <summary>
        /// Side Bar Details
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<SideBarDTO?> GetEditSideBar(string id)
        {
            try
            {
                var item = await _side.AvailableAssessmentEditSideBar(id);
                return item;
            }
            catch (ArgumentNullException ex)
            {
                Console.WriteLine(ex.Message, "Cannot Post New Assessment");
                return new SideBarDTO();
            }
        }
        #endregion

        #region Post Email Service
        /// <summary>
        /// Posting Email
        /// </summary>
        /// <param name="emailHistory"></param>
        /// <returns></returns>
        public async Task<List<EmailHistory>> PostEmail(EmailHistory emailHistory)
        {
            try
            {
                var items = await _email.PostEmailRepo(emailHistory);
                return items;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<EmailHistory>();
            }
        }
        #endregion
    }
}