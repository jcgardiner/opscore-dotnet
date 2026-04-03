using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.DTOs;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IncidentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public IncidentsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/incidents
        [HttpGet]
        public async Task<ActionResult<IEnumerable<IncidentDto>>> GetIncidents()
        {
            var incidents = await _context.Incidents
                .Include(i => i.Site)
                .Include(i => i.ReportedBy)
                .Select(i => new IncidentDto
                {
                    IncidentId = i.IncidentId,
                    Title = i.Title,
                    Description = i.Description,
                    Severity = i.Severity,
                    Status = i.Status,
                    OccurredDate = i.OccurredDate,
                    ResolvedDate = i.ResolvedDate,
                    CreatedDate = i.CreatedDate,
                    SiteId = i.SiteId,
                    SiteName = i.Site.SiteName,
                    ReportedById = i.ReportedById,
                    ReportedByName = $"{i.ReportedBy.FirstName} {i.ReportedBy.LastName}"
                })
                .ToListAsync();

            return Ok(incidents);
        }

        // GET: api/incidents/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IncidentDto>> GetIncident(int id)
        {
            var incident = await _context.Incidents
                .Include(i => i.Site)
                .Include(i => i.ReportedBy)
                .Where(i => i.IncidentId == id)
                .Select(i => new IncidentDto
                {
                    IncidentId = i.IncidentId,
                    Title = i.Title,
                    Description = i.Description,
                    Severity = i.Severity,
                    Status = i.Status,
                    OccurredDate = i.OccurredDate,
                    ResolvedDate = i.ResolvedDate,
                    CreatedDate = i.CreatedDate,
                    SiteId = i.SiteId,
                    SiteName = i.Site.SiteName,
                    ReportedById = i.ReportedById,
                    ReportedByName = $"{i.ReportedBy.FirstName} {i.ReportedBy.LastName}"
                })
                .FirstOrDefaultAsync();

            if (incident == null)
                return NotFound();

            return Ok(incident);
        }

        // GET: api/incidents/5/details
        [HttpGet("{id}/details")]
        public async Task<ActionResult> GetIncidentDetails(int id)
        {
            var incident = await _context.Incidents
                .Include(i => i.Site)
                .Include(i => i.ReportedBy)
                .Where(i => i.IncidentId == id)
                .Select(i => new IncidentDto
                {
                    IncidentId = i.IncidentId,
                    Title = i.Title,
                    Description = i.Description,
                    Severity = i.Severity,
                    Status = i.Status,
                    OccurredDate = i.OccurredDate,
                    ResolvedDate = i.ResolvedDate,
                    CreatedDate = i.CreatedDate,
                    SiteId = i.SiteId,
                    SiteName = i.Site.SiteName,
                    ReportedById = i.ReportedById,
                    ReportedByName = $"{i.ReportedBy.FirstName} {i.ReportedBy.LastName}"
                })
                .FirstOrDefaultAsync();

            if (incident == null)
                return NotFound();

            return Ok(new { incident });
        }

        // POST: api/incidents
        [HttpPost]
        public async Task<ActionResult<IncidentDto>> CreateIncident(CreateIncidentDto dto)
        {
            var siteExists = await _context.Sites.AnyAsync(s => s.SiteId == dto.SiteId);
            if (!siteExists)
                return BadRequest("Invalid SiteId — site does not exist.");

            var personnelExists = await _context.Personnel.AnyAsync(p => p.PersonnelId == dto.ReportedById);
            if (!personnelExists)
                return BadRequest("Invalid ReportedById — personnel does not exist.");

            var incident = new Incident
            {
                Title = dto.Title,
                Description = dto.Description,
                Severity = dto.Severity,
                Status = dto.Status,
                OccurredDate = dto.OccurredDate,
                SiteId = dto.SiteId,
                ReportedById = dto.ReportedById,
                CreatedDate = DateTime.UtcNow
            };

            _context.Incidents.Add(incident);
            await _context.SaveChangesAsync();

            await _context.Entry(incident).Reference(i => i.Site).LoadAsync();
            await _context.Entry(incident).Reference(i => i.ReportedBy).LoadAsync();

            var result = new IncidentDto
            {
                IncidentId = incident.IncidentId,
                Title = incident.Title,
                Description = incident.Description,
                Severity = incident.Severity,
                Status = incident.Status,
                OccurredDate = incident.OccurredDate,
                ResolvedDate = incident.ResolvedDate,
                CreatedDate = incident.CreatedDate,
                SiteId = incident.SiteId,
                SiteName = incident.Site.SiteName,
                ReportedById = incident.ReportedById,
                ReportedByName = $"{incident.ReportedBy.FirstName} {incident.ReportedBy.LastName}"
            };

            return CreatedAtAction(nameof(GetIncident), new { id = incident.IncidentId }, result);
        }

        // PUT: api/incidents/5
        [HttpPut("{id}")]
        public async Task<ActionResult<IncidentDto>> UpdateIncident(int id, UpdateIncidentDto dto)
        {
            var incident = await _context.Incidents
                .Include(i => i.Site)
                .Include(i => i.ReportedBy)
                .FirstOrDefaultAsync(i => i.IncidentId == id);

            if (incident == null)
                return NotFound();

            var siteExists = await _context.Sites.AnyAsync(s => s.SiteId == dto.SiteId);
            if (!siteExists)
                return BadRequest("Invalid SiteId — site does not exist.");

            var personnelExists = await _context.Personnel.AnyAsync(p => p.PersonnelId == dto.ReportedById);
            if (!personnelExists)
                return BadRequest("Invalid ReportedById — personnel does not exist.");

            incident.Title = dto.Title;
            incident.Description = dto.Description;
            incident.Severity = dto.Severity;
            incident.Status = dto.Status;
            incident.OccurredDate = dto.OccurredDate;
            incident.ResolvedDate = dto.ResolvedDate;
            incident.SiteId = dto.SiteId;
            incident.ReportedById = dto.ReportedById;

            await _context.SaveChangesAsync();

            await _context.Entry(incident).Reference(i => i.Site).LoadAsync();
            await _context.Entry(incident).Reference(i => i.ReportedBy).LoadAsync();

            var result = new IncidentDto
            {
                IncidentId = incident.IncidentId,
                Title = incident.Title,
                Description = incident.Description,
                Severity = incident.Severity,
                Status = incident.Status,
                OccurredDate = incident.OccurredDate,
                ResolvedDate = incident.ResolvedDate,
                CreatedDate = incident.CreatedDate,
                SiteId = incident.SiteId,
                SiteName = incident.Site.SiteName,
                ReportedById = incident.ReportedById,
                ReportedByName = $"{incident.ReportedBy.FirstName} {incident.ReportedBy.LastName}"
            };

            return Ok(result);
        }

        // DELETE: api/incidents/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIncident(int id)
        {
            var incident = await _context.Incidents.FindAsync(id);

            if (incident == null)
                return NotFound();

            _context.Incidents.Remove(incident);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}