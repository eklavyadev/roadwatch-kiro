import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DB_URI,
  ssl: { rejectUnauthorized: false },
  max: 1, // VERY important for serverless
});

export async function POST(req: Request) {
  try {
    const { id, status } = await req.json();

    await pool.query(
      'UPDATE reports SET status = $1 WHERE id = $2',
      [status, id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('UPDATE ERROR:', error);
    return NextResponse.json(
      { error: 'Update failed' },
      { status: 500 }
    );
  }
}