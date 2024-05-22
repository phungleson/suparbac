'use client';

import { Button } from 'flowbite-react';
import { useState, type FC } from 'react';
import {
  CLIENT_COUNT,
  CLIENT_SELECT,
  CLIENT_SELECT_SINGLE,
  FORBIDDEN,
  SERVER_COUNT,
  SERVER_SELECT,
  SERVER_SELECT_SINGLE,
  SUCCESS,
  UNAUTHORIZED,
} from '@/helpers/constant';
import { count, select, selectSingle } from '@/helpers/server/read';
import { createSupabaseClient } from '@/helpers/supabase/createSupabaseClient';
import type { PostRow } from '@/helpers/supabase/tables';
import { POSTS } from '@/helpers/supabase/tables';

const ReadPage: FC = () => {
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
    const result = await supabase.from(POSTS).select('*').returns<PostRow>();
    setMessageFromResult(result);
  };

  const onClientSelectSingleClick = async () => {
    setMessage(undefined);
    const result = await supabase.from(POSTS).select('*').single<PostRow>();
    setMessageFromResult(result);
  };

  const onClientCountClick = async () => {
    setMessage(undefined);
    const result = await supabase.from(POSTS).select('id.count()').single<PostRow>();
    setMessageFromResult(result);
  };

  const onServerSelectClick = async () => {
    setMessage(undefined);
    const result = await select();
    setMessageFromResult(result);
  };

  const onServerSelectSingleClick = async () => {
    setMessage(undefined);
    const result = await selectSingle();
    setMessageFromResult(result);
  };

  const onServerCountClick = async () => {
    setMessage(undefined);
    const result = await count();
    setMessageFromResult(result);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-2">
      <div>{message}</div>
      <div className="flex gap-2">
        <Button onClick={onClientSelectClick}>{CLIENT_SELECT}</Button>
        <Button onClick={onServerSelectClick}>{SERVER_SELECT}</Button>
      </div>
      <div className="flex gap-2">
        <Button onClick={onClientSelectSingleClick}>{CLIENT_SELECT_SINGLE}</Button>
        <Button onClick={onServerSelectSingleClick}>{SERVER_SELECT_SINGLE}</Button>
      </div>
      <div className="flex gap-2">
        <Button onClick={onClientCountClick}>{CLIENT_COUNT}</Button>
        <Button onClick={onServerCountClick}>{SERVER_COUNT}</Button>
      </div>
    </div>
  );
};

export default ReadPage;
