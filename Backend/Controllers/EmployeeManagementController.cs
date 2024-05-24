using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkillAssessment.Interface.Service;
using SkillAssessment.Model.ViewModel;
using System.Diagnostics.CodeAnalysis;

namespace SkillAssessment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ExcludeFromCodeCoverage]
    [Authorize(Roles = "Admin")]
    public class EmployeeManagementController : ControllerBase
    {
        private readonly IEmployeeManagementService _employeeManagementService;
        private readonly ILogger<EmployeeManagementController> _logger;
        public EmployeeManagementController(IEmployeeManagementService employeeManagementService, ILogger<EmployeeManagementController> logger)
        {
            _employeeManagementService = employeeManagementService;
            _logger = logger;
        }
        [HttpGet("GetAllEmployees")]
        public async Task<ActionResult<List<ManageEmployeeDTO>>> GetEmployeeDetails()
        {
            _logger.LogInformation("Executing Getting All Employees Details");
            var obj = await _employeeManagementService.GetEmployeeDetails();
            _logger.LogInformation("Getting employees returned: {obj}", obj);
            return Ok(obj);
        }
        [HttpGet("OverAllBestPerformers")]
        public async Task<ActionResult<List<ManageEmployeeDTO>>> BestPerformersDetails()
        {
            _logger.LogInformation("Executing Getting  OverAll Best Performers Details");
            var obj = await _employeeManagementService.BestPerformersDetails();
            _logger.LogInformation("Getting Overall BestPerformers returned: {obj}", obj);
            return Ok(obj);
        }
        [HttpGet("FilterEmployeeBasedOnDepartment")]
        public async Task<ActionResult<List<ManageEmployeeDTO>>> FilterEmployeeBasedOnDepartment(string DepartmentName)
        {
            _logger.LogInformation("Executing Getting  Filter Employee BasedOn Department Details");
            var obj = await _employeeManagementService.FilterEmployeeBasedOnDepartment(DepartmentName);
            _logger.LogInformation("Getting filtered employee based on department returned: {obj}", obj);
            return Ok(obj);
        }
        [HttpGet("BestPerformersInDepartment")]
        public async Task<ActionResult<List<ManageEmployeeDTO>>> BestPerformersInDepartment(string DepartmentName)
        {
            _logger.LogInformation("Executing Getting Best Performer In Department Details");
            var obj = await _employeeManagementService.BestPerformersInDepartment(DepartmentName);
            _logger.LogInformation("Getting best performers in department returned: {obj}", obj);
            return Ok(obj);
        }
        [HttpGet("ReportingManagerOfDepartment")]
        public async Task<ActionResult<List<ManageEmployeeDTO>>> GetReportingManager(string DepartmentName)
        {
            _logger.LogInformation("Executing Getting Reporting Manager Of Department Details");
            var obj = await _employeeManagementService.GetReportingManager(DepartmentName);
            _logger.LogInformation("Getting reporting manager of department returned: {obj}", obj);
            return Ok(obj);
        }
    }
}
