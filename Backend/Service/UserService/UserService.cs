using SkillAssessment.GlobalException;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Interface.Service;
using SkillAssessment.Model.CoreModel;

namespace SkillAssessment.Services.UserService
{
    public class UserService : IUserService
    {
        #region Properties
        private readonly IUserRepository _userRepository;
        #endregion
        #region Constructors
        /// <summary>
        /// Parameterized Constructor
        /// </summary>
        /// <param name="userrepository"></param>
        public UserService(IUserRepository userrepository)
        {
            _userRepository = userrepository;
        }
        #endregion
        #region Getting All Users Service
        /// <summary>
        /// Retrieves a list of all users, including employees and job seekers.
        /// </summary>
        /// <returns>A list of user objects.</returns>
        public async Task<List<User>> GetAllUser()
        {
            try
            {
                var allUsers = await _userRepository.GetAllUser();
                return allUsers ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<User>();
            }
        }
        #endregion
        #region Post New Users Service
        /// <summary>
        /// Creates a new user.
        /// </summary>
        /// <param name="user">The user object to be created.</param>
        /// <returns>The newly created user object.</returns>
        public async Task<Object> PostUser(User user)
        {
            try
            {
                var addUsers = await _userRepository.PostUser(user);
                return addUsers ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<User>();
            }
        }
        #endregion
    }
}
