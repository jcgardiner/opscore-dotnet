namespace server.Models
{
    public class Document
    {
        public int DocumentId { get; set; }
        public string DocumentName { get; set; } = string.Empty;
        public string FilePath { get; set; } = string.Empty;
        public string RelatedEntityType { get; set; } = string.Empty; // Asset, Inspection, WorkOrder, Incident
        public int RelatedEntityId { get; set; }
        public DateTime UploadedDate { get; set; } = DateTime.UtcNow;

        // Foreign keys
        public int? InspectionId { get; set; }
        public Inspection? Inspection { get; set; }

        public int? WorkOrderId { get; set; }
        public WorkOrder? WorkOrder { get; set; }

        public int? IncidentId { get; set; }
        public Incident? Incident { get; set; }
    }
}