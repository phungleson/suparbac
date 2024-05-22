export const newForbiddenResponse = (): Response =>
  new Response('', {
    status: 403,
  });
