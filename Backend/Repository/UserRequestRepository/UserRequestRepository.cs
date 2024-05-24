using Microsoft.EntityFrameworkCore;
using SkillAssessment.Data;
using SkillAssessment.GlobalException;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Model.CoreModel;
using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Repository.UserRequestRepository
{
    [ExcludeFromCodeCoverage]
    public class UserRequestRepository : IUserRequestRepository
    {
        #region Properties
        private readonly SkillAssessmentDbContext _context;
        #endregion
        #region Constructor
        /// <summary>
        /// Parameterized Constructor
        /// </summary>
        /// <param name="context"></param>
        public UserRequestRepository(SkillAssessmentDbContext context)
        {
            _context = context;
        }
        #endregion
        #region Accepting Request Repository
        /// <summary>
        /// Accepting the request of the employee
        /// </summary>
        /// <returns>accepted userRequest.</returns>
        public async Task<UserRequest> UpdateUserRequest(int RequestId, UserRequest userRequest)
        {
            try
            {
                var item = await _context.UserRequests.FindAsync(RequestId) ?? throw new Exception(CustomException.ExceptionMessages["NoId"]);
                item.IsChecked = userRequest.IsChecked;
                await _context.SaveChangesAsync();
                return userRequest;
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); return new UserRequest(); }
        }
        #endregion
        #region Updating Date Of Completion Repository
        /// <summary>
        /// Update the date od completion of the user request
        /// </summary>
        /// <returns>updated request.</returns>
        public async Task<UserRequest> UpdateUserRequestDate(int RequestId, UserRequest userRequest)
        {
            try
            {
                var item = await _context.UserRequests.FindAsync(RequestId) ?? throw new Exception(CustomException.ExceptionMessages["NoUpdate"]);
                item.DateOfCompletion = userRequest.DateOfCompletion;
                await _context.SaveChangesAsync();
                return userRequest;
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); return new UserRequest(); }
        }
        #endregion
        #region Rejecting Request Repository
        /// <summary>
        /// Delete the request from UserRequest
        /// </summary>
        /// <returns>list of request.</returns>
        public async Task<List<UserRequest>> DeleteRequest(int RequestId)
        {
            try
            {
                var item = await _context.UserRequests.FindAsync(RequestId) ?? throw new Exception(CustomException.ExceptionMessages["NoId"]);
                if (item != null)
                {
                    _context.UserRequests.Remove(item);
                    await _context.SaveChangesAsync();
                }
                return await _context.UserRequests.ToListAsync();
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); return new List<UserRequest>(); }
        }
        #endregion
    }
}
