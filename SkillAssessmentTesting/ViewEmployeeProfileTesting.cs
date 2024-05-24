using Moq;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Model.View_Model;
using SkillAssessment.Model.ViewModel;
using SkillAssessment.Service.EmployeesTestResultServices;
using SkillAssessment.Service.ViewProfileDetailsService;

namespace SkillAssessmentTesting
{
    [TestFixture]
    public class ViewEmployeeProfileTesting
    {
        #region Properties
        private readonly Mock<IViewProfileDetailsRepository> _IViewProfileDetailsMoqRepo;
        private readonly Mock<IEmployeeTestHistoryRepository> _IEmployeeTestHistoryMocRepo;
        private readonly EmployeeProfileDetailsServices _employeeProfileDetailsServices;
        private readonly EmployeeTestHistoryService _employeeTestHistoryService;
        #endregion

        #region Constructors
        public ViewEmployeeProfileTesting()
        {
            _IViewProfileDetailsMoqRepo = new Mock<IViewProfileDetailsRepository>();
            _IEmployeeTestHistoryMocRepo = new Mock<IEmployeeTestHistoryRepository>();
            _employeeProfileDetailsServices = new EmployeeProfileDetailsServices(_IViewProfileDetailsMoqRepo.Object);
            _employeeTestHistoryService = new EmployeeTestHistoryService(_IEmployeeTestHistoryMocRepo.Object);
        }
        #endregion

        #region Test case for Get employee Profile details
        /// <summary>
        /// Test case for Get employee Profile details method
        /// </summary>
        /// <returns>null list of employee details</returns>
        [Test]
        public async Task GetUserProfile_ReturnsUserProfile()
        {
            //Assign
            var getEmployeeProfiles = new EmployeeProfileDetailsViewDTO
            {
                UsersId = "KB2307",
                Name = "Employee1",
                Designation = "Trainee",
                Department = "Azure Developer",
                Location = "Chennai",
                Phone = "9383747389",
                UserEmail = "employee1@gmail.com",
                EarnedPoints = 1000,
                TestTaken = 3,
                EmployeeImage = "image.jpg"
            };
            _IViewProfileDetailsMoqRepo.Setup(employeedetail => employeedetail.GetUserProfile(getEmployeeProfiles.UsersId)).ReturnsAsync(getEmployeeProfiles);
            //Act
            var result = await _employeeProfileDetailsServices.GetUserProfile(getEmployeeProfiles.UsersId);
            //Assert
            Assert.That(result, Is.Not.Null);
            Assert.Multiple(() =>
            {
                Assert.That(result.UsersId, Is.EqualTo(getEmployeeProfiles.UsersId));
                Assert.That(result.Name, Is.EqualTo(getEmployeeProfiles.Name));
                Assert.That(result.Designation, Is.EqualTo(getEmployeeProfiles.Designation));
                Assert.That(result.Department, Is.EqualTo(getEmployeeProfiles.Department));
                Assert.That(result.Location, Is.EqualTo(getEmployeeProfiles.Location));
                Assert.That(result.Phone, Is.EqualTo(getEmployeeProfiles.Phone));
                Assert.That(result.UserEmail, Is.EqualTo(getEmployeeProfiles.UserEmail));
                Assert.That(result.EarnedPoints, Is.EqualTo(getEmployeeProfiles.EarnedPoints));
                Assert.That(result.TestTaken, Is.EqualTo(getEmployeeProfiles.TestTaken));
                Assert.That(result.EmployeeImage, Is.EqualTo(getEmployeeProfiles.EmployeeImage));
            });
        }
        #endregion

        #region Test case for Get employee Profile details if empty
        /// <summary>
        /// Test case for Get employee Profile details method if empty
        /// </summary>
        /// <returns>null list of employee details if empty</returns>
        [Test]
        public async Task GetUserProfile_ReturnsEmptyUserProfile()
        {
            // Arrange
            string userId = "";
            _IViewProfileDetailsMoqRepo.Setup(employeedetail => employeedetail.GetUserProfile(userId)).ReturnsAsync(new EmployeeProfileDetailsViewDTO());

            // Act
            var result = await _employeeProfileDetailsServices.GetUserProfile(userId);

            // Assert
            Assert.That(result, Is.Not.Null);
        }
        #endregion

