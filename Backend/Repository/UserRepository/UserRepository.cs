using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkillAssessment.Data;
using SkillAssessment.GlobalException;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Model.CoreModel;
using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Repository.UserRepository
{
    [ExcludeFromCodeCoverage]
    public class UserRepository : IUserRepository
    {
        #region Properties
        private readonly SkillAssessmentDbContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;
        #endregion

        #region Constructors
        /// <summary>
        /// Parameterized Constructor
        /// </summary>
        /// <param name="context"></param>
        /// <param name="hostEnvironment"></param>
        public UserRepository(SkillAssessmentDbContext context, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            _hostEnvironment = hostEnvironment;
        }
        #endregion

        #region User Retrieval Repository
        /// <summary>
        /// Retrieves a list of all Users, including both Employees and Jobseekers.
        /// </summary>
        /// <returns>A list of User objects representing Employees and Jobseekers, or an empty list if no users are found.</returns>
        public async Task<List<User>> GetAllUser()
        {
            try
            {
                var allUsers = await _context.Users.ToListAsync();
                return allUsers ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<User>();
            }
        }
        #endregion

        #region User Creation Repository
        /// <summary>
        /// Creates a new User and adds them to the database.
        /// </summary>
        /// <param name="user">The user object contains the user's information.</param>
        /// <returns>The newly created user object.</returns>
        public async Task<object> PostUser([FromForm] User user)
        {
            try
            {
                if (user.ImageFileFormat == null)
                {
                    throw new Exception(CustomException.ExceptionMessages["Image"]);
                }
                user.EmployeeImage = await SaveImage(user.ImageFileFormat);
                var addedUser = await _context.Users.AddAsync(user)
                    ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
                await _context.SaveChangesAsync();
                return addedUser;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return "Not Added";
            }
        }
        #endregion

        #region Image Handling Repository
        /// <summary>
        /// Saves an uploaded image file to the server's file system.
        /// </summary>
        /// <param name="imageFile">The image file to be saved.</param>
        /// <returns>The name of the saved image file.</returns>
        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            try
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
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }
        #endregion

        #region AdminDetails Repository
        public async Task<User> GettingAdminDetails()
        {
            try
            {
                var users = await _context.Users.FirstOrDefaultAsync(x => x.Role == "Admin") ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
                return users;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new User();
            }
        }
        #endregion

        #region Updating Admin Details Repository
        public async Task<User> UpdatingAdminDetails(string id, User user)
        {
            try
            {
                var users = await _context.Users.FirstOrDefaultAsync(x => x.Id == id) ?? throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
                users.Email = user.Email;
                users.PhoneNumber = user.PhoneNumber;
                users.DateOfBirth = user.DateOfBirth;
                users.Gender = user.Gender;
                users.Address = user.Address;
                users.EducationLevel = user.EducationLevel;
                users.Location = user.Location;
                await _context.SaveChangesAsync();
                return users;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new User();
            }
        }

        #endregion
    }
}