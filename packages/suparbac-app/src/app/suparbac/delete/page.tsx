'use client';

import { Button } from 'flowbite-react';
import { useState, type FC } from 'react';
import { CLIENT_DELETE, FORBIDDEN, SERVER_DELETE, SUCCESS, UNAUTHORIZED } from '@/helpers/constant';
import { delete_ } from '@/helpers/server/delete';
import { createSupabaseClient } from '@/helpers/supabase/createSupabaseClient';
import { POSTS } from '@/helpers/supabase/tables';

const DeletePage: FC = () => {
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

  const onClientDeleteClick = async () => {
    setMessage(undefined);
    const result = await supabase.from(POSTS).delete().eq('name', 'Post').single();
    setMessageFromResult(result);
  };

  const onServerDeleteClick = async () => {
    setMessage(undefined);
    const result = await delete_();
    setMessageFromResult(result);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-2">
      <div>{message}</div>
      <div className="flex gap-2">
        <Button onClick={onClientDeleteClick}>{CLIENT_DELETE}</Button>
        <Button onClick={onServerDeleteClick}>{SERVER_DELETE}</Button>
      </div>
    </div>
  );
};

export default DeletePage;
