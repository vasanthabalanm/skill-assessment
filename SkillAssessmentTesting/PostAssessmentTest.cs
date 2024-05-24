using Microsoft.EntityFrameworkCore;
using Moq;
using SkillAssessment.Data;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Model.CoreModel;
using SkillAssessment.Repository.PostAssessmentRepository;
#nullable disable

namespace SkilAssessmentTesting
{
    [TestFixture]
    public class PostAssessmentTest
    {
        private DbContextOptions<SkillAssessmentDbContext> _options;
        [SetUp]
        public void Setup()
        {
            _options = new DbContextOptionsBuilder<SkillAssessmentDbContext>()
                .UseInMemoryDatabase(databaseName: "SkillAssessmentTestDb")
                .Options;
        }
        #region PostNewUserAssessment
        /// <summary>
        /// Success=>Returns Posted UserAssessment
        /// Failure=>Returns EmptyList
        /// </summary>
        /// <returns></returns
        [Test]
        public async Task PostExistingAssessment_SuccessfulAddition_ReturnsUserAssessment()
        {
            // Arrange
            var userAssessmentToAdd = new UserAssessment
            {
                UserId = "user1",
                AssessmentId = "assessment1",
                NumberOfTopics = 2,
                NumberOfQuestions = 20,
                TotalTime = 30,
                DateOfCreation = DateTime.Now,
                DateOfCompletion = DateTime.Now.AddHours(1),
                Description = "Test assessment"
            };


            var userAssessmentRepositoryMock = new Mock<IUserAssessmentRepository>();
            var randomQuestionRepositoryMock = new Mock<IRandomQuestionRepository>();
            var storedProcedureRepositoryMock = new Mock<IStoredProcedureRepository>();
            var userRepositoryMock = new Mock<IUserRepository>(); // Mock for IUserRepository

            userAssessmentRepositoryMock.Setup(repo => repo.Add(userAssessmentToAdd))
                                        .ReturnsAsync(userAssessmentToAdd);

            var assessmentService = new PostAssessmentService(
                userAssessmentRepositoryMock.Object,
                userRepositoryMock.Object, // Provide the IUserRepository mock
                randomQuestionRepositoryMock.Object,
                storedProcedureRepositoryMock.Object
            );

            // Act
            var result = await assessmentService.PostExistingAssessment(userAssessmentToAdd);

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result, Is.InstanceOf<UserAssessment>());
        }
        [Test]
        public async Task PostExistingAssessment_AdditionFailure_ReturnsEmptyUserAssessment()
        {
            // Arrange
            var userAssessmentToAdd = new UserAssessment
            {
                UserId = "user1",
                AssessmentId = "assessment1"
            };


            var userAssessmentRepositoryMock = new Mock<IUserAssessmentRepository>();
            var randomQuestionRepositoryMock = new Mock<IRandomQuestionRepository>();
            var storedProcedureRepositoryMock = new Mock<IStoredProcedureRepository>();
            var userRepositoryMock = new Mock<IUserRepository>(); // Mock for IUserRepository

            userAssessmentRepositoryMock.Setup(repo => repo.Add(userAssessmentToAdd))
                                        .ReturnsAsync(userAssessmentToAdd);

            var assessmentService = new PostAssessmentService(
                userAssessmentRepositoryMock.Object,
                userRepositoryMock.Object, // Provide the IUserRepository mock
                randomQuestionRepositoryMock.Object,
                storedProcedureRepositoryMock.Object
            );

            // Act
            var result = await assessmentService.PostExistingAssessment(userAssessmentToAdd);

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result, Is.InstanceOf<UserAssessment>());
        }
        #endregion
        #region GetAllEmployee
        /// <summary>
        /// Success=>Returns Posted UserAssessment
        /// Failure=>Returns EmptyList
        /// </summary>
        /// <returns></returns
        [Test]
        public async Task GetAllEmployee_ReturnsListOfUsers()
        {
            // Arrange
            var userRepositoryMock = new Mock<IUserRepository>();
            var mockUsers = new List<User>
            {
                new User { Id = "user1", FirstName = "John", LastName = "Doe", Role = "Employee" },
                new User { Id = "user2", FirstName = "Jane", LastName = "Smith", Role = "Employee" }
                // Add more mock user data as needed
            };
            userRepositoryMock.Setup(repo => repo.GetAllUser())
                              .ReturnsAsync(mockUsers);

            var userAssessmentRepositoryMock = new Mock<IUserAssessmentRepository>();
            var randomQuestionRepositoryMock = new Mock<IRandomQuestionRepository>();
            var storedProcedureRepositoryMock = new Mock<IStoredProcedureRepository>();

            var userService = new PostAssessmentService(
                userAssessmentRepositoryMock.Object,
                userRepositoryMock.Object, // Provide the IUserRepository mock
                randomQuestionRepositoryMock.Object,
                storedProcedureRepositoryMock.Object
            );

            // Act
            var result = await userService.GetAllEmployee();

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result, Is.InstanceOf<List<User>>());
            Assert.That(result.Count, Is.EqualTo(mockUsers.Count));
        }

        [Test]
        public async Task GetAllEmployee_ReturnsEmptyList()
        {
            // Arrange
            var userRepositoryMock = new Mock<IUserRepository>();
            userRepositoryMock.Setup(repo => repo.GetAllUser())
                              .ReturnsAsync(new List<User>()); // Return empty list

            var userAssessmentRepositoryMock = new Mock<IUserAssessmentRepository>();
            var randomQuestionRepositoryMock = new Mock<IRandomQuestionRepository>();
            var storedProcedureRepositoryMock = new Mock<IStoredProcedureRepository>();

            var userService = new PostAssessmentService(
                userAssessmentRepositoryMock.Object,
                userRepositoryMock.Object, // Provide the IUserRepository mock
                randomQuestionRepositoryMock.Object,
                storedProcedureRepositoryMock.Object
            );

            // Act
            var result = await userService.GetAllEmployee();

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result, Is.InstanceOf<List<User>>());
            Assert.That(result.Count, Is.EqualTo(0));
        }
        #endregion
        #region PutDateOfCompletion
        /// <summary>
        /// Success=>Returns Pusted DateOfCompletion
        /// Failure=>Returns Empty
        /// </summary>
        /// <returns></returns
        [Test]
        public async Task PutDate_UpdatesUserAssessmentDateAndReturnsUpdatedUserAssessment()
        {
            // Arrange
            var userAssessmentId = 1;
            var updatedDate = DateTime.Now.AddDays(7); // Adjust as needed

            var userAssessmentToUpdate = new UserAssessment
            {
                Id = userAssessmentId,
                DateOfCompletion = updatedDate
            };

            var userAssessmentRepositoryMock = new Mock<IUserAssessmentRepository>();
            var randomQuestionRepositoryMock = new Mock<IRandomQuestionRepository>();
            var storedProcedureRepositoryMock = new Mock<IStoredProcedureRepository>();
            var userRepositoryMock = new Mock<IUserRepository>(); // Mock for IUserRepository
            userAssessmentRepositoryMock.Setup(repo => repo.PutDate(userAssessmentId, userAssessmentToUpdate))
                                       .ReturnsAsync(userAssessmentToUpdate);

            var userAssessmentService = new PostAssessmentService(
                userAssessmentRepositoryMock.Object,
                userRepositoryMock.Object, // Provide the IUserRepository mock
                randomQuestionRepositoryMock.Object,
                storedProcedureRepositoryMock.Object);

            // Act
            var result = await userAssessmentService.PutDate(userAssessmentId, userAssessmentToUpdate);

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.DateOfCompletion, Is.EqualTo(updatedDate));
        }
        [Test]
        public async Task PutDate_ReturnsEmptyUserAssessment()
        {
            // Arrange
            var userAssessmentId = 1;
            var updatedDate = DateTime.Now.AddDays(7); // Adjust as needed

            var userAssessmentToUpdate = new UserAssessment
            {
                Id = userAssessmentId,
                DateOfCompletion = updatedDate
            };

            var userAssessmentRepositoryMock = new Mock<IUserAssessmentRepository>();
            var randomQuestionRepositoryMock = new Mock<IRandomQuestionRepository>();
            var storedProcedureRepositoryMock = new Mock<IStoredProcedureRepository>();
            var userRepositoryMock = new Mock<IUserRepository>(); // Mock for IUserRepository
            userAssessmentRepositoryMock.Setup(repo => repo.PutDate(userAssessmentId, userAssessmentToUpdate))
                                .ReturnsAsync((UserAssessment)null); // Return null

            var userAssessmentService = new PostAssessmentService(
                userAssessmentRepositoryMock.Object,
                userRepositoryMock.Object, // Provide the IUserRepository mock
                randomQuestionRepositoryMock.Object,
                storedProcedureRepositoryMock.Object);

            // Act
            var result = await userAssessmentService.PutDate(userAssessmentId, userAssessmentToUpdate);

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.DateOfCompletion, Is.EqualTo(default(DateTime)));
        }
        #endregion
    }
}
