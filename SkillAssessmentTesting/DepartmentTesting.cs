using Moq;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Model.CoreModel;
using SkillAssessment.Service.DepartmentService;

namespace SkillAssessmentTesting
{
    [TestFixture]
    public class DepartmentTesting
    {
        private Mock<IDepartmentRepository> mockRepo;
        private DepartmentService departmentService;

        [SetUp]
        public void Setup()
        {
            mockRepo = new Mock<IDepartmentRepository>();
            departmentService = new DepartmentService(mockRepo.Object);
        }
        #region Get all departments
        [Test]
        public async Task GetAllDepartments_ValidDepartments_ReturnsDepartments()
        {
            // Arrange
            var expectedDepartments = new List<Department> { new Department(), new Department() };
            mockRepo.Setup(repo => repo.GetDepartments()).ReturnsAsync(expectedDepartments);

            // Act
            List<Department> result = await departmentService.GetAllDepartments();

            // Assert
            CollectionAssert.AreEqual(expectedDepartments, result);
        }
        #endregion
        #region Get empty list by throwing exception
        [Test]
        public async Task GetAllDepartments_ExceptionThrown_ReturnsEmptyList()
        {
            // Arrange
            mockRepo.Setup(repo => repo.GetDepartments()).ThrowsAsync(new Exception("Simulated exception"));

            // Act
            List<Department> result = await departmentService.GetAllDepartments();

            // Assert
            CollectionAssert.AreEqual(new List<Department>(), result);
        }
        #endregion
    }
}
