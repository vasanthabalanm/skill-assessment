using Moq;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Model.CoreModel;
using SkillAssessment.Service.AddQuestionService;

namespace SkillAssessmentTesting
{
    [TestFixture]
    public class AddQuestionTesting
    {
        private Mock<IAddQuestionRepository> mockRepo;
        private AddQuestionService addQuestionService;

        [SetUp]
        public void Setup()
        {
            mockRepo = new Mock<IAddQuestionRepository>();
            addQuestionService = new AddQuestionService(mockRepo.Object);
        }
        #region Update questions by valid Id and returns updated questions

        [Test]
        public async Task UpdateQuestion_ValidId_ReturnsUpdatedQuestion()
        {
            // Arrange
            int validId = 1;
            var mockAddQuestion = new AddQuestion { Id = validId, Question = "Question" };
            mockRepo.Setup(repo => repo.UpdateQuestions(validId, mockAddQuestion)).ReturnsAsync(new List<AddQuestion> { mockAddQuestion });
            // Act
            var result = await addQuestionService.UpdateQuestion(validId, mockAddQuestion);
            // Assert
            CollectionAssert.AreEqual(new List<AddQuestion> { mockAddQuestion }, result);
        }
        #endregion
        #region Update questions and returns empty list
        [Test]
        public async Task UpdateQuestion_ExceptionThrown_ReturnsEmptyList()
        {
            // Arrange
            int validId = 1;
            var mockAddQuestion = new AddQuestion { Id = validId, Question = "Question" };
            mockRepo.Setup(repo => repo.UpdateQuestions(validId, mockAddQuestion)).ThrowsAsync(new Exception("Simulated exception"));
            // Act
            var result = await addQuestionService.UpdateQuestion(validId, mockAddQuestion);
            // Assert
            CollectionAssert.AreEqual(new List<AddQuestion>(), result);
        }
        #endregion
        #region Returns added question
        [Test]
        public async Task AddQuestion_ValidQuestion_ReturnsAddedQuestion()
        {
            // Arrange
            var mockAddedQuestion = new AddQuestion();
            mockRepo.Setup(repo => repo.AddNewQuestion(It.IsAny<AddQuestion>())).ReturnsAsync(mockAddedQuestion);
            // Act
            var result = await addQuestionService.AddQuestion(new AddQuestion());
            // Assert
            Assert.That(result, Is.EqualTo(mockAddedQuestion));
        }
        #endregion
        #region Delete questions by valid Id and returns deleted question
        [Test]
        public async Task DeleteQuestion_ValidId_ReturnsDeletedQuestion()
        {
            // Arrange
            int validId = 1;
            var mockDeletedQuestion = new AddQuestion();
            mockRepo.Setup(repo => repo.DeleteQuestionById(validId)).ReturnsAsync(mockDeletedQuestion);
            // Act
            var result = await addQuestionService.DeleteQuestion(validId);
            // Assert
            Assert.That(result, Is.EqualTo(mockDeletedQuestion));
        }
        #endregion
        #region Get questions by valid topic Id
        [Test]
        public async Task GetQuestionByTopic_ValidTopicId_ReturnsQuestions()
        {
            // Arrange
            int validTopicId = 1;
            var mockQuestionList = new List<AddQuestion> { new AddQuestion(), new AddQuestion() };
            mockRepo.Setup(repo => repo.GetQuestionsByTopic(validTopicId)).ReturnsAsync(mockQuestionList);
            // Act
            var result = await addQuestionService.GetQuestionByTopic(validTopicId);
            // Assert
            CollectionAssert.AreEqual(mockQuestionList, result);
        }
        #endregion
        #region Returns empty list by throwing exception
        [Test]
        public async Task GetQuestionByTopic_ExceptionThrown_ReturnsEmptyList()
        {
            // Arrange
            int validTopicId = 1;
            mockRepo.Setup(repo => repo.GetQuestionsByTopic(validTopicId)).ThrowsAsync(new Exception("Simulated exception"));
            // Act
            var result = await addQuestionService.GetQuestionByTopic(validTopicId);
            // Assert
            CollectionAssert.AreEqual(new List<AddQuestion>(), result);
        }
        #endregion
        #region Get questions by valid topic Id and skill Id and returns questions
        [Test]
        public async Task GetQuestionsByTopicAndSkill_ValidIds_ReturnsQuestions()
        {
            // Arrange
            int validTopicId = 1;
            int validSkillId = 2;
            var mockQuestionList = new List<AddQuestion> { new AddQuestion(), new AddQuestion() };
            mockRepo.Setup(repo => repo.GetQuestionsByTopicSkill(validTopicId, validSkillId)).ReturnsAsync(mockQuestionList);
            // Act
            var result = await addQuestionService.GetQuestionsByTopicAndSkill(validTopicId, validSkillId);
            // Assert
            CollectionAssert.AreEqual(mockQuestionList, result);
        }
        #endregion
        #region Returns empty list by throwing exception
        [Test]
        public async Task GetQuestionsByTopicAndSkill_ExceptionThrown_ReturnsEmptyList()
        {
            // Arrange
            int validTopicId = 1;
            int validSkillId = 2;
            mockRepo.Setup(repo => repo.GetQuestionsByTopicSkill(validTopicId, validSkillId)).ThrowsAsync(new Exception("Simulated exception"));
            // Act
            var result = await addQuestionService.GetQuestionsByTopicAndSkill(validTopicId, validSkillId);
            // Assert
            CollectionAssert.AreEqual(new List<AddQuestion>(), result);
        }
        #endregion
    }
}
