using SkillAssessment.Model.CoreModel;
using SkillAssessment.Model.ViewModel;

namespace SkillAssessment.Interface.Service
{
    public interface IAssessmentDataServices
    {
        Task<List<AvailableAssessmentDTO>?> GetAllAssessmentDetails(string rolename);
        Task<User?> GetAdminDetails();
        Task<User?> UpdateAdminDetails(string id, User user);
        Task<List<AvailableAssessmentDTO>?> GetSelectedItems(int DeptId, int[] TopicId, int SkillId, string rolename);
        Task<SideBarDTO?> GetEditSideBar(string id);
        Task<List<EmailHistory>> PostEmail(EmailHistory emailHistory);
       
    }
   
}
