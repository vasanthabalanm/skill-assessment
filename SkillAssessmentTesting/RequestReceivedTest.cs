using Microsoft.EntityFrameworkCore;
using Moq;
using SkillAssessment.Data;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Model.CoreModel;
using SkillAssessment.Model.ViewModel;
using SkillAssessment.Repository.RequestReceivedRepository;
#nullable disable

namespace SkilAssessmentTesting
{
    [TestFixture]
    public class RequestReceivedTest
    {
        private DbContextOptions<SkillAssessmentDbContext> _options;
        [SetUp]
        public void Setup()
        {
            _options = new DbContextOptionsBuilder<SkillAssessmentDbContext>()
                .UseInMemoryDatabase(databaseName: "SkillAssessmentTestDb")
                .Options;
        }
        #region GetAllRequest
        /// <summary>
        /// Success=>Returns AllRequest
        /// Failure=>Returns EmptyList
        /// </summary>
        /// <returns></returns
        [Test]
        public async Task GetRequest_SuccessfulRetrieval_ReturnsRequestDTOList()
        {
            // Arrange
            var userRequestRepositoryMock = new Mock<IUserRequestRepository>();
            var storedProcedureRepositoryMock = new Mock<IStoredProcedureRepository>();
            var requestDtoList = new List<RequestDTO>
            {
                new RequestDTO { RequestId = 1},
                new RequestDTO { RequestId = 2}
            };
            storedProcedureRepositoryMock.Setup(repo => repo.GetRequest())
                                        .ReturnsAsync(requestDtoList);

            var requestService = new RequestReceivedService(
                storedProcedureRepositoryMock.Object,
                userRequestRepositoryMock.Object
            );

            // Act
            var result = await requestService.GetRequest();

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result, Is.InstanceOf<List<RequestDTO>>());
            Assert.That(result.Count, Is.EqualTo(requestDtoList.Count));
        }