        #region Test case for Get employee Test History
        /// <summary>
        /// Test case for Get employee Test History method
        /// </summary>
        /// <returns>List of employee test history</returns>
        [Test]
        public async Task GetEmployeeTestHistory_ReturnsTestHistory()
        {
            // Arrange
            string userId = "KB2307";
            var testHistoryList = new List<EmployeesTestHistoryDTO>
            {
                new EmployeesTestHistoryDTO { UserAssessmentId = 1, DateOfCreation = DateTime.Now.AddDays(-10),DateOfSubmission = DateTime.Now.AddDays(-1), Score = 85,TopicNames = "html,css,js" },
                new EmployeesTestHistoryDTO { UserAssessmentId = 2, DateOfCreation = DateTime.Now.AddDays(-5),DateOfSubmission = DateTime.Now.AddDays(-1), Score = 90, TopicNames = "html,css,js"}
            };
            _IEmployeeTestHistoryMocRepo.Setup(historyRepo => historyRepo.CompletedUserTest(userId)).ReturnsAsync(testHistoryList);

            // Act
            var result = await _employeeTestHistoryService.CompletedUserTest(userId);

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Count, Is.EqualTo(testHistoryList.Count));
            for (int i = 0; i < result.Count; i++)
            {
                Assert.That(result[i].UserAssessmentId, Is.EqualTo(testHistoryList[i].UserAssessmentId));
                Assert.That(result[i].DateOfCreation, Is.EqualTo(testHistoryList[i].DateOfCreation).Within(TimeSpan.FromSeconds(1)));
                Assert.That(result[i].DateOfSubmission, Is.EqualTo(testHistoryList[i].DateOfSubmission).Within(TimeSpan.FromSeconds(1)));
                Assert.That(result[i].Score, Is.EqualTo(testHistoryList[i].Score));
                Assert.That(result[i].TopicNames, Is.EqualTo(testHistoryList[i].TopicNames));
            }
        }
        #endregion

        #region Test case for Get employee Test History and return empty
        /// <summary>
        /// Test case for Get employee Test History method and return empty
        /// </summary>
        /// <returns>List of employee test history and return empty</returns>
        [Test]
        public async Task GetEmployeeTestHistory_ReturnsEmptyTestHistory()
        {
            // Arrange
            string userId = "KB2307";
            _IEmployeeTestHistoryMocRepo.Setup(historyRepo => historyRepo.CompletedUserTest(userId)).ReturnsAsync(new List<EmployeesTestHistoryDTO>());

            // Act
            var result = await _employeeTestHistoryService.CompletedUserTest(userId);

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Count, Is.EqualTo(0));
        }
        #endregion

        #region Test case for Get employee Completed test details
        /// <summary>
        /// Test case for Get employee Completed test details method
        /// </summary>
        /// <returns>null list of employee Completed test</returns>
        [Test]
        public async Task GetUserProfile_ReturnsUsersCompletedTests()
        {
            // Arrange
            var testEmployees = new List<EmployeesTestHistoryDTO>
            {
                new EmployeesTestHistoryDTO
                {
                    UserAssessmentId = 1,
                    DateOfCreation = DateTime.Now,
                    DateOfSubmission = DateTime.Now,
                    TopicNames = "html,css,js",
                    Score = 3000
                },
                new EmployeesTestHistoryDTO
                {
                    UserAssessmentId = 2,
                    DateOfCreation = DateTime.Now,
                    DateOfSubmission = DateTime.Now,
                    TopicNames = "html,css,js",
                    Score = 100
                }
            };
            _IEmployeeTestHistoryMocRepo.Setup(r => r.CompletedUserTest("KB2305")).ReturnsAsync(testEmployees);
            // Act
            var employees = await _employeeTestHistoryService.CompletedUserTest("KB2305");

            // Assert
            Assert.That(employees, Is.Not.Null);
            Assert.That(employees, Is.TypeOf<List<EmployeesTestHistoryDTO>>());
            Assert.That(employees.Count, Is.EqualTo(2));
        }
        #endregion

        #region Test case for Get employee Ongoing test details
        /// <summary>
        /// Test case for Get employee Ongoing test details method
        /// </summary>
        /// <returns>null list of employee Ongoing test</returns>
        [Test]
        public async Task GetUserProfile_ReturnsUsersOngoingTests()
        {
            // Arrange
            var testEmployees = new List<EmployeesTestHistoryDTO>
            {
                new EmployeesTestHistoryDTO
                {
                    UserAssessmentId = 1,
                    DateOfCreation = DateTime.Now.AddDays(-3),
                    DateOfSubmission = DateTime.Now.AddDays(1),
                    TopicNames = "html,css,js",
                    Score = null
                },
                new EmployeesTestHistoryDTO
                {
                    UserAssessmentId = 2,
                    DateOfCreation = DateTime.Now.AddDays(-10),
                    DateOfSubmission = DateTime.Now.AddDays(-8),
                    TopicNames = "html,css,js",
                    Score = null
                }
            };
            // Act
            var userId = "KB2305";
            _IEmployeeTestHistoryMocRepo.Setup(r => r.OngoingUserTest(userId)).ReturnsAsync(testEmployees);

            // Act
            var result = await _employeeTestHistoryService.OngoingUserTest(userId);

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.Multiple(() =>
            {
                foreach (var employee in result)
                {
                    Assert.That(employee.UserAssessmentId, Is.EqualTo(testEmployees[0].UserAssessmentId)
                        .Or.EqualTo(testEmployees[1].UserAssessmentId));
                }
            });
            #endregion
        }
    }
}
