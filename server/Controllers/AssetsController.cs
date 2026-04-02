using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.DTOs;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AssetsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AssetsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/assets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AssetDto>>> GetAssets()
        {
            var assets = await _context.Assets
                .Include(a => a.Site)
                .Include(a => a.AssignedPersonnel)
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
                    AssignedPersonnelName = a.AssignedPersonnel != null
                        ? $"{a.AssignedPersonnel.FirstName} {a.AssignedPersonnel.LastName}"
                        : string.Empty
                })
                .ToListAsync();

            return Ok(assets);
        }

        // GET: api/assets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AssetDto>> GetAsset(int id)
        {
            var asset = await _context.Assets
                .Include(a => a.Site)
                .Include(a => a.AssignedPersonnel)
                .Where(a => a.AssetId == id)
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
                    AssignedPersonnelName = a.AssignedPersonnel != null
                        ? $"{a.AssignedPersonnel.FirstName} {a.AssignedPersonnel.LastName}"
                        : string.Empty
                })
                .FirstOrDefaultAsync();

            if (asset == null)
                return NotFound();

            return Ok(asset);
        }

        // GET: api/assets/5/details
        [HttpGet("{id}/details")]
        public async Task<ActionResult> GetAssetDetails(int id)
        {
            var asset = await _context.Assets
                .Include(a => a.Site)
                .Include(a => a.AssignedPersonnel)
                .Where(a => a.AssetId == id)
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
                    AssignedPersonnelName = a.AssignedPersonnel != null
                        ? $"{a.AssignedPersonnel.FirstName} {a.AssignedPersonnel.LastName}"
                        : string.Empty
                })
                .FirstOrDefaultAsync();

            if (asset == null)
                return NotFound();

            var inspections = await _context.Inspections
                .Where(i => i.AssetId == id)
                .Include(i => i.Inspector)
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
                    AssetName = asset.AssetName,
                    InspectorId = i.InspectorId,
                    InspectorName = $"{i.Inspector.FirstName} {i.Inspector.LastName}"
                })
                .ToListAsync();

            var workOrders = await _context.WorkOrders
                .Where(w => w.AssetId == id)
                .Include(w => w.AssignedTo)
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
                    AssetName = asset.AssetName,
                    AssignedToId = w.AssignedToId,
                    AssignedToName = $"{w.AssignedTo.FirstName} {w.AssignedTo.LastName}"
                })
                .ToListAsync();

            return Ok(new { asset, inspections, workOrders });
        }

        // POST: api/assets
        [HttpPost]
        public async Task<ActionResult<AssetDto>> CreateAsset(CreateAssetDto dto)
        {
            var siteExists = await _context.Sites.AnyAsync(s => s.SiteId == dto.SiteId);
            if (!siteExists)
                return BadRequest("Invalid SiteId — site does not exist.");

            if (dto.AssignedPersonnelId.HasValue)
            {
                var personnelExists = await _context.Personnel
                    .AnyAsync(p => p.PersonnelId == dto.AssignedPersonnelId.Value);
                if (!personnelExists)
                    return BadRequest("Invalid AssignedPersonnelId — personnel does not exist.");
            }

            var asset = new Asset
            {
                AssetName = dto.AssetName,
                AssetType = dto.AssetType,
                SerialNumber = dto.SerialNumber,
                Status = dto.Status,
                SiteId = dto.SiteId,
                AssignedPersonnelId = dto.AssignedPersonnelId,
                CreatedDate = DateTime.UtcNow
            };

            _context.Assets.Add(asset);
            await _context.SaveChangesAsync();

            await _context.Entry(asset).Reference(a => a.Site).LoadAsync();
            if (asset.AssignedPersonnelId.HasValue)
                await _context.Entry(asset).Reference(a => a.AssignedPersonnel).LoadAsync();

            var result = new AssetDto
            {
                AssetId = asset.AssetId,
                AssetName = asset.AssetName,
                AssetType = asset.AssetType,
                SerialNumber = asset.SerialNumber,
                Status = asset.Status,
                LastInspectedDate = asset.LastInspectedDate,
                CreatedDate = asset.CreatedDate,
                SiteId = asset.SiteId,
                SiteName = asset.Site.SiteName,
                AssignedPersonnelId = asset.AssignedPersonnelId,
                AssignedPersonnelName = asset.AssignedPersonnel != null
                    ? $"{asset.AssignedPersonnel.FirstName} {asset.AssignedPersonnel.LastName}"
                    : string.Empty
            };

            return CreatedAtAction(nameof(GetAsset), new { id = asset.AssetId }, result);
        }

        // PUT: api/assets/5
        [HttpPut("{id}")]
        public async Task<ActionResult<AssetDto>> UpdateAsset(int id, UpdateAssetDto dto)
        {
            var asset = await _context.Assets
                .Include(a => a.Site)
                .Include(a => a.AssignedPersonnel)
                .FirstOrDefaultAsync(a => a.AssetId == id);

            if (asset == null)
                return NotFound();

            var siteExists = await _context.Sites.AnyAsync(s => s.SiteId == dto.SiteId);
            if (!siteExists)
                return BadRequest("Invalid SiteId — site does not exist.");

            if (dto.AssignedPersonnelId.HasValue)
            {
                var personnelExists = await _context.Personnel
                    .AnyAsync(p => p.PersonnelId == dto.AssignedPersonnelId.Value);
                if (!personnelExists)
                    return BadRequest("Invalid AssignedPersonnelId — personnel does not exist.");
            }

            asset.AssetName = dto.AssetName;
            asset.AssetType = dto.AssetType;
            asset.SerialNumber = dto.SerialNumber;
            asset.Status = dto.Status;
            asset.SiteId = dto.SiteId;
            asset.AssignedPersonnelId = dto.AssignedPersonnelId;

            await _context.SaveChangesAsync();

            await _context.Entry(asset).Reference(a => a.Site).LoadAsync();
            if (asset.AssignedPersonnelId.HasValue)
                await _context.Entry(asset).Reference(a => a.AssignedPersonnel).LoadAsync();

            var result = new AssetDto
            {
                AssetId = asset.AssetId,
                AssetName = asset.AssetName,
                AssetType = asset.AssetType,
                SerialNumber = asset.SerialNumber,
                Status = asset.Status,
                LastInspectedDate = asset.LastInspectedDate,
                CreatedDate = asset.CreatedDate,
                SiteId = asset.SiteId,
                SiteName = asset.Site.SiteName,
                AssignedPersonnelId = asset.AssignedPersonnelId,
                AssignedPersonnelName = asset.AssignedPersonnel != null
                    ? $"{asset.AssignedPersonnel.FirstName} {asset.AssignedPersonnel.LastName}"
                    : string.Empty
            };

            return Ok(result);
        }

        // DELETE: api/assets/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsset(int id)
        {
            var asset = await _context.Assets.FindAsync(id);

            if (asset == null)
                return NotFound();

            _context.Assets.Remove(asset);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}