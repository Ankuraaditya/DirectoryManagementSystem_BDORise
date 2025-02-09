using DirectoryManagementSystem.Models;
using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
    public DbSet<Business> Businesses { get; set; }
    public DbSet<Category> Categories { get; set; }
}
