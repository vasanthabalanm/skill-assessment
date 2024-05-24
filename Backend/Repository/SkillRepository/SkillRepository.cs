using Microsoft.EntityFrameworkCore;
using SkillAssessment.Data;
using SkillAssessment.GlobalException;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Model.CoreModel;
using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Repository.SkillRepository
{
    [ExcludeFromCodeCoverage]
    public class SkillRepository : ISkillRepository
    {
        #region Properties
        private readonly SkillAssessmentDbContext _context;
        #endregion
        #region Constructor
        /// <summary>
        /// Parameterized Constructor
        /// </summary>
        /// <param name="context"></param>
        public SkillRepository(SkillAssessmentDbContext context)
        {
            _context = context;
        }
        #endregion
        #region Getting all the Skill Repository
        /// <summary>
        /// Retrieves all the skill.
        /// </summary>
        /// <returns>returns all the skill , if the skill count is zero, it throws Custom Exception message</returns>
        public async Task<List<Skill>> GetSkills()
        {
            try
            {
                var skill = await _context.Skills.ToListAsync();
                if (skill.Count == 0)
                {
                    throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
                }
                return skill;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<Skill>();
            }
        }
        #endregion
    }
}
