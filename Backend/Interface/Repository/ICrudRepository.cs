using SkillAssessment.Model.CoreModel;

namespace SkillAssessment.Interface.Repository
{
    public interface ICrudRepository<T, K>
    {
        Task<T?> Add(T item);
        Task<T?> Update(T item);
        Task<T?> Delete(K item);
        Task<T?> GetValue(K item);
        Task<List<T>?> GetAll();
        Task<User?> Get(string email);
    }
}
