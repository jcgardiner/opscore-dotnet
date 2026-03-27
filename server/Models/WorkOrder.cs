namespace server.Models
{
    public class WorkOrder
    {
        public int WorkOrderId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Priority { get; set; } = "Medium"; // Low, Medium, High, Critical
        public string Status { get; set; } = "Open"; // Open, InProgress, Completed, Cancelled
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public DateTime? DueDate { get; set; }

        // Foreign keys
        public int AssetId { get; set; }
        public Asset Asset { get; set; } = null!;

        public int AssignedToId { get; set; }
        public Personnel AssignedTo { get; set; } = null!;

        // Navigation properties
        public ICollection<Document> Documents { get; set; } = new List<Document>();
    }
}