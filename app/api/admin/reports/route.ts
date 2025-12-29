import { NextResponse } from 'next/server';

// Mock data for demo purposes
const mockReports = [
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
    status: 'approved'
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
    status: 'approved'
  }
];

export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return NextResponse.json(mockReports);
  } catch (err) {
    console.error('API ERROR:', err);
    return NextResponse.json(
      { error: 'Failed to fetch reports' },
      { status: 500 }
    );
  }
}