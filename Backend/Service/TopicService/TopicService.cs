using Microsoft.AspNetCore.Mvc;
using SkillAssessment.GlobalException;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Interface.Service;
using SkillAssessment.Model.CoreModel;

namespace SkillAssessment.Service.TopicService
{
    public class TopicService : ITopicService
    {
        #region Properties
        private readonly ITopicRepository _repo;
        #endregion
        #region Constructor
        /// <summary>
        /// Parameterized Constructor
        /// </summary>
        /// <param name="repo"></param>
        public TopicService(ITopicRepository repo)
        {
            _repo = repo;
        }
        #endregion
        #region Get Topic name by Id Service
        /// <summary>
        /// Retrieves a topic name of that respective Id.
        /// </summary>
        /// <returns>returns the topic name , if the id doesn't match , it throws Custom Exception message</returns>
        public async Task<string> GetTopicName(int id)
        {
            var empty = string.Empty;
            try
            {
                var topic = await _repo.GetTopicNameById(id)
                    ?? throw new Exception(CustomException.ExceptionMessages["NoId"]);
                return topic;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return empty;
            }
        }
        #endregion
        #region Get all the Topics Service
        /// <summary>
        /// Retrieves all the topics.
        /// </summary>
        /// <returns>returns all the topics , if the topic count is zero, it throws Custom Exception message</returns>
        public async Task<List<Topic>> GetTopic()
        {
            try
            {
                var topic = await _repo.GetTopics();
                if (topic.Count == 0)
                {
                    throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
                }
                return topic;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<Topic>();
            }
        }
        #endregion
        #region Get All Topics by Id Service
        /// <summary>
        /// Retrieves a topics of that respective Id.
        /// </summary>
        /// <returns>returns the topics , if the id doesn't match , it throws Custom Exception message</returns>
        public async Task<List<Topic>> GetAllTopicsById(int departmentId)
        {
            try
            {
                var topic = await _repo.GetTopicsById(departmentId);
                if (topic.Count == 0)
                {
                    throw new Exception(CustomException.ExceptionMessages["NoId"]);
                }

                return topic;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<Topic>();
            }
        }
        #endregion
        #region Post Topic Service
        /// <summary>
        /// Add new topic
        /// </summary>
        /// <returns>Add new topic and returns the topic which is added</returns>
        public async Task<Topic> PostTopics([FromForm] Topic topic)
        {
            try
            {
                var addTopic = await _repo.AddTopics(topic);
                return addTopic;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new Topic();
            }
        }
        #endregion

    }
}
