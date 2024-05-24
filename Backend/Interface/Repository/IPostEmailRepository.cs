using SkillAssessment.Model.CoreModel;

namespace SkillAssessment.Interface.Repository
{
    public interface IPostEmailRepository
    {
        Task<List<EmailHistory>> PostEmailRepo(EmailHistory emailHistory);
    }
}
