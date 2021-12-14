using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserManagementHomework.Data;
using UserManagementHomework.Services;

namespace UserManagementHomework.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<IEnumerable<User>> Get()
        {
            return await _userService.FindAll();
        }

        [HttpGet("{id}", Name = "FindById")]
        public async Task<ActionResult<User>> Get(int id)
        {
            var result = await _userService.FindById(id);
            if (result != default)
                return Ok(result);
            else
                return NotFound();
        }

        [HttpPost]
        public async Task<ActionResult<User>> Insert(User dto)
        {
            if (dto.Id != null)
                return BadRequest("Id cannot be set for insert action.");

            var id = await _userService.Insert(dto);
            if (id != default)
                return CreatedAtRoute("FindById", new { Id = id }, dto);
            else
                return BadRequest();
        }

        [HttpPost]
        [Route("InsertFromFile")]
        public async Task<ActionResult> InsertFromFile(IFormFile users)
        {
            if(users == null) return BadRequest("Corrupted file or file was empty");
            var result = await _userService.InsertFromFile(users);
            if (result > 0)
                return NoContent();
            else
                return BadRequest("Corrupted file or file was empty");
        }

        [HttpPut]
        public async Task<ActionResult<User>> Update(User dto)
        {
            if (dto.Id == null)
                return BadRequest("Id should be set for update action.");

            var result = await _userService.Update(dto);
            if (result > 0)
                return CreatedAtRoute("FindById", new { dto.Id }, dto);
            else
                return NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var result = await _userService.Delete(id);
            if (result > 0)
                return NoContent();
            else
                return NotFound();
        }
    }
}