using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.DTOs;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PersonnelController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PersonnelController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/personnel
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PersonnelDto>>> GetPersonnel()
        {
            var personnel = await _context.Personnel
                .Include(p => p.Site)
                .Select(p => new PersonnelDto
                {
                    PersonnelId = p.PersonnelId,
                    FirstName = p.FirstName,
                    LastName = p.LastName,
                    Email = p.Email,
                    Role = p.Role,
                    Clearance = p.Clearance,
                    Status = p.Status,
                    CreatedDate = p.CreatedDate,
                    SiteId = p.SiteId,
                    SiteName = p.Site.SiteName
                })
                .ToListAsync();

            return Ok(personnel);
        }

        // GET: api/personnel/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PersonnelDto>> GetPersonnelById(int id)
        {
            var person = await _context.Personnel
                .Include(p => p.Site)
                .Where(p => p.PersonnelId == id)
                .Select(p => new PersonnelDto
                {
                    PersonnelId = p.PersonnelId,
                    FirstName = p.FirstName,
                    LastName = p.LastName,
                    Email = p.Email,
                    Role = p.Role,
                    Clearance = p.Clearance,
                    Status = p.Status,
                    CreatedDate = p.CreatedDate,
                    SiteId = p.SiteId,
                    SiteName = p.Site.SiteName
                })
                .FirstOrDefaultAsync();

            if (person == null)
                return NotFound();

            return Ok(person);
        }

        // GET: api/personnel/5/details
        [HttpGet("{id}/details")]
        public async Task<ActionResult> GetPersonnelDetails(int id)
        {
            var person = await _context.Personnel
                .Include(p => p.Site)
                .Where(p => p.PersonnelId == id)
                .Select(p => new PersonnelDto
                {
                    PersonnelId = p.PersonnelId,
                    FirstName = p.FirstName,
                    LastName = p.LastName,
                    Email = p.Email,
                    Role = p.Role,
                    Clearance = p.Clearance,
                    Status = p.Status,
                    CreatedDate = p.CreatedDate,
                    SiteId = p.SiteId,
                    SiteName = p.Site.SiteName
                })
                .FirstOrDefaultAsync();

            if (person == null)
                return NotFound();

            var assignedAssets = await _context.Assets
                .Where(a => a.AssignedPersonnelId == id)
                .Include(a => a.Site)
                .Select(a => new AssetDto
                {
                    AssetId = a.AssetId,
                    AssetName = a.AssetName,
                    AssetType = a.AssetType,
                    SerialNumber = a.SerialNumber,
                    Status = a.Status,
                    LastInspectedDate = a.LastInspectedDate,
                    CreatedDate = a.CreatedDate,
                    SiteId = a.SiteId,
                    SiteName = a.Site.SiteName,
                    AssignedPersonnelId = a.AssignedPersonnelId,
                    AssignedPersonnelName = $"{person.FirstName} {person.LastName}"
                })
                .ToListAsync();

            var inspections = await _context.Inspections
                .Where(i => i.InspectorId == id)
                .Include(i => i.Asset)
                .Select(i => new InspectionDto
                {
                    InspectionId = i.InspectionId,
                    ScheduledDate = i.ScheduledDate,
                    CompletedDate = i.CompletedDate,
                    Status = i.Status,
                    Notes = i.Notes,
                    ComplianceStandard = i.ComplianceStandard,
                    CreatedDate = i.CreatedDate,
                    AssetId = i.AssetId,
                    AssetName = i.Asset.AssetName,
                    InspectorId = i.InspectorId,
                    InspectorName = $"{person.FirstName} {person.LastName}"
                })
                .ToListAsync();

            var workOrders = await _context.WorkOrders
                .Where(w => w.AssignedToId == id)
                .Include(w => w.Asset)
                .Select(w => new WorkOrderDto
                {
                    WorkOrderId = w.WorkOrderId,
                    Title = w.Title,
                    Description = w.Description,
                    Priority = w.Priority,
                    Status = w.Status,
                    CreatedDate = w.CreatedDate,
                    DueDate = w.DueDate,
                    AssetId = w.AssetId,
                    AssetName = w.Asset.AssetName,
                    AssignedToId = w.AssignedToId,
                    AssignedToName = $"{person.FirstName} {person.LastName}"
                })
                .ToListAsync();

            return Ok(new { person, assignedAssets, inspections, workOrders });
        }
        
        // POST: api/personnel
        [HttpPost]
        public async Task<ActionResult<PersonnelDto>> CreatePersonnel(CreatePersonnelDto dto)
        {
            var siteExists = await _context.Sites.AnyAsync(s => s.SiteId == dto.SiteId);
            if (!siteExists)
                return BadRequest("Invalid SiteId — site does not exist.");

            var person = new Personnel
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                Role = dto.Role,
                Clearance = dto.Clearance,
                Status = dto.Status,
                SiteId = dto.SiteId,
                CreatedDate = DateTime.UtcNow
            };

            _context.Personnel.Add(person);
            await _context.SaveChangesAsync();

            await _context.Entry(person).Reference(p => p.Site).LoadAsync();

            var result = new PersonnelDto
            {
                PersonnelId = person.PersonnelId,
                FirstName = person.FirstName,
                LastName = person.LastName,
                Email = person.Email,
                Role = person.Role,
                Clearance = person.Clearance,
                Status = person.Status,
                CreatedDate = person.CreatedDate,
                SiteId = person.SiteId,
                SiteName = person.Site.SiteName
            };

            return CreatedAtAction(nameof(GetPersonnelById), new { id = person.PersonnelId }, result);
        }

        // PUT: api/personnel/5
        [HttpPut("{id}")]
        public async Task<ActionResult<PersonnelDto>> UpdatePersonnel(int id, UpdatePersonnelDto dto)
        {
            var person = await _context.Personnel
                .Include(p => p.Site)
                .FirstOrDefaultAsync(p => p.PersonnelId == id);

            if (person == null)
                return NotFound();

            var siteExists = await _context.Sites.AnyAsync(s => s.SiteId == dto.SiteId);
            if (!siteExists)
                return BadRequest("Invalid SiteId — site does not exist.");

            person.FirstName = dto.FirstName;
            person.LastName = dto.LastName;
            person.Email = dto.Email;
            person.Role = dto.Role;
            person.Clearance = dto.Clearance;
            person.Status = dto.Status;
            person.SiteId = dto.SiteId;

            await _context.SaveChangesAsync();

            await _context.Entry(person).Reference(p => p.Site).LoadAsync();

            var result = new PersonnelDto
            {
                PersonnelId = person.PersonnelId,
                FirstName = person.FirstName,
                LastName = person.LastName,
                Email = person.Email,
                Role = person.Role,
                Clearance = person.Clearance,
                Status = person.Status,
                CreatedDate = person.CreatedDate,
                SiteId = person.SiteId,
                SiteName = person.Site.SiteName
            };

            return Ok(result);
        }

        // DELETE: api/personnel/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePersonnel(int id)
        {
            var person = await _context.Personnel.FindAsync(id);

            if (person == null)
                return NotFound();

            _context.Personnel.Remove(person);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}