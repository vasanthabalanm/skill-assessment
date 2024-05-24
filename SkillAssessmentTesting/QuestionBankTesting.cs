using Moq;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Model.CoreModel;
using SkillAssessment.Service.QuestionBankService;

namespace SkillAssessmentTesting
{
    [TestFixture]
    public class QuestionBankTesting
    {
        private Mock<IQuestionBankRepository> mockRepo;
        private QuestionBankService questionBankService;

        [SetUp]
        public void Setup()
        {
            mockRepo = new Mock<IQuestionBankRepository>();
            questionBankService = new QuestionBankService(mockRepo.Object);
        }
        #region Get question count by valid skill Id and topic Id and returns count
        [Test]
        public async Task GetQuestionCountBySkillIdAndTopicId_ValidIds_ReturnsQuestionCount()
        {
            // Arrange
            int validSkillId = 1;
            int validTopicId = 1;
            var expectedQuestionCount = 5;
            var mockQuestionList = new List<AddQuestion> { new AddQuestion(), new AddQuestion(), new AddQuestion(), new AddQuestion(), new AddQuestion() };
            mockRepo.Setup(repo => repo.SortQuestionsBySkillIdAndTopicId(validSkillId, validTopicId)).ReturnsAsync(mockQuestionList);
            // Act
            int result = await questionBankService.GetQuestionCountBySkillIdAndTopicId(validSkillId, validTopicId);
            // Assert
            Assert.That(result, Is.EqualTo(expectedQuestionCount));
        }
        #endregion
        #region Exception thrown by skill Id and topic Id and returns zero
        [Test]
        public async Task GetQuestionCountBySkillIdAndTopicId_ExceptionThrown_ReturnsZero()
        {
            // Arrange
            int validSkillId = 1;
            int validTopicId = 1;
            mockRepo.Setup(repo => repo.SortQuestionsBySkillIdAndTopicId(validSkillId, validTopicId)).ThrowsAsync(new Exception("Simulated exception"));
            // Act
            int result = await questionBankService.GetQuestionCountBySkillIdAndTopicId(validSkillId, validTopicId);
            // Assert
            Assert.That(result, Is.EqualTo(0));
        }
        #endregion
        #region Get question count by valid topic Id and returns count
        [Test]
        public async Task GetAvailableQuestionCount_ValidTopicId_ReturnsQuestionCount()
        {
            // Arrange
            int validTopicId = 1;
            var expectedQuestionCount = 3;
            var mockQuestionList = new List<AddQuestion> { new AddQuestion(), new AddQuestion(), new AddQuestion() };
            mockRepo.Setup(repo => repo.GetCountByTopicId(validTopicId)).ReturnsAsync(mockQuestionList);
            // Act
            int result = await questionBankService.GetAvailableQuestionCount(validTopicId);
            // Assert
            Assert.That(result, Is.EqualTo(expectedQuestionCount));
        }
        #endregion
        #region Exception thrown by topic Id and returns zero
        [Test]
        public async Task GetAvailableQuestionCount_ExceptionThrown_ReturnsZero()
        {
            // Arrange
            int validTopicId = 1;
            mockRepo.Setup(repo => repo.GetCountByTopicId(validTopicId)).ThrowsAsync(new Exception("Simulated exception"));

            // Act
            int result = await questionBankService.GetAvailableQuestionCount(validTopicId);

            // Assert
            Assert.That(result, Is.EqualTo(0));
        }
        #endregion
    }
}
