using Moq;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Model.CoreModel;
using SkillAssessment.Model.ViewModel;
using SkillAssessment.Services.AssessmentDataServices;
#nullable disable

namespace SkillAssessmentTesting.Tests
{
    [TestFixture]
    public class SkillAssessmentTesting
    {
        #region Properties
        private readonly Mock<IAssessmentDataRepository> _assesmentMockRepo;
        private readonly Mock<IUserRepository> _userMockRepo;
        private readonly Mock<ISelectedItemsByUser> _selectedItemMockRepo;
        private readonly Mock<IAvailableAssessmentSideBar> _sideBarDetailsMockRepo;
        private readonly AssessmentDataServices _assesmentService;
        private readonly Mock<IPostEmailRepository> _emailPostMockRepo;
        #endregion

        #region Constructors
        public SkillAssessmentTesting()
        {
            _assesmentMockRepo = new Mock<IAssessmentDataRepository>();
            _userMockRepo = new Mock<IUserRepository>();
            _selectedItemMockRepo = new Mock<ISelectedItemsByUser>();
            _emailPostMockRepo = new Mock<IPostEmailRepository>();
            _sideBarDetailsMockRepo = new Mock<IAvailableAssessmentSideBar>();
            _assesmentService = new AssessmentDataServices(_assesmentMockRepo.Object, _userMockRepo.Object, _selectedItemMockRepo.Object, _sideBarDetailsMockRepo.Object, _emailPostMockRepo.Object);
        }
        #endregion

        #region Admin Details Testing - Success Note
        [Test]
        public async Task GetAdminDetails_Success()
        {

            var user = new User
            {
                Id = "1",
                FirstName = "John",
                LastName = "Doe",
                EmployeeImage = "image1.jpg",
                DateOfBirth = new DateTime(1990, 5, 15),
                Gender = "Male",
                DepartmentId = 1,
                EducationLevel = "Bachelor's",
                Role = "Admin",
                Designation = "Manager",
                PhoneNumber = "1234567890",
                Location = "New York",
                Address = "123 Main St",
                Email = "john.doe@example.com"
            };

            _userMockRepo.Setup(r => r.GettingAdminDetails()).ReturnsAsync(user);

            // Act
            var result = await _assesmentService.GetAdminDetails();

            // Assert
            Assert.IsNotNull(result);
            Assert.That(result.Role, Is.EqualTo(user.Role));
            Assert.That(result.FirstName, Is.EqualTo(user.FirstName));
        }

        #endregion

        #region Admin Details Testing - Exception Note
        [Test]
        public async Task GetAdminDetails_Exception_ShouldReturnDefaultUser()
        {
            // Arrange
            _userMockRepo.Setup(r => r.GettingAdminDetails())
                .ThrowsAsync(new Exception("Some error message"));

            // Act
            var result = await _assesmentService.GetAdminDetails();

            // Assert
            Assert.NotNull(result);
            Assert.That(new User().Role, Is.EqualTo(result.Role));
        }
        #endregion

        #region Update Admin Details - Success Note
        [Test]
        public async Task UpdateAdminDetails_Success()
        {
            var user = new User()
            {
                Id = "1",
                FirstName = "John",
                LastName = "Doe",
                EmployeeImage = "image1.jpg",
                DateOfBirth = new DateTime(1990, 5, 15),
                Gender = "Male",
                DepartmentId = 1,
                EducationLevel = "Bachelor's",
                Role = "Admin",
                Designation = "Manager",
                PhoneNumber = "1234567890",
                Location = "New York",
                Address = "123 Main St",
                Email = "john.doe@example.com"
            };
            var id = "1";
            var updatedUser = new User()
            {
                Id = "1",
                FirstName = "John",
                LastName = "Doe",
                EmployeeImage = "image1.jpg",
                DateOfBirth = new DateTime(1990, 5, 15),
                Gender = "Male",
                DepartmentId = 1,
                EducationLevel = "Bachelor's",
                Role = "Admin",
                Designation = "CEO",
                PhoneNumber = "1234567890",
                Location = "New York",
                Address = "123 Main St",
                Email = "john.doe@example.com"
            };
            _userMockRepo.Setup(r => r.UpdatingAdminDetails(id, user)).ReturnsAsync(updatedUser);
            //Act 
            var result = await _assesmentService.UpdateAdminDetails(id, user);
            //Assert
            Assert.NotNull(result);
            Assert.That(updatedUser.Role, Is.EqualTo(result.Role));
        }
        #endregion

