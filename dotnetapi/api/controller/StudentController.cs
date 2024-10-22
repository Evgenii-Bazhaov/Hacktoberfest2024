using Microsoft.AspNetCore.Mvc;

namespace api.controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController: ControllerBase

    {
        [HttpGet]
        public string GetStudentName()
        {
            return "student name 1";
        }
    }
}
