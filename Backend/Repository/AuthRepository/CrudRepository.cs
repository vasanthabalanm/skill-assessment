using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkillAssessment.Data;
using SkillAssessment.GlobalException;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Model.CoreModel;
using SkillAssessment.Model.DTO;
using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Repository.AuthRepository
{
    [ExcludeFromCodeCoverage]
    public class CrudRepository : ICrudRepository<User, UserDTO>
    {
        #region Properties
        private readonly SkillAssessmentDbContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;
        #endregion
        #region Constructor
        /// <summary>
        /// Parameterized Constructor
        /// </summary>
        /// <param name="context"></param>
        /// <param name="hostEnvironment"></param>
        public CrudRepository(SkillAssessmentDbContext context, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            _hostEnvironment = hostEnvironment;
        }
        #endregion
        #region PostUser Repository
        /// <summary>
        /// Adding New User
        /// </summary>
        /// <param name="user"></param>
        /// <returns>The Added User</returns>

        public async Task<User?> Add(User user)
        {
            try
            {
                if (user.ImageFileFormat == null)
                {
                    throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
                }
                user.EmployeeImage = await SaveImage(user.ImageFileFormat);
                var users = _context.Users;
                var myUser = await users.SingleOrDefaultAsync(u => u.Email == user.Email);
                if (myUser == null)
                {
                    await _context.Users.AddAsync(user);
                    await _context.SaveChangesAsync();
                    return user;
                }
                return null;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }
        #endregion
        #region SaveImage
        /// <summary>
        /// To Save the Image in wwwroot/Images 
        /// </summary>
        /// <param name="imageFile"></param>
        /// <returns>The Image Name Stored in wwwroot/Images</returns>
        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "wwwroot/Images", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }
        #endregion
        #region DeleteUser Repository
        /// <summary>
        /// Delete a Particular User
        /// </summary>
        /// <param name="userDTO"></param>
        /// <returns>Returns the user</returns>
        public async Task<User?> Delete(UserDTO userDTO)
        {
            try
            {
                var users = _context.Users;
                var myUser = users.SingleOrDefault(u => u.Email == userDTO.Email);
                if (myUser != null)
                {
                    _context.Users.Remove(myUser);
                    await _context.SaveChangesAsync();
                    return myUser;
                }
                return null;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }
        #endregion
        #region Get Particular Value Repsoitory
        /// <summary>
        /// Gets Particular Details of User
        /// </summary>
        /// <param name="userDTO"></param>
        /// <returns>Particular User Details</returns>
        public async Task<User?> GetValue(UserDTO userDTO)
        {
            try
            {
                var users = await GetAll();
                if (users != null)
                {
                    var user = users.FirstOrDefault(u => u.Email == userDTO.Email);
                    if (user != null)
                    {
                        return user;
                    }
                }
                return null;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }
        #endregion
        #region GetAll Users Repository
        /// <summary>
        /// GetAll Users
        /// </summary>
        /// <returns>list of users</returns>
        public async Task<List<User>?> GetAll()
        {
            try
            {
                var Users = await _context.Users.ToListAsync();
                if (Users != null)
                {
                    return Users;
                }
                return null;
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); return null; }
        }
        #endregion
        #region Get Particular Detail by Email Repository
        /// <summary>
        /// Gets Particular Details of User
        /// </summary>
        /// <param name="email"></param>
        /// <returns>Particular User Details</returns>
        public async Task<User?> Get(string email)
        {
            try
            {
                var Users = await _context.Users.FirstOrDefaultAsync(s => s.Email == email);
                if (Users != null)
                {
                    return Users;
                }
                return null;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }
        #endregion
        #region UpdateUser Repository
        /// <summary>
        /// Update Particular User Details
        /// </summary>
        /// <param name="user"></param>
        /// <returns>Updtaed User</returns>
        public async Task<User?> Update(User user)
        {
            try
            {
                var Newuser = await _context.Users.FirstOrDefaultAsync(s => s.Email == user.Email);
                if (Newuser != null)
                {
                    Newuser.Hashkey = user.Hashkey;
                    Newuser.Password = user.Password;
                    Newuser.Role = user.Role;
                    await _context.SaveChangesAsync();
                    return Newuser;
                }
                return null;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }
        #endregion
    }
}
