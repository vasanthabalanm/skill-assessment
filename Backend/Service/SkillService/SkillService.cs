using SkillAssessment.GlobalException;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Interface.Service;
using SkillAssessment.Model.CoreModel;

namespace SkillAssessment.Service.SkillService
{
    public class SkillService : ISkillService
    {
        #region Properties
        private readonly ISkillRepository _repo;
        #endregion
        #region Constructor
        /// <summary>
        /// Parameterized Constructor
        /// </summary>
        /// <param name="repo"></param>
        public SkillService(ISkillRepository repo)
        {
            _repo = repo;
        }
        #endregion
        #region Get all the Skill Level Service
        /// <summary>
        /// Retrieves all the skill.
        /// </summary>
        /// <returns>returns all the skill , if the skill count is zero, it throws Custom Exception message</returns>
        public async Task<List<Skill>> GetAllSkillLevel()
        {
            try
            {
                var skill = await _repo.GetSkills();
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
