using Microsoft.AspNetCore.Mvc;
using SkillAssessment.Model.CoreModel;

namespace SkillAssessment.Interface.Service
{
    public interface ITopicService
    {
        Task<string> GetTopicName(int id);
        Task<List<Topic>> GetTopic();
        Task<List<Topic>> GetAllTopicsById(int departmentId);
        Task<Topic> PostTopics([FromForm] Topic topic);
    }
}
