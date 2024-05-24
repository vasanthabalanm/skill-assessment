using Microsoft.EntityFrameworkCore;
using SkillAssessment.Data;
using SkillAssessment.GlobalException;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Model.ViewModel;
using System.Diagnostics.CodeAnalysis;


namespace SkillAssessment.Repository.AssessmentDataRepository
{
    [ExcludeFromCodeCoverage]
    public class AssessmentDataRepository : IAssessmentDataRepository
    {
        #region Properties
        private readonly SkillAssessmentDbContext _context;
        #endregion

        #region Constructor
        public AssessmentDataRepository(SkillAssessmentDbContext context)
        {
            _context = context;
        }
        #endregion

        #region Get All Assessments For Jobseeker/Employee Repository
        /// <summary>
        /// From the user input based on the role, all assessments will be displayed
        /// </summary>
        /// <param name="rolename"></param>
        /// <returns></returns>
        public async Task<List<AvailableAssessmentDTO>> GetAllAssessmentDetailsByRole(string rolename)
        {
            try
            {
                var details = await (
                    from UserAssess in _context.UserAssessments
                    join AssessmentList in _context.Assessments on UserAssess.AssessmentId equals AssessmentList.Id
                    join UserTable in _context.Users on UserAssess.UserId equals UserTable.Id
                    where UserTable.Role == rolename
                    select new
                    {
                        UserAssess.AssessmentId,
                        UserTable.DepartmentId,
                        UserAssess.UserId
                    }
                ).Distinct().ToListAsync();
                var assessmentDTOs = new List<AvailableAssessmentDTO>();
                foreach (var detail in details)
                {
                    var assessmentDTO = new AvailableAssessmentDTO
                    {
                        AssessmentID = detail.AssessmentId,
                        Department = _context.Departments.FirstOrDefault(Dep => Dep.Id == detail.DepartmentId)?.DepartmentName,
                        Skills = (
                            from AddQues in _context.AddQuestions
                            join Skll in _context.Skills on AddQues.SkillId equals Skll.Id
                            join QPage in _context.QuestionPages on AddQues.Id equals QPage.AddQuestionId
                            where QPage.AssessmentId == detail.AssessmentId && QPage.UserId == detail.UserId
                            select Skll.SkillLevel
                        ).Distinct().FirstOrDefault(),
                        TopicName = (
                            from AddQues in _context.AddQuestions
                            join Top in _context.Topics on AddQues.TopicId equals Top.Id
                            join QPage in _context.QuestionPages on AddQues.Id equals QPage.AddQuestionId
                            where QPage.AssessmentId == detail.AssessmentId && QPage.UserId == detail.UserId
                            select Top.TopicName
                        ).Distinct().ToArray(),
                        TopicID = (
                            from AddQues in _context.AddQuestions
                            join Top in _context.Topics on AddQues.TopicId equals Top.Id
                            join QPage in _context.QuestionPages on AddQues.Id equals QPage.AddQuestionId
                            where QPage.AssessmentId == detail.AssessmentId && QPage.UserId == detail.UserId
                            select Top.Id
                        ).Distinct().ToArray()
                    };
                    if (!string.IsNullOrEmpty(assessmentDTO.Skills))
                    {
                        var existingAssessment = assessmentDTOs.FirstOrDefault(a => a.AssessmentID == assessmentDTO.AssessmentID);
                        if (existingAssessment == null)
                        {
                            assessmentDTOs.Add(assessmentDTO);
                        }
                        else
                        {
                            existingAssessment.TopicName = existingAssessment.TopicName?.Union(assessmentDTO.TopicName).ToArray();
                            existingAssessment.TopicID = existingAssessment.TopicID?.Union(assessmentDTO.TopicID).ToArray();
                        }
                    }
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
