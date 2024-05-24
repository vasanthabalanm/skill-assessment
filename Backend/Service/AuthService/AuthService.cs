using Microsoft.AspNetCore.Mvc;
using SkillAssessment.GlobalException;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Interface.Service;
using SkillAssessment.Model.CoreModel;
using SkillAssessment.Model.DTO;
using SkillAssessment.Model.View_Model;
using System.Security.Cryptography;
using System.Text;

namespace SkillAssessment.Repository.Services.AuthService
{
    public class AuthService : IAuthService
    {
        #region Properties
        private readonly ICrudRepository<User, UserDTO> _userRepo;
        private readonly ITokenGenerate _tokenService;
        private readonly IWebHostEnvironment _hostEnvironment;
        #endregion
        #region Constructor
        /// <summary>
        /// Parameterized Constructor
        /// </summary>
        /// <param name="userRepo"></param>
        /// <param name="tokenService"></param>
        /// <param name="hostEnvironment"></param>
        public AuthService(ICrudRepository<User, UserDTO> userRepo, ITokenGenerate tokenService, IWebHostEnvironment hostEnvironment)
        {
            _userRepo = userRepo;
            _tokenService = tokenService;
            _hostEnvironment = hostEnvironment;
        }
        #endregion

        #region Login Service
        /// <summary>
        /// The Login method is responsible for validating user login credentials and generating an authentication token upon successful login. It retrieves user data from a repository, computes a hash of the provided password, compares it with the stored password hash, and if they match, it generates an authentication token for the user.
        /// </summary>
        /// <param name="userDTO"></param>
        /// <exception cref="Exception"></exception>
        public async Task<UserDTO?> Login(UserDTO userDTO)
        {
            UserDTO? user = null;
            var userData = await _userRepo.GetValue(userDTO);
            if (userData != null)
            {
                if (userData.Hashkey == null)
                {
                    throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
                }
                var hmac = new HMACSHA512(userData.Hashkey);
                if (userDTO.Password == null)
                {
                    throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
                }
                var userPass = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDTO.Password));
                for (int i = 0; i < userPass.Length; i++)
                {
                    if (userData.Password != null)
                    {
                        if (userPass[i] != userData.Password[i])
                            return null;
                    }
                }
                user = new UserDTO
                {
                    Id = userData.Id,
                    Email = userData.Email,
                    Role = userData.Role
                };
                user.Token = _tokenService.GenerateToken(user);
            }
            return user;
        }
        #endregion
        #region Register Service
        /// <summary>
        /// The Register method is responsible for registering a new user by processing the registration data provided in a UserRegisterDTO object. It computes a hash of the user's password, generates a hash key, adds the user to the repository, and if successful, returns a UserDTO object containing the user's email, role, and an authentication token.
        /// </summary>
        /// <param name="registerDTO"></param>
        public async Task<UserDTO?> Register([FromForm] UserRegisterDTO registerDTO)
        {
            UserDTO? user = null;
            using (var hmac = new HMACSHA512())
            {
                registerDTO.Password = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.UserPassword));
                registerDTO.Hashkey = hmac.Key;
                var resultUser = await _userRepo.Add(registerDTO);
                if (resultUser == null)
                {
                    throw new ArgumentNullException("Unable to find the user ");
                }

                user = new UserDTO
                {
                    Email = resultUser.Email,
                    Role = resultUser.Role
                };
                user.Token = _tokenService.GenerateToken(user);
            }
            return user;
        }
        #endregion
        #region Update Service
        /// <summary>
        /// The Update method is responsible for updating user information based on a UserRegisterDTO object.
        /// </summary>
        /// <param name="user"></param>
        /// <exception cref="Exception"></exception>
        public async Task<UserDTO?> Update(UserRegisterDTO user)
        {
            var users = await _userRepo.GetAll() ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
            User? myUser = users.SingleOrDefault(u => u.Email == user.Email);
            if (myUser != null)
            {
                myUser.FirstName = user.FirstName;
                myUser.PhoneNumber = user.PhoneNumber;
                var hmac = new HMACSHA512();
                myUser.Password = hmac.ComputeHash(Encoding.UTF8.GetBytes(user.UserPassword));
                myUser.Hashkey = hmac.Key;
                myUser.Role = user.Role;
                myUser.Email = user.Email;
                UserDTO userDTO = new()
                {
                    Role = myUser.Role
                };
                userDTO.Token = _tokenService.GenerateToken(userDTO);
                var newUser = _userRepo.Update(myUser);
                if (newUser != null)
                {
                    return userDTO;
                }
                return null;
            }
            return null;
        }
        #endregion
        #region UpdatePassword Service
        /// <summary>
        /// The UpdatePassword method is responsible for updating a user's password based on the information provided in a UserDTO object. It retrieves a list of users from the repository, searches for a user with a matching email, computes a new password hash and hash key using HMACSHA512, updates the user's password and hash key, and then updates the user's information in the repository. If the update is successful, the method returns true, otherwise it returns false.
        /// </summary>
        /// <param name="userDTO"></param>
        /// <exception cref="Exception"></exception>
        public async Task<bool> UpdatePassword(UserDTO userDTO)
        {
            User user = new();
            var users = await _userRepo.GetAll() ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
            var myUser = users.SingleOrDefault(u => u.Email == userDTO.Email);
            if (myUser != null)
            {
                var hmac = new HMACSHA512();
                if (userDTO.Password == null)
                {
                    throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
                }
                user.Password = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDTO.Password));
                user.Hashkey = hmac.Key;
                var newUser = await _userRepo.Update(user);
                if (newUser != null)
                {
                    return true;
                }
            }
            return false;
        }
        #endregion
    }
}

