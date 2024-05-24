using Microsoft.EntityFrameworkCore;
using SkillAssessment.Data;
using SkillAssessment.GlobalException;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Model.CoreModel;
using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Repository.QuestionBankRepository
{
    [ExcludeFromCodeCoverage]
    public class QuestionBankRepository : IQuestionBankRepository
    {
        #region Properties
        private readonly SkillAssessmentDbContext _context;
        #endregion
        #region Constructor
        /// <summary>
        /// Parameterized Constructor
        /// </summary>
        /// <param name="context"></param>
        /// <param name="hostEnvironment"></param>
        public QuestionBankRepository(SkillAssessmentDbContext context)
        {
            _context = context;
        }
        #endregion
        #region Get Questions by skillId and topicId Repository
        /// <summary>
        /// Get Questions by skillId and topicId
        /// </summary>
        /// <returns>returns the list of questions of that particular skillId and topicId, if anyone id doesn't matches it returns custom Exception</returns>
        public async Task<List<AddQuestion>> SortQuestionsBySkillIdAndTopicId(int skillId, int topicId)
        {
            try
            {
                var getQuestion = await _context.AddQuestions.Where(skill => skill.SkillId == skillId && skill.TopicId == topicId).ToListAsync();
                if (getQuestion.Count == 0)
                {
                    throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
                }
                return getQuestion;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<AddQuestion>();
            }
        }
        #endregion
        #region Get Questions by topicId Repository
        /// <summary>
        /// Get Questions by skillId and topicId
        /// </summary>
        /// <returns>returns the list of questions of that particular skillId and topicId, if anyone id doesn't matches it returns custom Exception</returns>
        public async Task<List<AddQuestion>> GetCountByTopicId(int topicId)
        {
            try
            {
                var getQuestion = await _context.AddQuestions.Where(skill => skill.TopicId == topicId).ToListAsync();
                if (getQuestion.Count == 0)
                {
                    throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
                }
                return getQuestion;
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
