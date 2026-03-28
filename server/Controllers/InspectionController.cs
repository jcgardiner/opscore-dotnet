using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.DTOs;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InspectionsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public InspectionsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/inspections
        [HttpGet]
        public async Task<ActionResult<IEnumerable<InspectionDto>>> GetInspections()
        {
            var inspections = await _context.Inspections
                .Include(i => i.Asset)
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
                    AssetName = i.Asset.AssetName,
                    InspectorId = i.InspectorId,
                    InspectorName = $"{i.Inspector.FirstName} {i.Inspector.LastName}"
                })
                .ToListAsync();

            return Ok(inspections);
        }

        // GET: api/inspections/5
        [HttpGet("{id}")]
        public async Task<ActionResult<InspectionDto>> GetInspection(int id)
        {
            var inspection = await _context.Inspections
                .Include(i => i.Asset)
                .Include(i => i.Inspector)
                .Where(i => i.InspectionId == id)
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
                    InspectorName = $"{i.Inspector.FirstName} {i.Inspector.LastName}"
                })
                .FirstOrDefaultAsync();

            if (inspection == null)
                return NotFound();

            return Ok(inspection);
        }

        // POST: api/inspections
        [HttpPost]
        public async Task<ActionResult<InspectionDto>> CreateInspection(CreateInspectionDto dto)
        {
            var assetExists = await _context.Assets.AnyAsync(a => a.AssetId == dto.AssetId);
            if (!assetExists)
                return BadRequest("Invalid AssetId — asset does not exist.");

            var inspectorExists = await _context.Personnel.AnyAsync(p => p.PersonnelId == dto.InspectorId);
            if (!inspectorExists)
                return BadRequest("Invalid InspectorId — personnel does not exist.");

            var inspection = new Inspection
            {
                ScheduledDate = dto.ScheduledDate,
                Status = dto.Status,
                Notes = dto.Notes,
                ComplianceStandard = dto.ComplianceStandard,
                AssetId = dto.AssetId,
                InspectorId = dto.InspectorId,
                CreatedDate = DateTime.UtcNow
            };

            _context.Inspections.Add(inspection);
            await _context.SaveChangesAsync();

            await _context.Entry(inspection).Reference(i => i.Asset).LoadAsync();
            await _context.Entry(inspection).Reference(i => i.Inspector).LoadAsync();

            var result = new InspectionDto
            {
                InspectionId = inspection.InspectionId,
                ScheduledDate = inspection.ScheduledDate,
                CompletedDate = inspection.CompletedDate,
                Status = inspection.Status,
                Notes = inspection.Notes,
                ComplianceStandard = inspection.ComplianceStandard,
                CreatedDate = inspection.CreatedDate,
                AssetId = inspection.AssetId,
                AssetName = inspection.Asset.AssetName,
                InspectorId = inspection.InspectorId,
                InspectorName = $"{inspection.Inspector.FirstName} {inspection.Inspector.LastName}"
            };

            return CreatedAtAction(nameof(GetInspection), new { id = inspection.InspectionId }, result);
        }

        // PUT: api/inspections/5
        [HttpPut("{id}")]
        public async Task<ActionResult<InspectionDto>> UpdateInspection(int id, UpdateInspectionDto dto)
        {
            var inspection = await _context.Inspections
                .Include(i => i.Asset)
                .Include(i => i.Inspector)
                .FirstOrDefaultAsync(i => i.InspectionId == id);

            if (inspection == null)
                return NotFound();

            var assetExists = await _context.Assets.AnyAsync(a => a.AssetId == dto.AssetId);
            if (!assetExists)
                return BadRequest("Invalid AssetId — asset does not exist.");

            var inspectorExists = await _context.Personnel.AnyAsync(p => p.PersonnelId == dto.InspectorId);
            if (!inspectorExists)
                return BadRequest("Invalid InspectorId — personnel does not exist.");

            inspection.ScheduledDate = dto.ScheduledDate;
            inspection.CompletedDate = dto.CompletedDate;
            inspection.Status = dto.Status;
            inspection.Notes = dto.Notes;
            inspection.ComplianceStandard = dto.ComplianceStandard;
            inspection.AssetId = dto.AssetId;
            inspection.InspectorId = dto.InspectorId;

            await _context.SaveChangesAsync();

            await _context.Entry(inspection).Reference(i => i.Asset).LoadAsync();
            await _context.Entry(inspection).Reference(i => i.Inspector).LoadAsync();

            var result = new InspectionDto
            {
                InspectionId = inspection.InspectionId,
                ScheduledDate = inspection.ScheduledDate,
                CompletedDate = inspection.CompletedDate,
                Status = inspection.Status,
                Notes = inspection.Notes,
                ComplianceStandard = inspection.ComplianceStandard,
                CreatedDate = inspection.CreatedDate,
                AssetId = inspection.AssetId,
                AssetName = inspection.Asset.AssetName,
                InspectorId = inspection.InspectorId,
                InspectorName = $"{inspection.Inspector.FirstName} {inspection.Inspector.LastName}"
            };

            return Ok(result);
        }

        // DELETE: api/inspections/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInspection(int id)
        {
            var inspection = await _context.Inspections.FindAsync(id);

            if (inspection == null)
                return NotFound();

            _context.Inspections.Remove(inspection);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}