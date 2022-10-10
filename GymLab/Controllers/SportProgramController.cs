using Microsoft.AspNetCore.Mvc;

namespace GymLab.Controllers
{
    [ApiController]
    [Route("api/categories/{categoryName}/SportPrograms")]
    public class SportProgramController : ControllerBase
    {
        public void GetMany()
        {

        }
        [HttpGet]
        [Route("{programId}")]
        public void GetOne(string categoryName, int programId)
        {

        }

        public void Create()
        {

        }

        public void Update()
        {

        }

        public void Delete()
        {

        }
    }

}
