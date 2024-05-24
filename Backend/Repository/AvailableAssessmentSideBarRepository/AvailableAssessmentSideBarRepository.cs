using Microsoft.EntityFrameworkCore;
using SkillAssessment.Data;
using SkillAssessment.GlobalException;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Model.ViewModel;
using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Repository.AvailableAssessmentSideBar
{
    [ExcludeFromCodeCoverage]
    public class AvailableAssessmentSideBarRepository : IAvailableAssessmentSideBar
    {
        #region Properties
        private readonly SkillAssessmentDbContext _context;
        #endregion

        #region Constructor
        public AvailableAssessmentSideBarRepository(SkillAssessmentDbContext context)
        {
            _context = context;
        }
        #endregion

        #region Edit Side Bar Details Repository
        /// <summary>
        /// To Assign existing Assessments to the Employee or Jobseeker
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<SideBarDTO> AvailableAssessmentEditSideBar(string id)
        {
            try
            {
                var item = await (from AssessUser in _context.UserAssessments
                                  join Assess in _context.Assessments on AssessUser.AssessmentId equals Assess.Id
                                  join user in _context.Users on AssessUser.UserId equals user.Id
                                  join history in _context.AssessmentHistorys on AssessUser.AssessmentHistoryId equals history.Id
                                  where AssessUser.AssessmentId == id
                                  select new SideBarDTO()
                                  {
                                      UserAssessmentId = AssessUser.Id,
                                      AssessmentId = AssessUser.AssessmentId,
                                      Department = (from Qnpage in _context.QuestionPages
                                                    join assmt in _context.Assessments on Qnpage.AssessmentId equals assmt.Id
                                                    join addqn in _context.AddQuestions on Qnpage.AddQuestionId equals addqn.Id
                                                    join top in _context.Topics on addqn.TopicId equals top.Id
                                                    join dept in _context.Departments on top.DepartmentId equals dept.Id
                                                    where Qnpage.AssessmentId == AssessUser.AssessmentId && Qnpage.AddQuestionId == addqn.Id && addqn.TopicId == top.Id && top.DepartmentId == dept.Id
                                                    select dept.DepartmentName).FirstOrDefault(),


                                      Skills = (from Qnpage in _context.QuestionPages
                                                join assmt in _context.Assessments on Qnpage.AssessmentId equals assmt.Id
                                                join addqn in _context.AddQuestions on Qnpage.AddQuestionId equals addqn.Id
                                                join skll in _context.Skills on addqn.SkillId equals skll.Id
                                                where Qnpage.AssessmentId == AssessUser.AssessmentId && Qnpage.AddQuestionId == addqn.Id && addqn.SkillId == skll.Id
                                                select skll.SkillLevel).FirstOrDefault(),

                                      TopicName = (from Qnpage in _context.QuestionPages
                                                   join assmt in _context.Assessments on Qnpage.AssessmentId equals assmt.Id
                                                   join addqn in _context.AddQuestions on Qnpage.AddQuestionId equals addqn.Id
                                                   join top in _context.Topics on addqn.TopicId equals top.Id
                                                   where Qnpage.AssessmentId == AssessUser.AssessmentId && Qnpage.AddQuestionId == addqn.Id && addqn.TopicId == top.Id
                                                   select top.TopicName).Distinct().ToArray(),

                                      UserEmail = user.Email,
                                      NumberOfTopic = AssessUser.NumberOfTopics,
                                      NumberOfQuestion = AssessUser.NumberOfQuestions,
                                      DateOfCompletion = AssessUser.DateOfCompletion,
                                      Name = (from user in _context.Users
                                              where AssessUser.UserId == user.Id
                                              group user by user.FirstName + " " + user.LastName into nameGroup
                                              select nameGroup.Key)
                                              .ToArray(),
                                      Description = AssessUser.Description
                                  }).FirstOrDefaultAsync() ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
                return item;
            }
            catch (ArgumentNullException ex)
            {
                Console.WriteLine(ex.Message, "Cannot Post New Assessment");
                return new SideBarDTO();
            }
        }
        #endregion
    }
}
