using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SkillAssessment.Interface.Repository;
using SkillAssessment.Interface.Service;
using SkillAssessment.Model.CoreModel;
using SkillAssessment.Model.DTO;
using SkillAssessment.Repository.AddQuestionRepository;
using SkillAssessment.Repository.AssessmentDataRepository;
using SkillAssessment.Repository.AssessmentHistoryRepository;
using SkillAssessment.Repository.AuthRepository;
using SkillAssessment.Repository.AvailableAssessmentSideBar;
using SkillAssessment.Repository.DepartmentRepository;
using SkillAssessment.Repository.EmployeeManagementRepository;
using SkillAssessment.Repository.EmployeesTestDetailsHistory;
using SkillAssessment.Repository.FilterTestHistoryRepository;
using SkillAssessment.Repository.PostAssessmentRepository;
using SkillAssessment.Repository.PostEmailRespository;
using SkillAssessment.Repository.QuestionBankRepository;
using SkillAssessment.Repository.QuestionTypeRepository;
using SkillAssessment.Repository.RandomQuestionRepository;
using SkillAssessment.Repository.RequestReceivedRepository;
using SkillAssessment.Repository.RequestUserDetailsRepository;
using SkillAssessment.Repository.SelectedItemsByUser;
using SkillAssessment.Repository.Services.AuthService;
using SkillAssessment.Repository.SkillRepository;
using SkillAssessment.Repository.StoredProcedureRepository;
using SkillAssessment.Repository.TestHistoryRepository;
using SkillAssessment.Repository.TopicRepository;
using SkillAssessment.Repository.UserAssessmentRepository;
using SkillAssessment.Repository.UserRepository;
using SkillAssessment.Repository.UserRequestRepository;
using SkillAssessment.Repository.ViewEmployeeProfilesRepository;
using SkillAssessment.Service.AddQuestionService;
using SkillAssessment.Service.AllottedAssessmentService;
using SkillAssessment.Service.DepartmentService;
using SkillAssessment.Service.EmployeeManagementService;
using SkillAssessment.Service.EmployeesTestResultServices;
using SkillAssessment.Service.QuestionBankService;
using SkillAssessment.Service.SkillService;
using SkillAssessment.Service.TopicService;
using SkillAssessment.Service.ViewProfileDetailsService;
using SkillAssessment.Services.AssessmentDataServices;
using SkillAssessment.Services.HistoryTableService;
using SkillAssessment.Services.UserService;
using System.Text;
#nullable disable

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<SkillAssessment.Data.SkillAssessmentDbContext>(optionsAction: options => options.UseSqlServer(builder.Configuration.GetConnectionString(name: "AdminSkill")));
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ITopicRepository, TopicRepository>();
builder.Services.AddScoped<IDepartmentRepository, DepartmentRepository>();
builder.Services.AddScoped<ISkillRepository, SkillRepository>();
builder.Services.AddScoped<ITopicService, TopicService>();
builder.Services.AddScoped<IDepartmentService, DepartmentService>();
builder.Services.AddScoped<ISkillService, SkillService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IEmployeeManagementService, EmployeeManagementService>();
builder.Services.AddScoped<IEmployeeManagementRepository, EmployeeManagementRepository>();
builder.Services.AddScoped<IAssessmentHistoryRepository, AssessmentHistoryRepository>();
builder.Services.AddScoped<IUserAssessmentRepository, UserAssessmentRepository>();
builder.Services.AddScoped<IAllottedAssessmentService, AllottedAssessmentService>();
builder.Services.AddScoped<IQuestionTypeRepository, QuestionTypeRepository>();
builder.Services.AddScoped<IHistoryTableService, HistoryTableService>();
builder.Services.AddScoped<IStoredProcedureRepository, StoredProcedureRepository>();
builder.Services.AddScoped<IAddQuestionRepository, AddQuestionRepository>();
builder.Services.AddScoped<IAddQuestionService, AddQuestionService>();
builder.Services.AddScoped<IAssessmentDataRepository, AssessmentDataRepository>();
builder.Services.AddScoped<IAvailableAssessmentSideBar, AvailableAssessmentSideBarRepository>();
builder.Services.AddScoped<ISelectedItemsByUser, SelectedItemsByUserRepository>();
builder.Services.AddScoped<IAssessmentDataServices, AssessmentDataServices>();
builder.Services.AddScoped<IAssessmentHistoryRepository, AssessmentHistoryRepository>();
builder.Services.AddScoped<IUserAssessmentRepository, UserAssessmentRepository>();
builder.Services.AddScoped<IQuestionTypeRepository, QuestionTypeRepository>();
builder.Services.AddScoped<IHistoryTableService, HistoryTableService>();
builder.Services.AddScoped<IStoredProcedureRepository, StoredProcedureRepository>();
builder.Services.AddScoped<IAddQuestionRepository, AddQuestionRepository>();
builder.Services.AddScoped<IAddQuestionService, AddQuestionService>();
builder.Services.AddScoped<ITestHistoryService, TestHistoryService>();
builder.Services.AddScoped<IRequestReceivedService, RequestReceivedService>();
builder.Services.AddScoped<IUserRequestRepository, UserRequestRepository>();
builder.Services.AddScoped<IRequestUserDetailsService, RequestUserDetailsService>();
builder.Services.AddScoped<IRandomQuestionRepository, RandomQuestionRepository>();
builder.Services.AddScoped<IPostAssessmentService, PostAssessmentService>();
builder.Services.AddScoped<IFilterTestHistoryRepository, FilterTestHitoryRepository>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<ITokenGenerate, TokenGenerate>();
builder.Services.AddScoped<ICrudRepository<User, UserDTO>, CrudRepository>();
builder.Services.AddScoped<IQuestionBankRepository, QuestionBankRepository>();
builder.Services.AddScoped<IQuestionBankService, QuestionBankService>();
builder.Services.AddScoped<IViewProfileDetailsRepository, ViewEmployeeProfileRepository>();
builder.Services.AddScoped<IViewProfileEmployee, EmployeeProfileDetailsServices>();
builder.Services.AddScoped<IEmployeeTestHistoryRepository, EmployeeTestHistoryRepository>();
builder.Services.AddScoped<IEmployeeTestHistory, EmployeeTestHistoryService>();
builder.Services.AddScoped<IPostEmailRepository, PostEmailRepository>();


#region CORS Configuration
builder.Services.AddCors(option =>
{
    option.AddPolicy("CorsPolicy", builder =>
    {
        builder.AllowAnyHeader();
        builder.AllowAnyMethod();
        builder.AllowAnyOrigin();
    });
});
#endregion
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
               .AddJwtBearer(options =>
               {
                   options.TokenValidationParameters = new TokenValidationParameters
                   {
                       ValidateIssuerSigningKey = true,
                       IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["TokenKey"])),
                       ValidateIssuer = false,
                       ValidateAudience = false
                   };
               });


builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "JWT Authorization header using the Bearer scheme."
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
                 {
                     {
                           new OpenApiSecurityScheme
                           {
                                Reference = new OpenApiReference
                                {
                                    Type = ReferenceType.SecurityScheme,
                                    Id = "Bearer"
                                }
                           },
                           new string[] {}

                     }
     });
});
var app = builder.Build();
#region Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
#endregion
app.UseCors("CorsPolicy");
app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.UseStaticFiles();

app.MapControllers();

app.Run();
