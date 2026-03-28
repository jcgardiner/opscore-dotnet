using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.DTOs;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SitesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SitesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/sites
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SiteDto>>> GetSites()
        {
            var sites = await _context.Sites
                .Select(s => new SiteDto
                {
                    SiteId = s.SiteId,
                    SiteName = s.SiteName,
                    SectorType = s.SectorType,
                    Location = s.Location,
                    Status = s.Status,
                    CreatedDate = s.CreatedDate
                })
                .ToListAsync();

            return Ok(sites);
        }

        // GET: api/sites/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SiteDto>> GetSite(int id)
        {
            var site = await _context.Sites
                .Where(s => s.SiteId == id)
                .Select(s => new SiteDto
                {
                    SiteId = s.SiteId,
                    SiteName = s.SiteName,
                    SectorType = s.SectorType,
                    Location = s.Location,
                    Status = s.Status,
                    CreatedDate = s.CreatedDate
                })
                .FirstOrDefaultAsync();

            if (site == null)
                return NotFound();

            return Ok(site);
        }

        // POST: api/sites
        [HttpPost]
        public async Task<ActionResult<SiteDto>> CreateSite(CreateSiteDto dto)
        {
            var site = new Site
            {
                SiteName = dto.SiteName,
                SectorType = dto.SectorType,
                Location = dto.Location,
                Status = dto.Status,
                CreatedDate = DateTime.UtcNow
            };

            _context.Sites.Add(site);
            await _context.SaveChangesAsync();

            var result = new SiteDto
            {
                SiteId = site.SiteId,
                SiteName = site.SiteName,
                SectorType = site.SectorType,
                Location = site.Location,
                Status = site.Status,
                CreatedDate = site.CreatedDate
            };

            return CreatedAtAction(nameof(GetSite), new { id = site.SiteId }, result);
        }

        // PUT: api/sites/5
        [HttpPut("{id}")]
        public async Task<ActionResult<SiteDto>> UpdateSite(int id, UpdateSiteDto dto)
        {
            var site = await _context.Sites.FindAsync(id);

            if (site == null)
                return NotFound();

            site.SiteName = dto.SiteName;
            site.SectorType = dto.SectorType;
            site.Location = dto.Location;
            site.Status = dto.Status;

            await _context.SaveChangesAsync();

            var result = new SiteDto
            {
                SiteId = site.SiteId,
                SiteName = site.SiteName,
                SectorType = site.SectorType,
                Location = site.Location,
                Status = site.Status,
                CreatedDate = site.CreatedDate
            };

            return Ok(result);
        }

        // DELETE: api/sites/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSite(int id)
        {
            var site = await _context.Sites.FindAsync(id);

            if (site == null)
                return NotFound();

            _context.Sites.Remove(site);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}