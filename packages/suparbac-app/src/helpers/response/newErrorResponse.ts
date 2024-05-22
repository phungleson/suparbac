export const newErrorResponse = (): Response =>
  new Response('', {
    status: 500,
  });
