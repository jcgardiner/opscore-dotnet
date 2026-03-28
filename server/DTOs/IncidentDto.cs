namespace server.DTOs
{
    public class IncidentDto
    {
        public int IncidentId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Severity { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public DateTime OccurredDate { get; set; }
        public DateTime? ResolvedDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public int SiteId { get; set; }
        public string SiteName { get; set; } = string.Empty;
        public int ReportedById { get; set; }
        public string ReportedByName { get; set; } = string.Empty;
    }

    public class CreateIncidentDto
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Severity { get; set; } = "Low";
        public string Status { get; set; } = "Open";
        public DateTime OccurredDate { get; set; }
        public int SiteId { get; set; }
        public int ReportedById { get; set; }
    }

    public class UpdateIncidentDto
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Severity { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public DateTime OccurredDate { get; set; }
        public DateTime? ResolvedDate { get; set; }
        public int SiteId { get; set; }
        public int ReportedById { get; set; }
    }
}