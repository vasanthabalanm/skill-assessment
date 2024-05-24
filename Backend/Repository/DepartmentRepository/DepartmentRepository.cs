using Microsoft.EntityFrameworkCore;
using SkillAssessment.Data;
using SkillAssessment.GlobalException;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Model.CoreModel;
using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Repository.DepartmentRepository
{
    [ExcludeFromCodeCoverage]
    public class DepartmentRepository : IDepartmentRepository
    {
        #region Properties
        private readonly SkillAssessmentDbContext _context;
        #endregion
        #region Constructor
        /// <summary>
        /// Parameterized Constructor
        /// </summary>
        /// <param name="context"></param>
        public DepartmentRepository(SkillAssessmentDbContext context)
        {
            _context = context;
        }
        #endregion
        #region GetAll Departments Repository
        /// <summary>
        /// Retrieves all the departments.
        /// </summary>
        /// <returns>returns all the departments , if the department count is zero, it throws Custom Exception message</returns>
        public async Task<List<Department>> GetDepartments()
        {
            try
            {
                var department = await _context.Departments.ToListAsync();
                if (department.Count == 0)
                {
                    throw new Exception(CustomException.ExceptionMessages["CantEmpty"]);
                }
                return department;
            }
            catch (Exception ex)
            {

                Console.WriteLine(ex.Message);
                return new List<Department>();
            }
        }
        #endregion
    }
}
