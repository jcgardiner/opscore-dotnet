# OpsCore — Field Operations & Compliance Dashboard

A full-stack web application for managing field operations across Defense, Government, and Oil & Gas sectors. Built as a portfolio project demonstrating enterprise-grade architecture with real-world domain knowledge.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Angular 21 + TypeScript |
| Charts | ApexCharts (ng-apexcharts) |
| Backend | C# / .NET Core 10 Web API |
| ORM | Entity Framework Core 10 |
| Database | SQL Server 2025 Express |
| Auth | JWT Bearer Tokens |
| API Docs | Scalar (OpenAPI) |

## Features

- **Dashboard** — KPI cards with live counts, recent incidents and work orders
- **Sites** — Manage operational sites across DoD, Government, and Oil & Gas sectors
- **Assets** — Track equipment, vehicles, and facilities with status and assignment
- **Personnel** — Manage crew members with clearance levels and site assignments
- **Inspections** — Schedule and track compliance inspections (OSHA, EPA, DoD)
- **Work Orders** — Create and manage maintenance tasks with priority tracking
- **Incidents** — Report and track operational incidents with severity levels
- **Analytics** — Six ApexCharts visualizations including asset status, incidents by severity, work orders by priority, and site-level breakdowns
- **Authentication** — JWT-based login/register with route guards and HTTP interceptor

## Getting Started

### Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org)
- [Angular CLI](https://angular.io/cli) — `npm install -g @angular/cli`
- [SQL Server Express](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)

### Backend Setup

```bash
cd server
dotnet restore
dotnet ef database update
dotnet run
```

The API will start at `http://localhost:5160`. API documentation available at `http://localhost:5160/scalar/v1`.

The database will be seeded automatically with realistic sample data on first run.

### Frontend Setup

```bash
cd client
npm install
ng serve
```

The app will start at `http://localhost:4200`.

### Default Credentials

Register a new account via the login page or use the API directly:

POST http://localhost:5160/api/auth/register
{
"firstName": "Admin",
"lastName": "User",
"email": "admin@opscore.com",
"password": "OpsCore123!"
}

## Project Structure

opscore-dotnet/
├── client/                    # Angular frontend
│   └── src/app/
│       ├── core/              # Models, services, guards, interceptors
│       ├── features/          # Feature pages (dashboard, assets, etc.)
│       └── shared/            # Reusable components and styles
└── server/                    # .NET Core backend
├── Controllers/           # API endpoints
├── Models/                # Entity models
├── DTOs/                  # Data transfer objects
├── Data/                  # DbContext and seed data
└── Migrations/            # EF Core migrations

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login and receive JWT |
| GET | /api/sites | List all sites |
| GET | /api/assets | List all assets |
| GET | /api/personnel | List all personnel |
| GET | /api/inspections | List all inspections |
| GET | /api/workorders | List all work orders |
| GET | /api/incidents | List all incidents |
| GET | /api/analytics/overview | Analytics data for charts |

All list endpoints support full CRUD. Detail endpoints (`/api/{entity}/{id}/details`) return the entity with all related records.

## Screenshots

*Coming soon*

## Related Projects

- [opscore-java](https://github.com/jcgardiner/opscore-java) — Same application built with Vue.js + Spring Boot + PostgreSQL