using Microsoft.AspNetCore.Mvc;
using SkillAssessment.Model.View_Model;

namespace SkillAssessment.Interface.Service
{
    public interface IAllottedAssessmentService
    {
        Task<List<AllottedTestDTO>> GetAllottedTest(string UserId);
    }
}
