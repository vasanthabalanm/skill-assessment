using SkillAssessment.Model.ViewModel;

namespace SkillAssessment.Interface.Repository
{
    public interface IAvailableAssessmentSideBar
    {
        Task<SideBarDTO> AvailableAssessmentEditSideBar(string id);
    }
}
