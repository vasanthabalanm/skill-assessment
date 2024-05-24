using Microsoft.EntityFrameworkCore;
using SkillAssessment.Data;
using SkillAssessment.GlobalException;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Model.ViewModel;
using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Repository.FilterTestHistoryRepository
{
    [ExcludeFromCodeCoverage]
    public class FilterTestHitoryRepository : IFilterTestHistoryRepository
    {
        #region Properties
        private readonly SkillAssessmentDbContext _context;
        #endregion
        #region Constructor
        /// <summary>
        /// Parameterized Constructor
        /// </summary>
        /// <param name="context"></param>
        public FilterTestHitoryRepository(SkillAssessmentDbContext context)
        {
            _context = context;
        }
        #endregion
        #region Filter TestHistory Repository
        /// <summary>
        /// Retrieves a list of testHistory.
        /// </summary>
        /// <returns>A list of testHistory.</returns>
        public async Task<List<HistoryDTO>> FilterByTopic(string[] topiclist, string skillLevel, string roleName)
        {
            try
            {
                var result = new List<HistoryDTO>();
                foreach (var topic in topiclist)
                {
                    var item = await (from AssessUser in _context.UserAssessments
                                      join Assess in _context.Assessments on AssessUser.AssessmentId equals Assess.Id
                                      join user in _context.Users on AssessUser.UserId equals user.Id
                                      join history in _context.AssessmentHistorys on AssessUser.AssessmentHistoryId equals history.Id
                                      join Qpage in _context.QuestionPages on Assess.Id equals Qpage.AssessmentId
                                      join Add in _context.AddQuestions on Qpage.AddQuestionId equals Add.Id
                                      join top in _context.Topics on Add.TopicId equals top.Id
                                      join skil in _context.Skills on Add.SkillId equals skil.Id
                                      where skil.SkillLevel == skillLevel && top.TopicName == topic && user.Role == roleName
                                      select new HistoryDTO()
                                      {
                                          UserAssessmentId = AssessUser.Id,
                                          HistoryId = history.Id,
                                          AssessmentId = AssessUser.AssessmentId,
                                          Department = (from Qnpage in _context.QuestionPages
                                                        join assmt in _context.Assessments on Qnpage.AssessmentId equals assmt.Id
                                                        join addqn in _context.AddQuestions on Qnpage.AddQuestionId equals addqn.Id
                                                        join top in _context.Topics on addqn.TopicId equals top.Id
                                                        join dept in _context.Departments on top.DepartmentId equals dept.Id
                                                        where Qnpage.AssessmentId == AssessUser.AssessmentId && Qnpage.AddQuestionId == addqn.Id && addqn.TopicId == top.Id && top.DepartmentId == dept.Id
                                                        select dept.DepartmentName).FirstOrDefault(),
                                          Skills = skil.SkillLevel,
                                          UserEmail = user.Email,
                                          EmployeeImage = user.EmployeeImage,
                                          NumberOfTopics = AssessUser.NumberOfTopics,
                                          DateOfCompletion = AssessUser.DateOfCompletion,
                                          Status = history.Status,
                                          EmpId = user.Id,
                                          Name = user.FirstName + " " + user.LastName,
                                          CompletedOn = history.DateOfSubmission,
                                          Description = AssessUser.Description
                                      }).Distinct().ToListAsync();
                    result.AddRange(item);
                }
                return result ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]); ;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<HistoryDTO>();
            }
        }
        #endregion
    }
}
