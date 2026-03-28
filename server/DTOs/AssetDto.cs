namespace server.DTOs
{
    public class AssetDto
    {
        public int AssetId { get; set; }
        public string AssetName { get; set; } = string.Empty;
        public string AssetType { get; set; } = string.Empty;
        public string SerialNumber { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public DateTime? LastInspectedDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public int SiteId { get; set; }
        public string SiteName { get; set; } = string.Empty;
        public int? AssignedPersonnelId { get; set; }
        public string AssignedPersonnelName { get; set; } = string.Empty;
    }

    public class CreateAssetDto
    {
        public string AssetName { get; set; } = string.Empty;
        public string AssetType { get; set; } = string.Empty;
        public string SerialNumber { get; set; } = string.Empty;
        public string Status { get; set; } = "Operational";
        public int SiteId { get; set; }
        public int? AssignedPersonnelId { get; set; }
    }

    public class UpdateAssetDto
    {
        public string AssetName { get; set; } = string.Empty;
        public string AssetType { get; set; } = string.Empty;
        public string SerialNumber { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public int SiteId { get; set; }
        public int? AssignedPersonnelId { get; set; }
    }
}