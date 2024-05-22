'use client';

import { Button } from 'flowbite-react';
import { useState, type FC } from 'react';
import { CLIENT_UPDATE, FORBIDDEN, SERVER_UPDATE, SUCCESS, UNAUTHORIZED } from '@/helpers/constant';
import { update } from '@/helpers/server/update';
import { createSupabaseClient } from '@/helpers/supabase/createSupabaseClient';
import type { PostRow } from '@/helpers/supabase/tables';
import { POSTS } from '@/helpers/supabase/tables';

const UpdatePage: FC = () => {
  const [message, setMessage] = useState<string>();
  const supabase = createSupabaseClient();

  const setMessageFromResult = (result: { status: number }) => {
    if (result.status == 401) {
      setMessage(UNAUTHORIZED);
    } else if (result.status == 403) {
      setMessage(FORBIDDEN);
    } else {
      setMessage(SUCCESS);
    }
  };

  const onClientSelectClick = async () => {
    setMessage(undefined);
    const result = await supabase
      .from(POSTS)
      .update({ description: 'Description' })
      .eq('name', 'Name')
      .returns<PostRow>();
    setMessageFromResult(result);
  };

  const onServerSelectClick = async () => {
    setMessage(undefined);
    const result = await update();
    setMessageFromResult(result);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-2">
      <div>{message}</div>
      <div className="flex gap-2">
        <Button onClick={onClientSelectClick}>{CLIENT_UPDATE}</Button>
        <Button onClick={onServerSelectClick}>{SERVER_UPDATE}</Button>
      </div>
    </div>
  );
};

export default UpdatePage;
