using Moq;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Model.ViewModel;
using SkillAssessment.Repository.RequestUserDetailsRepository;
#nullable disable

namespace SkilAssessmentTesting
{
    [TestFixture]
    public class RequestUserDetailsTest
    {
        #region GetRequestDetails Success
        [Test]
        public async Task GetRequestUser_ReturnsUserDetails()
        {
            // Arrange
            var requestId = 1;

            var storedProcedureRepositoryMock = new Mock<IStoredProcedureRepository>();
            var userDetails = new RequestUserDTO
            {
                // Initialize properties here
            };
            storedProcedureRepositoryMock.Setup(repo => repo.GetRequestUser(requestId))
                                        .ReturnsAsync(userDetails);

            var requestUserService = new RequestUserDetailsService(
                storedProcedureRepositoryMock.Object
            );

            // Act
            var result = await requestUserService.GetRequestUser(requestId);

            // Assert
            Assert.NotNull(result);
            Assert.IsInstanceOf<RequestUserDTO>(result);
        }

        [Test]
        public async Task GetRequestUser_ReturnsEmptyUserDetails()
        {
            // Arrange
            var requestId = 1;

            var storedProcedureRepositoryMock = new Mock<IStoredProcedureRepository>();
            storedProcedureRepositoryMock.Setup(repo => repo.GetRequestUser(requestId))
                                        .ReturnsAsync((RequestUserDTO)null); // Return null

            var requestUserService = new RequestUserDetailsService(
                storedProcedureRepositoryMock.Object
            );

            // Act
            var result = await requestUserService.GetRequestUser(requestId);

            // Assert
            Assert.NotNull(result);
            Assert.IsInstanceOf<RequestUserDTO>(result);
        }

        #endregion
    }
}
