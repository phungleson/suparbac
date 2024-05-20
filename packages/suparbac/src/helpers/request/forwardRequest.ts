import type { NextRequest } from 'next/server';
import { envSupabaseUrl } from '../env';

// Forward request to supabase.
export const forwardRequest = async (request: NextRequest): Promise<Response> => {
  const response = await fetch(`${envSupabaseUrl()}${request.nextUrl.pathname}?${request.nextUrl.searchParams}`, {
    headers: request.headers,
  });

  return response;
};
