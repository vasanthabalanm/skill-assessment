using Microsoft.EntityFrameworkCore;
using SkillAssessment.Data;
using SkillAssessment.GlobalException;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Model.CoreModel;
using SkillAssessment.Model.ViewModel;
using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Repository.RandomQuestionRepository
{
    [ExcludeFromCodeCoverage]
    public class RandomQuestionRepository : IRandomQuestionRepository
    {
        #region Properties
        private readonly SkillAssessmentDbContext _context;
        #endregion
        #region Constructor
        /// <summary>
        /// Parameterized Constructor
        /// </summary>
        /// <param name="context"></param>
        public RandomQuestionRepository(SkillAssessmentDbContext context)
        {
            _context = context;
        }
        #endregion
        #region Generating Random Questions Repository
        /// <summary>
        /// Generates Random Question based on number of users and number of questions
        /// </summary>
        /// <returns>TList of Questions that are randomly genearted.</returns>
        public async Task<List<QuestionPage>> CreateQuestionPages(string assessId, RandomQuestionsRequestDTO requestDto, string[] names)
        {
            try
            {
                string assessmentId = assessId;
                List<string> users = await GetUserIdsByNames(names);
                List<AddQuestion> randomQuestions = await RandomQuestions(requestDto) ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
                List<QuestionPage> questionPages = await CreateQuestionPagesForUsers(assessmentId, users, randomQuestions);
                await _context.SaveChangesAsync();
                return questionPages;
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); return new List<QuestionPage>(); }
        }
        private async Task<List<string>> GetUserIdsByNames(string[] names)
        {
            List<string> users = new();
            foreach (var item in names)
            {
                var userIds = await (from user in _context.Users
                                     where (user.FirstName + " " + user.LastName) == item
                                     select user.Id
                                    ).ToListAsync();
                users.AddRange(userIds);
            }
            if (users.Count == 0)
            {
                throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
            }
            return users;
        }
        private async Task<List<QuestionPage>> CreateQuestionPagesForUsers(string assessmentId, List<string> users, List<AddQuestion> randomQuestions)
        {
            List<QuestionPage> questionPages = new();
            var tasks = new List<Task>();
            foreach (var userId in users)
            {
                foreach (var question in randomQuestions)
                {
                    var questionPage = new QuestionPage
                    {
                        AddQuestionId = question.Id,
                        AssessmentId = assessmentId,
                        UserId = userId
                    };
                    _context.QuestionPages.Add(questionPage);
                    questionPages.Add(questionPage);
                    // Start the task asynchronously
                    tasks.Add(_context.SaveChangesAsync());
                }
            }
            // Wait for all tasks to complete
            await Task.WhenAll(tasks);
            return questionPages;
        }
        public async Task<List<AddQuestion>> RandomQuestions(RandomQuestionsRequestDTO requestDto)
        {
            try
            {
                var randomQuestions = await _context.AddQuestions
                    .Where(q => requestDto.TopicIds != null && requestDto.TopicIds.Contains(q.TopicId)
                        && (requestDto.SkillId == null || q.SkillId == requestDto.SkillId))
                    .OrderBy(q => Guid.NewGuid()) // Randomize the order of questions
                    .Take(requestDto.QuestionCount ?? 0)
                    .ToListAsync() ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
                return randomQuestions;
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); return new List<AddQuestion>(); }
        }
        #endregion
    }
}
