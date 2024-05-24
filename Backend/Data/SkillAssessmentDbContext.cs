using Microsoft.EntityFrameworkCore;
using SkillAssessment.Model.CoreModel;
using SkillAssessment.Model.View_Model;
using SkillAssessment.Model.ViewModel;

namespace SkillAssessment.Data
{
    public class SkillAssessmentDbContext : DbContext
    {
        public SkillAssessmentDbContext(DbContextOptions<SkillAssessmentDbContext> options) : base(options) { }

        public DbSet<UserRequest> UserRequests { get; set; }
        public DbSet<AssessmentHistory> AssessmentHistorys { get; set; }
        public DbSet<UserAssessment> UserAssessments { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Assessment> Assessments { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Topic> Topics { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<AddQuestion> AddQuestions { get; set; }
        public DbSet<EmailHistory> EmailHistory { get; set; }
        public DbSet<QuestionPage> QuestionPages { get; set; }
        public DbSet<QuestionType> QuestionTypes { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ManageEmployeeDTO>().HasNoKey();
            modelBuilder.Entity<HistoryDTO>().HasNoKey();
            modelBuilder.Entity<TestHistoryDTO>().HasNoKey();
            modelBuilder.Entity<RequestDTO>().HasNoKey();
            modelBuilder.Entity<RequestUserDTO>().HasNoKey();
            modelBuilder.Entity<AccessoriesDTO>().HasNoKey();
            modelBuilder.Entity<EmployeesTestHistoryDTO>().HasNoKey();
            modelBuilder.Entity<EmployeeProfileDetailsViewDTO>().HasNoKey();
            modelBuilder.Entity<AllottedTestDTO>().HasNoKey();
            base.OnModelCreating(modelBuilder);
        }
    }
}
