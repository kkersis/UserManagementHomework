using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using UserManagementHomework.Data;

namespace UserManagementHomework.Services
{
    public sealed class UserService : IUserService
    {
        private readonly UserManagementDbContext _dbContext;

        public UserService(UserManagementDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<int> Delete(int id)
        {
            try
            {
                _dbContext.Users.Remove(
                    new User
                    {
                        Id = id
                    }
                );

                return await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return 0;
            }
        }

        public async Task<IEnumerable<User>> FindAll()
        {
            return await _dbContext.Users.ToListAsync();
        }

        public async Task<User> FindById(int id)
        {
            return await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<int> Insert(User user)
        {
            string hashedPassword = HashService.HashPassword(user.PasswordHash);
            user.PasswordHash = hashedPassword;
            _dbContext.Add(user);
            return await _dbContext.SaveChangesAsync();
        }

        public async Task<int> InsertFromFile(IFormFile file)
        {
            string fileContents;
            using (var reader = new StreamReader(file.OpenReadStream()))
            {
                fileContents = await reader.ReadToEndAsync();
            }
            var users = JsonConvert.DeserializeObject<IEnumerable<User>>(fileContents);
            foreach(var user in users)
                user.PasswordHash = HashService.HashPassword(user.PasswordHash);
           
            _dbContext.AddRange(users);
            return await _dbContext.SaveChangesAsync();
        }

        public async Task<int> Update(User user)
        {
            try
            {
                _dbContext.Update(user);
                return await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return 0;
            }
        }
    }
}
