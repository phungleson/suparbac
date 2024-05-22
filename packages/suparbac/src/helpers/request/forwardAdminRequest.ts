import type { NextRequest } from 'next/server';
import { envSupabaseServiceRoleKey, envSupabaseUrl } from '../env';

// Override request role to be admin, so that it can bypass RLS and perform permitted actions.
// Forward request to supabase.
export const forwardAdminRequest = async (request: NextRequest): Promise<Response> => {
  const headers = request.headers;
  headers.set('Authorization', `Bearer ${envSupabaseServiceRoleKey()}`);

  const requestInit: RequestInit = {
    method: request.method,
    headers,
    body: request.body,
  };

  // So this happens because Node can't do full duplex when streaming so duplex: "half" has to be explicitly set
  // https://github.com/nodejs/node/issues/46221
  if (request.body != undefined) {
    requestInit.duplex = 'half';
  }

  const response = await fetch(
    `${envSupabaseUrl()}${request.nextUrl.pathname}?${request.nextUrl.searchParams}`,
    requestInit,
  );

  return response;
};
