export const newForbiddenResponse = (): Response =>
  new Response('', {
    status: 403,
    // CORS headers are required for Supabase client to access.
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Expose-Headers':
        'Content-Encoding, Content-Location, Content-Range, Content-Type, Date, Location, Server, Transfer-Encoding, Range-Unit',
    },
  });
