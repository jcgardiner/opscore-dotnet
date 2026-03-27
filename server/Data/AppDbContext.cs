using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // Each DbSet maps to a table in SQL Server
        public DbSet<Site> Sites { get; set; }
        public DbSet<Asset> Assets { get; set; }
        public DbSet<Personnel> Personnel { get; set; }
        public DbSet<Inspection> Inspections { get; set; }
        public DbSet<WorkOrder> WorkOrders { get; set; }
        public DbSet<Incident> Incidents { get; set; }
        public DbSet<Document> Documents { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Fix cascade delete conflicts
            modelBuilder.Entity<Incident>()
                .HasOne(i => i.Site)
                .WithMany(s => s.Incidents)
                .HasForeignKey(i => i.SiteId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Incident>()
                .HasOne(i => i.ReportedBy)
                .WithMany(p => p.Incidents)
                .HasForeignKey(i => i.ReportedById)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Inspection>()
                .HasOne(i => i.Inspector)
                .WithMany(p => p.Inspections)
                .HasForeignKey(i => i.InspectorId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<WorkOrder>()
                .HasOne(w => w.AssignedTo)
                .WithMany(p => p.WorkOrders)
                .HasForeignKey(w => w.AssignedToId)
                .OnDelete(DeleteBehavior.Restrict);

            // Default value configurations
            modelBuilder.Entity<Site>()
                .Property(s => s.Status)
                .HasDefaultValue("Active");

            modelBuilder.Entity<Asset>()
                .Property(a => a.Status)
                .HasDefaultValue("Operational");

            modelBuilder.Entity<Personnel>()
                .Property(p => p.Clearance)
                .HasDefaultValue("None");

            modelBuilder.Entity<WorkOrder>()
                .Property(w => w.Priority)
                .HasDefaultValue("Medium");

            modelBuilder.Entity<WorkOrder>()
                .Property(w => w.Status)
                .HasDefaultValue("Open");

            modelBuilder.Entity<Incident>()
                .Property(i => i.Severity)
                .HasDefaultValue("Low");

            modelBuilder.Entity<Incident>()
                .Property(i => i.Status)
                .HasDefaultValue("Open");

            modelBuilder.Entity<Inspection>()
                .Property(i => i.Status)
                .HasDefaultValue("Scheduled");
        }
    }
}