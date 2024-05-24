using SkillAssessment.GlobalException;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Interface.Service;
using SkillAssessment.Model.ViewModel;

namespace SkillAssessment.Service.EmployeeManagementService
{
    public class EmployeeManagementService : IEmployeeManagementService
    {
        #region Properties
        private readonly IEmployeeManagementRepository _employeemanagementrepo;
        #endregion
        #region Constructors
        /// <summary>
        /// Parameterized Constructor
        /// </summary>
        /// <param name="context"></param>
        public EmployeeManagementService(IEmployeeManagementRepository employeemanagementrepo)
        {
            _employeemanagementrepo = employeemanagementrepo;
        }
        #endregion
        #region Getting All Employee Details Service
        /// <summary>
        /// Retrieves a list of all employee details
        /// </summary>
        /// <returns>A list of employee details objects.</returns>
        public async Task<List<ManageEmployeeDTO>> GetEmployeeDetails()
        {
            try
            {
                var allemployee = await _employeemanagementrepo.GetEmployeeDetails();
                return allemployee ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<ManageEmployeeDTO>();
            }
        }
        #endregion
        #region Getting Overall Best Performers Details Service
        /// <summary>
        /// Retrieves a overall best performers details
        /// </summary>
        /// <returns>A list of best performers details objects.</returns>
        public async Task<List<ManageEmployeeDTO>> BestPerformersDetails()
        {
            try
            {
                var BestPerformers = await _employeemanagementrepo.BestPerformersDetails();
                return BestPerformers ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<ManageEmployeeDTO>();
            }
        }
        #endregion
        #region Getting Overall Best Performers Details Service
        /// <summary>
        /// Retrieves a employees based on department details
        /// </summary>
        /// <returns>A list of employees details from same department details objects.</returns>
        public async Task<List<ManageEmployeeDTO>> FilterEmployeeBasedOnDepartment(string DepartmentName)
        {
            try
            {
                var employeeDetails = await _employeemanagementrepo.FilterEmployeeBasedOnDepartment(DepartmentName);
                return employeeDetails ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<ManageEmployeeDTO>();
            }
        }
        #endregion 
        #region Getting Best Performers In Specific  Department Service
        /// <summary>
        /// Retrieves a best performers in specific department  
        /// </summary>
        /// <returns>A list of best performers  in department details objects.</returns>
        public async Task<List<ManageEmployeeDTO>> BestPerformersInDepartment(string DepartmentName)
        {
            try
            {
                var employeeDetails = await _employeemanagementrepo.BestPerformersInDepartment(DepartmentName);
                return employeeDetails ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<ManageEmployeeDTO>();
            }
        }
        #endregion
        #region Getting Reporting Manager Of Specific Department Service
        /// <summary>
        /// Retrieves a reporting manager of specific department  
        /// </summary>
        /// <returns>A reporting manager of specific department details objects.</returns>
        public async Task<ManageEmployeeDTO> GetReportingManager(string DepartmentName)
        {
            try
            {
                var manager = await _employeemanagementrepo.GetReportingManager(DepartmentName);
                return manager ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new ManageEmployeeDTO();
            }
        }
        #endregion
    }
}
