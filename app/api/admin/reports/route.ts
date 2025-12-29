import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DB_URI,
  ssl: { rejectUnauthorized: false },
  max: 1, // VERY important for serverless
});

export async function GET() {
  try {
    const res = await pool.query(
      "SELECT * FROM reports ORDER BY created_at DESC"
    );
    return NextResponse.json(res.rows);
  } catch (error: any) {
    console.error('FULL DB ERROR:', error);
    return NextResponse.json(
      {
        message: 'Database error',
        detail: error.message,
      },
      { status: 500 }
    );
  }
}