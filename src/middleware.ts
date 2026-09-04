import { NextResponse } from 'next/server';

export function middleware() {
  return new NextResponse('Gone', {
    status: 410,
    headers: { 'Content-Type': 'text/plain' },
  });
}

export const config = {
  matcher: ['/asset-accession/:path*', '/api/asset-accession/:path*'],
};
