using SkillAssessment.GlobalException;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Interface.Service;
using SkillAssessment.Model.CoreModel;

namespace SkillAssessment.Service.DepartmentService
{
    public class DepartmentService : IDepartmentService
    {
        #region Properties
        private readonly IDepartmentRepository _repo;
        #endregion
        #region Constructor
        /// <summary>
        /// Parameterized Constructor
        /// </summary>
        /// <param name="repo"></param>
        public DepartmentService(IDepartmentRepository repo)
        {
            _repo = repo;
        }
        #endregion
        #region Get all the departments Service
        /// <summary>
        /// Retrieves all the departments.
        /// </summary>
        /// <returns>returns all the departments , if the department count is zero, it throws Custom Exception message</returns>
        public async Task<List<Department>> GetAllDepartments()
        {
            try
            {
                var department = await _repo.GetDepartments();
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
