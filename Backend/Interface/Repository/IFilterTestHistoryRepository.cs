using SkillAssessment.Model.ViewModel;

namespace SkillAssessment.Interface.Repository
{
    public interface IFilterTestHistoryRepository
    {
        Task<List<HistoryDTO>> FilterByTopic(string[] topiclist, string skillLevel, string roleName);
    }
}
