using SkillAssessment.GlobalException;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Interface.Service;

namespace SkillAssessment.Service.QuestionBankService
{
    public class QuestionBankService : IQuestionBankService
    {
        #region Properties
        private readonly IQuestionBankRepository _repo;
        #endregion
        #region Constructor
        /// <summary>
        /// Parameterized Constructor
        /// </summary>
        /// <param name="repo"></param>
        public QuestionBankService(IQuestionBankRepository repo)
        {
            _repo = repo;
        }
        #endregion
        #region Get Question count by skillId and topicId Service
        /// <summary>
        /// Get Question count by skillId and topicId
        /// </summary>
        /// <returns>returns the count of questions of that particular skillId and topicId, if anyone id doesn't matches it returns custom Exception</returns>
        public async Task<int> GetQuestionCountBySkillIdAndTopicId(int skillId, int topicId)
        {
            try
            {
                var getQuestion = await _repo.SortQuestionsBySkillIdAndTopicId(skillId, topicId);
                if (getQuestion.Count == 0)
                {
                    throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
                }
                return getQuestion.Count;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return 0;
            }
        }
        #endregion
        #region Get Question count by topicId Service
        /// <summary>
        /// Get Question count by skillId and topicId
        /// </summary>
        /// <returns>returns the count of questions of that particular skillId and topicId, if anyone id doesn't matches it returns custom Exception</returns>
        public async Task<int> GetAvailableQuestionCount(int topicId)
        {
            try
            {
                var getQuestion = await _repo.GetCountByTopicId(topicId);
                if (getQuestion.Count == 0)
                {
                    throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
                }
                return getQuestion.Count;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return 0;
            }
        }
        #endregion
    }
}
