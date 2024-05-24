using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkillAssessment.Data;
using SkillAssessment.GlobalException;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Model.CoreModel;
using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Repository.TopicRepository
{
    [ExcludeFromCodeCoverage]
    public class TopicRepository : ITopicRepository
    {
        #region Properties
        private readonly SkillAssessmentDbContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;
        #endregion
        #region Constructors
        /// <summary>
        /// Parameterized Constructor
        /// </summary>
        /// <param name="context"></param>
        /// <param name="hostEnvironment"></param>
        public TopicRepository(SkillAssessmentDbContext context, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            _hostEnvironment = hostEnvironment;
        }
        #endregion
        #region Get Topic Name by Id Repository
        /// <summary>
        /// Retrieves a topic name of that respective Id.
        /// </summary>
        /// <returns>returns the topic name , if the id doesn't match , it throws Custom Exception message</returns>
        public async Task<string> GetTopicNameById(int id)
        {
            var empty = string.Empty;
            try
            {
                var topic = await _context.Topics.Where(topic => topic.Id == id).Select(topic => topic.TopicName).FirstOrDefaultAsync()
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
        #region Getting all the Topics Repository
        /// <summary>
        /// Retrieves all the topics.
        /// </summary>
        /// <returns>returns all the topics , if the topic count is zero, it throws Custom Exception message</returns>
        public async Task<List<Topic>> GetTopics()
        {
            try
            {
                var topic = await _context.Topics.ToListAsync();
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
        #region Get Topics by Id Repository
        /// <summary>
        /// Retrieves a topics of that respective Id.
        /// </summary>
        /// <returns>returns the topics , if the id doesn't match , it throws Custom Exception message</returns>
        public async Task<List<Topic>> GetTopicsById(int departmentId)
        {
            try
            {
                var topic = await _context.Topics.Where(topic => topic.DepartmentId == departmentId).ToListAsync();
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
        #region Get Topics Based on Department Repository
        /// <summary>
        /// Retrieves a list of topics based on department
        /// </summary>
        /// <returns>A list of topics.</returns>
        public async Task<List<string>> GetTopicsByDepartmentArray(string[] deptlist)
        {
            try
            {
                var topics = new List<string>();
                foreach (var departmentName in deptlist)
                {
                    var topicNames = await (
                        from topic in _context.Topics
                        join dept in _context.Departments on topic.DepartmentId equals dept.Id
                        where dept.DepartmentName == departmentName
                        select topic.TopicName
                    ).ToListAsync();
                    topics.AddRange(topicNames);
                }
                if (topics == null)
                {
                    throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
                }
                return topics;
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); return new List<string>(); }
        }
        #endregion
        #region Add Topic Repository
        /// <summary>
        /// Add new topic
        /// </summary>
        /// <returns>Add new topic and returns the topic which is added</returns>
        public async Task<Topic> AddTopics([FromForm] Topic topic)
        {
            try
            {
                if (topic.ImageFileFormat == null)
                {
                    throw new Exception(CustomException.ExceptionMessages["Image"]);
                }
                topic.TopicImage = await SaveImage(topic.ImageFileFormat);
                await _context.Topics.AddAsync(topic);
                await _context.SaveChangesAsync();
                return topic;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new Topic();
            }
        }
        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "wwwroot/Images", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }
        #endregion       
    }
}
