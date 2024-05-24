using SkillAssessment.Model.CoreModel;

namespace SkillAssessment.Interface.Service
{
    public interface IDepartmentService
    {
        Task<List<Department>> GetAllDepartments();
    }
}
