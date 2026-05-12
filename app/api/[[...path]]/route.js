import { NextResponse } from 'next/server';

export async function GET(request) {
  const url = new URL(request.url);
  const path = url.pathname.replace('/api', '');

  if (path === '/health' || path === '/' || path === '') {
    return NextResponse.json({
      status: 'ok',
      service: 'Matrimonial Biodata Maker API',
      timestamp: new Date().toISOString()
    });
  }

  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export async function POST(request) {
  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export async function PUT(request) {
  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export async function DELETE(request) {
  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}
