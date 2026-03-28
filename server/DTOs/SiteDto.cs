namespace server.DTOs
{
    public class SiteDto
    {
        public int SiteId { get; set; }
        public string SiteName { get; set; } = string.Empty;
        public string SectorType { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; }
    }

    public class CreateSiteDto
    {
        public string SiteName { get; set; } = string.Empty;
        public string SectorType { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Status { get; set; } = "Active";
    }

    public class UpdateSiteDto
    {
        public string SiteName { get; set; } = string.Empty;
        public string SectorType { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
    }
}