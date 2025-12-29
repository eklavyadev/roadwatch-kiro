import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const MAX_SIZE_MB = 10;
const DUPLICATE_RADIUS_METERS = 200;

/* ---------- SAFE FILE NAME ---------- */
function generateSafeFileName(file: File) {
  const ext = file.type.split('/')[1] || 'jpg';
  return `report-${Date.now()}-${crypto.randomUUID()}.${ext}`;
}

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

    /* ---------- 🔁 DUPLICATE CHECK (200m RADIUS) ---------- */
    const { data: nearbyReports, error: duplicateError } =
      await supabase.rpc('check_nearby_reports', {
        input_lat: lat,
        input_lng: lng,
        radius_meters: DUPLICATE_RADIUS_METERS,
      });

    if (duplicateError) {
      console.error('DUPLICATE CHECK ERROR:', duplicateError);
      return NextResponse.json(
        { error: 'Failed to check nearby reports' },
        { status: 500 }
      );
    }

    if (nearbyReports && nearbyReports.length > 0) {
      return NextResponse.json(
        {
          error:
            'A pothole has already been reported nearby and is published or under review. Please check the homepage/map for existing reports.',
        },
        { status: 409 } // Conflict
      );
    }

    /* ---------- UPLOAD IMAGE ---------- */
    const fileName = generateSafeFileName(image);

    const { error: uploadError } = await supabase.storage
      .from('reports')
      .upload(fileName, image, {
        contentType: image.type,
      });

    if (uploadError) {
      console.error('UPLOAD ERROR:', uploadError);
      return NextResponse.json(
        { error: 'Image upload failed' },
        { status: 500 }
      );
    }

    const { data: publicUrlData } = supabase.storage
      .from('reports')
      .getPublicUrl(fileName);

    /* ---------- INSERT REPORT ---------- */
    const { data: inserted, error: insertError } = await supabase
      .from('reports')
      .insert({
        image_url: publicUrlData.publicUrl,
        location,
        lat,
        lng,
        severity,
        status: 'pending',
        governing_body: 'Municipal',
      })
      .select()
      .single();

    if (insertError || !inserted) {
      console.error('DB ERROR:', insertError);
      return NextResponse.json(
        { error: 'Database insert failed' },
        { status: 500 }
      );
    }

    /* ---------- 🔥 TRIGGER AI (ASYNC) ---------- */
    fetch('https://roadwatch-ai.onrender.com/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        reportId: inserted.id,
        imageUrl: publicUrlData.publicUrl,
      }),
    }).catch((err) => {
      console.error('AI TRIGGER FAILED:', err);
    });

    /* ---------- RESPONSE ---------- */
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('SERVER ERROR:', err);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}