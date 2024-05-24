using SkillAssessment.GlobalException;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Interface.Service;
using SkillAssessment.Model.CoreModel;
using SkillAssessment.Model.View_Model;

namespace SkillAssessment.Service.AllottedAssessmentService
{
    public class AllottedAssessmentService:IAllottedAssessmentService
    {
        #region Properties
        private readonly IStoredProcedureRepository _storedProcedureRepository;
        #endregion
        #region Constructor
        /// <summary>
        /// Parameterized Constructor
        /// </summary>
        /// <param name="storedProcedureRepository"></param>
        public AllottedAssessmentService(IStoredProcedureRepository storedProcedureRepository)
        {
            _storedProcedureRepository = storedProcedureRepository;
        }
        #endregion
        #region Allocated Assessment Service
        /// <summary>
        /// Get all Allocated Assessment
        /// </summary>
        /// <returns>list of AllocatedAssessment.</returns>
        public async Task<List<AllottedTestDTO>> GetAllottedTest(string UserId)
        {
            try
            {
                var item = await _storedProcedureRepository.GetAllottedTest(UserId) ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
                return item;
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); return new List<AllottedTestDTO>(); }
        }
        #endregion

    }
}
