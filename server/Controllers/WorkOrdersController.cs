using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.DTOs;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WorkOrdersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public WorkOrdersController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/workorders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkOrderDto>>> GetWorkOrders()
        {
            var workOrders = await _context.WorkOrders
                .Include(w => w.Asset)
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
                    AssetName = w.Asset.AssetName,
                    AssignedToId = w.AssignedToId,
                    AssignedToName = $"{w.AssignedTo.FirstName} {w.AssignedTo.LastName}"
                })
                .ToListAsync();

            return Ok(workOrders);
        }

        // GET: api/workorders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WorkOrderDto>> GetWorkOrder(int id)
        {
            var workOrder = await _context.WorkOrders
                .Include(w => w.Asset)
                .Include(w => w.AssignedTo)
                .Where(w => w.WorkOrderId == id)
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
                    AssignedToName = $"{w.AssignedTo.FirstName} {w.AssignedTo.LastName}"
                })
                .FirstOrDefaultAsync();

            if (workOrder == null)
                return NotFound();

            return Ok(workOrder);
        }

        // POST: api/workorders
        [HttpPost]
        public async Task<ActionResult<WorkOrderDto>> CreateWorkOrder(CreateWorkOrderDto dto)
        {
            var assetExists = await _context.Assets.AnyAsync(a => a.AssetId == dto.AssetId);
            if (!assetExists)
                return BadRequest("Invalid AssetId — asset does not exist.");

            var personnelExists = await _context.Personnel.AnyAsync(p => p.PersonnelId == dto.AssignedToId);
            if (!personnelExists)
                return BadRequest("Invalid AssignedToId — personnel does not exist.");

            var workOrder = new WorkOrder
            {
                Title = dto.Title,
                Description = dto.Description,
                Priority = dto.Priority,
                Status = dto.Status,
                DueDate = dto.DueDate,
                AssetId = dto.AssetId,
                AssignedToId = dto.AssignedToId,
                CreatedDate = DateTime.UtcNow
            };

            _context.WorkOrders.Add(workOrder);
            await _context.SaveChangesAsync();

            await _context.Entry(workOrder).Reference(w => w.Asset).LoadAsync();
            await _context.Entry(workOrder).Reference(w => w.AssignedTo).LoadAsync();

            var result = new WorkOrderDto
            {
                WorkOrderId = workOrder.WorkOrderId,
                Title = workOrder.Title,
                Description = workOrder.Description,
                Priority = workOrder.Priority,
                Status = workOrder.Status,
                CreatedDate = workOrder.CreatedDate,
                DueDate = workOrder.DueDate,
                AssetId = workOrder.AssetId,
                AssetName = workOrder.Asset.AssetName,
                AssignedToId = workOrder.AssignedToId,
                AssignedToName = $"{workOrder.AssignedTo.FirstName} {workOrder.AssignedTo.LastName}"
            };

            return CreatedAtAction(nameof(GetWorkOrder), new { id = workOrder.WorkOrderId }, result);
        }

        // PUT: api/workorders/5
        [HttpPut("{id}")]
        public async Task<ActionResult<WorkOrderDto>> UpdateWorkOrder(int id, UpdateWorkOrderDto dto)
        {
            var workOrder = await _context.WorkOrders
                .Include(w => w.Asset)
                .Include(w => w.AssignedTo)
                .FirstOrDefaultAsync(w => w.WorkOrderId == id);

            if (workOrder == null)
                return NotFound();

            var assetExists = await _context.Assets.AnyAsync(a => a.AssetId == dto.AssetId);
            if (!assetExists)
                return BadRequest("Invalid AssetId — asset does not exist.");

            var personnelExists = await _context.Personnel.AnyAsync(p => p.PersonnelId == dto.AssignedToId);
            if (!personnelExists)
                return BadRequest("Invalid AssignedToId — personnel does not exist.");

            workOrder.Title = dto.Title;
            workOrder.Description = dto.Description;
            workOrder.Priority = dto.Priority;
            workOrder.Status = dto.Status;
            workOrder.DueDate = dto.DueDate;
            workOrder.AssetId = dto.AssetId;
            workOrder.AssignedToId = dto.AssignedToId;

            await _context.SaveChangesAsync();

            await _context.Entry(workOrder).Reference(w => w.Asset).LoadAsync();
            await _context.Entry(workOrder).Reference(w => w.AssignedTo).LoadAsync();

            var result = new WorkOrderDto
            {
                WorkOrderId = workOrder.WorkOrderId,
                Title = workOrder.Title,
                Description = workOrder.Description,
                Priority = workOrder.Priority,
                Status = workOrder.Status,
                CreatedDate = workOrder.CreatedDate,
                DueDate = workOrder.DueDate,
                AssetId = workOrder.AssetId,
                AssetName = workOrder.Asset.AssetName,
                AssignedToId = workOrder.AssignedToId,
                AssignedToName = $"{workOrder.AssignedTo.FirstName} {workOrder.AssignedTo.LastName}"
            };

            return Ok(result);
        }

        // DELETE: api/workorders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorkOrder(int id)
        {
            var workOrder = await _context.WorkOrders.FindAsync(id);

            if (workOrder == null)
                return NotFound();

            _context.WorkOrders.Remove(workOrder);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}