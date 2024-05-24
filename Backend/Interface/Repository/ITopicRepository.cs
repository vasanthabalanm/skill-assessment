using Microsoft.AspNetCore.Mvc;
using SkillAssessment.Model.CoreModel;

namespace SkillAssessment.Interface.Repository
{
    public interface ITopicRepository
    {
        Task<string> GetTopicNameById(int id);
        Task<List<Topic>> GetTopics();
        Task<List<Topic>> GetTopicsById(int departmentId);
        Task<List<string>> GetTopicsByDepartmentArray(string[] deptlist);
        Task<Topic> AddTopics([FromForm] Topic topic);
    }
}