        #region Update Admin Details - Exception Note
        [Test]
        public async Task UpdateAdminDetails_Exception_ShouldReturnDefaultUser()
        {
            // Arrange
            var user = new User()
            {
                Id = "1",
                FirstName = "John",
                LastName = "Doe",
                EmployeeImage = "image1.jpg",
                DateOfBirth = new DateTime(1990, 5, 15),
                Gender = "Male",
                DepartmentId = 1,
                EducationLevel = "Bachelor's",
                Role = "Admin",
                Designation = "Manager",
                PhoneNumber = "1234567890",
                Location = "New York",
                Address = "123 Main St",
                Email = "john.doe@example.com"
            };
            var id = "1";

            _userMockRepo.Setup(r => r.UpdatingAdminDetails(id, user))
                .ThrowsAsync(new Exception("Some error message"));

            // Act
            var result = await _assesmentService.UpdateAdminDetails(id, user);

            // Assert
            Assert.That(new User().Role, Is.EqualTo(result.Role));
        }
        #endregion

        #region Edit Side Bar Testing - Should Returns Side Bar DTO
        [Test]
        public async Task Get_EditSideBar_ShouldReturns_SideBarDTO()
        {
            //Arrange
            var sideBarDto = new SideBarDTO
            {
                UserAssessmentId = 1,
                AssessmentId = "ABC123",
                Department = "IT",
                Skills = "Programming, Problem Solving",
                Name = new string[] { "John", "Doe" },
                UserEmail = "john.doe@example.com",
                TopicName = new string[] { "C#", "SQL" },
                NumberOfTopic = 2,
                NumberOfQuestion = 20,
                DateOfCompletion = DateTime.Now,
                Description = "Assessment completed successfully."
            };
            _sideBarDetailsMockRepo.Setup(r => r.AvailableAssessmentEditSideBar("ABC123")).ReturnsAsync(sideBarDto);
            //Act 
            var result = await _assesmentService.GetEditSideBar("ABC123");
            //Assert
            Assert.IsNotNull(result);
            Assert.That(sideBarDto.UserEmail, Is.EqualTo(result.UserEmail));
        }
        #endregion

        #region Edit Side Bar Testing - Exception Note
        [Test]
        public async Task GetEditSideBar_Exception_ShouldReturnDefaultSideBarDTO()
        {
            // Arrange
            string assessmentId = "ABC123";

            _sideBarDetailsMockRepo.Setup(r => r.AvailableAssessmentEditSideBar(assessmentId))
                .ThrowsAsync(new ArgumentNullException("Cannot Post New Assessment"));

            // Act
            var result = await _assesmentService.GetEditSideBar(assessmentId);

            // Assert
            Assert.IsNotNull(result);
            Assert.That(result.UserEmail, Is.EqualTo(default(string)));
        }
        #endregion

