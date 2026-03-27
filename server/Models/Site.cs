namespace server.Models
{
    public class Site
    {
        public int SiteId { get; set; }
        public string SiteName { get; set; } = string.Empty;
        public string SectorType { get; set; } = string.Empty; // DoD, Government, OilGas
        public string Location { get; set; } = string.Empty;
        public string Status { get; set; } = "Active";
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public ICollection<Asset> Assets { get; set; } = new List<Asset>();
        public ICollection<Personnel> Personnel { get; set; } = new List<Personnel>();
        public ICollection<Incident> Incidents { get; set; } = new List<Incident>();
    }
}