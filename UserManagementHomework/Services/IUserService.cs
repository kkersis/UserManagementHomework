using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;
using UserManagementHomework.Data;

namespace UserManagementHomework.Services
{
    public interface IUserService
    {
        Task<int> Delete(int id);
        Task<IEnumerable<User>> FindAll();
        Task<User> FindById(int id);
        Task<int> Insert(User user);
        Task<int> Update(User user);
        Task<int> InsertFromFile(IFormFile file);
    }
}