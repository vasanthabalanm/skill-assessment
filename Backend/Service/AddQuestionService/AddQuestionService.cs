using SkillAssessment.GlobalException;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Interface.Service;
using SkillAssessment.Model.CoreModel;

namespace SkillAssessment.Service.AddQuestionService
{
    public class AddQuestionService : IAddQuestionService
    {
        #region Properties
        private readonly IAddQuestionRepository _repo;
        #endregion
        #region Constructor
        /// <summary>
        /// Parameterized Constructor
        /// </summary>
        /// <param name="repo"></param>
        public AddQuestionService(IAddQuestionRepository repo)
        {
            _repo = repo;
        }
        #endregion
        #region Update a particular question Service
        /// <summary>
        /// Update a particular question by id
        /// </summary>
        /// <returns>returns the updated question of that particular Id, if anyone id doesn't matches it returns custom Exception</returns>
        public async Task<List<AddQuestion>> UpdateQuestion(int id, AddQuestion addQuestion)
        {
            try
            {
                var update = await _repo.UpdateQuestions(id, addQuestion)
                    ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
                return update;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<AddQuestion>();
            }
        }
        #endregion
        #region Add Question Service
        /// <summary>
        /// Add new question
        /// </summary>
        /// <returns>returns the added question</returns>
        public async Task<AddQuestion> AddQuestion(AddQuestion addQuestion)
        {
            try
            {
                var add = await _repo.AddNewQuestion(addQuestion) ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
                return add;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new AddQuestion();
            }
        }
        #endregion
        #region Delete Question by Id Service
        /// <summary>
        /// Delete Question by Id
        /// </summary>
        /// <returns>returns the deleted value, if anyone id doesn't matches it returns custom Exception</returns>
        public async Task<AddQuestion> DeleteQuestion(int id)
        {
            try
            {
                var delete = await _repo.DeleteQuestionById(id) ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
                return delete;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new AddQuestion();
            }
        }
        #endregion
        #region Get Questions of topicId Service
        /// <summary>
        /// Get Questions by topicId
        /// </summary>
        /// <returns>returns the questions of that particular topicId, if anyone id doesn't matches it returns custom Exception</returns>
        public async Task<List<AddQuestion>> GetQuestionByTopic(int topicId)
        {
            try
            {
                var questions = await _repo.GetQuestionsByTopic(topicId);
                if (questions.Count == 0)
                {
                    throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);

                }
                return questions;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<AddQuestion>();
            }
        }
        #endregion
        #region Get Questions by skillId and topicId Service
        /// <summary>
        /// Get Questions by skillId and topicId
        /// </summary>
        /// <returns>returns the questions of that particular skillId and topicId, if anyone id doesn't matches it returns custom Exception</returns>
        public async Task<List<AddQuestion>> GetQuestionsByTopicAndSkill(int topicId, int skillId)
        {
            try
            {
                var questions = await _repo.GetQuestionsByTopicSkill(topicId, skillId);
                if (questions.Count == 0)
                {
                    throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
                }
                return questions;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<AddQuestion>();
            }
        }
        #endregion
    }
}
