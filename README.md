# RoadWatch - Validation-Driven Civic Issue Tracking

A geo-tagged platform for reporting and tracking potholes to improve road safety using smartphones with AI-powered verification.

## Features

- **High-Precision GPS**: ≤200m accuracy requirement with retry logic
- **Smart Duplicate Prevention**: 50m radius + 24hr window detection
- **AI-Powered Verification**: Automated image analysis for spam filtering
- **Admin Dashboard**: Approve/reject reports with status management
- **Public API**: Open data access for transparency and third-party innovation
- **Dark Theme UI**: Professional interface with cyan accents

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript and Tailwind CSS
- **Database**: PostgreSQL with Supabase for storage and authentication
- **AI**: Hugging Face Vision AI for image classification
- **Maps**: Google Maps JavaScript API for visualization
- **Deployment**: Vercel (frontend) + Render (AI service)

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DB_URI=your_postgresql_connection_string

# Supabase
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Admin
NEXT_PUBLIC_ADMIN_PASSWORD=your_admin_password

# Google Maps (optional)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### 2. Database Setup

The application expects a PostgreSQL database with a `reports` table. The schema should include:

```sql
CREATE TABLE reports (
  id SERIAL PRIMARY KEY,
  image_url TEXT NOT NULL,
  location TEXT NOT NULL,
  lat DECIMAL(10, 8) NOT NULL,
  lng DECIMAL(11, 8) NOT NULL,
  severity INTEGER NOT NULL CHECK (severity >= 1 AND severity <= 5),
  governing_body TEXT DEFAULT 'Municipal',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Supabase Setup

1. Create a Supabase project
2. Set up a storage bucket named `reports` for image uploads
3. Create the `reports` table in your Supabase database
4. Add the RPC function for duplicate checking:

```sql
CREATE OR REPLACE FUNCTION check_nearby_reports(
  input_lat DECIMAL,
  input_lng DECIMAL,
  radius_meters INTEGER
)
RETURNS TABLE(id INTEGER) AS $$
BEGIN
  RETURN QUERY
  SELECT r.id
  FROM reports r
  WHERE r.status IN ('pending', 'approved')
    AND (
      6371000 * acos(
        cos(radians(input_lat)) * cos(radians(r.lat)) *
        cos(radians(r.lng) - radians(input_lng)) +
        sin(radians(input_lat)) * sin(radians(r.lat))
      )
    ) <= radius_meters;
END;
$$ LANGUAGE plpgsql;
```

### 4. Installation

```bash
npm install
npm run dev
```

## API Endpoints

### Public API
- `GET /api/admin/reports` - Get all reports (filter by status='approved' for public use)

### Admin API
- `POST /api/admin/update` - Update report status (requires admin authentication)
- `POST /api/report/create` - Submit new report with image upload

## Usage

1. **Report Submission**: Navigate to `/report` to submit a new pothole report
2. **Admin Panel**: Access `/admin` with the admin password to manage reports
3. **Public Data**: Use the API endpoints to access verified pothole data
4. **Documentation**: Visit `/api` for API documentation

## Validation System

RoadWatch implements strict validation at every stage:

- **Location Validation**: GPS accuracy ≤200m, timestamp <30s
- **Photo Validation**: Format (JPEG/PNG/WebP), size <10MB, metadata extraction
- **Duplicate Detection**: Geospatial proximity search within 50m radius
- **Quality Scoring**: Weighted validation score (0-100) with auto-publish threshold ≥70

## Contributing

This project was built for the HackXIOS hackathon. For development:

1. Fork the repository
2. Create a feature branch
3. Make your changes with proper commit messages
4. Submit a pull request

## License

MIT License - see LICENSE file for details.