namespace server.DTOs
{
    public class InspectionDto
    {
        public int InspectionId { get; set; }
        public DateTime ScheduledDate { get; set; }
        public DateTime? CompletedDate { get; set; }
        public string Status { get; set; } = string.Empty;
        public string Notes { get; set; } = string.Empty;
        public string ComplianceStandard { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; }
        public int AssetId { get; set; }
        public string AssetName { get; set; } = string.Empty;
        public int InspectorId { get; set; }
        public string InspectorName { get; set; } = string.Empty;
    }

    public class CreateInspectionDto
    {
        public DateTime ScheduledDate { get; set; }
        public string Status { get; set; } = "Scheduled";
        public string Notes { get; set; } = string.Empty;
        public string ComplianceStandard { get; set; } = string.Empty;
        public int AssetId { get; set; }
        public int InspectorId { get; set; }
    }

    public class UpdateInspectionDto
    {
        public DateTime ScheduledDate { get; set; }
        public DateTime? CompletedDate { get; set; }
        public string Status { get; set; } = string.Empty;
        public string Notes { get; set; } = string.Empty;
        public string ComplianceStandard { get; set; } = string.Empty;
        public int AssetId { get; set; }
        public int InspectorId { get; set; }
    }
}