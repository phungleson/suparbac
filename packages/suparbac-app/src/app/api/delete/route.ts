import { log } from '@/helpers/log';
import { newErrorResponse } from '@/helpers/response/newErrorResponse';
import { newSuccessResponse } from '@/helpers/response/newSuccessResponse';
import { newUnauthorizedResponse } from '@/helpers/response/newUnauthorizedResponse';
import { createSupabaseAdminClient } from '@/helpers/supabase/createSupabaseAdminClient';
import { createSupabaseServerClient } from '@/helpers/supabase/createSupabaseServerClient';
import { POSTS, USERS } from '@/helpers/supabase/tables';

export const GET = async (): Promise<Response> => {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return newUnauthorizedResponse();
  }

  const supabaseAdmin = createSupabaseAdminClient();
  const result = await supabaseAdmin
    .from(USERS)
    .update({ permissions: [`${POSTS}:delete`] })
    .eq('id', user.id)
    .single();

  if (result.error) {
    log.error(result);
    return newErrorResponse();
  }

  return newSuccessResponse();
};
