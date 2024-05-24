using Moq;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Model.CoreModel;
using SkillAssessment.Service.SkillService;

namespace SkillAssessmentTesting
{
    [TestFixture]
    public class SkillTesting
    {
        private Mock<ISkillRepository> mockRepo;
        private SkillService skillService;

        [SetUp]
        public void Setup()
        {
            mockRepo = new Mock<ISkillRepository>();
            skillService = new SkillService(mockRepo.Object);
        }
        #region Get all skills
        [Test]
        public async Task GetAllSkillLevel_ReturnsSkills()
        {
            // Arrange
            var expectedSkills = new List<Skill> { new Skill(), new Skill() };
            mockRepo.Setup(repo => repo.GetSkills()).ReturnsAsync(expectedSkills);
            // Act
            List<Skill> result = await skillService.GetAllSkillLevel();
            // Assert
            CollectionAssert.AreEqual(expectedSkills, result);
        }
        #endregion
        #region Get empty list by throwing exception
        [Test]
        public async Task GetAllSkillLevel_ExceptionThrown_ReturnsEmptyList()
        {
            // Arrange
            mockRepo.Setup(repo => repo.GetSkills()).ThrowsAsync(new Exception("Simulated exception"));
            // Act
            List<Skill> result = await skillService.GetAllSkillLevel();
            // Assert
            CollectionAssert.AreEqual(new List<Skill>(), result);
        }
        #endregion
    }
}
