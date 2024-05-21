import type { NextRequest } from 'next/server';
import { envSupabaseUrl } from '../env';

// Forward request to supabase.
export const forwardRequest = async (request: NextRequest): Promise<Response> => {
  const requestInit: RequestInit = {
    method: request.method,
    headers: request.headers,
    body: request.body,
  };

  // So this happens because Node can't do full duplex when streaming so duplex: "half" has to be explicitly set
  // https://github.com/nodejs/node/issues/46221
  if (request.body != undefined) {
    requestInit.duplex = 'half';
  }

  const response = await fetch(`${envSupabaseUrl()}${request.nextUrl.pathname}?${request.nextUrl.searchParams}`);

  return response;
};
