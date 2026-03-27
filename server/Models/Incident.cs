namespace server.Models
{
    public class Incident
    {
        public int IncidentId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Severity { get; set; } = "Low"; // Low, Medium, High, Critical
        public string Status { get; set; } = "Open"; // Open, UnderReview, Resolved, Closed
        public DateTime OccurredDate { get; set; }
        public DateTime? ResolvedDate { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

        // Foreign keys
        public int SiteId { get; set; }
        public Site Site { get; set; } = null!;

        public int ReportedById { get; set; }
        public Personnel ReportedBy { get; set; } = null!;

        // Navigation properties
        public ICollection<Document> Documents { get; set; } = new List<Document>();
    }
}