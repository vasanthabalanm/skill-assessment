using SkillAssessment.GlobalException;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Interface.Service;
using SkillAssessment.Model.ViewModel;

namespace SkillAssessment.Repository.TestHistoryRepository
{
    public class TestHistoryService : ITestHistoryService
    {
        #region Property
        private readonly IStoredProcedureRepository _storedProcedure;
        #endregion
        #region Constructor
        /// <summary>
        /// Parameterized Constructor
        /// </summary>
        /// <param name="storedProcedure"></param>
        public TestHistoryService(IStoredProcedureRepository storedProcedure)
        {
            _storedProcedure = storedProcedure;
        }
        #endregion
        #region Get Test Result Service
        /// <summary>
        /// Retrieves a test result for both employee and jobseeker
        /// </summary>
        /// <returns>A test result objects.</returns>
        public async Task<TestHistoryDTO> GetHistory(int UserAssessmentId)
        {
            try
            {
                var item = await _storedProcedure.GetTestResult(UserAssessmentId) ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
                return item;
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); return new TestHistoryDTO(); }
        }
        #endregion
    }
}
