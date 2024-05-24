using SkillAssessment.Model.ViewModel;

namespace SkillAssessment.Interface.Service
{
    public interface IEmployeeManagementService
    {
        Task<List<ManageEmployeeDTO>> GetEmployeeDetails();
        Task<List<ManageEmployeeDTO>> BestPerformersDetails();
        Task<List<ManageEmployeeDTO>> FilterEmployeeBasedOnDepartment(string DepartmentName);
        Task<List<ManageEmployeeDTO>> BestPerformersInDepartment(string DepartmentName);
        Task<ManageEmployeeDTO> GetReportingManager(string DepartmentName);
    }
}
