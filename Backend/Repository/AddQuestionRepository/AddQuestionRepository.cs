using Microsoft.EntityFrameworkCore;
using SkillAssessment.Data;
using SkillAssessment.GlobalException;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Model.CoreModel;
using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Repository.AddQuestionRepository
{
    [ExcludeFromCodeCoverage]
    public class AddQuestionRepository : IAddQuestionRepository
    {
        #region Properties
        private readonly SkillAssessmentDbContext _context;
        #endregion
        #region Constructor
        /// <summary>
        /// Parameterized Constructor
        /// </summary>
        /// <param name="context"></param>
        public AddQuestionRepository(SkillAssessmentDbContext context)
        {
            _context = context;
        }
        #endregion
        #region Update a particular question Repository
        /// <summary>
        /// Update a particular question by id
        /// </summary>
        /// <returns>returns the updated question of that particular Id, if anyone id doesn't matches it returns custom Exception</returns>
        public async Task<List<AddQuestion>> UpdateQuestions(int id, AddQuestion addQuestion)
        {
            try
            {
                var update = await _context.AddQuestions.FindAsync(id) ?? throw new Exception(CustomException.ExceptionMessages["NoId"]);
                update.Option1 = addQuestion.Option1;
                update.Option2 = addQuestion.Option2;
                update.Option3 = addQuestion.Option3;
                update.Option4 = addQuestion.Option4;
                update.Answer = addQuestion.Answer;
                update.Explanation = addQuestion.Explanation;
                await _context.SaveChangesAsync();
                return await _context.AddQuestions.ToListAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<AddQuestion>();
            }
        }
        #endregion
        #region Post Question Repository
        /// <summary>
        /// Add new question
        /// </summary>
        /// <returns>returns the added question</returns>
        public async Task<AddQuestion> AddNewQuestion(AddQuestion addQuestion)
        {
            try
            {
                await _context.AddQuestions.AddAsync(addQuestion);
                await _context.SaveChangesAsync();
                return addQuestion;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new AddQuestion();
            }
        }
        #endregion
        #region Delete Question by Id Repository
        /// <summary>
        /// Delete Question by Id
        /// </summary>
        /// <returns>returns the deleted value, if anyone id doesn't matches it returns custom Exception</returns>
        public async Task<AddQuestion> DeleteQuestionById(int id)
        {
            try
            {
                var delete = await _context.AddQuestions.FirstOrDefaultAsync(x => x.Id == id) ?? throw new Exception(CustomException.ExceptionMessages["NoId"]);
                _context.AddQuestions.Remove(delete);
                await _context.SaveChangesAsync();
                return delete;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new AddQuestion();
            }
        }
        #endregion
        #region Get Questions of topicId Repository
        /// <summary>
        /// Get Questions by topicId
        /// </summary>
        /// <returns>returns the questions of that particular topicId, if anyone id doesn't matches it returns custom Exception</returns>
        public async Task<List<AddQuestion>> GetQuestionsByTopic(int topicId)
        {
            try
            {
                var questions = await _context.AddQuestions.Where(add => add.TopicId == topicId).ToListAsync();
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
        #region Get Questions by skillId and topicId Repository
        /// <summary>
        /// Get Questions by skillId and topicId
        /// </summary>
        /// <returns>returns the questions of that particular skillId and topicId, if anyone id doesn't matches it returns custom Exception</returns>
        public async Task<List<AddQuestion>> GetQuestionsByTopicSkill(int topicId, int skillId)
        {
            try
            {
                var questions = await _context.AddQuestions.Where(add => add.TopicId == topicId && add.SkillId == skillId).ToListAsync();
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
