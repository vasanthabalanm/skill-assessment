using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using SkillAssessment.Data;
using SkillAssessment.GlobalException;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Model.ViewModel;
using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Repository.EmployeeManagementRepository
{
    [ExcludeFromCodeCoverage]
    public class EmployeeManagementRepository : IEmployeeManagementRepository
    {
        #region Properties
        private readonly SkillAssessmentDbContext _context;
        #endregion
        #region Constructors
        /// <summary>
        /// Parameterized Constructor
        /// </summary>
        /// <param name="context"></param>
        public EmployeeManagementRepository(SkillAssessmentDbContext context)
        {
            _context = context;
        }
        #endregion
        #region Getting All Employee Details Repository
        /// <summary>
        /// Retrieves a list of all employee details
        /// </summary>
        /// <returns>A list of employee details objects.</returns>
        public async Task<List<ManageEmployeeDTO>> GetEmployeeDetails()
        {
            try
            {
                var allemployee = await _context.Set<ManageEmployeeDTO>().FromSqlRaw("EXEC [dbo].[GetEmployeeDetails]").ToListAsync();
                return allemployee ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<ManageEmployeeDTO>();
            }
        }
        #endregion
        #region Getting Overall Best Performers Details Repository
        /// <summary>
        /// Retrieves a overall best performers details
        /// </summary>
        /// <returns>A list of best performers details objects.</returns>
        public async Task<List<ManageEmployeeDTO>> BestPerformersDetails()
        {
            try
            {
                var BestPerformers = await _context.Set<ManageEmployeeDTO>().FromSqlRaw("EXEC USP_BestPerformersDetails").ToListAsync();
                return BestPerformers ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<ManageEmployeeDTO>();
            }
        }
        #endregion
        #region Getting Overall Best Performers Details Repository
        /// <summary>
        /// Retrieves a employees based on department details
        /// </summary>
        /// <returns>A list of employees details from same department details objects.</returns>
        public async Task<List<ManageEmployeeDTO>> FilterEmployeeBasedOnDepartment(string DepartmentName)
        {
            try
            {
                var departmentName = new SqlParameter("@DepartmentName", DepartmentName);
                var employeeDetails = await _context.Set<ManageEmployeeDTO>().FromSqlRaw("EXEC USP_FilterEmployeesByDepartment @DepartmentName", departmentName).ToListAsync();
                return employeeDetails ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<ManageEmployeeDTO>();
            }
        }
        #endregion 
        #region Getting Best Performers In Specific  Department Repository
        /// <summary>
        /// Retrieves a best performers in specific department  
        /// </summary>
        /// <returns>A list of best performers  in department details objects.</returns>
        public async Task<List<ManageEmployeeDTO>> BestPerformersInDepartment(string DepartmentName)
        {
            try
            {
                var departmentName = new SqlParameter("@DepartmentName", DepartmentName);
                var employeeDetails = await _context.Set<ManageEmployeeDTO>().FromSqlRaw("EXEC USP_BestPerformersInDepartment @DepartmentName", departmentName).ToListAsync();
                return employeeDetails ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<ManageEmployeeDTO>();
            }
        }
        #endregion
        #region Getting Reporting Manager Of Specific Department Repository
        /// <summary>
        /// Retrieves a reporting manager of specific department  
        /// </summary>
        /// <returns>A reporting manager of specific department details objects.</returns>
        public async Task<ManageEmployeeDTO> GetReportingManager(string DepartmentName)
        {
            try
            {
                var departmentName = new SqlParameter("@DepartmentName", DepartmentName);
                var manager = await _context.Set<ManageEmployeeDTO>().FromSqlRaw("EXEC USP_GetReportingManager @DepartmentName", departmentName).ToListAsync();
                return manager.FirstOrDefault() ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
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
