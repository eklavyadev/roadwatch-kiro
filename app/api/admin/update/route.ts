import { NextResponse } from 'next/server';

// Mock data store (in real app, this would be a database)
let mockReports = [
  {
    id: '1',
    image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    location: 'Main Street near City Hall',
    lat: 40.7128,
    lng: -74.0060,
    severity: 4,
    governing_body: 'NYC DOT',
    created_at: '2024-01-15T10:30:00Z',
    status: 'approved'
  },
  {
    id: '2',
    image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    location: 'Broadway & 42nd Street',
    lat: 40.7580,
    lng: -73.9855,
    severity: 3,
    governing_body: 'NYC DOT',
    created_at: '2024-01-14T14:20:00Z',
    status: 'pending'
  },
  {
    id: '3',
    image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    location: 'Central Park West',
    lat: 40.7829,
    lng: -73.9654,
    severity: 2,
    governing_body: 'NYC Parks',
    created_at: '2024-01-13T09:15:00Z',
    status: 'rejected'
  }
];

export async function POST(req: Request) {
  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: 'Missing id or status' },
        { status: 400 }
      );
    }

    // Find and update the report
    const reportIndex = mockReports.findIndex(r => r.id === id);
    
    if (reportIndex === -1) {
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      );
    }

    mockReports[reportIndex].status = status;

    console.log(`Report ${id} status updated to ${status}`);

    return NextResponse.json({ 
      success: true,
      message: `Report status updated to ${status}`
    });
  } catch (err) {
    console.error('UPDATE ERROR:', err);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}