        #region Sorting Assessment - That should Return Available Assessment
        [Test]
        public async Task Get_SelectedItems_ShouldReturns_AvailableAssessmentDTO()
        {
            //Arrrange
            var availableAssessmentDtoList = new List<AvailableAssessmentDTO>
            {
                new AvailableAssessmentDTO
                {
                    AssessmentID = "ASMT123",
                    Department = "HR",
                    Skills = "Communication, Time Management",
                    TopicID = new int[] { 1, 2, 3 },
                    TopicName = new string[] { "Soft Skills", "Time Management", "Communication" }
                },
                new AvailableAssessmentDTO
                {
                    AssessmentID = "ASMT456",
                    Department = "IT",
                    Skills = "Programming, Problem Solving",
                    TopicID = new int[] { 4, 5 },
                    TopicName = new string[] { "Coding", "Problem Solving" }
                },
            };
            int DeptId = 1;
            var TopicId = new int[] { 1, 2 };
            int SkillId = 1;
            string rolename = "Employee";
            _selectedItemMockRepo.Setup(r => r.GetSelectedItemsByUser(DeptId, TopicId, SkillId, rolename)).ReturnsAsync(availableAssessmentDtoList);
            //Act
            var result = await _assesmentService.GetSelectedItems(DeptId, TopicId, SkillId, rolename);
            //Assert
            Assert.IsNotNull(result);
        }
        #endregion

        #region Sorting Assessment - Exception Note
        [Test]
        public async Task GetSelectedItems_Exception_ShouldReturnEmptyList()
        {
            // Arrange
            int deptId = 1;
            var topicId = new int[] { 1, 2 };
            int skillId = 1;
            string rolename = "Employee";

            _selectedItemMockRepo.Setup(r => r.GetSelectedItemsByUser(deptId, topicId, skillId, rolename))
                .ThrowsAsync(new Exception("Some error message"));

            // Act
            var result = await _assesmentService.GetSelectedItems(deptId, topicId, skillId, rolename);

            // Assert
            Assert.IsNotNull(result);
            Assert.That(result.Count, Is.EqualTo(0));
        }
        #endregion

        #region Get All Assessment - That Should Return All Assessments For Jobseeker/Employee
        [Test]
        public async Task GetAll_AssessmentDetails_ShouldReturns_AllAvailableAssessments()
        {
            //Arrrange
            var availableAssessmentDtoList = new List<AvailableAssessmentDTO>
            {
                new AvailableAssessmentDTO
                {
                    AssessmentID = "ASMT123",
                    Department = "HR",
                    Skills = "Communication, Time Management",
                    TopicID = new int[] { 1, 2, 3 },
                    TopicName = new string[] { "Soft Skills", "Time Management", "Communication" }
                },
                new AvailableAssessmentDTO
                {
                    AssessmentID = "ASMT456",
                    Department = "IT",
                    Skills = "Programming, Problem Solving",
                    TopicID = new int[] { 4, 5 },
                    TopicName = new string[] { "Coding", "Problem Solving" }
                },
            };
            string rolename = "Employee";
            _assesmentMockRepo.Setup(r => r.GetAllAssessmentDetailsByRole(rolename)).ReturnsAsync(availableAssessmentDtoList);
            //Act
            var result = await _assesmentService.GetAllAssessmentDetails(rolename);
            //Assert
            Assert.IsNotNull(result);
            Assert.That(result.Count, Is.EqualTo(2));
        }
        #endregion

        #region Get All Assessment - Exception Invalid Role Name
        [Test]
        public async Task GetAllAssessmentDetails_InvalidRole_ShouldReturnEmptyList()
        {
            // Arrange
            string invalidRole = "InvalidRole";
            _assesmentMockRepo.Setup(r => r.GetAllAssessmentDetailsByRole(invalidRole))
                .ReturnsAsync((List<AvailableAssessmentDTO>)null); // Or empty list

            // Act
            var result = await _assesmentService.GetAllAssessmentDetails(invalidRole);

            // Assert
            Assert.IsNull(result);
        }
        #endregion

        #region Get All Assessment - Exception That Should Return Empty List
        [Test]
        public async Task GetAllAssessmentDetails_Exception_ShouldReturnEmptyList()
        {
            // Arrange
            string rolename = "Employee";
            _assesmentMockRepo.Setup(r => r.GetAllAssessmentDetailsByRole(rolename))
                .ThrowsAsync(new Exception("Some error"));

            // Act
            var result = await _assesmentService.GetAllAssessmentDetails(rolename);

            // Assert
            Assert.IsNotNull(result);
            Assert.That(result.Count, Is.EqualTo(0));
        }
        #endregion
    }
}