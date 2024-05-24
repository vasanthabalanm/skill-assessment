using SkillAssessment.GlobalException;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Interface.Service;
using SkillAssessment.Model.CoreModel;
using SkillAssessment.Model.ViewModel;

namespace SkillAssessment.Repository.RequestReceivedRepository
{
    public class RequestReceivedService : IRequestReceivedService
    {
        #region Properties
        private readonly IStoredProcedureRepository _storedProcedureRepository;
        private readonly IUserRequestRepository _userRequestRepository;
        #endregion
        #region Constructor
        /// <summary>
        /// Parameterized Constructor
        /// </summary>
        /// <param name="storedProcedureRepository"></param>
        /// <param name="userRequestRepository"></param>
        public RequestReceivedService(IStoredProcedureRepository storedProcedureRepository, IUserRequestRepository userRequestRepository)
        {
            _storedProcedureRepository = storedProcedureRepository;
            _userRequestRepository = userRequestRepository;
        }
        #endregion
        #region Get All Request Service
        /// <summary>
        /// Retrieves all the request done by employee
        /// </summary>
        /// <returns>list of request.</returns>
        public async Task<List<RequestDTO>> GetRequest()
        {
            try
            {
                var items = await _storedProcedureRepository.GetRequest();
                return items ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); return new List<RequestDTO>(); }
        }
        #endregion
        #region Accepting Request Service
        /// <summary>
        /// Accepting the request of the employee
        /// </summary>
        /// <returns>accepted userRequest.</returns>
        public async Task<UserRequest> UpdateUserRequest(int RequestId, UserRequest userRequest)
        {
            try
            {
                var item = await _userRequestRepository.UpdateUserRequest(RequestId, userRequest);
                return item ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); return new UserRequest(); }
        }
        #endregion
        #region Updating Date Of Completion Service
        /// <summary>
        /// Update the date od completion of the user request
        /// </summary>
        /// <returns>updated request.</returns>
        public async Task<UserRequest> UpdateUserRequestDate(int RequestId, UserRequest userRequest)
        {
            try
            {
                var item = await _userRequestRepository.UpdateUserRequestDate(RequestId, userRequest);
                return item ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); return new UserRequest(); }
        }
        #endregion
        #region Rejecting Request Service
        /// <summary>
        /// Delete the request from UserRequest
        /// </summary>
        /// <returns>list of request.</returns>
        public async Task<List<UserRequest>> DeleteRequest(int RequestId)
        {
            try
            {
                var item = await _userRequestRepository.DeleteRequest(RequestId);
                return item ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); return new List<UserRequest>(); }
        }
        #endregion
    }
}
