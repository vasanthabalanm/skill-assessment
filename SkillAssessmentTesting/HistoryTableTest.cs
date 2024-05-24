using Microsoft.EntityFrameworkCore;
using Moq;
using SkillAssessment.Data;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Model.CoreModel;
using SkillAssessment.Model.ViewModel;
using SkillAssessment.Services.HistoryTableService;

namespace SkillAssessment.Tests
{
    [TestFixture]
    public class HistoryTableTests
    {
        private DbContextOptions<SkillAssessmentDbContext> _options;

        [SetUp]
        public void Setup()
        {
            _options = new DbContextOptionsBuilder<SkillAssessmentDbContext>()
                .UseInMemoryDatabase(databaseName: "SkillAssessmentTestDb")
                .Options;
        }
        #region GetTestHistory
        [Test]
        public async Task GetHistory_ReturnsListOfHistoryDTO()
        {
            // Arrange
            // Create instances of your required repositories/mock repositories
            var assessmentHistoryRepository = new Mock<IAssessmentHistoryRepository>();
            var questionTypeRepository = new Mock<IQuestionTypeRepository>();
            var topicRepository = new Mock<ITopicRepository>();
            var skillRepository = new Mock<ISkillRepository>();
            var storedProcedureRepository = new Mock<IStoredProcedureRepository>();
            var filterTestHistoryRepository = new Mock<IFilterTestHistoryRepository>();
            var userAssessmentRepository = new Mock<IUserAssessmentRepository>();
            var historyService = new HistoryTableService(
                userAssessmentRepository.Object,
                assessmentHistoryRepository.Object,
                questionTypeRepository.Object,
                topicRepository.Object,
                skillRepository.Object,
                storedProcedureRepository.Object,
                filterTestHistoryRepository.Object
            );
            // Act
            var result = await historyService.GetHistory("RoleName");
            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result, Is.InstanceOf<List<HistoryDTO>>());
        }
        #endregion
        #region GetAllQuestionType
        [Test]
        public async Task GetAllQuestionType_ReturnsListOfQuestionType()
        {
            // Arrange
            using (var context = new SkillAssessmentDbContext(_options))
            {
                var questionType = new List<QuestionType>
                {
                    new QuestionType { Id = 1, QuestionTypes = "Short Answer" },
                    new QuestionType { Id = 2, QuestionTypes = "Multiple Choice" }
                };
                context.QuestionTypes.AddRange(questionType);
                context.SaveChanges();
                var userAssessmentRepository = new Mock<IUserAssessmentRepository>();
                var assessmentHistoryRepository = new Mock<IAssessmentHistoryRepository>();
                var questionTypeRepository = new Mock<IQuestionTypeRepository>();
                var topicRepository = new Mock<ITopicRepository>();
                var skillRepository = new Mock<ISkillRepository>();
                var storedProcedureRepository = new Mock<IStoredProcedureRepository>();
                var filterTestHistoryRepository = new Mock<IFilterTestHistoryRepository>();
                var historyService = new HistoryTableService(
                    userAssessmentRepository.Object,
                    assessmentHistoryRepository.Object,
                    questionTypeRepository.Object,
                    topicRepository.Object,
                    skillRepository.Object,
                    storedProcedureRepository.Object,
                    filterTestHistoryRepository.Object
                );
                // Act
                var result = await historyService.GetAllQnType();
                // Assert
                Assert.That(result, Is.Not.Null);
                Assert.That(result.All(d => questionType.Any(d2 => d2.Id == d.Id && d2.QuestionTypes == d.QuestionTypes)), Is.True);
            }
        }
        #endregion
        #region GetAllSkill
        [Test]
        public async Task GetAllSkill_ReturnsListOfSkill()
        {
            // Arrange
            using (var context = new SkillAssessmentDbContext(_options))
            {
                // Initialize your in-memory database with test data
                var skillLevel = new List<Skill>
                {
                    new Skill { Id = 1, SkillLevel = "Basic" },
                    new Skill { Id = 2, SkillLevel = "Upskill" }
                };
                context.Skills.AddRange(skillLevel);
                context.SaveChanges();
                // Create mock instances of your required repositories
                var userAssessmentRepository = new Mock<IUserAssessmentRepository>();
                var assessmentHistoryRepository = new Mock<IAssessmentHistoryRepository>();
                var questionTypeRepository = new Mock<IQuestionTypeRepository>();
                var topicRepository = new Mock<ITopicRepository>();
                var skillRepository = new Mock<ISkillRepository>();
                var storedProcedureRepository = new Mock<IStoredProcedureRepository>();
                var filterTestHistoryRepository = new Mock<IFilterTestHistoryRepository>();
                var historyService = new HistoryTableService(
                    userAssessmentRepository.Object,
                    assessmentHistoryRepository.Object,
                    questionTypeRepository.Object,
                    topicRepository.Object,
                    skillRepository.Object,
                    storedProcedureRepository.Object,
                    filterTestHistoryRepository.Object
                );
                // Act
                var result = await historyService.GetAllSkill();
                // Assert
                Assert.That(result, Is.Not.Null);
                Assert.That(result.All(d => skillLevel.Any(d2 => d2.Id == d.Id && d2.SkillLevel == d.SkillLevel)), Is.True);
            }
        }
        #endregion
        #region GetTopicsBasedOnDepartment
        [Test]
        public async Task GetTopicsByDepartment_ReturnsListOfTopics()
        {
            // Arrange
            using (var context = new SkillAssessmentDbContext(_options))
            {
                // Initialize your in-memory database with test data
                var departments = new List<Department>
                {
                    new Department { Id = 1, DepartmentName = "Department 1" },
                    new Department { Id = 2, DepartmentName = "Department 2" }
                };
                context.Departments.AddRange(departments);

                var topics = new List<Topic>
                {
                    new Topic { Id = 1, DepartmentId = 1, TopicName = "Topic 1" },
                    new Topic { Id = 2, DepartmentId = 2, TopicName = "Topic 2" }
                };
                context.Topics.AddRange(topics);
                context.SaveChanges();
                // Create mock instances of your required repositories
                var userAssessmentRepository = new Mock<IUserAssessmentRepository>();
                var assessmentHistoryRepository = new Mock<IAssessmentHistoryRepository>();
                var questionTypeRepository = new Mock<IQuestionTypeRepository>();
                var topicRepository = new Mock<ITopicRepository>();
                var skillRepository = new Mock<ISkillRepository>();
                var storedProcedureRepository = new Mock<IStoredProcedureRepository>();
                var filterTestHistoryRepository = new Mock<IFilterTestHistoryRepository>();
                var historyService = new HistoryTableService(
                    userAssessmentRepository.Object,
                    assessmentHistoryRepository.Object,
                    questionTypeRepository.Object,
                    topicRepository.Object,
                    skillRepository.Object,
                    storedProcedureRepository.Object,
                    filterTestHistoryRepository.Object
                );
                // Act
                var result = await historyService.GetTopicsByDepartment(new string[] { "Department 1", "Department 2" });
                // Assert
                Assert.That(result, Is.Not.Null);
            }
        }
        #endregion
        #region FilterTestHistory
        [Test]
        public async Task FilterByTopic_ReturnsListOfHistoryDTO()
        {
            // Arrange
            using (var context = new SkillAssessmentDbContext(_options))
            {
                // Initialize your in-memory database with test data
                // Add code to populate your in-memory database here

                var userAssessmentRepositoryMock = new Mock<IUserAssessmentRepository>();
                var assessmentHistoryRepositoryMock = new Mock<IAssessmentHistoryRepository>();
                var questionTypeRepositoryMock = new Mock<IQuestionTypeRepository>();
                var topicRepositoryMock = new Mock<ITopicRepository>();
                var skillRepositoryMock = new Mock<ISkillRepository>();
                var storedProcedureRepositoryMock = new Mock<IStoredProcedureRepository>();
                var filterTestHistoryRepositoryMock = new Mock<IFilterTestHistoryRepository>();

                var historyService = new HistoryTableService(
                    userAssessmentRepositoryMock.Object,
                    assessmentHistoryRepositoryMock.Object,
                    questionTypeRepositoryMock.Object,
                    topicRepositoryMock.Object,
                    skillRepositoryMock.Object,
                    storedProcedureRepositoryMock.Object,
                    filterTestHistoryRepositoryMock.Object
                );

                var topiclist = new string[] { "Topic 1", "Topic 2" };
                var skillLevel = "Beginner";
                var roleName = "Employee";

                var mockResult = new List<HistoryDTO>
                {
                    new HistoryDTO { /* Initialize properties here */ }
                    // Add more mock items as needed
                };

                filterTestHistoryRepositoryMock.Setup(repo => repo.FilterByTopic(topiclist, skillLevel, roleName))
                                               .ReturnsAsync(mockResult);

                // Act
                var result = await historyService.FilterByTopic(topiclist, skillLevel, roleName);

                // Assert
                Assert.That(result, Is.Not.Null);
                Assert.That(result.Count, Is.EqualTo(mockResult.Count));
            }
        }
        #endregion
        #region Delete UserAssessment
        /// <summary>
        /// If Success=>Delete the UserAssessment
        /// If Failure=>Returns empty list
        /// </summary>
        /// <returns></returns>
        [Test]
        public async Task DeleteAssessment_RemovesAssessmentAndReturnsList()
        {
            // Arrange
            using (var context = new SkillAssessmentDbContext(_options))
            {
                var userAssessment = new UserAssessment
                {
                    Id = 1,
                    UserId = "user1",
                    AssessmentId = "assessment1",
                    AssessmentHistoryId = 1,
                    NumberOfTopics = 1,
                    DateOfCompletion = DateTime.Now
                };
                context.UserAssessments.Add(userAssessment);
                var assessmentHistory = new AssessmentHistory
                {
                    Id = 1,
                    Status = "Completed",
                    DateOfSubmission = DateTime.Now
                };
                context.AssessmentHistorys.Add(assessmentHistory);
                context.SaveChanges();
                var userAssessmentRepositoryMock = new Mock<IUserAssessmentRepository>();
                var assessmentHistoryRepositoryMock = new Mock<IAssessmentHistoryRepository>();
                var questionTypeRepositoryMock = new Mock<IQuestionTypeRepository>();
                var topicRepositoryMock = new Mock<ITopicRepository>();
                var skillRepositoryMock = new Mock<ISkillRepository>();
                var storedProcedureRepositoryMock = new Mock<IStoredProcedureRepository>();
                var filterTestHistoryRepositoryMock = new Mock<IFilterTestHistoryRepository>();
                var historyService = new HistoryTableService(
                    userAssessmentRepositoryMock.Object,
                    assessmentHistoryRepositoryMock.Object,
                    questionTypeRepositoryMock.Object,
                    topicRepositoryMock.Object,
                    skillRepositoryMock.Object,
                    storedProcedureRepositoryMock.Object,
                    filterTestHistoryRepositoryMock.Object
                );

                // Act
                var result = await historyService.DeleteAssessment(1);

                // Assert
                Assert.That(result, Is.Not.Null);
                Assert.That(context.UserAssessments.Count(), Is.EqualTo(1)); // Ensure the assessment was deleted
            }
        }
        [Test]
        public async Task DeleteAssessment_ThrowsException_ReturnsEmptyList()
        {
            // Arrange
            using (var context = new SkillAssessmentDbContext(_options))
            {
                var userAssessment = new UserAssessment
                {
                    Id = 4,
                    UserId = "user1",
                    AssessmentId = "assessment1",
                    AssessmentHistoryId = 1,
                    NumberOfTopics = 1,
                    DateOfCompletion = DateTime.Now
                };
                context.UserAssessments.Add(userAssessment);
                var userAssessmentRepositoryMock = new Mock<IUserAssessmentRepository>();
                userAssessmentRepositoryMock.Setup(repo => repo.Delete(It.IsAny<int>()))
                                           .ThrowsAsync(new Exception("An error occurred"));

                var assessmentHistoryRepositoryMock = new Mock<IAssessmentHistoryRepository>();
                var questionTypeRepositoryMock = new Mock<IQuestionTypeRepository>();
                var topicRepositoryMock = new Mock<ITopicRepository>();
                var skillRepositoryMock = new Mock<ISkillRepository>();
                var storedProcedureRepositoryMock = new Mock<IStoredProcedureRepository>();
                var filterTestHistoryRepositoryMock = new Mock<IFilterTestHistoryRepository>();

                var historyService = new HistoryTableService(
                    userAssessmentRepositoryMock.Object,
                    assessmentHistoryRepositoryMock.Object,
                    questionTypeRepositoryMock.Object,
                    topicRepositoryMock.Object,
                    skillRepositoryMock.Object,
                    storedProcedureRepositoryMock.Object,
                    filterTestHistoryRepositoryMock.Object
                );

                // Act
                var result = await historyService.DeleteAssessment(1);

                // Assert
                Assert.That(result, Is.Not.Null);
                Assert.That(context.UserAssessments.Count(), Is.EqualTo(0));
            }
        }
        #endregion
        #region DeleteAssessmentHistory
        [Test]
        public async Task DeleteAssessmentHistory_RemovesHistoryAndReturnsList()
        {
            // Arrange
            using (var context = new SkillAssessmentDbContext(_options))
            {
                var assessmentHistory = new AssessmentHistory
                {
                    Id = 2,
                    Status = "Completed",
                    DateOfSubmission = DateTime.Now
                };
                context.AssessmentHistorys.Add(assessmentHistory);

                context.SaveChanges();

                var userAssessmentRepositoryMock = new Mock<IUserAssessmentRepository>();
                var assessmentHistoryRepositoryMock = new Mock<IAssessmentHistoryRepository>();
                var questionTypeRepositoryMock = new Mock<IQuestionTypeRepository>();
                var topicRepositoryMock = new Mock<ITopicRepository>();
                var skillRepositoryMock = new Mock<ISkillRepository>();
                var storedProcedureRepositoryMock = new Mock<IStoredProcedureRepository>();
                var filterTestHistoryRepositoryMock = new Mock<IFilterTestHistoryRepository>();

                var historyService = new HistoryTableService(
                    userAssessmentRepositoryMock.Object,
                    assessmentHistoryRepositoryMock.Object,
                    questionTypeRepositoryMock.Object,
                    topicRepositoryMock.Object,
                    skillRepositoryMock.Object,
                    storedProcedureRepositoryMock.Object,
                    filterTestHistoryRepositoryMock.Object
                );

                // Act
                var result = await historyService.DeleteAssessmentHistory(2);

                // Assert
                Assert.That(result, Is.Not.Null);
                Assert.That(context.AssessmentHistorys.Count(), Is.EqualTo(1));
            }
        }
        [Test]
        public async Task DeleteAssessmentHistory_ThrowsException_ReturnsEmptyList()
        {
            // Arrange
            using (var context = new SkillAssessmentDbContext(_options))
            {
                var assessmentHistoryRepositoryMock = new Mock<IAssessmentHistoryRepository>();
                assessmentHistoryRepositoryMock.Setup(repo => repo.DeleteAssessmentHistory(It.IsAny<int>()))
                                              .ThrowsAsync(new Exception("An error occurred"));

                var userAssessmentRepositoryMock = new Mock<IUserAssessmentRepository>();
                var questionTypeRepositoryMock = new Mock<IQuestionTypeRepository>();
                var topicRepositoryMock = new Mock<ITopicRepository>();
                var skillRepositoryMock = new Mock<ISkillRepository>();
                var storedProcedureRepositoryMock = new Mock<IStoredProcedureRepository>();
                var filterTestHistoryRepositoryMock = new Mock<IFilterTestHistoryRepository>();

                var historyService = new HistoryTableService(
                    userAssessmentRepositoryMock.Object,
                    assessmentHistoryRepositoryMock.Object,
                    questionTypeRepositoryMock.Object,
                    topicRepositoryMock.Object,
                    skillRepositoryMock.Object,
                    storedProcedureRepositoryMock.Object,
                    filterTestHistoryRepositoryMock.Object
                );

                // Act
                var result = await historyService.DeleteAssessmentHistory(2);

                // Assert
                Assert.That(result, Is.Not.Null);
                Assert.That(result.Count, Is.EqualTo(0)); // Ensure the result is an empty list
            }
        }
        #endregion
    }
}
