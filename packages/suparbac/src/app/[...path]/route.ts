import type { NextRequest } from 'next/server';
import { envSupabaseServiceRoleKey } from '@/helpers/env';
import { getCreatePermission } from '@/helpers/permission/getCreatePermission';
import { getDeletePermission } from '@/helpers/permission/getDeletePermission';
import { getReadPermission } from '@/helpers/permission/getReadPermission';
import { getUpdatePermission } from '@/helpers/permission/getUpdatePermission';
import { forwardAdminRequest } from '@/helpers/request/forwardAdminRequest';
import { forwardRequest } from '@/helpers/request/forwardRequest';
import { newForbiddenResponse } from '@/helpers/response/newForbiddenResponse';
import { newUnauthorizedResponse } from '@/helpers/response/newUnauthorizedResponse';
import { createSupabaseAdminClient } from '@/helpers/supabase/createSupabaseAdminClient';
import { createSupabaseServerClient } from '@/helpers/supabase/createSupabaseServerClient';
import { checkUserPermission } from '@/helpers/user/checkUserPermission';

export const GET = async (request: NextRequest): Promise<Response> => {
  // Forwards for non postrest requests
  const pathname = request.nextUrl.pathname;
  if (!pathname.startsWith('/rest/v1/')) {
    return forwardRequest(request);
  }

  // Forwards for non table/view requests
  const postrestPath = pathname.replace('/rest/v1/', '');
  if (postrestPath.includes('/')) {
    return forwardRequest(request);
  }
  const table = postrestPath;

  // Forwards for admin requests
  if (request.headers.get('Authorization') == `Bearer ${envSupabaseServiceRoleKey()}`) {
    return forwardRequest(request);
  }

  const supabase = createSupabaseServerClient(request.headers);
  const result = await supabase.auth.getUser();
  const userId = result.data.user?.id;
  if (!userId) {
    return newUnauthorizedResponse();
  }

  const supabaseAdmin = createSupabaseAdminClient();
  const isPermitted = await checkUserPermission(supabaseAdmin, userId, getReadPermission(table));

  if (!isPermitted) {
    return newForbiddenResponse();
  }

  return forwardAdminRequest(request);
};

export const POST = async (request: NextRequest): Promise<Response> => {
  // Forwards for non postrest requests
  const pathname = request.nextUrl.pathname;
  if (!pathname.startsWith('/rest/v1/')) {
    return forwardRequest(request);
  }

  // Forwards for non table/view requests
  const postrestPath = pathname.replace('/rest/v1/', '');
  if (postrestPath.includes('/')) {
    return forwardRequest(request);
  }
  const table = postrestPath;

  // Forwards for admin requests
  if (request.headers.get('Authorization') == `Bearer ${envSupabaseServiceRoleKey()}`) {
    return forwardRequest(request);
  }

  const supabase = createSupabaseServerClient(request.headers);
  const result = await supabase.auth.getUser();
  const userId = result.data.user?.id;
  if (!userId) {
    return newUnauthorizedResponse();
  }

  const supabaseAdmin = createSupabaseAdminClient();
  const isPermitted = await checkUserPermission(supabaseAdmin, userId, getCreatePermission(table));

  if (!isPermitted) {
    return newForbiddenResponse();
  }

  return forwardAdminRequest(request);
};

export const PATCH = async (request: NextRequest): Promise<Response> => {
  // Forwards for non postrest requests
  const pathname = request.nextUrl.pathname;
  if (!pathname.startsWith('/rest/v1/')) {
    return forwardRequest(request);
  }

  // Forwards for non table/view requests
  const postrestPath = pathname.replace('/rest/v1/', '');
  if (postrestPath.includes('/')) {
    return forwardRequest(request);
  }
  const table = postrestPath;

  // Forwards for admin requests
  if (request.headers.get('Authorization') == `Bearer ${envSupabaseServiceRoleKey()}`) {
    return forwardRequest(request);
  }

  const supabase = createSupabaseServerClient(request.headers);
  const result = await supabase.auth.getUser();
  const userId = result.data.user?.id;
  if (!userId) {
    return newUnauthorizedResponse();
  }

  const supabaseAdmin = createSupabaseAdminClient();
  const isPermitted = await checkUserPermission(supabaseAdmin, userId, getUpdatePermission(table));

  if (!isPermitted) {
    return newForbiddenResponse();
  }

  return forwardAdminRequest(request);
};

export const DELETE = async (request: NextRequest): Promise<Response> => {
  // Forwards for non postrest requests
  const pathname = request.nextUrl.pathname;
  if (!pathname.startsWith('/rest/v1/')) {
    return forwardRequest(request);
  }

  // Forwards for non table/view requests
  const postrestPath = pathname.replace('/rest/v1/', '');
  if (postrestPath.includes('/')) {
    return forwardRequest(request);
  }
  const table = postrestPath;

  // Forwards for admin requests
  if (request.headers.get('Authorization') == `Bearer ${envSupabaseServiceRoleKey()}`) {
    return forwardRequest(request);
  }

  const supabase = createSupabaseServerClient(request.headers);
  const result = await supabase.auth.getUser();
  const userId = result.data.user?.id;
  if (!userId) {
    return newUnauthorizedResponse();
  }

  const supabaseAdmin = createSupabaseAdminClient();
  const isPermitted = await checkUserPermission(supabaseAdmin, userId, getDeletePermission(table));

  if (!isPermitted) {
    return newForbiddenResponse();
  }

  return forwardAdminRequest(request);
};

export const OPTIONS = async (request: NextRequest): Promise<Response> => forwardRequest(request);
