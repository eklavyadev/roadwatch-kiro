import { NextResponse } from 'next/server';

const MAX_SIZE_MB = 10;

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const image = formData.get('image') as File | null;
    const location = formData.get('location') as string | null;
    const lat = Number(formData.get('lat'));
    const lng = Number(formData.get('lng'));
    const severity = Number(formData.get('severity'));

    /* ---------- VALIDATION ---------- */
    if (
      !image ||
      !location ||
      Number.isNaN(lat) ||
      Number.isNaN(lng) ||
      Number.isNaN(severity)
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    /* ---------- FILE SIZE CHECK ---------- */
    if (image.size > MAX_SIZE_MB * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Please upload an image smaller than 10MB' },
        { status: 413 }
      );
    }

    // For demo purposes, simulate successful submission
    console.log('Report submitted:', {
      location,
      lat,
      lng,
      severity,
      imageSize: image.size,
      imageType: image.type
    });

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({ 
      success: true,
      message: 'Report submitted successfully for review'
    });
  } catch (err) {
    console.error('SERVER ERROR:', err);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}