using Microsoft.EntityFrameworkCore;
using Moq;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Model.ViewModel;
using SkillAssessment.Service.EmployeeManagementService;
#nullable disable

namespace SkillAssessmentTesting
{
    [TestFixture]
    public class EmployeeManagementTesting
    {
        private readonly Mock<IEmployeeManagementRepository> _employeeMockRepo;
        private readonly EmployeeManagementService _employeeManagementService;
        private readonly Mock<DbContext> _context;
        public EmployeeManagementTesting()
        {
            _employeeMockRepo = new Mock<IEmployeeManagementRepository>();
            _employeeManagementService = new EmployeeManagementService(_employeeMockRepo.Object);
            _context = new Mock<DbContext>();
        }
        #region Test case for BestPerformersDetails
        /// <summary>
        /// Test case for get employee details method
        /// </summary>
        /// <returns>null list of employee details</returns>
        [Test]
        public async Task GetEmployeeDetails_ReturnsListOfEmployees()
        {
            // Arrange
            var testEmployees = new List<ManageEmployeeDTO>
    {
        new ManageEmployeeDTO
        {
            EmpId = "1",
            EmployeeImage = "image1.jpg",
            Name = "John Doe",
            Designation = "Manager",
            Department = "HR",
            Email = "john@example.com",
            Points = 100
        },
        new ManageEmployeeDTO
        {
            EmpId = "2",
            EmployeeImage = "image2.jpg",
            Name = "Jane Smith",
            Designation = "Developer",
            Department = "IT",
            Email = "jane@example.com",
            Points = 80
        }
    };
            _employeeMockRepo.Setup(r => r.GetEmployeeDetails()).ReturnsAsync(testEmployees);
            // Act
            var employees = await _employeeManagementService.GetEmployeeDetails();

            // Assert
            Assert.That(employees, Is.Not.Null);
            Assert.That(employees, Is.InstanceOf<List<ManageEmployeeDTO>>());
            Assert.That(employees.Count, Is.GreaterThan(0));
        }
        #endregion
        #region Test case for Get Employee Details method  return no employee found
        /// <summary>
        /// Test case for Best performer details method to check no employee found condition 
        /// </summary>
        /// <returns>return no employee found </returns>
        [Test]
        public async Task GetEmployeeDetails_NoEmployeesFound()
        {
            // Arrange
            var emptyEmployeeList = new List<ManageEmployeeDTO>();

            _employeeMockRepo.Setup(r => r.GetEmployeeDetails()).ReturnsAsync(emptyEmployeeList);

            // Act
            var employees = await _employeeManagementService.GetEmployeeDetails();

            // Assert
            Assert.That(employees, Is.Not.Null);
            Assert.That(employees, Is.InstanceOf<List<ManageEmployeeDTO>>());
            Assert.That(employees.Count, Is.EqualTo(0));
        }
        #endregion
        #region Test case for Get Employee Details method return Null 
        /// <summary>
        /// Test case for getting a employee details method to check  null list of employee details 
        /// </summary>
        /// <returns> null list of employee details</returns>
        [Test]
        public async Task GetEmployeeDetails_NullReturned()
        {
            // Arrange
            _employeeMockRepo.Setup(r => r.GetEmployeeDetails()).ReturnsAsync((List<ManageEmployeeDTO>)null);

            // Act
            var employees = await _employeeManagementService.GetEmployeeDetails();

            // Assert
            Assert.That(employees, Is.Not.Null);
            Assert.That(employees, Is.InstanceOf<List<ManageEmployeeDTO>>());
            Assert.That(employees.Count, Is.EqualTo(0));
        }
        #endregion
        #region Test case for BestPerformersDetails method return Not Null
        /// <summary>
        /// Test case for Best performer details method to check return not null list of employee details 
        /// </summary>
        /// <returns>not null list of employee details </returns>
        [Test]
        public async Task BestPerformersDetails_ReturnsBestPerformers()
        {
            // Arrange
            var testBestPerformers = new List<ManageEmployeeDTO>
    {
        new ManageEmployeeDTO
        {
            EmpId = "1",
            EmployeeImage = "image1.jpg",
            Name = "Top Performer 1",
            Designation = "Manager",
            Department = "HR",
            Email = "performer1@example.com",
            Points = 150
        },
        new ManageEmployeeDTO
        {
            EmpId = "2",
            EmployeeImage = "image2.jpg",
            Name = "Top Performer 2",
            Designation = "Developer",
            Department = "IT",
            Email = "performer2@example.com",
            Points = 120
        }
        // Add more test best performers if needed
    };

            _employeeMockRepo.Setup(r => r.GetEmployeeDetails()).ReturnsAsync(testBestPerformers);
            // Act
            var bestPerformers = await _employeeManagementService.GetEmployeeDetails();

            // Assert
            Assert.That(bestPerformers, Is.Not.Null);
            Assert.That(bestPerformers, Is.InstanceOf<List<ManageEmployeeDTO>>());
            Assert.That(bestPerformers.Count, Is.GreaterThan(0));
        }
        #endregion
        #region Test case for BestPerformersDetails method return Null 
        /// <summary>
        /// Test case for Best performer details method to check return null list 
        /// </summary>
        /// <returns>null list</returns>
        [Test]
        public async Task BestPerformersDetails_NoBestPerformersFound()
        {
            // Arrange
            var emptyBestPerformersList = new List<ManageEmployeeDTO>();

            _employeeMockRepo.Setup(r => r.BestPerformersDetails()).ReturnsAsync(emptyBestPerformersList);


            // Act
            var bestPerformers = await _employeeManagementService.BestPerformersDetails();

            // Assert
            Assert.That(bestPerformers, Is.Not.Null);
            Assert.That(bestPerformers, Is.InstanceOf<List<ManageEmployeeDTO>>());
            Assert.That(bestPerformers.Count, Is.EqualTo(0));
        }
        #endregion
        #region Test case for FilterEmployeeBasedOnDepartment method return Not Null
        /// <summary>
        /// Test case for Filter employees based on department method to check return not null list of employee details 
        /// </summary>
        /// <returns>not null list of employee details </returns>
        [Test]
        public async Task FilterEmployeeBasedOnDepartment_ReturnsEmployees()
        {
            // Arrange
            var testEmployees = new List<ManageEmployeeDTO>
    {
        new ManageEmployeeDTO
        {
            EmpId = "1",
            EmployeeImage = "image1.jpg",
            Name = "Employee 1",
            Designation = "Manager",
            Department = "HR",
            Email = "employee1@example.com",
            Points = 150
        },
        new ManageEmployeeDTO
        {
            EmpId = "2",
            EmployeeImage = "image2.jpg",
            Name = "Employee 2",
            Designation = "Developer",
            Department = "IT",
            Email = "employee2@example.com",
            Points = 120
        }
        // Add more test employees if needed
    };

            // Setup the mock repository to return the test employees
            _employeeMockRepo.Setup(r => r.FilterEmployeeBasedOnDepartment(It.IsAny<string>())).ReturnsAsync(testEmployees);

            // Act
            var employees = await _employeeManagementService.FilterEmployeeBasedOnDepartment("HR");

            // Assert
            Assert.That(employees, Is.Not.Null);
            Assert.That(employees, Is.InstanceOf<List<ManageEmployeeDTO>>());
            Assert.That(employees.Count, Is.GreaterThan(0));
        }
        #endregion
        #region Test case for FilterEmployeeBasedOnDepartment method when No Employees Found
        /// <summary>
        /// Test case for Filter employees based on department method to check when no employees are found
        /// </summary>
        /// <returns>empty list of employee details </returns>
        [Test]
        public async Task FilterEmployeeBasedOnDepartment_NoEmployeesFound()
        {
            // Arrange
            var emptyEmployeeList = new List<ManageEmployeeDTO>();

            // Setup the mock repository to return an empty list of employees
            _employeeMockRepo.Setup(r => r.FilterEmployeeBasedOnDepartment(It.IsAny<string>())).ReturnsAsync(emptyEmployeeList);

            // Act
            var employees = await _employeeManagementService.FilterEmployeeBasedOnDepartment("Marketing");

            // Assert
            Assert.That(employees, Is.Not.Null);
            Assert.That(employees, Is.InstanceOf<List<ManageEmployeeDTO>>());
            Assert.That(employees.Count, Is.EqualTo(0));
        }
        #endregion
        #region Test case for BestPerformersInDepartment method when Best Performers Found
        /// <summary>
        /// Test case for retrieving best performers within a specific department
        /// </summary>
        /// <returns>List of best performers in the department</returns>
        [Test]
        public async Task BestPerformersInDepartment_ReturnsBestPerformers()
        {
            // Arrange
            var testBestPerformers = new List<ManageEmployeeDTO>
    {
        new ManageEmployeeDTO
        {
            EmpId = "1",
            EmployeeImage = "image1.jpg",
            Name = "Top Performer 1",
            Designation = "Manager",
            Department = "HR",
            Email = "performer1@example.com",
            Points = 150
        },
        new ManageEmployeeDTO
        {
            EmpId = "2",
            EmployeeImage = "image2.jpg",
            Name = "Top Performer 2",
            Designation = "Developer",
            Department = "IT",
            Email = "performer2@example.com",
            Points = 120
        }
        // Add more test best performers if needed
    };

            // Setup the mock repository to return the test best performers
            _employeeMockRepo.Setup(r => r.BestPerformersInDepartment(It.IsAny<string>())).ReturnsAsync(testBestPerformers);

            // Act
            var bestPerformers = await _employeeManagementService.BestPerformersInDepartment("HR");

            // Assert
            Assert.That(bestPerformers, Is.Not.Null);
            Assert.That(bestPerformers, Is.InstanceOf<List<ManageEmployeeDTO>>());
            Assert.That(bestPerformers.Count, Is.GreaterThan(0));
        }
        #endregion
        #region Test case for BestPerformersInDepartment method when No Best Performers Found
        /// <summary>
        /// Test case for retrieving best performers within a specific department when no best performers are found
        /// </summary>
        /// <returns>Empty list of best performers in the department</returns>
        [Test]
        public async Task BestPerformersInDepartment_NoBestPerformersFound()
        {
            // Arrange
            var emptyBestPerformersList = new List<ManageEmployeeDTO>();

            // Setup the mock repository to return an empty list of best performers
            _employeeMockRepo.Setup(r => r.BestPerformersInDepartment(It.IsAny<string>())).ReturnsAsync(emptyBestPerformersList);

            // Act
            var bestPerformers = await _employeeManagementService.BestPerformersInDepartment("Finance");

            // Assert
            Assert.NotNull(bestPerformers);
            Assert.IsInstanceOf<List<ManageEmployeeDTO>>(bestPerformers);
            Assert.That(bestPerformers.Count, Is.EqualTo(0));
        }
        #endregion

    }
}
