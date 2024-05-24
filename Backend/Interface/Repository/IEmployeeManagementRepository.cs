using SkillAssessment.Model.ViewModel;

namespace SkillAssessment.Interface.Repository
{
    public interface IEmployeeManagementRepository
    {
        Task<List<ManageEmployeeDTO>> GetEmployeeDetails();
        Task<List<ManageEmployeeDTO>> BestPerformersDetails();
        Task<List<ManageEmployeeDTO>> FilterEmployeeBasedOnDepartment(string DepartmentName);
        Task<List<ManageEmployeeDTO>> BestPerformersInDepartment(string DepartmentName);
        Task<ManageEmployeeDTO> GetReportingManager(string DepartmentName);
    }
}
