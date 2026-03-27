namespace server.Models
{
    public class Personnel
    {
        public int PersonnelId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty; // Technician, Supervisor, Inspector
        public string Clearance { get; set; } = "None"; // None, Confidential, Secret, TopSecret
        public string Status { get; set; } = "Active";
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

        // Foreign key
        public int SiteId { get; set; }
        public Site Site { get; set; } = null!;

        // Navigation properties
        public ICollection<Inspection> Inspections { get; set; } = new List<Inspection>();
        public ICollection<WorkOrder> WorkOrders { get; set; } = new List<WorkOrder>();
        public ICollection<Incident> Incidents { get; set; } = new List<Incident>();
    }
}