import { NextRequest, NextResponse } from 'next/server';

const BACKEND_BASE_URL =
  process.env.BACKEND_API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  'http://localhost:4000';

async function proxyRequest(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
): Promise<NextResponse> {
  const { path } = await context.params;
  const targetPath = path.join('/');
  const targetUrl = new URL(`${BACKEND_BASE_URL}/${targetPath}`);

  request.nextUrl.searchParams.forEach((value, key) => {
    targetUrl.searchParams.append(key, value);
  });

  const method = request.method;
  const body =
    method === 'GET' || method === 'HEAD' ? undefined : await request.text();

  const upstream = await fetch(targetUrl.toString(), {
    method,
    headers: {
      'Content-Type': request.headers.get('content-type') ?? 'application/json',
    },
    body,
    cache: 'no-store',
  });

  const responseText = await upstream.text();
  const contentType =
    upstream.headers.get('content-type') ?? 'application/json; charset=utf-8';
  const hasNoBodyStatus = upstream.status === 204 || upstream.status === 304;

  if (hasNoBodyStatus) {
    return new NextResponse(null, {
      status: upstream.status,
    });
  }

  return new NextResponse(responseText, {
    status: upstream.status,
    headers: {
      'Content-Type': contentType,
    },
  });
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return proxyRequest(request, context);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return proxyRequest(request, context);
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return proxyRequest(request, context);
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return proxyRequest(request, context);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return proxyRequest(request, context);
}
