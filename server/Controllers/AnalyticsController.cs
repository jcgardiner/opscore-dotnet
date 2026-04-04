using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AnalyticsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AnalyticsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/analytics/overview
        [HttpGet("overview")]
        public async Task<ActionResult> GetOverview()
        {
            // Asset status breakdown
            var assetStatus = await _context.Assets
                .GroupBy(a => a.Status)
                .Select(g => new { status = g.Key, count = g.Count() })
                .ToListAsync();

            // Incidents by severity
            var incidentsBySeverity = await _context.Incidents
                .GroupBy(i => i.Severity)
                .Select(g => new { severity = g.Key, count = g.Count() })
                .ToListAsync();

            // Incidents by status
            var incidentsByStatus = await _context.Incidents
                .GroupBy(i => i.Status)
                .Select(g => new { status = g.Key, count = g.Count() })
                .ToListAsync();

            // Work orders by priority
            var workOrdersByPriority = await _context.WorkOrders
                .GroupBy(w => w.Priority)
                .Select(g => new { priority = g.Key, count = g.Count() })
                .ToListAsync();

            // Work orders by status
            var workOrdersByStatus = await _context.WorkOrders
                .GroupBy(w => w.Status)
                .Select(g => new { status = g.Key, count = g.Count() })
                .ToListAsync();

            // Inspections by status
            var inspectionsByStatus = await _context.Inspections
                .GroupBy(i => i.Status)
                .Select(g => new { status = g.Key, count = g.Count() })
                .ToListAsync();

            // Inspections by compliance standard
            var inspectionsByStandard = await _context.Inspections
                .GroupBy(i => i.ComplianceStandard)
                .Select(g => new { standard = g.Key, count = g.Count() })
                .ToListAsync();

            // Assets per site
            var assetsPerSite = await _context.Assets
                .Include(a => a.Site)
                .GroupBy(a => a.Site.SiteName)
                .Select(g => new { site = g.Key, count = g.Count() })
                .ToListAsync();

            // Incidents per site
            var incidentsPerSite = await _context.Incidents
                .Include(i => i.Site)
                .GroupBy(i => i.Site.SiteName)
                .Select(g => new { site = g.Key, count = g.Count() })
                .ToListAsync();

            return Ok(new
            {
                assetStatus,
                incidentsBySeverity,
                incidentsByStatus,
                workOrdersByPriority,
                workOrdersByStatus,
                inspectionsByStatus,
                inspectionsByStandard,
                assetsPerSite,
                incidentsPerSite
            });
        }
    }
}