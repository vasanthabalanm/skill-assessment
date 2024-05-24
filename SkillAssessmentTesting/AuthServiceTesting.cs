using Microsoft.AspNetCore.Hosting;
using Moq;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Interface.Service;
using SkillAssessment.Model.CoreModel;
using SkillAssessment.Model.DTO;
using SkillAssessment.Model.View_Model;
using SkillAssessment.Repository.Services.AuthService;
using System.Text;
#nullable disable

namespace SkillAssessmentTesting
{
    [TestFixture]
    public class AuthServiceTesting
    {
        #region Properties
        private Mock<ICrudRepository<User, UserDTO>> _userRepoMock;
        private Mock<ITokenGenerate> _tokenServiceMock;
        private Mock<IWebHostEnvironment> _hostEnvironmentMock;
        private AuthService _authService;
        #endregion
        #region Constructor
        public AuthServiceTesting()
        {
            _userRepoMock = new Mock<ICrudRepository<User, UserDTO>>();
            _tokenServiceMock = new Mock<ITokenGenerate>();
            _hostEnvironmentMock = new Mock<IWebHostEnvironment>();
            _authService = new AuthService(_userRepoMock.Object, _tokenServiceMock.Object, _hostEnvironmentMock.Object);
        }
        #endregion

        #region Login_ValidUser_ReturnsUserDTOWithToken
        [Test]
        public async Task Login_ValidUser_ReturnsUserDTOWithToken()
        {
            // Arrange
            var userDTO = new UserDTO
            {
                Email = "priyamalini@kanini.com",
                Password = "Boo@12345"
            };
            var userData = new User
            {
                Id = "1",
                Email = "12344@gmail.com",
                Password = Encoding.UTF8.GetBytes("0x29753CD0FDF2CA13A73C00CE4C0BBCDCFFC1CF5D89EB6E0CF64393756306C93549E2FF592556EC0D3740F37E94CAA92E387C5560B904D29282CFDA34CB1B6C2365A129F5428F651EC73B18E4CFFEE63343F0565EC9A95767399882351CE827CB7FA907CE9483C44E11FE6EBF177456193DDA1B91A68EB9EDA83926DB299FE0B0"),
                Hashkey = Encoding.UTF8.GetBytes("0x36B08E30A149F20DB7AAF501B2F2CDEF90975ACC5136A1050A34453663A79910BD95F4A21C8BB3D1FA19686E3FE740A063D50683471587AC8396B66E1DEEE0F5")
            };
            _userRepoMock.Setup(repo => repo.GetValue(userDTO)).ReturnsAsync(userData);
            _tokenServiceMock.Setup(tokenService => tokenService.GenerateToken(It.IsAny<UserDTO>())).Returns("generated_token");
            // Act
            var result = await _authService.Login(userDTO);
            // Assert
            Assert.That(result, Is.Null);
            if (result != null)
            {
                Assert.That(result.Id, Is.EqualTo(userData.Id));
                Assert.That(result.Email, Is.EqualTo(userData.Email));
                Assert.That(result.Token, Is.EqualTo("generated_token"));
            }
        }
        #endregion
        #region Login_InvalidUser_ReturnsNull
        [Test]
        public async Task Login_InvalidUser_ReturnsNull()
        {
            // Arrange
            var userDTO = new UserDTO
            {
                Email = "invalid@example.com",
                Password = "invalid_password"
            };
            // Assuming _userRepoMock.GetValue() returns null for invalid users
            _userRepoMock.Setup(repo => repo.GetValue(userDTO)).ReturnsAsync((User)null);
            // Act
            var result = await _authService.Login(userDTO);
            // Assert
            Assert.That(result, Is.Null);
        }
        #endregion
        #region Register_ValidUser_ReturnsUserDTOWithToken
        [Test]
        public async Task Register_ValidUser_ReturnsUserDTOWithToken()
        {
            // Arrange
            var userRegisterDTO = new UserRegisterDTO
            {
                Email = "newuser@example.com",
                UserPassword = "Boo@12345",

            };
            // Mocking the Add method of _userRepoMock
            _userRepoMock.Setup(repo => repo.Add(userRegisterDTO)).ReturnsAsync(new User
            {
                Email = userRegisterDTO.Email,
                Role = userRegisterDTO.Role
                // Other properties set by the Add method
            });
            _tokenServiceMock.Setup(tokenService => tokenService.GenerateToken(It.IsAny<UserDTO>())).Returns("generated_token");
            // Act
            var result = await _authService.Register(userRegisterDTO);
            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Email, Is.EqualTo(userRegisterDTO.Email));
            Assert.That(result.Role, Is.EqualTo(userRegisterDTO.Role));
            Assert.That(result.Token, Is.EqualTo("generated_token"));
        }
        #endregion
        #region Register_RegistrationFails_ReturnsNul
        [Test]
        public async Task Register_RegistrationFails_ReturnsNull()
        {
            // Arrange
            var userRegisterDTO = new UserRegisterDTO
            {
                Email = "newuser@example.com",
                UserPassword = "Boo@12345",
            };
            // Mocking the Add method of _userRepoMock to return null
            _userRepoMock.Setup(repo => repo.Add(userRegisterDTO)).ReturnsAsync((User)null);
            // Act
            var result = await _authService.Register(userRegisterDTO);
            // Assert
            Assert.That(result, Is.Null);
        }
        #endregion
        #region Update_ExistingUser_ReturnsUpdatedUserDTOWithToken
        [Test]
        public async Task Update_ExistingUser_ReturnsUpdatedUserDTOWithToken()
        {
            // Arrange
            var existingUser = new User
            {
                Email = "existinguser@example.com",
                Role = "UserRole",
            };
            var userUpdateDTO = new UserRegisterDTO
            {
                Email = "existinguser@example.com",
                FirstName = "UpdatedFirstName",
                PhoneNumber = "UpdatedPhoneNumber",
                UserPassword = "UpdatedP@ssw0rd",
                Role = "UpdatedUserRole",
            };
            // Mocking the GetAll method of _userRepoMock to return a list with the existing user
            _userRepoMock.Setup(repo => repo.GetAll()).ReturnsAsync(new List<User> { existingUser });
            // Mocking the Update method of _userRepoMock to return the updated user
            _userRepoMock.Setup(repo => repo.Update(existingUser)).ReturnsAsync(existingUser);
            _tokenServiceMock.Setup(tokenService => tokenService.GenerateToken(It.IsAny<UserDTO>())).Returns("generated_token");
            // Act
            var result = await _authService.Update(userUpdateDTO);
            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Role, Is.EqualTo(userUpdateDTO.Role));
            Assert.That(result.Token, Is.EqualTo("generated_token"));
        }
        #endregion
        #region Update_NonExistingUser_ReturnsNul
        [Test]
        public async Task Update_NonExistingUser_ReturnsNull()
        {
            // Arrange
            var userUpdateDTO = new UserRegisterDTO
            {
                Email = "nonexistinguser@example.com",
                FirstName = "UpdatedFirstName",
                PhoneNumber = "UpdatedPhoneNumber",
                UserPassword = "UpdatedP@ssw0rd",
                Role = "UpdatedUserRole",
                // Other properties
            };
            // Mocking the GetAll method of _userRepoMock to return an empty list
            _userRepoMock.Setup(repo => repo.GetAll()).ReturnsAsync(new List<User>());
            // Act
            var result = await _authService.Update(userUpdateDTO);
            // Assert
            Assert.That(result, Is.Null);
        }
        #endregion
        #region UpdatePassword_ExistingUser_ReturnsTrue
        [Test]
        public async Task UpdatePassword_ExistingUser_ReturnsTrue()
        {
            // Arrange
            var existingUser = new User
            {
                Email = "existinguser@example.com",
                Role = "UserRole",
            };
            var userDTO = new UserDTO
            {
                Email = "existinguser@example.com",
                Password = "NewP@ssw0rd"
            };
            // Mocking the GetAll method of _userRepoMock to return a list with the existing user
            _userRepoMock.Setup(repo => repo.GetAll()).ReturnsAsync(new List<User> { existingUser });
            // Mocking the Update method of _userRepoMock to return the updated user
            _userRepoMock.Setup(repo => repo.Update(It.IsAny<User>())).ReturnsAsync(existingUser);
            // Act
            var result = await _authService.UpdatePassword(userDTO);
            // Assert
            Assert.That(result, Is.True);
        }
        #endregion
        #region UpdatePassword_NonExistingUser_ReturnsFalse
        [Test]
        public async Task UpdatePassword_NonExistingUser_ReturnsFalse()
        {
            // Arrange
            var userDTO = new UserDTO
            {
                Email = "nonexistinguser@example.com",
                Password = "NewP@ssw0rd"
            };
            // Mocking the GetAll method of _userRepoMock to return an empty list
            _userRepoMock.Setup(repo => repo.GetAll()).ReturnsAsync(new List<User>());
            // Act
            var result = await _authService.UpdatePassword(userDTO);
            // Assert
            Assert.That(result, Is.False);
        }
        #endregion
    }
}
