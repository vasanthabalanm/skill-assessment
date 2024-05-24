using SkillAssessment.Model.CoreModel;

namespace SkillAssessment.Interface.Repository
{
    public interface IDepartmentRepository
    {
        Task<List<Department>> GetDepartments();
    }
}
