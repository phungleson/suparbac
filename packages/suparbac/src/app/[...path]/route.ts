import type { NextRequest } from 'next/server';
import { getCreatePermission } from '@/helpers/permission/getCreatePermission';
import { getDeletePermission } from '@/helpers/permission/getDeletePermission';
import { getReadPermission } from '@/helpers/permission/getReadPermission';
import { getUpdatePermission } from '@/helpers/permission/getUpdatePermission';
import { forwardRequest } from '@/helpers/request/forwardRequest';
import { newForbiddenResponse } from '@/helpers/response/newForbiddenResponse';
import { newUnauthorizedResponse } from '@/helpers/response/newUnauthorizedResponse';
import { createSupabaseAdminClient } from '@/helpers/supabase/createSupabaseAdminClient';
import { createSupabaseServerClient } from '@/helpers/supabase/createSupabaseServerClient';
import { checkUserPermission } from '@/helpers/user/checkUserPermission';

export const GET = async (request: NextRequest): Promise<Response> => {
  const subpaths = request.nextUrl.pathname.split('/');

  if (subpaths.length != 1) {
    return forwardRequest(request);
  }
  const table = subpaths[0];

  const supabase = createSupabaseServerClient();
  const result = await supabase.auth.getUser();
  const useId = result.data.user?.id;
  if (!useId) {
    return newUnauthorizedResponse();
  }

  const supabaseAdmin = createSupabaseAdminClient();
  const isPermitted = await checkUserPermission(supabaseAdmin, useId, getReadPermission(table));

  if (!isPermitted) {
    return newForbiddenResponse();
  }

  return forwardRequest(request);
};

export const POST = async (request: NextRequest): Promise<Response> => {
  const subpaths = request.nextUrl.pathname.split('/');

  if (subpaths.length != 1) {
    return forwardRequest(request);
  }
  const table = subpaths[0];

  const supabase = createSupabaseServerClient();
  const result = await supabase.auth.getUser();
  const useId = result.data.user?.id;
  if (!useId) {
    return newUnauthorizedResponse();
  }

  const supabaseAdmin = createSupabaseAdminClient();
  const isPermitted = await checkUserPermission(supabaseAdmin, useId, getCreatePermission(table));

  if (!isPermitted) {
    return newForbiddenResponse();
  }

  return forwardRequest(request);
};

export const PATCH = async (request: NextRequest): Promise<Response> => {
  const subpaths = request.nextUrl.pathname.split('/');

  if (subpaths.length != 1) {
    return forwardRequest(request);
  }
  const table = subpaths[0];

  const supabase = createSupabaseServerClient();
  const result = await supabase.auth.getUser();
  const useId = result.data.user?.id;
  if (!useId) {
    return newUnauthorizedResponse();
  }

  const supabaseAdmin = createSupabaseAdminClient();
  const isPermitted = await checkUserPermission(supabaseAdmin, useId, getUpdatePermission(table));

  if (!isPermitted) {
    return newForbiddenResponse();
  }

  return forwardRequest(request);
};

export const DELETE = async (request: NextRequest): Promise<Response> => {
  const subpaths = request.nextUrl.pathname.split('/');

  if (subpaths.length != 1) {
    return forwardRequest(request);
  }
  const table = subpaths[0];

  const supabase = createSupabaseServerClient();
  const result = await supabase.auth.getUser();
  const useId = result.data.user?.id;
  if (!useId) {
    return newUnauthorizedResponse();
  }

  const supabaseAdmin = createSupabaseAdminClient();
  const isPermitted = await checkUserPermission(supabaseAdmin, useId, getDeletePermission(table));

  if (!isPermitted) {
    return newForbiddenResponse();
  }

  return forwardRequest(request);
};
