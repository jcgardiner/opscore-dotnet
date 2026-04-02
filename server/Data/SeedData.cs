using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data
{
    public static class SeedData
    {
        public static async Task InitializeAsync(AppDbContext context)
        {
            // Only seed if database is empty
            if (await context.Sites.AnyAsync()) return;

            // =====================
            // Sites
            // =====================
            var sites = new List<Site>
            {
                new Site { SiteName = "Permian Basin Field Station", SectorType = "OilGas", Location = "Midland, TX", Status = "Active", CreatedDate = DateTime.UtcNow },
                new Site { SiteName = "Eagle Ford Processing Plant", SectorType = "OilGas", Location = "San Antonio, TX", Status = "Active", CreatedDate = DateTime.UtcNow },
                new Site { SiteName = "Fort Bliss Operations Center", SectorType = "DoD", Location = "El Paso, TX", Status = "Active", CreatedDate = DateTime.UtcNow },
                new Site { SiteName = "Camp Pendleton Logistics Base", SectorType = "DoD", Location = "Oceanside, CA", Status = "Active", CreatedDate = DateTime.UtcNow },
                new Site { SiteName = "Harris County Maintenance Depot", SectorType = "Government", Location = "Houston, TX", Status = "Active", CreatedDate = DateTime.UtcNow },
                new Site { SiteName = "Travis County Public Works", SectorType = "Government", Location = "Austin, TX", Status = "Active", CreatedDate = DateTime.UtcNow },
                new Site { SiteName = "Bakken Shale Extraction Site", SectorType = "OilGas", Location = "Williston, ND", Status = "Active", CreatedDate = DateTime.UtcNow },
                new Site { SiteName = "Aberdeen Proving Ground", SectorType = "DoD", Location = "Aberdeen, MD", Status = "Inactive", CreatedDate = DateTime.UtcNow }
            };

            await context.Sites.AddRangeAsync(sites);
            await context.SaveChangesAsync();

            // =====================
            // Personnel
            // =====================
            var personnel = new List<Personnel>
            {
                new Personnel { FirstName = "James", LastName = "Hawkins", Email = "j.hawkins@opscore.com", Role = "Supervisor", Clearance = "Secret", Status = "Active", SiteId = sites[0].SiteId, CreatedDate = DateTime.UtcNow },
                new Personnel { FirstName = "Maria", LastName = "Delgado", Email = "m.delgado@opscore.com", Role = "Inspector", Clearance = "Confidential", Status = "Active", SiteId = sites[0].SiteId, CreatedDate = DateTime.UtcNow },
                new Personnel { FirstName = "Tyrone", LastName = "Washington", Email = "t.washington@opscore.com", Role = "Technician", Clearance = "None", Status = "Active", SiteId = sites[1].SiteId, CreatedDate = DateTime.UtcNow },
                new Personnel { FirstName = "Sarah", LastName = "Mitchell", Email = "s.mitchell@opscore.com", Role = "Supervisor", Clearance = "TopSecret", Status = "Active", SiteId = sites[2].SiteId, CreatedDate = DateTime.UtcNow },
                new Personnel { FirstName = "Derek", LastName = "Nguyen", Email = "d.nguyen@opscore.com", Role = "Inspector", Clearance = "Secret", Status = "Active", SiteId = sites[2].SiteId, CreatedDate = DateTime.UtcNow },
                new Personnel { FirstName = "Karen", LastName = "Brooks", Email = "k.brooks@opscore.com", Role = "Technician", Clearance = "None", Status = "Active", SiteId = sites[3].SiteId, CreatedDate = DateTime.UtcNow },
                new Personnel { FirstName = "Luis", LastName = "Ramirez", Email = "l.ramirez@opscore.com", Role = "Supervisor", Clearance = "Confidential", Status = "Active", SiteId = sites[4].SiteId, CreatedDate = DateTime.UtcNow },
                new Personnel { FirstName = "Angela", LastName = "Foster", Email = "a.foster@opscore.com", Role = "Technician", Clearance = "None", Status = "Active", SiteId = sites[4].SiteId, CreatedDate = DateTime.UtcNow },
                new Personnel { FirstName = "Marcus", LastName = "Coleman", Email = "m.coleman@opscore.com", Role = "Inspector", Clearance = "Confidential", Status = "Active", SiteId = sites[5].SiteId, CreatedDate = DateTime.UtcNow },
                new Personnel { FirstName = "Jennifer", LastName = "Park", Email = "j.park@opscore.com", Role = "Supervisor", Clearance = "Secret", Status = "Active", SiteId = sites[6].SiteId, CreatedDate = DateTime.UtcNow }
            };

            await context.Personnel.AddRangeAsync(personnel);
            await context.SaveChangesAsync();

            // =====================
            // Assets
            // =====================
            var assets = new List<Asset>
            {
                new Asset { AssetName = "Pump Jack Unit 7", AssetType = "Equipment", SerialNumber = "PJ-2024-007", Status = "Operational", SiteId = sites[0].SiteId, AssignedPersonnelId = personnel[0].PersonnelId, CreatedDate = DateTime.UtcNow },
                new Asset { AssetName = "Pump Jack Unit 12", AssetType = "Equipment", SerialNumber = "PJ-2024-012", Status = "Maintenance", SiteId = sites[0].SiteId, AssignedPersonnelId = personnel[1].PersonnelId, CreatedDate = DateTime.UtcNow },
                new Asset { AssetName = "Pipeline Compressor Alpha", AssetType = "Equipment", SerialNumber = "PC-2023-001", Status = "Operational", SiteId = sites[1].SiteId, AssignedPersonnelId = personnel[2].PersonnelId, CreatedDate = DateTime.UtcNow },
                new Asset { AssetName = "Storage Tank T-14", AssetType = "Facility", SerialNumber = "ST-2022-014", Status = "Operational", SiteId = sites[1].SiteId, CreatedDate = DateTime.UtcNow },
                new Asset { AssetName = "HMMWV Unit 4412", AssetType = "Vehicle", SerialNumber = "HMV-4412", Status = "Operational", SiteId = sites[2].SiteId, AssignedPersonnelId = personnel[3].PersonnelId, CreatedDate = DateTime.UtcNow },
                new Asset { AssetName = "Generator Set GEN-07", AssetType = "Equipment", SerialNumber = "GEN-2023-007", Status = "Operational", SiteId = sites[2].SiteId, AssignedPersonnelId = personnel[4].PersonnelId, CreatedDate = DateTime.UtcNow },
                new Asset { AssetName = "Tactical Vehicle TV-221", AssetType = "Vehicle", SerialNumber = "TV-221", Status = "Maintenance", SiteId = sites[3].SiteId, AssignedPersonnelId = personnel[5].PersonnelId, CreatedDate = DateTime.UtcNow },
                new Asset { AssetName = "Road Grader RG-05", AssetType = "Vehicle", SerialNumber = "RG-2021-005", Status = "Operational", SiteId = sites[4].SiteId, AssignedPersonnelId = personnel[6].PersonnelId, CreatedDate = DateTime.UtcNow },
                new Asset { AssetName = "Water Treatment Unit WTU-3", AssetType = "Equipment", SerialNumber = "WTU-2022-003", Status = "Operational", SiteId = sites[4].SiteId, AssignedPersonnelId = personnel[7].PersonnelId, CreatedDate = DateTime.UtcNow },
                new Asset { AssetName = "Excavator EX-18", AssetType = "Vehicle", SerialNumber = "EX-2023-018", Status = "Decommissioned", SiteId = sites[5].SiteId, AssignedPersonnelId = personnel[8].PersonnelId, CreatedDate = DateTime.UtcNow },
                new Asset { AssetName = "Drilling Rig DR-44", AssetType = "Equipment", SerialNumber = "DR-2024-044", Status = "Operational", SiteId = sites[6].SiteId, AssignedPersonnelId = personnel[9].PersonnelId, CreatedDate = DateTime.UtcNow },
                new Asset { AssetName = "Separator Unit SEP-09", AssetType = "Equipment", SerialNumber = "SEP-2023-009", Status = "Operational", SiteId = sites[6].SiteId, CreatedDate = DateTime.UtcNow }
            };

            await context.Assets.AddRangeAsync(assets);
            await context.SaveChangesAsync();

            // =====================
            // Inspections
            // =====================
            var inspections = new List<Inspection>
            {
                new Inspection { AssetId = assets[0].AssetId, InspectorId = personnel[1].PersonnelId, ScheduledDate = DateTime.UtcNow.AddDays(18), Status = "Scheduled", Notes = "Annual OSHA compliance inspection", ComplianceStandard = "OSHA", CreatedDate = DateTime.UtcNow },
                new Inspection { AssetId = assets[1].AssetId, InspectorId = personnel[1].PersonnelId, ScheduledDate = DateTime.UtcNow.AddDays(-5), CompletedDate = DateTime.UtcNow.AddDays(-3), Status = "Failed", Notes = "Hydraulic pressure below threshold", ComplianceStandard = "OSHA", CreatedDate = DateTime.UtcNow },
                new Inspection { AssetId = assets[2].AssetId, InspectorId = personnel[2].PersonnelId, ScheduledDate = DateTime.UtcNow.AddDays(10), Status = "Scheduled", Notes = "Quarterly pressure test", ComplianceStandard = "EPA", CreatedDate = DateTime.UtcNow },
                new Inspection { AssetId = assets[4].AssetId, InspectorId = personnel[4].PersonnelId, ScheduledDate = DateTime.UtcNow.AddDays(-10), CompletedDate = DateTime.UtcNow.AddDays(-8), Status = "Passed", Notes = "All systems nominal", ComplianceStandard = "DoD", CreatedDate = DateTime.UtcNow },
                new Inspection { AssetId = assets[5].AssetId, InspectorId = personnel[4].PersonnelId, ScheduledDate = DateTime.UtcNow.AddDays(5), Status = "Scheduled", Notes = "Routine generator inspection", ComplianceStandard = "DoD", CreatedDate = DateTime.UtcNow },
                new Inspection { AssetId = assets[7].AssetId, InspectorId = personnel[8].PersonnelId, ScheduledDate = DateTime.UtcNow.AddDays(-2), Status = "InProgress", Notes = "Annual safety inspection", ComplianceStandard = "OSHA", CreatedDate = DateTime.UtcNow },
                new Inspection { AssetId = assets[10].AssetId, InspectorId = personnel[9].PersonnelId, ScheduledDate = DateTime.UtcNow.AddDays(30), Status = "Scheduled", Notes = "New equipment baseline inspection", ComplianceStandard = "EPA", CreatedDate = DateTime.UtcNow }
            };

            await context.Inspections.AddRangeAsync(inspections);
            await context.SaveChangesAsync();

            // =====================
            // Work Orders
            // =====================
            var workOrders = new List<WorkOrder>
            {
                new WorkOrder { Title = "Replace hydraulic seals", Description = "Hydraulic seals on Pump Jack Unit 7 showing wear", Priority = "High", Status = "Open", AssetId = assets[0].AssetId, AssignedToId = personnel[0].PersonnelId, DueDate = DateTime.UtcNow.AddDays(13), CreatedDate = DateTime.UtcNow },
                new WorkOrder { Title = "Emergency pump repair", Description = "Pump Jack Unit 12 offline due to hydraulic failure", Priority = "Critical", Status = "InProgress", AssetId = assets[1].AssetId, AssignedToId = personnel[1].PersonnelId, DueDate = DateTime.UtcNow.AddDays(2), CreatedDate = DateTime.UtcNow },
                new WorkOrder { Title = "Compressor filter replacement", Description = "Scheduled filter maintenance on Pipeline Compressor Alpha", Priority = "Medium", Status = "Open", AssetId = assets[2].AssetId, AssignedToId = personnel[2].PersonnelId, DueDate = DateTime.UtcNow.AddDays(7), CreatedDate = DateTime.UtcNow },
                new WorkOrder { Title = "Vehicle brake inspection", Description = "Tactical Vehicle TV-221 brake pads need replacement", Priority = "High", Status = "Open", AssetId = assets[6].AssetId, AssignedToId = personnel[5].PersonnelId, DueDate = DateTime.UtcNow.AddDays(5), CreatedDate = DateTime.UtcNow },
                new WorkOrder { Title = "Generator oil change", Description = "Scheduled oil change for Generator Set GEN-07", Priority = "Low", Status = "Completed", AssetId = assets[5].AssetId, AssignedToId = personnel[4].PersonnelId, DueDate = DateTime.UtcNow.AddDays(-3), CreatedDate = DateTime.UtcNow.AddDays(-10) },
                new WorkOrder { Title = "Water treatment calibration", Description = "Recalibrate sensors on Water Treatment Unit WTU-3", Priority = "Medium", Status = "Open", AssetId = assets[8].AssetId, AssignedToId = personnel[7].PersonnelId, DueDate = DateTime.UtcNow.AddDays(14), CreatedDate = DateTime.UtcNow },
                new WorkOrder { Title = "Drilling rig safety check", Description = "Pre-operation safety inspection for Drilling Rig DR-44", Priority = "High", Status = "Open", AssetId = assets[10].AssetId, AssignedToId = personnel[9].PersonnelId, DueDate = DateTime.UtcNow.AddDays(3), CreatedDate = DateTime.UtcNow }
            };

            await context.WorkOrders.AddRangeAsync(workOrders);
            await context.SaveChangesAsync();

            // =====================
            // Incidents
            // =====================
            var incidents = new List<Incident>
            {
                new Incident { Title = "Minor oil leak detected", Description = "Small oil leak found at base of Pump Jack Unit 7", Severity = "Medium", Status = "Open", OccurredDate = DateTime.UtcNow.AddDays(-3), SiteId = sites[0].SiteId, ReportedById = personnel[0].PersonnelId, CreatedDate = DateTime.UtcNow.AddDays(-3) },
                new Incident { Title = "Hydraulic system failure", Description = "Complete hydraulic failure on Pump Jack Unit 12 during operation", Severity = "High", Status = "UnderReview", OccurredDate = DateTime.UtcNow.AddDays(-5), SiteId = sites[0].SiteId, ReportedById = personnel[1].PersonnelId, CreatedDate = DateTime.UtcNow.AddDays(-5) },
                new Incident { Title = "Perimeter breach alert", Description = "Unauthorized vehicle detected near north perimeter", Severity = "Critical", Status = "Resolved", OccurredDate = DateTime.UtcNow.AddDays(-14), ResolvedDate = DateTime.UtcNow.AddDays(-12), SiteId = sites[2].SiteId, ReportedById = personnel[3].PersonnelId, CreatedDate = DateTime.UtcNow.AddDays(-14) },
                new Incident { Title = "Equipment malfunction during exercise", Description = "Generator failure caused temporary power loss during training exercise", Severity = "Medium", Status = "Resolved", OccurredDate = DateTime.UtcNow.AddDays(-8), ResolvedDate = DateTime.UtcNow.AddDays(-7), SiteId = sites[2].SiteId, ReportedById = personnel[4].PersonnelId, CreatedDate = DateTime.UtcNow.AddDays(-8) },
                new Incident { Title = "Road grader collision", Description = "Road grader made contact with utility pole during operation", Severity = "High", Status = "UnderReview", OccurredDate = DateTime.UtcNow.AddDays(-2), SiteId = sites[4].SiteId, ReportedById = personnel[6].PersonnelId, CreatedDate = DateTime.UtcNow.AddDays(-2) },
                new Incident { Title = "Chemical spill containment", Description = "Minor chemical spill contained at water treatment facility", Severity = "Medium", Status = "Resolved", OccurredDate = DateTime.UtcNow.AddDays(-20), ResolvedDate = DateTime.UtcNow.AddDays(-19), SiteId = sites[4].SiteId, ReportedById = personnel[7].PersonnelId, CreatedDate = DateTime.UtcNow.AddDays(-20) },
                new Incident { Title = "Gas pressure anomaly", Description = "Abnormal pressure readings on separator unit during night shift", Severity = "High", Status = "Open", OccurredDate = DateTime.UtcNow.AddDays(-1), SiteId = sites[6].SiteId, ReportedById = personnel[9].PersonnelId, CreatedDate = DateTime.UtcNow.AddDays(-1) }
            };

            await context.Incidents.AddRangeAsync(incidents);
            await context.SaveChangesAsync();
        }
    }
}