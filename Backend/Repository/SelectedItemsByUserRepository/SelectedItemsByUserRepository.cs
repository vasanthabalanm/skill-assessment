using Microsoft.EntityFrameworkCore;
using SkillAssessment.Data;
using SkillAssessment.GlobalException;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Model.ViewModel;
using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Repository.SelectedItemsByUser
{
    [ExcludeFromCodeCoverage]
    public class SelectedItemsByUserRepository : ISelectedItemsByUser
    {
        #region Properties
        private readonly SkillAssessmentDbContext _context;
        #endregion

        #region Constructor
        public SelectedItemsByUserRepository(SkillAssessmentDbContext context)
        {
            _context = context;
        }
        #endregion

        #region Get Selected Items By User Repository
        /// <summary>
        /// Sorting Assessments based on the selection by User
        /// </summary>
        /// <param name="DeptId"></param>
        /// <param name="TopicId"></param>
        /// <param name="SkillId"></param>
        /// <param name="rolename"></param>
        /// <returns></returns>
        public async Task<List<AvailableAssessmentDTO>> GetSelectedItemsByUser(int DeptId, int[] TopicId, int SkillId, string rolename)
        {
            try
            {
                var details = await (
                    from UserAssess in _context.UserAssessments
                    join AssessmentList in _context.Assessments on UserAssess.AssessmentId equals AssessmentList.Id
                    join UserTable in _context.Users on UserAssess.UserId equals UserTable.Id
                    join QPage in _context.QuestionPages on AssessmentList.Id equals QPage.AssessmentId
                    join AddQues in _context.AddQuestions on QPage.AddQuestionId equals AddQues.Id
                    join Top in _context.Topics on AddQues.TopicId equals Top.Id
                    join Skll in _context.Skills on AddQues.SkillId equals Skll.Id
                    where UserTable.Role == rolename && Top.DepartmentId == DeptId && TopicId.Contains(Top.Id) && Skll.Id == SkillId
                    group new { UserAssess, AssessmentList, UserTable, QPage, AddQues, Top, Skll } by new { UserAssess.AssessmentId, Top.DepartmentId, AddQues.SkillId } into g
                    select new
                    {
                        AssessmentID = g.Key.AssessmentId,
                        DepartmentId = g.Key.DepartmentId,
                        SkillId = g.Key.SkillId
                    }
                ).ToListAsync();

                var assessmentDTOs = new List<AvailableAssessmentDTO>();

                foreach (var detail in details)
                {
                    var department = _context.Departments.FirstOrDefault(Dep => Dep.Id == detail.DepartmentId);
                    var skill = _context.Skills.FirstOrDefault(Sklls => Sklls.Id == detail.SkillId);

                    var assessmentDTO = new AvailableAssessmentDTO
                    {
                        AssessmentID = detail.AssessmentID,
                        Department = department?.DepartmentName,
                        Skills = skill?.SkillLevel
                    };

                    var topicIds = await (
                        from QPage in _context.QuestionPages
                        join AddQues in _context.AddQuestions on QPage.AddQuestionId equals AddQues.Id
                        join Top in _context.Topics on AddQues.TopicId equals Top.Id
                        where QPage.AssessmentId == detail.AssessmentID
                              && QPage.AddQuestionId == AddQues.Id
                              && AddQues.TopicId == Top.Id
                        select Top.Id
                    ).Distinct().ToArrayAsync();

                    assessmentDTO.TopicID = topicIds;

                    var topicNames = await (
                        from QPage in _context.QuestionPages
                        join AddQues in _context.AddQuestions on QPage.AddQuestionId equals AddQues.Id
                        join Top in _context.Topics on AddQues.TopicId equals Top.Id
                        where QPage.AssessmentId == detail.AssessmentID
                              && QPage.AddQuestionId == AddQues.Id
                              && AddQues.TopicId == Top.Id
                        select Top.TopicName
                    ).Distinct().ToArrayAsync();

                    assessmentDTO.TopicName = topicNames;

                    assessmentDTOs.Add(assessmentDTO);
                }

                if (assessmentDTOs.Count == 0)
                {
                    throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
                }

                return assessmentDTOs;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<AvailableAssessmentDTO>();
            }
        }
        #endregion
    }
}
