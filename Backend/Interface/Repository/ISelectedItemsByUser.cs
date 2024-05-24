using SkillAssessment.Model.ViewModel;

namespace SkillAssessment.Interface.Repository
{
    public interface ISelectedItemsByUser
    {
        Task<List<AvailableAssessmentDTO>> GetSelectedItemsByUser(int DeptId, int[] TopicId, int SkillId, string rolename);
    }
}
