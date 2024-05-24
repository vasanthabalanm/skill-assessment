using SkillAssessment.GlobalException;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Interface.Service;
using SkillAssessment.Model.ViewModel;

namespace SkillAssessment.Service.ViewProfileDetailsService
{
    public class EmployeeProfileDetailsServices : IViewProfileEmployee
    {
        #region Properities
        private readonly IViewProfileDetailsRepository _repo;
        #endregion

        #region Constructor
        /// <summary>
        /// Parameterized Constructor
        /// </summary>
        /// <param name="repo"></param>
        public EmployeeProfileDetailsServices(IViewProfileDetailsRepository repo)
        {
            _repo = repo;
        }

        #endregion

        #region Get Employee profile Details by ID Service
        /// <summary>
        /// Retrieves an Employee profile by ID
        /// </summary>
        /// <returns>An Employee profile by ID details of objects.</returns>
        public async Task<EmployeeProfileDetailsViewDTO> GetUserProfile(string UserId)
        {
            try
            {
                var employeeDetail = await _repo.GetUserProfile(UserId);
                return employeeDetail ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new EmployeeProfileDetailsViewDTO();
            }
        }
        #endregion
    }
}