        [Test]
        public async Task GetRequest_RetrievalFailure_ReturnsEmptyRequestDTOList()
        {
            // Arrange
            var userRequestRepositoryMock = new Mock<IUserRequestRepository>();
            var storedProcedureRepositoryMock = new Mock<IStoredProcedureRepository>();
            storedProcedureRepositoryMock.Setup(repo => repo.GetRequest())
                                        .ReturnsAsync(() => null);

            var requestService = new RequestReceivedService(
                storedProcedureRepositoryMock.Object,
                userRequestRepositoryMock.Object
            );

            // Act
            var result = await requestService.GetRequest();

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result, Is.InstanceOf<List<RequestDTO>>());
            Assert.That(result.Count, Is.EqualTo(0));
        }
        #endregion
        #region AcceptRequest
        /// <summary>
        /// Success=>Returns UpdatedCount
        /// Failure=>Returns EmptyValue
        /// </summary>
        /// <returns></returns
        [Test]
        public async Task UpdateUserRequest_SuccessfulUpdate_ReturnsUpdatedUserRequest()
        {
            // Arrange
            var requestId = 1;
            var updatedIsChecked = true;

            var userRequestRepositoryMock = new Mock<IUserRequestRepository>();
            userRequestRepositoryMock.Setup(repo => repo.UpdateUserRequest(requestId, It.IsAny<UserRequest>()))
                                     .ReturnsAsync(new UserRequest { Id = requestId, IsChecked = updatedIsChecked });

            var storedProcedureRepositoryMock = new Mock<IStoredProcedureRepository>();

            var userRequestService = new RequestReceivedService(
                storedProcedureRepositoryMock.Object,
                userRequestRepositoryMock.Object
            );

            // Act
            var userRequestToUpdate = new UserRequest { Id = requestId, IsChecked = updatedIsChecked };
            var result = await userRequestService.UpdateUserRequest(requestId, userRequestToUpdate);

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result, Is.InstanceOf<UserRequest>());
            Assert.That(result.Id, Is.EqualTo(requestId));
            Assert.That(result.IsChecked, Is.EqualTo(updatedIsChecked));
        }

        [Test]
        public async Task UpdateUserRequest_FailedUpdate_ReturnsEmptyUserRequest()
        {
            // Arrange
            var requestId = 1;
            var updatedIsChecked = true;

            var userRequestRepositoryMock = new Mock<IUserRequestRepository>();
            userRequestRepositoryMock.Setup(repo => repo.UpdateUserRequest(requestId, It.IsAny<UserRequest>()))
                                     .ReturnsAsync(() => null); // Return null to simulate a failed update

            var storedProcedureRepositoryMock = new Mock<IStoredProcedureRepository>();

            var userRequestService = new RequestReceivedService(
                storedProcedureRepositoryMock.Object,
                userRequestRepositoryMock.Object
            );

            // Act
            var userRequestToUpdate = new UserRequest { Id = requestId, IsChecked = updatedIsChecked };
            var result = await userRequestService.UpdateUserRequest(requestId, userRequestToUpdate);

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result, Is.InstanceOf<UserRequest>());
            Assert.That(result.Id, Is.EqualTo(0)); // Assuming Id cannot be negative
            Assert.That(result.IsChecked, Is.Null); // IsChecked should be null due to failed update
        }
        #endregion
        #region UpdateUserRequest
        /// <summary>
        /// Success=>Returns DateOfCompletion
        /// Failure=>Returns EmptyValue
        /// </summary>
        /// <returns></returns>
        [Test]
        public async Task UpdateUserRequestDate_SuccessfulUpdate_ReturnsUpdatedUserRequest()
        {
            // Arrange
            var requestId = 1;
            var updatedDate = DateTime.Now;

            var userRequestRepositoryMock = new Mock<IUserRequestRepository>();
            userRequestRepositoryMock.Setup(repo => repo.UpdateUserRequestDate(requestId, It.IsAny<UserRequest>()))
                                     .ReturnsAsync(new UserRequest { Id = requestId, DateOfCompletion = updatedDate });

            var storedProcedureRepositoryMock = new Mock<IStoredProcedureRepository>();

            var userRequestService = new RequestReceivedService(
                storedProcedureRepositoryMock.Object,
                userRequestRepositoryMock.Object
            );

            // Act
            var userRequestToUpdate = new UserRequest { Id = requestId, DateOfCompletion = updatedDate };
            var result = await userRequestService.UpdateUserRequestDate(requestId, userRequestToUpdate);

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result, Is.InstanceOf<UserRequest>());
            Assert.That(result.Id, Is.EqualTo(requestId));
            Assert.That(result.DateOfCompletion, Is.EqualTo(updatedDate));
        }
        [Test]
        public async Task UpdateUserRequestDate_FailedUpdate_ReturnsEmptyUserRequest()
        {
            // Arrange
            var requestId = 1;
            var updatedDate = DateTime.Now;

            var userRequestRepositoryMock = new Mock<IUserRequestRepository>();
            userRequestRepositoryMock.Setup(repo => repo.UpdateUserRequestDate(requestId, It.IsAny<UserRequest>()))
                                     .ReturnsAsync(() => null); // Return null to simulate a failed update

            var storedProcedureRepositoryMock = new Mock<IStoredProcedureRepository>();

            var userRequestService = new RequestReceivedService(
                storedProcedureRepositoryMock.Object,
                userRequestRepositoryMock.Object
            );

            // Act
            var userRequestToUpdate = new UserRequest { Id = requestId, DateOfCompletion = updatedDate };
            var result = await userRequestService.UpdateUserRequestDate(requestId, userRequestToUpdate);

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Id, Is.EqualTo(0)); // Assuming Id cannot be negative
        }
        #endregion
        #region DeleteRequest
        /// <summary>
        /// Success=>Returns DeletedCount
        /// Failure=>Returns EmptyValue
        /// </summary>
        /// <returns></returns>
        [Test]
        public async Task DeleteRequest_RemovesRequestAndReturnsList()
        {
            // Arrange
            var userRequestRepositoryMock = new Mock<IUserRequestRepository>();
            userRequestRepositoryMock.Setup(repo => repo.DeleteRequest(It.IsAny<int>()))
                                     .ReturnsAsync(new List<UserRequest>()); // Return empty list

            var storedProcedureRepositoryMock = new Mock<IStoredProcedureRepository>();

            var userRequestService = new RequestReceivedService(
                storedProcedureRepositoryMock.Object,
                userRequestRepositoryMock.Object
            );

            using (var context = new SkillAssessmentDbContext(_options))
            {
                var requestId = 1;

                var request = new UserRequest
                {
                    Id = requestId
                };
                context.UserRequests.Add(request);
                context.SaveChanges();

                // Act
                var result = await userRequestService.DeleteRequest(requestId);

                // Assert
                Assert.That(result, Is.Not.Null);
                Assert.That(context.UserRequests.Count(), Is.EqualTo(1));
            }
        }

        [Test]
        public async Task DeleteRequest_ReturnsEmptyList()
        {
            // Arrange
            var userRequestRepositoryMock = new Mock<IUserRequestRepository>();
            userRequestRepositoryMock.Setup(repo => repo.DeleteRequest(It.IsAny<int>()))
                                     .ReturnsAsync(new List<UserRequest>()); // Return empty list

            var storedProcedureRepositoryMock = new Mock<IStoredProcedureRepository>();

            var userRequestService = new RequestReceivedService(
                storedProcedureRepositoryMock.Object,
                userRequestRepositoryMock.Object
            );

            // Act
            var result = await userRequestService.DeleteRequest(1);

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result, Is.InstanceOf<List<UserRequest>>());
            Assert.That(result.Count, Is.EqualTo(0));
        }
        #endregion
    }
}
