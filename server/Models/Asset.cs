namespace server.Models
{
    public class Asset
    {
        public int AssetId { get; set; }
        public string AssetName { get; set; } = string.Empty;
        public string AssetType { get; set; } = string.Empty; // Vehicle, Equipment, Facility
        public string SerialNumber { get; set; } = string.Empty;
        public string Status { get; set; } = "Operational"; // Operational, Maintenance, Decommissioned
        public DateTime? LastInspectedDate { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

        // Foreign keys
        public int SiteId { get; set; }
        public Site Site { get; set; } = null!;

        public int? AssignedPersonnelId { get; set; }
        public Personnel? AssignedPersonnel { get; set; }

        // Navigation properties
        public ICollection<Inspection> Inspections { get; set; } = new List<Inspection>();
        public ICollection<WorkOrder> WorkOrders { get; set; } = new List<WorkOrder>();
    }
}