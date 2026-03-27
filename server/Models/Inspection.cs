namespace server.Models
{
    public class Inspection
    {
        public int InspectionId { get; set; }
        public DateTime ScheduledDate { get; set; }
        public DateTime? CompletedDate { get; set; }
        public string Status { get; set; } = "Scheduled"; // Scheduled, InProgress, Passed, Failed
        public string Notes { get; set; } = string.Empty;
        public string ComplianceStandard { get; set; } = string.Empty; // OSHA, DoD, EPA
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

        // Foreign keys
        public int AssetId { get; set; }
        public Asset Asset { get; set; } = null!;

        public int InspectorId { get; set; }
        public Personnel Inspector { get; set; } = null!;

        // Navigation properties
        public ICollection<Document> Documents { get; set; } = new List<Document>();
    }
}