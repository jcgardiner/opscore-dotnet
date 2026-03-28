namespace server.DTOs
{
    public class PersonnelDto
    {
        public int PersonnelId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string FullName => $"{FirstName} {LastName}";
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string Clearance { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; }
        public int SiteId { get; set; }
        public string SiteName { get; set; } = string.Empty;
    }

    public class CreatePersonnelDto
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string Clearance { get; set; } = "None";
        public string Status { get; set; } = "Active";
        public int SiteId { get; set; }
    }

    public class UpdatePersonnelDto
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string Clearance { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public int SiteId { get; set; }
    }
}