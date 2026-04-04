# ImpactDesk

A fundraising activity planner for nonprofit fundraising managers and development staff who need to organize in-person donor meetings, visits, and events more efficiently.

Unlike generic CRM systems, ImpactDesk is built specifically for in-person donor relationship work and daily fundraising coordination. Users can schedule relationship-building activities, filter them by day, and view addresses on an interactive map for better route planning.

## Tech Stack

- **Frontend:** React 19 (Vite), Material UI, Leaflet, SWR, Axios, Day.js
- **Backend:** Django 6, Django REST Framework, PostgreSQL 15
- **Infrastructure:** Docker Compose, Nginx

## Getting Started

1. Clone the repository and create a `.env` file with the required environment variables:

   ```
   DJANGO_KEY=<your-django-secret-key>
   DEBUG=True
   DB_NAME=impactdesk
   DB_USER=<db-user>
   DB_PASS=<db-password>
   VITE_BASE_URL=http://localhost:8000
   VITE_GEOCODE_KEY=<your-google-geocode-api-key>
   ```

2. Start the application with Docker Compose:

   ```bash
   bash run-compose-dev.sh
   ```

   This brings up three services: the PostgreSQL database, Django API server (port 8000), and Vite dev server (port 5173).

3. Open the app at `http://localhost:5173`.

## Features

- **User Authentication** -- Sign up, log in with token-based auth, and log out. All dashboard routes and API endpoints require authentication.
- **Development Scheduling** -- Create meetings, visits, and events tied to contacts and organizations. Filter the schedule by selecting any day in a weekly calendar view.
- **Interactive Map** -- Developments with addresses are geocoded and displayed as markers on a Leaflet map, making it easy to plan in-person visit routes.
- **Contact Management** -- Track people and organizations with full address and contact details.
- **Donation Tracking** -- Record donations linked to people and organizations. View monthly donation bar charts and top donor summaries on the dashboard.
- **Dashboard Overview** -- At-a-glance cards for today's development count, total donations, a donation bar chart, and a ranked top donors list.

## Data Model

| Model         | Key Fields                                                                 | Relationships                              |
|---------------|----------------------------------------------------------------------------|--------------------------------------------|
| **People**        | first_name, last_name, phone, email, address fields                        | Has many Donations, has many Developments  |
| **Organizations** | title, website, phone, email, address fields                               | Has many Donations, has many Developments  |
| **Donations**     | donations (amount), donate_type, date                                      | ForeignKey to People, ForeignKey to Organizations |
| **Developments**  | type, date, time, end_time, status, note, address fields, lat, lng         | ForeignKey to People, ForeignKey to Organizations |

## API Endpoints

| Endpoint                      | Methods           | Description                          |
|-------------------------------|-------------------|--------------------------------------|
| `/auth/signup`                | POST              | Create a new user account            |
| `/auth/get-token`             | POST              | Obtain auth token with credentials   |
| `/auth/users`                 | GET               | Get authenticated user profile       |
| `/api/people/`                | GET, POST         | List or create contacts              |
| `/api/people/<id>`            | GET, PUT, DELETE   | Retrieve, update, or delete a contact |
| `/api/organizations/`         | GET, POST         | List or create organizations         |
| `/api/organizations/<id>`     | GET, PUT, DELETE   | Retrieve, update, or delete an org   |
| `/api/donations/`             | GET, POST         | List or create donations             |
| `/api/donations/<id>`         | GET, PUT, DELETE   | Retrieve, update, or delete a donation |
| `/api/developments/`          | GET, POST         | List or create developments (supports `?date=` filter) |
| `/api/developments/<id>`      | GET, PUT, DELETE   | Retrieve, update, or delete a development |

## Grading Rubric Coverage

### Two 3rd-Party REST APIs (4 pts)

1. **Google Geocoding API** -- Used via `react-geocode` in the Development form to convert street addresses into latitude/longitude coordinates, which are stored on each development and used to place markers on the map.
2. **OpenStreetMap Tile API (Leaflet)** -- The interactive map uses OpenStreetMap tile endpoints to render the map layer. Developments are plotted as markers with popups showing type, contact, address, and time details.

### Two CRUD Resources (4 pts)

1. **People** -- Full Create, Read, Update, and Delete via `/api/people/` endpoints. The frontend displays people in a table and supports adding new contacts through a form.
2. **Organizations** -- Full Create, Read, Update, and Delete via `/api/organizations/` endpoints. Organizations are displayed in a table and can be created inline from the development form.

Additional CRUD resources (Donations and Developments) are also implemented with full endpoint coverage.

### User Authentication (3 pts)

- **Signup** -- Full-stack account creation at `/auth/signup` with a React signup page and Django serializer.
- **Login** -- Full-stack login using username and password at `/auth/get-token`, returning a token stored in localStorage.
- **Protected routes and logout** -- All dashboard pages and API endpoints require authentication (`IsAuthenticated` permission). The app includes logout functionality that clears the stored token. Unauthenticated users can only access the home, login, and signup pages.

### Models & DB Design (3 pts)

- **2+ Models beyond User** -- Four models: People, Organizations, Donations, and Developments.
- **Model relationships** -- Donations link to both People and Organizations via ForeignKeys. Developments also link to both People and Organizations. These relationships are used throughout the app (e.g., showing a person's donation total, displaying contact names on developments).
- **Complexity** -- Serializers compute aggregated fields (`donation_total` on People via `Sum`, `total_donations` on Donations). The Developments model includes status choices, time fields, geocoded coordinates, and computed method fields (`people_name`, `organization_title`). Date-based query filtering is supported on the developments endpoint.

### Styling, Presentation, & Navigation (3 pts)

- **Routing** -- React Router with public routes (home, login, signup) and protected dashboard routes (overview, developments, contacts, donations).
- **Navigation** -- Sidebar navigation (`Sidenav`), top navigation bar (`MainNav`), bottom navigation (`Bottomnav`), and a separate home page nav (`Homenav`).
- **Design** -- Material UI theming with a custom color palette, responsive grid layouts across breakpoints, MUI components (Cards, Tables, Dialogs, DatePickers), and a landing page with hero section and feature highlights.

### Feature Rich Application (3 pts)

- **Date filtering** -- Weekly calendar UI lets users select a day to filter developments, with previous/next week navigation.
- **Map visualization** -- Geocoded development addresses displayed as interactive Leaflet markers with detail popups.
- **Dashboard analytics** -- Bar charts showing donations by month (MUI X-Charts), top donor rankings, and today's development count.
- **Inline contact creation** -- Dialog within the development form to create a new person or organization without leaving the page.
- **Donation aggregation** -- Per-person donation totals calculated at the serializer level and displayed in the contacts table.
