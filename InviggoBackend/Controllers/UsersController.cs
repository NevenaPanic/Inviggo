using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InviggoBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        public static List<string> users = new List<string> { "Milan", "Nevena" };
        public UsersController() { }

        [HttpGet]
        public IActionResult GetUsers()
        {
            return Ok(users);
        }
    }
}
