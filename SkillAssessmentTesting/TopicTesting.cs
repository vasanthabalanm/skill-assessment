using Moq;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Model.CoreModel;
using SkillAssessment.Service.TopicService;
#nullable disable
namespace SkillAssessmentTesting
{
    [TestFixture]
    public class TopicTesting
    {
        private Mock<ITopicRepository> mockRepo;
        private TopicService topicService;
        [SetUp]
        public void Setup()
        {
            mockRepo = new Mock<ITopicRepository>();
            topicService = new TopicService(mockRepo.Object);
        }
        #region Get topic name by valid topic Id
        [Test]
        public async Task GetTopicName_ValidId_ReturnsTopicName()
        {
            // Arrange
            int Id = 1;
            string TopicName = "HTML";
            mockRepo.Setup(repo => repo.GetTopicNameById(Id)).ReturnsAsync(TopicName);
            // Act
            string result = await topicService.GetTopicName(Id);
            // Assert
            Assert.That(result, Is.EqualTo(TopicName));
        }
        #endregion
        #region Get empty string by giving invalid topic Id
        [Test]
        public async Task GetTopicName_InvalidId_ReturnsEmpty()
        {
            // Arrange
            int invalidId = -1;
            mockRepo.Setup(repo => repo.GetTopicNameById(invalidId)).ReturnsAsync((string)null);
            // Act
            string result = await topicService.GetTopicName(invalidId);
            // Assert
            Assert.That(result, Is.EqualTo(string.Empty));
        }
        #endregion
        #region Get topics by giving valid department Id
        [Test]
        public async Task GetAllTopicsById_ValidDepartmentId_ReturnsTopics()
        {
            // Arrange
            int validDepartmentId = 1;
            var expectedTopics = new List<Topic> { new Topic(), new Topic() };
            mockRepo.Setup(repo => repo.GetTopicsById(validDepartmentId)).ReturnsAsync(expectedTopics);
            // Act
            List<Topic> result = await topicService.GetAllTopicsById(validDepartmentId);
            // Assert
            CollectionAssert.AreEqual(expectedTopics, result);
        }
        #endregion
        #region Get empty list for no topics in the department Id
        [Test]
        public async Task GetAllTopicsById_NoTopics_ReturnsEmptyList()
        {
            // Arrange
            int departmentId = 1;
            var emptyList = new List<Topic>();
            mockRepo.Setup(repo => repo.GetTopicsById(departmentId)).ReturnsAsync(emptyList);
            // Act
            List<Topic> result = await topicService.GetAllTopicsById(departmentId);
            // Assert
            CollectionAssert.AreEqual(emptyList, result);
        }
        #endregion
        #region return added topic by valid topic list
        [Test]
        public async Task PostTopics_ValidTopic_ReturnsAddedTopic()
        {
            // Arrange
            var topicToAdd = new Topic { Id = 1, TopicName = "HTML" };
            var expectedAddedTopic = new Topic { Id = 1, TopicName = "CSS" };
            mockRepo.Setup(repo => repo.AddTopics(topicToAdd)).ReturnsAsync(expectedAddedTopic);
            // Act
            Topic result = await topicService.PostTopics(topicToAdd);
            // Assert
            Assert.That(result, Is.EqualTo(expectedAddedTopic));
        }
        #endregion
        #region Get list of topics
        [Test]
        public async Task GetTopic_ValidTopics_ReturnsTopics()
        {
            // Arrange
            var mockTopicList = new List<Topic> { new Topic(), new Topic() };
            mockRepo.Setup(repo => repo.GetTopics()).ReturnsAsync(mockTopicList);
            // Act
            var result = await topicService.GetTopic();
            // Assert
            CollectionAssert.AreEqual(mockTopicList, result);
        }
        #endregion
        #region Throw exception in topic and returns empty list 
        [Test]
        public async Task GetTopic_ExceptionThrown_ReturnsEmptyList()
        {
            // Arrange
            mockRepo.Setup(repo => repo.GetTopics()).ThrowsAsync(new Exception("Simulated exception"));
            // Act
            var result = await topicService.GetTopic();
            // Assert
            CollectionAssert.AreEqual(new List<Topic>(), result);
        }
        #endregion
    }
}
