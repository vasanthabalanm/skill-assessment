using SkillAssessment.GlobalException;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Interface.Service;
using SkillAssessment.Model.ViewModel;

namespace SkillAssessment.Repository.RequestUserDetailsRepository
{
    public class RequestUserDetailsService : IRequestUserDetailsService
    {
        #region Property
        private readonly IStoredProcedureRepository _storedProcedureRepository;
        #endregion
        #region Constructor
        /// <summary>
        /// Parameterized Constructor
        /// </summary>
        /// <param name="storedProcedureRepository"></param>
        public RequestUserDetailsService(IStoredProcedureRepository storedProcedureRepository)
        {
            _storedProcedureRepository = storedProcedureRepository;
        }
        #endregion
        #region Employee Request Details Service
        /// <summary>
        /// Retrieves particular employee request details
        /// </summary>
        /// <returns>A request details of employee.</returns>
        public async Task<RequestUserDTO> GetRequestUser(int RequestId)
        {
            try
            {
                var userDetails = await _storedProcedureRepository.GetRequestUser(RequestId) ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
                return userDetails;
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); return new RequestUserDTO(); }
        }
        #endregion
    }
}
