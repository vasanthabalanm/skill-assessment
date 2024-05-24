using Moq;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Model.ViewModel;
using SkillAssessment.Repository.TestHistoryRepository;
#nullable disable

namespace SkilAssessmentTesting
{
    [TestFixture]
    public class TestHistoryTest
    {
        #region TestResult
        /// <summary>
        /// Success=>Returns Test Result
        /// </summary>
        /// <returns></returns>
        [Test]
        public async Task GetHistory_ReturnsTestHistory()
        {
            // Arrange
            var userAssessmentId = 1;

            var storedProcedureRepositoryMock = new Mock<IStoredProcedureRepository>();
            var testHistoryDtoList = new TestHistoryDTO
            {
                Score = 65
            };
            storedProcedureRepositoryMock.Setup(repo => repo.GetTestResult(userAssessmentId))
                                        .ReturnsAsync(testHistoryDtoList);

            var historyService = new TestHistoryService(
                storedProcedureRepositoryMock.Object
            );

            // Act
            var result = await historyService.GetHistory(userAssessmentId);

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result, Is.InstanceOf<TestHistoryDTO>());
        }

        [Test]
        public async Task GetHistory_ReturnsEmptyTestHistory()
        {
            // Arrange
            var userAssessmentId = 1;

            var storedProcedureRepositoryMock = new Mock<IStoredProcedureRepository>();
            storedProcedureRepositoryMock.Setup(repo => repo.GetTestResult(userAssessmentId))
                                        .ReturnsAsync((TestHistoryDTO)null); // Return null

            var historyService = new TestHistoryService(
                storedProcedureRepositoryMock.Object
            );

            // Act
            var result = await historyService.GetHistory(userAssessmentId);

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result, Is.InstanceOf<TestHistoryDTO>());
        }
        #endregion
    }
}
