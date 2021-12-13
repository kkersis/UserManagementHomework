using Microsoft.EntityFrameworkCore;

namespace UserManagementHomework.Data
{
    public partial class UserManagementDbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public UserManagementDbContext(DbContextOptions<UserManagementDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<User> Users { get; set; }
    }
}
