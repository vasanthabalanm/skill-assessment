using Microsoft.EntityFrameworkCore;
using SkillAssessment.Data;
using SkillAssessment.GlobalException;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Model.CoreModel;
using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Repository.UserAssessmentRepository
{
    [ExcludeFromCodeCoverage]
    public class UserAssessmentRepository : IUserAssessmentRepository
    {
        #region Property
        private readonly SkillAssessmentDbContext _context;
        #endregion
        #region Constructor
        /// <summary>
        /// Parameterized Constructor
        /// </summary>
        /// <param name="context"></param>
        public UserAssessmentRepository(SkillAssessmentDbContext context)
        {
            _context = context;
        }
        #endregion
        #region GetAll UserAssessment Repository
        /// <summary>
        /// Retrieves all UserAssessment
        /// </summary>
        /// <returns>List of UserAssessment.</returns>
        public async Task<List<UserAssessment>> GetAll()
        {
            try
            {
                var item = await _context.UserAssessments.ToListAsync() ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
                return item;
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); return new List<UserAssessment>(); }
        }
        #endregion
        #region Delete UserAssessment Repository
        /// <summary>
        /// Delete a particular UserAssessment
        /// </summary>
        /// <returns>The details for the deleted Id.</returns>
        public async Task<UserAssessment> Delete(int UserAssessId)
        {
            try
            {
                var delitem = await _context.UserAssessments.FindAsync(UserAssessId) ?? throw new Exception(CustomException.ExceptionMessages["NoId"]);
                if (delitem != null)
                {
                    _context.UserAssessments.Remove(delitem);
                }
                await _context.SaveChangesAsync();
                return delitem ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); return new UserAssessment(); }
        }
        #endregion
        #region Post UserAssessment Repository
        /// <summary>
        /// Post new UserAssessment
        /// </summary>
        /// <returns>newly posted UserAssessment.</returns>
        public async Task<UserAssessment> Add(UserAssessment userAssessment)
        {
            try
            {
                // Create a new instance of UserAssessment for each userId
                var newUserAssessment = new UserAssessment
                {
                    UserId = userAssessment.UserId,
                    AssessmentId = userAssessment.AssessmentId,
                    NumberOfTopics = userAssessment.NumberOfTopics,
                    NumberOfQuestions = userAssessment.NumberOfQuestions,
                    TotalTime = userAssessment.TotalTime,
                    DateOfCreation = userAssessment.DateOfCreation,
                    DateOfCompletion = userAssessment.DateOfCompletion,
                    Description = userAssessment.Description
                };

                var item = await _context.UserAssessments.AddAsync(newUserAssessment);
                await _context.SaveChangesAsync();
                if (newUserAssessment == null)
                {
                    throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
                }
                return newUserAssessment;
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); return new UserAssessment(); }
        }
        #endregion
        #region Put DateOfCompletion Repository
        /// <summary>
        /// Update DateOfCompletion of the particular UserAssessment
        /// </summary>
        /// <returns>The details for the Updated Id.</returns>
        public async Task<UserAssessment> PutDate(int userassessId, UserAssessment userAssess)
        {
            try
            {
                var item = await _context.UserAssessments.FindAsync(userassessId) ?? throw new Exception(CustomException.ExceptionMessages["NoUpdate"]);
                item.DateOfCompletion = userAssess.DateOfCompletion;
                await _context.SaveChangesAsync();
                return userAssess;
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); return new UserAssessment(); }
        }
        #endregion
    }
}
